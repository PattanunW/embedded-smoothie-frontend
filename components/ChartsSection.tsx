import ChartCard from "./ChartCard";

const charts = [
  "https://thingspeak.com/channels/3183182/charts/1?bgcolor=%23ffffff&color=%23795548&dynamic=true&results=60&type=line&update=15&title=Soil%20Moisture",
  "https://thingspeak.com/channels/3183182/charts/4?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15&title=Temperature",
  "https://thingspeak.com/channels/3183182/charts/6?bgcolor=%23ffffff&color=%233498db&dynamic=true&results=60&type=line&update=15&title=Humidity",
  "https://thingspeak.com/channels/3183182/charts/2?bgcolor=%23ffffff&color=%239b59b6&dynamic=true&results=60&type=line&update=15&title=Rain%20Sensor",
  "https://thingspeak.com/channels/3183182/charts/5?bgcolor=%23ffffff&color=%23f39c12&dynamic=true&results=60&type=line&update=15&title=Light%20Intensity",
  "https://thingspeak.com/channels/3183182/charts/3?bgcolor=%23ffffff&color=%23e67e22&dynamic=true&results=60&type=line&update=15&title=UV%20Index",
];

export default function ChartsSection() {
  return (
    <section className="w-full max-w-5xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-3
                     bg-white/80 rounded-lg px-4 py-2 border-l-4 border-green-500">
        สถิติย้อนหลัง (ThingSpeak)
      </h2>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        {charts.map((src) => (
          <ChartCard key={src} src={src} />
        ))}
      </div>
    </section>
  );
}