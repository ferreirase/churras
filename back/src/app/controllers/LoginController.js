import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';
import AuthConfig from '../../config/auth';

class LoginController{
  async authenticate(req, res){
  
    const {email, senha} = req.body;

    const usuario = await Usuario.findOne({where: {email}});

    if(!usuario){
      return res.status(401).json({error: "Usuário não encontrado!", code: 1});
    }

    if(!(await usuario.checkPassword(senha))){
      return res.status(401).json({error: "Senha incorreta!", code: 2});
    }

    const {id, nome } = usuario;

    return res.status(200).json({
      id: id, 
      nome: nome,
      email: email,
      //primeiro parametro: dado do usuário q quero manipular ou agregar no token
      token: jwt.sign({id}, AuthConfig.secret, {
        //data de expiração do token
        expiresIn: AuthConfig.expiresIn,
      }),
    });
  }
}

export default new LoginController();