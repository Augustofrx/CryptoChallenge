import React from 'react'
import styles from './Favoritos.module.css'
import { NavBar } from '../Navbar/NavBar'

function Favoritos() {
  return (
          <div className={styles.container}>
    <NavBar/>
    <div className={styles.favContainer}>
        <h1>Tokens favoritos</h1>
    <div className={styles.favToken}>
        <div className={styles.tokenData}>
    <h2>nombre del token</h2>
    <h4>precio</h4>
    </div>
    <div className={styles.deleteBtn}>
        <button>X</button>
    </div>
    </div>
    </div>

    </div>
  )
}

export default Favoritos