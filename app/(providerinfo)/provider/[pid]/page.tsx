import Image from "next/image";
import { redirect } from "next/navigation";
import { CarItem, CarJson, ProviderItem } from "interfaces";
import getProvider from "@/libs/getProvider";
import Link from "next/link";
export default async function ProviderDetailPage({
  params,
}: {
  params: { pid: string };
}) {
  const providerDetail = await getProvider(params.pid);
  const providerItem: ProviderItem = providerDetail.data;
  return (
    <main className="text-left p-5 items-center justify-center mt-[20px]">
      <div className="flex flex-row my-5 bg-white rounded-xl w-[60%] mx-auto text-gray-800 space-x-[100px] font-robotoMono">
        <Image
          src={providerItem.picture}
          alt="Provider Image"
          width={0}
          height={0}
          sizes="100vw"
          className="object-cover w-[45%]"
        />
        <div className="flex flex-col w-[55%] border-l border-black justify-center pl-[50px]">
          <h1 className="text-xl font-semibold   text-black mb-5 text-center font-robotoMono">
            Provider {providerItem.name}'s Info
          </h1>
          <div className="grid grid-cols-2 gap-3 mx-5 w-auto">
            <div className="text-md font-semibold font-robotoMono">
              Address:
            </div>
            <div className="font-robotoMono">{providerItem.address}</div>
            <div className="text-md font-semibold font-robotoMono">Tel:</div>
            <div className="font-robotoMono">{providerItem.tel}</div>
            <div className="text-md font-semibold font-robotoMono">Email:</div>
            <div className="font-robotoMono">{providerItem.email}</div>
            <div className="text-md font-semibold font-robotoMono">
              Open Time:
            </div>
            <div className="font-robotoMono">{providerItem.openTime}</div>
            <div className="text-md font-semibold font-robotoMono">
              Close Time:
            </div>
            <div className="font-robotoMono">{providerItem.closeTime}</div>
            <div className="text-md font-semibold font-robotoMono">
              Provider ID:
            </div>

            <div className="font-robotoMono">{providerItem._id}</div>
          </div>

          {/* ปุ่มอยู่ตรงกลาง */}
          <div className="flex justify-center mt-8">
            <Link
              href={`/provider/${params.pid}/car`}
              className="text-black border border-black px-5 py-2 rounded-full text-sm hover:bg-black hover:text-white transition font-robotoMono"
            >
              View Their Cars
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
