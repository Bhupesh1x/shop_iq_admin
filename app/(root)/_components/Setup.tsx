"use client";

import { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";

import { useStoreModal } from "@/hooks/useStoreModal";

export const Setup = () => {
  const { isOpen, onOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  
  return (
    <>
      <h1 className="text-red-500">Hello World</h1>
      <UserButton afterSignOutUrl="/" />
    </>
  );
};
