import { axiosInstance } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { FormSubmissionResponse } from "./api.types";

export const formSubmission = async (): Promise<FormSubmissionResponse> => {
 const { data }: { data: FormSubmissionResponse } = await axiosInstance.get(
  "/api/insurance/forms/submissions"
 );
 return data;
};

export const useFormSubmissionQuery = () => {
 return useQuery({
  queryKey: ["formSubmission"],
  queryFn: formSubmission,
  refetchOnWindowFocus: false,
  retry: 1,
 });
};
