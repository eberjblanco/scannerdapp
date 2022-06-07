import React, {useState, Component} from "react";
import { InputText, inputText } from 'primereact/inputtext';
import { Menubar } from 'primereact/menubar';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { Button } from 'primereact/button';
import Funciones from '../js/Funciones';
import { Toast } from 'primereact/toast';
import Web3 from 'web3/dist/web3.min.js';
import Web3Modal from "web3modal";
import detectEthereumProvider from '@metamask/detect-provider';



export default class MenubarComp extends React.Component {
  constructor(props) {
    super(props);
    this.showError = this.showError.bind(this); 
    this.showSuccess = this.showSuccess.bind(this);    
    this.state = {
      conexion:false,
      items:''

    };
    this.itemsMenu=''
  }

  async  conectar() {

    const ethereum = window.ethereum;
    
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })  
       
        //guardas en un estado

          this.setState({conexion : true})
          localStorage.setItem('address',accounts)
        
        this.showSuccess()
        
    } catch (error) {      
      this.showError()
    }
    
  }

  desconectar(){
    
    localStorage.removeItem('address')
    this.setState({conexion : false})

  }

  showSuccess() {
      this.toast.show({severity:'success', summary: 'Logueado con éxito', detail:'Bienvenido', life: 3000});
  }

  showError() {
    this.toast.show({severity:'error', summary: 'Error al conectarse a Metamask', detail:'Verifique que tiene instalado MetaMask o inicie sesión', life: 3000});
  }

  agregarDapp(){
    console.log('agrega Dapp')
  }
  

  render () {

      this.state.items = [
        {
          label:'Home',
          icon:'pi pi-fw pi-file',
        },
        {
          label:'Sobre Nosotros',
          icon:'pi pi-fw pi-pencil',      
        },
        {
          label:'Trending',
          icon:'pi pi-fw pi-user',
        },
      ];      

      if (localStorage.getItem('address')) {
        if (localStorage.getItem('address') == process.env.REACT_APP_ADDRESS_DEVELOPER) {
          this.state.items.push(
            {  label:'Configuración',icon:'pi pi-fw pi-cog', items:[
              {
                 label:'Agregar Dapp',
                 icon:'pi pi-fw pi-plus',
                 command: (event) => {
                  this.agregarDapp()
                }
              }
           ]},
          )
        }
        this.state.items.push(
          {  label:'Desconectar MetaMask',icon:'pi pi-fw pi-power-off',  command: (event) => {
            this.desconectar()
          }},
        )
      }else{
        this.state.items.push(
          {  label:'Conectar MetaMask',icon:'pi pi-fw pi-power-off',  command: (event) => {
            this.conectar()
          }},
        )
      }

            
     

      const address = localStorage.getItem('address')

      const btnCon = this.state.btnCon
     
      return (
      <>
        <div>
          <Toast ref={(el) => this.toast = el} />       
         
          <Menubar model={this.state.items }/>
        

        </div>
      </>
    );
  }
}