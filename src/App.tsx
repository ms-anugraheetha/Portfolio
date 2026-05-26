import { WorkspaceProvider } from "@/context/WorkspaceContext";
import { BrowserShell } from "@/components/workspace/BrowserShell";

function App() {
  return (
    <WorkspaceProvider>
      <BrowserShell />
    </WorkspaceProvider>
  );
}

export default App;
