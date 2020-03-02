/* eslint-disable no-unused-vars */
import Participante from '../models/participante';
import Churras from '../models/churras';
import Cadastro from '../models/cadastro';
import {format} from 'date-fns';

class ParticipanteController{
  async adicionarParticipante(req, res){

    const participante = await Participante.findOne({
      where: {
        nome: req.body.nome
      }
    });

    if(participante){
      const cadastrado = await Cadastro.findOne({
        where: {
          participante_id: participante.id, 
          churras_id: req.body.churras_id
        }
      });
  
      if(cadastrado){
        return res.status(401).json({error: 'Participante já cadastrado nesse churras!'});
      }

      const novoCadastro = await Cadastro.create({
        churras_id: req.body.churras_id, 
        participante_id: participante.id
      });
  
      const participantes = await Participante.findByPk(novoCadastro.participante_id);
      const churras = await Churras.findByPk(novoCadastro.churras_id);
  
      return res.status(201).json({participantes, churras});

    }

    const novoParticipante = await Participante.create({
      nome: req.body.nome, 
      contribuicao: req.body.contribuicao, 
      pago: req.body.pago
    });

    const novoCadastro = await Cadastro.create({
      churras_id: req.body.churras_id, 
      participante_id: novoParticipante.id
    });

    const participantes = await Participante.findByPk(novoCadastro.participante_id);
    const churras = await Churras.findByPk(novoCadastro.churras_id);

    return res.status(201).json({participantes, churras});

  }

  async removerParticipante(req, res){

    const participante = await Participante.findByPk(req.query.id);

    if(!participante){
      return res.status(404).json({error: "Participante não encontrado!"});
    }

    await participante.destroy();

    return res.status(200).json({message: 'Participante removido!'});

  }

  async mostrarParticipantesPorChurras(req, res){

    const churras = await Churras.findByPk(req.query.churras);

    if(!churras){
      return res.status(404).json({error: "Churras não encontrado!"});
    }

    const cadastros = await Cadastro.findAll({
      where: {
        churras_id: req.query.churras,
      },
      include: [
        {
          model: Participante, 
          as: 'participantes'
        }, 
        {
          model: Churras, 
          as: 'churras'
        }
      ]
    });

    const dadosChurras = await Churras.findByPk(req.query.churras);

    if(!cadastros || cadastros.length === 0){
      return res.status(400).json({
        error: "Nenhum participante cadastrado!", 
        "dadosChurras": {
          "id": dadosChurras.id,
          "descricao": dadosChurras.descricao,
          "data": format(dadosChurras.data, "dd/MM"),
          "obs": dadosChurras.obs,
          "valor_com_bebida": dadosChurras.valor_com_bebida,
          "valor_sem_bebida": dadosChurras.valor_sem_bebida,
        }
      });
    } 

    let totalRecolta = 0; 

    cadastros.map(cadastro => {
      totalRecolta += cadastro.participantes.contribuicao;
    });

    return res.json({
      'totalParticipantes': cadastros.length, 
      'totalArrecadado': totalRecolta, 
      'descricao': cadastros[0].churras.descricao,
      'data': format(cadastros[0].churras.data, "dd/MM"),
      'valorComBebida': cadastros[0].churras.valor_com_bebida,
      'valorSemBebida': cadastros[0].churras.valor_sem_bebida,
      cadastros
    }); 
  }
}

export default new ParticipanteController();