import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SIgn_img from './SignIn_Img';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';

const Login = () => {

    const history = useNavigate();

    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    });

    const getdata = (e) => {
        const { value, name } = e.target;
        setInpval((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const addData = async (e) => {
        e.preventDefault();
        const { email, password } = inpval;

        if (email === "") {
            toast.error('Email field is required', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error('Please enter a valid email address', {
                position: "top-center",
            });
        } else if (password === "") {
            toast.error('Password field is required', {
                position: "top-center",
            });
        } else if (password.length < 5) {
            toast.error('Password must be at least 5 characters long', {
                position: "top-center",
            });
        } else {
            try {
                // Making a POST request to the backend
                const response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                });

                const result = await response.text();

                if (response.ok) {
                    toast.success('Login successful!', { position: "top-center" });
                    localStorage.setItem('user_login', JSON.stringify(result));
                    history("/Homepage");
                } else {
                    toast.error(result, { position: "top-center" });
                }
            } catch (error) {
                toast.error('Something went wrong. Please try again later.', { position: "top-center" });
            }
        }
    };

    return (
        <>
            <div className="container mt-3" style={{ backgroundColor: "#F5F5F7" }}>
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-5 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-8' style={{ fontSize: "40px" }}>Sign IN</h3>
                        <Form>
                            <Form.Group className="mb-3 col-lg-8" controlId="formBasicEmail">
                                <Form.Label style={{ fontSize: "20px" }}>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    onChange={getdata}
                                    style={{ fontSize: "20px" }}
                                    placeholder="Enter email"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-8" controlId="formBasicPassword">
                                <Form.Label style={{ fontSize: "20px" }}>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onChange={getdata}
                                    style={{ fontSize: "20px" }}
                                    placeholder="Password"
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                className='col-lg-4'
                                onClick={addData}
                                style={{ backgroundColor: "#B04040", fontSize: "20px", marginLeft: "15%" }}
                            >
                                Submit
                            </Button>
                        </Form>
                        <p className='mt-3' style={{ fontSize: "20px" }}>Don't Have an Account? <span><NavLink to="/" style={{ color: "#B04040" }}>SignUp</NavLink></span> </p>
                    </div>
                    <SIgn_img />
                </section>
                <ToastContainer />
            </div>
        </>
    );
}

export default Login;
