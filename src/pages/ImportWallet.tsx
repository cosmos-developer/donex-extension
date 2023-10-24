/*global chrome*/
import React from 'react';
import { memo, useEffect, useState } from "react";
import { HandleButtonClick_cosmos } from "../cosmos/methods";
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Providers } from '../components/providers';
import { CheckIfLocalEmpty } from '../stores/LocalStorage';


const ImportWallet = () => {
  const [IsCorrectMnemonic,setIsCorrectMnemonic] = useState(false);
  return (
    <Stack direction={'column'} spacing={3}>
      <TextField id="mnemonic-input" label="Type Mnemonic" variant="filled" 
      InputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: '#81c73a' } }} />
      <Button id="import_mnemonic_btn" disabled={IsCorrectMnemonic} 
      onClick={async () => {
        await HandleButtonClick_cosmos();
        if (!CheckIfLocalEmpty()){
          setIsCorrectMnemonic(true);
          window.location.reload();
        } else {
          setIsCorrectMnemonic(true);
        }
      }} 
      variant='contained'>Send Mnemonic</Button>
      <Typography variant='h4' id='announce' gutterBottom></Typography>
    </Stack>
  )
}


export default memo(ImportWallet);
