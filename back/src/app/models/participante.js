import Sequelize, {Model} from 'sequelize';

class Participante extends Model{
  static init(sequelize){
    super.init(
      {
        nome: Sequelize.STRING,
        contribuicao: Sequelize.REAL,
        pago: Sequelize.BOOLEAN
      }, 
      {
        sequelize,
      }
    );

    return this;

  }

  // static associate(models){
  //   this.belongsTo(models.Churras, {as: 'dadosChurras', foreignKey: 'churras_id'});
  // }
}

export default Participante;