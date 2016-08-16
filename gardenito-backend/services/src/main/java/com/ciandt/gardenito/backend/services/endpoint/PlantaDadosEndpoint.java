package com.ciandt.gardenito.backend.services.endpoint;

import com.ciandt.gardenito.backend.services.entity.Planta;
import com.ciandt.gardenito.backend.services.entity.PlantaDados;
import com.ciandt.gardenito.backend.services.service.PlantaDadosService;
import com.ciandt.gardenito.backend.services.service.PlantaService;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Nullable;
import com.google.api.server.spi.response.ConflictException;
import com.google.api.server.spi.response.NotFoundException;

import java.util.List;

import javax.inject.Named;

/**
 * Created by rodrigosclosa on 29/12/15.
 */
@Api(
    name = "plantadados",
    version = "v1",
    namespace = @ApiNamespace(
            ownerDomain = "endpoint.services.backend.gardenito.ciandt.com",
            ownerName = "endpoint.services.backend.gardenito.ciandt.com",
            packagePath = ""
    )
)
public class PlantaDadosEndpoint {

    private PlantaDadosService plantaDadosService;

    public PlantaDadosEndpoint() {
        plantaDadosService = new PlantaDadosService();
    }

    @ApiMethod(name = "getDadosPlantas", path = "list", httpMethod = ApiMethod.HttpMethod.GET)
    public List<PlantaDados> getPlantas(@Nullable @Named("idPlanta") Long idPlanta) throws NotFoundException {
        if(idPlanta == null)
            return plantaDadosService.list();
        else
            return plantaDadosService.list(idPlanta);
    }

    @ApiMethod(name = "getDadosPlanta", path = "get/{id}", httpMethod = ApiMethod.HttpMethod.GET)
    public PlantaDados getPlanta(@Named("id") Long id) throws NotFoundException {
        return plantaDadosService.getById(id);
    }

    @ApiMethod(name = "insertDadosPlanta", path = "new", httpMethod = ApiMethod.HttpMethod.POST)
    public PlantaDados insertPlanta(PlantaDados planta) throws ConflictException, NotFoundException {
        return plantaDadosService.insert(planta);
    }

    @ApiMethod(name = "updateDadosPlanta", path = "update", httpMethod = ApiMethod.HttpMethod.PUT)
    public void updatePlanta(PlantaDados planta) throws NotFoundException, ConflictException {
        plantaDadosService.update(planta);
    }

    @ApiMethod(name = "deleteDadosPlanta", path = "delete/{id}", httpMethod = ApiMethod.HttpMethod.DELETE)
    public void deletePlanta(@Named("id") Long id) throws NotFoundException, ConflictException {
        plantaDadosService.remove(id);
    }

}
