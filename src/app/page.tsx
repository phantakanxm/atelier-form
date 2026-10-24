import { ArchitecturalHero } from "@/components/home/ArchitecturalHero";
import { Philosophy } from "@/components/home/Philosophy";
import { SelectedWorks } from "@/components/home/SelectedWorks";
import { StudioPreview } from "@/components/home/StudioPreview";
import { RevealScope } from "@/components/motion/RevealScope";

export default function HomePage() {
  return (
    <>
      <ArchitecturalHero />
      <RevealScope>
        <SelectedWorks />
        <Philosophy />
        <StudioPreview />
      </RevealScope>
    </>
  );
}
