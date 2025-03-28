import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:6500/api/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.msg || "Login failed");
            }

            navigate("/home");
        } catch (err) {
            setError(err.message || "Invalid credentials: Please try again");
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="p-10 rounded shadow-xl bg-white">
                <h2 className="text-center text-2xl mb-3">Login</h2>

                {error && <p className="text-red-500 text-center mb-3">{error}</p>}

                <form onSubmit={handleLogin}>
                    <h2 className="mb-3">Username</h2>
                    <input
                        className="mb-3 ring-offset-2 ring-2 p-2 w-full"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <h2 className="mb-3">Password</h2>
                    <input
                        className="mb-3 ring-offset-2 ring-2 p-2 w-full"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full py-2 mt-3 bg-blue-600 text-white rounded"
                    >
                        Login
                    </button>
                </form>

                <h2 className="mt-3 text-center">
                    Forgot password? <a className="text-blue-700" href="#">Click here</a>
                </h2>

                <h2 className="mt-3 text-center">
                    Don't have an account? <a className="text-blue-700" href="signup.html">Signup</a>
                </h2>
            </div>
        </div>
    );
};

export default Login;
