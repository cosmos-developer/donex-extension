import { ChainProvider } from "@cosmos-kit/react";
import { chains, assets } from "chain-registry";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation";
import { SignerOptions } from "@cosmos-kit/core";
import {Chain} from '@chain-registry/types'
import { Decimal } from "@cosmjs/math";

export function Providers({ children }: { children: any }) {
  const signerOptions: SignerOptions = {
    signingCosmwasm: (chain: Chain) => {
      switch (chain.chain_name) {
        case 'comdex':
          return {
            gasPrice: { amount: Decimal.fromUserInput("1000", 0), denom: "ucmdx" }
          };
      }
    }
  };
  return (
      <ChainProvider
        chains={chains} // supported chains
        assetLists={assets} // supported asset lists
        wallets={[...keplrWallets, ...cosmostationWallets]}
        endpointOptions={
          {
            endpoints: {
              "comdex": {
                rpc: ["http://ec2-3-0-52-194.ap-southeast-1.compute.amazonaws.com:26657"],
                rest: ["http://ec2-3-0-52-194.ap-southeast-1.compute.amazonaws.com:26657"],
              }
            }
          }
        }
        signerOptions={signerOptions}
      >
        {children}
      </ChainProvider>
  );
}