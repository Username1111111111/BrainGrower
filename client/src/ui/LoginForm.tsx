import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLoginUserMutation } from '../redux/userApi';
import { MESSAGE } from '../lib/message';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [plainTextPassword, setPlainTextPassword] = useState('');
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            email,
            plainTextPassword,
        };

        try {
            const response = await loginUser(userData).unwrap();
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('role', response.role);
            setSuccessMessage(response.message);
            navigate('/');
        } catch (error) {
            console.error(`${MESSAGE.ERROR_LOGIN_USER}: ${error}`);
        }
    };

    const fClass = "bg-body-secondary flex-column border border-secondary rounded p-2 d-flex justify-content-center";

    return (
        <form onSubmit={handleSubmit} className={fClass}>
            <ul className="d-flex flex-column justify-content-start p-0">
                <li className="row d-flex flex-row m-2">
                    <label className="col-4 ps-0" htmlFor="mail">
                        Email:
                    </label>
                    <input
                        className="col-8 pe-0 form-control"
                        type="email"
                        id="mail"
                        name="user_email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </li>
                <li className="row d-flex flex-row m-2">
                    <label className="col-4 ps-0" htmlFor="password">
                        Password:
                    </label>
                    <input
                        className="col-8 pe-0 form-control"
                        type="password"
                        id="password"
                        name="user_password"
                        value={plainTextPassword}
                        onChange={(e) => setPlainTextPassword(e.target.value)}
                    />
                </li>
            </ul>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Login'}
            </Button>
            {error && <div className="text-danger text-center">{MESSAGE.ERROR_LOGIN_USER}</div>}
            {successMessage && <div className="text-success text-center">{successMessage}</div>}
        </form>
    );
}