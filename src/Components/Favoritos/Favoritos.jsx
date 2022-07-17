import React from 'react'
import styles from './Favoritos.module.css'
import { NavBar } from '../Navbar/NavBar'
import FavoritosCard1 from './FavoritosCard1'
import FavoritosCard2 from './FavoritosCard2'
import FavoritosCard3 from './FavoritosCard3'

function Favoritos() {
  return (
          <div className={styles.container}>
    <NavBar/>
    <div className={styles.favContainer}>
        <h1>Tokens favoritos</h1>
  <FavoritosCard1/>
  <FavoritosCard2/>
  <FavoritosCard3/>
    </div>
    </div>
  )
}

export default Favoritos