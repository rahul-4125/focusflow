
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === "signup") {
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
      setMode("login");
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
        <h2 className="text-2xl font-bold text-center mb-2">
          {mode === "login" ? "Login to FocusFlow" : "Create your account"}
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
            ? mode === "login"
              ? "Logging in..."
              : "Signing up..."
            : mode === "login"
              ? "Login"
              : "Sign Up"}
        </Button>
        <div className="text-sm text-center text-muted-foreground mt-2">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
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
                onClick={() => setMode("login")}
                className="font-medium text-primary underline hover:opacity-80 transition"
              >
                Login
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
