import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import styles from './Favoritos.module.css'


function FavoritosCard() {
const favoritos = useSelector(state => state.favorites);
const [list, setList] = useState();

useEffect(() => {
  setList(favoritos)
}, [favoritos])


const handleDelete = (t) => {
    let listFiltered = list.filter((token) => token.name !== t.name)
    setList(listFiltered)
}

return list ? list.map((t) => {
    return (
        <div key={t.name} className={styles.favCardContainer}>
        <div className={styles.tokenData}>
    <h2>{t.name}</h2>
    <h4>{t.price}</h4>
    </div>
    <div className={styles.deleteBtn}>
        <button onClick={() => handleDelete(t)}>X</button>
    </div>
    </div>
    )
    }) : "Aun no tienes tokens favoritos..."}

export default FavoritosCard