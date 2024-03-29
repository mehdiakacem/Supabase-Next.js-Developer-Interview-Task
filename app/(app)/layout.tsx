import { env } from "@/lib/env.server";
import Script from "next/script";
import React from "react";
import { Toaster } from "react-hot-toast";



export default async function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        {children}
		<Toaster position="top-right" />
      </body>
    </html>
  );
}
