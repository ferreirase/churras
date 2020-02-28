//usa-se * para importar tudo de dentro do Yup pq ele não tem um export default;
import * as Yup from 'yup';

export default async (req, res, next) => {
  
  const schema = Yup.object().shape({
    nome: Yup.string().required(),
    email: Yup.string().email().required(),
    senha: Yup.string().min(6).required(),
    repSenha: Yup.string().min(6).required(),
  });
  
  if(!(await schema.isValid(req.body))){
    return res.status(400).json({error: 'Verifique os campos enviados!'});
  }

  if(req.body.senha !== req.body.repSenha){
    return res.status(400).json({error: 'As senhas informadas não são iguais!'});
  }

  next();

}

