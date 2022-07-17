import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Favoritos.module.css";
import { deleteFavorites2 } from "../../Redux/actions/actions";
import { useDispatch } from "react-redux";

function FavoritosCard2() {
  let favoritos2 = useSelector((state) => state.favorites2);
  let [list2, setList2] = useState();
  const dispatch = useDispatch();

  const handleDelete = (t) => {
    let listFiltered = list2.filter((token) => token.name !== t.name);
    setList2(listFiltered);
    dispatch(deleteFavorites2(listFiltered))
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

export default FavoritosCard2;
