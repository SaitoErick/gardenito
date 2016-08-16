package com.ciandt.gardenito.backend.services.entity;

import com.google.appengine.api.datastore.Text;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Ignore;
import java.util.List;

/**
 * Created by rodrigosclosa on 16/08/16.
 */
@Entity
public class Planta {

    @Id
    private Long id;
    private String nome;
    private Text foto;
    @Ignore
    private List<PlantaDados> dados;

    public Planta() {
    }

    public Planta(String nome, Text foto) {
        this.nome = nome;
        this.foto = foto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Text getFoto() {
        return foto;
    }

    public void setFoto(Text foto) {
        this.foto = foto;
    }

    public List<PlantaDados> getDados() {
        return dados;
    }

    public void setDados(List<PlantaDados> dados) {
        this.dados = dados;
    }
}
