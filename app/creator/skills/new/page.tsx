"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function NewSkill() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "AI Skills",
    price: "0.05",
    content: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    alert("Skill created! (Demo mode - not actually saved)");
  };

  return (
    <div className="min-h-screen grid-bg pb-12">
      <div className="crt-overlay"></div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative">
        <Link
          href="/creator/skills"
          className="inline-flex items-center text-white hover:text-primary mb-6 font-mono"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to My Skills
        </Link>

        <div className="win95-shadow bg-retro-gray rounded-sm">
          <div className="bg-gradient-to-r from-blue-900 to-blue-600 px-4 py-2">
            <h1 className="text-2xl font-bold text-white font-mono">Create New Skill</h1>
          </div>

          <div className="p-8 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 font-mono">
                  Skill Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full win95-recessed px-3 py-2 border-2 border-gray-400 font-mono text-sm focus:outline-none focus:border-blue-600"
                  placeholder="e.g., Advanced React Patterns"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 font-mono">
                  Short Description *
                </label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full win95-recessed px-3 py-2 border-2 border-gray-400 font-mono text-sm focus:outline-none focus:border-blue-600"
                  placeholder="Brief description of your skill"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 font-mono">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full win95-recessed px-3 py-2 border-2 border-gray-400 font-mono text-sm focus:outline-none focus:border-blue-600"
                >
                  <option>AI Skills</option>
                  <option>Development</option>
                  <option>Security</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 font-mono">
                  Price (USD) *
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-gray-700">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="flex-1 win95-recessed px-3 py-2 border-2 border-gray-400 font-mono text-sm focus:outline-none focus:border-blue-600"
                    placeholder="0.05"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 font-mono">
                  Recommended: $0.01 - $0.20 for skills
                </p>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 font-mono">
                  Skill Content (Markdown) *
                </label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={12}
                  className="w-full win95-recessed px-3 py-2 border-2 border-gray-400 font-mono text-sm focus:outline-none focus:border-blue-600"
                  placeholder="# Your Skill Content&#10;&#10;Write your skill content in markdown format...&#10;&#10;## Section 1&#10;Content here...&#10;&#10;## Section 2&#10;More content..."
                />
                <p className="text-xs text-gray-500 mt-1 font-mono">
                  Use markdown formatting. This will be displayed to users after payment.
                </p>
              </div>

              {/* Info Box */}
              <div className="win95-shadow bg-neon-green/20 border-2 border-neon-green p-4">
                <p className="text-gray-800 font-bold mb-2 font-mono text-sm">
                  💡 Tips for Creating Great Skills
                </p>
                <ul className="text-gray-700 font-mono text-xs space-y-1">
                  <li>• Provide clear, actionable content</li>
                  <li>• Include code examples and templates</li>
                  <li>• Structure content with headings and lists</li>
                  <li>• Price fairly based on value provided</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-retro-gray hover:bg-[#a0a0a0] text-black font-bold py-3 px-6 win95-shadow font-mono transition-colors"
                >
                  Publish Skill
                </button>
                <Link
                  href="/creator/skills"
                  className="flex-1 text-center bg-white hover:bg-gray-100 text-black font-bold py-3 px-6 win95-shadow font-mono border-2 border-gray-400 transition-colors"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
