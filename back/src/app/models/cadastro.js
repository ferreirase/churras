import Sequelize, {Model} from 'sequelize';

class Cadastro extends Model{
  static init(sequelize){
    super.init(
      {
        
        churras_id: Sequelize.INTEGER,
        participante_id: Sequelize.INTEGER
      }, 
      {
        sequelize,
      }
    );

    return this;

  }

  static associate(models){
    this.belongsTo(models.Participante, {as: 'participantes', foreignKey: 'participante_id'});
    this.belongsTo(models.Churras, {as: 'churras', foreignKey: 'churras_id'});
  }
}

export default Cadastro;