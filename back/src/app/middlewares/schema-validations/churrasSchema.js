//usa-se * para importar tudo de dentro do Yup pq ele não tem um export default;
import * as Yup from 'yup';

export default async (req, res, next) => {
  
  const schema = Yup.object().shape({
    data: Yup.date().required(),
    desc: Yup.string().required(),
    valor_com_bebida: Yup.number().required(),
    valor_sem_bebida: Yup.number().required(),
    obs: Yup.string(),
  });
  
  if(!(await schema.isValid(req.body))){
    return res.status(400).json({error: 'Verifique os campos enviados!'});
  }
  
  next();

}

