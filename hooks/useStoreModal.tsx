import { create } from "zustand";

type StoreModalType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useStoreModal = create<StoreModalType>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
