"use client";

import { addToast, Button, Card, CardBody, CardFooter } from "@heroui/react";
import { ChevronDown, Clipboard, Copy, Trash, Trash2 } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import fonts from "@/fonts/fonts";

// Type definition for ClipboardItem
type ClipboardItem = {
  id: string;
  content: string;
  type: string;
  created_at: string;
};

// Component props with proper typing
type ClipboardItemCardProps = {
  item: ClipboardItem;
  onDelete: (id: string) => void;
};

export default function ClipboardItemCard({
  item,
  onDelete,
}: ClipboardItemCardProps) {
  const [expanded, setExpanded] = useState(false);

  const previewContent =
    item.content.length > 100
      ? `${item.content.substring(0, 100)}...`
      : item.content;

  const timeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "a while ago";
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(item.content)
      .then(() => {
        addToast({ title: "Copied to clipboard!", description: "success", color: "success" });
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  const handleDelete = () => {
    onDelete(item.id);
    addToast({ title: "Item deleted", description: "info", color: "danger"});
  };

  const isLongContent = item.content.length > 100;

  return (
    <Card>
      <CardBody className="flex flex-col items-start p-4">
        {/* Main content and action buttons */}
        <div className="flex w-full items-start justify-between gap-4">
          {/* Main content area */}
          <div className="min-w-0 flex-1">
            <div
              className={`${fonts.spaceMono.className} text-xs break-words whitespace-pre-wrap text-gray-800 ${item.type === "code" ? "rounded-lg bg-slate-100 p-3 dark:bg-slate-900" : ""}`}
            >
              {expanded ? item.content : previewContent}
            </div>
            {isLongContent && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-4 flex cursor-pointer items-center gap-1 text-xs text-purple-700 hover:underline"
              >
                {expanded ? "Show less" : "Show more"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                />
              </button>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row">
            <Button isIconOnly size="sm" variant="light" onClick={handleCopy}>
              <Clipboard size={14} />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              color="danger"
              onClick={handleDelete}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </CardBody>

      {/* Footer with timestamp */}
      <CardFooter className="px-4 pb-3 text-[11px] text-slate-500 dark:text-slate-400">
        {timeAgo(item.created_at)}
      </CardFooter>
    </Card>
  );
}
