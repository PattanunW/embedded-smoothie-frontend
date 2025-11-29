import "./globals.css";

export const metadata = {
  title: "Smart Farm Dashboard",
  description: "Automated Irrigation & Sun Control",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        {/* ฟอนต์ Prompt */}
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;600&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome 6.4.0 */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}