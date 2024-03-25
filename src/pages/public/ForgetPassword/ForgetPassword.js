import React from "react";
import { Button, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import ErrorsMessage from "../../Components/ErrorMessages/index.js";
import "./style.css";

const schema = yup.object().shape({
  username: yup.string().trim().required("Tên đăng nhập không được bỏ trống"),
  email: yup
    .string()
    .trim()
    .email("email sai định dạng")
    .required("Email không được bỏ trống"),
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
    const { username, email } = data;
    try {
      await axios.get("http://localhost:3000/api/user/forgetpassword", {
        username,
        email,
      });
      notify.info("Vui lòng kiểm tra Email");
      console.log(data);
    } catch (error) {
      if (error) {
        console.log(error);
      } else {
        console.error(error);
        message.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
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
        <div className="form-item">
          <span>Email</span>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input {...field} status={errors.email ? "error" : ""} />
            )}
          />
          {errors.email && <ErrorsMessage message={errors.email} />}
        </div>
        <Button
          className="submit"
          type="primary"
          style={{
            display: "block",
            width: "100%",
          }}
          onClick={handleSubmit(onSubmit)}
        >
          Gửi yêu cầu
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
