package com.ciandt.gardenito.backend.services.util;

import com.ciandt.gardenito.backend.services.entity.Planta;
import com.ciandt.gardenito.backend.services.entity.PlantaDados;
import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyFactory;
import com.googlecode.objectify.ObjectifyService;

/**
 * Created by rodrigosclosa on 29/12/15.
 */
public class OfyService {

    static {
        ObjectifyService.register(Planta.class);
        ObjectifyService.register(PlantaDados.class);
    }

    public static Objectify ofy() {
        return ObjectifyService.ofy();
    }

    public static ObjectifyFactory factory() {
        return ObjectifyService.factory();
    }

}
