import { ThemeSwitch } from "@/components/theme-switch";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-full">
      <ThemeSwitch />
      <main className="container mx-auto h-full max-w-xl">{children}</main>
    </div>
  );
}
