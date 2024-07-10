import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useUpdateUserMutation, useFetchUsersQuery } from '../redux/userApi';
import { MESSAGE } from '../lib/message';

export default function UpdateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [initialName, setInitialName] = useState('');
    const [initialEmail, setInitialEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const selectedUser = useSelector((state: RootState) => state.selectedUser.user);
    const [success, setSuccess] = useState(false);
    const [updateUser] = useUpdateUserMutation();
    const { refetch } = useFetchUsersQuery();

    useEffect(() => {
        if (selectedUser) {
            setName(selectedUser.name);
            setEmail(selectedUser.email);
            setPassword('');
            setInitialName(selectedUser.name);
            setInitialEmail(selectedUser.email);
        }
    }, [selectedUser]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedUser || isSubmitting) return;

        if (
            name === initialName &&
            email === initialEmail &&
            !password
        ) {
            return;
        }

        setIsSubmitting(true);

        const userData = {
            name,
            email,
            ...(password && { password }),
        };

        try {
            const res = await updateUser({ id: selectedUser.id, ...userData }).unwrap();
            if (res) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);

                setName(res.name);
                setEmail(res.email);
                setPassword('');
                setInitialName(res.name);
                setInitialEmail(res.email);

                refetch();
            }
        } catch (error) {
            throw new Error(`${MESSAGE.ERROR_UPDATING_USER}: ${error}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!selectedUser) {
        return <div className="text-center">Select a user to edit</div>;
    }

    const isFormChanged = name !== initialName || email !== initialEmail || password !== '';

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-body-secondary border border-secondary rounded p-2 d-flex justify-content-center align-items-center"
        >
            <ul className="d-flex flex-row justify-content-center align-items-center p-0 m-0">
                <li className="row d-flex justify-content-center align-items-center p-0 m-0 mx-2">
                    <label className="col-5 text-center p-0 m-0" htmlFor="name">
                        Name:
                    </label>
                    <input
                        className="col-auto form-control mx-1 text-truncate"
                        type="text"
                        id="name"
                        name="user_name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </li>
                <li className="row d-flex justify-content-center align-items-center p-0 m-0 mx-2">
                    <label className="col-5 text-center p-0 m-0" htmlFor="mail">
                        Email:
                    </label>
                    <input
                        className="col-auto form-control mx-1 text-truncate"
                        type="email"
                        id="mail"
                        name="user_email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </li>
                <li className="row d-flex justify-content-center align-items-center p-0 m-0 mx-2">
                    <label className="col-5 text-center p-0 m-0" htmlFor="password">
                        Password:
                    </label>
                    <input
                        className="col-auto form-control mx-1 text-truncate"
                        type="password"
                        id="password"
                        name="user_password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </li>
                <li className="d-flex justify-content-end align-items-end align-self-end p-0 m-0 mx-2">
                    {success ? (
                        <button className="btn btn-success" type="submit" disabled>
                            Successful!
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isSubmitting || !isFormChanged}
                        >
                            {isSubmitting ? 'Updating...' : 'Update'}
                        </button>
                    )}
                </li>
            </ul>
        </form>
    );
}
