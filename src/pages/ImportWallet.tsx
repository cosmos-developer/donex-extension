/*global chrome*/
import React from 'react';
import { memo, useEffect, useState } from "react";
import { HandleButtonClick_cosmos } from "../cosmos/methods";
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Providers } from '../components/providers';

const ImportWallet = () => {
  return (
    <Stack direction={'column'} spacing={3}>
      <TextField id="mnemonic-input" label="Type Mnemonic" variant="filled" InputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: '#81c73a' } }} />
      <Button onClick={HandleButtonClick_cosmos} variant='contained'>Send Mnemonic</Button>
      <Typography variant='h3' id='private-key' gutterBottom noWrap>123</Typography>
      <Typography variant='h2' id='public-address' gutterBottom>456</Typography>
    </Stack>
  )
}

export default memo(ImportWallet);
