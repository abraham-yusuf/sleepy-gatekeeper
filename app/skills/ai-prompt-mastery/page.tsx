import Link from "next/link";
import SolanaEscrowInfo from "@/app/components/SolanaEscrowInfo";

export default function AIPromptMasterySkill() {
  return (
    <div className="min-h-screen grid-bg pb-12">
      {/* CRT Overlay */}
      <div className="crt-overlay"></div>

      <article className="max-w-4xl mx-auto px-4 py-12 relative">
        <div className="win95-shadow bg-retro-gray rounded-sm">
          {/* Title Bar */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-600 px-4 py-2">
            <h1 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
              <span className="material-symbols-outlined">school</span>
              AI Prompt Engineering Mastery
            </h1>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 bg-white">
            <div className="mb-8">
              <div className="flex items-center gap-4 text-gray-600 mb-6 font-mono text-sm">
                <span>👤 By Jane Smith</span>
                <span>•</span>
                <span>📅 February 1, 2024</span>
              </div>
              <div className="border-t-2 border-gray-300 pt-6">
                <p className="text-lg text-gray-700 font-mono">
                  Advanced techniques for crafting effective AI prompts
                </p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="win95-recessed bg-retro-gray p-4 mb-6">
                <p className="text-black font-mono text-sm">
                  💡 <strong>Skill Category:</strong> AI Skills
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 font-mono">
                What You'll Learn
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Master the art of prompt engineering with this comprehensive skill package. 
                Learn how to craft prompts that consistently produce high-quality AI outputs 
                for various use cases.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 font-mono">
                Key Techniques
              </h2>
              <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2">
                <li>
                  <strong>Prompt Structure:</strong> Learn the anatomy of effective prompts
                </li>
                <li>
                  <strong>Context Management:</strong> Provide the right context for better outputs
                </li>
                <li>
                  <strong>Role-Based Prompts:</strong> Assign personas to AI for specialized responses
                </li>
                <li>
                  <strong>Chain-of-Thought:</strong> Guide AI through complex reasoning tasks
                </li>
                <li>
                  <strong>Few-Shot Learning:</strong> Use examples to teach desired output formats
                </li>
              </ol>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 font-mono">
                Practical Templates
              </h2>
              <div className="win95-recessed bg-black p-4 mb-6">
                <pre className="text-neon-green font-mono text-xs terminal-glow overflow-x-auto">
{`# Template 1: Code Generation
You are an expert [LANGUAGE] developer.
Write clean, efficient code for: [TASK]
Include comments and error handling.

# Template 2: Content Creation
Act as a professional [ROLE].
Create [TYPE] about [TOPIC] that:
- Is engaging and informative
- Targets [AUDIENCE]
- Uses [TONE]

# Template 3: Analysis
Analyze the following [DATA_TYPE]:
[DATA]
Provide insights on:
1. Key patterns
2. Recommendations
3. Potential risks`}
                </pre>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 font-mono">
                Advanced Strategies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Go beyond basic prompts with advanced strategies:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Iterative refinement techniques for optimal results</li>
                <li>Token optimization for cost-effective prompting</li>
                <li>Multi-turn conversation management</li>
                <li>Error recovery and fallback strategies</li>
                <li>Prompt versioning and testing methodologies</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 font-mono">
                Real-World Applications
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Apply these skills across various domains:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="win95-shadow bg-retro-gray p-4">
                  <h3 className="font-bold text-black mb-2 font-mono">💼 Business</h3>
                  <p className="text-sm text-gray-700">Market analysis, report generation, strategy planning</p>
                </div>
                <div className="win95-shadow bg-retro-gray p-4">
                  <h3 className="font-bold text-black mb-2 font-mono">💻 Development</h3>
                  <p className="text-sm text-gray-700">Code generation, debugging, documentation</p>
                </div>
                <div className="win95-shadow bg-retro-gray p-4">
                  <h3 className="font-bold text-black mb-2 font-mono">✍️ Content</h3>
                  <p className="text-sm text-gray-700">Article writing, social media, copywriting</p>
                </div>
                <div className="win95-shadow bg-retro-gray p-4">
                  <h3 className="font-bold text-black mb-2 font-mono">🎓 Education</h3>
                  <p className="text-sm text-gray-700">Lesson planning, quiz generation, tutoring</p>
                </div>
              </div>

              <div className="win95-shadow bg-neon-green/20 border-2 border-neon-green p-6 mt-8">
                <p className="text-gray-800 font-bold mb-2 font-mono">✅ Pro Tip</p>
                <p className="text-gray-700 font-mono text-sm">
                  Start with the templates provided and customize them for your specific needs. 
                  The best prompts are iteratively refined based on actual results.
                </p>
              </div>

              {/* Solana Escrow Integration */}
              <SolanaEscrowInfo contentType="Skill" price="$0.05" />
            </div>

            <div className="mt-12 pt-8 border-t-2 border-gray-300">
              <div className="flex items-center justify-between">
                <Link
                  href="/skills"
                  className="bg-retro-gray hover:bg-white text-black font-bold py-2 px-6 win95-shadow font-mono text-sm transition-colors"
                >
                  ← Back to Skills
                </Link>
                <div className="text-sm text-gray-500 font-mono">
                  Powered by X402 Protocol + Solana Escrow
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
