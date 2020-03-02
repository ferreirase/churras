/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-redeclare */
import React, {Component} from 'react';
import './style.css';
import Card from '../../Components/Card/index';
import CardAdd from '../../Components/Card/add';
import Input from '../../Components/Input/index';
import InputDate from '../../Components/Input/inputMaskDate';
import Button from '../../Components/Button/index';
import {ArrowBack} from '@material-ui/icons';

import axios from 'axios';
import Swal from 'sweetalert';


class Dash extends Component{

  state = {
    churras: [], 
    titleNewChurras: '', 
    dateNewChurras: '',
    obsNewChurras: '',
    valueWithDrink: '', 
    valueWithoutDrink: ''
  }; 

  componentDidMount = async () => {


    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: "bearer " + token }
    };

    try {
      await axios.get('http://localhost:3334/churras', config)
      .then((response) => {
        response.data.map(rsp => 
          this.setState({ churras: [...this.state.churras, rsp]}))

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

      console.log(this.state.churras);

    } catch (error) {
      Swal(`${error}`, {
        buttons: false,
        timer: 2000,
        icon: 'error'
      });
    }

  }


  handleChangeDate = e => {
    this.setState({
      dateNewChurras: e.target.value
    });
  }

  handleChangeTitle = e => {
    this.setState({
      titleNewChurras: e.target.value
    });
  }

  handleChangeObs = e => {
    this.setState({
      obsNewChurras: e.target.value
    });
  }

  handleChangeValueWith = e => {
    this.setState({
      valueWithDrink: e.target.value
    });
  }

  handleChangeValueWithout = e => {
    this.setState({
      valueWithoutDrink: e.target.value
    });
  }

  render(){

    const {churras} = this.state;
    
    return (
      <>
      <div className="flex-container">
        <div>
          <CardAdd title="Adicionar Churras" onclick={() => {
            document.querySelector("div.flex-container").style.display = 'none';
            document.querySelector("div.containterFormCreateChurras").style.display = 'flex';
          }} />
        </div>
        {churras.map(ch => <Card title={ch[0].descricao} 
          onclick={() => window.location.href = `/churras?id=${ch[0].id}`}
          date={ch[0].data}
        />)}
      </div>

      <div className="containterFormCreateChurras">
        
        <h3>Adicionar Churras</h3>
        <a href="#" >
          <ArrowBack 
            style={
              {
                position: 'absolute', 
                float: 'left', left: '10px', 
                top: '30px',
                color: 'whitesmoke', 
              }}

              fontSize="large"

              onClick={() => {
                document.querySelector("div.flex-container").style.display = 'flex';
                document.querySelector("div.containterFormCreateChurras").style.display = 'none';
                this.setState({
                  titleNewChurras: '', 
                  dateNewChurras: '',
                  obsNewChurras: '',
                  valueWithDrink: '', 
                  valueWithoutDrink: ''
                });
              }}
        /></a> <br/> <br/>
       
        <div className="inputsCreateChurras">

          <Input textInput="Título Churras" onchange={this.handleChangeTitle} 
            value={this.state.titleNewChurras}
          />

          <Input textInput="Valor com Bebida" 
            onchange={this.handleChangeValueWith}
          />

          <Input textInput="Valor sem Bebida" 
            onchange={this.handleChangeValueWithout}
          /> <br/>

          <InputDate textInput="Data(dd/mm/YYYY)" 
            handlechange={this.handleChangeDate} value={this.state.dateNewChurras} />

          <Input textInput="Observações" 
            onchange={this.handleChangeObs}
            value={this.state.obsNewChurras}
          /> <br/>

          <Button textButton="Criar" onclick={async () => {

            const token = localStorage.getItem("token");
            const config = {
              headers: { Authorization: "bearer " + token }
            };

            const arrayDate = this.state.dateNewChurras.split('/');

            try{
              await axios.post('http://localhost:3334/churras', {
                "data": `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0].trim()}T00:00:00-00:00`, 
                "desc": this.state.titleNewChurras, 
                "valor_com_bebida": this.state.valueWithDrink,
                "valor_sem_bebida": this.state.valueWithoutDrink,
                "obs": this.state.obsNewChurras ? this.state.obsNewChurras : ""
              }, config)
              .then((response) => {

                this.setState({
                  churras: [...this.state.churras, response.data],
                  titleNewChurras: '', 
                  dateNewChurras: '',
                  obsNewChurras: '',
                  valueWithDrink: '', 
                  valueWithoutDrink: ''
                });

                Swal("Churras criado com sucesso!", {
                  buttons: false,
                  timer: 1000,
                  icon: 'success'
                });

                setTimeout(() => {
                  document.querySelector("div.flex-container").style.display = 'flex';
                  document.querySelector("div.containterFormCreateChurras").style.display = 'none';
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
              Swal(`${error}`, {
                buttons: false,
                timer: 2000,
                icon: 'error'
              });
            }

          }} /> <br/> <br/>

        </div>
      </div>

      </>
      
    )
  }
}

export default Dash;
