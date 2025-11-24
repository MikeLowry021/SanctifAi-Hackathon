import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import type { Alternative } from "@shared/schema";

interface AlternativesListProps {
  alternatives: Alternative[];
}

export function AlternativesList({ alternatives }: AlternativesListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-primary" />
        <h2 className="text-2xl md:text-3xl font-heading font-bold">
          Faith-Safe Alternatives
        </h2>
      </div>
      <p className="text-muted-foreground">
        Consider these uplifting, faith-aligned alternatives
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {alternatives.map((alt, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            data-testid={`alternative-card-${index}`}
          >
            <Card className="rounded-2xl border-2 h-full hover-elevate transition-all">
              <CardHeader className="space-y-3 pb-4">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl font-heading font-semibold leading-tight" data-testid={`text-alternative-title-${index}`}>
                    {alt.title}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="flex-shrink-0 gap-1 border-primary/30 text-primary"
                  >
                    <Check className="w-3 h-3" />
                    Faith-Safe
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-alternative-reason-${index}`}>
                  {alt.reason}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
