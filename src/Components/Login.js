import React from 'react';
import {useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const Login = ({
    username,
    setUsername,
    password,
    setPassword,
    setToken,
    setIsLoggedIn,
}) => {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = await loginUser({
            username,
            password,
        });

        if (data) {
            setIsLoggedIn(true);
            const token = data.token;
            setToken(token);

            alert(`${data.message}`);
            navigate("/home")
        } else {
            alert(`${data.message}`);
        }
    };

    return (

    );
};

export default Login;