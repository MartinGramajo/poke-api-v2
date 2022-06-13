import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CardPokemon({ pokemon }) {
  const { name } = pokemon;

  return (
    <div>
      <Card className="my-2 mx-3" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={pokemon.sprites.back_default} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Descripcion</Card.Text>
          <Button as={Link} to={`detalle/${name}`} variant="primary">
            ver detalle
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
