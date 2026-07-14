"use client";
import Image from "next/image";

export function OrderItemCard({ item }) {
  // تنظيف اسم اللون من أي مسافات أو \t تابة جاية من الداتابيز
  const cleanColor = item?.color?.trim();

  return (
    <div className=" p-4 bg-white border border-slate-100 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
      <h4 className="font-semibold text-slate-800 text-sm md:text-base truncate mb-3 text-center md:text-left">
        {item?.productName}
      </h4>

      <div className="flex  items-center justify-center gap-4 ">
        {/* 1️⃣ سيكشن الصورة */}
        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
          <Image
            width={100}
            height={100}
            src={item?.image}
            alt={item?.productName || "Product Image"}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* 2️⃣ سيكشن التفاصيل والبيانات */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* الـ Badges الصغيرة للمقاس واللون */}
          <div className="flex  flex-wrap gap-4 mt-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
              Size:{" "}
              <span className="font-bold ml-1 text-slate-800">
                {item?.size}
              </span>
            </span>
          </div>
          <div className="flex  flex-wrap gap-4 mt-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
              Color:{" "}
              <span className="font-bold ml-1 text-slate-800">
                {item?.color}
              </span>
            </span>
          </div>

          {/* سيكشن الكمية */}
          <p className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
            Qty:{" "}
            <span className="font-bold ml-1 text-slate-800">
              {item?.quantity}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
