import StatusCard from "./StatusCard";
import type { FarmData } from "@/libs/useFarmData";
import {
  FaWind,
  FaThermometerHalf,
  FaSun,
  FaSeedling,
  FaCloudShowersHeavy,
  FaGlasses,
  FaServer,
} from "react-icons/fa";

type Props = {
  data: FarmData;
};

export default function StatusGrid({ data }: Props) {
  return (
    <section className="w-full max-w-5xl mb-6 grid gap-5
                        grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <StatusCard
        icon={<FaWind className="text-sky-500" />}
        label="ความชื้นอากาศ"
        value={data.hum !== null ? `${data.hum}%` : "--%"}
      />
      <StatusCard
        icon={<FaThermometerHalf className="text-red-500" />}
        label="อุณหภูมิ"
        value={data.temp !== null ? `${data.temp}°C` : "--°C"}
      />
      <StatusCard
        icon={<FaSun className="text-yellow-400" />}
        label="ความเข้มแสง"
        value={data.light !== null ? `${data.light} Lux` : "-- Lux"}
      />
      <StatusCard
        icon={<FaSeedling className="text-amber-900" />}
        label="ความชื้นในดิน"
        value={data.soil ?? "--"}
      />
      <StatusCard
        icon={<FaCloudShowersHeavy className="text-indigo-500" />}
        label="เซนเซอร์น้ำฝน"
        value={data.rain ?? "--"}
      />
      <StatusCard
        icon={<FaGlasses className="text-orange-500" />}
        label="ดัชนี UV"
        value={data.uv ?? "--"}
      />
      <StatusCard
        icon={<FaServer className="text-orange-600" />}
        label="สถานะระบบ"
        value={data.alertOn ? "แจ้งเตือน!" : "ปกติ"}
        highlight={data.alertOn ? "bad" : "good"}
        className="sm:col-span-2 lg:col-span-2"
      />
    </section>
  );
}