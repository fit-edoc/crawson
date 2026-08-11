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
      
