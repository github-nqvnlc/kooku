"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";
import { MemberRole } from "@prisma/client";
import qs from "query-string";

import {
  Check,
  Loader,
  Loader2,
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldClose,
  ShieldQuestion,
  UserX,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import axios from "axios";
import { useRouter } from "next/navigation";

const roleIconMap = {
  GUEST: <ShieldClose className="h-4 w-4 ml-5 text-slate-400 cursor-pointer" />,
  MODERATOR: <Shield className="h-4 w-4 ml-5 text-cyan-400 cursor-pointer" />,
  ADMIN: (
    <ShieldCheck className="h-4 w-4 ml-5 text-emerald-300 cursor-pointer" />
  ),
};

const MembersModal = () => {
  const router = useRouter();
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState("");

  const isModalOpen = isOpen && type === "members";
  const { server } = data as { server: ServerWithMembersWithProfiles };

  const onKick = async (memberId: string) => {
    try {
      setIsLoading(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.delete(url);

      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading("");
    }
  };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setIsLoading(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
          memberId: memberId,
        },
      });

      const response = await axios.patch(url, { role });

      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading("");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-[#55636c] dark:text-[#fbfbfb] overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Members your server
          </DialogTitle>
          <DialogDescription>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Have {server?.member.length} member in list of all the members of
              your server.
            </p>
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] px-6">
          {server?.member.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between mb-6"
            >
              <div key={member.id} className="flex items-center gap-x-2 ">
                <UserAvatar src={member.profile.imageUrl} />
                <div className="flex flex-col gap-y-0">
                  <div className="text-slate-700 dark:text-slate-100 text-md font-semibold">
                    {member.profile.name}
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-100 text-xs font-light">
                    {member.profile.email}
                  </div>
                </div>
                {roleIconMap[member.role]}
              </div>
              {server.profileId !== member.profile.id &&
                isLoading !== member.id && (
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-4 w-4 text-zinc-500 dark:text-zinc-200" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="h-4 w-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => onRoleChange(member.id, "GUEST")}
                              >
                                <ShieldClose className="h-4 w-4 mr-2 text-slate-400 cursor-pointer" />
                                Guest
                                {member.role === "GUEST" && (
                                  <Check className="h-4 w-4 ml-auto text-emerald-300 cursor-pointer" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id, "MODERATOR")
                                }
                              >
                                <Shield className="h-4 w-4 mr-2 text-cyan-400 cursor-pointer" />
                                Moderator
                                {member.role === "MODERATOR" && (
                                  <Check className="h-4 w-4 ml-auto text-emerald-300 cursor-pointer" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onRoleChange(member.id, "ADMIN")}
                              >
                                <ShieldCheck className="h-4 w-4 mr-2 text-emerald-300 cursor-pointer" />
                                Admin
                                {member.role === "ADMIN" && (
                                  <Check className="h-4 w-4 ml-auto text-emerald-300 cursor-pointer" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onKick(member.id)}
                          className="text-red-500 hover:bg-red-500 hover:text-slate-100"
                        >
                          <UserX className="h-4 w-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {isLoading === member.id && (
                <Loader2 className="animate-spin text-zinc-500 dark:text-slate-300 ml-auto w-4 h-4" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
