import { AnimatePresence, motion } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { HomePage } from "@/components/sections/HomePage";
import { ProjectWorkspace } from "@/components/projects/ProjectWorkspace";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { Contact } from "@/components/sections/Contact";

const panelMotion = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const },
};

export function WorkspaceViewport() {
  const { activeSection, reloadKey } = useWorkspace();

  return (
    <div className="relative flex-1 overflow-y-auto bg-ivory">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeSection}-${reloadKey}`}
          {...panelMotion}
          className="h-full"
          role="tabpanel"
          id={`panel-${activeSection}`}
        >
          {activeSection === "home" && <HomePage />}
          {activeSection === "projects" && <ProjectWorkspace />}
          {activeSection === "about" && <About />}
          {activeSection === "stack" && <TechStack />}
          {activeSection === "contact" && <Contact />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
