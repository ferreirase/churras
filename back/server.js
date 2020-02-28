import app from './app';

app.all('/', function(req, res, next) {
  
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');

  next();
});


app.listen(3334);