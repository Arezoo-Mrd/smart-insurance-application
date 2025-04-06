import { ReactNode } from "react";

interface WrapperProps {
 id: string;
 label: string;
 required?: boolean;
 error?: string;
 children: ReactNode;
}

const Wrapper = ({ id, label, required, error, children }: WrapperProps) => {
 return (
  <div className="mb-4">
   <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
    {label}
    {required && <span className="text-red-500 ml-1">*</span>}
   </label>
   {children}
   {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
 );
};

export default Wrapper;
