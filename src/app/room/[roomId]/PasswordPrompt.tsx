"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { validateAndSetCookie } from "@/lib/supabase/actions";
import fonts from "@/fonts/fonts";
import { Icon } from "@/app/components/Icon";
import { toast } from "sonner";

export default function PasswordPrompt({ roomId }: { roomId: string }) {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.warning("Password required", {
        description: "Please enter the room password.",
      });
      return;
    }
    setIsSubmitting(true);
    setError(null);

    const isValid = await validateAndSetCookie(roomId, password);

    if (isValid) {
      router.refresh();
    } else {
      toast.error("Invalid credentials", {
        description: "Incorrect password. Please try again.",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardBody className="space-y-4 p-6">
          <h1 className="text-center text-xl font-bold">
            Room is Password Protected
          </h1>
          <p className="text-center text-sm text-gray-500">
            Enter the password to access the room.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-center text-sm text-red-500">{error}</p>
            )}
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              startContent={<Icon icon={Lock} size={16} strokeWidth={1.5} />}
              endContent={
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="cursor-pointer"
                >
                  <Icon
                    icon={isVisible ? EyeOff : Eye}
                    size={16}
                    strokeWidth={1.5}
                  />
                </button>
              }
              label={
                <span className="text-xs text-gray-700">Room Password</span>
              }
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
              {isSubmitting ? "Validating..." : "Enter Room"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
