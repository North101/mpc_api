# Usage:

Requires python3

## Installing
```
pip3 install requirements.txt
```

## Upload images to MPC:
```
python3 -m mpc_api upload <images-path>
```

Images must be in the following format:
  `<group>-<index>-<front|back>.<png|jpg>`
You can find examples in the images folder

You'll then be asked to select which groups of images you'd like to upload (all by default)
A file containing the uploaded data will be saved in your current directory for each group in this format:
  `<group>.json`

## Create Project:
```
python3 -m mpc_api create <session_id> <data-files>
```

<session_id>: This is the value of the `ASP.NET_SessionId` cookie from makeplayingcards.com and is unfortunatly required to view the created project. You do not need to be logged in and this value is only shared with makeplayingcards.com.
<data-files>: JSON file(s) containing mpc image data created from running `python3 -m mpc_api upload <path>`