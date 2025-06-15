
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const PATTERN_SVG = `data:image/svg+xml;utf8,<svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='30' cy='30' r='1' fill='%23000000' opacity='0.05'/><circle cx='0' cy='0' r='1' fill='%23000000' opacity='0.05'/><circle cx='60' cy='0' r='1' fill='%23000000' opacity='0.05'/><circle cx='0' cy='60' r='1' fill='%23000000' opacity='0.05'/><circle cx='60' cy='60' r='1' fill='%23000000' opacity='0.05'/></svg>`;
const GRID_PATTERN = `data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 20h40M20 0v40' stroke='%23000000' stroke-width='0.5' opacity='0.08'/></svg>`;

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (loginError) {
      setError(loginError.message);
      toast({
        title: "Sign in failed",
        description: loginError.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    setLoading(false);
    navigate("/");
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden"
      style={{
        backgroundImage: `
          url('${PATTERN_SVG}'),
          url('${GRID_PATTERN}')`,
        backgroundSize: "60px 60px, 40px 40px",
        backgroundPosition: "0 0, 10px 10px",
      }}
    >
      <div className="absolute top-12 left-0 right-0 flex justify-center z-20">
        <div className="flex items-center gap-6">
          <div className="h-12 w-3 rounded-r-md bg-gradient-to-b from-primary to-accent animate-pulse"></div>
          <div className="flex flex-col">
            <span className="text-5xl font-extrabold tracking-tight font-serif text-primary animate-fade-in">
              FocusFlow
            </span>
            <span className="text-sm text-muted-foreground font-mono tracking-wide italic animate-fade-in delay-300">
              Flow into productivity and clarity
            </span>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSignIn}
        className="relative bg-card p-8 rounded-lg shadow-xl max-w-md w-full flex flex-col gap-5 border z-10 backdrop-blur-sm mt-32"
        style={{
          backgroundImage: `
            url('${PATTERN_SVG}'),
            url('${GRID_PATTERN}')`,
          backgroundSize: "40px 40px, 25px 25px",
          backgroundPosition: "0 0, 5px 5px",
          backgroundBlendMode: "multiply",
          backgroundColor: "hsl(var(--card))",
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          Sign In to FocusFlow
        </h2>
        {error && (
          <div className="text-destructive text-center whitespace-pre-line text-sm bg-destructive/10 p-3 rounded border border-destructive/20">
            {error}
          </div>
        )}
        <Input
          type="email"
          placeholder="Email"
          required
          autoComplete="email"
          value={email}
          className="mb-2"
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
        />
        <Input
          type="password"
          placeholder="Password"
          required
          autoComplete="current-password"
          minLength={6}
          value={password}
          className="mb-2"
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
        <Button type="submit" className="mt-4" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
        <div className="text-sm text-center text-muted-foreground mt-2">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-primary underline hover:opacity-80 transition"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
