import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ManagePodcasts() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link
          href="/creator"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Podcasts</h1>

        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">
            You haven't created any podcasts yet.
          </p>
          <Link
            href="/creator/podcasts/new"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Create Your First Podcast
          </Link>
        </div>
      </div>
    </div>
  );
}
