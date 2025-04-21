import { AuthProvider } from "@/providers/authProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { ProductsProvider } from "@/providers/productsProvider";
import Header from "@/components/main/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <AuthProvider>
          <ProductsProvider>
     <main className=" md:pl-64 ">
            {children}
     </main>

          </ProductsProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
