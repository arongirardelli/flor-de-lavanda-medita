
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <img 
      src="/lovable-uploads/57449a91-16f8-4d57-8e16-603f5a45eef7.png"
      alt="Flor de Lavanda"
      className={cn("w-32 h-auto", className)}
    />
  );
}
