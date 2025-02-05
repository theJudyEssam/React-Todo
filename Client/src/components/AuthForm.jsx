import React, { useState } from 'react';
import Button from "./Button";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const login = async (username, password) => {
    try {

        const res = await axios.post('http://localhost:3000/login',
            { username, password }, { withCredentials: true });
        console.log(res);
        return true;
    } catch (err) {
        console.error(err.response?.data || "Error");
        return false;
    }
};

const register = async (fullname, username, email, password) => {
    try {
        const res = await axios.post(
            "http://localhost:3000/register",
            { fullname, username, email, password },
            { withCredentials: true }
        );
        console.log(res.data);
        return true;
    } catch (err) {
        console.error(err.response?.data || "Error");
        return false;
    }
};



function AuthForm({ isLogin }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { username, password } = formData;
        const success = await login(username, password);
        if (success) {
            navigate('/home');
        } else {
            alert("Invalid Credentials from handlelogin");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { fullname, username, email, password } = formData;
        if (password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const success = await register(fullname, username, email, password);
        if (success) {
            navigate('/home');
        } else {
            alert("Registration Failed");
        }
    };




    
    return (
        <div className="auth-form">
            <h1>{isLogin ? "Welcome Back" : "Welcome to Todo"}</h1>
            <form onSubmit={isLogin ? handleLogin : handleRegister}>
                {!isLogin && (
                    <>
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Name"
                            value={formData.fullname}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </>
                )}
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {!isLogin && (
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                )}
                <div className="form-footer">
                    <Button type="submit" text={isLogin ? "Login" : "Sign up"} />
                    {isLogin ? (
                        <a href="/register">Don't have an account?</a>
                    ) : (
                        <a href="/">Already have an account?</a>
                    )}
                </div>
            </form>
        </div>
    );
}

export default AuthForm;