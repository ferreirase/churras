import {Router} from 'express';

import MiddlewareAuth from '../src/app/middlewares/auth';
import ParticipanteController from '../src/app/controllers/ParticipanteController';
import SchemaValidation from '../src/app/middlewares/schema-validations/participantesSchema';


const rotasParticipantes = new Router();

//rota para cadastro de usuário
rotasParticipantes.post('/participantes', SchemaValidation, ParticipanteController.adicionarParticipante);

rotasParticipantes.get('/participantes', [MiddlewareAuth],ParticipanteController.mostrarParticipantesPorChurras);

rotasParticipantes.delete('/participantes', [MiddlewareAuth],ParticipanteController.removerParticipante);

export default rotasParticipantes;