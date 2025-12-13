import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-3xl">Regisztráció</h1>
      <RegisterForm />
    </div>
  );
}
