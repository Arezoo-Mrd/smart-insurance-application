import SubmittedApplication from "@/Components/SubmittedApplication";
import { useFormSubmissionQuery } from "./api";
import Loading from "@/Components/Loading";

const SubmittedApplicationPage = () => {
 const { data, isLoading } = useFormSubmissionQuery();

 return isLoading ? (
  <div className="w-full  h-full flex items-center justify-center">
   <Loading />
  </div>
 ) : (
  <SubmittedApplication data={data} />
 );
};

export default SubmittedApplicationPage;
