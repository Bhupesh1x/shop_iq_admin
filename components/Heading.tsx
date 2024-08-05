type Props = {
  title: string;
  description: string;
};

export const Heading = ({ title, description }: Props) => {
  return (
    <div>
      <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
