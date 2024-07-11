import Page from "../ui/page/Page";
import UpdateUserForm from "../ui/UpdateUserForm";
import UserTable from "../ui/UserTable";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function UpdateUserPage() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || role !== 'admin') {
            navigate('/');
        }
    }, [token, role, navigate]);

    const content = (
        <div>
            <UpdateUserForm />
            <UserTable />
        </div>
    );

    return (
        <>
            {token && role == 'admin' && <Page content={content} />}
        </>
    );
}
