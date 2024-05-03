import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ultimate Tic Tac Toe",
  description: "cooler tic tac toe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-green-100">{children}</body>
    </html>
  );
}
