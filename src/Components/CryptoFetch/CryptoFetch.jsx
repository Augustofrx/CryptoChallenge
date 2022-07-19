/* eslint-disable array-callback-return */
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

let tokens = [];

const getTokens = () => {
  try {
    const resTokens = axios
      .get("https://api.0x.org/swap/v1/tokens")
      .then((res) => {
        let result = res.data.records.map((t) => {
          return {
            name: t.name,
            symbol: t.symbol,
          };
        });
        return result;
      });
    return resTokens;
  } catch (error) {
    console.log(error);
  }
};

getTokens().then((tokenList) => {
  tokenList.forEach((e) => {
    return tokens.push(e);
  });
});

export const CryptoFetch = () => {
  const [tokenInfo, setTokenInfo] = useState("");

  useEffect(() => {
    return setTokenInfo(tokens);
  }, [tokenInfo]);

  return tokenInfo
    ? tokenInfo.map((t, index) => {
        if (
          t.symbol === "DAI" ||
          t.symbol === "WBTC" ||
          t.symbol === "WETH" ||
          t.symbol === "AAVE" ||
          t.symbol === "MATIC" ||
          t.symbol === "BUSD"
        ) {
          return (
            <option value={t.symbol} key={index} id="optionToken">
              {t.symbol}
            </option>
          );
        }
      })
    : "No hay tokens";

};
