import {Router} from 'express';

import MiddlewareAuth from '../src/app/middlewares/auth';
import ChurrasController from '../src/app/controllers/ChurrasController';
import SchemaValidation from '../src/app/middlewares/schema-validations/churrasSchema';


const rotasChurras = new Router();

//rota para cadastro de churras
rotasChurras.post('/churras', [MiddlewareAuth, SchemaValidation], ChurrasController.criarChurras);

//rota para exibição de churras 
rotasChurras.get('/churras', [MiddlewareAuth], ChurrasController.mostrarChurras);

//rota para exibição de cadastros 
rotasChurras.get('/cadastros', [MiddlewareAuth], ChurrasController.mostrarCadastro);


export default rotasChurras;