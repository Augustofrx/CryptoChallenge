import React from "react";
import styles from "./Favoritos.module.css";
import { NavBar } from "../Navbar/NavBar";
import FavoritosCard1 from "./FavoritosCard1";
import FavoritosCard2 from "./FavoritosCard2";
import FavoritosCard3 from "./FavoritosCard3";
import Swal from "sweetalert2";


function Favoritos() {
  Swal.fire({
    icon: "warning",
    title: "Atención",
    text: "La primera vez que agregues un token a la sección favoritos, el precio promedio puede tomar hasta 2 minutos en ser calculado"
  });
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.favContainer}>
        <h1>Tokens favoritos</h1>
        <FavoritosCard1 />
        <FavoritosCard2 />
        <FavoritosCard3 />
      </div>
    </div>
  );
}

export default Favoritos;
