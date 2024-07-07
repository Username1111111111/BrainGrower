import { useState, useEffect } from "react";
import { useUsers } from "../lib/context/userContext";
import { MESSAGE } from "../lib/message";

export default function UpdateUser() {
    const { selectedUser, getUsers } = useUsers();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const domain = import.meta.env.VITE_SERVER_DOMAIN;

    useEffect(() => {
        if (selectedUser) {
            setName(selectedUser.name);
            setEmail(selectedUser.email);
        }
    }, [selectedUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            ...(password && { password }),
        };

        try {
            const response = await fetch(
                `${domain}/user/${selectedUser.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                }
            );

            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            getUsers();
        } catch (error) {
            throw new Error(MESSAGE.ERROR_UPDATING_USER, error);
        }
    };

    if (!selectedUser) {
        return <div className="text-center">Select a user to edit</div>;
    }

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
                    <label
                        className="col-5 text-center p-0 m-0"
                        htmlFor="password"
                    >
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
                    <button className="btn btn-primary" type="submit">
                        Update
                    </button>
                </li>
            </ul>
        </form>
    );
}
