import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert  } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';


export default function UpdateProfile() {

    const emailRef = useRef();
    const pwdRef = useRef();
    const pwdConfirmRef = useRef();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const { currentUser, UpdateEmail, UpdatePassword } = useAuth();

    async function handleSubmit(event){
        event.preventDefault();

        if(pwdRef.current.value !== pwdConfirmRef.current.value){
            return setError('Passwords do not match!');
        }

        const promises = [];
        setLoading(true);
        setError("");

        if( emailRef.current.value !== currentUser.email ){
            promises.push(UpdateEmail(emailRef.current.value))
        }

        if( pwdRef.current.value ){
            promises.push(UpdatePassword(pwdRef.current.value));
        }

        Promise.all(promises)
            .then(() => {
                history.push("/")
            })
            .catch((error) => {
                console.log(error);
                setError("Failed to update the profile.");
            })
            .finally(() => {
                setLoading(false)
            });

    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h3 className='text-center mb-4'>Update Profile</h3>
                    { error && <Alert variant={'danger'}>{error}</Alert> }
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type={"email"} ref={emailRef} required 
                                    defaultValue={currentUser.email}
                                />
                        </Form.Group>
                        <Form.Group className="mb-3">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control 
                                    type={"password"} ref={pwdRef}
                                    placeholder="Leave blank to keep the same"
                                />
                        </Form.Group>
                        <Form.Group className="mb-3">
                                <Form.Label>New Password Confirmation</Form.Label>
                                <Form.Control 
                                    type={"password"} ref={pwdConfirmRef}
                                    placeholder="Leave blank to keep the same"
                                />
                        </Form.Group>
                        <Button
                            disabled={loading}
                            type="submit"
                            className="w-100 mt-3"
                        >
                            Update
                        </Button>
                        <div className="w-100 text-center mt-2">
                            <Link
                                to='/'
                                style={{
                                    textDecoration: 'none',
                                    color: 'tomato',
                                    fontWeight: "600"
                                }}
                            >
                                Cancel
                            </Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
