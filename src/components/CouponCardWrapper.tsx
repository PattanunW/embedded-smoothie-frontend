// "use client";

// import React, { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import getCoupons from "@/libs/getCoupons";
// import getMyCoupon from "@/libs/getMyCoupon";
// import CouponCardItem from "./CouponCardItem"; // adjust path
// import { CouponJson } from "interfaces";

// export default function CouponCardWrapper() {
//   const { data: session } = useSession();
//   const [role, setRole] = useState<string>();
//   const [couponList, setCouponList] = useState<CouponJson>();

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!session?.user.token || !session?.user.User_info) return;

//       const userRole = session?.user.User_info.role;
//       const userId = session?.user.User_info._id;
//       setRole(userRole);

//       try {
//         let coupons = [];

//         if (userRole === "admin") {
//           coupons = await getCoupons(session.user.token);
//         } else if (userRole === "user") {
//           const allMyCoupons = await getMyCoupon(session.user.token);
//           // optional: filter coupons that belong to this user if not already done in API
//           coupons = allMyCoupons.filter((c: any) => c.user_info === userId);
//         }

//         setCouponList(coupons);
//         couponList?.data.map((c) => {
//           console.log(c);
//         });

//         console.log(JSON.stringify(couponList));
//       } catch (error) {
//         console.error("Error loading coupons:", error);
//       }
//     };

//     fetchData();
//   }, [session]);

//   return (
//     <div className="flex flex-wrap justify-center">
//       {couponList?.data.map((c, i) => (
//         <CouponCardItem
//           key={c._id}
//           couponName={c.name}
//           percentage={c.percentage}
//           maxDisc={c.maxDisc}
//           minSp={c.minSp}
//           spent={c.spent ?? 0}
//           valid={c.valid}
//         />
//       ))}
//     </div>
//   );
// }
