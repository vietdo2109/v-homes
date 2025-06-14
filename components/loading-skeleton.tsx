import { LoaderIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const LoadingSkeleton = ({ pageTitle }: { pageTitle?: string }) => {
  return (
    <div className="flex justify-center items-center flex-col max-w-screen mb-[40px]">
      {pageTitle && (
        <div className="flex flex-col min-w-[1000px] py-5">
          <h1 className="text-4xl font-bold p-5">{pageTitle}</h1>
        </div>
      )}

      <div className="flex justify-center items-center h-[600px]">
        {" "}
        <Skeleton className="fix top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full bg-sky-950 text-white flex justify-center items-center">
          <LoaderIcon />
        </Skeleton>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
