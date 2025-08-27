"use client";
import { useEffect, useRef, useState } from "react";

type SpeechRecognitionConstructor = new () => SpeechRecognition;

export function VoiceNote({ onChange }: { onChange: (text: string) => void }) {
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SR: SpeechRecognitionConstructor | undefined =
      (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition ||
      (window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor }).SpeechRecognition;
    if (SR) {
      const instance = new SR();
      instance.continuous = true;
      instance.interimResults = true;
      instance.onresult = (event: SpeechRecognitionEvent) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        onChange(transcript);
      };
      instance.onend = () => setRecording(false);
      recognitionRef.current = instance;
    }
  }, [onChange]);

  function toggle() {
    const rec = recognitionRef.current;
    if (!rec) return alert("Voice recognition not supported in this browser");
    if (recording) {
      rec.stop();
      setRecording(false);
    } else {
      rec.start();
      setRecording(true);
    }
  }

  return (
    <button
      onClick={toggle}
      className={`px-3 py-2 rounded ${recording ? "bg-red-600 text-white" : "bg-gray-200"}`}
      aria-pressed={recording}
    >
      {recording ? "Stop Recording" : "Start Voice Note"}
    </button>
  );
}

