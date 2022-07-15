import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
   <div className={styles.generalContainer}>
      <div className={styles.titleContainer}>
        <h1>Crypto Challenge</h1>
      </div>
      <div className={styles.navContainer}>
        <div className={styles.depositar}>
          <Link to="/">
            <button>Inicio</button>
          </Link>
        </div>
        <div className={styles.favoritos}>
          <Link to="/Favoritos">
            <button>Favoritos</button>
          </Link>
        </div>
        <div className={styles.cuenta}>
          <button>Cuenta</button>
        </div>
      </div>
      </div>
  );
};
