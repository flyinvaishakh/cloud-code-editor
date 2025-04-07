"use client";

import {
  Code2,
  FolderDot,
  HelpCircle,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import CustomButton from "../ui/customButton";
import { Button } from "../ui/button";
import { useState } from "react";

import type { VirtualBox} from "@/lib/schemas";

import DashboardSharedWithMe from "./shared";
import DashboardProjects from "./projects";

type TScreen = "projects" | "shared" | "settings" | "search";

export default function Dashboard({ virtualboxes }: { virtualboxes: VirtualBox[] }) {
  const [screen, setScreen] = useState<TScreen>("projects");

  const activeScreen = (s: TScreen) => {
    if (screen === s) return "justify-start";
    else return "justify-start font-normal text-muted-foreground";
  };

  return (
    <div className="flex shrink-0 grow w-full">
      <div className="w-56 border-r border-border p-4 justify-between flex flex-col">
        <div className="flex flex-col">
          <CustomButton className="mb-4">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </CustomButton>
          <Button
            variant={"ghost"}
            onClick={() => setScreen("projects")}
            className={activeScreen("projects")}
          >
            <FolderDot className="w-4 h-4 mr-2" />
            My Projects
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => setScreen("shared")}
            className={activeScreen("shared")}
          >
            <Users className="w-4 h-4 mr-2" />
            Shared With Me
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => setScreen("settings")}
            className={activeScreen("settings")}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
        <div className="flex flex-col">
          <Button
            variant={"ghost"}
            className="justify-start font-normal text-muted-foreground"
          >
            <Code2 className="w-4 h-4 mr-2" />
            Github Repo
          </Button>
          <Button
            variant={"ghost"}
            className="justify-start font-normal text-muted-foreground"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            About
          </Button>
        </div>
      </div>
      {screen === "projects" ? (
        <DashboardProjects virtualboxes={virtualboxes} />
      ) : screen === "shared" ? (
        <DashboardSharedWithMe virtualboxes={virtualboxes} />
      ) : screen === "settings" ? null : null}
    </div>
  );
}
