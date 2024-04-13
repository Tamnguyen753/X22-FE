/* eslint-disable jsx-a11y/alt-text */
import React, {useNavigate} from 'react';
import Srestaurant from './Styles';

const Restaurant = ({
  restaurant : {
    name, 
    address, 
    describe, 
    image,
    restaurantId
  },
}) => {
  const navigate = useNavigate();

  return (
    <Srestaurant onClick={() => navigate(`restaurant/${restaurantId}`)}>
      <img className='image-restaurant' src={process.env.REACT_APP_API_URL + image}/>

      <div className='info'>
        <h1 className='restaurantName'>{name}</h1>
        <p className='restaurantAddress'>{address}</p>
        <p className='restaurantDescribe'>{describe}</p>
      </div>
    </Srestaurant>
  );
};

export default Restaurant;