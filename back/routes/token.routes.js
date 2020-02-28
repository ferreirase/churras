import {Router} from 'express';

import MiddlewareAuth from '../src/app/middlewares/auth';


const routeToken = new Router();


//rota matrícula em uma turma
routeToken.post('/auth/token', MiddlewareAuth);


export default routeToken;