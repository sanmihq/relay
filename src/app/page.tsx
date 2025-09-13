"use client";

import { Plus } from "lucide-react";
import FeaturesSection from "./components/FeaturesSection";
import { Button, useDisclosure } from "@heroui/react";
import CreateRoomModal from "./components/CreateRoomModal";
import JoinRoomModal from "./components/JoinRoomModal";

export default function Home() {
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onOpenChange: onCreateOpenChange,
  } = useDisclosure();

  const {
    isOpen: isJoinOpen,
    onOpen: onJoinOpen,
    onOpenChange: onJoinOpenChange,
  } = useDisclosure();

  return (
    <div className="grid h-screen place-items-center text-center">
      <div className="flex flex-col items-center">
        <h1 className="text-7xl font-black">Relay</h1>
        <p className="text-md mt-4 w-xl text-black/70 dark:text-white/70">
          Seamlessly share your clipboard across devices. Instant, private, and
          ridiculously simple.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            startContent={<Plus size={18} />}
            radius="full"
            color="secondary"
            size="lg"
            className="text-sm font-semibold"
            onPress={onCreateOpen}
          >
            Create Room
          </Button>
          <Button
            radius="full"
            size="lg"
            className="text-sm font-semibold"
            onPress={onJoinOpen}
          >
            Join Room
          </Button>
        </div>
      </div>

      <FeaturesSection />

      <CreateRoomModal
        isOpen={isCreateOpen}
        onOpenChange={onCreateOpenChange}
      />
      <JoinRoomModal isOpen={isJoinOpen} onOpenChange={onJoinOpenChange} />
    </div>
  );
}
