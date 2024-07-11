import Page from "../ui/page/Page";
import LoginForm from "../ui/LoginForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
      if (token) {
          navigate('/');
      }
  }, [token, navigate]);

  return (
    <>
      {!token && <Page content={<LoginForm/>}/>}
    </>
  )
}