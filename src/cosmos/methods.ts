import React from 'react';
import { Secp256k1HdWallet } from "@cosmjs/amino";
import { CheckIfLocalEmpty, GetFullFromLocal, SaveToLocal } from "../stores/LocalStorage";

export const generateWalletFromSeedPhrase = async (seedPhrase: any) => {
    try {
        return await Secp256k1HdWallet.fromMnemonic(seedPhrase);
    } catch (error) {
        console.log(error);
    };
}
export const getFromMnemonicInput = () => {
    const inputElement = document.getElementById("mnemonic-input") as HTMLInputElement;
    let mnemonic;
    if (inputElement) {
        mnemonic = inputElement.value;
    }
    return mnemonic;
}
export const HandleButtonClick_cosmos = async () => {
    // lay text field tu mnemonic-input 
    const mnemonic = getFromMnemonicInput();
    const HDwallet = await generateWalletFromSeedPhrase(mnemonic);
    const walletdata = await HDwallet?.getAccounts();
    const Ipublicaddr = document.getElementById("public-address");
    if (walletdata !== undefined) {
        const pubaddr = walletdata[0].address;
        Ipublicaddr!.textContent = "address: " + pubaddr;
        if (CheckIfLocalEmpty() == true) {
            SaveToLocal("wallet",JSON.stringify({pubaddr, mnemonic}));
            console.log(walletdata);
        } else {
            GetFullFromLocal();
        }
    }
    //   const Iprivatekey = document.getElementById("private-key");
    //   Iprivatekey!.textContent = "private key: " + privateKey;


}

