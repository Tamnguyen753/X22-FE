/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, {useState} from 'react';
import "./index.scss";
import UploadFile from '../Uploadfile';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/esm/Button';
import { requestWithToken } from '../../../utils/axios-http';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreatedRestaurant = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        describe: '',
        images: [],
        rate: 0,
        viewCount: 0,
        rateCount: 0,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChangeImage = ({images}) => {
        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, images],
        }));
    };

    const handleCreateRestaurant = async () => {
        const files = formData.images;
        if(!files.length){
            return console.error("chua co file");
        }

        console.log(formData);
        
        try{
            const type = localStorage.getItem("type");
            await requestWithToken({
                data: formData,
                method: "post",
                url: "http://localhost:3000/api/restaurants/info",
            }, type);

            toast.success("tao nha hang thanh cong!");
            
            setFormData({
                name: '',
                address: '',
                describe: '',
                images: [],
                rate: 0,
                viewCount: 0,
                rateCount: 0,
            });

            navigate("/restaurantdetail");

        }catch(error){
            console.log(error);
            toast.error("da xay ra loi!");
          }
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
            <UploadFile  images={formData.images} handleChangeImage={handleChangeImage}/>
            <br/>

            <Button type='submit'>Thêm nhà hàng</Button>
        </form>
    </div>
  )
}

export default CreatedRestaurant