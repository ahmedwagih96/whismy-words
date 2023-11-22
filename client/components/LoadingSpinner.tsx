import Image from "next/image";
function LoadingSpinner() {
  return (
    <main>
      <Image
        src="/spinner.svg"
        alt="loading"
        height={200}
        width={200}
        className="loading__spinner"
      />
    </main>
  );
}

export default LoadingSpinner;
