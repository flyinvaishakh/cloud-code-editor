"use client";

import { getIconForFile } from "vscode-icons-js";
import { TFile } from "./types";
import Image from "next/image";

export default function SidebarFile({ data }: { data: TFile }) {
  return (
    <div className="w-full flex items-center h-6 transition-colors hover:text-muted-foreground cursor-pointer">
      <Image
        src={`/icons/${getIconForFile("index.html")}`}
        alt="File Icon"
        width={16}
        height={16}
        className="mr-2"
      />
      {data.name}
    </div>
  );
}
