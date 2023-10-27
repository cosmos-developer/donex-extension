/*global chrome*/
import { Box, Button, FormControlLabel, Stack, Switch, TextField, Typography } from "@mui/material";
import React, { memo, useEffect } from "react";
import { GetDataFromLocal, GetFromLocal } from "../stores/LocalStorage";
import WalletBalance from "../components/WalletBalance";
import { createClientFromMnemonic, getAddressesBySocial, sendDonate } from "../client-ts";
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
    const setupDonate = (socialLink: any) => {
        const socialLinkElement = document.getElementById("social-link-input") as HTMLInputElement;
        const amountElement = document.getElementById("amount") as HTMLInputElement;
        if (socialLinkElement) {
            socialLinkElement.value = socialLink;
        }
    }

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id!, { type: "msg_from_popup" }, function (response) {
                console.log("message sent");
                console.log(response);
            });
        });
        let socialLink;
        chrome.storage.local.get("count", function (data) {
            if (typeof data.count == "undefined") {
                // That's kind of bad
                console.log("not found social link");
            } else {
                // Use data.count
                socialLink = data.count;
                console.log(data.count);
                setupDonate(socialLink);
            }
        });
        //link process to platfrom and id
        //one - click donate, options to choice
        // TEST DONATE HERE
        (async () => {
            let { mnemonic } = GetDataFromLocal("wallet");
            if (mnemonic === undefined || mnemonic == "") {
                console.log("not found mnemonic");
                return;
            }
            let client = await createClientFromMnemonic(mnemonic);
            if (client === undefined) {
                console.log("not found");
            } else {
                //address = await getAddressBySocial( link process(socialLink) =>  {platform, id})
                let address = await getAddressesBySocial(client, "facebook", "123");
                const amountElement = document.getElementById("amount") as HTMLInputElement;
                let amountInput = "100000";
                if (amountElement) {
                    amountInput = amountElement.value;
                };
                let amount = parseInt(amountInput, 10);
                //     let result = await sendDonate(client, address[0],amount,"ucmst");
                //     console.log(result);
            }
        })();
    }, []);


    return (
        <Stack maxWidth={0.95}>
            <Typography textAlign={"center"} fontSize={"28px"} sx={{ marginY: 4 }}>You are logged in</Typography>
            <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                <Stack direction={"row"} justifyContent={"center"} spacing={2}>
                    <TextField id="social-link-input" variant="filled" label="Social link" inputProps={{ style: { color: 'white' } }}
                        InputLabelProps={{ style: { color: '#FBEEE6', fontWeight: 'bold' } }} focused
                        sx={{ backgroundColor: '#102125' }}></TextField>
                    <TextField id="amount" variant="filled" label="Amount" type="number" defaultValue="100000" inputProps={{ style: { color: 'white' } }}
                        InputLabelProps={{ style: { color: '#FBEEE6', fontWeight: 'bold' } }} focused
                        sx={{ backgroundColor: '#102125', maxWidth: "100px" }}></TextField>
                </Stack>
                <Button variant="contained" onClick={donateToSocialLink}
                    sx={{ m: 2, width: "250px", height: "75px", fontSize: "28px", alignSelf: "center" }}>
                    DONATE!!!
                </Button>
            </Box>
            <FormControlLabel control={<Switch id="ShowDonate" defaultChecked />} label="Enable donate button" />
            <Typography noWrap={false} my={2}
                sx={{ wordWrap: "break-word", p: 0 }}>public address: {GetDataFromLocal("wallet").pubaddr}</Typography>
            <WalletBalance></WalletBalance>
        </Stack>
    )
}


export default memo(Logged);