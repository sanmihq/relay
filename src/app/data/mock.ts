// import { ClipboardItem } from "@/app/components/";

// The mock data array contains various types of clipboard items.
// This allows you to test different styling and functionality.
export const mockClipboardItems = [
  {
    id: "item_1",
    content: "This is a short text item to test the component's basic layout.",
    type: "text",
    created_at: "2025-09-13T09:00:00Z", // Just now
  },
  {
    id: "item_2",
    content: `
      // This is a code snippet.
      function greet(name) {
        console.log(\`Hello, \${name}!\`);
      }
      
      greet("World");
    `,
    type: "code",
    created_at: "2025-09-13T08:55:00Z", // A few minutes ago
  },
  {
    id: "item_3",
    content:
      "This is a link: https://www.example.com/long-url-to-test-overflow-and-line-breaks-with-a-very-long-string-that-should-span-multiple-lines-in-the-display-area",
    type: "text",
    created_at: "2025-09-13T08:00:00Z", // An hour ago
  },
  {
    id: "item_4",
    content:
      "This is a very long text item that is designed to test the 'show more' and 'show less' functionality. It needs to be longer than 100 characters to trigger the preview. This will help us verify that the truncation logic works as expected and the UI handles the expansion properly without any layout shifts or errors. It's an important test case for a seamless user experience.",
    type: "text",
    created_at: "2025-09-12T10:00:00Z", // Yesterday
  },
  {
    id: "item_5",
    content: "Another short text to ensure the list renders correctly.",
    type: "text",
    created_at: "2025-09-12T09:00:00Z", // A day ago
  },
];
