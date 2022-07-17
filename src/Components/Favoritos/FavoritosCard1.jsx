import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Favoritos.module.css";
import { deleteFavorites1 } from "../../Redux/actions/actions";
import { useDispatch } from "react-redux";

function FavoritosCard1() {
  let favoritos1 = useSelector((state) => state.favorites1);
  let [list1, setList1] = useState();
  const dispatch = useDispatch();

  const handleDelete = (t) => {
    let listFiltered = list1.filter((token) => token.name !== t.name);
    setList1(listFiltered);
    dispatch(deleteFavorites1(listFiltered))
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
              <h4 className={styles.tokenPrecio}>{t.price ? 1/t.price : "Cargando precio..."}</h4>
            </div>
            <div className={styles.deleteBtn}>
              <button onClick={() => handleDelete(t)}>X</button>
            </div>
          </div>
        );
      })
    :  "Aun no tienes tokens favoritos...";
}

export default FavoritosCard1;
