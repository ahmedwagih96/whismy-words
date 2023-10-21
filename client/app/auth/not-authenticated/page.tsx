import Link from "next/link";

function index() {
  return (
    <main className="error">
      <div className="error__status">401</div>
      <h1 className="error__text">Access Denied</h1>
      <Link href="/" className="error__link">
        Go to homepage
      </Link>
    </main>
  );
}

export default index;
