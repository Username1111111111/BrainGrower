import Page from "../ui/page/Page";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ProfilePage() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const {t} = useTranslation();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <>
      {token && <Page content={<>{t("profilePage")}</>} />}
    </>
  )
}