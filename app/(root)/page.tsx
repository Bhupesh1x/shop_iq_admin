import { UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main>
      <h1 className="text-red-500">Hello World</h1>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
