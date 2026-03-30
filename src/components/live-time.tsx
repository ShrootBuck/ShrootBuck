"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface LiveTimeProps {
  timezone: string;
}

export function LiveTime({ timezone }: LiveTimeProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: timezone,
      });
      setTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [timezone]);

  if (!time) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        color: "var(--text-secondary)",
        fontSize: "0.9rem",
      }}
    >
      <Clock size={16} style={{ color: "var(--accent)" }} />
      <span>
        <strong>Time for me:</strong> {time}
      </span>
    </div>
  );
}
