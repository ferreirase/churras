import React, {Component} from 'react'; 
import {Link} from 'react-router-dom';
import EmailInput from '../../components/Input/index';
import NameInput from '../../components/Input/index';
import PasswordInput from '../../components/Input/password';
import PasswordRepeat from '../../components/Input/password';
import ButtonLogin from '../../components/Button/index';
import SpinnerButton from '../../components/Spinner/spinnerButton';
import SpinnerPage from '../../components/Spinner/spinnerPage';
import './style.css';
import Swal from 'sweetalert';
import axios from 'axios';

export default class Cadastro extends Component{
  state = {
    name: '',
    email: '', 
    password: '',
    repeatPassword: '',
    loading: false, 
    loader: true
  };

  componentDidMount(){
    setTimeout(() => {
      this.setState({loader: false});
    }, 1000);
  }

  clearInputs = () => {
    this.setState({
      name: '',
      email: '', 
      password: '', 
      repeatPassword: ''
    });
  }

  handleChangeEmail = e => {
    e.preventDefault();
    this.setState({email: e.target.value});
  }

  handleChangeName = e => {
    e.preventDefault();
    this.setState({name: e.target.value});
  }

  handleChangePassword = e => {
    e.preventDefault();
    this.setState({password: e.target.value});
  }

  handleChangeRepeatPassword = e => {
    e.preventDefault();
    this.setState({repeatPassword: e.target.value});
  }

  handleClickButton = () => {
    this.setState({loading: true});

    /*
    const token = localStorage.getItem("token");

    if(!token){
      Swal("Token não localizado ou inválido!", {
        buttons: false, 
        timer: 1000, 
        icon: 'error'
      });
    }
    const config = {
      headers: { Authorization: "bearer " + token }
    }; */

    const usuario = this.state.email.substring(0, this.state.email.indexOf("@"));
    const dominio = this.state.email.substring(this.state.email.indexOf("@")+ 1, this.state.email.length);
    
    if(!this.state.name ||!this.state.email || !this.state.password || !this.state.repeatPassword){
      this.setState({loading: false});
      Swal("Preencha todos os campos", {
        buttons: false, 
        timer: 1000, 
        icon: 'warning'
      });
    }else{
      if ((usuario.length >=1) && (dominio.length >=3) && 
      (usuario.search("@")==-1) &&  (dominio.search("@")==-1) &&
      (usuario.search(" ")==-1) && (dominio.search(" ")==-1) &&
      (dominio.search(".")!=-1) && (dominio.indexOf(".") >=1)&& 
      (dominio.lastIndexOf(".") < dominio.length - 1)){
        
        
        try {
          setTimeout(async () => {
            this.setState({loading: false});
            
            await axios.post('http://localhost:3334/usuarios', {
              nome: this.state.name, 
              email: this.state.email, 
              senha: this.state.password, 
              repSenha: this.state.repeatPassword
            }).then(function (response) {
              Swal("Usuário criado com sucesso!", {
                buttons: false, 
                timer: 1000, 
                icon: 'success'
              });
            }).catch(function (err) {
              if(err.response === undefined){
                Swal("Erro na conexão!", {
                  buttons: false, 
                  timer: 1000, 
                  icon: 'error'
                });
              }else{
                
                Swal(`${err.response.data.error}`, {
                  buttons: false, 
                  timer: 1000, 
                  icon: 'error'
                });
              }
            });

            this.clearInputs();

          }, 1000);

        } catch (error) {
          Swal(`${error}`, {
            buttons: false, 
            timer: 1000, 
            icon: 'error'
          });
        }
        
      }else{
        this.setState({loading: false});
        Swal("E-mail Inválido!", {
          buttons: false, 
          timer: 1000, 
          icon: 'warning'
        });
      }
    }
  }

  render(){

    const logo = require('../../assets/partyBBQ.jpg');
    const {loading, loader} = this.state;
    return (
     loader ? <SpinnerPage /> : 
      <div className="container">
        <div className="containerLogo">
          <img src={logo} alt="logo" className="logo"/>
        </div>
        <h1 className="titleLogin">Agenda de Churras</h1>
        <div className="containerInputs">

          <NameInput nameInput="Nome" 
              valueInput={this.state.name} 
              onchange={this.handleChangeName}
          />

          <EmailInput nameInput="E-mail" 
            valueInput={this.state.email} 
            onchange={this.handleChangeEmail}
          />

          <PasswordInput nameInput="Password" 
            valueInput={this.state.password}
            onchange={this.handleChangePassword}
          /> 
          <PasswordRepeat nameInput="Repeat Password"
            valueInput={this.state.repeatPassword}
            onchange={this.handleChangeRepeatPassword}
          /> <br/> <br/>

          <ButtonLogin nameButton={loading ? <SpinnerButton /> : "Cadastrar"} 
            onClick={this.handleClickButton}
          /> <br/> <br/> <br/>
          <br/> <small>Já tem cadastro? <Link to="/login"><b>Faça Login</b></Link>.</small>
          <div className="trincaLogo">
            <p className="pTri">TRI</p>
            <p className="pNca">NCA</p>
          </div> <br/>
        </div>
      </div>
    )
  }
};
