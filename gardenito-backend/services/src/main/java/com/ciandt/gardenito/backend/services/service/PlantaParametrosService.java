package com.ciandt.gardenito.backend.services.service;

import com.ciandt.gardenito.backend.services.dao.PlantaDadosDao;
import com.ciandt.gardenito.backend.services.dao.PlantaParametrosDao;
import com.ciandt.gardenito.backend.services.entity.PlantaDados;
import com.ciandt.gardenito.backend.services.entity.PlantaParametros;
import com.google.api.server.spi.response.ConflictException;
import com.google.api.server.spi.response.NotFoundException;

import java.util.List;

/**
 * Created by rodrigosclosa on 29/12/15.
 */
public class PlantaParametrosService {

    private PlantaParametrosDao plantaParametrosDao;

    public PlantaParametrosService() {
        plantaParametrosDao = new PlantaParametrosDao();
    }

    public List<PlantaParametros> list() {
        return plantaParametrosDao.listAll();
    }

    public List<PlantaParametros> list(Long idPlanta) throws NotFoundException {
        List<PlantaParametros> list = plantaParametrosDao.listByProperty("idPlanta", idPlanta);

        if(list == null || list.size() < 1) {
            throw new NotFoundException("Nenhum parâmetro encontrado para a planta com ID: " + idPlanta);
        }

        return list;
    }

    public PlantaParametros getById(Long id) throws NotFoundException {
        PlantaParametros item = plantaParametrosDao.getByKey(id);

        if(item == null) {
            throw new NotFoundException("Parâmetros da Planta não encontrados.");
        }

        return item;
    }

    public PlantaParametros getByIdPlanta(Long idPlanta) throws NotFoundException {
        PlantaParametros item = plantaParametrosDao.getByProperty("idPlanta", idPlanta);

        if(item == null) {
            throw new NotFoundException("Parâmetros da Planta não encontrados.");
        }

        return item;
    }

    public PlantaParametros insert(PlantaParametros item) throws ConflictException, NotFoundException {
        if(item == null)
        {
            throw new ConflictException("Parâmetros da planta não informados.");
        }
        else if(item.getIdPlanta() == null)
        {
            throw new ConflictException("ID da planta não informado.");
        }
        else if(item.getHumidade_ar_min() == null)
        {
            throw new ConflictException("Humidade do ar mínima não informada.");
        }
        else if(item.getHumidade_ar_max() == null)
        {
            throw new ConflictException("Humidade do ar máxima não informada.");
        }
        else if(item.getHumidade_solo_max() == null)
        {
            throw new ConflictException("Humidade do solo máxima não informada.");
        }
        else if(item.getHumidade_solo_min() == null)
        {
            throw new ConflictException("Humidade do solo mínima não informada.");
        }
        else if(item.getLuminosidade_max() == null)
        {
            throw new ConflictException("Luminosidade máxima não informada.");
        }
        else if(item.getLuminosidade_min() == null)
        {
            throw new ConflictException("Luminosidade mínima não informada.");
        }
        else if(item.getTemperatura_max() == null)
        {
            throw new ConflictException("Temperatura máxima não informada.");
        }
        else if(item.getTemperatura_min() == null)
        {
            throw new ConflictException("Temperatura mínima não informada.");
        }

        PlantaParametros u = plantaParametrosDao.getByProperty("idPlanta", item.getIdPlanta());

        if(u != null)
        {
            throw new ConflictException("Parâmetros da Planta já cadastrados.");
        }

        return plantaParametrosDao.insert(item);
    }

    public void update(PlantaParametros item) throws ConflictException, NotFoundException {
        if(item == null)
        {
            throw new ConflictException("Parâmetros da planta não informados.");
        }
        else if(item.getIdPlanta() == null)
        {
            throw new ConflictException("ID da planta não informada.");
        }
        else if(item.getHumidade_ar_min() == null)
        {
            throw new ConflictException("Humidade do ar mínima não informada.");
        }
        else if(item.getHumidade_ar_max() == null)
        {
            throw new ConflictException("Humidade do ar máxima não informada.");
        }
        else if(item.getHumidade_solo_max() == null)
        {
            throw new ConflictException("Humidade do solo máxima não informada.");
        }
        else if(item.getHumidade_solo_min() == null)
        {
            throw new ConflictException("Humidade do solo mínima não informada.");
        }
        else if(item.getLuminosidade_max() == null)
        {
            throw new ConflictException("Luminosidade máxima não informada.");
        }
        else if(item.getLuminosidade_min() == null)
        {
            throw new ConflictException("Luminosidade mínima não informada.");
        }
        else if(item.getTemperatura_max() == null)
        {
            throw new ConflictException("Temperatura máxima não informada.");
        }
        else if(item.getTemperatura_min() == null)
        {
            throw new ConflictException("Temperatura mínima não informada.");
        }

        PlantaParametros u = plantaParametrosDao.getById(item.getId());

        if(u == null) {
            throw new NotFoundException("Parâmetros da Planta não encontrados");
        }

        plantaParametrosDao.update(item);
    }

    public void remove(long idPlanta) throws ConflictException, NotFoundException {
        PlantaParametros item = plantaParametrosDao.getByProperty("idPlanta", idPlanta);

        if(item == null) {
            throw new NotFoundException("Parâmetros da Planta não encontrados");
        }

        plantaParametrosDao.delete(item);
    }
}
