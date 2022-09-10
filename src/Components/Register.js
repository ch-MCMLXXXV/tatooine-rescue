import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";

const Register = ({
    username,
    setUsername,
    password,
    setPassword,
    setToken,
    email,
    setEmail,
}) => {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (confirmPassword()) {
            const data = await registerUser({
                username,
                password,
                email,
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
        <form className="form" onSubmit={handleSubmit}>
            <h2>Register New Account</h2>
                <label>
                    <p>Username:</p>
                    <input
                        type="text"
                        minLength="8"
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                </label>
                <label>
                    <p>Password:</p>
                    <input
                        type="password"
                        name="password"
                        minLength="8"
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </label>
                <label>
                    <p>Confirm Password:</p>
                    <input type="password" name="confirm" minLength="5" required />
                </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
      </form>
    );
};

export default Register;