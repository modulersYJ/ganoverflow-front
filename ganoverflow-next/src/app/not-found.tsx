import { ErrorLottie } from "@/components/ui/Error/ErrorLottie";
import { LoadingLottie } from "@/components/ui/Loading/LoadingLottie";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center align-middle">
      <h1>Not Found</h1>
      <p>Could not find requested resource</p>
      <div className="w-full">
        {/* <ErrorLottie /> */}
        <LoadingLottie />
      </div>
      <Link href="/">Return Home</Link>
    </div>
  );
}
