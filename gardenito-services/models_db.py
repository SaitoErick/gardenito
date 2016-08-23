#!/usr/bin/env python

__author__ = 'rodrigo.sclosa@gmail.com (Rodrigo Sclosa)'

import httplib
import endpoints
from google.appengine.ext import ndb

class Planta(ndb.Model):
    """Objeto do Datastore para plantas"""
    id = ndb.KeyProperty(kind="integer")
    nome = ndb.StringProperty(required=True)
    foto = ndb.TextProperty(required=True)
    dados = ndb.StructuredProperty(PlantaDados, repeated=True)

class PlantaDados(ndb.Model):
    """Objeto do Datastore para os dados de sensores das plantas."""
    id = ndb.KeyProperty(kind="integer")
    idPlanta = ndb.IntegerProperty(required=True)
    planta = ndb.StructuredProperty(Planta)
    last_date = ndb.DateTimeProperty(required=True, auto_now_add=True)
    air_humidity = ndb.FloatProperty(required=True, default=0)
    soil_humidity = ndb.FloatProperty(required=True, default=0)
    luminosity = ndb.FloatProperty(required=True, default=0)
    temperature = ndb.FloatProperty(required=True, default=0)
