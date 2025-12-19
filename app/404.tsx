import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Siden blev ikke fundet.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
      >
        Gå til forsiden
      </Link>
    </div>
  );
}
