import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function ManageChoice() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session?.user.User_info.role === "admin" ? (
        <main className="flex flex-col items-center justify-center min-h-screen font-robotoMono px-4">
          <h1 className="text-4xl font-bold text-black mb-8 text-center tracking-wide">
            Welcome, Admin
          </h1>

          <div className="bg-white p-10 w-full max-w-md">
            <div className="space-y-4">
              <Link href="/manage/provider" className="block w-full">
                <span className="block hover:bg-indigo-200 transition-all duration-300 border border-black px-6 py-4 text-xl text-black text-center font-medium tracking-wide">
                  Manage Providers
                </span>
              </Link>

              <Link href="/manage/car" className="block w-full">
                <span className="block hover:bg-indigo-200 transition-all duration-300 border border-black px-6 py-4 text-xl text-black text-center font-medium tracking-wide">
                  Manage Cars
                </span>
              </Link>

              <Link href="/booking" className="block w-full">
                <span className="block hover:bg-indigo-200 transition-all duration-300 border border-black px-6 py-4 text-xl text-black text-center font-medium tracking-wide">
                  Manage Bookings
                </span>
              </Link>

              <Link href="/manage/review" className="block w-full">
                <span className="block hover:bg-indigo-200 transition-all duration-300 border border-black px-6 py-4 text-xl text-black text-center font-medium tracking-wide">
                  Manage Reviews
                </span>
              </Link>
            </div>
          </div>
        </main>
      ) : (
        <div className="text-center text-xl text-red-600 p-4 bg-slate-100 shadow-md max-w-md mx-auto mt-20 font-robotoMono">
          You are not an administrator. Access denied.
        </div>
      )}
    </>
  );
}
