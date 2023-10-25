import React from "react";
import { Secp256k1HdWallet } from "@cosmjs/amino";
import { CheckIfLocalEmpty, GetDataFromLocal, GetFullFromLocal, SaveToLocal } from "../stores/LocalStorage";
import { createClientFromMnemonic, getAddressesBySocial, sendDonate } from '../client-ts';

export const generateWalletFromSeedPhrase = async (seedPhrase: any) => {
    try {
        return await Secp256k1HdWallet.fromMnemonic(
            seedPhrase,
            {
                prefix: "comdex"
            },
        );
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
    const Ipublicaddr = document.getElementById("announce");
    if (walletdata !== undefined) {
        const pubaddr = walletdata[0].address;
        Ipublicaddr!.textContent = "going to next page...";
        if (CheckIfLocalEmpty() == true) {
            SaveToLocal("wallet", JSON.stringify({ pubaddr, mnemonic }));
            console.log(walletdata);
        } else {
            GetFullFromLocal();
        }
    }
    //   const Iprivatekey = document.getElementById("private-key");
    //   Iprivatekey!.textContent = "private key: " + privateKey;


}
export const donateToSocialLink = async () => {
    const socialLink = document.getElementById("social-link-input")?.textContent;
    const amountInput = document.getElementById("amount")?.textContent;
    let platform = "facebook";
    let profileId = "123";
    let amount = 100000000; // get from amount field
    let denom = "ucmst";
    //link processing => platfrom and id
    let mnemonic = GetDataFromLocal("wallet").mnemonic;
    if (mnemonic === undefined || mnemonic == "") {
        alert("not found mnemonic");
        return;
    } else {
        let client = await createClientFromMnemonic(mnemonic);
        if (client) {
            let address = await getAddressesBySocial(client, platform, profileId);
            let result = await sendDonate(
                client,
                address[0],
                amount,
                denom
            );
            alert("done donate with transaction hash = " + result.transactionHash);
            return result;
        }
        else {
            alert("client not found");
        }
    }
}

