import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Top navigation for the login link */}
      <nav className="flex items-center justify-between p-6 bg-white">
        <Image
          src="/logoZ.png"
          width={150}
          height={150}
          alt="IBFAN Logo"
        />
        <Link
          href="/login"
            className="flex items-center gap-2 rounded-lg bg-blue-300 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-300"
        >
          Log in
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="flex grow flex-col items-center justify-center gap-4 p-6 md:flex-row md:p-12">
        {/* Text Content & Call to Action */}
        <div className="flex max-w-lg flex-col items-start justify-center gap-6">
          <h1 className={`${lusitana.className} text-4xl font-bold tracking-tight text-gray-900 md:text-5xl`}>
            Help Uphold the Code.
          </h1>
          <p className="text-lg leading-7 text-gray-600">
            IBFAN monitors the marketing of breast-milk substitutes. Your reports help us hold corporations accountable and protect infant health worldwide.
          </p>
          {/* --- THIS LINK HAS BEEN UPDATED --- */}
          <Link
            href="/questionnaire"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
          >
            <span>Report a Violation</span> <ArrowRightIcon className="w-5" />
          </Link>
        </div>

        {/* Image Content */}
      
      </section>
    </main>
  );
}