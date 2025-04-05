import { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
 return <div className="w-full h-screen bg-gray-50">{children}</div>;
};

export default AppLayout;
