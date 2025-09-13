"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  addToast,
} from "@heroui/react";
import { Eye, EyeOff, Hash, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// We don't need to import findRoom anymore.

export default function JoinRoomModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleJoinRoom = async () => {
    if (!roomId.trim()) {
      addToast({
        title: "Error",
        description: "Please enter a Room ID.",
        color: "danger",
      });
      return;
    }

    setIsJoining(true);

    // Now, we'll just redirect to the room page directly.
    // The RoomPage will handle the validation (checking if the room exists and if a password is required).
    router.push(`/room/${roomId}`);
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="top-center"
      backdrop="blur"
      onOpenChange={onOpenChange}
    >
      <ModalContent className="w-full max-w-sm py-4">
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center text-xl font-bold">
              Join an Existing Room
            </ModalHeader>
            <ModalBody>
              <Input
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                startContent={<Hash size={16} strokeWidth={1.5} />}
                label={<span className="text-xs text-gray-700">Room ID</span>}
                labelPlacement="outside-top"
                placeholder="Enter Room ID"
                color="secondary"
                variant="bordered"
              />
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
                label={<span className="text-xs text-gray-700">Password</span>}
                labelPlacement="outside-top"
                placeholder="Enter password if required"
                type={isVisible ? "text" : "password"}
                color="secondary"
                variant="bordered"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleJoinRoom();
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                onPress={handleJoinRoom}
                className="w-full text-sm font-semibold"
                disabled={!roomId.trim() || isJoining}
                isLoading={isJoining}
              >
                Join Room
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
