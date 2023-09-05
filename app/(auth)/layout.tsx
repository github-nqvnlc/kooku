import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-slate-700 h-full">{children}</div>;
};

export default AuthLayout;
