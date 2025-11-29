type Props = {
  src: string;
};

export default function ChartCard({ src }: Props) {
  return (
    <div className="bg-white/90 rounded-2xl p-2 shadow-md h-72 overflow-hidden">
      <iframe
        src={src}
        className="w-full h-full border-0"
        loading="lazy"
      ></iframe>
    </div>
  );
}