"use client";

import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
} from "@heroui/react";
import { Eye, EyeOff, Lock, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createRoom } from "@/lib/supabase/actions";

export default function CreateRoomModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [usePassword, setUsePassword] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleCreateRoom = async () => {
    if (!roomName.trim()) return;

    setIsCreating(true);
    try {
      const passwordToUse = usePassword ? password : null;
      const roomId = await createRoom(roomName, passwordToUse);

      // Navigate to the room page, it will handle the password prompt
      router.push(`/room/${roomId}`);

      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create room:", error);
    } finally {
      setIsCreating(false);
    }
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
              Create a New Room
            </ModalHeader>
            <ModalBody>
              <Input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                label={<span className="text-xs text-gray-700">Room Name</span>}
                labelPlacement="outside-top"
                placeholder="e.g., Design Sync"
                color="secondary"
                variant="bordered"
              />
              <Switch
                size="sm"
                color="secondary"
                isSelected={usePassword}
                onValueChange={setUsePassword}
                classNames={{
                  base: "flex flex-row-reverse items-center justify-between w-full max-w-md p-3 rounded-lg border cursor-pointer hover:bg-gray-100 data-[selected=true]:border-blue-500",
                }}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">
                    {usePassword ? "Password Protected" : "Open to Anyone"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {usePassword
                      ? "Only people with the password can join."
                      : "Anyone with the link can join and contribute."}
                  </p>
                </div>
              </Switch>
              {usePassword ? (
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
                  label={
                    <span className="text-xs text-gray-700">Room Password</span>
                  }
                  labelPlacement="outside-top"
                  placeholder="Enter room password"
                  type={isVisible ? "text" : "password"}
                  color="secondary"
                  variant="bordered"
                />
              ) : (
                <Card className="border border-[#fde35b] bg-[#fefce8]">
                  <CardBody className="flex flex-row items-center gap-2 text-[#ae8959]">
                    <TriangleAlert size={18} />
                    <p className="text-xs font-medium text-[#7a5c2b]">
                      Anyone with the link can view and add to this room.
                    </p>
                  </CardBody>
                </Card>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                onPress={handleCreateRoom}
                className="w-full text-sm font-semibold"
                isLoading={isCreating}
                disabled={isCreating || !roomName.trim()}
              >
                Create Room
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
