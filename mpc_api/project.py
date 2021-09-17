import json

import requests
from lxml import etree

card_stock_data = {
  '(S27) Smooth': 'PA_016',
  '(S30) Standard Smooth': 'PA_014',
  '(S33) Superior Smooth': 'PA_059',
  '(M31) Linen': 'PA_015',
  '(M30) Linen Air Light [min.1000]': 'PA_164',
  '(M32) Linen Air [min.1000]': 'PA_028',
  '(A35) Thick Standard': 'PA_203',
  '(P10) Plastic': 'PA_017',
}

print_type_data = {
  'Full color print': '',
  'Holographic (front)': 'EF_055',
  'Holographic (front & back)': 'EF_120',
  'High gloss + full color print': 'EF_020',
  'Gold gilt edge + full color print': 'EF_041',
  'Silver gilt edge + full color print': 'EF_042',
  'Holographic (front) + gold gilt edge': 'EF_095',
  'Holographic (front) + silver gilt edge': 'EF_105',
}

finish_data = {
  'MPC game card finish': 'PPR_0009',
  'BETA playing card finish': 'PPR_0149',
  'Gloss finish': 'PPR_0056',
}

packaging_data = {
  'Shrink-wrapped': 'PB_043',
  'Plain black velvet bag': 'PB_12387',
  'Plain double magnetic book box': 'PB_13100',
  'Plain double tin box': 'PB_12337',
  'Plain drawer box': 'PB_10490',
  'Plain easy-flip box': 'PB_10488',
  'Plain easy-flip side open box': 'PB_12345',
  'Plain hinged tin box': 'PB_8356',
  'Plain lux box': 'PB_12017',
  'Plain magnetic book box': 'PB_13090',
  'Plain white tuck box': 'PB_8166',
  'Plain window tuck box': 'PB_048',
  'Plain plastic box': 'PB_045',
  'Plain rigid box': 'PB_4292',
  'Plain plastic hinged case': 'PB_229',
  'Plain tin box': 'PB_050',
  'Custom black velvet bag': 'PB_12388',
  'Custom double magnetic book box': 'PB_13099',
  'Custom double sticker tin box': 'PB_12335',
  'Custom double tin box': 'PB_12336',
  'Custom drawer box': 'PB_9981',
  'Custom easy-flip box': 'PB_9983',
  'Custom easy-flip side open box': 'PB_12344',
  'Custom hinged tin box': 'PB_8366',
  'Custom labeled tin box': 'PB_8362',
  'Custom lux box': 'PB_12014',
  'Custom magnetic book box': 'PB_13091',
  'Custom rigid box': 'PB_4283',
  'Custom tuck box': 'PB_861',
  'Custom tuck box (sealed base)': 'PB_3281',
  'Custom plastic box': 'PB_234',
  'Custom plastic hinged case': 'PB_237',
  'Custom tin box': 'PB_231',
  'Uncut sheet': 'PB_049',
}


def create_project(session_id, settings, count):
  r = requests.get(
    url='https://www.makeplayingcards.com/products/pro_item_process_flow.aspx',
    params={
      # Card type
      'itemid': 'C380050185D1C1AF',
      # Card Stock
      'attachno': settings['card_stock'],
      # number of cards
      'pcs': f'{count}',
      # Print type
      'producteffectno': settings['print_type'],
      # Finish
      'processno': settings['finish'],
       # Packaging
      'packid': settings['packaging'],
      'qty': '1',
    },
    cookies={
      'ASP.NET_SessionId': session_id,
    },
  )
  root = etree.HTML(r.content.decode('utf-8'))
  return root.xpath('/html/body/form[@id="form1"]/@action')[0].replace('./dn_playingcards_front_dynamic.aspx?ssid=', '')


def save_front_settings(session_id, project_id, settings, count):
  r = requests.post(
    url='https://www.makeplayingcards.com/products/playingcard/design/dn_playingcards_mode_nf.aspx',
    params={
      'ssid': project_id,
    },
    data={
      # required to view Customize Front step
      '__EVENTTARGET': 'btn_next_step',
      '__EVENTARGUMENT': '',
      '__VIEWSTATE': '/wEPDwUKLTU2NTk2MjE5Ng8WAh4TVmFsaWRhdGVSZXF1ZXN0TW9kZQIBFgICAw9kFgICFw9kFgICAQ8QZBAVEA5VcCB0byAxOCBjYXJkcw5VcCB0byAzNiBjYXJkcw5VcCB0byA1NSBjYXJkcw5VcCB0byA3MiBjYXJkcw5VcCB0byA5MCBjYXJkcw9VcCB0byAxMDggY2FyZHMPVXAgdG8gMTI2IGNhcmRzD1VwIHRvIDE0NCBjYXJkcw9VcCB0byAxNjIgY2FyZHMPVXAgdG8gMTgwIGNhcmRzD1VwIHRvIDE5OCBjYXJkcw9VcCB0byAyMTYgY2FyZHMPVXAgdG8gMjM0IGNhcmRzD1VwIHRvIDM5NiBjYXJkcw9VcCB0byA1MDQgY2FyZHMPVXAgdG8gNjEyIGNhcmRzFRACMTgCMzYCNTUCNzICOTADMTA4AzEyNgMxNDQDMTYyAzE4MAMxOTgDMjE2AzIzNAMzOTYDNTA0AzYxMhQrAxBnZ2dnZ2dnZ2dnZ2dnZ2dnZGRkloU9yHV5HiIPR1i4PDioIIuLNaM=',
      '__VIEWSTATEGENERATOR': '602A9A3C',

      'hidd_status': '',
      'hidd_original_count': f'{count}',
      'hidd_totalcount': f'{count}',
      'hidd_design_count': f'{count}',
      'hidd_mode': 'ImageText',

      'hidd_display_material': 'false',
      'hidd_material_no': settings['card_stock'],
      'hidd_packing_no': settings['packaging'],
      'txt_card_number': f'{count}',
      'dro_total_count': f'{count}',
  
      # not sure if this is needed
      'hidd_packing_condition_info': json.dumps({
        'UnitNo': 'C380050185D1C1AF',
        'PackingNo': settings['packaging'],
        'PackingGroup': 'SHRINKWRAP',
        'AttachNo': settings['card_stock'],
        'ProductEffectNo': settings['print_type'],
        'Pieces': count,
      }),
    },
    cookies={
      'ASP.NET_SessionId': session_id,
    },
  )


def save_back_settings(session_id, project_id, count):
  r = requests.post(
    url='https://www.makeplayingcards.com/products/playingcard/design/dn_playingcards_mode_nb.aspx',
    params={
      'ssid': project_id,
    },
    data={
      # required to view Customize Back step
      '__EVENTTARGET': 'btn_next_step',
      '__EVENTARGUMENT': '',
      '__VIEWSTATE': '/wEPDwUKMTIzMDgxNjEwOA8WAh4TVmFsaWRhdGVSZXF1ZXN0TW9kZQIBFgICAw9kFgICDQ8WAh4FdmFsdWUFATZkZKIjwzXAMwyNuSHo5nMXtfW9CiZJ',
      '__VIEWSTATEGENERATOR': 'F2B5E67A',

      'hidd_status': '',
      'hidd_original_count': f'{count}',
      'hidd_totalcount': f'{count}',
      'hidd_design_count': f'{count}',
      'hidd_mode': 'ImageText',
    },
    cookies={
      'ASP.NET_SessionId': session_id,
    },
  )


def uncompress_image_data(data):
  return {
    'ID': data['SourceID'],
    'Exp': data['Exp'],
    'Owner': '',
    'Path': 'https://www.makeplayingcards.com/PreviewFiles/Normal/temp',
    'Width': data['Width'],
    'Height': data['Height'],
    'imageName': f"{data['SourceID']}.{data['Exp']}",
  }


def uncompress_crop_data(data):
  return [{
    'ID': data['ID'],
    'SourceID': data['SourceID'],
    'Exp': data['Exp'],
    'X': 0,
    'Y': 0,
    'Width': 272,
    'Height': 371,
    'CropX': 0,
    'CropY': 0,
    'CropWidth': 272,
    'CropHeight': 370,
    'CropRotate': 0.0,
    'Rotate': 0.0,
    'Zoom': 1.0,
    'Scale': 1.0,
    'FlipHorizontal': 'N',
    'FlipVertical': 'N',
    'Sharpen': 'N',
    'Filter': '',
    'Brightness': 0,
    'ThumbnailScale': 2.0221,
    'AllowEdit': 'Y',
    'AllowMove': 'Y',
    'Alpha': 1.0,
    'Resolution': 300,
    'Index': 0,
    'Quality': 'Y',
    'AutoDirection': 'N',
    'ApplyMask': 'N',
    'IsEmpty': False,
  }]


def save_session(session_id, project_id, cards):
  r = requests.post(
    url='https://www.makeplayingcards.com/design/dn_keep_session.aspx',
    params={
      'ssid': project_id,
    },
    data={
      # list of front images for the project
      'frontImageList': json.dumps([
        uncompress_image_data(image_data)
        for sides in cards
        for side, image_data in sides.items()
        if side == 'front'
      ]),
      # list of front images assigned to cards
      'frontCropInfo': json.dumps([
        uncompress_crop_data(image_data)
        for sides in cards
        for side, image_data in sides.items()
        if side == 'front'
      ]),
      # page designer for multiple front cards
      'frontDesignModePage': 'dn_playingcards_mode_nf.aspx',
      # list of back images for the project
      'backImageList': json.dumps([
        uncompress_image_data(image_data)
        for sides in cards
        for side, image_data in sides.items()
        if side == 'back'
      ]),
      # list of back images assigned to cards
      'backCropInfo': json.dumps([
        uncompress_crop_data(image_data)
        for sides in cards
        for side, image_data in sides.items()
        if side == 'back'
      ]),
      # page designer for multiple back cards
      'backDesignModePage': 'dn_playingcards_mode_nb.aspx',
      # no idea
      'expand': 'null',
      # no idea
      'mapinfo': '[]',
    },
    cookies={
      'ASP.NET_SessionId': session_id,
    },
  )