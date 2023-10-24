import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [authenticated, setAuthenticated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Replace this with your actual authentication logic.
        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                const { token } = data; // Assuming the server sends a JWT token
                localStorage.setItem('token', token); // Store the token in local storage
                setAuthenticated(true); // Set the authenticated state to true
            } else {
                alert('Invalid username or password. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
            alert('Login failed');
        }
    };

    const history = useHistory();
    if (authenticated) {
        return <Redirect to="/home" />;
    }

    const handleButtonClick = () => {
        history.push('/coordinator'); 
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                /><br />

                <button type="submit">Login</button>
                <button type="button" onClick={() => history.push('/coordinator')}>
                    Coordinator Login?
                </button>
            </form>
        </div>
    );
}

export default Login;
