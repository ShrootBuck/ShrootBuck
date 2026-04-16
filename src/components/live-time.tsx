"use client";

import { useState, useEffect, useRef } from "react";
import { Clock } from "lucide-react";

interface LiveTimeProps {
  timezone: string;
  initialTime: string;
}

function formatCurrentTime(timezone: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: timezone,
  }).format(new Date());
}

export function LiveTime({ timezone, initialTime }: LiveTimeProps) {
  const [time, setTime] = useState(initialTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setTime(formatCurrentTime(timezone));
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

  return (
    <div className="header-meta">
      <Clock size={16} className="icon" />
      <span>
        <strong>Time for me:</strong> {time}
      </span>
    </div>
  );
}
