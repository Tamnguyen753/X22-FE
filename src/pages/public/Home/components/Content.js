import React from 'react'
import RestaurantDetail from './RestaurantDetail'

const Content = ({ restaurants, handleRestaurant }) => {
    console.log(restaurants);
    return (
        <div className='content1'>
            {/* <RestaurantDetail restaurants={restaurants} /> */}
            {restaurants.map((restaurant, index) => (
                <RestaurantDetail key={index} restaurant={restaurant} handleRestaurant={handleRestaurant} />
            ))}

        </div>
    )
}

export default Content