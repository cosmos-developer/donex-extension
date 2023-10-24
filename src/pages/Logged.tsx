    /*global chrome*/
    import { Box, Button, FormControlLabel, Stack, Switch, TextField, Typography } from "@mui/material";
    import React, { memo, useEffect } from "react";
    import { GetDataFromLocal, GetFromLocal } from "../stores/LocalStorage";
    import WalletBalance from "../components/WalletBalance";
    import { createClient, createClientFromMnemonic, getAddressesBySocial } from "../client-ts";
    import {useChain, useChainWallet, useWallet} from "@cosmos-kit/react";
    
    const Logged = () => {
        // const {mainWallet} = useWallet("keplr-extension");
        // console.log(mainWallet);
        // const { getSigningCosmWasmClient, address, connect, disconnect, wallet, status } = useChain("comdex");
        // mainWallet?.connect();
        // console.log(getSigningCosmWasmClient, wallet, address);
        // const client = getSigningCosmWasmClient();
        (async () => {
            console.log(await createClientFromMnemonic(GetDataFromLocal("wallet").mnemonic));
            console.log(getAddressesBySocial(
                (await createClientFromMnemonic(GetDataFromLocal("wallet").mnemonic))!,
                "facebook",
                "123"
            ));
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
                    <TextField variant="filled" label="Social link" inputProps={{style:{color: 'white'}}} InputLabelProps={{style:{color: '#FBEEE6', fontWeight: 'bold'}}} focused 
                    sx={{backgroundColor: '#102125'}}></TextField>
                    <Button variant="contained"  
                    sx={{m: 2,width: "250px", height:"75px", fontSize: "28px", alignSelf: "center"}}>
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