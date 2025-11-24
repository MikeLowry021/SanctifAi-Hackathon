import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

interface SaveButtonProps {
  analysisId: string;
}

export function SaveButton({ analysisId }: SaveButtonProps) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { toast } = useToast();

  // Check if analysis is saved
  const { data: savedStatus, isLoading: isCheckLoading } = useQuery<{ isSaved: boolean }>({
    queryKey: ["/api/saved-analyses/check", analysisId],
    enabled: !!user && !!analysisId,
    retry: false,
  });

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", `/api/saved-analyses/${analysisId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/saved-analyses/check", analysisId] });
      queryClient.invalidateQueries({ queryKey: ["/api/saved-analyses"] });
      toast({
        title: "Saved",
        description: "Analysis saved to your library",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save analysis",
        variant: "destructive",
      });
    },
  });

  // Unsave mutation
  const unsaveMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("DELETE", `/api/saved-analyses/${analysisId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/saved-analyses/check", analysisId] });
      queryClient.invalidateQueries({ queryKey: ["/api/saved-analyses"] });
      toast({
        title: "Removed",
        description: "Analysis removed from your library",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove analysis",
        variant: "destructive",
      });
    },
  });

  // Don't show if not authenticated (but wait for auth to finish loading)
  if (isAuthLoading) {
    return null; // Still loading auth state
  }
  
  if (!user) {
    return null; // Not authenticated
  }

  const isSaved = savedStatus?.isSaved ?? false;
  const isLoading = isCheckLoading || saveMutation.isPending || unsaveMutation.isPending;

  const handleToggle = () => {
    if (isSaved) {
      unsaveMutation.mutate();
    } else {
      saveMutation.mutate();
    }
  };

  return (
    <Button
      variant={isSaved ? "default" : "outline"}
      size="default"
      onClick={handleToggle}
      disabled={isLoading}
      data-testid={isSaved ? "button-unsave" : "button-save"}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : isSaved ? (
        <BookmarkCheck className="w-4 h-4 mr-2" />
      ) : (
        <Bookmark className="w-4 h-4 mr-2" />
      )}
      {isSaved ? "Saved" : "Save to Library"}
    </Button>
  );
}
