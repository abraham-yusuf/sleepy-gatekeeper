"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative flex flex-col min-h-screen w-full bg-[#131022] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#292348]/50 bg-[#131022]/80 backdrop-blur-md px-4 py-3 md:px-10">
        <div className="flex items-center gap-4 lg:gap-8 w-full md:w-auto">
          <div className="flex items-center gap-3 text-white">
            <div className="size-8 text-[#3713ec]">
              <span className="material-symbols-outlined !text-[32px]">hub</span>
            </div>
            <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] hidden sm:block">X402</h2>
          </div>
          <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64 lg:w-64 opacity-50 pointer-events-none">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full group focus-within:ring-1 focus-within:ring-[#3713ec]">
              <div className="text-[#9b92c9] flex border-none bg-[#292348] items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input 
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#292348] focus:border-none h-full placeholder:text-[#9b92c9] px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal" 
                disabled 
                placeholder="Search..." 
              />
            </div>
          </label>
        </div>
        <div className="flex items-center gap-4 md:gap-8 justify-end w-auto">
          <div className="hidden lg:flex items-center gap-6">
            <a className="text-gray-200 hover:text-white text-sm font-medium leading-normal transition-colors" href="#">Browse</a>
            <a className="text-gray-200 hover:text-white text-sm font-medium leading-normal transition-colors" href="#">Creators</a>
            <a className="text-gray-200 hover:text-white text-sm font-medium leading-normal transition-colors" href="#">My Library</a>
            <Link href="/articles" className="text-gray-200 hover:text-white text-sm font-medium leading-normal transition-colors">Articles</Link>
            <Link href="/podcasts" className="text-gray-200 hover:text-white text-sm font-medium leading-normal transition-colors">Podcasts</Link>
            <Link href="/videos" className="text-gray-200 hover:text-white text-sm font-medium leading-normal transition-colors">Videos</Link>
          </div>
          <div className="flex items-center gap-3">
            <button className="md:hidden text-white">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#3713ec] hover:bg-[#3713ec]/90 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                Connect
              </span>
            </button>
            <button 
              className="lg:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#131022]/95 backdrop-blur-md" style={{top: '72px'}}>
          <nav className="flex flex-col p-6 gap-4">
            <Link 
              href="/articles" 
              className="flex items-center gap-3 text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-[#292348] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-[#3713ec]">article</span>
              Articles
            </Link>
            <Link 
              href="/podcasts" 
              className="flex items-center gap-3 text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-[#292348] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-[#3713ec]">mic</span>
              Podcasts
            </Link>
            <Link 
              href="/videos" 
              className="flex items-center gap-3 text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-[#292348] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-[#3713ec]">play_circle</span>
              Videos
            </Link>
            <div className="border-t border-white/10 my-2"></div>
            <a 
              href="#" 
              className="flex items-center gap-3 text-gray-200 text-base font-medium py-3 px-4 rounded-lg hover:bg-[#292348] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Browse
            </a>
            <a 
              href="#" 
              className="flex items-center gap-3 text-gray-200 text-base font-medium py-3 px-4 rounded-lg hover:bg-[#292348] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Creators
            </a>
            <a 
              href="#" 
              className="flex items-center gap-3 text-gray-200 text-base font-medium py-3 px-4 rounded-lg hover:bg-[#292348] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Library
            </a>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full">
        <div className="w-full max-w-[1280px] px-4 md:px-10 pb-12">
          {/* Hero Section */}
          <div className="mt-8">
            <div className="flex flex-col gap-6 py-6 md:py-10 md:flex-row items-center">
              <div className="flex flex-col gap-6 md:gap-8 md:w-1/2 justify-center order-2 md:order-1">
                <div className="flex flex-col gap-4 text-left">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#3713ec]/30 bg-[#3713ec]/10 px-3 py-1 text-xs font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3713ec] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3713ec]"></span>
                    </span>
                    <span className="text-[#3713ec] text-xs font-bold uppercase tracking-wider">New Protocol V2 Live</span>
                  </div>
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl lg:text-6xl">
                    Decentralized Monetization for Creators. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3713ec] to-purple-400">Own your content.</span>
                  </h1>
                  <h2 className="text-gray-300 text-base font-normal leading-relaxed max-w-lg mb-2">
                    Unlock exclusive articles, podcasts, and videos directly with X402 Protocol. Zero platform fees, instant payouts.
                  </h2>
                  <div className="w-full max-w-lg mt-2 relative z-20">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#3713ec] to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                      <div className="relative flex items-center bg-[#1e1933] rounded-xl border border-[#3f3863] overflow-hidden focus-within:border-[#3713ec] focus-within:ring-2 focus-within:ring-[#3713ec]/20 transition-all shadow-xl">
                        <div className="pl-4 text-[#9b92c9]">
                          <span className="material-symbols-outlined">search</span>
                        </div>
                        <input 
                          className="w-full bg-transparent border-none text-white placeholder-[#9b92c9] py-4 px-3 focus:ring-0 text-base outline-none" 
                          placeholder="Search creators, articles, or videos..." 
                          type="text"
                        />
                        <div className="hidden sm:flex items-center gap-1 pr-2">
                          <select className="bg-[#292348] text-sm text-white border-none rounded-lg py-1.5 pl-2 pr-8 focus:ring-1 focus:ring-[#3713ec] cursor-pointer hover:bg-[#342d5b] transition-colors outline-none">
                            <option>All</option>
                            <option>Creators</option>
                            <option>Articles</option>
                            <option>Podcasts</option>
                            <option>Videos</option>
                          </select>
                          <button className="ml-2 bg-[#3713ec] hover:bg-[#3713ec]/90 text-white rounded-lg p-2 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-3 text-xs text-[#9b92c9] pl-1">
                      <span>Popular:</span>
                      <a className="hover:text-[#3713ec] transition-colors cursor-pointer underline-offset-2 hover:underline">#Web3Gaming</a>
                      <a className="hover:text-[#3713ec] transition-colors cursor-pointer underline-offset-2 hover:underline">#DeFi</a>
                      <a className="hover:text-[#3713ec] transition-colors cursor-pointer underline-offset-2 hover:underline">#NFTArt</a>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 flex-wrap mt-2">
                  <button className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#3713ec] hover:bg-[#3713ec]/90 transition-all text-white text-base font-bold leading-normal tracking-[0.015em] shadow-[0_0_20px_rgba(55,19,236,0.3)]">
                    <span className="truncate">Start Exploring</span>
                  </button>
                  <button className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#292348] hover:bg-[#342d5b] border border-white/5 transition-all text-white text-base font-medium leading-normal tracking-[0.015em]">
                    <span className="truncate">Learn More</span>
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <div className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-2xl shadow-2xl relative overflow-hidden group" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCX34LwwHVtVrwd2gPNRIsdqmF0L54nyMGxYXQlaVQk3FDwCuVtF49Sjp2i60qNTPq9fO6rlmB3zjlC9rBHjctfnqb2vuI4oBNmCcUfthQGvoSZyUVqhftpKG0mdHEFxESRojWxSMgshAO-Y7bIFtEX8UyNYEa32gfYUHn4QkTfqZWKM3j1sbIUSv4H5nd4L1YVIJtJUnoCei3TcZKT3RBFsLWvGJMnb3WJ_KHW-3_5m4SFQIS-1G8Zga81HvE5cJ0fjBWUqKV3zrwY")'}}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131022] via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-sm">play_arrow</span>
                      </div>
                      <span className="text-white text-sm font-medium bg-black/50 backdrop-blur-md px-2 py-1 rounded">Featured Creator</span>
                    </div>
                    <p className="text-white text-xl font-bold">The Future of DeFi Gaming</p>
                    <p className="text-gray-300 text-sm mt-1">By CryptoVisionary • 0.05 ETH</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 py-6 flex-wrap sticky top-[72px] z-40 bg-[#131022]/95 backdrop-blur-sm border-b border-white/5 -mx-4 px-4 md:mx-0 md:px-0 md:bg-transparent md:border-none md:static">
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#3713ec] text-white pl-5 pr-5 hover:scale-105 transition-transform">
              <p className="text-sm font-bold leading-normal">All</p>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#292348] hover:bg-[#38315e] border border-white/5 pl-5 pr-5 transition-colors group">
              <span className="material-symbols-outlined text-[18px] text-[#9b92c9] group-hover:text-white transition-colors">article</span>
              <p className="text-[#9b92c9] group-hover:text-white text-sm font-medium leading-normal transition-colors">Articles</p>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#292348] hover:bg-[#38315e] border border-white/5 pl-5 pr-5 transition-colors group">
              <span className="material-symbols-outlined text-[18px] text-[#9b92c9] group-hover:text-white transition-colors">mic</span>
              <p className="text-[#9b92c9] group-hover:text-white text-sm font-medium leading-normal transition-colors">Podcasts</p>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#292348] hover:bg-[#38315e] border border-white/5 pl-5 pr-5 transition-colors group">
              <span className="material-symbols-outlined text-[18px] text-[#9b92c9] group-hover:text-white transition-colors">play_circle</span>
              <p className="text-[#9b92c9] group-hover:text-white text-sm font-medium leading-normal transition-colors">Videos</p>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#292348] hover:bg-[#38315e] border border-white/5 pl-5 pr-5 transition-colors group">
              <span className="material-symbols-outlined text-[18px] text-[#9b92c9] group-hover:text-white transition-colors">token</span>
              <p className="text-[#9b92c9] group-hover:text-white text-sm font-medium leading-normal transition-colors">NFT Access</p>
            </button>
          </div>

          {/* Trending Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between px-2 mb-6">
              <h2 className="text-white text-2xl font-bold leading-tight flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3713ec]">trending_up</span>
                Trending Now
              </h2>
              <a className="text-[#3713ec] hover:text-white text-sm font-medium transition-colors" href="#">View All</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Article Card */}
              <div className="flex flex-col items-stretch justify-start rounded-xl overflow-hidden bg-[#1e1933] border border-white/5 hover:border-[#3713ec]/50 transition-all hover:shadow-[0_0_20px_rgba(55,19,236,0.15)] group h-full">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover relative" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA8nSu--KopZoytgkuCB9Xi5Lp2jF7CFgAaV9fHEyxM7KbhwIkcfhdCUoN48IOEY0ed2CsQxnheV5Fe1ZOfgyDVkxcEggs48e82-MqRwkUwr1ogkZvVWruxCc791sguta9AMhqHPfJk5Bj_CeG6Q749j4k0GGzxnr1lW3dTb4J3kW9RUYbfQQMLbhgdkNaWmWnmtwwIiE8ZfVfjR09YBs9_nCNj6rCUpJnY80ekfJWwMv83ywFg8_3sTYA2IXXL73y_s9NSlHeNg-U7")'}}>
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1 border border-white/10">
                    <span className="material-symbols-outlined text-[14px]">article</span> Article
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <p className="text-[#3713ec] font-bold text-sm">0.01 ETH</p>
                      <h3 className="text-white text-lg font-bold leading-tight line-clamp-2 mt-1 group-hover:text-[#3713ec] transition-colors">Web3 Gaming: Beyond the Hype Cycle</h3>
                    </div>
                  </div>
                  <p className="text-[#9b92c9] text-sm line-clamp-2">A deep dive into the tokenomics of next-gen play-to-earn models and sustainable economies.</p>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-gray-700 bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDwqUMrnSjymZRHe9gi_Iq4jE6w7O3NMekW_23iqUDoVNIG0nCCBPrSGbtU2xO5KST2SlimX-aGAOV0w6HI5wLkQcna3AFG5En2DrehCXUeVZCDoLQ7m9DOn6XIxs4ldlM0RF-BPQhULqlVTdFYVk1MZjEZyM7GTRct02k6w0R7h7ZHQLnHt1kgSK8QcgeK5v-D9BAHS-qj0jZZqFrZEQw4uKfVnR5pt1tr1t749OJnBjBgABeaaYmQ4_ZAzk4Pn-5-fu6eTNWARUZn")'}}></div>
                      <span className="text-xs text-[#9b92c9] font-medium">CryptoAlice</span>
                    </div>
                    <span className="text-xs text-[#9b92c9]">5 min read</span>
                  </div>
                  <Link href="/articles">
                    <button className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg h-9 bg-[#292348] hover:bg-[#3713ec] text-white text-sm font-bold transition-colors">
                      Unlock Content
                    </button>
                  </Link>
                </div>
              </div>

              {/* Podcast Card */}
              <div className="flex flex-col items-stretch justify-start rounded-xl overflow-hidden bg-[#1e1933] border border-white/5 hover:border-[#3713ec]/50 transition-all hover:shadow-[0_0_20px_rgba(55,19,236,0.15)] group h-full">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover relative" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBP37-th6Z-c8NtrRSn-tovcxnG1pQseemqL1YH7dAcz-isY5IXdPgDk2fzevFWzoL3sfpZv5mKMrnvC9bq1glrp7AnbCu345enYmxiZZWnVyWey_pkkpvDAnQK4abubujUmfU2ynrfO80jDbyhWkFQBbC1jY3wJQBaBZIQoZF6n81av7BxOgcogxzHSYWoMywahbuTLb0ZW0ZM6cfok6evCzEvCUikO02rknq3U3QMq_8sYJ1XgYSsA-Ah357CiPhpom664kT_hWJF")'}}>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="size-12 bg-white rounded-full flex items-center justify-center text-black">
                      <span className="material-symbols-outlined filled">play_arrow</span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1 border border-white/10">
                    <span className="material-symbols-outlined text-[14px]">mic</span> Podcast
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 rounded text-xs font-mono text-white">42:10</div>
                </div>
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <p className="text-[#3713ec] font-bold text-sm">50 X402</p>
                      <h3 className="text-white text-lg font-bold leading-tight line-clamp-2 mt-1 group-hover:text-[#3713ec] transition-colors">The Future of DAO Governance</h3>
                    </div>
                  </div>
                  <p className="text-[#9b92c9] text-sm line-clamp-2">Interview with vitalik.eth about the scaling challenges facing decentralized organizations today.</p>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-gray-700 bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAOy-Po6L7YODu-duKvhMfM6pwzxSIe0AncjnlYO4KVwTh50fAxK43BNmsvYWNnhj0ceEPy_Wa4WrNj_7G5Y8l2LX4ihaTgi8Io4d46iET99oXAzzDHT8RBR0O7RDZaAEI6iknxWrXnS9Yqb4GTS4flFqV3NQdGYHkTM_20KgSeSu95W4GprV5IPwSEmktKRIJd3Z2faO4-Xy_WCx4GWsawMgmBVSGjcRH1LKa7ORsADE-ZDKPot6wP1pfBwfn5HzBulDt8cqyIzlb5")'}}></div>
                      <span className="text-xs text-[#9b92c9] font-medium">DAO_Talks</span>
                    </div>
                    <span className="text-xs text-[#9b92c9]">Oct 24</span>
                  </div>
                  <Link href="/podcasts">
                    <button className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg h-9 bg-[#292348] hover:bg-[#3713ec] text-white text-sm font-bold transition-colors">
                      Unlock Episode
                    </button>
                  </Link>
                </div>
              </div>

              {/* Video Card */}
              <div className="flex flex-col items-stretch justify-start rounded-xl overflow-hidden bg-[#1e1933] border border-white/5 hover:border-[#3713ec]/50 transition-all hover:shadow-[0_0_20px_rgba(55,19,236,0.15)] group h-full">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover relative" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHebvAK94dVCBnIf6n1lyhzZNF2a4HkfTDGWlo-27aYbVokdhP6rGREfWZ3J3W-YNU0b9DNg6H-83s8gg8BsHgykjIKGAsgxUnJK5p9F6mf50LUUG0qICAfxaMjDIjKGqX7Yc9zIExMDTe27OSCshwoV4M01Ema8Nzxa7XzpEiv7Lnsjo9jP6clTfJWPKJjIwHYU7bdCxXHt0vLXEJbO6YieB7WR-Eo2kJGEpEkXYjbZFXj3clkVb6yze9f3j1VsY7l4w-9BCjbFsE")'}}>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="size-12 bg-white rounded-full flex items-center justify-center text-black">
                      <span className="material-symbols-outlined filled">play_arrow</span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1 border border-white/10">
                    <span className="material-symbols-outlined text-[14px]">movie</span> Video
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 rounded text-xs font-mono text-white">12:45</div>
                </div>
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <p className="text-[#3713ec] font-bold text-sm">0.02 ETH</p>
                      <h3 className="text-white text-lg font-bold leading-tight line-clamp-2 mt-1 group-hover:text-[#3713ec] transition-colors">Mastering Solidity: Advanced Patterns</h3>
                    </div>
                  </div>
                  <p className="text-[#9b92c9] text-sm line-clamp-2">Learn how to optimize gas usage and secure your smart contracts against re-entrancy attacks.</p>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-gray-700 bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC538cBZ7fh8DMs_hftBlOritIy109OhJO9bduPq1sw0oWn7Vv_rF1-aUKNiGrmn5m_-tkoCfVw9QuSErVBYqBTRAt6pHkRAqrzRlJxP-1DhG4EcyFpwXchgyBklM7eXgIQ8gUeG9tD-R_VqcI6YySmyc8abh3MZ9dLd2dEtRsauQxuRmDBTB1-h32cywa8QSd8n0-xSpgxWxpHI7b6lEqzjpYh2s2NtnvJixQRo04v0MPrTXXpsy_PiTeVC850tkMoqtCtOt5cTrKv")'}}></div>
                      <span className="text-xs text-[#9b92c9] font-medium">CodeWithBlock</span>
                    </div>
                    <span className="text-xs text-[#9b92c9]">1.2k views</span>
                  </div>
                  <Link href="/videos">
                    <button className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg h-9 bg-[#292348] hover:bg-[#3713ec] text-white text-sm font-bold transition-colors">
                      Unlock Content
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

