/* eslint-disable no-unused-vars */
import Usuario from '../models/usuario';

class UsuarioController{
  async cadastrarUsuario(req, res){

    const usuario = await Usuario.findOne({where: {
      email: req.body.email
    }});

    if(usuario){
      return res.status(401).json({error: 'Usuário já cadastrado!'});
    }

    const {id, nome, email, senha} = await Usuario.create({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha
    });

    return res.status(201).json({id, nome, email});

  }

  async update(req, res){

    const {cpf, phone, bthd} = req.body;

    return res.json({
      cpf, phone, bthd
    });

  }

  async show(req, res){

    const usuarios = await Usuario.findAll({
      attributes: ["nome", "email", "ativo"]
    });

    if(!usuarios){
      return res.status(400).json({error: "Nenhum usuário cadastrado!"});
    }

    return res.json(usuarios);
  }
}

export default new UsuarioController();