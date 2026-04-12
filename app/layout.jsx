import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
// import { viVN } from "@clerk/localizations";
// localization={viVN}

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    title: "CellGenS. - Shop smarter",
    description: "CellGenS. - Shop smarter",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider >
        <html lang="en">
            <body className={`${outfit.className} antialiased`} suppressHydrationWarning>
                <StoreProvider>
                    <Toaster />
                    {children}
                </StoreProvider>
            </body>
        </html>
        </ClerkProvider>
    );
}
