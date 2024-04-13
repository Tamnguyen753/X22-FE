/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import Form from "react-bootstrap/Form";
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';

import { managerUpdateRestaurant } from '../../../api/restaurantApi';
import ErrorMessages from '../../../utils/ErrorMessages';
import UploadFile from '../Uploadfile';

import "./index.css";

const schema = yup.object().shape({
  name: yup.string().required("Bạn chưa nhập tên nhà hàng! "),
  address: yup.string().required("Bạn chưa nhập địa chỉ nhà hàng!"),
  describe: yup.string().required("Bạn chưa nhập mô tả nhà hàng!"),
});

const UpdateRestaurant = ({ restaurantData }) => {
  const { id } = useParams();

  const {
    register, handleSubmit, formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    // defaultValues: {
    //   name: restaurantData.name,
    //   address: restaurantData.address,
    //   describe: restaurantData.describe,
    //   image: restaurantData.image
    // }
  });

  const updateRestaurantMutation = useMutation({
    mutationFn: managerUpdateRestaurant,
    onSuccess: () => {
      toast.success("Cập nhật thông tin nhà hàng thành công!");
    }
  });

  const onSubmit = async (data) => {
    try {
      await updateRestaurantMutation({ id, ...data });
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      toast.error("Cập nhật thông tin nhà hàng thất bại!");
    }
  }
  return (
    <>
      <div className='update-restaurant-form'>
        <p className='title'><b>CẬP NHẬT THÔNG TIN NHÀ HÀNG</b></p>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Control 
              type='text' 
              {...register('name')} 
              required>
            </Form.Control>
          </Form.Group>
          {errors.name && <ErrorMessages message={errors.name.message}/>}
          <br/>

          <Form.Group>
            <Form.Control 
              type='text' 
              {...register('address')} 
              required>
            </Form.Control>
          </Form.Group>
          {errors.address && <ErrorMessages message={errors.address.message}/>}
          <br/>

          <Form.Group>
            <Form.Control 
              as="textarea"
              {...register('describe')} 
              required>
            </Form.Control>
          </Form.Group>
          {errors.describe && <ErrorMessages message={errors.describe.message}/>}
          <br/>

          <UploadFile  />
          <br/>

          <Button className='ud' variant="success" type='submit'>Cập nhật thông tin</Button>
          <br/>
        </Form>

      </div>
    </>
  )
}

export default UpdateRestaurant;
