import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Favoritos.module.css";
import { deleteFavorites3, addPriceList3} from "../../Redux/actions/actions";
import { useDispatch } from "react-redux";
import Loader from "../../Assets/LoadingGif.gif";
import axios from "axios";

function FavoritosCard3() {
  let favoritos3 = useSelector((state) => state.favorites3);
  let priceList3 = useSelector((state) => state.priceList3)
  let [list3, setList3] = useState();
  const dispatch = useDispatch();
  const [token, setToken] = useState();
  const [price, setPrice] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (favoritos3.length > 0) {
      setToken(favoritos3[0].name);
    }
  }, [favoritos3]);

  const tokenPrice = useCallback(
    (tokenId) => {
      axios(
        `https://api.0x.org/swap/v1/price?sellToken=${tokenId}&buyToken=USDT&sellAmount=1000000000000000000`
      ).then((res) => {
        if (priceList3.length === 5) {
          priceList3.shift();
          dispatch(addPriceList3(1 / res.data.price));
        } else {
          dispatch(addPriceList3(1 / res.data.price));
        }
        setPrice(res.data.price);
        console.log(priceList3);
      });
    },
    [priceList3, dispatch]
  );

  let promedio = useCallback(() => {
    if (priceList3.length === 5) {
      let sum = 0;
      for (let i = 0; i < priceList3.length; i++) {
        sum += priceList3[i];
      }
      console.log(sum + " sum");
      let resultado = sum / 5;
      return resultado;
    }
  }, [priceList3]);

  useEffect(() => {
    if (priceList3.length === 5) {
      promedio();
    }
  }, [priceList3, promedio]);

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
    let listFiltered = list3.filter((token) => token.name !== t.name);
    setList3(listFiltered);
    dispatch(deleteFavorites3(listFiltered));
    setToken("");
    setPrice(0);
  };

  useEffect(() => {
    setList3(favoritos3);
  }, [favoritos3]);

  return list3
    ? list3.map((t) => {
        return (
          <div key={t.name} className={styles.favCardContainer}>
            <div className={styles.tokenData}>
              <h2>{t.name}</h2>
              <h4 className={styles.tokenPrecio3}>
                Precio: {price ? 1 / price : <img src={Loader} alt="Loader" />}
              </h4>
              <h5 className={styles.tokenPromedio3}>
                Precio promedio:{" "}
                {promedio() ? promedio() : <img src={Loader} alt="Loader" />}
              </h5>
              <div className={styles.comprarVenderDiv3}>
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

export default FavoritosCard3;
