"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@heroui/react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { validateAndSetCookie } from "@/lib/supabase/actions";

export default function PasswordPrompt({ roomId }: { roomId: string }) {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Call the server action to validate the password and set a cookie.
    const isValid = await validateAndSetCookie(roomId, password);

    if (isValid) {
      // If valid, refresh the page. The server component will now see the cookie.
      router.refresh();
    } else {
      setError("Incorrect password. Please try again.");
    }
    setIsSubmitting(false);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 rounded-lg border p-6 shadow-md">
        <h1 className="text-center text-xl font-bold">
          Room is Password Protected
        </h1>
        <p className="text-center text-sm text-gray-500">
          Enter the password to access the room.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-center text-sm text-red-500">{error}</p>}
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            startContent={<Lock size={16} strokeWidth={1.5} />}
            endContent={
              <button
                aria-label="toggle password visibility"
                className="cursor-pointer"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeOff size={16} strokeWidth={1.5} />
                ) : (
                  <Eye size={16} strokeWidth={1.5} />
                )}
              </button>
            }
            label={<span className="text-xs text-gray-700">Room Password</span>}
            labelPlacement="outside-top"
            placeholder="Enter password"
            type={isVisible ? "text" : "password"}
            color="secondary"
            variant="bordered"
          />
          <Button
            type="submit"
            color="secondary"
            className="w-full text-sm font-semibold"
            isLoading={isSubmitting}
            disabled={isSubmitting || !password}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
