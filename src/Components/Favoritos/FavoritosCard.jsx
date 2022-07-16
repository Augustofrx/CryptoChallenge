import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Favoritos.module.css";
import { deleteFavorites } from "../../Redux/actions/actions";
import { useDispatch } from "react-redux";

function FavoritosCard() {
  let favoritos = useSelector((state) => state.favorites);
  let [list, setList] = useState();
  const dispatch = useDispatch();

  const handleDelete = (t) => {
    let listFiltered = list.filter((token) => token.name !== t.name);
    setList(listFiltered);
    dispatch(deleteFavorites(listFiltered))
  };

  useEffect(() => {
        setList(favoritos);
  }, [favoritos]);

  return list
    ? list.map((t) => {
        return (
          <div key={t.name} className={styles.favCardContainer}>
            <div className={styles.tokenData}>
              <h2>{t.name}</h2>
              <h4>precio: {t.price}</h4>
            </div>
            <div className={styles.deleteBtn}>
              <button onClick={() => handleDelete(t)}>X</button>
            </div>
          </div>
        );
      })
    :  "Aun no tienes tokens favoritos...";
}

export default FavoritosCard;
