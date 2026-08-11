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
  const [fields, setFields] = useState<Field[]>(["title", "description", "images", "links"]);
  const [deepScrape, setDeepScrape] = useState(false);

  const toggleField = (field: Field) => {
    setFields(prev => 
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && fields.length > 0) {
      onSubmit(url, fields, deepScrape);
    }
  };

  return (
    <Card className="rounded-3xl w-full max-w-3xl mx-auto mb-8 transition-all duration-300 border border-slate-200 shadow-xl bg-white overflow-hidden">
      <CardHeader className="text-center pb-6 pt-10 border-b-2 border-slate-100">
        <CardTitle className="text-4xl font-khand tracking-tight mb-2 text-slate-900 uppercase">
          Crawson Extractor
        </CardTitle>
        <CardDescription className="text-slate-600 text-base font-medium">
          Extract structured data from any URL instantly.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 sm:p-8 pt-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-50 group-focus-within:text-slate-100 transition-colors z-10">
              <Search size={22} strokeWidth={2.5} />
            </div>
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              className="w-full bg-black border-2 border-slate-200 rounded-xl h-16 pl-14 pr-4 text-slate-100 placeholder-black focus-visible:ring-0 focus-visible:border-slate-900 transition-all text-lg font-medium"
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
                    className={`flex items-center gap-4 px-2 py-2 rounded-xl border transition-all cursor-pointer ${
                      isSelected 
                        ? "bg-slate-900 border-slate-900 text-white shadow-md" 
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
                    }`}
                  >
                    <Checkbox 
                      checked={isSelected} 
                      onCheckedChange={() => toggleField(field.id)}
                      className="data-[state=checked]:bg-white data-[state=checked]:text-slate-900 border-slate-400 data-[state=checked]:border-white"
                    />
                    <span className="font-semibold text-sm select-none">{field.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deep Scrape Toggle */}
          <div className="flex items-center justify-between p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900">Deep Scrape (Playwright)</h3>
              <p className="text-sm text-slate-500 mt-1 font-medium">For dynamic JS sites that lazy-load images.</p>
            </div>
            <Switch
              checked={deepScrape}
              onCheckedChange={setDeepScrape}
              className="data-[state=checked]:bg-slate-900"
            />
          </div>

          <AnimatedButton
            type="submit"
            disabled={isLoading || !url || fields.length === 0}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-16 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all border-none text-lg tracking-wider hover:-translate-y-1 hover:shadow-xl shadow-md flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="animate-spin" size={24} />
                <LoadingText />
              </div>
            ) : (
              "Extract Data"
            )}
          </AnimatedButton>
        </form>
      </CardContent>
    </Card>
  );
}
