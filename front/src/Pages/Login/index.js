import React, {Component} from 'react'; 
import {Link} from 'react-router-dom';
import EmailInput from '../../components/Input/index';
import PasswordInput from '../../components/Input/password';
import ButtonLogin from '../../components/Button/index';
import SpinnerButton from '../../components/Spinner/spinnerButton';
import SpinnerPage from '../../components/Spinner/spinnerPage';
import './style.css';
import axios from 'axios';
import Swal from 'sweetalert';

export default class Login extends Component{

  state = {
    email: '', 
    password: '',
    loader: true,
    loading: false
  };

  componentDidMount = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      this.setState({loader: false});
    }, 1000);
  }

  clearInputs = () => {
    this.setState({
      email: '', 
      password: ''
    });
  }

  handleChangeEmail = e => {
    e.preventDefault();
    this.setState({email: e.target.value});
  }

  handleChangePassword = e => {
    e.preventDefault();
    this.setState({password: e.target.value});
  }

  handleClickButton =  () => {
    this.setState({loading: true});

    if(!this.state.email || !this.state.password){
      this.setState({loading: false});
      Swal("Informe email e senha", {
        buttons: false, 
        timer: 1000, 
        icon: 'error'
      });
    }else{
      try {
        setTimeout(async () => {
          this.setState({loading: false});
  
          await axios.post("http://localhost:3334/login", {
            "email": this.state.email,
            "senha": this.state.password
          }).then(function (response){
            localStorage.setItem('token', response.data.token);
            window.location.href = "http://localhost:8080";
          }).catch(function (err) {
            if(err.response === undefined){
              Swal("Erro na Conexão!", {
                buttons: false, 
                timer: 2000, 
                icon: 'error'
              });
            }else{
              Swal(`${err.response.data.error}`, {
                buttons: false, 
                timer: 2000, 
                icon: 'error'
              });
            }
          });
        }, 1000);
  
      } catch (error) {
        Swal(`${error}`, {
          buttons: false, 
          timer: 2000, 
          icon: 'error'
        });
      }
    }
    
  }

  render(){

    const logo = require('../../assets/partyBBQ.jpg');
    const {loading, loader} = this.state;
    
    return (
      loader ? <SpinnerPage /> : 
      <>
        <div className="container">
        <div className="containerLogo">
          <img src={logo} alt="logo" className="logo"/>
        </div>
        <h1 className="titleLogin">Agenda de Churras</h1>
        <div className="containerInputs">
          <EmailInput nameInput="E-mail" 
            valueInput={this.state.email} 
            onchange={this.handleChangeEmail}  
          />
          <PasswordInput nameInput="Password" 
            valueInput={this.state.password}
            onchange={this.handleChangePassword}
          /> <br/> <br/>
          <ButtonLogin nameButton={loading ? <SpinnerButton /> : "Entrar"} 
            onClick={this.handleClickButton}
          /> <br/> <br/> <br/>
          <br/> <small>Não tem cadastro? <Link to="/register"><b>Clique AQUI</b></Link>.</small>
          <div className="trincaLogo">
            <p className="pTri">TRI</p>
            <p className="pNca">NCA</p>
          </div> <br/>
        </div>
        </div>
      </>
    )
  }
}

/**
 * 
 */
