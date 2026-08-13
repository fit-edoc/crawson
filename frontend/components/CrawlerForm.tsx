"use client";

import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
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
    <div className="relative h-[28px] overflow-hidden flex flex-col justify-start px-2 ml-3 text-left w-[140px]">
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
  const [fields, setFields] = useState<Field[]>(["title", "description", "images", "links"]);

  const toggleField = (field: Field) => {
    setFields(prev => 
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && fields.length > 0) {
      onSubmit(url, fields, true);
    }
  };

  return (
    <Card className="rounded-3xl sm:rounded-[3rem] w-full max-w-3xl mx-auto mb-8 transition-all duration-300 border border-white/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),0_0_40px_rgba(165,214,167,0.2)] bg-white/70 backdrop-blur-xl overflow-hidden">
      <CardHeader className="text-center pb-6 pt-10 sm:pt-12 border-b border-slate-100/50">
        <CardTitle className="text-4xl sm:text-5xl font-Hero tracking-wide mb-3 text-slate-900 uppercase">
          Crawson 
        </CardTitle>
        <CardDescription className="text-slate-600 text-base font-medium">
          Extract structured data from any URL instantly.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 sm:p-8 pt-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-black transition-colors z-10">
              <Search size={22} strokeWidth={2.5} />
            </div>
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              className="w-full bg-white/80 backdrop-blur border border-slate-200 rounded-full h-16 pl-14 pr-4 text-slate-900 placeholder-slate-400 focus-visible:ring-4 focus-visible:ring-black/10 focus-visible:border-black transition-all text-lg font-medium shadow-inner"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Data to Extract</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {AVAILABLE_FIELDS.map((field) => {
                const isSelected = fields.includes(field.id);
                return (
                  <div
                    key={field.id}
                    onClick={() => toggleField(field.id)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-full border transition-all cursor-pointer hover:shadow-md ${
                      isSelected 
                        ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105" 
                        : "bg-white/80 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <Checkbox 
                      checked={isSelected} 
                      onCheckedChange={() => toggleField(field.id)}
                      className="data-[state=checked]:bg-white data-[state=checked]:text-slate-900 border-slate-300 data-[state=checked]:border-white rounded-full"
                    />
                    <span className="font-semibold text-sm select-none">{field.label}</span>
                  </div>
                );
              })}
            </div>
          </div>



          <button
            type="submit"
            disabled={isLoading || !url || fields.length === 0}
            className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-[var(--font-oswald)] font-medium h-16 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-slate-700 text-xl tracking-widest uppercase hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(15,23,42,0.3)] shadow-lg flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="animate-spin" size={24} />
                
              </div>
            ) : (
              "Extract Data"
            )}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
