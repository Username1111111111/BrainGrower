import Page from "../ui/page/Page";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

  return (
    <>
      {token && <Page content={<>Profile page</>}/>}
    </>
  )
}