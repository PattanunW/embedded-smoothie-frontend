'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProviderItem } from "interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import getProvider from "@/libs/getProvider";
import updateProvider from "@/libs/updateProvider";

export default function ProviderPidUpdatePage({
  params,
}: {
  params: { pid: string };
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [providerItem, setProviderItem] = useState<ProviderItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  if(!session||session.user.User_info.role!=='admin'){
    return (
        <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto font-robotoMono">
          You are not an administrator. Access denied.
        </div>
    )
}
    const [formData, setFormData] = useState({
      name:"",
      address:"",
      tel:"",
      email:"",
      picture:"",
      openTime:"",
      closeTime:""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]:
            name === "capacity" || name === "pricePerDay" ? Number(value) : value,
        }));
      };
    
  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const providerDetail = await getProvider(params.pid);
        setProviderItem(providerDetail.data);
        setFormData(providerDetail.data);
      } catch (err) {
        setError("Failed to fetch provider details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProviderDetails();
  }, [params.pid]);


  const handleUpdateProvider = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        if (!session?.user.token) {
            return;
        }
    const res =  await updateProvider(session.user.token,
        params.pid,
        formData.name,
        formData.address,
        formData.tel,
        formData.email,
        formData.picture,
        formData.openTime,
        formData.closeTime);
      if(res.success){
          alert("Updated provider successfully")
          router.push(`/provider/${params.pid}`);
      }
      else{
        setUpdateError(res.message);
      }
    } catch (err) {
      setUpdateError("Failed to update the provider. Check if the provider's email must be unique");
    }
  };

  if (loading) {
    return <div className="text-center text-xl text-black p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto font-robotoMono">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto font-robotoMono">{error}</div>;
  }

  if (!providerItem) {
    return <div>No provider details found.</div>;
  }

  return (
    <main className="text-center p-8 min-h-screen flex flex-col items-center mt-10">
      <div className="flex flex-col md:flex-row p-6 w-full max-w-3xl border border-black pl-[100px]">
        <Image
          src={providerItem.picture}
          alt="Provider Image"
          width={500}
          height={300}
          className="w-full md:w-1/2 object-cover"
        />
        <div className="mt-4 md:mt-0 flex flex-col items-start w-full p-2 justify-center ml-[100px] border-l border-black pl-[70px] font-robotoMono">
            <div className="text-lg text-black font-robotoMono">Address : {providerItem.address}</div>
            <div className="text-lg text-black font-robotoMono">Tel. : {providerItem.tel}</div>
            <div className="text-lg text-black font-robotoMono">Email : {providerItem.email}</div>
            <div className="text-lg text-black font-robotoMono">Open Time : {providerItem.openTime}</div>
            <div className="text-lg text-black font-robotoMono">Close Time : {providerItem.closeTime}</div>
        </div>
      </div>

      <div className="m-4 text-2xl font-bold text-black">Update Data</div>

      <form onSubmit={handleUpdateProvider} className="space-y-4">
        <div className="bg-white rounded-lg p-3 flex flex-row">
          <div className="flex flex-col m-5">
            <div className="flex flex-col items-start">
              <label
                className="block text-md font-bold text-gray-700 mb-1 font-robotoMono"
                htmlFor="name"
              >
                Provider Name
              </label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter provider name"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200 border border-gray-300 border-2 bg-white font-robotoMono text-gray-700"
              />
            </div>
            <div className="flex flex-col items-start">
              <label
                className="block text-md font-bold text-gray-700 mb-1 font-robotoMono"
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="text"
                required
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Address"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200 border border-gray-300 border-2 bg-white font-robotoMono text-gray-700"
              />
            </div>
            <div className="flex flex-col items-start">
              <label
                className="block text-md font-bold text-gray-700 mb-1 font-robotoMono"
                htmlFor="tel"
              >
                Tel.
              </label>
              <input
                type="text"
                required
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                placeholder="Enter provider's Telephone Number"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200 border border-gray-300 border-2 bg-white font-robotoMono text-gray-700"
              />
            </div>
            <div className="flex flex-col items-start">
              <label
                className="block text-md font-bold text-gray-700 mb-1 font-robotoMono"
                htmlFor="email"
              >
                Provider Email
              </label>
              <input
                type="text"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Provider Email"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200 border border-gray-300 border-2 bg-white font-robotoMono text-gray-700"
              />
            </div>
          </div>

          <div className="flex flex-col m-5">
            <div className="flex flex-col items-start">
              <label
                className="block text-md font-bold text-gray-700 mb-1 font-robotoMono"
                htmlFor="picture"
              >
                Provider Picture
              </label>
              <input
                type="text"
                required
                name="picture"
                value={formData.picture}
                onChange={handleChange}
                placeholder="Enter picture URL"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200 border border-gray-300 border-2 bg-white font-robotoMono text-gray-700"
              />
            </div>
            <div className="flex flex-col items-start">
              <label
                className="block text-md font-bold text-gray-700 mb-1 font-robotoMono"
                htmlFor="openTime"
              >
                Provider Open Time
              </label>
              <input
                type="text"
                required
                name="openTime"
                value={formData.openTime}
                onChange={handleChange}
                placeholder="Enter Provider Open Time (must be in HH:MM:SS format)"
                min={1}
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200 border border-gray-300 border-2 bg-white font-robotoMono text-gray-700"
              />
            </div>
            <div className="flex flex-col items-start">
              <label
                className="block text-md font-bold text-gray-700 mb-1 font-robotoMono"
                htmlFor="closeTime"
              >
                Provider Close Time
              </label>
              <input
                type="text"
                required
                name="closeTime"
                value={formData.closeTime}
                onChange={handleChange}
                placeholder="Enter Provider Close Time (must be in HH:MM:SS format)"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200 border border-gray-300 border-2 bg-white font-robotoMono text-gray-700"
              />
            </div>
          </div>
        </div>
            <button
              type="submit"
              className="text-blue-600 border border-blue-600 px-5 py-2 rounded-full text-sm hover:bg-blue-600 hover:text-white transition text-center font-robotoMono"
            >
              Update Provider
            </button>
            {updateError && (
              <p className="text-red-500 mt-2 text-center">{updateError}</p>
            )}
          </form>
    </main>
  );
}
