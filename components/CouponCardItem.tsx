// "use client";
// import createCoupon from "@/libs/createCoupon";
// import { getSession } from "next-auth/react";
// import React from "react";

// const redeemCoupon = async (
//   couponName: string,
//   percentage: number,
//   maxDisc: number,
//   minSp: number,
//   valid: number,
//   redeemed: boolean
// ) => {
//   const session = await getSession();
//   if (!session?.user.token) {
//     alert("You must be logged in to redeem a coupon.");
//     return;
//   }
//   const token = session.user.token;
//   const response = await createCoupon(
//     token,
//     couponName,
//     percentage,
//     maxDisc,
//     minSp,
//     new Date(Date.now() + valid * 24 * 60 * 60 * 1000)
//   );
//   redeemed = true;
//   console.log(response);
//   alert("Coupon redeemed successfully!");
// };

// export default function CouponCard({
//   couponName,
//   percentage,
//   maxDisc,
//   minSp,
//   spent,
//   valid,
//   redeemed,
// }: {
//   couponName: string;
//   percentage: number;
//   maxDisc: number;
//   minSp: number;
//   spent: number;
//   valid: number;
//   redeemed: boolean;
// }) {
//   return (
//     <div>
//       {redeemed ? (
//         <div
//           className="w-[230px] h-[333px] rounded-[24px] bg-gray-400 text-white overflow-hidden shadow-lg
//         relative m-10"
//         >
//           {/* ครึ่งวงกลมด้านบน */}
//           <div className="w-full h-[125px] relative rounded-b-full flex items-center justify-center">
//             <span className="text-white text-[96px] leading-none mt-4 font-rockwellCondensed">
//               {percentage}%
//             </span>
//           </div>

//           {/* รอยบากด้านข้าง */}
//           <div className="relative w-full flex items-center justify-between px-4 my-4">
//             <div className="absolute left-[-10px] h-6 w-6 bg-white rounded-full"></div>
//             <div
//               className="border-t-[3px] border-white border-dashed w-full"
//               style={{
//                 borderTopStyle: "dashed",
//                 borderTopWidth: "3px",
//                 borderTopColor: "#fff",
//                 borderTop: "3px dashed #fff",
//               }}
//             ></div>
//             <div className="absolute right-[-10px] h-6 w-6 bg-white rounded-full"></div>
//           </div>

//           {/* เนื้อหาคูปอง */}
//           <div className="px-6 mt-3 pb-2 text-[11px] space-y-3 text-white text-left leading-[12px]">
//             <div className="text-[18px] font-bold tracking-wide text-center font-rockwellCondensed">
//               {couponName}
//             </div>

//             <p>
//               Maximum Discount:{" "}
//               <span className="font-bold text-[15px] font-rockwellCondensed">
//                 ${maxDisc}
//               </span>
//             </p>
//             <p>
//               Min. spend:{" "}
//               <span className="font-bold text-[15px] font-rockwellCondensed">
//                 ${minSp}
//               </span>
//             </p>
//             <p>
//               Spent:{" "}
//               <span className="font-bold text-[15px] font-rockwellCondensed">
//                 ${spent}
//               </span>
//             </p>
//             <p>
//               Valid:{" "}
//               <span className="font-bold text-[15px] font-rockwellCondensed">
//                 {valid > 1 ? valid + " days" : valid + " day"}
//               </span>
//             </p>
//             <div className="text-center">
//               <button
//                 className="px-4 py-2 mt-1 bg-white text-gray-400 rounded shadow font-semibold"
//                 disabled
//               >
//                 REDEEM
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div
//           className="w-[230px] h-[333px] rounded-[24px] bg-black text-white overflow-hidden shadow-lg
//         relative m-10 hover:scale-105 transition-transform duration-300"
//         >
//           {/* ครึ่งวงกลมด้านบน */}
//           <div className="w-full h-[125px] relative rounded-b-full flex items-center justify-center">
//             <span className="text-white text-[96px] leading-none mt-4 font-rockwellCondensed">
//               {percentage}%
//             </span>
//           </div>

//           {/* รอยบากด้านข้าง */}
//           <div className="relative w-full flex items-center justify-between px-4 my-4">
//             <div className="absolute left-[-10px] h-6 w-6 bg-white rounded-full"></div>
//             <div
//               className="border-t-[3px] border-white border-dashed w-full"
//               style={{
//                 borderTopStyle: "dashed",
//                 borderTopWidth: "3px",
//                 borderTopColor: "#fff",
//                 borderTop: "3px dashed #fff",
//               }}
//             ></div>
//             <div className="absolute right-[-10px] h-6 w-6 bg-white rounded-full"></div>
//           </div>

//           {/* เนื้อหาคูปอง */}
//           <div className="px-6 mt-3 pb-2 text-[11px] space-y-3 text-white text-left leading-[12px]">
//             <div className="text-[18px] font-bold tracking-wide text-center font-rockwellCondensed">
//               {couponName}
//             </div>

//             <p>
//               Maximum Discount:{" "}
//               <span className="font-bold text-[15px] font-rockwellCondensed">
//                 ${maxDisc}
//               </span>
//             </p>
//             <p>
//               Min. spend:{" "}
//               <span className="font-bold text-[15px] font-rockwellCondensed">
//                 ${minSp}
//               </span>
//             </p>
//             <p>
//               Spent:{" "}
//               <span className="font-bold text-[15px] font-rockwellCondensed">
//                 ${spent}
//               </span>
//             </p>
//             <p>
//               Valid:{" "}
//               <span className="font-bold text-[15px] font-rockwellCondensed">
//                 {valid > 1 ? valid + " days" : valid + " day"}
//               </span>
//             </p>

//             <div className="text-center">
//               <button
//                 className="px-4 py-2 mt-1 bg-white text-black rounded shadow font-semibold
//               hover:scale-105 transition-transform duration-300"
//                 onClick={() => {
//                   redeemCoupon(
//                     couponName,
//                     percentage,
//                     maxDisc,
//                     minSp,
//                     valid,
//                     redeemed
//                   );
//                 }}
//               >
//                 REDEEM
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
