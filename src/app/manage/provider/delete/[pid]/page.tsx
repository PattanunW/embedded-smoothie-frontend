'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import deleteProvider from "@/libs/deleteProvider";
import Link from "next/link";
import { ProviderItem } from "interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { revalidateTag } from "next/cache";
import getProvider from "@/libs/getProvider";

export default function ProviderPidDeletePage({
  params,
}: {
  params: { pid: string };
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [providerItem, setProviderItem] = useState<ProviderItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null); // Error state for deletion
  if(!session||session.user.User_info.role!=='admin'){
    return (
        <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
          You are not an administrator. Access denied.
        </div>
    )
  }
  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const providerDetail = await getProvider(params.pid);
        setProviderItem(providerDetail.data);
      } catch (err) {
        setError("Failed to fetch provider details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProviderDetails();
  }, [params.pid]);

  const handleDeleteProvider = async () => {
    try {
        if (!session?.user.token) {
            return;
        }
      await deleteProvider(session.user.token,params.pid);
      alert("Deleted provider successfully")
      router.push("/provider");
    } catch (err) {
      setDeleteError("Failed to delete the provider.");
    }
  };

  if (loading) {
    return <div className="text-center text-xl text-black p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">{error}</div>;
  }

  if (!providerItem) {
    return <div>No provider details found.</div>;
  }
  return (
      <main className="text-left p-8 min-h-screen flex flex-col items-center mt-10">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
          <Image
            src={providerItem.picture}
            alt="Car Image"
            width={500}
            height={300}
            className="w-full md:w-1/2 object-cover"
          />
          <div className="p-6 flex flex-col justify-between w-full">
            <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 font-robotoMono">{providerItem.name}</h1>
            <div className="text-lg text-gray-600 font-robotoMono">Address : {providerItem.address}</div>
            <div className="text-lg text-gray-600 font-robotoMono">Tel. : {providerItem.tel}</div>
            <div className="text-lg text-gray-600 font-robotoMono">Email : {providerItem.email}</div>
            <div className="text-lg text-gray-600 font-robotoMono">Open Time : {providerItem.openTime}</div>
            <div className="text-lg text-gray-600 font-robotoMono">Close Time : {providerItem.closeTime}</div>
            </div>
            {deleteError && (
              <div className="mt-4 text-md text-red-600 bg-red-100 p-2 rounded">
                {deleteError}
              </div>
            )}
            <button
              onClick={handleDeleteProvider}
              className="text-red-600 border border-red-600 px-5 py-2 rounded-full text-sm hover:bg-red-600 hover:text-white transition text-center font-robotoMono"
            >
              Delete Provider
            </button>
          </div>
        </div>
      </main>
    );
}
