import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function PersonajeDetalle() {
  const params = useParams();
  const [personaje, setPersonaje] = useState({
    id: "",
    name: "",
    order: "",
    weight: "",
    height: "",
    sprites: "",
    types: [],
    base_experience: "",
  });
  const { name, sprites, types } = personaje;

  useEffect(() => {
    const request = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${params.id}`
      );
      const personajeUnico = response.data;
      setPersonaje(personajeUnico);
    };
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="my-2 mx-3" style={{ width: "18rem" }}>
      <Card.Img
        className="border-card-image"
        variant="top"
        src={sprites.front_default}
      />
      <Card.Body className="text-center  mt-3">
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {/* <div className="d-flex justify-content-center">
            {types.map((types, idx) => {
              return (
                <div key={idx}>
                  <div className="mx-2">type : {types.type.name}</div>
                </div>
              );
            })}
          </div> */}
          {types.map((types, idx) => (
            <div className="mx-2"> type : {types.type.name}</div>
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
