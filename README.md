# Churras
Sistema Web para cadastro e gerenciamento de churrascos.

# Iniciando o projeto

Para iniciar o projeto, baixe o repositório ou clone na sua máquina. 
Tenha instalado o Docker na sua máquina. 

Dentro da pasta 'front' e depois dentro da pasta 'back', rode no terminal o comando 'yarn' ou 'npm' para baixar as dependências do projeto.

No terminal, rode o comando 'docker import "caminho do arquivo do banco" "novo nome do banco"' para importar o arquivo de banco de dados. Depois rode o comando 'docker start "nome do arquivo de banco de dados" '.

Acesse o banco de dados pelo Postbird e com as credenciais: 
- Host: localhost, 
- Port: 5432, 
- Password:root

E crie a database 'trinca'; 

Rode no terminal 'yarn sequelize db:migrate' para subir as tabelas do banco de dados; 


# Rodando os servidores

Dentro da pasta 'front' e depois dentro da pasta 'back', rode no terminal o comando 'yarn dev' ou 'npm dev' para subir os servidores back e front-end. 

# Funcionalidades do sistema 

- Login(para fazer login, basta criar um novo usuário); 
- Criar churras; 
- Adicionar participantes a um churras;
- Deletar participante de um churras; 

# Tecnologias utilizadas

- Nodejs
- Sequelize ORM 
- Express 
- ReactJS
