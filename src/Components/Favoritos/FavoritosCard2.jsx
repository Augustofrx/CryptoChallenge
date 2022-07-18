import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Favoritos.module.css";
import { deleteFavorites2 } from "../../Redux/actions/actions";
import { useDispatch } from "react-redux";
import Loader from "../../Assets/LoadingGif.gif";
import axios from "axios";

function FavoritosCard2() {
  let favoritos2 = useSelector((state) => state.favorites2);
  let [list2, setList2] = useState();
  const dispatch = useDispatch();
  const [token, setToken] = useState();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (favoritos2.length > 0) {
      setToken(favoritos2[0].name);
    }
  }, [favoritos2]);

  const tokenPrice = useCallback((tokenId) => {
    axios(
      `https://api.0x.org/swap/v1/price?sellToken=${tokenId}&buyToken=USDT&sellAmount=1000000000000000000`
    ).then((res) => {
      setPrice(res.data.price);
    });
  }, []);

  useEffect(() => {
    if (token !== "") {
      const timer = setInterval(() => tokenPrice(token), 30000);
      return () => clearInterval(timer);
    }
  }, [token, tokenPrice]);

  console.log("Precio2: " + 1 / price);

  const handleDelete = (t) => {
    let listFiltered = list2.filter((token) => token.name !== t.name);
    setList2(listFiltered);
    dispatch(deleteFavorites2(listFiltered));
    setToken("");
    setPrice(0);
  };

  useEffect(() => {
    setList2(favoritos2);
  }, [favoritos2]);

  return list2
    ? list2.map((t) => {
        return (
          <div key={t.name} className={styles.favCardContainer}>
            <div className={styles.tokenData}>
              <h2>{t.name}</h2>
              <h4 className={styles.tokenPrecio2}>
                Precio: {price ? 1 / price : <img src={Loader} alt="Loader" />}
              </h4>
            </div>
            <div className={styles.deleteBtn}>
              <button onClick={() => handleDelete(t)}>X</button>
            </div>
          </div>
        );
      })
    : "";
}

export default FavoritosCard2;
