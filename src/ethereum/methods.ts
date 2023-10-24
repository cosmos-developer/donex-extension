import {ethers} from 'ethers';
import React,{ReactDOM} from 'react';

export const generateWalletFromSeedPhrase = (seedPhrase:any) =>
  new Promise((resolve, reject) => {
    try {
      const hdNode = ethers.utils.HDNode.fromMnemonic(seedPhrase);
      const rawData = hdNode.derivePath(ethers.utils.defaultPath);
      const walletAddress = rawData.address;
      const privateKey = rawData.privateKey;

      resolve({ walletAddress, privateKey });
    } catch (error) {
      console.log(error);
      reject(null);
    }
  });
export  const HandleButtonClick_mnemonic = () => {
    // lay text field tu mnemonic-input 
    const inputElement = document.getElementById("mnemonic-input") as HTMLInputElement;
    let mnemonic;
    if (inputElement){
      mnemonic = inputElement.value;
    }
    generateWalletFromSeedPhrase(mnemonic).then((result) => {
      const {walletAddress, privateKey}:any = result;
      const Iprivatekey = document.getElementById("private-key");
      const Ipublicaddr = document.getElementById("public-address");
      Iprivatekey!.textContent = "private key: " + privateKey;
      Ipublicaddr!.textContent =  "wallet address: " + walletAddress;
      console.log(walletAddress);
      console.log(privateKey);
      console.log(result);
      
    })
  }

