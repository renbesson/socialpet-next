"use client";

import AppSideBar from "./components/AppSideBar";
import "./globals.css";
import { AuthProvider, useAuth } from "./utils/authProvider";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body data-theme="light">
        <AuthProvider>
          <AppSideBar>{children}</AppSideBar>
        </AuthProvider>
      </body>
    </html>
  );
}
