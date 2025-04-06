interface Row {
 id: string;
 "Full Name": string;
 Age: number;
 Gender: string;
 "Insurance Type": string;
 City: string;
}

export interface FormSubmissionResponse {
 columns: string[];
 data: Row[];
}
