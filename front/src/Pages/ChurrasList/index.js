import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import List from '../../Components/List/item';
import {ArrowBack, MonetizationOn, People} from '@material-ui/icons';
import AddPeopleButton from '../../Components/Button/add';
import Input from '../../Components/Input/index';
import Button from '../../Components/Button/index';
import Select from '../../Components/Select/index';

import axios from 'axios';
import Swal from 'sweetalert';

import './style.css';

class ListChurras extends Component{

  state = {
    churrasID: '',
    titleChurras: '', 
    dateChurras: '',
    totalPeoples: '', 
    totalMoney: '',
    valueChurrasWhitDrink: '', 
    valueChurrasWhitoutDrink: '',
    nameParticipant: '',
    peoples: []
  }; 

  componentDidMount = async () => {
    const values = queryString.parse(this.props.location.search);
    this.setState({churrasID: values.id});

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: "bearer " + token }
    };

    try {
      await axios.get(`http://localhost:3334/participantes?churras=${values.id}`, config)
      .then((response) => {
        this.setState({
          titleChurras: response.data.descricao, 
          dateChurras: response.data.data,
          peoples: response.data.cadastros, 
          totalPeoples: response.data.totalParticipantes, 
          totalMoney: response.data.totalArrecadado, 
          valueChurrasWhitDrink: response.data.valorComBebida, 
          valueChurrasWhitoutDrink: response.data.valorSemBebida
        });

        console.log(this.state.peoples);
      }).catch((err) => {
        if(err.response === undefined){
          Swal("Erro na conexão!", {
            buttons: false,
            timer: 2000,
            icon: 'error'
          });
        }else{
          this.setState({
            titleChurras: err.response.data.dadosChurras.descricao, 
            dateChurras: err.response.data.dadosChurras.data, 
            totalPeoples: 0, 
            totalMoney: 0, 
            valueChurrasWhitDrink: err.response.data.dadosChurras.valor_com_bebida,
            valueChurrasWhitoutDrink: err.response.data.dadosChurras.valor_sem_bebida, 
          });

          Swal(`${err.response.data.error}`, {
            buttons: false,
            timer: 2000,
            icon: 'error'
          });
        }
      });
    } catch (error) {
      Swal(`${error}`, {
        buttons: false,
        timer: 2000,
        icon: 'error'
      });
    }
  }

  handleInputNameChange = e => {
    this.setState({
      nameParticipant: e.target.value
    });
  }

  render(){
    return (  
      <>
      <div className="containerListPeoples">
        <h1>
        <AddPeopleButton onclick={() => {
          document.querySelector('div.containerListPeoples').style.display = 'none';
          document.querySelector('div.containerAddPeople').style.display = 'block';
          
        }}/>
        <Link to="/app">
          <ArrowBack style={{color: 'whitesmoke',float: 'left', position: 'relative', top: '40px', left: '40px'}} 
          fontSize="large" />
        </Link>
        {this.state.titleChurras}
          <br/> <small>{
                  this.state.dateChurras} <br/>
                  <small style={{position: 'relative', left: '-30px'}}><MonetizationOn />&nbsp;{this.state.totalMoney ? this.state.totalMoney : 0}</small> 
                    &nbsp;&nbsp;&nbsp;&nbsp; 
                  <small style={{position: 'relative', left: '-30px'}}><People />&nbsp;{this.state.totalPeoples}</small>
                </small></h1> 
        {
          this.state.peoples ? 
            this.state.peoples.map(people => 
              <List primary={people.participantes.nome} 
                secondary={`R$${people.participantes.contribuicao},00`} onclick={async () => {

                const token = localStorage.getItem("token");
                const config = {
                  headers: { Authorization: "bearer " + token }
                };

               try{
                await axios.delete(`http://localhost:3334/participantes?id=${people.participantes.id}`, config)
                .then((response) => {

                  this.setState({
                    peoples: this.state.peoples.filter(p => p.id !== people.id), 
                    totalMoney: this.state.totalMoney - people.participantes.contribuicao, 
                    totalPeoples: this.state.totalPeoples - 1 
                  });

                  Swal("Participante deletado com sucesso!", {
                    buttons: false,
                    timer: 2000,
                    icon: 'success'
                  });
                }).catch((err) => {
                  if(err.response === undefined){
                    Swal("Erro na conexão!", {
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
               }catch(error){
                Swal(`${error}`, {
                  buttons: false,
                  timer: 2000,
                  icon: 'error'
                });
               }

              }}/>) 

          : ""
        }
      </div>

      <div className="containerAddPeople">
        <h2>Adicionar Participante</h2> 
        <div className="containerAddParticipanteForm">
          <Input textInput="Nome Participante" onchange={this.handleInputNameChange} 
            value={this.state.nameParticipant}
          /> 
          <Select valueWhithDrink={this.state.valueChurrasWhitDrink}
            valueWhithoutDrink={this.state.valueChurrasWhitoutDrink}
          /> <br/> <br/>
          <Button textButton="Adicionar" onclick={async () => {
            const token = localStorage.getItem("token");
            const config = {
              headers: { Authorization: "bearer " + token }
            };

            try{
              await axios.post('http://localhost:3334/participantes', {
                "nome": this.state.nameParticipant, 
                "contribuicao": localStorage.getItem('opt'), 
                "churras_id": this.state.churrasID, 
                "pago": true
              }, config)
              .then((response) => {

                Swal("Participante adicionado com sucesso!", {
                  buttons: false,
                  timer: 1000,
                  icon: 'success'
                });

                setTimeout(() => {
                  this.setState({
                    peoples: [...this.state.peoples, response.data], 
                    totalMoney: this.state.totalMoney + response.data.participantes.contribuicao, 
                    totalPeoples: this.state.totalPeoples + 1, 
                    nameParticipant: ''
                  });

                  document.querySelector('div.containerListPeoples').style.display = 'block';
                  document.querySelector('div.containerAddPeople').style.display = 'none';
                }, 1500);


              }).catch((err) => {
                if(err.response === undefined){
                  Swal("Erro na conexão!", {
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
            }catch(error){
              Swal(`error`, {
                buttons: false,
                timer: 2000,
                icon: 'error'
              });
            }

          }}/> 
          <Button textButton="Cancelar/Voltar" onclick={() => {
            document.querySelector('div.containerListPeoples').style.display = 'block';
            document.querySelector('div.containerAddPeople').style.display = 'none';
          }}/>
        </div>
      </div>

      </>
    )
  }
  
}

export default ListChurras;
