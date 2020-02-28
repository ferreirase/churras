const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //indicando o arquivo de entrada da aplicação
  entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
  output: {
    //indicar onde vai exportar o arquivo bundle(arquivo final com todo o código JS/React)
    path: path.resolve(__dirname, 'public'), 
    //nome do arquivo resultante
    filename: 'bundle.js', 
    publicPath: '/'
  }, 
  devServer: {
    contentBase: path.resolve(__dirname, 'public'), 
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ],
  module: {
    //regras: informando pra o webpack quem vai lidar com cada tipo de arquivo (loaders). ex: com arquivos JS, o Babel vai lidar.
    rules: [
      {
        //passando uma regex para encontrar um arquivo .js e termine com .js e antes disso venha qualquer caractere.
        test: /\.js$/, 
        //ignorando a pasta node_modules
        exclude: /node_modules/,
        use: {
          //importando loaders para cada tipo de arquivo
          loader: 'babel-loader'
        }
      }, 
      {
        test: /\.css$/, 
        use: [
          //o style-loader é para q quando a aplicação importar um arquivo .css ele tenha efeito onde foi chamado
          {loader: 'style-loader'},
          //o css-loader é para o webpack entender as importações de outros arquivos dentro dos arquivos .css
          {loader: 'css-loader'}
        ]
      }, 
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        use: {
          loader: 'file-loader'
        }
      }
    ],
  },
};