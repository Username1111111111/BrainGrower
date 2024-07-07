import { useUsers } from "../lib/context/userContext";

export default function UserTable() {
    const { users, loading, selectUser } = useUsers();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-body-secondary flex-column border border-secondary rounded p-2 d-flex justify-content-center p-0 m-0 mt-1  d-flex justify-content-center align-items-center">
            <h4 className="text-center">Users</h4>
            <table className="table table-striped rounded">
                <thead className="rounded">
                    <tr className="rounded m-0 p-0">
                        <th className="m-0 p-1 text-left"><b>ID</b></th>
                        <th className="m-0 p-1 text-left"><b>Name</b></th>
                        <th className="m-0 p-1 text-left"><b>Email</b></th>
                        <th className="m-0 p-1 text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr className="rounded m-0" key={user.id}>
                            <td className="m-0 p-1 align-middle text-left">
                                {user.id}
                            </td>
                            <td className="m-0 p-0 p-1 align-middle text-left">
                                {user.name}
                            </td>
                            <td className="m-0 p-1 align-middle text-left">
                                {user.email}
                            </td>
                            <td className="m-0 p-1 align-middle text-left">
                                <button
                                    className="btn btn-transparent p-1"
                                    onClick={() => selectUser(user)}
                                >
                                    ⚙️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
