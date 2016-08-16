package com.ciandt.gardenito.backend.services.service;

import com.ciandt.gardenito.backend.services.dao.PlantaDadosDao;
import com.ciandt.gardenito.backend.services.dao.PlantaDadosDao;
import com.ciandt.gardenito.backend.services.entity.Planta;
import com.ciandt.gardenito.backend.services.entity.PlantaDados;
import com.google.api.server.spi.response.ConflictException;
import com.google.api.server.spi.response.NotFoundException;

import java.util.List;

/**
 * Created by rodrigosclosa on 29/12/15.
 */
public class PlantaDadosService {

    private PlantaDadosDao plantaDadosDao;

    public PlantaDadosService() {
        plantaDadosDao = new PlantaDadosDao();
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

//        PlantaDados u = plantaDadosDao.getByProperty("nome", item.getNome());
//
//        if(u != null)
//        {
//            throw new ConflictException("Planta já cadastrada: " + u.getNome());
//        }

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

//        u = plantaDadosDao.getByProperty("nome", item.getNome());
//
//        if(u != null && !u.getId().equals(item.getId()))
//        {
//            throw new ConflictException("Nome da planta ja cadastrada: " + u.getNome());
//        }

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
