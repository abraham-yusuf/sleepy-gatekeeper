import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ManageSkills() {
  return (
    <div className="min-h-screen grid-bg pb-12">
      <div className="crt-overlay"></div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative">
        <Link
          href="/creator"
          className="inline-flex items-center text-white hover:text-primary mb-6 font-mono"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="win95-shadow bg-retro-gray rounded-sm mb-8">
          <div className="bg-gradient-to-r from-blue-900 to-blue-600 px-4 py-2">
            <h1 className="text-2xl font-bold text-white font-mono">My Skills</h1>
          </div>
          <div className="p-4 bg-retro-gray">
            <p className="text-black font-mono text-sm">
              Manage your published skills and create new ones
            </p>
          </div>
        </div>

        <div className="win95-shadow bg-retro-gray rounded-sm">
          <div className="p-8 bg-white text-center">
            <div className="mb-4">
              <span className="text-6xl">📚</span>
            </div>
            <p className="text-gray-600 mb-6 font-mono">
              You haven't created any skills yet.
            </p>
            <Link
              href="/creator/skills/new"
              className="inline-block bg-retro-gray hover:bg-[#a0a0a0] text-black font-bold py-3 px-8 win95-shadow font-mono transition-colors"
            >
              Create Your First Skill
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
