import React from 'react'
import styles from './Favoritos.module.css'
import { NavBar } from '../Navbar/NavBar'
import FavoritosCard from './FavoritosCard'

function Favoritos() {
  return (
          <div className={styles.container}>
    <NavBar/>
    <div className={styles.favContainer}>
        <h1>Tokens favoritos</h1>
  <FavoritosCard/>
    </div>
    </div>
  )
}

export default Favoritos