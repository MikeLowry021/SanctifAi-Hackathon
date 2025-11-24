import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Film, Tv, Gamepad2, Music } from "lucide-react";
import type { TMDBResult } from "@shared/schema";

interface MediaSelectorProps {
  results: any[];
  onSelect: (result: any) => void;
  mediaType?: string;
}

export function MediaSelector({ results, onSelect, mediaType }: MediaSelectorProps) {
  const isSong = mediaType === "song";
  
  const getIcon = (type: string) => {
    switch (type) {
      case "show":
        return <Tv className="w-4 h-4" />;
      case "game":
        return <Gamepad2 className="w-4 h-4" />;
      case "song":
        return <Music className="w-4 h-4" />;
      default:
        return <Film className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Select Your Title
        </h2>
        <p className="text-muted-foreground">
          Multiple options found. Choose the exact title you want to analyze.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {results.map((result, index) => {
          const imageUrl = isSong ? result.artwork : result.posterUrl;
          const displayType = isSong ? "song" : result.mediaType;
          const subtitle = isSong ? result.artist : null;
          
          return (
            <Card
              key={isSong ? result.id : result.tmdbId}
              className="cursor-pointer hover-elevate active-elevate-2 overflow-visible"
              onClick={() => onSelect(result)}
              data-testid={`media-option-${index}`}
            >
              <CardContent className="p-0">
                <div className="aspect-[2/3] relative bg-muted">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={result.title}
                      className="w-full h-full object-cover rounded-t-md"
                      data-testid={`img-poster-${index}`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {getIcon(displayType)}
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3
                    className="font-semibold text-sm line-clamp-2 mb-1"
                    data-testid={`text-title-${index}`}
                  >
                    {result.title}
                  </h3>
                  {subtitle && (
                    <p className="text-xs text-muted-foreground line-clamp-1 mb-1">
                      {subtitle}
                    </p>
                  )}
                  <div className="flex items-center gap-2 flex-wrap">
                    {result.releaseYear && (
                      <span className="text-xs text-muted-foreground" data-testid={`text-year-${index}`}>
                        {result.releaseYear}
                      </span>
                    )}
                    <Badge variant="secondary" className="text-xs" data-testid={`badge-type-${index}`}>
                      {displayType}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
