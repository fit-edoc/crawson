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

// Dynamically import JsonView to avoid SSR issues
const JsonView = dynamic(() => import('@uiw/react-json-view'), { ssr: false });

type ViewMode = "split" | "visual" | "json";

export default function ToolPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("split");

  const scrapeMutation = useMutation({
    mutationFn: async ({ url, fields, deepScrape }: { url: string; fields: string[], deepScrape: boolean }) => {
      // Pointing to local FastAPI backend
      const response = await axios.post("http://127.0.0.1:8000/scrape", { url, fields, deep_scrape: deepScrape });
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
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <Link href="/" className="inline-flex items-center text-slate-500 hover:text-emerald-600 mb-8 font-medium transition-colors">
        <ArrowLeft size={18} className="mr-2" /> Back to Home
      </Link>
      
      <CrawlerForm onSubmit={handleSubmit} isLoading={scrapeMutation.isPending} />

      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mb-8 max-w-3xl mx-auto text-center shadow-sm">
          <p className="font-semibold">Failed to extract data</p>
          <p className="text-sm mt-1 opacity-80">{error?.response?.data?.detail || error.message}</p>
        </div>
      )}

      {data && (
        <div id="results-container" className="mt-12 scroll-mt-6">
          {/* View Mode Controls */}
          <div className="flex justify-center gap-2 mb-8">
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
