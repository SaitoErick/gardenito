package com.ciandt.gardenito.backend.services.endpoint;

import com.ciandt.gardenito.backend.services.entity.PlantaDados;
import com.ciandt.gardenito.backend.services.entity.PlantaParametros;
import com.ciandt.gardenito.backend.services.service.PlantaDadosService;
import com.ciandt.gardenito.backend.services.service.PlantaParametrosService;
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
    name = "plantaparametros",
    version = "v1",
    namespace = @ApiNamespace(
            ownerDomain = "endpoint.services.backend.gardenito.ciandt.com",
            ownerName = "endpoint.services.backend.gardenito.ciandt.com",
            packagePath = ""
    )
)
public class PlantaParametrosEndpoint {

    private PlantaParametrosService plantaParametrosService;

    public PlantaParametrosEndpoint() {
        plantaParametrosService = new PlantaParametrosService();
    }

    @ApiMethod(name = "getParametrosPlantas", path = "list", httpMethod = ApiMethod.HttpMethod.GET)
    public List<PlantaParametros> getParametrosPlantas(@Nullable @Named("idPlanta") Long idPlanta) throws NotFoundException {
        if(idPlanta == null)
            return plantaParametrosService.list();
        else
            return plantaParametrosService.list(idPlanta);
    }

    @ApiMethod(name = "getParametroPlanta", path = "get/{id}", httpMethod = ApiMethod.HttpMethod.GET)
    public PlantaParametros getParametroPlanta(@Named("id") Long id) throws NotFoundException {
        return plantaParametrosService.getById(id);
    }

    @ApiMethod(name = "getParametroByIdPlanta", path = "getByPlanta/{idPlanta}", httpMethod = ApiMethod.HttpMethod.GET)
    public PlantaParametros getParametroByIdPlanta(@Named("idPlanta") Long idPlanta) throws NotFoundException {
        return plantaParametrosService.getByIdPlanta(idPlanta);
    }

    @ApiMethod(name = "insertParametroPlanta", path = "new", httpMethod = ApiMethod.HttpMethod.POST)
    public PlantaParametros insertParametroPlanta(PlantaParametros planta) throws ConflictException, NotFoundException {
        return plantaParametrosService.insert(planta);
    }

    @ApiMethod(name = "updateParametroPlanta", path = "update", httpMethod = ApiMethod.HttpMethod.PUT)
    public void updateParametroPlanta(PlantaParametros planta) throws NotFoundException, ConflictException {
        plantaParametrosService.update(planta);
    }

    @ApiMethod(name = "deleteParametroPlanta", path = "delete/{idPlanta}", httpMethod = ApiMethod.HttpMethod.DELETE)
    public void deleteParametroPlanta(@Named("idPlanta") Long idPlanta) throws NotFoundException, ConflictException {
        plantaParametrosService.remove(idPlanta);
    }

}
