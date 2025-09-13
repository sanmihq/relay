"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import ClipboardItemCard from "./ClipboardItemCard";
import { createClient } from "@/lib/supabase/client";

// Define the type for the items, which should match your Supabase schema
type ClipboardItem = {
  id: string;
  content: string;
  type: string;
  created_at: string;
};

// Define props for the new Room component
type RoomProps = {
  roomId: string;
};

export default function Room({ roomId }: RoomProps) {
  const [items, setItems] = useState<ClipboardItem[]>([]);
  const [inputContent, setInputContent] = useState("");
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // 1. Fetch initial data
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("clipboard_items")
        .select("*")
        .eq("room_id", roomId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching data:", error);
        addToast({ title: "Error fetching data", description: "danger" });
      } else {
        setItems(data as ClipboardItem[]);
      }
    };

    // 2. Subscribe to clipboard item changes (for instant updates)
    const clipboardChannel = supabase
      .channel(`clipboard_items_${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "clipboard_items",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setItems((currentItems) => [
            payload.new as ClipboardItem,
            ...currentItems,
          ]);
        },
      )
      .subscribe();

    // 3. Subscribe to room deletion (for auto-redirect)
    const roomChannel = supabase
      .channel(`room_deletion_${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "rooms",
          filter: `id=eq.${roomId}`,
        },
        () => {
          router.push("/");
        },
      )
      .subscribe();

    fetchItems();

    return () => {
      supabase.removeChannel(clipboardChannel);
      supabase.removeChannel(roomChannel);
    };
  }, [supabase, roomId, router]);

  const handleCreateItem = async () => {
    if (!inputContent.trim()) return;

    const { error } = await supabase.from("clipboard_items").insert({
      content: inputContent,
      room_id: roomId,
      type: "text",
    });

    if (error) {
      console.error("Error adding item:", error);
      addToast({ title: "Error creating item", description: "danger" });
    } else {
      setInputContent("");
    }
  };

  const handleDeleteItem = async (id: string) => {
    const { error } = await supabase
      .from("clipboard_items")
      .delete()
      .eq("id", id);
    if (error) {
      console.error("Error deleting item:", error);
      addToast({ title: "Error deleting item", description: "danger" });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-8">
      <h1 className="text-3xl font-bold">
        Room: <span className="uppercase">{roomId}</span>
      </h1>
      <p className="text-muted-foreground">Share content in real-time.</p>
      <div className="w-full max-w-2xl space-y-8">
        <Textarea
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          color="secondary"
          variant="bordered"
          placeholder="Paste or type here..."
          endContent={
            <Button
              size="sm"
              isIconOnly
              color="secondary"
              onPress={handleCreateItem}
            >
              <Plus size={18} />
            </Button>
          }
          className="bg-white"
        />
        <div className="space-y-4">
          {items.map((item) => (
            <ClipboardItemCard
              key={item.id}
              item={item}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
