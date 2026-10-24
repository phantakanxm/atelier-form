type RuleProps = { className?: string; origin?: "left" | "right"; tone?: "light" | "dark" };

/** A 1px architectural divider that draws itself into place. */
export function Rule({ className = "", origin = "left", tone = "light" }: RuleProps) {
  return (
    <div
      aria-hidden="true"
      data-anim="rule"
      data-origin={origin}
      className={`h-px w-full ${tone === "light" ? "bg-concrete" : "bg-ivory/20"} ${className}`}
    />
  );
}
