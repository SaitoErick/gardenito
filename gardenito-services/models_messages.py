#!/usr/bin/env python

__author__ = 'rodrigo.sclosa@gmail.com (Rodrigo Sclosa)'

import httplib
import endpoints
from protorpc import messages

class PlantaMessage(messages.Message):
    """Objeto do Datastore para plantas"""
    id = messages.IntegerField()
    nome = messages.StringField(required=True)
    foto = messages.StringField(required=True)
    dados = messages.MessageField(PlantaDadosMessage, repeated=True)

class PlantaDadosMessage(messages.Message):
    """Objeto do Datastore para os dados de sensores das plantas."""
    id = messages.IntegerField()
    idPlanta = messages.IntegerField(required=True)
    planta = messages.MessageField(PlantaMessage)
    last_date = messages.DateTimeField(required=True)
    air_humidity = messages.FloatField(default=0)
    soil_humidity = messages.FloatField(default=0)
    luminosity = messages.FloatField(default=0)
    temperature = messages.FloatField(default=0)

class PlantaMessageCollection(messages.Message):
    """Collection of PlantaMessage."""
    items = messages.MessageField(PlantaMessage, 1, repeated=True)

class PlantaDadosMessageCollection(messages.Message):
    """Collection of PlantaDadosMessage."""
    items = messages.MessageField(PlantaDadosMessage, 1, repeated=True)
