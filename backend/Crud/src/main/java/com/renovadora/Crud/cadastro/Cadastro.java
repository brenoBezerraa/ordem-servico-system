package com.renovadora.Crud.cadastro;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Table(name = "Cadastros")
@Entity(name = "Cadastros")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Cadastro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String servico;
    private boolean status;
    private String data_entrada;
    private String modelo;
    private Integer quantidade;
    private String numero;
    private BigDecimal valor;


    public Cadastro(CadastroRequestDTO data){
        this.servico = data.servico();
        this.status = data.status();
        this.name = data.name();
        this.modelo = data.modelo();
        this.quantidade = data.quantidade();
        this.data_entrada = data.data_entrada();
        this.numero = data.numero();
        this.valor = data.valor();

    }



}
