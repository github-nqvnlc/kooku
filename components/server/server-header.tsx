"use client";
import React from "react";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  LogOutIcon,
  PlusSquareIcon,
  Settings,
  Trash,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerate = isAdmin || role === MemberRole.MODERATOR;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button
          className="
          w-full 
          text-md 
          font-semibold 
          px-3 flex 
          items-center 
          h-12 
          border-[#cbd0d2]
          dark:border-[#55636c]
          border-b-2
          hover:bg-[#bfc4c8]
          dark:hover:bg-[#30414c]
          transition
        "
        >
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="
          w-56
          text-xs
          font-medium
          outline-none
          border-0
        text-black
        dark:text-neutral-100
        dark:bg-[#30414c]
          space-y-[2px]"
      >
        {isModerate && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className="
            text-[#017b6b]
            focus:bg-[#e4e6e8]
            hover:bg-[#e4e6e8]
            dark:hover:bg-[#465158]
            dark:focus:bg-[#465158]
            hover:text-[#2dbdaa]
            dark:text-[#97dfd5]
              px-3
              py-2
              text-sm
              cursor-pointer
            "
          >
            Invite people
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("editServer", { server })}
            className="
            focus:bg-[#e4e6e8]
            hover:bg-[#e4e6e8]
            dark:hover:bg-[#465158]
            dark:focus:bg-[#465158]
              px-3
              py-2
              text-sm
              cursor-pointer
            "
          >
            Server setting
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className="
            focus:bg-[#e4e6e8]
            hover:bg-[#e4e6e8]
            dark:hover:bg-[#465158]
            dark:focus:bg-[#465158]
              px-3
              py-2
              text-sm
              cursor-pointer
            "
          >
            Manage members
            <Users className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerate && (
          <DropdownMenuItem
            className="
            focus:bg-[#e4e6e8]
            hover:bg-[#e4e6e8]
            dark:hover:bg-[#465158]
            dark:focus:bg-[#465158]
              px-3
              py-2
              text-sm
              cursor-pointer
            "
          >
            Create channel
            <PlusSquareIcon className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isModerate && <DropdownMenuSeparator className="bg-[#465158]" />}
        {isAdmin && (
          <DropdownMenuItem
            className="
            focus:bg-[#e4e6e8]
            hover:bg-[#e4e6e8]
            dark:hover:bg-[#465158]
            text-[#fd9696]
            dark:focus:bg-[#fd6b6b]
              px-3
              py-2
              text-sm
              cursor-pointer
            "
          >
            Delete server
            <Trash2 className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            className="
            focus:bg-[#e4e6e8]
            hover:bg-[#e4e6e8]
            dark:hover:bg-[#465158]
            text-[#fd9696]
            dark:focus:bg-[#fd6b6b]
              px-3
              py-2
              text-sm
              cursor-pointer
            "
          >
            Leave server
            <LogOutIcon className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
