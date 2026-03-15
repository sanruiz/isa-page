interface SectionDividerProps {
  /** Label text shown on the left */
  label: string;
  /** Section number shown on the right */
  number: string;
}

/**
 * Decorative divider between page sections
 * Server Component - static content
 */
export default function SectionDivider({ label, number }: SectionDividerProps) {
  return (
    <div className="section-divider">
      <span className="divider-label">{label}</span>
      <div className="divider-line" />
      <span className="divider-num">{number}</span>
    </div>
  );
}
