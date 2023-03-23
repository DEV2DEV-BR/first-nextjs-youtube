import api from "@/services/api";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

export default function Main({ data, date }) {
  const [pokemons, setPokemons] = useState(data || []);

  return (
    <div className={styles.container}>
      <strong>{date}</strong>
      {pokemons.map((pokemon) => (
        <div key={pokemon.id} className={styles.card}>
          <img src={pokemon.image} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps(context) {
  async function loadPokemons() {
    try {
      const response = await api.get("/pokemon");

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const pokemons = await loadPokemons();

  return {
    props: {
      data: pokemons,
      date: Date(),
    },
    revalidate: 20,
  };
}
