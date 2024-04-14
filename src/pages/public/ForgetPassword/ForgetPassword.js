import React from "react";
import { Button, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import ErrorsMessage from "../../Components/ErrorMessages/index.js";
import "./style.css";
import { request } from "../../../utils/axios-http.js";

const schema = yup.object().shape({
  username: yup.string().trim().required("Tên đăng nhập không được bỏ trống"),
});

const ForgotPassword = () => {
  const [notify, contextHolder] = message.useMessage();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { username } = data;
      await request({
        data:{username},
        method:"post",
        url:"/auth/forgetpassword"})
      notify.info("Vui lòng kiểm tra Email");
    } catch (error) {
      message.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://phongcachmoc.vn/upload/images/tin-tuc/20%20mau%20nha%20hang%20dep/update-07-2022/Sushi-World-Ton-That-Thiep-1.JPG')",
        height: "100vh",
      }}
    >
      {contextHolder}
      <div className="fogetpassword">
        <h1>Quên mật khẩu</h1>
        <div className="form-item">
          <span>Tên đăng nhập</span>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <Input {...field} status={errors.username ? "error" : ""} />
            )}
          />
          {errors.username && <ErrorsMessage message={errors.username} />}
        </div>
        <Button
          className="submit"
          type="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Gửi yêu cầu
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
