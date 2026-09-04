import Image from "next/image";
import PollApp from "@/components/PollApp";
import logo from "../../public/logo.png";

// The poll only makes sense rendered live against Supabase — never
// pre-rendered at build time, when env vars may not even be set yet.
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="page">
      <div className="card">
        <Image
          src={logo}
          alt="Alsama"
          className="logo"
          priority
        />
        <PollApp />
      </div>
    </main>
  );
}
