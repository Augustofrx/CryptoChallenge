import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Favoritos.module.css";
import { deleteFavorites2, addPriceList2 } from "../../Redux/actions/actions";
import { useDispatch } from "react-redux";
import Loader from "../../Assets/LoadingGif.gif";
import axios from "axios";

function FavoritosCard2() {
  let favoritos2 = useSelector((state) => state.favorites2);
  let priceList2 = useSelector((state) => state.priceList2)
  let [list2, setList2] = useState();
  const dispatch = useDispatch();
  const [token, setToken] = useState();
  const [price, setPrice] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (favoritos2.length > 0) {
      setToken(favoritos2[0].name);
    }
  }, [favoritos2]);

  const tokenPrice = useCallback(
    (tokenId) => {
      axios(
        `https://api.0x.org/swap/v1/price?sellToken=${tokenId}&buyToken=USDT&sellAmount=1000000000000000000`
      ).then((res) => {
        if (priceList2.length === 5) {
          priceList2.shift();
          dispatch(addPriceList2(1 / res.data.price));
        } else {
          dispatch(addPriceList2(1 / res.data.price));
        }
        setPrice(res.data.price);
  
      });
    },
    [dispatch, priceList2]
  );

  let promedio = useCallback(() => {
    if (priceList2.length === 5) {
      let sum = 0;
      for (let i = 0; i < priceList2.length; i++) {
        sum += priceList2[i];
      }
 
      let resultado = sum / 5;
      return resultado;
    }
  }, [priceList2]);

  useEffect(() => {
    if (priceList2.length === 5) {
      promedio();
    }
  }, [priceList2, promedio]);

  useEffect(() => {
    if (token) {
      if (firstLoad === true) {
        tokenPrice(token);
        setFirstLoad(false);
      } else {
        let timer = setInterval(() => tokenPrice(token), 30000);
        return () => clearInterval(timer);
      }
    }
  }, [firstLoad, token, tokenPrice]);

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
              <h5 className={styles.tokenPromedio2}>
                Precio promedio:{" "}
                {promedio() ? promedio() : <img src={Loader} alt="Loader" />}
              </h5>
              <div className={styles.comprarVenderDiv2}>
              {price <= promedio() ?  <button className={styles.comprarBtn}>Comprar</button> :<button disabled={true} className={styles.comprarBtn}>Comprar</button> }
               {price >= promedio() ? <button className={styles.venderBtn}>Vender</button> : <button disabled={true} className={styles.venderBtn}>Vender</button>}
              </div>
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
