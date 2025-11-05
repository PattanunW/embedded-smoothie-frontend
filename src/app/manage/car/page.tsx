import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
export default async function manageCarsPage() {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session?.user.User_info.role === "admin" ? (
        <div className="mb-[100px] bg-slate-100 p-6 rounded-lg shadow-md max-w-md mx-auto mt-[100px]">
          <h2 className="text-2xl font-medium mb-6 text-black text-center font-robotoMono">
            Manage Cars
          </h2>
          <div className="space-y-4">
            <Link href="/manage/car/add" className="block">
              <div className="text-green-600 border border-green-600 px-5 py-2 rounded-full text-sm hover:bg-green-600 hover:text-white transition text-center font-robotoMono">
                Add a Car
              </div>
            </Link>
            <Link href="/manage/car/update" className="block">
              <div className="text-blue-600 border border-blue-600 px-5 py-2 rounded-full text-sm hover:bg-blue-600 hover:text-white transition text-center font-robotoMono">
                Update a Car
              </div>
            </Link>
            <Link href="/manage/car/delete" className="block">
              <div className="text-red-600 border border-red-600 px-5 py-2 rounded-full text-sm hover:bg-red-600 hover:text-white transition text-center font-robotoMono">
                Delete a Car
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
          You are not an administrator. Access denied.
        </div>
      )}
    </>
  );
}
