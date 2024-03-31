/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import useStaff from '../../../hooks/useStaff';
import { toast } from 'react-toastify';
import { extractMessageFormErr } from '../../../utils/error';
import ErrorMessages from '../../../utils/ErrorMessages';

const schema = yup.object().shape({
    name: yup.string().required("Bắt buộc phải điền tên!"),
    email: yup.string().email("email không hợp lệ!").required("Bắt buộc phải điền email! "),
    address: yup.string().required("Bắt buộc phải điền địa chỉ! "),
    dateOfBirth: yup.date().required(),
    staffCode: yup.string().required("Bắt buộc phải điền mã nhân viên!"),
    username: yup.string().required("Bắt buộc phải điền tên đăng nhập!"),
    password: yup.string().min(8, "mật khẩu phải ít nhất 8 kí tự!").required("Bắt buộc phải điền mật khẩu!"),
    confirmPassword: yup.string().required("Bắt buộc phải điền xác nhận mật khẩu!").oneOf([yup.ref('password'), null], 'Mật khẩu không đúng!'),
})
const CreatedStaffAccount = () => {

    const {
        register,
        handleSubmit, formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    });
    
    const {createdStaffAccount} = useStaff();

    const onSubmit = async (data) => {
        console.log(data);
        
        try {
            await createdStaffAccount(data);
        } catch (err) {
            toast.error(extractMessageFormErr(err));
        }
    };

  return (
    <>
    <div className='form2'>
        <p className='td-form2'><b>TẠO TÀI KHOẢN CHO NHÂN VIÊN MỚI</b></p>
        <Form className='rg' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Control {...register('name')} type='text' placeholder='Nhập họ và tên nhân viên'  required />
                {errors.name && <ErrorMessages message={errors.name}/>}
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control {...register('email')}  type='text' placeholder='Nhập email của nhân viên'  required />
                {errors.email && <ErrorMessages message={errors.email}/>}
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control {...register('dateOfBirth')}  type='date' required />
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control {...register('staffCode')}  type='text' placeholder='Nhập mã nhân viên'  required />
                {errors.staffCode && <ErrorMessages message={errors.staffCode}/>}
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control {...register('username')}  type='text' placeholder='Nhập tên đăng nhập'  required />
                {errors.username && <ErrorMessages message={errors.username}/>}
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control {...register('password')} type='password' placeholder='Nhập mật khẩu' required />
                {errors.password && <ErrorMessages message={errors.password}/>}
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control {...register('confirmPassword')} type='password' placeholder='xác nhận mật khẩu'  required />
                {errors.confirmPassword && <ErrorMessages message={errors.confirmPassword}/>}
            </Form.Group>
            <br/>
            <br/>
            <Button variant='success' type='submit'  >Đăng kí</Button>
            <br/>
        </Form>
    </div>
    </>
  )


}

export default CreatedStaffAccount;