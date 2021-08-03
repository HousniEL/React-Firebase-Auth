import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

import './general.css'

export default function Signup() {

    // - Will contain our input value .
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const { signup } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    async function handleSubmit(event){
        event.preventDefault();

        if( passwordRef.current.value !== passwordConfirmRef.current.value ){
            return setError('Passwords do not match');
        }
        try{
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            setLoading(false);
            history.push('/');
        } catch {
            setError('Failed to create an account');
            setLoading(false);
        }
    }  

    // Why { currentUser && currentUser.email } ?
    // Because the currentUser starts out as null and sets itself.
    // What happens is that firebase sets local storage and tokens automatically, so that it can verify if
    // there is a user already signed in, if so it will connect that user for you .

    return (
        <>
            <Card>
                <Card.Body>
                    <h3 className="text-center mb-4">Sign Up</h3>
                    { error && <Alert variant={"danger"}>{error}</Alert> }
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group className="mb-3" id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group className="mb-3" id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group className="mb-3" id="passwordConfirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button 
                            disabled={ loading }
                            type="submit" className="w-100 mt-3"
                        >
                            Sign Up
                            </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-3">
                Already have an account? <Link to="/login" 
                style={{ color: 'dodgerblue', textDecoration: 'none' }}>
                    Log In</Link>
            </div>
        </>
    )
}
