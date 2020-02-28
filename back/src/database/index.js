import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Usuario from '../app/models/usuario';
import Churras from '../app/models/churras';
import Participante from '../app/models/participante';
import Cadastro from '../app/models/cadastro';


const models = [Usuario, Cadastro, Churras, Participante];

class Database{
  constructor(){
    this.init();
  }

  init(){
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();