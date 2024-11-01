PlusHealth - Sistema de Gestão de Movimentação de Produtos Farmacêuticos
Sumário

1. Introdução
2. Tecnologias Utilizadas
3. Configuração e Execução do Projeto
4. Funcionalidades
5. Estrutura do Projeto
6. Contribuições e Melhorias Futuras

1. Introdução
O projeto PlusHealth visa transformar a forma como gerenciamos movimentações de produtos entre as filiais de uma organização farmacêutica. Por meio deste sistema, a equipe terá uma plataforma centralizada e intuitiva para gerenciar estoques e a movimentação de produtos entre diferentes locais de operação. Desenvolvido em React Native com backend em Node.js e banco de dados SQLite, o aplicativo proporciona uma interface amigável para facilitar a gestão dos produtos e acompanhamento de entregas.

Tecnologias Utilizadas
Frontend: React Native, TypeScript, Expo
Backend: Node.js, com API fornecida
Banco de Dados: SQLite (configurado no backend)
Gerenciamento de Rotas: React Navigation/Expo Router
Outras Ferramentas: Expo, React Native Paper


2. Configuração e Execução do Projeto

Clone o repositório do frontend: https://github.com/lucasbbecker/projeto_modulo_1.git
git clone [URL do Repositório]

Navegue até o diretório do projeto e instale as dependências no terminal:
npm install

Baixe o aplicativo Expo Go no seu dispositivo móvel para testar o aplicativo.

Clone o backend a partir do repositório template_m1:
git clone https://github.com/DEVinHouse-Clamed-V3/template_m1

Instale as dependências e inicie o backend:
npm install
npm run start

Atualize o IP de sua máquina no arquivo .env do frontend:
Encontre seu IP com o comando ipconfig (Windows) ou ifconfig (Mac/Linux).
Atualize o endereço de rede no .env para garantir a comunicação com o backend.
Acesse o aplicativo usando o login inicial fornecido:

Usuário: admin@gmail.com
Senha: 123456

Funcionalidades:

1. Tela de Login
Permite login com credenciais de administrador ou de usuário.
Primeiro Acesso: Utilizar as credenciais do admin para iniciar o cadastro de novos usuários.

2. Tela de Home
Exibe as opções principais:
Listagem de Produtos
Gerenciamento de Usuários
Inclui um cabeçalho com perfil e nome do usuário logado.

3. Gerenciamento de Usuários
Cadastro de Usuários: Inclusão de novos usuários com perfil motorista ou filial, CPF/CNPJ, endereço, e credenciais.
Listagem de Usuários: Exibe usuários em um layout de cartões com indicadores visuais de status.
Alteração de Status: Cada usuário possui um Switch que permite ativar ou desativar seu status com atualização na API.

4. Listagem de Produtos
Exibe produtos disponíveis com detalhes como nome, filial, e quantidade.
Inclui campo de pesquisa para facilitar a filtragem de produtos.

5. Movimentação de Produtos
Listagem de Movimentações: Exibe movimentações com detalhes de origem, destino e status.
Cadastro de Movimentação: Formulário para iniciar novas movimentações, incluindo seleção de filial e produto, quantidade e observações.
Movimentação para Motoristas: Exibe fases da entrega com interações de captura de imagem para iniciar e finalizar entregas.

6. Mapa e Rastreamento
Visualização do trajeto de movimentações entre filiais para motoristas.
Estrutura do Projeto

A organização do projeto segue a estrutura modular para facilitar a expansão e manutenção do código:

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
  

Contribuições e Melhorias Futuras
Sugestões de melhorias futuras incluem:

Criar componentes para os cards e para o botão de Logout
Adicionar animações ao mudar de tela e ao mudar a fase das movimentações de mercadoria.
