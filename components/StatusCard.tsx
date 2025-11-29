import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;  
  label: string;             
  value: string;                
  highlight?: "good" | "bad";    
  className?: string;       
};

export default function StatusCard({
  icon,
  label,
  value,
  highlight,
  className = "",
}: Props) {
  const highlightClass =
    highlight === "good"
      ? "status-good"
      : highlight === "bad"
      ? "status-bad"
      : "";

  return (
    <div className={`glass-card ${className}`}>
      <div className="icon-wrapper">{icon}</div>
      <div className="label">{label}</div>
      <div className={`value ${highlightClass}`}>{value}</div>
    </div>
  );
}