import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "My App",
  description: "Personal site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header
          logo="/images/logo.png"
          name="Bhujunder Kumar Veeraboina"
          subtitle="Nampally Constituency, Secunderabad Parliament, Hyderabad, Telangana"
          leftImages={[
            "/images/l1.jpg",
            "/images/l2.jpg",
            "/images/l3.jpg",
          ]}
          rightImages={[
            "/images/r1.jpg",
            "/images/r2.jpg",
            "/images/r3.jpg",
          ]}
        />
        {children}
      </body>
    </html>
  );
}
