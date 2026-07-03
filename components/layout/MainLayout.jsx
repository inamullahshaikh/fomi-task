import Navbar from "@/components/layout/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)]">
      <Navbar activeNav="home" />
      <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        {children}
      </main>
    </div>
  );
}
