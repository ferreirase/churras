import express from 'express';
import './src/database';
import './src/config/database';

import rotasUsuarios from './routes/usuarios.routes';
import rotasChurras from './routes/churras.routes';
import rotasParticipantes from './routes/participantes.routes';
import rotaLogin from './routes/login.routes';
import routeDisciplina from './routes/disciplinas.routes';
import routeTurma from './routes/turmas.routes';
import routeMatricula from './routes/matriculas.routes';
import routeToken from './routes/token.routes';

class App{
  constructor(){
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.server.use(express.json());

    this.server.use(function (req, res, next){
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    
  }

  routes(){
    this.server.use([rotasUsuarios, rotasChurras, rotasParticipantes,rotaLogin, routeDisciplina, routeTurma, routeMatricula, routeToken]);
  }
}

export default new App().server;