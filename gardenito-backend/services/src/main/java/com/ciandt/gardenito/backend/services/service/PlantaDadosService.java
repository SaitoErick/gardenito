package com.ciandt.gardenito.backend.services.service;

import com.ciandt.gardenito.backend.services.dao.PlantaDadosDao;
import com.ciandt.gardenito.backend.services.dao.PlantaDadosDao;
import com.ciandt.gardenito.backend.services.entity.Planta;
import com.ciandt.gardenito.backend.services.entity.PlantaDados;
import com.ciandt.gardenito.backend.services.helpers.OneSignalHelper;
import com.ciandt.gardenito.backend.services.util.Params;
import com.google.api.server.spi.response.ConflictException;
import com.google.api.server.spi.response.NotFoundException;

import java.util.List;

/**
 * Created by rodrigosclosa on 29/12/15.
 */
public class PlantaDadosService {

    private PlantaDadosDao plantaDadosDao;
    private OneSignalHelper oneSignalHelper;

    public PlantaDadosService() {
        plantaDadosDao = new PlantaDadosDao();
        oneSignalHelper = new OneSignalHelper();
    }

    public List<PlantaDados> list() {
        return plantaDadosDao.listAll();
    }

    public List<PlantaDados> list(Long idPlanta) throws NotFoundException {
        List<PlantaDados> list = plantaDadosDao.listByProperty("idPlanta", idPlanta);

        if(list == null || list.size() < 1) {
            throw new NotFoundException("Nenhuma planta encontrada");
        }

        return list;
    }

    public PlantaDados getById(Long id) throws NotFoundException {
        PlantaDados item = plantaDadosDao.getByKey(id);

        if(item == null) {
            throw new NotFoundException("Dados da Planta não encontrada");
        }

        return item;
    }

    public PlantaDados insert(PlantaDados item) throws ConflictException, NotFoundException {
        if(item == null)
        {
            throw new ConflictException("Dados da planta não informados.");
        }
        else if(item.getIdPlanta() == null)
        {
            throw new ConflictException("ID da planta não informado.");
        }

        item = plantaDadosDao.insert(item);

        //TODO: Envia uma notificação de Push de teste. Em algum momento, precisa verificar os parametros e só enviar se estiver fora do estiulado.
        oneSignalHelper.SendPush("{\"teste\":\"ok\"}", Params.getInstance().getMensagemParametros(), null);

        return plantaDadosDao.insert(item);
    }

    public void update(PlantaDados item) throws ConflictException, NotFoundException {
        if(item == null)
        {
            throw new ConflictException("Planta não informado.");
        }
        else if(item.getIdPlanta() == null)
        {
            throw new ConflictException("ID da planta não informada.");
        }

        PlantaDados u = plantaDadosDao.getById(item.getId());

        if(u == null) {
            throw new NotFoundException("Dados da Planta não encontrados");
        }

        plantaDadosDao.update(item);
    }

    public void remove(long id) throws ConflictException, NotFoundException {
        PlantaDados item = plantaDadosDao.getByKey(id);

        if(item == null) {
            throw new NotFoundException("Dados da Planta não encontrados");
        }

        plantaDadosDao.delete(item);
    }
}
