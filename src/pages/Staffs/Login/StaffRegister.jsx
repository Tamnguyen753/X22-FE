/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link , useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style2.css';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import useStaff from '../../../hooks/useStaff';
import { toast } from 'react-toastify';
import { extractMessageFormErr } from '../../../utils/error';
import ErrorMessages from '../../../utils/ErrorMessages';

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    address: yup.string().required("Address is required"),
    dateOfBirth: yup.date().required("Date of Birth is required"),
    staffCode: yup.string().required("Staff Code is required"),
    username: yup.string().required("username is required"),
    password: yup.string().required("password is required"),
    confirmPassword: yup.string().required("Confirm password is required").oneOf([yup.ref('password'), null], 'password must match'),
    type: yup.string().required("type is required"),
})
const StaffRegister = () => {
    const [registerForm, setRegisterForm] = useState({
        name: '',
        address: '',
        dateOfBirth: Date.now(),
        staffCode: '',
        username: '',
        password: '',
        confirmPassword: '',
        type: "staff",
    });

    const navigate = useNavigate();
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
            toast.success("registed successfully!");
            navigate("/stafflogin");
        } catch (err) {
            toast.error(extractMessageFormErr(err));
        }
    };

  return (
    <>
    <div className='form2'>
        <p className='td-form2'><b>REGISTER STAFF</b></p>
        <Form className='rg' onSubmit={handleSubmit(onSubmit)}>
            {/* <AlertMessage info={alert}/> */}
            <Form.Group>
                <Form.Control {...register('name')} type='text' placeholder='Your Fullname'  required />
                {errors.name && <ErrorMessages message={errors.name}/>}
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control {...register('address')} type='text' placeholder='Your Address'  required />
                {errors.address && <ErrorMessages message={errors.address}/>}
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control {...register("dateOfBirth")} type='date' required ></Form.Control>
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control {...register('staffCode')} type='text' placeholder='Your StaffCode'  required />
                {errors.staffCode && <ErrorMessages message={errors.staffCode}/>}
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control {...register('username')} type='text' placeholder='username'  required />
                {errors.username && <ErrorMessages message={errors.username}/>}
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control {...register('password')} type='password' placeholder='password'  required />
                {errors.password && <ErrorMessages message={errors.password}/>}
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control {...register('confirmPassword')} type='password' placeholder='confirmPassword'  required />
                {errors.confirmPassword && <ErrorMessages message={errors.confirmPassword}/>}
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control {...register("type")} as="select" >
                    <option name='staff' value='staff'>Staff</option>
                    <option name='manager' value='manager'>Manager</option>
                </Form.Control>
            </Form.Group>
            <br/>
            <Button variant='success' type='submit'  >Register</Button>
            <br/>
        </Form>
        <p> Already have an account?
            <Link to='/stafflogin'>
                <Button variant='info'>Login</Button>
            </Link>
        </p>
    </div>
    </>
  )


}

export default StaffRegister