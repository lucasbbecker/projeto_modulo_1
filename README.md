# PlusHealth - Sistema de Gestão de Movimentação de Produtos Farmacêuticos

## Índice

1. [Introdução](#1-introdução)
2. [Tecnologias Utilizadas](#2-tecnologias-utilizadas)
3. [Configuração e Execução do Projeto](#3-configuração-e-execução-do-projeto)
   - [Preparando o frontend](#31-preparando-o-frontend)
   - [Preparando o backend](#32-preparando-o-backend)
   - [Configurando o IP](#33-configurando-o-ip)
   - [Primeiro acesso](#34-primeiro-acesso)  
4. [Funcionalidades](#4-funcionalidades)
5. [Estrutura do Projeto](#5-estrutura-do-projeto)
6. [Telas](#6-telas)
7. [Contribuições e Melhorias Futuras](#7-contribuições-e-melhorias-futuras)
8. [Vídeo do projeto](#8-vídeo-do-projeto)
   
---

## 1. Introdução

O projeto PlusHealth visa transformar a forma como gerenciamos movimentações de produtos entre as filiais de uma organização farmacêutica. Por meio deste sistema, a equipe terá uma plataforma centralizada e intuitiva para gerenciar estoques e a movimentação de produtos entre diferentes locais de operação. Desenvolvido em React Native com backend em Node.js e banco de dados SQLite, o aplicativo proporciona uma interface amigável para facilitar a gestão dos produtos e acompanhamento de entregas.

---

## 2. Tecnologias Utilizadas
Frontend: React Native, TypeScript, Expo
Backend: Node.js, com API fornecida
Banco de Dados: SQLite (configurado no backend)
Gerenciamento de Rotas: React Navigation/Expo Router
Outras Ferramentas: Expo, React Native Paper

---

## 3. Configuração e Execução do Projeto

  ### 3.1 Preparando o frontend
  
  1. Clone o repositório do frontend: https://github.com/lucasbbecker/projeto_modulo_1.git
     
    git clone [URL do Repositório]

  2. Navegue até o diretório do projeto e instale as dependências no terminal:

    npm install

  3. Baixe o aplicativo Expo Go no seu dispositivo móvel para testar o aplicativo.
     
    https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&pli=1

  ### 3.2 Preparando o backend
  
  1. Clone o backend a partir do repositório template_m1:
  
    git clone https://github.com/DEVinHouse-Clamed-V3/template_m1

  2. Instale as dependências e inicie o backend:

    npm install
    
    npm run start

  ### 3.3 Configurando o IP

  1. Encontre seu IP com o comando ipconfig (Windows) ou ifconfig (Mac/Linux).

    ipconfig //Windows
    ifconfig //Mac/Linux
    
  2. Atualize o endereço de rede no .env para garantir a comunicação com o backend.
  
  ### 3.4 Primeiro acesso.
  
  - Acesse o aplicativo usando o login inicial fornecido:
    ```bash
    Usuário: admin@gmail.com
    Senha: 123456

---

## 4. Funcionalidades:

  - Tela de Login
    - Permite login com credenciais de administrador ou de usuário.
    - Primeiro Acesso: Utilizar as credenciais do admin para iniciar o cadastro de novos usuários.

  - Tela de Home
    - Exibe as opções principais:
    - Listagem de Produtos
    - Gerenciamento de Usuários
    - Inclui um cabeçalho com perfil e nome do usuário logado.

  - Gerenciamento de Usuários
    - Cadastro de Usuários: Inclusão de novos usuários com perfil motorista ou filial, CPF/CNPJ, endereço, e credenciais.
    - Listagem de Usuários: Exibe usuários em um layout de cartões com indicadores visuais de status.
    - Alteração de Status: Cada usuário possui um Switch que permite ativar ou desativar seu status com atualização na API.

  - Listagem de Produtos
    - Exibe produtos disponíveis com detalhes como nome, filial, e quantidade.
    - Inclui campo de pesquisa para facilitar a filtragem de produtos.

  - Movimentação de Produtos
    - Listagem de Movimentações: Exibe movimentações com detalhes de origem, destino e status.
    - Cadatro de Movimentação: Formulário para iniciar novas movimentações, incluindo seleção de filial e produto, quantidade e observações.
    - Movimentação para Motoristas: Exibe fases da entrega com interações de captura de imagem para iniciar e finalizar entregas.

  - Mapa e Rastreamento
    - Visualização do trajeto de movimentações entre filiais para motoristas.

---

  ## 5. Estrutura do Projeto

  1. A organização do projeto segue a estrutura modular para facilitar a expansão e manutenção do código:

    /src
      /components
        - Header.tsx
      /screens
        - CreateMoviment.tsx
        - CreateUser.tsx
        - LoginScreen.tsx
        - HomeScreen.tsx
        - Mapa.tsx
        - UserList.tsx
        - ProductList.tsx
        - MovementList.tsx
        - MovementListDriver.tsx
      .env

---

## 6. Telas

  - Login

![Imagem do WhatsApp de 2024-11-01 à(s) 20 28 51_4ecccfe2](https://github.com/user-attachments/assets/c234b20e-28d7-4b83-a818-89081be897b7)

  - Tela do Administrador:

![Imagem do WhatsApp de 2024-11-01 à(s) 20 29 16_9d1aeb56](https://github.com/user-attachments/assets/3e387e97-d61e-49b5-b193-171d55185975)

  - Produtos cadastrados:

![Imagem do WhatsApp de 2024-11-01 à(s) 20 29 35_b80b4e74](https://github.com/user-attachments/assets/3914f48e-098d-4af8-9f1c-83124143baf7)

  - Usuários cadastrados:

![Imagem do WhatsApp de 2024-11-01 à(s) 20 29 59_1625fecd](https://github.com/user-attachments/assets/a9d41141-050d-46dc-9338-55d986011dbd)

  - Cadastrar usuário:

![Imagem do WhatsApp de 2024-11-01 à(s) 20 31 06_cf9f0d21](https://github.com/user-attachments/assets/781cd0a3-8070-4517-848d-b62ef9b4c804)

  - Tela de movimentações(Filial):

![Imagem do WhatsApp de 2024-11-01 à(s) 20 31 40_8921c200](https://github.com/user-attachments/assets/be7ed568-e115-445b-8675-6368495b704b)

  - Tela de criar movimentação:

![Imagem do WhatsApp de 2024-11-01 à(s) 20 40 40_9e7e6842](https://github.com/user-attachments/assets/4aee23bb-dcda-482a-a478-fd893a09d0c3)

  - Tela de Movimentações(Motorista):

![Imagem do WhatsApp de 2024-11-01 à(s) 20 41 27_a1dd425d](https://github.com/user-attachments/assets/fb228b5d-2759-41bd-93b7-5339ffa79062)

  - Mapa:

![Imagem do WhatsApp de 2024-11-01 à(s) 20 41 46_d5ed4edc](https://github.com/user-attachments/assets/4b568cf9-0c75-4304-991f-eb7e19dc8d6d)

---

  ## 7. Contribuições e Melhorias Futuras

  - Sugestões de melhorias futuras incluem:
    - Criar componentes para os cards e para o botão de Logout
    - Adicionar animações ao mudar de tela e ao mudar a fase das movimentações de mercadoria.

---

  ## 8. Vídeo do projeto
  
  - link para o vídeo:
    ```bash
    
    https://drive.google.com/file/d/1Wh2Vz6ZB5F6NObWbEpnUzRcYLanPbV3I/view?usp=drive_link
