import React, {Component} from 'react';
import './style.css';
import Card from '../../components/Card/index';
import CardAddChurras from '../../components/Card/addChurras';
import List from '../../components/List/index';
import Button from '../../components/Button/index';
import ChipNameEvent from '../../components/Chip/index';
import Input from '../../components/Input/index';
import Radio from '../../components/Radio/index';
import LogoutButton from '../../components/Icons/Logout/index';
import Swal from 'sweetalert';
import axios from 'axios';

class Main extends Component{

  state = {
    atualEvent: '',
    totalPeople: '', 
    totalMoney: '',
    nomes: [],
    newParticipant: [],
    newChurras: [],
    valueWithDrink: '',
    valueWithoutDrink: '',
    name: '',
    idName: '',
    idChurras: '',
    radio: '',
    events: [],
    addChurrasDate: '', 
    addChurrasDesc: '', 
    addChurrasValueWithDrink: '', 
    addChurrasValueWithoutDrink: '', 
    addChurrasObs: ''
  }

  handleClickCard = () => {
    document.querySelector('div.flex-container').style.visibility = "hidden";
    document.querySelector('div.containerListNomes').style.visibility = "visible";
  }

  handleChangeInput = e => {
    this.setState({name: e.target.value});
  }

  handleRadioChange = e => {
    this.setState({radio: e.target.value});
  }

  //funções para manipulações dos inputs do form de add churras
  handleChangeDesc = e => {
    this.setState({
      addChurrasDesc: e.target.value
    });
  }

  handleChangeDate = e => {
    this.setState({
      addChurrasDate: e.target.value
    });
  }

  handleChangeValueWith = e => {
    this.setState({
      addChurrasValueWithDrink: e.target.value
    });
  }

  handleChangeValueWithout = e => {
    this.setState({
      addChurrasValueWithoutDrink: e.target.value
    });
  }

  handleChangeObs = e => {
    this.setState({
      addChurrasObs: e.target.value
    });
  }

  componentDidMount = async () => {
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
    };

    try {
      await axios.get('http://localhost:3334/churras', config)
      .then((response) => {
        this.setState({events: response.data});
        console.log(this.state.events);
      })
      .catch(function (err) {
        if(err.response === undefined){
          Swal('Erro de conexão!', {
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

    } catch (error) {
      Swal(`error`, {
        buttons: false, 
        timer: 1000, 
        icon: 'error'
      });
    }
    document.getElementById("body").classList.add("white");
  }

  render(){

    const {events, nomes} = this.state;
    const logo = require('../../assets/partyBBQ.jpg');


    return (
      <>
        <div className="containerLogout">
          <LogoutButton onclick={async () => {
            const result = await Swal("Tem certeza que quer sair?", {
              dangerMode: true,
              icon: 'warning',
              buttons: ["Cancelar", "Sair"],
              className: "buttonLogout"
            });

            if(result === true || result === 'true'){
              window.location.href = "http://localhost:8080/login";
            }
          }}/>
        </div>

        <div className="dividerContainer">
          <div className="trincaLogo logoDash">
            <p className="pTri">TRI</p>
            <p className="pNca">NCA</p>
          </div> 
        </div>
  
        <div className="flex-container">
          {events.map(event => 
            <Card titleEvent={event[0].descricao} 
            dateEvent={event[0].data}
            onclick={async () => {
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
              };

              document.querySelector('div.flex-container').style.visibility = "hidden";
              document.querySelector('div.containerListNomes').style.visibility = "visible";
              
              try{
                await axios.get(`http://localhost:3334/participantes?churras=${event[0].id}`, config)
                .then((response) => {
                  this.setState({
                    totalPeople: response.data.totalParticipantes, 
                    totalMoney: response.data.totalArrecadado, 
                    atualEvent: response.data.descricao, 
                    idChurras: event[0].id,
                    nomes: response.data.cadastros,
                    valueWithDrink: response.data.valorComBebida, 
                    valueWithoutDrink: response.data.valorSemBebida, 
                  });
                }).catch((err) => {
                  if(err.response === undefined){
                    Swal("Erro na conexão!", {
                      buttons: false, 
                      timer: 1000, 
                      icon: 'error'
                    });
                  }else{
                    if(err.response.data.dadosChurras){
                      this.setState({
                        valueWithDrink: err.response.data.dadosChurras.valor_com_bebida, 
                        valueWithoutDrink: err.response.data.dadosChurras.valor_sem_bebida, 
                        atualEvent: err.response.data.dadosChurras.descricao, 
                        idChurras: err.response.data.dadosChurras.id
                      });
                    }
                    Swal(`${err.response.data.error}`, {
                      buttons: false, 
                      timer: 1000, 
                      icon: 'error'
                    });
                  }
                });
              }catch(error){
                Swal("Erro de rede!", {
                  buttons: false, 
                  timer: 1000, 
                  icon: 'error'
                });
              }

            }}
            />)}

          <CardAddChurras onclick={() => {
            document.querySelector('div.flex-container').style.visibility = "hidden";
            document.querySelector('div.containerFormChurras').style.visibility = "visible";
          }}/>

        </div> 
        
        <div className="containerListNomes">
          <ChipNameEvent nameEvent={this.state.atualEvent} 
            totalPeople={this.state.totalPeople.length === 0 ? '0' : this.state.totalPeople}
            totalMoney={`R$ ${this.state.totalMoney},00`}
          />

          <div className="containerButtonAdicionar">
            <Button nameButton="Adicionar" onClick={() => {
              document.querySelector('div.containerAddPessoa').style.visibility = "visible";
              document.querySelector('div.containerListNomes').style.visibility = "hidden";
            }}/>
          </div>

          <div className="containerButtonVoltar">
            <Button nameButton="Voltar" onClick={() => {
              this.setState({
                atualEvent: '',
                totalPeople: '', 
                totalMoney: '',
                nomes: [],
                newParticipant: [],
                newChurras: [],
                valueWithDrink: '',
                valueWithoutDrink: '',
                name: '',
                idName: '',
                idChurras: '',
                radio: '',
              });
              document.querySelector('div.flex-container').style.visibility = "visible";
              document.querySelector('div.containerListNomes').style.visibility = "hidden";
            }}/>
  
          </div>
          
          <div className="listNomes">
            {nomes.map(name => <List name={name.participantes.nome} value={name.participantes.contribuicao}  
              color={name.participantes.pago ? "green" : "red"} 
              onclickEdit={() => {
                this.setState({name: name.participantes.nome });
                document.querySelector('div.containerEditPessoa').style.visibility = "visible";
                document.querySelector('div.containerListNomes').style.visibility = "hidden";
              }}
              onclickDelete={async () => {
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
                };

                const result = await Swal("Deletar participante?", {
                  dangerMode: true,
                  icon: 'warning',
                  buttons: ["Cancelar", "Deletar"],
                  className: "buttonLogout"
                });

                if(result === true || result === 'true'){
                  try{
                    await axios.delete(`http://localhost:3334/participantes?id=${name.participantes.id}`, config)
                  .then((response) => {
                    this.setState({
                      nomes: this.state.nomes.filter(nome => nome.participantes.id !== name.participantes.id),
                      totalPeople: this.state.totalPeople - 1, 
                      totalMoney: this.state.totalMoney - name.participantes.contribuicao
                    });
                    Swal("Participante deletado com sucesso!", {
                      buttons: false, 
                      timer: 1000, 
                      icon: 'success'
                    });
                  }).catch((err) => {
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
                  }catch(error){
                    Swal(`${error}`, {
                      buttons: false, 
                      timer: 1000, 
                      icon: 'error'
                    });
                  } 
                }
              }}
              />)
            }
          </div>
          
        </div>

        <div className="containerFormChurras">
          <img src={logo} alt="logo" className="logoChurrasAdd"/>
          <div className="containerFormAddChurras">
            <h1>Adicionar Churras</h1>
            <Input nameInput="Descrição" onchange={this.handleChangeDesc} 
              valueInput={this.state.addChurrasDesc}

              />
            <Input nameInput="Data" onchange={this.handleChangeDate}
              valueInput={this.state.addChurrasDate}
            />

            <Input nameInput="Valor com Bebida" onchange={this.handleChangeValueWith}
              valueInput={this.state.addChurrasValueWithDrink}
            />

            <Input nameInput="Valor sem Bebida" onchange={this.handleChangeValueWithout} 
              valueInput={this.state.addChurrasValueWithoutDrink}
            />

            <Input nameInput="Observações" onchange={this.handleChangeObs} 
              valueInput={this.state.addChurrasObs}
            /> <br/> <br/>

            <Button nameButton="Adicionar" onClick={async () => {
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
              };

              if(!this.state.addChurrasDesc || !this.state.addChurrasDate || 
                !this.state.addChurrasValueWithDrink || !this.state.addChurrasValueWithoutDrink              ){
                  Swal("Preencha todos os campos!", {
                  buttons: false, 
                  timer: 1000, 
                  icon: 'error'
                });
              }else{
                const date = this.state.addChurrasDate.split("/");

              await axios.post('http://localhost:3334/churras', {
                "data": `${date[2]}-${date[1]}-${date[0]}T00:00:00-00:00`, 
                "desc": this.state.addChurrasDesc, 
                "valor_com_bebida": this.state.addChurrasValueWithDrink,
                "valor_sem_bebida": this.state.addChurrasValueWithoutDrink, 
                "obs": this.state.addChurrasObs ? this.state.addChurrasObs : "" 
              }, config)
              .then((response) => {
                Swal("Churras criado com sucesso!", {
                  buttons: false, 
                  timer: 1000, 
                  icon: 'success'
                });
                this.setState({
                  events: [...events, response.data]
                });

                setTimeout(() => {
                  document.querySelector('div.flex-container').style.visibility = "visible";
                  document.querySelector('div.containerFormChurras').style.visibility = "hidden";
                }, 1000);
              }).catch((err) => {
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
              }

              

              
            }}/> <br/>
            <Button nameButton="Cancelar" onClick={() => {
            document.querySelector('div.flex-container').style.visibility = "visible";
            document.querySelector('div.containerFormChurras').style.visibility = "hidden";
            }}/>
          </div>
        </div>

        <div className="containerAddPessoa">
          <img src={logo} alt="logo" className="logoChurrasAdd"/>
            <div className="containerFormAddChurras">
              <h2>Adicionar Participante</h2>
              <Input nameInput="Nome" onchange={this.handleChangeInput} 
                valueInput={this.state.name} 

                />  <br/>
              <Radio valueTextWith={this.state.valueWithDrink} valueTextWithout={this.state.valueWithoutDrink} />
              <Button nameButton="Adicionar" onClick={async () => {
                const token = localStorage.getItem("token");
                const opt = localStorage.getItem('opt');
                const contribuicao = opt === 'comBebida' ? 
                  this.state.valueWithDrink : this.state.valueWithoutDrink;

                if(!token){
                  Swal("Token não localizado ou inválido!", {
                    buttons: false, 
                    timer: 1000, 
                    icon: 'error'
                  });
                }

                const config = {
                  headers: { Authorization: "bearer " + token }
                };

                try{
                  await axios.post('http://localhost:3334/participantes', {
                    "nome": this.state.name, 
                    "contribuicao": contribuicao, 
                    "churras_id": this.state.idChurras, 
                    "pago": false
                  })
                  .then((response) => {
                    this.setState({
                      name: '', 
                      newParticipant: response.data.participantes,
                      newChurras: response.data.churras
                    });

                    Swal("Participante adicionado com sucesso!", {
                      buttons: false, 
                      timer: 1000, 
                      icon: 'success'
                    });

                    const arrayAdd = [{participantes: this.state.newParticipant, churras: this.state.newChurras}];

                    this.setState({
                      nomes: [...nomes, arrayAdd[0]]
                    });

                    setTimeout(() => {
                      document.querySelector('div.containerListNomes').style.visibility = "visible";
                      document.querySelector('div.containerAddPessoa').style.visibility = "hidden";
                    }, 1500);

                  }).catch((err) => {
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
                }catch(err){
                  Swal(`${err}`, {
                    buttons: false, 
                    timer: 1000, 
                    icon: 'error'
                  });
                }
                
              }}/> <br/>

              <Button nameButton="Cancelar" onClick={() => {
                document.querySelector('div.containerListNomes').style.visibility = "visible";
                document.querySelector('div.containerAddPessoa').style.visibility = "hidden";
              }}/>
            </div>
        </div>

        <div className="containerEditPessoa">
          <img src={logo} alt="logo" className="logoChurrasAdd"/>
            <div className="containerFormAddChurras">
              <h2>Editar Participante</h2>
              <Input nameInput="Nome" onchange={this.handleChangeInput} valueInput={this.state.name}/>  <br/>
              <Radio className="radio" />
              <Button nameButton="Salvar" onClick={() => {
                if(!this.state.name.length || this.state.name.length === 0){
                  alert('Preencha o nome corretamente')
                }else{
                  alert('passou')
                }
              }} /> <br/>
              <Button nameButton="Cancelar" onClick={() => {
                document.querySelector('div.containerListNomes').style.visibility = "visible";
                document.querySelector('div.containerEditPessoa').style.visibility = "hidden";
              }}/>
            </div>
        </div>
        
      </>
    )
  }
  
}

export default Main;
