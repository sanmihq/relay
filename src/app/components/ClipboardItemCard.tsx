"use client";

import { Button, Card, CardBody, CardFooter } from "@heroui/react";
import { ChevronDown, Clipboard, Trash2 } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import clsx from "clsx";
import fonts from "@/fonts/fonts";
import { Icon } from "./Icon";
import { toast } from "sonner";

// Types
type ClipboardItem = {
  id: string;
  content: string;
  type: string;
  created_at: string;
};

type ClipboardItemCardProps = {
  item: ClipboardItem;
  onDelete: (id: string) => void;
};

const getTimeAgo = (dateString: string) => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch {
    return "a while ago";
  }
};

export default function ClipboardItemCard({
  item,
  onDelete,
}: ClipboardItemCardProps) {
  const [expanded, setExpanded] = useState(false);

  const isLong = item.content.length > 100;

  const preview = useMemo(
    () =>
      isLong && !expanded ? `${item.content.slice(0, 100)}...` : item.content,
    [item.content, isLong, expanded],
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(item.content)
      .then(() =>
        toast.success("Copied to clipboard!", {
          description: "success",
        }),
      )
      .catch(console.error);
  }, [item.content]);

  const handleDelete = useCallback(() => {
    onDelete(item.id);
    toast.error("Item deleted", {});
  }, [item.id, onDelete]);

  return (
    <Card>
      <CardBody className="flex flex-col items-start p-4">
        <div className="flex w-full items-start justify-between gap-4">
          {/* Content */}
          <div className="min-w-0 flex-1">
            <div
              className={clsx(
                fonts.spaceMono.className,
                "text-xs break-words whitespace-pre-wrap text-gray-800",
                item.type === "code" &&
                  "rounded-lg bg-slate-100 p-3 dark:bg-slate-900",
              )}
            >
              {preview}
            </div>

            {isLong && (
              <button
                onClick={() => setExpanded((p) => !p)}
                className="mt-4 flex cursor-pointer items-center gap-1 text-xs text-purple-700 hover:underline"
              >
                {expanded ? "Show less" : "Show more"}
                <Icon
                  icon={ChevronDown}
                  className={clsx(
                    "h-4 w-4 transition-transform",
                    expanded && "rotate-180",
                  )}
                />
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row">
            <Button isIconOnly size="sm" variant="light" onClick={handleCopy}>
              <Icon icon={Clipboard} />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              color="danger"
              onClick={handleDelete}
            >
              <Icon icon={Trash2} />
            </Button>
          </div>
        </div>
      </CardBody>

      <CardFooter className="px-4 pb-3 text-[11px] text-slate-500 dark:text-slate-400">
        {getTimeAgo(item.created_at)}
      </CardFooter>
    </Card>
  );
}
