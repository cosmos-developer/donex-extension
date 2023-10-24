/*global chrome*/
import { Box, Button, FormControlLabel, Stack, Switch, TextField, Typography } from "@mui/material";
import React, { memo, useEffect } from "react";
import { GetDataFromLocal, GetFromLocal } from "../stores/LocalStorage";
import WalletBalance from "../components/WalletBalance";
import { createClientFromMnemonic, getAddressesBySocial } from "../client-ts";
import { useChain, useChainWallet, useWallet } from "@cosmos-kit/react";
import { donateToSocialLink } from "../cosmos/methods";
import { Center } from "@interchain-ui/react";

const Logged = () => {
    // const {mainWallet} = useWallet("keplr-extension");
    // console.log(mainWallet);
    // const { getSigningCosmWasmClient, address, connect, disconnect, wallet, status } = useChain("comdex");
    // mainWallet?.connect();
    // console.log(getSigningCosmWasmClient, wallet, address);
    // const client = getSigningCosmWasmClient();
    (async () => {
        let mnemonic = GetDataFromLocal("wallet").mnemonic;
        if (mnemonic === undefined || mnemonic == "") {
            console.log("not found mnemonic");
            return;
        }
        let client = await createClientFromMnemonic(mnemonic);
        if (client === undefined) {
            console.log("not found");
        } else {
            let result = await getAddressesBySocial(
                client,
                "facebook",
                "123"
            )
            console.log(result);
        }
    })();

    useEffect(() => {
        // const client = createClientFromMnemonic(GetDataFromLocal("wallet").mnemonic);
        // console.log(client);
        // createClient();
        // console.log(client);

        //   linking(getSigningCosmWasmClient, address!);
    }, []);


    return (
        <Stack maxWidth={0.95}>
            <Typography textAlign={"center"} fontSize={"28px"} sx={{ marginY: 4 }}>You are logged in</Typography>
            <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                <Stack direction={"row"} justifyContent={"center"} spacing={2}>
                    <TextField id="social-link-input" variant="filled" label="Social link" inputProps={{ style: { color: 'white' } }}
                        InputLabelProps={{ style: { color: '#FBEEE6', fontWeight: 'bold' } }} focused
                        sx={{ backgroundColor: '#102125' }}></TextField>
                    <TextField id="amount" variant="filled" label="Amount" inputProps={{ style: { color: 'white' } }}
                        InputLabelProps={{ style: { color: '#FBEEE6', fontWeight: 'bold' } }} focused
                        sx={{ backgroundColor: '#102125' , maxWidth: "75px"}}></TextField>
                </Stack>
                <Button variant="contained" onClick={donateToSocialLink}
                    sx={{ m: 2, width: "250px", height: "75px", fontSize: "28px", alignSelf: "center" }}>
                    DONATE!!!
                </Button>
            </Box>
            <FormControlLabel control={<Switch id="ShowDonate" defaultChecked />} label="Enable donate button" />
            <Typography noWrap={false} my={2}
                sx={{ wordWrap: "break-word", p: 0 }}>public address: {GetDataFromLocal("wallet").pubaddr}</Typography>
            <Typography noWrap={false} my={2}
                sx={{ wordWrap: "break-word", p: 0 }}>mnemonic: {GetDataFromLocal("wallet").mnemonic}</Typography>
            <WalletBalance></WalletBalance>
        </Stack>
    )
}


export default memo(Logged);