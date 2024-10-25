import { Button } from "@/components/ui/button";
import Image from "next/image";

const StartScreen = ({ dispatch }: { dispatch?: any }) => {
  return (
    <div className="mt-16 flex flex-col items-center mx-auto px-4 md:px-0 w-[320px] md:w-[700px] text-center text-white">
      <h1 className="text-3xl md:text-4xl font-semibold mb-5">
        Welcome
        <Image
          src="/images/hello.png"
          height={32}
          width={32}
          alt="Hello"
          className="inline-block ml-2"
        />
      </h1>
      <h4 className="text-lg md:text-xl font-semibold mb-2">
        Let us help you find the right service
      </h4>
      <p className="mb-16">
        Answer a few questions so we can tailor our services to your specific
        needs. This will only take a couple of minutes!
      </p>
      <Button
        className="btn-onboarding"
        onClick={() =>
          dispatch({
            type: "start",
          })
        }
      >
        Let&apos;s start
      </Button>
    </div>
  );
};

export default StartScreen;
