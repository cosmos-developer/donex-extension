import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DonexClient } from "./Donex.client";
import { Decimal } from "@cosmjs/math";
import { Addr } from "./Donex.types";
import { coins } from "@cosmjs/amino";
import { Window as KeplrWindow, OfflineAminoSigner } from "@keplr-wallet/types";
import { SigningCosmosClient } from "@cosmjs/launchpad";
import { generateWalletFromSeedPhrase } from "../cosmos/methods";


declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow { }
}
const rpcEndpoint = "http://ec2-3-0-52-194.ap-southeast-1.compute.amazonaws.com:26657";
const contract_addr ="comdex1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrqdfklyz";
export async function createClient() {
  // replace with keplr signer here
  try {
  if (!window.keplr) {
    alert("Please install keplr extension");
  } else {
    const chainId = "comdex-1";

    await window.keplr.enable(chainId);
    const signer = window.keplr.getOfflineSigner(chainId);

    const accounts = await signer.getAccounts();

    const cosmJS = new SigningCosmosClient(
      "https://lcd-cosmoshub.keplr.app",
      accounts[0].address,
      signer,
    );
    let client = await SigningCosmWasmClient.connectWithSigner(
      rpcEndpoint,
      signer,
      {
        gasPrice: { amount: Decimal.fromUserInput("1000", 0), denom: "ucmdx" },
      }
    );

    let donex = new DonexClient(client, accounts[0].address, contract_addr);
    return donex;
  }}
  catch (e){
    console.log(e);
  }
  // end replace with keplr signer
}

export async function createClientFromMnemonic(mnemonic:string) {
  // replace with keplr signer here
  try {
  if (!window.keplr) {
    alert("Please install keplr extension");
  } else {
    const chainId = "comdex-1";
    // Enabling before using the Keplr is recommended.
    // This method will ask the user whether to allow access if they haven't visited this website.
    // Also, it will request that the user unlock the wallet if the wallet is locked.
    await window.keplr.enable(chainId);
    // const signer = window.keplr.getOfflineSigner(chainId);
    // You can get the address/public keys by `getAccounts` method.
    // It can return the array of address/public key.
    // But, currently, Keplr extension manages only one address/public key pair.
    // XXX: This line is needed to set the sender address for SigningCosmosClient.
    // signer có thể lấy từ Mnemonic?
    const signer = await generateWalletFromSeedPhrase(mnemonic) as OfflineAminoSigner;
    const accounts = await signer.getAccounts();
    // Initialize the gaia api with the offline signer that is injected by Keplr extension.
    const cosmJS = new SigningCosmosClient(
      "https://lcd-cosmoshub.keplr.app",
      accounts[0].address,
      signer,
    );
    let client = await SigningCosmWasmClient.connectWithSigner(
      rpcEndpoint,
      signer,
      {
        gasPrice: { amount: Decimal.fromUserInput("1000", 0), denom: "ucmdx" },
      }
    );

    let donex = new DonexClient(client, accounts[0].address, contract_addr);
    return donex;
  }}
  catch (e){
    console.log(e);
  }
  // end replace with keplr signer
}
async function submitSocial(client: DonexClient) {
  let result = await client.submitSocial({
    address: "comdex1elk425naxzh895xaedl4q95zylag0d7j08yhd2",
    socialInfo: ["facebook", "123"],
  });

  console.log(result);
}
async function getSocialsByAddress(client: DonexClient) {
  let result = await client.getSocialsByAddress({
    address: "comdex1elk425naxzh895xaedl4q95zylag0d7j08yhd2",
  });

  return result.social_infos;
}
export async function getAddressesBySocial(
  client: DonexClient,
  platform: string,
  profileId: string
) {
  let result = await client.getAddressesBySocial({ platform, profileId });
  return result.address;
}
async function sendDonate(
  client: DonexClient,
  recipient: Addr,
  amount: number,
  denom: string
) {
  let result = await client.donate(
    { recipient },
    "auto",
    "",
    coins(amount, denom)
  );
  return result;
}
// try {
//     // Submit transaction
//     (async () => {
//       let client = await createClient();
//       await submitSocial(client);
//       // console.log(result)
//     })();
//     // Query information from contract
//     (async () => {
//       let client = await createClient();
//       let result = await getSocialsByAddress(client);
//       console.log(result);
//     })();

//   Query address, and then send donate
//   (async function () {
//     let client = await createClient();
//     let result = await getAddressesBySocial(client!, "facebook", "123");
//     console.log(result);
//     let result2 = await sendDonate(client!, result[0], 1000000, "ucmst");
//     console.log(result2);
//   })();
// } catch (e) {
//   console.log(e);
// }
