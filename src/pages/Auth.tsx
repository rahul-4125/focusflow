
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Placeholder logo image URL (can replace with your own later)
const LOGO_URL = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=120&h=120&fit=crop";

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === "sign-up") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + "/",
        },
      });
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setMode("sign-in");
    } else {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (loginError) {
        setError(loginError.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg shadow-xl max-w-md w-full flex flex-col gap-5 border">
        {/* LOGO */}
        <div className="flex flex-col items-center mb-1">
          <img src={LOGO_URL} alt="FocusFlow logo" className="mb-3 w-16 h-16 rounded-xl object-cover shadow-sm border" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">
          {mode === "sign-in" ? "Sign In to FocusFlow" : "Create your account"}
        </h2>
        {error && <div className="text-destructive text-center">{error}</div>}
        <Input
          type="email"
          placeholder="Email"
          required
          autoComplete="email"
          value={email}
          className="mb-2"
          onChange={e => setEmail(e.target.value)}
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
        />
        <Button
          type="submit"
          className="mt-4"
          disabled={loading}
        >
          {loading
            ? mode === "sign-in"
              ? "Signing in..."
              : "Signing up..."
            : mode === "sign-in"
              ? "Sign In"
              : "Sign Up"}
        </Button>
        <div className="text-sm text-center text-muted-foreground mt-2">
          {mode === "sign-in" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("sign-up")}
                className="font-medium text-primary underline hover:opacity-80 transition"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("sign-in")}
                className="font-medium text-primary underline hover:opacity-80 transition"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
