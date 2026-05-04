import "./globals.css";

export const metadata = {
  title: "C-LINE TV",
  description: "Photo & Video Based Learning Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
