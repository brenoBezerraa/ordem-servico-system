# 🚀 Ordem de Serviço System - Fullstack

Sistema completo para gerenciamento de Ordens de Serviço, desenvolvido com **Spring Boot (Backend)** e **React + Vite (Frontend)**.

Este projeto foi criado com base em uma necessidade real de organização de ordens de serviço empresariais, aplicando boas práticas de arquitetura, autenticação segura e separação de responsabilidades.

---

## 🏗️ Arquitetura do Projeto

ordem-servico-system/
│
├── backend/ → API REST (Spring Boot + JWT)
└── frontend/ → Interface Web (React + Vite)


---

## 🛠️ Tecnologias Utilizadas

### 🔹 Backend
- Java 25
- Spring Boot
- Spring Security
- JWT (JSON Web Token)
- JPA / Hibernate
- Maven
- Banco de dados relacional

### 🔹 Frontend
- React
- Vite
- TypeScript
- Axios
- CSS

---

## 🔐 Autenticação

O sistema utiliza autenticação baseada em **JWT**.

### Fluxo:

1. Usuário realiza login
2. Backend retorna um token JWT
3. Token é enviado no header das requisições protegidas:

Authorization: Bearer SEU_TOKEN_AQUI


---

## 📌 Principais Funcionalidades

### 👤 Autenticação
- Registro de usuário
- Login com geração de token
- Proteção de rotas

### 📋 Ordem de Serviço
- Criar ordem de serviço
- Listar ordens
- Atualizar ordem
- Deletar ordem
- Controle de status

---

## ⚙️ Como Executar o Projeto

---

### 🔹 1️⃣ Backend

```bash
cd backend
mvn spring-boot:run

A API rodará em:

http://localhost:8081

🔹 2️⃣ Frontend

cd frontend
npm install
npm run dev

O frontend rodará em:

http://localhost:5173

🌐 Endpoints Principais
🔑 Autenticação

    POST /auth/login

    POST /auth/register

📋 Ordens de Serviço

    GET /cadastros

    POST /cadastros

    PUT /cadastros/{id}

    DELETE /cadastros/{id}

🎯 Objetivo do Projeto

    Aplicar conceitos de API REST

    Implementar autenticação segura com JWT

    Praticar integração Frontend + Backend

    Simular um sistema real de uso empresarial

👨‍💻 Autor

Breno Bezerra
Estudante de Análise e Desenvolvimento de Sistemas
Desenvolvedor Fullstack em formação
