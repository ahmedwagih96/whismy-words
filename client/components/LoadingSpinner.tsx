import Image from "next/image";
function LoadingSpinner() {
  return (
    <div className="loading__spinner">
      <Image
        src="/spinner.svg"
        alt="loading"
        height={200}
        width={200}
        priority={true}
      />
    </div>
  );
}

export default LoadingSpinner;
