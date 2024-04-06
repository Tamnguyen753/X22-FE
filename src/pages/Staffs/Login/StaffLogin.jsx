/* eslint-disable no-unused-vars */
import React from 'react';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style1.css';
import {yupResolver} from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import useStaff from '../../../hooks/useStaff';
import { toast } from 'react-toastify';
import { extractMessageFormErr } from '../../../utils/error';
import ErrorMessages from '../../../utils/ErrorMessages';

const schema = yup.object().shape({
   username: yup.string().required("username is required!"),
   password: yup.string().required("password is required!"),
});

const StaffLogin = () => {
    const {
        register, handleSubmit, formState: {errors}
    } = useForm({
        resolver: yupResolver(schema),
    });

    const {login} = useStaff();

    const onSubmit = async (data) => {
        console.log('data', data)
        
        try{
            await login(data);
        }catch(error){
            toast.error(extractMessageFormErr(error));
        }
    };

    return (
        <>
        <div className='form'>
            <p className='td-form'><b>Nhân viên đăng nhập</b></p>
            <Form className='form-container' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Control  
                    type='text' 
                    placeholder='Tên đăng nhập'
                    {...register('username')}
                    required ></Form.Control>
                </Form.Group>
                {errors.username && <ErrorMessages message={errors.username.message}/>}
                <br/>
                <Form.Group>
                    <Form.Control 
                    type='password'
                    placeholder='Mật khẩu' 
                    required 
                    {...register('password')}  >
                    </Form.Control>
                </Form.Group>
                {errors.password && <ErrorMessages message={errors.password.message}/>}
                <br/>
                <Button className="dk" variant='success' type='submit'>Đăng nhập</Button>
                <br/>
            </Form>
            <p className='forget'>Quên mật khẩu</p>
            <p className='cc'>Bạn chưa có tài khoản?
            <Link to='/registerStaff'>
                <Button variant='info'>Đăng kí</Button>
            </Link>
            </p>
        </div>
        </>
    )
}

export default StaffLogin