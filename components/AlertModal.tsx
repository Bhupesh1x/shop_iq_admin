import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const AlertModal = ({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      title="Are you sure?"
      description="This action cannot be undone."
      onClose={onClose}
    >
      <div className="flex items-center justify-end mt-6 gap-3 w-full">
        <Button disabled={isLoading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
