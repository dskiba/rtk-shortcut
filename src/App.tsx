import "./styles.css";
import { useGetPokemonByNameQuery } from "./services/pokemon";
import { useDispatch, useSelector } from "react-redux";
import React, { SyntheticEvent, useDebugValue } from "react";
import { setByKey } from "./store";

export default function App() {
  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");

  const state = useSelector((s: any) => s.test);

  const dispatch = useDispatch();
  const handleChange = (field: "name" | "surname") => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    dispatch(setByKey({ k: field, v: value }));
  };

  return (
    <div className="App">
      <p>{JSON.stringify(state)}</p>

      <input value={state.name} onChange={handleChange("name")} />
      <input value={state.surname} onChange={handleChange("surname")} />
    </div>
  );
}
