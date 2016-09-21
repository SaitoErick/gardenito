package com.ciandt.gardenito.backend.services.entity;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

/**
 * Created by rodrigosclosa on 21/09/16.
 */
@Entity
public class PlantaParametros {
    @Id
    private Long id;
    @Index
    private Long idPlanta;
    private Float humidade_ar_min;
    private Float humidade_ar_max;
    private Float humidade_solo_min;
    private Float humidade_solo_max;
    private Float luminosidade_min;
    private Float luminosidade_max;
    private Float temperatura_min;
    private Float temperatura_max;

    public PlantaParametros() {
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

    public Float getHumidade_ar_min() {
        return humidade_ar_min;
    }

    public void setHumidade_ar_min(Float humidade_ar_min) {
        this.humidade_ar_min = humidade_ar_min;
    }

    public Float getHumidade_ar_max() {
        return humidade_ar_max;
    }

    public void setHumidade_ar_max(Float humidade_ar_max) {
        this.humidade_ar_max = humidade_ar_max;
    }

    public Float getHumidade_solo_min() {
        return humidade_solo_min;
    }

    public void setHumidade_solo_min(Float humidade_solo_min) {
        this.humidade_solo_min = humidade_solo_min;
    }

    public Float getHumidade_solo_max() {
        return humidade_solo_max;
    }

    public void setHumidade_solo_max(Float humidade_solo_max) {
        this.humidade_solo_max = humidade_solo_max;
    }

    public Float getLuminosidade_min() {
        return luminosidade_min;
    }

    public void setLuminosidade_min(Float luminosidade_min) {
        this.luminosidade_min = luminosidade_min;
    }

    public Float getLuminosidade_max() {
        return luminosidade_max;
    }

    public void setLuminosidade_max(Float luminosidade_max) {
        this.luminosidade_max = luminosidade_max;
    }

    public Float getTemperatura_min() {
        return temperatura_min;
    }

    public void setTemperatura_min(Float temperatura_min) {
        this.temperatura_min = temperatura_min;
    }

    public Float getTemperatura_max() {
        return temperatura_max;
    }

    public void setTemperatura_max(Float temperatura_max) {
        this.temperatura_max = temperatura_max;
    }
}
