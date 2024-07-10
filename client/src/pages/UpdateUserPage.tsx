import Page from "../ui/page/Page";
import UpdateUserForm from "../ui/UpdateUserForm";
import UserTable from "../ui/UserTable";

export default function UpdateUserPage() {
    const content = (
        <div>
            <UpdateUserForm />
            <UserTable />
        </div>
    );

    return (
        <>
            <Page content={content} />
        </>
    );
}
