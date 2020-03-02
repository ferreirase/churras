import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.css';

import Input from '../../Components/Input/index';
import InputPass from '../../Components/InputPass/index';
import Button from '../../Components/Button/index';
import Loader from '../../Components/Loader/index';

import axios from 'axios';
import Swal from 'sweetalert';

class Create extends Component{

  state = {
    name: '',
    email: '', 
    password: '', 
    repPassword: '',
    loading: false
  };

  componentDidMount = () => {
    localStorage.removeItem('token');
  }

  handleNameChange = e => {
    this.setState({name: e.target.value});
  }

  handleEmailChange = e => {
    this.setState({email: e.target.value});
  }

  handlePassChange = e => {
    this.setState({password: e.target.value});
  }

  handleRepPassChange = e => {
    this.setState({repPassword: e.target.value});
  }

  handleClickLogin = async (e) => {
    e.preventDefault();
    
    this.setState({loading: true});

    setTimeout(async () => {
      try {
        await axios.post('http://localhost:3334/usuarios', {
          "nome": this.state.name, 
          "email": this.state.email, 
          "senha": this.state.password, 
          "repSenha": this.state.repPassword
        }).then((response) => {

          this.setState({
            name: '', 
            email: '', 
            repPassword: '', 
            password: '', 
            loading: false
          });

          Swal("Usuário criado com sucesso!", {
            buttons: false,
            timer: 2000,
            icon: 'success'
          });
  
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
      <div className="containerOutFormCreate">
        <div className="containerInFormCreate">
          <Input textInput="Name" onchange={this.handleNameChange} value={this.state.name} /> <br/>
          <Input textInput="E-mail" onchange={this.handleEmailChange} value={this.state.email} /> <br/>
          <InputPass textInput="Password" onchange={this.handlePassChange} value={this.state.password} classname="inputPass"/> <br/>
          <InputPass textInput="Repeat Password" onchange={this.handleRepPassChange} value={this.state.repPassword} classname="inputPass" />
          <Button classname="buttonCreate" 
            textButton={this.state.loading ? <Loader /> : "Criar"} 
            onclick={this.handleClickLogin} 
          />
          <small>Já tem cadastro? <Link to='/'>Clique aqui.</Link> </small>
        </div>
      </div>
    )
  }
}

export default Create;
