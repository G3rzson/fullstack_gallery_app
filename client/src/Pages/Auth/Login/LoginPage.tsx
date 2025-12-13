import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-3xl">Bejelentkezés</h1>
      <LoginForm />
    </div>
  );
}
