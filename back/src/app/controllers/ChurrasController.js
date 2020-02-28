/* eslint-disable no-unused-vars */
import Churras from '../models/churras';
import Cadastro from '../models/cadastro';
import Participante from '../models/participante';
import {startOfHour, isBefore, parseISO, format} from 'date-fns';

class ChurrasController{
  async criarChurras(req, res){

    const {data, desc, obs, valor_com_bebida, valor_sem_bebida} = req.body;

    //o startOfHour sempre vai arredondar as horas
    //o parseISO vai converter a data recebida como string para um objeto date do JS
    const inicioHora = startOfHour(parseISO(data));


    //verificando se a data já passou
    if(isBefore(inicioHora, new Date())){
      return res.status(400).json({error: 'Data passadas não são permitidas!'});
    }

    //verificando disponibilidade da data informada
    const dataIndisponivel = await Churras.findOne({
      where: {
        data: inicioHora
      }
    });

    if(dataIndisponivel){
      return res.status(400).json({error: 'Data indisponível. Escolha outra data.'});
    }

    const novoChurras = await Churras.create({
      descricao: desc,
      data: inicioHora,
      valor_com_bebida,
      valor_sem_bebida,
      obs
    });

    return res.status(201).json([{
      id: novoChurras.id,
      descricao: novoChurras.descricao, 
      data: format(novoChurras.data, "dd'/'MM"),
      obs: novoChurras.obs, 
      valorComBebida: novoChurras.valor_com_bebida,
      valorSemBebida: novoChurras.valor_sem_bebida
    }]); 

  }

  async update(req, res){

    const {cpf, phone, bthd} = req.body;

    return res.json({
      cpf, phone, bthd
    });

  }

  async mostrarChurras(req, res){

    const churras = await Churras.findAll({
      attributes: ['id', 'descricao', 'data', 'obs', 'valor_com_bebida', 'valor_sem_bebida'],
      
    });

    if(!churras || churras.length === 0){
      return res.status(404).json({error: "Nenhum churras marcado!"});
    } 

    return res.status(200).json(
      churras.map(ch => [
        {
          id: ch.id,
          descricao: ch.descricao, 
          data: format(ch.data, "dd'/'MM"),
          obs: ch.obs, 
          valorComBebida: ch.valor_com_bebida,
          valorSemBebida: ch.valor_sem_bebida
        }
      ])
    );

  }

  async mostrarCadastro(req, res){
    const cadastro = await Cadastro.findAll({
      include: [
        {
          model: Churras, 
          as: 'churras'
        }, 
        {
          model: Participante, 
          as: 'participantes'
        }
      ]
    });

    if(!cadastro || cadastro.length === 0){
      return res.status(404).json({error: "Nenhum cadastro encontrado!"});
    } 

    return res.status(200).json(cadastro);
  }
}

export default new ChurrasController();