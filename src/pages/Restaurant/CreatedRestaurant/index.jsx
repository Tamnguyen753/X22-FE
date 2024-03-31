/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, {useState} from 'react';
import "./index.scss";
import UploadFile from '../Uploadfile';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/esm/Button';

const CreatedRestaurant = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        describe: '',
        image: '',
        rate: 0,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChangeImage = ({img}) => {
        setFormData((prevData) => ({
            ...prevData,
            image: img,
        }));
    };

    const handleCreateRestaurant = async () => {
        const file = formData.image;
        if(!file){
            return console.error("chua co file");
        }
        // console.log(formData);

        axios.post("http://localhost:3000/api/restaurants/info", formData)
        .then(res => {
            setFormData({
                name: '',
                address: '',
                describe: '',
                image: '',
                rate: 0,
            });
        })
        .catch(error => console.log(error));
    };

  return (
    <div className='created-restaurant-form'>
        <p className='title'><b>THÊM NHÀ HÀNG MỚI</b></p>
        <form onSubmit={(e) => {
            e.preventDefault();
            handleCreateRestaurant();
        }}>
            <p>
                Tên nhà hàng: 
            </p>
            <input type='text' name='name' value={formData.name} onChange={handleChange}/>
            <br/>

            <p>
                Địa chỉ: 
            </p>
            <input type='text' name='address' value={formData.address} onChange={handleChange}/>
            <br/>

            <p>
                Mô tả: 
            </p>
            <input className='describe' name='describe' value={formData.describe} onChange={handleChange}/>
            <br/>

            <p>
                Ảnh nhà hàng: 
            </p>
            <UploadFile  image={formData.image} handleChangeImage={handleChangeImage}/>
            <br/>

            <Button type='submit'>Thêm nhà hàng</Button>
        </form>
    </div>
  )
}

export default CreatedRestaurant