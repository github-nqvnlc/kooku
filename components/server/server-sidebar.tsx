import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./server-header";

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: { id: serverId },
    include: {
      channel: {
        orderBy: {
          createdAt: "asc",
        },
      },
      member: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = server?.channel?.filter(
    (chn: { type: string }) => chn.type === ChannelType.TEXT
  );
  const audioChannels = server?.channel?.filter(
    (chn: { type: string }) => chn.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channel?.filter(
    (chn: { type: string }) => chn.type === ChannelType.VIDEO
  );

  const members = server?.member?.filter(
    (memb: { profileId: string }) => memb.profileId === profile.id
  );

  if (!server) return redirect("/");

  const role = server.member.find(
    (members) => members.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#202d36] bg-[#e9eaeb]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default ServerSidebar;
