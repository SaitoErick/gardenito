package com.ciandt.gardenito.backend.services.entity;

import com.google.appengine.api.datastore.Text;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Ignore;

import java.util.Date;
import java.util.List;

/**
 * Created by rodrigosclosa on 16/08/16.
 */
@Entity
public class Planta {

    @Id
    private Long id;
    private String nome;
    private String localizacao;
    private Date dataCadastro;
    private String descricao;
    private Boolean ativa;
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

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public Date getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(Date dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Boolean getAtiva() {
        return ativa;
    }

    public void setAtiva(Boolean ativa) {
        this.ativa = ativa;
    }
}
