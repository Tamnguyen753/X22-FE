/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

import UploadFile from "../Uploadfile";
import ErrorMessages from "../../../utils/ErrorMessages";
import { managerCreateRestaurant } from "../../../api/restaurantApi";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { useNavigate } from "react-router-dom";


const schema = yup.object().shape({
  name: yup.string().required("Bạn chưa nhập tên nhà hàng"),
  address: yup.string().required("Bạn chưa nhập địa chỉ nhà hàng!"),
  describe: yup.string().required("Bạn chưa nhập mô tả nhà hàng!"),
});
const CreatedRestaurant = () => {
    
const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const createRestaurantMutation = useMutation({
    mutationFn: managerCreateRestaurant,
    onSuccess: () => {
      toast.success("Đăng ký thông tin nhà hàng thành công!");
      navigate("/managerhome")
    }
  }
);

  const handleChangeImage = ({ files, image }) => {
    setImage([...image, ...files]);
  };

  const onSubmit = (data) => {
    data.image = image;
    console.log("data:", data);
    createRestaurantMutation.mutate(data);
  };

  return (
    <div className="created-restaurant-form">
      <p className="title">
        <b>THÊM NHÀ HÀNG MỚI</b>
      </p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Tên nhà hàng"
            {...register("name")}
            required
          ></Form.Control>
        </Form.Group>
        {errors.name && <ErrorMessages message={errors.name.message} />}
        <br />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Địa chỉ nhà hàng"
            required
            {...register("address")}
          ></Form.Control>
        </Form.Group>
        {errors.address && <ErrorMessages message={errors.address.message} />}
        <br />
        <Form.Group>
          <Form.Control
            as="textarea"
            placeholder="Mô tả"
            required
            {...register("describe")}
          ></Form.Control>
        </Form.Group>
        {errors.describe && <ErrorMessages message={errors.describe.message} />}
        <br />

        <UploadFile image={image} handleChangeImage={handleChangeImage} />
        <br />
        <Button className="dk" variant="success" type="submit">
          Thêm mới
        </Button>
        <br />
      </Form>
    </div>
  );
};

export default CreatedRestaurant;
