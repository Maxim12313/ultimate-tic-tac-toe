import "../globals.css";

export const metadata = {
  title: "Ultimate Tic Tac Toe",
  description: "cooler tic tac toe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50">{children}</body>
    </html>
  );
}
