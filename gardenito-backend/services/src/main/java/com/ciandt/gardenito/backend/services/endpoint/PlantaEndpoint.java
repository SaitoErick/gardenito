package com.ciandt.gardenito.backend.services.endpoint;

import com.ciandt.gardenito.backend.services.entity.Planta;
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
    name = "planta",
    version = "v1",
    namespace = @ApiNamespace(
            ownerDomain = "endpoint.services.backend.gardenito.ciandt.com",
            ownerName = "endpoint.services.backend.gardenito.ciandt.com",
            packagePath = ""
    )
)
public class PlantaEndpoint {

    private PlantaService plantaService;

    public PlantaEndpoint() {
        plantaService = new PlantaService();
    }

    @ApiMethod(name = "getPlantas", path = "list", httpMethod = ApiMethod.HttpMethod.GET)
    public List<Planta> getPlantas(@Nullable @Named("nome") String nome) throws NotFoundException {
        if(nome == null)
            return plantaService.list();
        else
            return plantaService.list(nome);
    }

    @ApiMethod(name = "getPlanta", path = "get/{id}", httpMethod = ApiMethod.HttpMethod.GET)
    public Planta getPlanta(@Named("id") Long id) throws NotFoundException {
        return plantaService.getById(id);
    }

    @ApiMethod(name = "insertPlanta", path = "new", httpMethod = ApiMethod.HttpMethod.POST)
    public Planta insertPlanta(Planta planta) throws ConflictException, NotFoundException {
        return plantaService.insert(planta);
    }

    @ApiMethod(name = "updatePlanta", path = "update", httpMethod = ApiMethod.HttpMethod.PUT)
    public void updatePlanta(Planta planta) throws NotFoundException, ConflictException {
        plantaService.update(planta);
    }

    @ApiMethod(name = "deletePlanta", path = "delete/{id}", httpMethod = ApiMethod.HttpMethod.DELETE)
    public void deletePlanta(@Named("id") Long id) throws NotFoundException, ConflictException {
        plantaService.remove(id);
    }

}
