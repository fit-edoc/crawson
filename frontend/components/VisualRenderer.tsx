import { ExternalLink, Image as ImageIcon, FileText, Link as LinkIcon, Info } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ScrapedData {
  url: string;
  title?: string;
  description?: string;
  images?: string[];
  links?: string[];
  method_used?: string;
}

export default function VisualRenderer({ data }: { data: ScrapedData }) {
  if (!data) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Info */}
      <Card className="border border-slate-200 shadow-sm bg-white">
        <CardContent className="p-4 flex items-center gap-3">
          <Info className="text-slate-900" size={20} />
          <div className="text-sm flex flex-wrap items-center gap-3">
            <div>
              <span className="text-slate-500">Scraped from: </span>
              <a href={data.url} target="_blank" rel="noreferrer" className="text-slate-900 hover:underline font-bold break-all">
                {data.url}
              </a>
            </div>
            {data.method_used && (
              <Badge variant="outline" className="text-slate-900 bg-slate-100 border-slate-300 font-bold">
                Method: {data.method_used}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Meta Data */}
      {(data.title || data.description) && (
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-black text-slate-900 uppercase">
              <FileText className="text-slate-900" size={24} />
              Metadata
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.title && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Title</h3>
                <p className="text-lg font-medium text-slate-800">{data.title}</p>
              </div>
            )}
            {data.description && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Description</h3>
                <p className="text-slate-600 leading-relaxed">{data.description}</p>
