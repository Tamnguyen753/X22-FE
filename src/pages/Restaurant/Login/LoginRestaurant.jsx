/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import AlertMessage from '../../../utils/AlertMessage';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import "./style.css";

const LoginRestaurant = () => {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });

    const [alert, setAlert] = useState(null);
    
    const {username, password} = loginForm;

    const onChangeLoginForm = event => setLoginForm({...loginForm, [event.target.name]: event.target.value});

    const login = async event => {

    }

  return (
    <>
    <div className='form'>
        <p className='td-form'><b>LOGIN</b></p>
        <Form onSubmit={login}>
            <AlertMessage info={alert}/>
            <Form.Group>
                <Form.Control type="text" placeholder="username" name="username" required value={username} onChange={onChangeLoginForm}></Form.Control>
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control type="password" placeholder="password" name="password" required value={password} onChange={onChangeLoginForm}></Form.Control>
            </Form.Group>
            <br/>
        </Form>
        <p>Don't have an account?
            <Link to='/restaurantRegister'>
                <Button variant='info' className=''>Register</Button>
            </Link>
            
        </p>
    </div>
    </>
  )
}

export default LoginRestaurant;