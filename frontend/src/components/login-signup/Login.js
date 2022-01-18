import React from 'react'
import { useState } from 'react';
import axios from "axios";
import NavigationBar from '../Navbar/Navbar';
function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            axios.get(`http://127.0.0.1:8000/user-login/phoneNo=${phone}/password=${password}/`)
                .then(result => {
                    console.log(result);
                }).catch(e => {
                    console.log(e);
                });
        } else {
            axios.post(`http://127.0.0.1:8000/user-register/`, { username, email, password, phone })
                .then(result => {
                    console.log(result);
                }).catch(e => {
                    console.log(e);
                });
        }
    }
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">{isLogin ? "Welcome Back!" : "Create an Account!"}</h1>
                                            </div>

                                            <form onSubmit={handleSubmit} className="user">
                                                {!isLogin ?
                                                    <>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control form-control-user"
                                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                                placeholder="Enter Name..." onChange={(e) => setUsername(e.target.value)} />
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="email" className="form-control form-control-user"
                                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                                placeholder="Enter Email Address..." onChange={(e) => setEmail(e.target.value)} />
                                                        </div>

                                                    </> : <></>}

                                                <div className="form-group">
                                                    <input type="text" className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="Enter Phone..." onChange={(e) => setPhone(e.target.value)} />
                                                </div>

                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user"
                                                        id="exampleInputPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                        <label className="custom-control-label" htmlFor="customCheck">Remember
                                                            Me</label>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                                    {isLogin ? "Login" : "Register Acount"}
                                                </button>
                                            </form>

                                            <hr />
                                            <div className="text-center">
                                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                                            </div>
                                            <div className="text-center">
                                                <button className="small" onClick={(e) => setIsLogin(!isLogin)}>Create an Account!</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script src="vendor/jquery/jquery.min.js"></script>
            <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
            <script src="js/sb-admin-2.min.js"></script>
        </>
    )
}

export default Login
