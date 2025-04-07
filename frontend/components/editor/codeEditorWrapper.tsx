"use client";

import dynamic from "next/dynamic";
import { useClerk } from "@clerk/nextjs";

const CodeEditor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

export default function CodeEditorWrapper() {
  const clerk = useClerk();

  return <>{clerk.loaded ? <CodeEditor /> : null}</>;
}
