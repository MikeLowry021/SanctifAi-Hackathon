import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DiscernmentScore } from "@/components/discernment-score";
import { Bookmark, ArrowRight, Loader2, BookOpen } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { SearchResponse } from "@shared/schema";

export default function Library() {
  const [, setLocation] = useLocation();
  const { user, isLoading: isAuthLoading } = useAuth();

  const { data: savedAnalyses, isLoading } = useQuery<SearchResponse[]>({
    queryKey: ["/api/saved-analyses"],
    enabled: !!user,
    retry: false,
  });

  // Redirect to home if not authenticated
  if (!isAuthLoading && !user) {
    setLocation("/");
    return null;
  }

  if (isAuthLoading || isLoading) {
    return (
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center space-y-6 text-center min-h-[60vh]"
        >
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
          <div className="space-y-2">
            <h2 className="text-2xl font-heading font-semibold">
              Loading your library...
            </h2>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-6 py-12 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Bookmark className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl font-heading font-bold" data-testid="text-library-title">
              My Library
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Your saved faith-based media analyses
          </p>
        </motion.div>

        {/* Saved Analyses Grid */}
        {!savedAnalyses || savedAnalyses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center space-y-6 text-center py-20"
          >
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="space-y-2 max-w-md">
              <h2 className="text-2xl font-heading font-semibold">
                Your library is empty
              </h2>
              <p className="text-muted-foreground">
                Start saving media analyses to build your personal collection of faith-based insights
              </p>
            </div>
            <Button onClick={() => setLocation("/")} data-testid="button-start-search">
              <ArrowRight className="w-4 h-4 mr-2" />
              Search Media
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedAnalyses.map((analysis, index) => (
              <motion.div
                key={analysis.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card 
                  className="rounded-2xl border-2 hover-elevate cursor-pointer h-full"
                  onClick={() => setLocation(`/results?title=${encodeURIComponent(analysis.title)}&mediaType=${analysis.mediaType}`)}
                  data-testid={`card-saved-${analysis.id}`}
                >
                  <CardContent className="pt-6 pb-6 space-y-4 h-full flex flex-col">
                    {/* Poster */}
                    {analysis.posterUrl && (
                      <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                        <img
                          src={analysis.posterUrl}
                          alt={analysis.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-heading font-semibold line-clamp-2" data-testid={`text-title-${analysis.id}`}>
                          {analysis.title}
                        </h3>
                        <Badge variant="secondary" className="mt-2">
                          {analysis.mediaType.charAt(0).toUpperCase() + analysis.mediaType.slice(1)}
                        </Badge>
                      </div>

                      {/* Discernment Score */}
                      <div className="flex items-center justify-center py-3">
                        <DiscernmentScore score={analysis.discernmentScore} />
                      </div>

                      {/* Faith Analysis Preview */}
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {analysis.faithAnalysis}
                      </p>
                    </div>

                    {/* View Button */}
                    <Button variant="outline" className="w-full" data-testid={`button-view-${analysis.id}`}>
                      View Analysis
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
