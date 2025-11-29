import { FaPowerOff, FaShower } from "react-icons/fa";

type Props = {
  pumpOn: boolean;
  onTogglePump: () => void;
};

export default function ControlZone({ pumpOn, onTogglePump }: Props) {
  return (
    <section className="w-full flex justify-center mb-10">
      <button
        onClick={onTogglePump}
        className="flex items-center gap-3 px-16 py-4 rounded-full text-white font-semibold text-xl shadow-lg transition-transform hover:scale-105"
        style={{
          background: pumpOn
            ? "#e74c3c"
            : "linear-gradient(135deg, #2980b9, #6dd5fa)",
        }}
      >
        {pumpOn ? <FaPowerOff /> : <FaShower />}
        {pumpOn ? "หยุดรดน้ำ" : "สั่งรดน้ำ (Manual)"}
      </button>
    </section>
  );
}