import { useRouter } from "next/dist/client/router";

const UnorthorizePage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center pt-[24x] space-y-[16px]">
      <h1 className="heading1 text-[#2C5675]">401 Unorthorize</h1>
      <img
        src="/images/kaiya_graphic.svg"
        className=""
        style={{ height: "75vh" }}
        alt=""
      />
      <button
        className="subheading2 bg-[#236EA6] text-white px-[16px] py-[8px] rounded-[4px]"
        onClick={() => {
          router.push("/");
        }}
      >
        back to home
      </button>
    </div>
  );
};

export default UnorthorizePage;
