import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
}

export function generateMockPerformanceData() {
  return [
    { name: 'Week 1', impressions: 1200 + Math.floor(Math.random() * 500), clicks: 800 + Math.floor(Math.random() * 300), conversions: 150 + Math.floor(Math.random() * 50) },
    { name: 'Week 2', impressions: 1500 + Math.floor(Math.random() * 500), clicks: 950 + Math.floor(Math.random() * 300), conversions: 180 + Math.floor(Math.random() * 50) },
    { name: 'Week 3', impressions: 1100 + Math.floor(Math.random() * 500), clicks: 700 + Math.floor(Math.random() * 300), conversions: 120 + Math.floor(Math.random() * 50) },
    { name: 'Week 4', impressions: 1800 + Math.floor(Math.random() * 500), clicks: 1200 + Math.floor(Math.random() * 300), conversions: 250 + Math.floor(Math.random() * 50) },
  ];
}
