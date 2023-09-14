"use client";

import React from "react";
import CreateServerModal from "@/components/modals/create-server-modal";
import InviteModal from "../modals/invite-modal";
import EditServerModal from "../modals/edit-server-modal";
import MembersModal from "../modals/members-modal";
import CreateChannelModal from "../modals/create-channel-modal";
import LeaveServerModal from "../modals/leave-server-modal";
import DeleteServerModal from "../modals/delete-server-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LeaveServerModal />
      <DeleteServerModal />
      <CreateServerModal />
      <InviteModal />
      <MembersModal />
      <EditServerModal />
      <CreateChannelModal />
    </>
  );
};
