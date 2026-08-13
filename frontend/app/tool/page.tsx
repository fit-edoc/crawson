"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import dynamic from "next/dynamic";
import CrawlerForm from "@/components/CrawlerForm";
import VisualRenderer from "@/components/VisualRenderer";
import Link from "next/link";
import { ArrowLeft, Code2, Monitor, LayoutTemplate } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import Image from "next/image";

// Dynamically import JsonView to avoid SSR issues
const JsonView = dynamic(() => import('@uiw/react-json-view'), { ssr: false });

type ViewMode = "split" | "visual" | "json";

export default function ToolPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("split");

  const scrapeMutation = useMutation({
    mutationFn: async ({ url, fields, deepScrape }: { url: string; fields: string[], deepScrape: boolean }) => {
      // Pointing to local FastAPI backend
      const response = await axios.post("https://crawson.onrender.com/scrape", { url, fields, deep_scrape: deepScrape }, { timeout: 45000 });
      return response.data;
    },
    onSuccess: () => {
      setTimeout(() => {
        const resultsEl = document.getElementById("results-container");
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  });

  const handleSubmit = (url: string, fields: string[], deepScrape: boolean) => {
    scrapeMutation.mutate({ url, fields, deepScrape });
  };

  const data = scrapeMutation.data;
  const isError = scrapeMutation.isError;
  const error = scrapeMutation.error as any;

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      <Link href="/" className="inline-flex items-center  text-slate-500 hover:text-emerald-600 mb-8 font-medium transition-colors">
  <ArrowLeft size={18} className="mr-2" /> Back to Home
      </Link>
      
      <CrawlerForm onSubmit={handleSubmit} isLoading={scrapeMutation.isPending} />

      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mb-8 max-w-3xl mx-auto text-center shadow-sm">
          <p className="font-semibold">Failed to extract data</p>
          <p className="text-sm mt-1 opacity-80">
            {error?.code === 'ECONNABORTED' 
              ? "The request timed out. This website might be blocking scrapers or taking too long to respond." 
              : error?.response?.data?.detail || "The scraper could not extract data from this particular URL. It might have anti-scraping mechanisms or require login."}
          </p>
        </div>
      )}

      {data && (
        <div id="results-container" className="mt-12 scroll-mt-6">
          {/* View Mode Controls */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setViewMode("split")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                viewMode === "split" ? "bg-[#000000] text-white shadow-sm" : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              <LayoutTemplate size={18} /> Split View
            </button>
            <button
              onClick={() => setViewMode("visual")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                viewMode === "visual" ? "bg-[#000000] text-white shadow-sm" : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              <Monitor size={18} /> Visual
            </button>
            <button
              onClick={() => setViewMode("json")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                viewMode === "json" ? "bg-[#000000] text-white shadow-sm" : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              <Code2 size={18} /> JSON
            </button>
          </div>

          <div className={`grid gap-8 ${viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
            
            {/* Visual View */}
            {(viewMode === "split" || viewMode === "visual") && (
              <div className="bg-white/80 rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <Monitor className="text-[#ffffff]  bg-[#000]  p-0.5 rounded-md" size={30} /> Visual Output
                  </h3>
                </div>
                <VisualRenderer data={data} />
              </div>
            )}

            {/* JSON View */}
            {(viewMode === "split" || viewMode === "json") && (
              <div className="bg-white/90 rounded-2xl p-6 border border-slate-200 shadow-lg overflow-hidden flex flex-col h-full min-h-[500px]">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <Code2 className="text-[#ffffff]  bg-[#000]  p-0.5 rounded-md" size={30} /> Raw JSON
                  </h3>
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200">Read-only</span>
                </div>
                <div className="flex-1 overflow-auto custom-scrollbar bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <JsonView 
                    value={data} 
                    displayDataTypes={false}
                    displayObjectSize={false}
                    collapsed={1}
                    style={{ 
                      backgroundColor: 'transparent',
                      '--w-rjv-color': '#0f172a',
                      '--w-rjv-key-string': '#1d4ed8',
                      '--w-rjv-background-color': 'transparent',
                      '--w-rjv-line-color': '#cbd5e1',
                      '--w-rjv-arrow-color': '#64748b',
                      '--w-rjv-type-string-color': '#059669',
                      '--w-rjv-type-int-color': '#be185d',
                      '--w-rjv-type-boolean-color': '#b91c1c',
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            )}
            
          </div>
        </div>
      )}
    </main>
  );
}
