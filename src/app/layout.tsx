import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { ToastProvider } from "../toast-message/toastProvider";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "BigTech - ICO Platform",
  description: "The World's 1st ICO Platform That Offers Rewards",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          async
        /> */}
      </head>
      <body className={inter.className}>
        <div className="min-h-[100vh] bg-dark font-sailor">
          <Navbar />
          <ToastProvider>
            <main className="flex-grow">{children}</main>
          </ToastProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
