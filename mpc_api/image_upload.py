import os
import re
from datetime import datetime
import json
import argparse
import pathlib

import requests
from lxml import etree


def parse_filename(filename):
  match = re.search(r'^(.+)\-(\d+)\-(front|back)\.(png|jpg)$', filename)
  if not match:
    return None
  
  return (match.group(1), int(match.group(2)), match.group(3), filename)


def find_images(path):
  filenames = sorted((
    file
    for file in (
      parse_filename(filename)
      for filename in next(os.walk(path), (None, None, []))[2]
    )
    if file is not None
  ))

  group_count = {
    group: index
    for (group, index, side, filename) in filenames
  }

  images = {
    group: [
      {}
      for _ in range(index)
    ]
    for group, index in group_count.items()
  }
  for (group, index, side, filename) in filenames:
    images[group][index-1][side] = os.path.join(path, filename)

  return images


def upload_image(side, image):
  r = requests.post(
    url='https://www.makeplayingcards.com/uploader/up_product.aspx',
    files={
      'fileData': open(image, 'rb'),
    },
    data={
      'userName': '',
      'layer': side,
      'st': datetime.utcnow().strftime('%Y/%m/%d %H:%M:%S.%f'),
      'pt': 14167,
      'ip': '',
    },
  )
  root = etree.HTML(r.content.decode('utf-8'))
  return json.loads(root.xpath('/html/body/form/input[@id="hidd_image_info"]/@value')[0])


def analysis_image(side, index, value):
  r = requests.post(
    url='https://www.makeplayingcards.com/design/dn_product_analysis_photo.aspx',
    data={
      'photoindex': f'{index}',
      'source': json.dumps(value),
      'face': side,
      'width': '272',
      'height': '370',
      'dpi': '300',
      'auto': 'Y',
      'scale': '1',
      'filter': '',
      'productCode': 'FI_7999',
      'designCode': 'FP_031273',
      'sortNo': '0',
      'applyMask': 'N',
    },
  )
  root = etree.XML(r.content)
  return json.loads(root.xpath('/Values/Value/text()')[0])['CropInfo']


def compress_image_data(analysed_image, uploaded_image):
  return {
    'ID': analysed_image['ID'],
    'SourceID': analysed_image['SourceID'],
    'Exp': uploaded_image['Exp'],
    'Width': uploaded_image['Width'],
    'Height': uploaded_image['Height'],
  }


def upload_group_images(group_images):
  data = {}
  for group, cards in group_images.items():
    data[group] = []
    for index, sides in enumerate(cards):
      data[group].append({})
      for side, filename in sides.items():
        print(f'upload image: {filename}')
        uploaded_image = upload_image(side, filename)

        print(f'analysis image: {filename}')
        analysed_image = analysis_image(side, index, uploaded_image)

        data[group][index][side] = compress_image_data(analysed_image, uploaded_image)
  
  return data
