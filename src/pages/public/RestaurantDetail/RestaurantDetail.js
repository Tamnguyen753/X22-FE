import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./Index.css";
import ContentLeft from './Components/ContentLeft';
import ContentRight from './Components/ContentRight';
import { request } from '../../../utils/axios-http';

const getRestaurantById = async (restaurantId) => {
    try {
        // const response = await axios.get(
        //     `http://localhost:9000/api/restaurant/${restaurantId}`

        // );
        const response = await request({
            method: "get",
            url: `/restaurant/${restaurantId}`
        })
        // const response = await axios.get("http://localhost:9000/api/restaurant");
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
    }
}
// getRestaurantById()

const RestaurantDetail = () => {
    const { restaurantId } = useParams();
    console.log(restaurantId);
    const [restaurantById, setRestaurantById] = useState(null)
    const handleFetchData = async () => {
        const restaurant = await getRestaurantById(restaurantId)
        console.log(restaurantById);
        setRestaurantById(restaurant.data)
    }
    console.log(restaurantId);
    useEffect(() => {
        handleFetchData();
    }, [restaurantId]);
    // const [menuVisible, setMenuVisible] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [newReviewText, setNewReviewText] = useState('');
    // const toggleMenu = () => {
    //     setMenuVisible(!menuVisible);
    // };

    const handleReviewSubmit = (review) => {
        setReviews([...reviews, review]);
    };

    return (<>
        {restaurantById && <div> <img src={restaurantById.image[0]} style={{ width: "100%", height: "460px" }} ></img></div>}
        <div className='content'>
            {restaurantById && <ContentLeft restaurant={restaurantById}
                // toggleMenu={toggleMenu} // Truyền hàm toggleMenu xuống ContentLeft
                handleReviewSubmit={handleReviewSubmit} // Truyền hàm handleReviewSubmit xuống ContentLeft
                // menuVisible={menuVisible}
                reviews={reviews}
                newReviewText={newReviewText}
                setNewReviewText={setNewReviewText}
                setReviews={setReviews}

            />}

            <ContentRight />
        </div>
    </>


    )
}

export default RestaurantDetail