#!/usr/bin/env python

__author__ = 'rodrigo.sclosa@gmail.com (Rodrigo Sclosa)'

import endpoints
from protorpc import message_types
from protorpc import messages
from protorpc import remote

from gardenito_services import GardenitoService
from settings import ALLOWED_CLIENT_IDS
from settings import ANDROID_AUDIENCE

EMAIL_SCOPE = endpoints.EMAIL_SCOPE
API_EXPLORER_CLIENT_ID = endpoints.API_EXPLORER_CLIENT_ID

@endpoints.api(name='gardenito', version='v1', audiences=[ANDROID_AUDIENCE],
              allowed_client_ids= ALLOWED_CLIENT_IDS,
              scopes=[EMAIL_SCOPE])
class GerdenitoApi(remote.Service):
    """Gardenito API v0.1"""
