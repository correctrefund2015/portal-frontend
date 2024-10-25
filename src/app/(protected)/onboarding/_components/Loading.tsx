import LoadingImage from "@/components/shared/LoadingImage";

const Loading = () => {
  return (
    <div className="absolute top-[50%] left-[50%] size-48 -mt-[100px] -mb-[100px] text-white">
      <LoadingImage size={32} />
    </div>
  );
};

export default Loading;
