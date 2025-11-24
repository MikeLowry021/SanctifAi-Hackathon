import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
  onSearch: (title: string, mediaType?: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [title, setTitle] = useState("");
  const [mediaType, setMediaType] = useState<string>("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSearch(title.trim(), mediaType === "all" ? undefined : mediaType);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Enter a movie, show, game, song, app, or book title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="pl-12 h-12 text-base rounded-2xl shadow-xl border-2 focus-visible:ring-2 focus-visible:ring-ring"
            data-testid="input-search"
            disabled={isLoading}
          />
        </div>
        <Select value={mediaType} onValueChange={setMediaType} disabled={isLoading}>
          <SelectTrigger
            className="w-full sm:w-[140px] h-12 rounded-2xl border-2"
            data-testid="select-media-type"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="movie">Movie</SelectItem>
            <SelectItem value="show">TV Show</SelectItem>
            <SelectItem value="game">Game</SelectItem>
            <SelectItem value="song">Song</SelectItem>
            <SelectItem value="app">App</SelectItem>
            <SelectItem value="book">Book</SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="submit"
          size="lg"
          className="h-12 px-8 rounded-2xl text-base font-semibold"
          disabled={!title.trim() || isLoading}
          data-testid="button-search"
        >
          {isLoading ? "Seeking wisdom..." : "Search with Discernment"}
        </Button>
      </div>
    </form>
  );
}
