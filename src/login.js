import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [authenticated, setAuthenticated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Replace this with your actual authentication logic.
        if (formData.email === 'user@example.com' && formData.password === 'password') {
            setAuthenticated(true);
        } else {
            alert('Invalid email or password. Please try again.');
        }
    };

    const history = useHistory();

    const handleButtonClick = () => {
        history.push('/coordinator'); 
    };

    if (authenticated) {
        return <Redirect to="/home" />;
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                /><br />

                <button type="submit">Login</button>
                <button type="button" onClick={handleButtonClick}>
                    Coordinator Login?
                    </button>
            </form>
        </div>
    );
}

export default Login;
