import Page from "../ui/page/Page";
import { useTranslation } from "react-i18next";
import withAuthRedirect from '../ui/withAuthRedirect';

function ProfilePage() {
  const { t } = useTranslation();
  return <Page content={<>{t("profilePage")}</>} />;
}

export default withAuthRedirect(ProfilePage, '/', (token) => !token);