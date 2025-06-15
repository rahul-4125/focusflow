
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

// Import the logo SVG (for inline img src)
import focusflowLogo from "@/assets/focusflow-logo.svg";

// Pattern SVG background (optional geometrical subtle pattern)
const PATTERN_SVG =
  "data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='20' cy='20' r='1.5' fill='%239ca3af' opacity='0.1'/></svg>";

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState(""); // New: re-enter password
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [showOtp, setShowOtp] = useState(false);
  const [otpValue, setOtpValue] = useState(""); // just for demo (since Supabase uses magic link)
  const [otpInfo, setOtpInfo] = useState<{ email: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Password match validation (only for sign-up)
    if (mode === "sign-up" && password !== password2) {
      setError("Passwords do not match.");
      return;
    }

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
      setOtpInfo({ email });
      setShowOtp(true);
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

  // Reset OTP on mode switch
  function handleModeSwitch(newMode: "sign-in" | "sign-up") {
    setError(null);
    setShowOtp(false);
    setOtpValue("");
    setMode(newMode);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden"
      style={{
        // Pattern 1: subtle circle grid
        backgroundImage: `
          url('${PATTERN_SVG}'),
          repeating-linear-gradient(135deg,rgba(55,84,230,0.04) 0px,rgba(55,84,230,0.06) 4px,transparent 4px,transparent 28px)`,
        backgroundSize: "40px 40px, 48px 48px",
        backgroundPosition: "center, center",
      }}
    >
      {/* Tiled SVG logo in the absolute background */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url('${focusflowLogo}')`,
          backgroundRepeat: "repeat",
          backgroundSize: "80px 80px",
          backgroundPosition: "center",
        }}
      />
      <form
        onSubmit={handleSubmit}
        className="relative bg-card p-8 rounded-lg shadow-xl max-w-md w-full flex flex-col gap-5 border z-10 backdrop-blur-sm"
      >
        {/* Logo above form */}
        <div className="flex flex-col items-center mb-1">
          <img
            src={focusflowLogo}
            alt="FocusFlow logo"
            className="mb-3 w-16 h-16 rounded-xl object-cover shadow-sm border"
            draggable={false}
          />
        </div>
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-2 drop-shadow logo-text">
          {mode === "sign-in" ? "Sign In to FocusFlow" : "Create your account"}
        </h2>
        {/* Error/Status */}
        {error && (
          <div className="text-destructive text-center whitespace-pre-line">
            {error}
          </div>
        )}
        {/* OTP UI */}
        {showOtp ? (
          <div className="flex flex-col gap-6 items-center justify-center">
            <span className="text-base text-center text-muted-foreground mb-1">
              Enter the 6-digit code sent to{" "}
              <span className="font-semibold">{otpInfo?.email}</span>
              <br />
              (Check your email. Mark as not spam if needed.)
            </span>
            {/* OTP Input */}
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={setOtpValue}
              containerClassName="justify-center"
              disabled // disabled since confirmation is actually by email link in Supabase
            >
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <span className="text-xs text-muted-foreground">
              {/* Since this is just UI for now */}
              Please click the confirmation link in your email to activate your account.
            </span>
            <Button
              type="button"
              variant="ghost"
              className="text-xs mt-2"
              onClick={() => handleModeSwitch("sign-in")}
            >
              Back to Sign In
            </Button>
          </div>
        ) : (
          <>
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
              autoComplete={
                mode === "sign-in" ? "current-password" : "new-password"
              }
              minLength={6}
              value={password}
              className="mb-2"
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />
            {mode === "sign-up" && (
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
            )}
            <Button type="submit" className="mt-4" disabled={loading}>
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
                    onClick={() => handleModeSwitch("sign-up")}
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
                    onClick={() => handleModeSwitch("sign-in")}
                    className="font-medium text-primary underline hover:opacity-80 transition"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
