"use client";

import { useState, useEffect, useRef } from "react";
import { Clock } from "lucide-react";

interface LiveTimeProps {
  timezone: string;
}

export function LiveTime({ timezone }: LiveTimeProps) {
  const [time, setTime] = useState<string>("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

    const now = new Date();
    const msUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const timeout = setTimeout(() => {
      updateTime();
      intervalRef.current = setInterval(updateTime, 60000);
    }, msUntilNextMinute);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
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
