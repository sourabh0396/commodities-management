import Image from "next/image";
import SloozeLogoImage from "../../public/FFFFFF-1.png";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-2xl rounded-xl bg-white p-10 shadow-sm dark:bg-zinc-900">
        <div className="flex flex-col gap-6">
          <header className="flex items-center gap-3">
            <Image
              src={SloozeLogoImage}
              alt="Slooze logo"
              width={70}
              height={50}
              priority
            />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">
              Slooze Management
            </h1>
          </header>
          <div className="mt-4 flex gap-3">
            <a
              href="/login"
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200"
            >
              Log In
            </a>

            <a
              href="/products"
              className="rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Browse Products
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
