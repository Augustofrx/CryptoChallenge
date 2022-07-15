import React from "react";
import styles from "./Home.module.css";
import { CryptoFetch } from "../CryptoFetch/CryptoFetch";
import { NavBar } from "../NavBar/NavBar";
import USDTLOGO from "../../Assets/usdt-logo.png";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import axios from "axios";

export default function Home() {
  const [token, setToken] = useState("WETH");
  const [price, setPrice] = useState(0);
  const selectHandleChange = (e) => {
    setToken(e.target.value);
  };

  const tokenPrice = useCallback((tokenId) => {
    axios
      .get(
        `https://api.0x.org/swap/v1/price?sellToken=${tokenId}&buyToken=USDT&sellAmount=1000000000000000000`
      )
      .then((res) => {
        setPrice(res.data.price);
      });
  }, []);

  useEffect(() => {
    if (token !== null) {
      tokenPrice(token);
    }
  }, [token, tokenPrice]);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>Crypto Challenge</h1>
      </div>
      <NavBar />
      <div className={styles.selectTokenDiv}>
        <ion-icon name="chevron-down-outline"></ion-icon>
        <label className={styles.selectTokenLabel} for="selectToken">
          DEPOSITA EN
        </label>
        <select
          className={styles.selectToken}
          onChange={selectHandleChange}
          name="selectToken"
          id="selectToken"
        >
          <CryptoFetch />
        </select>
        <div className={styles.priceContainer}>
          <h3>{price ? "Precio: " + 1/price : "Cargando..."} </h3>
        </div>
        <div className={styles.fullCashInput}>
          <div className={styles.Symbol}>
            <img src={USDTLOGO} alt="DaiLogo" />
            <span>USDT</span>
          </div>
          <input className={styles.cashInput} placeholder="0.0" type="number" />
        </div>
        <label className={styles.cashLabel} htmlFor="">
          MONTO
        </label>
        <button className={styles.depositarBtn}>Depositar</button>
      </div>
    </div>
  );
}
