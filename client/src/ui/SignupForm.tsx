import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSignupUserMutation } from '../redux/userApi';
import { MESSAGE } from '../lib/message';

export default function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [signupUser, { isLoading, error }] = useSignupUserMutation();
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confPassword) {
            setPasswordMismatch(true);
            return;
        }

        const userData = {
            name,
            email,
            password,
            confirmPassword: confPassword,
        };

        try {
            await signupUser(userData).unwrap();
            setPasswordMismatch(false);
        } catch (error) {
            console.error(`${MESSAGE.ERROR_CREATING_USER} ${error}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-body-secondary flex-column border border-secondary rounded p-2 d-flex justify-content-center">
            <ul className="d-flex flex-column justify-content-start p-0">
                <li className="row d-flex flex-row m-2">
                    <label className="col-4 ps-0" htmlFor="name">
                        Name:
                    </label>
                    <input
                        className="col-8 form-control pe-0"
                        type="text"
                        id="name"
                        name="user_name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </li>
                <li className="row d-flex flex-row m-2">
                    <label className="col-4 ps-0" htmlFor="mail">
                        Email:
                    </label>
                    <input
                        className="col-8 form-control pe-0"
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
                        className="col-8 form-control pe-0"
                        type="password"
                        id="password"
                        name="user_password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </li>
                <li className="row d-flex flex-row m-2">
                    <label className="col-4 ps-0 text-nowrap" htmlFor="password">
                        Confirm password:
                    </label>
                    <input
                        className="col-8 form-control pe-0"
                        type="password"
                        id="confpassword"
                        name="user_confpassword"
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                    />
                </li>
            </ul>
            {passwordMismatch && <div className="text-danger">Passwords do not match</div>}
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create'}
            </Button>
            {error && <div className="text-danger text-center">{MESSAGE.ERROR_CREATING_USER}</div>}
        </form>
    );
}
