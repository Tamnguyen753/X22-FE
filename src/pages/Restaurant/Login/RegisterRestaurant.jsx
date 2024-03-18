/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import AlertMessage from '../../../utils/AlertMessage';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import "./style.css";

const RegisterRestaurant = () => {
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [alert, setAlert] = useState(null);
    
    const {username, password, confirmPassword} = registerForm;

    const onChangeRegisterForm = event => setRegisterForm({...registerForm, [event.target.name]: event.target.value});

    const register = async event => {

    }

  return (
    <>
    <div className='form'>
        <p className='td-form'><b>REGISTER</b></p>
        <Form onSubmit={register}>
            <AlertMessage info={alert}/>
            <Form.Group>
                <Form.Control type="text" placeholder="username" name="username" required value={username} onChange={onChangeRegisterForm}></Form.Control>
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control type="password" placeholder="password" name="password" required value={password} onChange={onChangeRegisterForm}></Form.Control>
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control type="password" placeholder="ConfirmPassword" name="confirmPassword" required value={confirmPassword} onChange={onChangeRegisterForm}></Form.Control>
            </Form.Group>
            <br/>
        </Form>
        <p>Already have an account?
            <Link to='/restaurantLogin'>
                <Button variant='info' className=''>Login</Button>
            </Link>
            
        </p>
    </div>
    </>
  )
}

export default RegisterRestaurant;