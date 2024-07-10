import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAddUserMutation } from '../redux/userApi';
import { MESSAGE } from '../lib/message';

export default function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUser, { isLoading, error }] = useAddUserMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
        };

        try {
            await createUser(userData).unwrap();
            setName('');
            setEmail('');
            setPassword('');
        } catch (err) {
            console.error(MESSAGE.ERROR_CREATING_USER, err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-body-secondary flex-column border border-secondary rounded p-2 d-flex justify-content-center">
            <ul className="d-flex flex-column justify-content-start p-0">
                <li className="row d-flex flex-row m-2">
                    <label className="col-4" htmlFor="name">
                        Name:
                    </label>
                    <input
                        className="col-8"
                        type="text"
                        id="name"
                        name="user_name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </li>
                <li className="row d-flex flex-row m-2">
                    <label className="col-4" htmlFor="mail">
                        Email:
                    </label>
                    <input
                        className="col-8"
                        type="email"
                        id="mail"
                        name="user_email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </li>
                <li className="row d-flex flex-row m-2">
                    <label className="col-4" htmlFor="password">
                        Password:
                    </label>
                    <input
                        className="col-8"
                        type="password"
                        id="password"
                        name="user_password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </li>
            </ul>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create'}
            </Button>
            {error && <div className="text-danger">{MESSAGE.ERROR_CREATING_USER}</div>}
        </form>
    );
}
