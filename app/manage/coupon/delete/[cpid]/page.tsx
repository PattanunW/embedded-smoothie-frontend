// app/coupon/delete/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getCoupons from "@/libs/getCoupons";
import ClientDeleteCouponPage from "@/components/ClientDeleteCouponPage";

export default async function DeleteCouponPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.User_info.role !== "admin") {
    return (
      <main className="text-center p-5">
        <div className="text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto font-robotoMono">
          You are not an administrator. Access denied.
        </div>
      </main>
    );
  }

  const coupons = await getCoupons(session.user.token);

  return (
    <ClientDeleteCouponPage coupons={coupons} token={session.user.token} />
  );
}
