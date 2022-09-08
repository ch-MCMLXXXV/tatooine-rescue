import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";

const Register = ({
    username,
    setUsername,
    password,
    setPassword,
    setToken,
}) => {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (confirmPassword()) {
            const data = await registerUser({
                username,
                password,
            });

            const token = data.token;

            localStorage.setItem("token", JSON.stringify(token));
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem("username", username);
            data
                ? alert(`${data.message}`)
                : alert(`${data.error}`);
            if (token) {
                navigate("/home");
            }
        }
    };

    const confirmPassword = () => {
        const password = document.querySelector("input[name=password");
        const confirm = document.querySelector("input[name=confirm");
        if (confirm.value !== password.value) {
            alert("Passwords must match.");
            return false;
        } else {
            return true;
        }
    }

    return (

    );
};

export default Register;