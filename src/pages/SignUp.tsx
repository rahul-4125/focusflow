
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const PATTERN_SVG = `data:image/svg+xml;utf8,<svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='30' cy='30' r='1' fill='%23000000' opacity='0.05'/><circle cx='0' cy='0' r='1' fill='%23000000' opacity='0.05'/><circle cx='60' cy='0' r='1' fill='%23000000' opacity='0.05'/><circle cx='0' cy='60' r='1' fill='%23000000' opacity='0.05'/><circle cx='60' cy='60' r='1' fill='%23000000' opacity='0.05'/></svg>`;
const GRID_PATTERN = `data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 20h40M20 0v40' stroke='%23000000' stroke-width='0.5' opacity='0.08'/></svg>`;

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpInfo, setOtpInfo] = useState<{ email: string } | null>(null);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }
    if (name.trim().length === 0) {
      setError("Please enter your name.");
      return;
    }
    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + "/",
        data: { name }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      if (
        signUpError.message?.toLowerCase().includes("user already registered") ||
        signUpError.message?.toLowerCase().includes("user already exists") ||
        signUpError.message?.toLowerCase().includes("already signed up")
      ) {
        toast({
          title: "Account already exists",
          description: "An account with this email already exists. Please sign in instead.",
          variant: "default",
        });
      } else {
        toast({
          title: "Sign up failed",
          description: signUpError.message,
          variant: "destructive",
        });
      }
      setLoading(false);
      return;
    }

    setLoading(false);
    setOtpInfo({ email });
    setShowOtp(true);
    toast({
      title: "Verify your email",
      description: "Check your inbox for a confirmation email. Click the link to activate your account, then sign in.",
      variant: "default",
    });
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
        onSubmit={handleSignUp}
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
          Create your account
        </h2>
        {error && (
          <div className="text-destructive text-center whitespace-pre-line text-sm bg-destructive/10 p-3 rounded border border-destructive/20">
            {error}
          </div>
        )}

        {showOtp ? (
          <div className="flex flex-col gap-6 items-center justify-center">
            <span className="text-base text-center text-muted-foreground mb-1">
              A verification link has been sent to <span className="font-semibold">{otpInfo?.email}</span>.
              <br />
              Please check your inbox (and spam folder) and click the verification link to activate your account.
            </span>
            <span className="text-xs text-muted-foreground text-center">
              After verifying your email, you can sign in using your email and password.
            </span>
            <Button
              type="button"
              variant="ghost"
              className="text-xs mt-2"
              onClick={() => { setShowOtp(false); }}
            >
              Back to Sign Up
            </Button>
            <Link to="/signin" className="mt-4 underline text-primary text-sm font-medium hover:opacity-80">Back to Sign In</Link>
          </div>
        ) : (
          <>
            <Input
              type="text"
              placeholder="Name"
              required
              value={name}
              className="mb-2"
              onChange={e => setName(e.target.value)}
              disabled={loading}
              autoComplete="name"
            />
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
              autoComplete="new-password"
              minLength={6}
              value={password}
              className="mb-2"
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />
            <Input
              type="password"
              placeholder="Re-enter password"
              required
              autoComplete="new-password"
              minLength={6}
              value={password2}
              className="mb-2"
              onChange={e => setPassword2(e.target.value)}
              disabled={loading}
            />
            <Button type="submit" className="mt-4" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
            <div className="text-sm text-center text-muted-foreground mt-2">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-medium text-primary underline hover:opacity-80 transition"
              >
                Sign in
              </Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
