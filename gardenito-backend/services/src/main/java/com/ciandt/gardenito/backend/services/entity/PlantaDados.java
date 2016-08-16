package com.ciandt.gardenito.backend.services.entity;

import com.ciandt.gardenito.backend.services.entity.Planta;
import com.google.appengine.repackaged.com.google.api.client.util.DateTime;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Ignore;
import com.googlecode.objectify.annotation.Index;

import java.util.Date;

/**
 * Created by rodrigosclosa on 16/08/16.
 */
@Entity
public class PlantaDados {

    @Id
    private Long id;
    @Index
    private Long idPlanta;
    @Ignore
    private Planta planta;
    private Date ultima_data;
    private Float humidade_ar;
    private Float humidade_solo;
    private Float luminosidade;
    private Float temperatura;

    public PlantaDados() {
    }

    public PlantaDados(Long idPlanta, Planta planta, Date ultima_data, Float humidade_ar, Float humidade_solo, Float luminosidade, Float temperatura) {
        this.idPlanta = idPlanta;
        this.planta = planta;
        this.ultima_data = ultima_data;
        this.humidade_ar = humidade_ar;
        this.humidade_solo = humidade_solo;
        this.luminosidade = luminosidade;
        this.temperatura = temperatura;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdPlanta() {
        return idPlanta;
    }

    public void setIdPlanta(Long idPlanta) {
        this.idPlanta = idPlanta;
    }

    public Planta getPlanta() {
        return planta;
    }

    public void setPlanta(Planta planta) {
        this.planta = planta;
    }

    public Date getUltima_data() {
        return ultima_data;
    }

    public void setUltima_data(Date ultima_data) {
        this.ultima_data = ultima_data;
    }

    public Float getHumidade_ar() {
        return humidade_ar;
    }

    public void setHumidade_ar(Float humidade_ar) {
        this.humidade_ar = humidade_ar;
    }

    public Float getHumidade_solo() {
        return humidade_solo;
    }

    public void setHumidade_solo(Float humidade_solo) {
        this.humidade_solo = humidade_solo;
    }

    public Float getLuminosidade() {
        return luminosidade;
    }

    public void setLuminosidade(Float luminosidade) {
        this.luminosidade = luminosidade;
    }

    public Float getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(Float temperatura) {
        this.temperatura = temperatura;
    }
}
