import React from 'react'
import styles from './NavBar.module.css'

export const NavBar = () => {
  return (
    <div className={styles.navContainer}>
        <div className={styles.depositar}>
            <button>Depositar</button>
        </div>
        <div className={styles.favoritos}>
            <button>Favoritos</button>
        </div>
        <div className={styles.cuenta}>
            <button>Cuenta</button>
        </div>
    </div>
  ) 
}

