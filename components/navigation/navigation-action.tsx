"use client";

import { Plus } from "lucide-react";
import React from "react";
import ActionTootip from "@/components/action-tootip";

const NavigationAction = () => {
  return (
    <div>
      <ActionTootip label="Create a server" side="right" align="center">
        <button className="group flex items-center">
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-[#465158] group-hover:bg-[#02b099]">
            <Plus
              className="group-hover:text-white transition text-[#02b099]"
              size={25}
            />
          </div>
        </button>
      </ActionTootip>
    </div>
  );
};

export default NavigationAction;
