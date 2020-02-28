/* eslint-disable no-unused-vars */
import Sequelize, {Model} from 'sequelize';

class Churras extends Model{
  static init(sequelize){
    super.init(
      {
        descricao: Sequelize.STRING,
        data: Sequelize.DATE,
        obs: Sequelize.TEXT,
        valor_com_bebida: Sequelize.REAL,
        valor_sem_bebida: Sequelize.REAL
      }, 
      {
        sequelize,
      }
    );
  }
  
}

export default Churras;