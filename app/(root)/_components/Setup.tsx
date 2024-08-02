"use client";

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/useStoreModal";

export const Setup = () => {
  const { isOpen, onOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};
