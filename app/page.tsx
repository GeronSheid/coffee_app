import { Container } from "@/components/index";
import { SignInForm } from "@/components/shared/AuthForm";
import { LoginForm } from "@/components/shared/LoginForm";


export default function Home() {
  return (
    <>
      <Container>
        <h1>Страница</h1>
        <SignInForm/>
        <LoginForm/>
      </Container>
    </>
  );
}
