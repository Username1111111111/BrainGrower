import Page from "../ui/page/Page";
import LoginForm from "../ui/LoginForm";
import withAuthRedirect from '../ui/withAuthRedirect';

function LoginPage() {
  return <Page content={<LoginForm />} />;
}

export default withAuthRedirect(LoginPage, '/', (token) => !!token);