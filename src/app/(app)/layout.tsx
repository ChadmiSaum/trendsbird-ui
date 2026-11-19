import { DemoShell } from "./demo-shell";

/** Every page in this route group gets the sidebar, top bar and footer. */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <DemoShell>{children}</DemoShell>;
}
