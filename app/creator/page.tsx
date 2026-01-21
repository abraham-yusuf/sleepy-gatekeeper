import Link from "next/link";
import { DocumentTextIcon, MicrophoneIcon, VideoCameraIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function CreatorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Creator Dashboard</h1>
          <p className="text-gray-600">Manage your content and earnings with X402 Protocol</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">$0.00</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Articles</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <DocumentTextIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Podcasts</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <MicrophoneIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Videos</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <VideoCameraIcon className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/creator/articles/new"
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 group"
            >
              <DocumentTextIcon className="h-12 w-12 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">New Article</h3>
              <p className="text-gray-600">Write and publish pay-per-view articles</p>
            </Link>
            <Link
              href="/creator/podcasts/new"
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 group"
            >
              <MicrophoneIcon className="h-12 w-12 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">New Podcast</h3>
              <p className="text-gray-600">Upload and share audio content</p>
            </Link>
            <Link
              href="/creator/videos/new"
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 group"
            >
              <VideoCameraIcon className="h-12 w-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">New Video</h3>
              <p className="text-gray-600">Upload and monetize video content</p>
            </Link>
          </div>
        </div>

        {/* Content Management */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Manage Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/creator/articles"
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">My Articles</h3>
              <p className="text-gray-600">View and edit your articles</p>
            </Link>
            <Link
              href="/creator/podcasts"
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">My Podcasts</h3>
              <p className="text-gray-600">Manage your podcast episodes</p>
            </Link>
            <Link
              href="/creator/videos"
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">My Videos</h3>
              <p className="text-gray-600">Manage your video library</p>
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
