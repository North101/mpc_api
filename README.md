MakePlayingCards API

This script allow you to upload images and create a project on www.makeplayingcards.com

# Usage:

Requires python3

## Installing
```
pip3 install requirements.txt
```

## Upload images to MPC:
```
python3 -m mpc_api upload <images-path>

// example:
python3 -m mpc_api upload ./images/
```

Images must be in the following format:
```
<group>-<index>-<front|back>.<png|jpg>
```
You can find examples in the images folder

You'll then be asked to select which groups of images you'd like to upload (all by default)  
A file containing the uploaded data will be saved in your current directory for each group in this format: `<group>.json`

## Create Project:
```
python3 -m mpc_api create <session_id> <data-files>

// example
python3 -m mpc_api create jhakbc8yc78slkjajbcs Rules.json Consternation-on-the-Constellation.json Deep-Ones.json Sinking-Ship.json
```

`session_id`: This is the value of the `ASP.NET_SessionId` cookie from www.makeplayingcards.com and is unfortunatly required to view the created project. You do not need to be logged in and this value is only shared with www.makeplayingcards.com.  
`data-files`: JSON file(s) containing mpc image data created from running `python3 -m mpc_api upload <path>`

## Example Images:
The example images are taken from the Arkham Horror: The Card Game custom scenario [Consternation on the Constellation](https://mythosbusters.com/custom-scenarios/) by the Mythos Busters (with permission) and are not otherwise affiliated.