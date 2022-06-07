import {useState, Component,setState} from "react";
import Web3 from 'web3/dist/web3.min.js';
import Web3Modal from "web3modal";
import detectEthereumProvider from '@metamask/detect-provider';



async function conectar() {

    const ethereum = window.ethereum;

    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })  
        const account = accounts[0];
    } catch (error) {      
        console.log('Error: ' + error)
    }
}

export default {conectar};