#!/usr/bin/env python

__author__ = 'rodrigo.sclosa@gmail.com (Rodrigo Sclosa)'

import endpoints
from gardenito_api import GerdenitoApi

#Adicionar aqui todos os Endpoints para serem registrados no servidor de API
api = endpoints.api_server([GerdenitoApi]) # register APIs
