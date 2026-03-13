import { AuthContextProvider } from "./_utils/auth-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}