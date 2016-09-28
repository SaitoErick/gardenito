package com.ciandt.gardenito.backend.services.service;

import com.ciandt.gardenito.backend.services.dao.PlantaDadosDao;
import com.ciandt.gardenito.backend.services.dao.PlantaDao;
import com.ciandt.gardenito.backend.services.dao.PlantaParametrosDao;
import com.ciandt.gardenito.backend.services.entity.Planta;
import com.ciandt.gardenito.backend.services.entity.PlantaDados;
import com.ciandt.gardenito.backend.services.entity.PlantaParametros;
import com.google.api.server.spi.response.ConflictException;
import com.google.api.server.spi.response.NotFoundException;

import java.util.List;

/**
 * Created by rodrigosclosa on 29/12/15.
 */
public class PlantaService {

    private PlantaDao plantaDao;
    private PlantaDadosDao plantaDadosDao;
    private PlantaParametrosDao plantaParametrosDao;

    public PlantaService() {
        plantaDao = new PlantaDao();
        plantaDadosDao = new PlantaDadosDao();
        plantaParametrosDao = new PlantaParametrosDao();
    }

    public List<Planta> list() {
        List<Planta> list = plantaDao.listAll();

        for (Planta planta : list) {
            List<PlantaDados> dados = plantaDadosDao.listByProperty("idPlanta", planta.getId(), 10);

            if(dados != null) {
                planta.setDados(dados);
            }

            PlantaParametros parametros = plantaParametrosDao.getByProperty("idPlanta", planta.getId());

            if(parametros != null) {
                planta.setParametros(parametros);
            }
        }

        return list;
    }

    public List<Planta> list(String nome) throws NotFoundException {
        List<Planta> list = plantaDao.listByProperty("nome", nome);

        if(list == null || list.size() < 1) {
            throw new NotFoundException("Nenhuma planta encontrada");
        }

        for (Planta planta : list) {
            List<PlantaDados> dados = plantaDadosDao.listByProperty("idPlanta", planta.getId(), 10);

            if(dados != null) {
                planta.setDados(dados);
            }

            PlantaParametros parametros = plantaParametrosDao.getByProperty("idPlanta", planta.getId());

            if(parametros != null) {
                planta.setParametros(parametros);
            }
        }

        return list;
    }

    public Planta getById(Long id) throws NotFoundException {
        Planta item = plantaDao.getByKey(id);

        if(item == null) {
            throw new NotFoundException("Planta não encontrada");
        }

        List<PlantaDados> dados = plantaDadosDao.listByProperty("idPlanta", id, 10);

        if(dados != null) {
            item.setDados(dados);
        }

        PlantaParametros parametros = plantaParametrosDao.getByProperty("idPlanta", id);

        if(parametros != null) {
            item.setParametros(parametros);
        }

        return item;
    }

    public Planta insert(Planta item) throws ConflictException, NotFoundException {
        if(item == null)
        {
            throw new ConflictException("Planta não informada.");
        }
        else if(item.getNome() == null)
        {
            throw new ConflictException("Nome da planta não informada.");
        }

        Planta u = plantaDao.getByProperty("nome", item.getNome());

        if(u != null)
        {
            throw new ConflictException("Planta já cadastrada: " + u.getNome());
        }

        return plantaDao.insert(item);
    }

    public void update(Planta item) throws ConflictException, NotFoundException {
        if(item == null)
        {
            throw new ConflictException("Planta não informado.");
        }
        else if(item.getNome() == null)
        {
            throw new ConflictException("Nome da planta não informada.");
        }

        Planta u = plantaDao.getById(item.getId());

        if(u == null) {
            throw new NotFoundException("Planta não encontrada");
        }

        u = plantaDao.getByProperty("nome", item.getNome());

        if(u != null && !u.getId().equals(item.getId()))
        {
            throw new ConflictException("Nome da planta ja cadastrada: " + u.getNome());
        }

        plantaDao.update(item);
    }

    public void remove(long id) throws ConflictException, NotFoundException {
        Planta item = plantaDao.getByKey(id);

        if(item == null) {
            throw new NotFoundException("Planta não encontrada");
        }

        plantaDao.delete(item);
    }
}
