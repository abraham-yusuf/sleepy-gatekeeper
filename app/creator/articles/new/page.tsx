"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function NewArticle() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    price: "0.01",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Article creation is a demo feature. In production, this would save to a database.");
  };

  return (
    <div className="min-h-screen bg-[#008080] font-['MS_Sans_Serif',_'Microsoft_Sans_Serif',_sans-serif]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/creator/articles"
          className="inline-flex items-center text-[#000080] hover:text-blue-900 mb-6 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] px-3 py-1 active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to My Articles
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Create New Article</h1>

        <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-bold text-black mb-2">
                Article Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-2 py-1 border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white bg-white text-black"
                placeholder="Enter your article title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-bold text-black mb-2">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-2 py-1 border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white bg-white text-black"
                placeholder="Brief description of your article"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-bold text-black mb-2">
                Price (USD)
              </label>
              <div className="flex items-center">
                <span className="text-black mr-2">$</span>
                <input
                  type="number"
                  id="price"
                  step="0.001"
                  min="0.001"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-32 px-2 py-1 border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white bg-white text-black"
                  required
                />
              </div>
              <p className="text-sm text-black mt-1">
                Payments accepted in USDC on Base and Solana
              </p>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-bold text-black mb-2">
                Article Content
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={12}
                className="w-full px-2 py-1 border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white bg-white text-black"
                placeholder="Write your article content here..."
                required
              />
            </div>

            <div className="bg-[#ffffe1] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] p-4">
              <h3 className="font-bold text-black mb-2">X402 Integration</h3>
              <p className="text-sm text-black">
                Your article will be automatically protected with X402 payment middleware.
                Readers will need to pay ${formData.price} to access the full content.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] text-black font-bold py-3 px-6 active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white"
              >
                Publish Article
              </button>
              <Link
                href="/creator/articles"
                className="flex-1 text-center bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] text-black font-bold py-3 px-6 active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
