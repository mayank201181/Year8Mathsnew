"use client";
import { ErrorFallback } from "@/components/ErrorFallback";

export default function GlobalError({ error, retry, reset }: { error: Error & { digest?: string }; retry?: () => void; reset?: () => void }) {
  return (
    <html lang="en-GB">
      <body>
        <ErrorFallback error={error} onRetry={retry ?? reset} />
      </body>
    </html>
  );
}
