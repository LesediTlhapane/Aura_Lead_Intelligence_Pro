export interface LeadSubmission {
  workspace_id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service_interest: string;
  project_type: string;
  budget: string;
  urgency: string;
  message: string;
  source: string;
}

export interface LeadQualificationResponse {
  success: boolean;
  lead_id?: string;
  workspace_id?: string;
  score?: number;
  classification?: 'HOT' | 'WARM' | 'COLD';
  confidence?: number;
  reasons?: string[];
  signals?: string[];
  recommended_action?: string;
  message?: string;
  error?: string;
  detail?: string;
}

export async function submitLeadToAura(
  lead: LeadSubmission,
  webhookUrl: string
): Promise<LeadQualificationResponse> {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lead),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.detail ||
      data?.error ||
      `Request failed with status ${response.status}`
    );
  }

  return data;
}