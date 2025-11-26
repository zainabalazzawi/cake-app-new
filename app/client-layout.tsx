"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Header } from "@/components/Header";

const queryClient = new QueryClient();

const ClientLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default ClientLayout;




