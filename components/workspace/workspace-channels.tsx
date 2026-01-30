"use client";

import React from "react";
import type { WorkspaceWithChannels } from "@/types";
import { Plus, Edit, Trash } from "lucide-react";
import { MemberRole, Channel } from "@prisma/client";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter, useParams } from "next/navigation";
import clsx from "clsx";
import { ActionTooltip } from "@/components/action-tooltip";

interface WorkspaceChannelsProps {
  workspace: WorkspaceWithChannels;
  role?: MemberRole;
}

export const WorkspaceChannels = ({
  workspace,
  role,
}: WorkspaceChannelsProps) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const onChannelClick = (id: string) => {
    router.push(`/workspaces/${workspace.id}/channels/${id}`);
  };

  const onAction = (e: React.MouseEvent, action: string, channel: Channel) => {
    e.stopPropagation();
    onOpen(action as any, { channel, workspace });
  };

  return (
    <div className="text-sm">
      <div className="text-zinc-300">Channels</div>
      <div className="mt-2">
        {workspace.channels.map((channel) => (
          <div
            key={channel.id}
            onClick={() => onChannelClick(channel.id)}
            className={clsx(
              "group flex items-center text-zinc-300 py-1 px-2 hover:bg-[#3b1f40] dark:hover:bg-[#2a162d] rounded-lg cursor-pointer",
              {
                "bg-[#5F2465] text-white hover:bg-[#5F2465] hover:dark:bg-[#5F2465]":
                  params?.channelId === channel.id,
              }
            )}
          >
            <div className="mr-2">#</div>
            <div className="flex-1 truncate">{channel.name}</div>
            {channel.name !== "general" && role !== MemberRole.GUEST && (
              <div className="ml-auto flex items-center gap-x-2">
                <ActionTooltip label="Edit">
                  <Edit
                    onClick={(e) => onAction(e, "editChannel", channel)}
                    className="hidden group-hover:block w-3 h-3 text-zinc-400 hover:text-white transition"
                  />
                </ActionTooltip>
                <ActionTooltip label="Delete">
                  <Trash
                    onClick={(e) => onAction(e, "deleteChannel", channel)}
                    className="hidden group-hover:block w-3 h-3 text-zinc-400 hover:text-rose-500 transition"
                  />
                </ActionTooltip>
              </div>
            )}
          </div>
        ))}
        {role !== MemberRole.GUEST && (
          <button
            onClick={() => onOpen("createChannel", { workspace })}
            className="flex items-center py-1 px-2 hover:bg-[#3b1f40] dark:hover:bg-[#2a162d] mt-1 text-zinc-300 rounded-lg cursor-pointer w-full"
          >
            <div className="p-1 -ml-1 mr-2 rounded-sm bg-[#3C253F]">
              <Plus className="w-3 h-3" />
            </div>
            <div>Add Channels</div>
          </button>
        )}
      </div>
    </div>
  );
};
