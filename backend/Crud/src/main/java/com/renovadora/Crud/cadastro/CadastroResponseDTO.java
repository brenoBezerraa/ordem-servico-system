package com.renovadora.Crud.cadastro;

import java.math.BigDecimal;

public record CadastroResponseDTO(Long id, String name,
                                  String servico,
                                  boolean status,
                                  Integer quantidade,
                                  String data_entrada,
                                  String modelo,
                                  String numero,
                                  BigDecimal valor
) {
    public CadastroResponseDTO(Cadastro cadastro){
        this(
                cadastro.getId(),
                cadastro.getName(),
                cadastro.getServico(),
                cadastro.isStatus(),
                cadastro.getQuantidade(),
                cadastro.getData_entrada(),
                cadastro.getModelo(),
                cadastro.getNumero(),
                cadastro.getValor()
        );

    }
}
