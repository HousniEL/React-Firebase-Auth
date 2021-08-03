import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

import './general.css';

export default function ForgotPassword() {

    const emailRef = useRef();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const { resetPassword } = useAuth();

    async function handleSubmit(event){
        event.preventDefault();
        try {
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check your email inbox.')
        } catch {
            setError('Failed to reset password');
            setLoading(false);
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h3 className="text-center mb-4">Reset Password</h3>
                    { error && <Alert variant={"danger"}>{error}</Alert> }
                    { message && <Alert variant={"success"}>{message}</Alert> }
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type={'email' } ref={emailRef} required />
                        </Form.Group>
                        <Button
                            disabled={loading}
                            type="submit"
                            className='w-100 mt-4'
                        >
                            Reset Password
                        </Button>
                    </Form>
                    <div className='w-100 text-center mt-2'>
                        <Link to='/login'
                            style={{textDecoration: 'none', color: '#888'}}
                        >Log In</Link>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}
