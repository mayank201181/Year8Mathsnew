"use client";
import { useEffect } from "react";
import { ErrorFallback } from "@/components/ErrorFallback";

export default function ErrorPage({ error, retry, reset }: { error: Error & { digest?: string }; retry?: () => void; reset?: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <ErrorFallback error={error} onRetry={retry ?? reset} />;
}
