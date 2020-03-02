import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.css';

import InputEmail from '../../Components/Input/index';
import InputPass from '../../Components/InputPass/index';
import Button from '../../Components/Button/index';
import Loader from '../../Components/Loader/index';

import axios from 'axios';
import Swal from 'sweetalert';

class Login extends Component{

  state = {
    email: '', 
    password: '', 
    loading: false
  };

  componentDidMount = () => {
    localStorage.removeItem('token');
  }

  handleEmailChange = e => {
    this.setState({email: e.target.value});
  }

  handlePassChange = e => {
    this.setState({password: e.target.value});
  }

  handleClickLogin = async (e) => {
    e.preventDefault();
    
    this.setState({loading: true});

    setTimeout(async () => {
      try {
        await axios.post('http://localhost:3334/login', {
          "email": this.state.email, 
          "senha": this.state.password
        }).then((response) => {
          localStorage.setItem('token', response.data.token);
          this.setState({loading: false});
          window.location.href = '/app';
  
        }).catch((err) => {
          if(err.response === undefined){
            this.setState({loading: false});
  
            Swal("Erro na conexão!", {
              buttons: false,
              timer: 2000,
              icon: 'error'
            });
          }else{
            this.setState({loading: false});
            Swal(`${err.response.data.error}`, {
              buttons: false,
              timer: 2000,
              icon: 'error'
            });
          }
        });
      } catch (error) {
          this.setState({loading: false});
          Swal(`${error}`, {
            buttons: false,
            timer: 2000,
            icon: 'error'
          });
        }
    }, 1500);
    }

  render(){

    return (
      <div className="containerOutFormLogin">
        <div className="containerInFormLogin">
          <InputEmail textInput="E-mail" onchange={this.handleEmailChange} value={this.state.email} /> <br/>
          <InputPass textInput="Password" onchange={this.handlePassChange} value={this.state.password} classname="inputPass"/>
          <Button classname="buttonLogin" 
            textButton={this.state.loading ? <Loader /> : "Login"} 
            onclick={this.handleClickLogin} 
          />
          <small>Não tem cadastro? <Link to='/createAccount'>Clique aqui.</Link></small>
        </div>
      </div>
    )
  }
}

export default Login;
