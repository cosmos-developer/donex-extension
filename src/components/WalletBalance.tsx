import React, { useEffect, useState } from "react";
import { GetDataFromLocal } from "../stores/LocalStorage";
import { Coin, StargateClient } from "@cosmjs/stargate";
import { Box, Typography } from "@mui/material";

const WalletBalance = () => {
  const [balances, setBalances] = useState<readonly Coin[]>([]); // Khởi tạo với mảng rỗng Coin[]
  
  useEffect(() => {
    const fetchBalances = async () => {
      const wallet = GetDataFromLocal("wallet");
      const rpc = "https://cosmos-rpc.publicnode.com:443";
      const client = await StargateClient.connect(rpc);
      const response = await client.getAllBalances(wallet.pubaddr);
      setBalances(response); // Lưu mảng Coin[] vào state "balances"
    };

    fetchBalances();
  }, []);

  return (
    <Box my={2}>
        {balances.map((coin, index) => (
          <Typography key={index}>Balance: {parseInt(coin.amount, 10)*1e-9} ATOM</Typography>
        ))}
    </Box>
  );
};

export default WalletBalance;
