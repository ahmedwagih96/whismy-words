"use client";
import Link from "next/link";

function error({ error }: { error: Error }) {
  const [status, message] = error.message.split("-");
  return (
    <main className="error">
      <div className="error__status">{status}</div>
      <h1 className="error__text">{message}</h1>
      <Link href="/" className="error__link">
        Go to homepage
      </Link>
    </main>
  );
}

export default error;
