import React from "react";
import styles from "./Home.module.css";
import { CryptoFetch } from "../CryptoFetch/CryptoFetch";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { NavBar } from "../Navbar/NavBar";
import { addFavorites } from "../../Redux/actions/actions";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function Home() {
  const [token, setToken] = useState("WETH");
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();

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

  function handleAddFavorites(e) {
    e.preventDefault();
    dispatch(addFavorites({ name: token, price: 1 / price }));
  }

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.selectTokenDiv}>
        <label className={styles.selectTokenLabel} htmlFor="selectToken">
          LISTA DE TOKENS
        </label>
        <select
          className={styles.selectToken}
          onChange={(e) => {
            selectHandleChange(e);
          }}
          name="selectToken"
          id="selectToken"
        >
          <CryptoFetch />
        </select>
        <div className={styles.priceContainer}>
          <h3>{price ? "Precio: " + 1 / price : "Cargando..."} </h3>
          <button
            onClick={(e) => {
              handleAddFavorites(e);
            }}
            className={styles.addToFavsBtn}
          >
            Añadir Token a favoritos
          </button>
        </div>
        {/* <div className={styles.fullCashInput}>
          <div className={styles.Symbol}>
            <img src={USDTLOGO} alt="DaiLogo" />
            <span>USDT</span>
          </div>
          <input className={styles.cashInput} placeholder="0.0" type="number" />
        </div>
        <label className={styles.cashLabel} htmlFor="">
          MONTO
        </label>
        <button className={styles.depositarBtn}>Depositar</button> */}
      </div>
    </div>
  );
}
