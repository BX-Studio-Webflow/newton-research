export interface DepartmentResponse {
  departments: Department[];
}

export interface Department {
  id: number;
  name: string;
  parent_id: null;
  child_ids: any[];
  jobs: Job[];
}

export interface Job {
  absolute_url: string;
  data_compliance: DataCompliance[];
  education: string;
  internal_job_id: number;
  location: Location;
  metadata: null;
  id: number;
  updated_at: Date;
  requisition_id: string;
  title: string;
  company_name: string;
}

export interface DataCompliance {
  type: string;
  requires_consent: boolean;
  requires_processing_consent: boolean;
  requires_retention_consent: boolean;
  retention_period: null;
  demographic_data_consent_applies: null;
}

export interface Location {
  name: string;
}
