import Page from "../ui/page/Page";
import SignupForm from "../ui/SignupForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SignupPage() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
      if (token) {
          navigate('/');
      }
  }, [token, navigate]);

  return (
    <>
      {!token && <Page content={<SignupForm/>}/>}
    </>
  )
}