import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

type Props = {
  title: string;
  isOpen: boolean;
  description: string;
  onClose: () => void;
  children?: React.ReactNode;
};

export const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  description,
}: Props) => {
  const onChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
