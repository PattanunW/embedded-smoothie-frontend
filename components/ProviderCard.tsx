import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import { FaStar } from "react-icons/fa";
import { CarItem, CarJson } from "interfaces";
import Link from "next/link";

export default function ProviderCard(
  {
  providerName,
  imgSrc,
  onCompare,
  email,
  phoneNum
}: {
  providerName: string;
  imgSrc?: string;
  price?: string | number | null;
  onCompare?: Function;
  email: string;
  phoneNum: string;
}
) {
  return (
    <InteractiveCard contentName={providerName}>
      <div className="w-full h-[230px] relative bg-gray-200 boarder-2border border-gray-300 rounded-lg">
        {imgSrc && (
          <Image
            src={imgSrc}
            alt="Product Picture"
            fill
            className="object-cover"
          />
        )}
      </div>
      <span className="font-robotoMono tracking-wide w-[300px] h-[142px] flex flex-col gap-1 items-start justify-start px-4 py-3 font-sans text-black">
        <div className="font-robotoMono font-extrabold tracking-wide text-lg">{providerName}</div>
        <div className="font-robotoMono text-[12px] font-medium text-black">{email}</div>{" "}
        {email === null && <div className="text-xl font-medium mt-2"></div>}
        <div className="font-robotoMono text-[12px] font-medium text-black">{phoneNum}</div>{" "}
        <span className="flex absolute bottom-0 font-robotoMono items-center text-sm mb-2">
          <FaStar className="font-robotoMono mr-1 text-black" />4.9
        </span>
      </span>
    </InteractiveCard>
  );
}
