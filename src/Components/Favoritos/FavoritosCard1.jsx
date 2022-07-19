import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Favoritos.module.css";
import { deleteFavorites1, addPriceList1} from "../../Redux/actions/actions";
import { useDispatch } from "react-redux";
import Loader from "../../Assets/LoadingGif.gif";
import axios from "axios";

function FavoritosCard1() {
  let favoritos1 = useSelector((state) => state.favorites1);
  let priceList = useSelector((state) => state.priceList1)
  let [list1, setList1] = useState();
  const dispatch = useDispatch();
  const [token, setToken] = useState();
  const [price, setPrice] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (favoritos1.length > 0) {
      setToken(favoritos1[0].name);
    }
  }, [favoritos1]);

  const tokenPrice = useCallback(
    (tokenId) => {
      axios(
        `https://api.0x.org/swap/v1/price?sellToken=${tokenId}&buyToken=USDT&sellAmount=1000000000000000000`
      ).then((res) => {
        if (priceList.length === 5) {
          priceList.shift();
          dispatch(addPriceList1(1 / res.data.price));
        } else {
          dispatch(addPriceList1(1 / res.data.price));
        }
        setPrice(res.data.price);
      });
    },
    [dispatch, priceList]
  );

  let promedio = useCallback(() => {
    if (priceList.length === 5) {
      let sum = 0;
      for (let i = 0; i < priceList.length; i++) {
        sum += priceList[i];
      }
      let resultado = sum / 5;
      return resultado;
    }
  }, [priceList]);

  useEffect(() => {
    if (priceList.length === 5) {
      promedio();
    }
  }, [priceList, promedio]);

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
              <h5 className={styles.tokenPromedio1}>
                Precio promedio:{" "}
                {promedio() ? promedio() : <img src={Loader} alt="Loader" />}
              </h5>
              <div className={styles.comprarVenderDiv1}>
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

export default FavoritosCard1;
