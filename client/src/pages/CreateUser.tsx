import Page from "../ui/page/Page"
import SignupForm from "../ui/SignupForm";

export default function CreateUser() {

  return (
    <>
      <Page content={<SignupForm/>}/>
    </>
  )
}