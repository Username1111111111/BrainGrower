import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { MESSAGE } from '../lib/message';

export default function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const domain = import.meta.env.VITE_SERVER_DOMAIN;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userData = {
            name,
            email,
            password,
        };

        try {
            const response = await fetch(`${domain}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

        } catch (error) {
            throw new Error(MESSAGE.ERROR_CREATING_USER, error);
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
            <Button type="submit">Create</Button>
        </form>
    );
}
