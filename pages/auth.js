import AuthForm from "../components/auth/auth-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function AuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.replace("/");
    return;
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return <AuthForm />;
}

export default AuthPage;
