import React, { useState, useRef } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

import './general.css';

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const history = useHistory();

    async function handleSubmit(event){
        event.preventDefault();
        try{
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            setLoading(false);
            history.push('/');
        } catch {
            setError("Connection Failed !");
            setLoading(false);
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    
                    <h3 className="text-center mb-4">Log In</h3>
                    { error && <Alert variant={"danger"}>{error}</Alert> }
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group className="mb-3" id="emailLog">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type={'email'} ref={emailRef} required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" id="passwordLog">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type={'password'} ref={passwordRef} required
                            />
                        </Form.Group>
                        <Button 
                            className="w-100 mt-2"
                            type="submit" 
                            disabled={loading}
                        >
                            Log In
                        </Button>
                        <div className='w-100 text-center mt-2'>
                            <Link to='/forgot-password'
                                style={{textDecoration: 'none', color: '#888'}}
                            >Forgot Password?</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-3">
                Need an account? <Link to='/signup' 
                    style={{textDecoration: 'none', color: 'dodgerblue'}}
                >Sign Up</Link>
            </div>
        </>
    )
}
