"use client";

import { useEffect, useRef, useState } from "react";

type Counter = {
  label: string;
  value: number;
  suffix?: string;
};

const counters: Counter[] = [
  { label: "Membri reprezentați", value: 25 },
  { label: "Județe acoperite", value: 42 },
  { label: "Instituții contactate", value: 8 },
];

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

export function RepresentationChart() {
  return (
    <div ref={useCountUp(0).ref} className="flex flex-col gap-3 h-[140px] justify-center">
      {counters.map((c) => (
        <CounterItem key={c.label} {...c} />
      ))}
    </div>
  );
}

function CounterItem({ label, value, suffix }: Counter) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="flex items-baseline justify-between">
      <span className="text-xs text-navy-deep/60">{label}</span>
      <span className="text-2xl font-bold text-navy-deep">
        {count}
        {suffix}
      </span>
    </div>
  );
}
