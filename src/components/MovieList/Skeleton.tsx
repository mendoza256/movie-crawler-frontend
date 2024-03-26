import { Skeleton } from "../ui/skeleton";

const Skeletons = () => {
  const numberOfSkeletons = 10;
  return (
    <>
      {Array.from({ length: numberOfSkeletons }).map((_, i) => (
        <div key={i} className="mb-4 flex items-center">
          <Skeleton className="w-[50px] h-[50px] rounded-full" />
          <div className="ml-4">
            <Skeleton className="w-[300px] h-[20px] mb-3 rounded-full" />
            <Skeleton className="w-[150px] h-[20px] rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
};

export default Skeletons;
