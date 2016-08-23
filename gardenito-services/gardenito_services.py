#!/usr/bin/env python

__author__ = 'rodrigo.sclosa@gmail.com (Rodrigo Sclosa)'

from datetime import datetime

import endpoints
from google.appengine.ext import ndb

from models_db import Planta, PlantaDados
from models_messages import PlantaDadosMessage, PlantaMessage, PlantaDadosMessageCollection, PlantaMessageCollection

class GardenitoService():
    """Classe de serviços de impressão."""
    def _copyPlantaToForm(self, planta):
        """Copy relevant fields from Planta to PlantaMessage."""
        mi = PlantaMessage()
        for field in mi.all_fields():
            if hasattr(planta, field.name):
                # convert Date to date string; just copy others
                if field.name.endswith('Date'):
                    setattr(mi, field.name, str(getattr(planta, field.name)))
                elif field.name == "dados":
                    # Recupera os dados diretamente do DataStore e preenche o campo
                    setattr(mi, field.name, self._getAllPlantasDados(getattr(planta, "id")))
                else:
                    setattr(mi, field.name, getattr(planta, field.name))
            elif field.name == "websafeKey":
                setattr(mi, field.name, planta.key.urlsafe())
        # if displayName:
        #     setattr(mi, 'organizerDisplayName', displayName)
        mi.check_initialized()
        return mi

    def _copyPlantaDadosToForm(self, plantaDados):
        """Copy relevant fields from Planta to PlantaMessage."""
        mi = PlantaDadosMessage()
        for field in mi.all_fields():
            if hasattr(plantaDados, field.name):
                # convert Date to date string; just copy others
                if field.name.endswith('Date'):
                    setattr(mi, field.name, str(getattr(plantaDados, field.name)))
                elif field.name == "planta":
                    setattr(mi, field.name, self._getPlanta(request={id: getattr(plantaDados, "idPlanta")}))
                else:
                    setattr(mi, field.name, getattr(plantaDados, field.name))
            elif field.name == "websafeKey":
                setattr(mi, field.name, plantaDados.key.urlsafe())
        # if displayName:
        #     setattr(mi, 'organizerDisplayName', displayName)
        mi.check_initialized()
        return mi

    def _getAllPlantas(self, request):
        plantas = Planta.query()
        return PlantaMessageCollection(items=[self._copyPlantaToForm(plant) for plant in plantas])

    def _getAllPlantasDados(self, idPlanta):
        plantasDados = PlantaDados.query(PlantaDados.idPlanta == idPlanta).order(-PlantaDados.last_date)
        return PlantaDadosMessageCollection(items=[self._copyPlantaDadosToForm(plantDados) for plantDados in plantasDados])

    def _getPlanta(self, request):
        planta = ndb.Key(Planta, request.id).get()
        if not planta:
            raise endpoints.NotFoundException('Nao encontrado nenhuma planta para o codigo: %s' % request.id)
        prof = planta.key.parent().get()
        # return ConferenceForm
        return self._copyPlantaToForm(planta)

    def _createPlanta(self, request):
        """Create or update Conference object, returning ConferenceForm/request."""
        # preload necessary data items
        #user = endpoints.get_current_user()
        # if not user:
        #     raise endpoints.UnauthorizedException('Authorization required')
        # user_id = getUserId(user)

        if not request.nome:
            raise endpoints.BadRequestException("Nome da planta nao informada.")

        if not request.foto:
            raise endpoints.BadRequestException("Foto nao informada.")

        # copy ConferenceForm/ProtoRPC Message into dict
        data = {field.name: getattr(request, field.name) for field in request.all_fields()}
        # del data['websafeKey']
        # del data['organizerDisplayName']

        # add default values for those missing (both data model & outbound Message)
        # for df in DEFAULTS:
        #     if data[df] in (None, []):
        #         data[df] = DEFAULTS[df]
        #         setattr(request, df, DEFAULTS[df])

        # convert dates from strings to Date objects; set month based on start_date
        # if data['startDate']:
        #     data['startDate'] = datetime.strptime(data['startDate'][:10], "%Y-%m-%d").date()
        #     data['month'] = data['startDate'].month
        # else:
        #     data['month'] = 0
        # if data['endDate']:
        #     data['endDate'] = datetime.strptime(data['endDate'][:10], "%Y-%m-%d").date()
        #
        # # set seatsAvailable to be same as maxAttendees on creation
        # if data["maxAttendees"] > 0:
        #     data["seatsAvailable"] = data["maxAttendees"]
        # generate Profile Key based on user ID and Conference
        # ID based on Profile key get Conference key from ID
        # p_key = ndb.Key(Profile, user_id)
        # c_id = MaterialImpressao.allocate_ids(size=1, parent=p_key)[0]
        # c_key = ndb.Key(MaterialImpressao, c_id, parent=p_key)
        # data['key'] = c_key
        # data['organizerUserId'] = request.organizerUserId = user_id

        # create Conference, send email to organizer confirming
        # creation of Conference & return (modified) ConferenceForm
        Planta(**data).put()
        # taskqueue.add(params={'email': user.email(),
        #     'conferenceInfo': repr(request)},
        #     url='/tasks/send_confirmation_email'
        # )
        return request

    def _createPlantaDados(self, request):
        """Create or update Conference object, returning ConferenceForm/request."""
        # preload necessary data items
        #user = endpoints.get_current_user()
        # if not user:
        #     raise endpoints.UnauthorizedException('Authorization required')
        # user_id = getUserId(user)

        if not request.idPlanta:
            raise endpoints.BadRequestException("ID da planta nao informada.")

        if not request.air_humidity:
            raise endpoints.BadRequestException("Foto nao informada.")

        if not request.soil_humidity:
            raise endpoints.BadRequestException("Foto nao informada.")

        if not request.luminosity:
            raise endpoints.BadRequestException("Foto nao informada.")

        if not request.temperature:
            raise endpoints.BadRequestException("Foto nao informada.")

        # copy ConferenceForm/ProtoRPC Message into dict
        data = {field.name: getattr(request, field.name) for field in request.all_fields()}
        # del data['websafeKey']
        # del data['organizerDisplayName']

        # add default values for those missing (both data model & outbound Message)
        # for df in DEFAULTS:
        #     if data[df] in (None, []):
        #         data[df] = DEFAULTS[df]
        #         setattr(request, df, DEFAULTS[df])

        # convert dates from strings to Date objects; set month based on start_date
        # if data['startDate']:
        #     data['startDate'] = datetime.strptime(data['startDate'][:10], "%Y-%m-%d").date()
        #     data['month'] = data['startDate'].month
        # else:
        #     data['month'] = 0
        # if data['endDate']:
        #     data['endDate'] = datetime.strptime(data['endDate'][:10], "%Y-%m-%d").date()
        #
        # # set seatsAvailable to be same as maxAttendees on creation
        # if data["maxAttendees"] > 0:
        #     data["seatsAvailable"] = data["maxAttendees"]
        # generate Profile Key based on user ID and Conference
        # ID based on Profile key get Conference key from ID
        # p_key = ndb.Key(Profile, user_id)
        # c_id = MaterialImpressao.allocate_ids(size=1, parent=p_key)[0]
        # c_key = ndb.Key(MaterialImpressao, c_id, parent=p_key)
        # data['key'] = c_key
        # data['organizerUserId'] = request.organizerUserId = user_id

        # create Conference, send email to organizer confirming
        # creation of Conference & return (modified) ConferenceForm
        Planta(**data).put()
        # taskqueue.add(params={'email': user.email(),
        #     'conferenceInfo': repr(request)},
        #     url='/tasks/send_confirmation_email'
        # )
        return request
