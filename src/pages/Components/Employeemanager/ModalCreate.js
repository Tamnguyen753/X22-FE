import { Input, DatePicker, Button, Form, Typography, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import ErrorsMessage from "../ErrorMessages";
import { yupResolver } from "@hookform/resolvers/yup";
import { requestWithToken } from "../../../utils/axios-http";
export default function ModalCreate() {
  const [errorMessage, setErrorMessage] = useState("");
  const [notify, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const handleCreate = async (values) => {
    const { name, address, email, dateOfBirth, staffCode, username, password } =
      values;
    const token = localStorage.getItem("access_token");
    try {
      await requestWithToken(
        {
          data: {
            name,
            email,
            address,
            dateOfBirth,
            staffCode,
            username,
            password,
          },
          method: "post",
          url: "http://localhost:3000/api/staff/createStaffAccount",
        },
        token
      );
      await notify.info("Cấp tài khoản cho nhân viên thành công");
      window.location.reload();
    } catch (error) {
      setErrorMessage(error);
      console.log(error);
    }
  };
  return (
    <div>
      {contextHolder}
      <Form onFinish={handleCreate}>
        <Typography.Title>Tạo mới nhân viên</Typography.Title>
        <Form.Item
          label="Họ và Tên"
          name="name"
          rules={[
            { required: true, whitespace: true, message: "Nhập vào họ và tên" },
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[
            { required: true, whitespace: true, message: "Nhập vào địa chỉ" },
          ]}
        >
          <Input maxLength={256} />
        </Form.Item>
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              whitespace: true,
              message: "Nhập vào địa chỉ email",
            },
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item
          label="Ngày sinh"
          name="dateOfBirth"
          rules={[{ required: true, message: "Nhập vào ngày sinh" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Mã nhân viên"
          name="staffCode"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Nhập vào mã nhân viên",
            },
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item
          label="Tên tài khoản"
          name="username"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Nhập vào tên tài khoản",
            },
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, whitespace: true, message: "Nhập vào mật khẩu" },
          ]}
        >
          <Input.Password maxLength={50} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Hoàn tất
        </Button>
      </Form>
    </div>
  );
}
// const schema = yup.object().shape({
//   username: yup.string().trim().required("Tên đăng nhập không được bỏ trống"),
//   password: yup.string().trim().required("Mật khẩu không được bỏ trống"),
//   name: yup.string().required("Tên không được bỏ trống"),
//   address: yup.string().required("Địa chỉ không được bỏ trống"),
//   staffCode: yup.string().required("Mã nhân viên không được bỏ trống"),
//   dateOfBirth: yup.date().nullable().required(),
//   // .max(new Date(), "Date too much in the future"),
// });
// const ModalCreate = () => {
//   const [dateOfBirth, setDateOfBirth] = useState(null);
//   const [error, setError] = useState("");
//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });
//   const handleModalCreate = (data) => {
//     const { name, address, dateOfBirth, staffCode, username, password } = data;
//     console.log("1111", data);
//     // try {
//     //      axios.post("http://localhost:3000/api/staff/register", {
//     //       name,
//     //       address,
//     //       dateOfBirth,
//     //       staffCode,
//     //       username,
//     //       password,
//     //     });
//     //   alert("đăng ký tài khoản thành công");
//     //   console.log(
//     //     "aa",
//     //     name,
//     //     address,
//     //     dateOfBirth,
//     //     staffCode,
//     //     username,
//     //     password
//     //   );
//     // } catch (error) {
//     //   setError(error);
//     //   console.log(error);
//     // }
//   };
//   return (
//     <div className="modal-create">
//       <div className="form-item">
//         <span>Họ Tên</span>
//         <Controller
//           control={control}
//           name="name"
//           render={({ field }) => (
//             <Input {...field} status={errors.name ? "error" : ""} />
//           )}
//         />
//         {errors.username && <ErrorsMessage message={errors.username} />}
//       </div>
//       <div className="form-item">
//         <span>Địa chỉ</span>
//         <Controller
//           control={control}
//           name="address"
//           render={({ field }) => (
//             <Input {...field} status={errors.address ? "error" : ""} />
//           )}
//         />
//         {errors.address && <ErrorsMessage message={errors.address} />}
//       </div>
//       <div className="form-item">
//         <span>Này sinh</span>
//         <DatePicker
//           defaultValue={dateOfBirth}
//           onChange={(date) => setDateOfBirth(date)}
//         />
//       </div>
//       <div className="form-item">
//         <span>Mã nhân viên</span>
//         <Controller
//           control={control}
//           name="staffCode"
//           render={({ field }) => (
//             <Input {...field} status={errors.staffCode ? "error" : ""} />
//           )}
//         />
//         {errors.staffCode && <ErrorsMessage message={errors.staffCode} />}
//       </div>
//       <div className="form-item">
//         <span>Tài khoản</span>
//         <Controller
//           control={control}
//           name="username"
//           render={({ field }) => (
//             <Input {...field} status={errors.username ? "error" : ""} />
//           )}
//         />
//         {errors.username && <ErrorsMessage message={errors.username} />}
//       </div>
//       <div className="form-item">
//         <span>Mật khẩu</span>
//         <Controller
//           control={control}
//           name="password"
//           render={({ field }) => (
//             <Input {...field} status={errors.password ? "error" : ""} />
//           )}
//         />
//         {errors.password && <ErrorsMessage message={errors.password} />}
//       </div>
//       <Button
//         type="primary"
//         htmlType="button"
//         onClick={handleSubmit(handleModalCreate)}
//       >
//         Thêm
//       </Button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default ModalCreate;
