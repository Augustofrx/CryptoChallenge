import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Favoritos.module.css";
import { deleteFavorites3 } from "../../Redux/actions/actions";
import { useDispatch } from "react-redux";

function FavoritosCard3() {
  let favoritos3 = useSelector((state) => state.favorites3);
  let [list3, setList3] = useState();
  const dispatch = useDispatch();

  const handleDelete = (t) => {
    let listFiltered = list3.filter((token) => token.name !== t.name);
    setList3(listFiltered);
    dispatch(deleteFavorites3(listFiltered))
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

export default FavoritosCard3;
