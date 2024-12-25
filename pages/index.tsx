// Add imports here...

import Link from 'next/link';

export default function Home() {
  return (
    <main className={`h-screen w-screen `}>
      <div className="w-full h-full flex flex-col items-center justify-center bg-violet-100">
        {/* Some content page...
        <Link href="/test">
          <span className="text-blue-500 hover:underline">Go to Test Page</span>
        </Link> */}
      </div>
    </main>
  );
}
