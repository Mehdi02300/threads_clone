import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Threads",
  description: "Partagez des Threads",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-threads-gray">
        {children}
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
