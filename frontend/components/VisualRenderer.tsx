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
  structured_data?: any[];
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
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Images Grid */}
      {data.images && data.images.length > 0 && (
        <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2 text-xl font-black text-slate-900 uppercase">
                <ImageIcon className="text-slate-900" size={24} />
                Images ({data.images.length})
              </CardTitle>
              
              {/* Download All as ZIP Button */}
              <AnimatedButton
                onClick={async () => {
                  try {
                    const response = await fetch("http://127.0.0.1:8000/download-zip", {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ images: data.images })
                    });
                    if (!response.ok) throw new Error('Download failed');
                    
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = "scraped_images.zip";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                  } catch (error) {
                    alert("Failed to download ZIP file");
                  }
                }}
                className="bg-white hover:bg-slate-100 text-slate-900 font-medium border border-slate-200 shadow-sm hover:shadow-md h-10 px-4 w-full sm:w-auto transition-all"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>}
              >
                Download All as ZIP
              </AnimatedButton>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-4">
                {data.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="block group relative aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={img} 
                      alt={`Scraped image ${idx}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0NzU1NjkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjkiIGN5PSI5IiByPSIyIi8+PHBhdGggZD0ibTIxIDE1LTMuMDgtNi45MmMtLjYxLS42MS0xLjQ2LS42MS0yLjA4IDBMMTEgMTRsLTEuNDQtMS40NGMtLjYxLS42MS0xLjQ2LS42MS0yLjA4IDBMMyAxOCIvPjwvc3ZnPg==';
                      }}
                    />
                    
                    {/* Hover overlay with buttons */}
                    <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                      <a href={img} target="_blank" rel="noreferrer" title="Open Image" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-full transition-colors text-white shadow-sm border-2 border-transparent">
                        <ExternalLink size={20} />
                      </a>
                      
                      <a 
                        href={`http://127.0.0.1:8000/download-image?url=${encodeURIComponent(img)}`} 
                        title="Download Image" 
                        className="p-2 bg-white hover:bg-slate-100 rounded-full transition-colors text-slate-900 shadow-sm border-2 border-slate-900"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Links List */}
      {data.links && data.links.length > 0 && (
        <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-black text-slate-900 uppercase">
              <LinkIcon className="text-slate-900" size={24} />
              Links ({data.links.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2 pb-4">
                {data.links.map((link, idx) => (
                  <a 
                    key={idx} 
                    href={link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-slate-100 border-2 border-slate-200 hover:border-slate-900 transition-colors group text-sm text-slate-600 hover:text-slate-900 font-medium"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-900 transition-colors">
                      <LinkIcon size={14} className="text-slate-900 group-hover:text-white transition-colors" />
                    </div>
                    <span className="truncate">{link}</span>
                  </a>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Structured Data */}
      {data.structured_data && data.structured_data.length > 0 && (
        <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-black text-slate-900 uppercase">
              <FileText className="text-slate-900" size={24} />
              Structured Data ({data.structured_data.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4 pb-4">
                {data.structured_data.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <pre className="text-xs text-slate-700 whitespace-pre-wrap break-words font-mono">
                      {JSON.stringify(item, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
