import { toast } from "sonner";
import { CopyIcon, Server } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  title: string;
  description: string;
  variant: "public" | "admin";
};

const textMap: Record<Props["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<Props["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert = ({ title, variant, description }: Props) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API Route copied to the clipboard.");
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title} <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between mt-4">
        <code className="relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon">
          <CopyIcon className="h-4 w-4" onClick={onCopy} />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
