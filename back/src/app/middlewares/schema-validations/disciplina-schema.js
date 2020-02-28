//usa-se * para importar tudo de dentro do Yup pq ele não tem um export default;
import * as Yup from 'yup';

export default async (req, res, next) => {
  
  const schema = Yup.object().shape({
    titulo: Yup.string().required(),
    horario: Yup.string().required(),
    carga_horaria: Yup.number().required()
  });
  
  if(!(await schema.isValid(req.body))){
    return res.status(400).json({error: 'Verifique os campos enviados!'});
  }

  next();

}