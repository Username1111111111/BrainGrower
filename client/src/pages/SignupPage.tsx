import Page from "../ui/page/Page";
import SignupForm from "../ui/SignupForm";
import withAuthRedirect from '../ui/withAuthRedirect';

function SignupPage() {
  return <Page content={<SignupForm />} />;
}

export default withAuthRedirect(SignupPage, '/', (token) => !!token);