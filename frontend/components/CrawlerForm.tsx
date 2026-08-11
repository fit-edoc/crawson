"use client";

import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

type Field = "title" | "description" | "images" | "links";

const AVAILABLE_FIELDS: { id: Field; label: string }[] = [
  { id: "title", label: "Title" },
  { id: "description", label: "Description" },
  { id: "images", label: "Images" },
  { id: "links", label: "Links" },
];

const LoadingText = () => {
  const [index, setIndex] = useState(0);
  const texts = ["Connecting", "Extracting", "Processing"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % texts.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[28px] overflow-hidden flex flex-col justify-start ml-3 text-left w-[140px]">
      <div 
        className="flex flex-col transition-transform duration-500 ease-in-out"
        style={{ transform: `translateY(-${index * 28}px)` }}
      >
        {texts.map((text, i) => (
          <span key={i} className="h-[28px] flex items-center leading-none">{text}...</span>
        ))}
      </div>
    </div>
  );
};

interface CrawlerFormProps {
  onSubmit: (url: string, fields: Field[], deepScrape: boolean) => void;
  isLoading: boolean;
}

export default function CrawlerForm({ onSubmit, isLoading }: CrawlerFormProps) {
  const [url, setUrl] = useState("");
