"use client";

interface UpcomingBadgeClientProps {
  year: number;
  month: string;
}

/**
 * Client-only badge that computes "Upcoming" status from the current date.
 * Marked "use client" so `new Date()` only runs on the client, avoiding
 * stale SSR output and hydration mismatches.
 */
export default function UpcomingBadgeClient({ year, month }: UpcomingBadgeClientProps) {
  if (!month) return null;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthIndex = new Date(`${month} 1, 2000`).getMonth();

  const isUpcoming =
    year > currentYear || (year === currentYear && monthIndex >= currentMonth);

  if (!isUpcoming) return null;

  return <span className="exhibition-badge">Upcoming</span>;
}