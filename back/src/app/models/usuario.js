import Sequelize, {Model} from 'sequelize';
import bcrypt from 'bcryptjs';

class Usuario extends Model{
  static init(sequelize){
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        //um tipo VIRTUAL não vai para o banco de dados, é só pra receber e tratar um dado
        senha: Sequelize.VIRTUAL,
        hash_senha: Sequelize.STRING,
      }, 
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async usuario => {
      if(usuario.senha){
        usuario.hash_senha = await bcrypt.hash(usuario.senha, 8);
      }
    });

    return this;
  }

  // static associate(models){
  //   this.belongsTo(models.Endereco, {foreignKey: 'endereco_id', as: 'dadosEndereco'});
  // }

  checkPassword(password){
    return bcrypt.compare(password, this.hash_senha);
  }
}

export default Usuario;