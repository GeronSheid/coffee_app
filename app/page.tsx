import { Container } from "@/components/index";
import { SignInForm } from "@/components/shared/AuthForm";


export default function Home() {
  return (
    <>
      <Container>
        <h1>Страница</h1>
        <SignInForm/>
      </Container>
    </>
  );
}
