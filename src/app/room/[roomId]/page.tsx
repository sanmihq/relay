import Room from "@/app/components/Room";
import { notFound } from "next/navigation";
import { getRoomValidationStatus } from "@/lib/supabase/actions";
import PasswordPrompt from "./PasswordPrompt";

export default async function RoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  const { roomId } = params;

  // Use the new server action to get the room's status.
  const status = await getRoomValidationStatus(roomId);

  if (!status.found) {
    // If the room doesn't exist, show a 404 page.
    notFound();
  }

  if (status.passwordValid) {
    // If the password is valid (or not needed), render the room.
    return <Room roomId={roomId} />;
  }

  // If a password is required but not provided or is invalid,
  // render the client component that prompts for the password.
  return <PasswordPrompt roomId={roomId} />;
}
