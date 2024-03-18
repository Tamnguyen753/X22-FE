/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {useQuery} from 'react-query';
import {ScreatedRestaurant} from "./Style.js";

const DetailRestaurant = () => {
  const [restaurant, setRestaurant] = useState(null);
  const {id} = useParams();
  
  useQuery(["create-restaurant", id], async () => {
    const respone = await requestAnimationFrame({
      url: `/restaurant/${id}`,
    });

    setRestaurant(respone.data);
  });

  if(!restaurant) return <></>;
  const {name, 
    address, 
    describe, 
    } = restaurant;

  return (
    <ScreatedRestaurant>
      <h1>{name}</h1>
      <p>{address}</p>
      <p>{describe}</p>
    </ScreatedRestaurant>
  )
}

export default DetailRestaurant;