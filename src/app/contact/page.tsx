import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { RevealScope } from "@/components/motion/RevealScope";
import { LineHeading } from "@/components/ui/LineHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Contact",
  description: "Let's build something meaningful. A concept contact form for the fictional studio ATELIER / FORM.",
};

const NOTES = [
  { label: "Studio", value: "ATELIER / FORM is a fictional practice created for a frontend portfolio." },
  { label: "Enquiries", value: "This form validates in the browser only. No message is sent or stored." },
  { label: "Projects", value: "Residential, cultural and interior concepts — all illustrative." },
];

export default function ContactPage() {
  return (
    <RevealScope className="frame pt-[calc(var(--header-h)_+_clamp(3rem,8vw,7rem))] pb-[clamp(6rem,12vw,11rem)]">
      <SectionLabel index="03" className="mb-6">
        Contact
      </SectionLabel>
      <LineHeading
        as="h1"
        gate
        lines={["Let's build", "something", "meaningful."]}
        lineClassNames={[undefined, "lg:pl-[calc(3*(100%_+_var(--gutter))/12)]", undefined]}
        className="display"
      />

      <div className="grid-12 mt-16 gap-y-16 border-t border-concrete pt-10 md:mt-24">
        <aside className="col-span-4 md:col-span-8 lg:col-span-4" aria-label="About this form">
          <dl className="grid gap-8 md:grid-cols-3 lg:grid-cols-1" data-anim="stagger">
            {NOTES.map((note) => (
              <div key={note.label} className="border-t border-ink pt-3">
                <dt className="meta text-charcoal">{note.label}</dt>
                <dd className="mt-2 max-w-[34ch] text-[0.9375rem] leading-snug">{note.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6" data-anim="fade">
          <ContactForm />
        </div>
      </div>
    </RevealScope>
  );
}
