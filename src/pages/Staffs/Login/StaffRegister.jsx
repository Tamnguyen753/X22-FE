/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import useStaff from '../../../hooks/useStaff';
import { toast } from 'react-toastify';
import { extractMessageFormErr } from '../../../utils/error';
import ErrorMessages from '../../../utils/ErrorMessages';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style2.css';

const schema = yup.object().shape({
    name: yup.string().required("Bắt buộc phải điền tên!"),
    email: yup.string().email("email không hợp lệ!").required("Bắt buộc phải điền email! "),
    username: yup.string().required("Bắt buộc phải điền tên đăng nhập!"),
    password: yup.string().min(8, "mật khẩu phải ít nhất 8 kí tự!").required("Bắt buộc phải điền mật khẩu!"),
    confirmPassword: yup.string().required("Bắt buộc phải điền xác nhận mật khẩu!").oneOf([yup.ref('password'), null], 'Mật khẩu không đúng!'),
})
const StaffRegister = () => {

    const {
        register,
        handleSubmit, formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    });
    
    const {register: registerStaff} = useStaff();

    const onSubmit = async (data) => {
        try {
            await registerStaff(data);
        } catch (err) {
            toast.error(extractMessageFormErr(err));
        }
    };

  return (
    <>
    <div className='form2'>
        <p className='td-form2'><b>QUẢN LÝ ĐĂNG KÝ TÀI KHOẢN</b></p>
        <Form className='rg' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Control {...register('name')} type='text' placeholder='Nhập họ và tên'  required />
                {errors.name && <ErrorMessages message={errors.name}/>}
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control {...register('email')} type='text' placeholder='Nhập email của bạn'  required />
                {errors.email && <ErrorMessages message={errors.email}/>}
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control {...register('username')} type='text' placeholder='Nhập tên đăng nhập'  required />
                {errors.username && <ErrorMessages message={errors.username}/>}
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control {...register('password')} type='password' placeholder='Nhập mật khẩu'  required />
                {errors.password && <ErrorMessages message={errors.password}/>}
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control {...register('confirmPassword')} type='password' placeholder='xác nhận mật khẩu'  required />
                {errors.confirmPassword && <ErrorMessages message={errors.confirmPassword}/>}
            </Form.Group>
            <br/>
            <br/>
            <Button className='dk' variant='success' type='submit'  >Đăng ký</Button>
            <br/>
        </Form>
        <br/>
        <div className='cc'> 
            <p>Bạn đã có tài khoản?</p>
            <Link to='/loginStaff'>
                <Button className='dn' variant='info'>Đăng nhập</Button>
            </Link>
        </div>
    </div>
    </>
  )


}

export default StaffRegister
