import { useState, useTransition } from "react";

export function useSaveAction() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);

  function run(fn: () => Promise<void>) {
    setError(undefined);
    setSuccess(false);
    startTransition(async () => {
      try {
        await fn();
        setSuccess(true);
      } catch {
        setError("Failed to save. Try again.");
      }
    });
  }

  return { pending, error, success, run };
}
