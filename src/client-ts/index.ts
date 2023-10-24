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
const contract_addr ="comdex17p9rzwnnfxcjp32un9ug7yhhzgtkhvl9jfksztgw5uh69wac2pgs4jg6dx";

export async function createClientFromMnemonic(mnemonic:string) {
  // You can get the address/public keys by `getAccounts` method.
  // It can return the array of address/public key.
  // But, currently, Keplr extension manages only one address/public key pair.
  // XXX: This line is needed to set the sender address for SigningCosmosClient.
  // signer có thể lấy từ Mnemonic?
  const signer = await generateWalletFromSeedPhrase(mnemonic) as OfflineAminoSigner;
  console.log("signer = " + signer);
  const accounts = await signer.getAccounts();
  // Initialize the gaia api with the offline signer that is injected by Keplr extension.
  let client = await SigningCosmWasmClient.connectWithSigner(
    rpcEndpoint,
    signer,
    {
      gasPrice: { amount: Decimal.fromUserInput("1000", 0), denom: "ucmdx" },
    }
  );
  console.log("client = " + client);

  let donex = new DonexClient(client, accounts[0].address, contract_addr);
  console.log("donex = " + donex);
  return donex;
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
export async function sendDonate(
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
