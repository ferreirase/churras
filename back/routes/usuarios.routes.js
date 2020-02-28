import {Router} from 'express';

//import MiddlewareAuth from '../src/app/middlewares/auth';
import UsuarioController from '../src/app/controllers/UsuarioController';
import SchemaValidation from '../src/app/middlewares/schema-validations/usuarioSchema';


const rotasUsuarios = new Router();

//rota para cadastro de usuário
rotasUsuarios.post('/usuarios', SchemaValidation, UsuarioController.cadastrarUsuario);


export default rotasUsuarios;