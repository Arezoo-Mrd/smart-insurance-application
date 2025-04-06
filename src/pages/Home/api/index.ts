import { axiosInstance } from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DynamicFormData, GetStatesResponse } from "./api.types";

const getForms = async (): Promise<DynamicFormData[]> => {
 const { data }: { data: DynamicFormData[] } = await axiosInstance.get(
  "/api/insurance/forms"
 );
 return data;
};

const getStates = async (country: string): Promise<GetStatesResponse> => {
 const { data }: { data: GetStatesResponse } = await axiosInstance.get(
  "api/getStates",
  {
   params: {
    country,
   },
  }
 );
 return data;
};

const submitForm = async (body: unknown) => {
 const { data } = await axiosInstance.post("api/insurance/forms/submit", body);
 return data;
};

export const useFormQuery = () => {
 return useQuery({
  queryKey: ["forms"],
  queryFn: getForms,
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  refetchInterval: false,
  retry: 3,
  retryDelay: 1000,
 });
};

export const useStatesQuery = (country: string) => {
 return useQuery({
  queryKey: ["states", country],
  queryFn: () => getStates(country),
  enabled: Boolean(country),
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  refetchInterval: false,
  retry: 3,
  retryDelay: 1000,
 });
};

export const useSubmitFormMutation = () => {
 return useMutation({
  mutationFn: submitForm,
  mutationKey: ["submitForm"],
 });
};
