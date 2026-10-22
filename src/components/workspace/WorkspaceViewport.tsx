import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { HomePage } from "@/components/sections/HomePage";
import { ProjectWorkspace } from "@/components/projects/ProjectWorkspace";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

const panelMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15, ease: "easeOut" as const },
};

export function WorkspaceViewport() {
  const { activeSection, reloadKey } = useWorkspace();
  const scrollRef = useRef<HTMLDivElement>(null);

  // A freshly opened tab starts at the top, like a real page load.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [activeSection, reloadKey]);

  return (
    <div
      ref={scrollRef}
      className="workspace-scroll relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-paper"
    >
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => scrollRef.current?.scrollTo({ top: 0 })}
      >
        <motion.div
          key={`${activeSection}-${reloadKey}`}
          {...panelMotion}
          className="flex flex-1 flex-col"
          role="tabpanel"
          id={`panel-${activeSection}`}
          aria-labelledby={`tab-${activeSection}`}
        >
          {activeSection === "home" && <HomePage />}
          {activeSection === "projects" && <ProjectWorkspace />}
          {activeSection === "about" && <About />}
          {activeSection === "stack" && <TechStack />}
          {activeSection === "experience" && <Experience />}
          {activeSection === "contact" && <Contact />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
