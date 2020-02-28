import {Router} from 'express';

import LoginController from '../src/app/controllers/LoginController';
import SchemaValidation from '../src/app/middlewares/schema-validations/loginSchema';


const rotaLogin = new Router();


//rota para cadastro de usuário
rotaLogin.post('/login', SchemaValidation, LoginController.authenticate);


export default rotaLogin;