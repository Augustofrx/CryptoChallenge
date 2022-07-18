import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Favoritos.module.css";
import { deleteFavorites1 } from "../../Redux/actions/actions";
import { useDispatch } from "react-redux";
import Loader from "../../Assets/LoadingGif.gif";
import axios from "axios";

function FavoritosCard1() {
  let favoritos1 = useSelector((state) => state.favorites1);
  let [list1, setList1] = useState();
  const dispatch = useDispatch();
  const [token, setToken] = useState();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (favoritos1.length > 0) {
      setToken(favoritos1[0].name);
    }
  }, [favoritos1]);

  const tokenPrice = useCallback((tokenId) => {
    axios(
      `https://api.0x.org/swap/v1/price?sellToken=${tokenId}&buyToken=USDT&sellAmount=1000000000000000000`
    ).then((res) => {
      setPrice(res.data.price);
    });
  }, []);

  useEffect(() => {
    if (token !== "") {
      let timer = setInterval(() => tokenPrice(token), 30000);
      return () => clearInterval(timer);
    }
  }, [token, tokenPrice]);

  console.log("Precio: " + 1 / price);

  const handleDelete = (t) => {
    let listFiltered = list1.filter((token) => token.name !== t.name);
    setList1(listFiltered);
    dispatch(deleteFavorites1(listFiltered));
    setToken("");
    setPrice(0);
  };

  useEffect(() => {
    setList1(favoritos1);
  }, [favoritos1]);

  return list1
    ? list1.map((t) => {
        return (
          <div key={t.name} className={styles.favCardContainer}>
            <div className={styles.tokenData}>
              <h2>{t.name}</h2>
              <h4 className={styles.tokenPrecio1}>
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

export default FavoritosCard1;
