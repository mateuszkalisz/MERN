import React from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/util/validators";

import { useForm } from "../../shared/components/hooks/form-hook";
import "./FormPlace.css";

const PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers on the world",
    image:
      "https://i.wpimg.pl/O/644x429/d.wpimg.pl/373718206-1567976705/empire-state-building.jpg",
    address: "20 W 34th St, New York, NY 10001, Stany Zjednoczone",
    coordinates: {
      lat: 40.7484405,
      lot: -73.9878531
    },
    creator: "u1"
  },
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers on the world",
    image:
      "https://i.wpimg.pl/O/644x429/d.wpimg.pl/373718206-1567976705/empire-state-building.jpg",
    address: "20 W 34th St, New York, NY 10001, Stany Zjednoczone",
    coordinates: {
      lat: 40.7484405,
      lot: -73.9878531
    },
    creator: "u2"
  }
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const identifiedPlace = PLACES.find(place => place.id === placeId);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: identifiedPlace.title,
        isValid: true
      },
      description: {
        value: identifiedPlace.description,
        isValid: true
      }
    },
    true
  );

  const placeUpdateSubmitHandler = (e) =>{
    e.preventDefault();
    console.log(formState.inputs);
  }

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        enterText="Please enter a valid title"
        onInput={inputHandler}
        value={formState.inputs.title.value}
        valid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        enterText="Please enter a valid description (at least 5 characters)"
        onInput={inputHandler}
        value={formState.inputs.description.value}
        valid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
