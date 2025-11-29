"use client";

import { useFarmData } from "@/libs/useFarmData";

export default function HomePage() {
  const { data, togglePump } = useFarmData();

  return (
    <>
      <nav>
        <div className="logo">
          <img src="/2.jpeg" alt="Aqua Shield Logo" />
        </div>
        <div className="menu-items">
          <a href="#">Home</a>
          <a href="#">Control</a>
          <a href="#">Charts</a>
          <a href="#" style={{ color: "#b30000" }}>Log Out</a>
        </div>
      </nav>

      <div className="main-content">
        <div className="status-container">
          <div className="glass-card">
            <i className="fas fa-tint icon-water"></i>
            <div className="label">ความชื้นอากาศ</div>
            <div className="value">
              {data.hum !== null ? `${data.hum}%` : "--%"}
            </div>
          </div>

          <div className="glass-card">
            <i className="fas fa-thermometer-half icon-temp"></i>
            <div className="label">อุณหภูมิ</div>
            <div className="value">
              {data.temp !== null ? `${data.temp}°C` : "--°C"}
            </div>
          </div>

          <div className="glass-card">
            <i className="fas fa-sun icon-sun"></i>
            <div className="label">ความเข้มแสง</div>
            <div className="value">
              {data.light !== null ? `${data.light} Lux` : "-- Lux"}
            </div>
          </div>

          <div className="glass-card">
            <i className="fas fa-seedling icon-soil"></i>
            <div className="label">ความชื้นในดิน</div>
            <div className="value">{data.soil ?? "--"}</div>
          </div>

          <div className="glass-card">
            <i className="fas fa-cloud-showers-heavy icon-rain"></i>
            <div className="label">เซนเซอร์น้ำฝน</div>
            <div className="value">{data.rain ?? "--"}</div>
          </div>

          <div className="glass-card">
            <i className="fas fa-glasses icon-uv"></i>
            <div className="label">ดัชนี UV</div>
            <div className="value">{data.uv ?? "--"}</div>
          </div>

          <div className="glass-card status-wide">
            <i className="fas fa-exclamation-triangle icon-alert"></i>
            <div className="label">สถานะระบบ</div>
            <div
              className={
                "value " + (data.alertOn ? "status-bad" : "status-good")
              }
            >
              {data.alertOn ? "แจ้งเตือน!" : "ปกติ"}
            </div>
          </div>
        </div>

        <div className="control-zone">
          <button className="ctrl-btn btn-water" onClick={togglePump}>
            <i className="fas fa-tint"></i>
            {data.pumpOn ? "หยุดรดน้ำ" : "สั่งรดน้ำ (Manual)"}
          </button>
        </div>

        <div className="chart-header">สถิติย้อนหลัง (ThingSpeak)</div>

        <div className="chart-container">
          <div className="chart-card">
            <iframe
              src="https://thingspeak.com/channels/3183182/charts/1?bgcolor=%23ffffff&color=%23795548&dynamic=true&results=60&type=line&update=15&title=Soil%20Moisture"
              loading="lazy"
            ></iframe>
          </div>
          <div className="chart-card">
            <iframe
              src="https://thingspeak.com/channels/3183182/charts/4?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15&title=Temperature"
              loading="lazy"
            ></iframe>
          </div>
          <div className="chart-card">
            <iframe
              src="https://thingspeak.com/channels/3183182/charts/6?bgcolor=%23ffffff&color=%233498db&dynamic=true&results=60&type=line&update=15&title=Humidity"
              loading="lazy"
            ></iframe>
          </div>
          <div className="chart-card">
            <iframe
              src="https://thingspeak.com/channels/3183182/charts/2?bgcolor=%23ffffff&color=%239b59b6&dynamic=true&results=60&type=line&update=15&title=Rain%20Sensor"
              loading="lazy"
            ></iframe>
          </div>
          <div className="chart-card">
            <iframe
              src="https://thingspeak.com/channels/3183182/charts/5?bgcolor=%23ffffff&color=%23f39c12&dynamic=true&results=60&type=line&update=15&title=Light%20Intensity"
              loading="lazy"
            ></iframe>
          </div>
          <div className="chart-card">
            <iframe
              src="https://thingspeak.com/channels/3183182/charts/3?bgcolor=%23ffffff&color=%23e67e22&dynamic=true&results=60&type=line&update=15&title=UV%20Index"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}