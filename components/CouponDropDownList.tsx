import dayjs from "dayjs";
import { CouponItem } from "interfaces";
import { set } from "mongoose";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";

export default function CouponDropDownList({
  couponList,
  onSelectCoupon,
}: {
  couponList: CouponItem[];
  onSelectCoupon: (coupon: string) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [selectedCouponName, setSelectedCouponName] = useState<string | null>(
    "Select a coupon"
  );

  return (
    <div className="relative flex flex-col items-center z-10">
      {selectedCouponId ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-3 w-[220px] border border-black text-Black rounded-full py-1.5 px-6 text-sm
                hover:bg-black hover:text-white transition font-robotoMono"
        >
          <div className="flex flex-row items-center justify-between">
            {selectedCouponName}
            <button
              onClick={(e) => {
                setSelectedCouponName("Select a coupon");
                setSelectedCouponId(null);
                onSelectCoupon("");
                e.stopPropagation();
                e.preventDefault();
              }}
              className="flex items-center justify-center w-5 h-5 rounded-full
                        bg-white text-black border border-black border-1
                        hover:scale-105 transition-transform duration-300"
            >
              <FaTimes className="text-[12px]" />
            </button>
          </div>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-3 w-[220px] border border-black text-gray-500 rounded-full py-1.5 px-6 text-sm
                hover:bg-black hover:text-white transition font-robotoMono"
        >
          <div className="flex flex-row items-center justify-between">
            {selectedCouponName}
            {isOpen ? (
              <div className="hover:scale-105 transition-transform duration-300">
                ▲
              </div>
            ) : (
              <div className="hover:scale-105 transition-transform duration-300">
                ▼
              </div>
            )}
          </div>
        </button>
      )}

      {isOpen ? (
        <div className="absolute top-12 z-10 mt-2 w-[230px] bg-white rounded-lg border border-black shadow-lg">
          {couponList.map((item, index) =>
            item.status !== "Available" ? null : (
              <div key={index} className="w-full">
                {item._id === selectedCouponId ? (
                  <div>
                    <button
                      className="p-4 w-full whitespace-pre-wrap flex flex-col items-start text-black transition-transform duration-300"
                      onClick={() => {
                        setSelectedCouponName(item.name);
                        setSelectedCouponId(item._id);
                        onSelectCoupon(item._id);
                        setIsOpen(false);
                      }}
                    >
                      <div className="font-sm font-robotoMono">{item.name}</div>
                      <div className="font-sm font-robotoMono">
                        Discount: {item.percentage}%
                      </div>
                      <div className="font-sm font-robotoMono">
                        Expired:{" "}
                        {dayjs(item.expirationDate)
                          .format("YYYY-MM-DD")
                          .toString()}
                      </div>
                    </button>

                    {index < couponList.length - 1 && (
                      <div className="border-t border-1 border-black mx-4 rounded-full"></div>
                    )}
                  </div>
                ) : (
                  <div>
                    <button
                      className="p-4 w-full whitespace-pre-wrap flex flex-col items-start text-gray-500 hover:text-black transition-transform duration-300"
                      onClick={() => {
                        setSelectedCouponName(item.name);
                        setSelectedCouponId(item._id);
                        onSelectCoupon(item._id);
                        setIsOpen(false);
                      }}
                    >
                      <div className="font-sm font-robotoMono">{item.name}</div>
                      <div className="font-sm font-robotoMono">
                        Discount: {item.percentage}%
                      </div>
                      <div className="font-sm font-robotoMono">
                        Expired:{" "}
                        {dayjs(item.expirationDate)
                          .format("YYYY-MM-DD")
                          .toString()}
                      </div>
                    </button>

                    {index < couponList.length - 1 && (
                      <div className="border-t border-1 border-black mx-4 rounded-full"></div>
                    )}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      ) : null}
    </div>
  );
}
