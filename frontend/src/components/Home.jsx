import Signup from "../pages/Signup";

export default function Home() {
  return (
    <div className="flex bg-slate-300 items-center justify-center gap-12">
      <h1>Payment Gateway</h1>
      <Signup />
    </div>
  );
}
