import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ManageArticles() {
  return (
    <div className="min-h-screen bg-[#008080] font-['MS_Sans_Serif',_'Microsoft_Sans_Serif',_sans-serif]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link
          href="/creator"
          className="inline-flex items-center text-[#000080] hover:text-blue-900 mb-6 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] px-3 py-1 active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">My Articles</h1>

        <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] p-8 text-center">
          <p className="text-black mb-4">
            You haven't created any articles yet.
          </p>
          <Link
            href="/creator/articles/new"
            className="inline-block bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] text-black font-bold py-2 px-6 active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white"
          >
            Create Your First Article
          </Link>
        </div>
      </div>
    </div>
  );
}
