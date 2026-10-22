package com.renovadora.Crud.controller;

import com.renovadora.Crud.cadastro.Cadastro;
import com.renovadora.Crud.cadastro.CadastroRepository;
import com.renovadora.Crud.cadastro.CadastroRequestDTO;
import com.renovadora.Crud.cadastro.CadastroResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cadastros")
public class CadastroController {

    @Autowired
    private CadastroRepository repository;

    @PostMapping
    public void saveCadastro(@RequestBody CadastroRequestDTO data){
        Cadastro cadastroData = new Cadastro(data);
        repository.save(cadastroData);
        return;
    }

    @GetMapping
    public List<CadastroResponseDTO> getAll() {

        List<CadastroResponseDTO> CadastroList = repository.findAll().stream().map(CadastroResponseDTO::new).toList();
        return CadastroList;
    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<Void> deletar (@PathVariable Long id) {
        if(!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body
    ) {
        Boolean status = body.get("status");

        if (status == null) {
            return ResponseEntity.badRequest().build();
        }

        return repository.findById(id)
                .map(cadastro -> {
                    cadastro.setStatus(status);
                    repository.save(cadastro);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }






}
