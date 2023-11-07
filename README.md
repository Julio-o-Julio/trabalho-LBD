# trabalho-LBD

Sistema de Gerenciamento de Tarefas Pessoais

### Como rodar o projeto na sua máquina

1. Abra o terminal em uma pasta de sua escolha e faça o clone do repositório rodando este código:

> git clone https://github.com/Julio-o-Julio/trabalho-LBD.git

2. Após clonar o repositório, entre na pasta do repositório rodando o comando ainda no seu terminal:

> cd ./trabalho-LBD

3. Agora precisamos de um terminal para rodar o Back-end e o Docker, abra o Docker e também abra mais um terminal na pasta trabalho-LBD.

4. Após abir mais um terminal e o Docker rode os seguintes comandos em um deles:

> cd ./api
> npm install
> docker-compose up -d
> npm run dev

5. No outro terminal rode os seguintes comandos em um deles:

> cd ./front
> npm install
> npm run dev

6. Para abrir o projeto no seu navegador, basta entrar nesta url: [http://localhost:5173/](http://localhost:5173/)
