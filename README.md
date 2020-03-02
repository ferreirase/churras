# Churras
Sistema Web para cadastro e gerenciamento de churrascos.

# Iniciando o projeto

Para iniciar o projeto, baixe o repositório ou clone na sua máquina.  

Dentro da pasta 'front' e depois dentro da pasta 'back', rode no terminal o comando 'yarn' ou 'npm' para baixar as dependências do projeto.

# Configurações Banco de Dados

Dentro da pasta 'back/config', no arquivo 'config.json' informe as credenciais para acesso ao seu banco; 
Dentro da pasta 'back/src/config' no arquivo 'database.js'informe as credenciais para acesso ao seu banco;

Crie a database 'trinca' no seu banco de dados, ou informe no campo 'database' dos arquivos de configuração acima para setar uma banco de dados já existente e vazio; 

# Criando as tabelas no Banco de Dados 
Depois de instalar as dependências todas, entre na pasta 'back', abra o terminal e rode o comando 'yarn sequelize db:migrate' para o Sequelize subir as migrations de criação das tabelas;

Após esse passo, rode no terminal o comando 'yarn sequelize db:seed:all' para o Sequelize subir todas as seeders e criar o usuário Admin. 


# Rodando os servidores

Dentro da pasta 'front' rode no terminal o comando 'yarn start' e depois dentro da pasta 'back', rode no terminal o comando 'yarn dev' ou 'npm dev' para subir os servidores back e front-end. 

# Funcionalidades do sistema 
- Usuário Admin(admin@gmail.com) e Senha Admin(123456); 
- Criar churras; 
- Adicionar participantes a um churras;
- Deletar participante de um churras; 

# Tecnologias utilizadas

- Nodejs
- Sequelize ORM 
- Express 
- ReactJS
