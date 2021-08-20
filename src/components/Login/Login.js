import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import {useAuth} from '../Contexts/AuthContext';
import { Link, useHistory } from "react-router-dom"

function Login(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {currentUser,login} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    // useEffect(() => {
    //     currentUser && history.push("/todo");
    //   }, [currentUser]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/todo');
        } catch {
            setError('Failed to create an account');
        }
        setLoading(false)
    }

    
    return (
        <>
           <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {/* {currentUser && currentUser.email} */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        
                        <Button disabled={loading} type="submit" className="w-100" style={{marginTop: "15px"}}>Log In</Button>
                    </Form>
                </Card.Body>
            </Card> 
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup">Sign In</Link>
            </div>
        </>
    );
}

export default Login;