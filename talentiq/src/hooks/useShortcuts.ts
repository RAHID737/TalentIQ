"use client";
import { useEffect } from "react";

export function useShortcuts(actions: { [key: string]: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const combo = `${e.ctrlKey ? "Ctrl+" : ""}${e.shiftKey ? "Shift+" : ""}${e.key.toLowerCase()}`;
      if (actions[combo]) {
        e.preventDefault();
        actions[combo]();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [actions]);
}

