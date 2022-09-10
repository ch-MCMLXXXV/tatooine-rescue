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

        <form className="form" onSubmit={(handleSubmit)}>
            <div>
                <h2>Log In</h2>
                    <label>
                        <p>Username</p>
                        <input
                            type="text"
                            onChange={(event) => setUsername(event.target.value)}
                            minLength="8"
                            required
                        />
                    </label>
                    <label>
                        <p>Password</p>
                        <input
                            type="text"
                            onChange={(event) => setPassword(event.target.value)}
                            minLength="8"
                            required
                        />
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
            </div>
        </form>


    );
};

export default Login;