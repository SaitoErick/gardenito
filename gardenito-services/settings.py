#!/usr/bin/env python

"""settings.py

Settings file for rapid configuration

"""

import endpoints

# Replace the following lines with client IDs obtained from the APIs
# Console or Cloud Console.
WEB_CLIENT_ID = 'AIzaSyBhwNuad4_YFihHZ6-g2ymQ2o4l_Kiceco'
ANDROID_CLIENT_ID = 'AIzaSyBO-zmc5K_xlVRg5RLAAw8sw2fD3-2FEgw'
IOS_CLIENT_ID = 'AIzaSyB4AhXEuoGqoTHkfid523ucM7rj08qpHlQ'
ANDROID_AUDIENCE = WEB_CLIENT_ID

ALLOWED_CLIENT_IDS = [
    WEB_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID,
    endpoints.API_EXPLORER_CLIENT_ID]
