/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import AlertMessage from '../../../utils/AlertMessage';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style1.css';

const StaffLogin = () => {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });

    const [alert, setAlert] = useState(null);

    const {username, password} = loginForm;

    const onChangeLoginForm = event => setLoginForm({...loginForm, [event.target.name]: event.target.value});

    const login = async event => {
        

    }

    return (
        <>
        <div className='form'>
            <p className='td-form'><b>Đăng nhập</b></p>
            <Form className='lg' onSubmit={login}>
                <AlertMessage info={alert}/>
                <Form.Group>
                    <Form.Control type='text' placeholder='Tên đăng nhập' name='username' required value={username} onChange={onChangeLoginForm}></Form.Control>
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Control type='password' placeholder='Mật khẩu' name='password' required value={password} onChange={onChangeLoginForm}></Form.Control>
                </Form.Group>
                <br/>
                <Button variant='success' type='submit'>Đăng nhập</Button>
                <br/>
            </Form>
            <p>Bạn chưa có tài khoản ?
            <Link to='/staffRegister'>
                <Button variant='info'>Đăng ký</Button>
            </Link>
            </p>
        </div>
        </>
    )
}

export default StaffLogin