import Navbar from "@/components/layout/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <Navbar />
      <main className="mx-auto w-full max-w-[1600px] px-4 pb-8 pt-2 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
