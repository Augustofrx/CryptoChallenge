import { React, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { CryptoFetch } from "../CryptoFetch/CryptoFetch";
import { NavBar } from "../Navbar/NavBar";
import { useDispatch } from "react-redux";
import {
  addFavorites1,
  addFavorites2,
  addFavorites3,
} from "../../Redux/actions/actions";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Home() {
  const favoritos1 = useSelector((state) => state.favorites1);
  const favoritos2 = useSelector((state) => state.favorites2);
  const favoritos3 = useSelector((state) => state.favorites3);
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
    if (favoritos1.length < 1) {
      dispatch(addFavorites1({ name: token }));
    } else if (favoritos2.length < 1 && token !== favoritos1[0].name) {
      dispatch(addFavorites2({ name: token }));
    } else if (
      favoritos3.length < 1 &&
      token !== favoritos1[0].name &&
      token !== favoritos2[0].name
    ) {
      dispatch(addFavorites3({ name: token }));
    } else {
      Swal.fire({
        icon: "warning",
        title: "Este token ya pertenece a tus favoritos",
      });
    }
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
      </div>
    </div>
  );
}
