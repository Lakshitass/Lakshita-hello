import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl p-12 text-center max-w-md mx-auto">
        <div className="text-8xl mb-6 animate-pulse-soft">🌈</div>
        <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! This vibe doesn't exist
        </p>
        <Button asChild className="capture-button">
          <a href="/">Return to Your Journal</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
