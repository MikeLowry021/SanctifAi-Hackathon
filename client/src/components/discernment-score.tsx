import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DiscernmentScoreProps {
  score: number;
}

export function DiscernmentScore({ score }: DiscernmentScoreProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepValue = score / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setDisplayScore(Math.min(Math.round(currentStep * stepValue), score));
      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [score]);

  const getScoreColor = () => {
    if (score >= 85) return "hsl(var(--primary))";
    if (score >= 65) return "hsl(var(--chart-2))";
    return "hsl(25 60% 52%)";
  };

  const getScoreLabel = () => {
    if (score >= 85) return "Faith-Safe";
    if (score >= 65) return "Review Recommended";
    return "Prayerful Discernment Recommended";
  };

  const getScoreGlow = () => {
    if (score >= 85) return "0 0 30px hsla(var(--primary), 0.3)";
    if (score >= 65) return "0 0 30px hsla(var(--chart-2), 0.3)";
    return "0 0 30px hsla(25, 60%, 52%, 0.3)";
  };

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-4"
      data-testid="discernment-score"
    >
      <div className="relative">
        <svg width="180" height="180" className="transform -rotate-90">
          <circle
            cx="90"
            cy="90"
            r="70"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="12"
          />
          <motion.circle
            cx="90"
            cy="90"
            r="70"
            fill="none"
            stroke={getScoreColor()}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              filter: `drop-shadow(${getScoreGlow()})`,
            }}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-5xl font-heading font-bold"
            style={{ color: getScoreColor() }}
            data-testid="text-score-value"
          >
            {displayScore}
          </span>
          <span className="text-sm text-muted-foreground font-medium">
            out of 100
          </span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold" style={{ color: getScoreColor() }} data-testid="text-score-label">
          {getScoreLabel()}
        </p>
        <p className="text-sm text-muted-foreground">SanctifAi Discernment Score</p>
      </div>
    </motion.div>
  );
}
