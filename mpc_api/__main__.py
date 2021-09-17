import argparse
import pathlib
import json

import inquirer
from inquirer.themes import GreenPassion

from . import project
from . import upload


def create_project(session_id, settings, files):
  cards = []
  for file in files:
    with open(file) as f:
      cards.extend(json.load(f))
  
  questions = []
  if settings['card_stock'] is None:
    questions.append(inquirer.List(
      'card_stock',
      message='Card Stock',
      choices=[
        (name, value)
        for name, value in project.card_stock_data.items()
      ],
      default='PA_014',
    ))
  
  if settings['print_type'] is None:
    questions.append(inquirer.List(
      'print_type',
      message='Print Type',
      choices=[
        (name, value)
        for name, value in project.print_type_data.items()
      ],
      default='',
    ))
  
  if settings['finish'] is None:
    questions.append(inquirer.List(
      'finish',
      message='Finish',
      choices=[
        (name, value)
        for name, value in project.finish_data.items()
      ],
      default='PPR_0009',
    ))
  
  if settings['packaging'] is None:
    questions.append(inquirer.List(
      'packaging',
      message='Packaging',
      choices=[
        (name, value)
        for name, value in project.packaging_data.items()
      ],
      default='PB_043',
    ))

  settings = inquirer.prompt(questions, theme=GreenPassion())

  card_count = len(cards)
  print(f'Cards: {card_count}')

  print('Creating Project')
  project_id = project.create_project(session_id, settings, card_count)
  print(f'Project ID: {project_id}')

  print('Saving Settings')
  project.save_front_settings(session_id, project_id, settings, card_count)
  project.save_back_settings(session_id, project_id, card_count)
  project.save_session(session_id, project_id, cards)

  print(f'https://www.makeplayingcards.com/design/dn_preview_layout.aspx?ssid={project_id}')


def upload_images(path):
  group_images = upload.find_images(path)
  questions = [
    inquirer.Checkbox(
      'groups',
      message='Which groups of cards would you like to upload',
      choices=[
        (f"{group} (front: {front_count}, back: {back_count})", group)
        for (group, front_count, back_count) in (
          (
            group,
            sum(1 for sides in cards if 'front' in sides),
            sum(1 for sides in cards if 'back' in sides),
          )
          for group, cards in group_images.items()
        )
      ],
      default=list(group_images),
    ),
  ]
  answers = inquirer.prompt(questions, theme=GreenPassion())

  data = upload.upload_group_images({
    group: cards
    for group, cards in group_images.items()
    if group in answers['groups']
  })
  upload.fill_in_missing_images(data)

  for group, cards in data.items():
    with open(f'{group}.json', 'w') as f:
      json.dump(cards, f)


if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  subparsers = parser.add_subparsers(dest='command')

  create_parser = subparsers.add_parser('create')
  create_parser.add_argument('session_id', help='This is the value of the "ASP.NET_SessionId" cookie from makeplayingcards.com and is unfortunatly required to view the created project. You do not need to be logged in and this value is only shared with makeplayingcards.com.')
  create_parser.add_argument('files', type=pathlib.Path, nargs='*', help='JSON file(s) containing mpc image data')
  create_parser.add_argument('--card_stock', default=None, help='Card Stock')
  create_parser.add_argument('--print_type', default=None, help='Card Print type')
  create_parser.add_argument('--finish', default=None, help='Card finish')
  create_parser.add_argument('--packaging', default=None, help='Card Packaging')

  image_parser = subparsers.add_parser('upload')
  image_parser.add_argument('path', type=pathlib.Path, help='Path to directory to scan for images. Images must be in this format "<group>-<index>-<front|back>.<png|jpg>"')

  args = parser.parse_args()
  if args.command == 'create':
    create_project(
      session_id=args.session_id,
      settings={
        'card_stock': args.card_stock,
        'print_type': args.print_type,
        'finish': args.finish,
        'packaging': args.packaging,
      },
      files=args.files,
    )
  elif args.command == 'upload':
    upload_images(args.path)
  else:
    parser.print_help()