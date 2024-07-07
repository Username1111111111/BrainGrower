import Page from "../ui/page/Page"
import SignupForm from "../ui/SignupForm";

export default function CreateUser() {

  const content = <SignupForm/>;

  return (
    <>
      <Page content={content}/>
    </>
  )
}