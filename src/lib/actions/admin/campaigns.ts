import { Campaign, CampaignsResponse, CampaignResponse, CampaignStatistics } from '@/types/campaigns';
import {getAuthToken} from "@/lib/actions/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface GetCampaignsParams {
  page?: number;
  per_page?: number;
  is_active?: boolean;
  ongoing?: boolean;
  upcoming?: boolean;
  keyword?: string;
  sort?: 'starts' | 'ends' | 'created_at' | 'start' | 'end';
  order?: 'asc' | 'desc';
}

export async function getCampaigns(
    params: GetCampaignsParams = {}
): Promise<CampaignsResponse> {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  });

  const response = await fetch(`${API_BASE_URL}/campaigns?${queryParams}`);

  return response.json();
}

export async function getCampaign(id: string): Promise<CampaignResponse> {
  const response = await fetch(`${API_BASE_URL}/campaigns/${id}`);

  return response.json();
}

export async function createCampaign(data: FormData): Promise<CampaignResponse> {
    const token = await getAuthToken();
  const response = await fetch(`${API_BASE_URL}/admin/campaigns`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: data,
  });

  return response.json();
}

export async function updateCampaign(id: string, data: FormData): Promise<CampaignResponse> {
    const token = await getAuthToken();
  data.append('_method', 'PATCH');

  const response = await fetch(`${API_BASE_URL}/admin/campaigns/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: data,
  });

  return response.json();
}

export async function deleteCampaign(id: string): Promise<CampaignResponse> {
    const token = await getAuthToken();

  const response = await fetch(`${API_BASE_URL}/admin/campaigns/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function toggleCampaignStatus(id: string): Promise<CampaignResponse> {
    const token = await getAuthToken();

  const response = await fetch(`${API_BASE_URL}/admin/campaigns/${id}/toggle-status`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function getCampaignStatistics(id: string): Promise<{
  data: {
    campaign: Campaign;
    statistics: CampaignStatistics;
  };
}> {
  const response = await fetch(`${API_BASE_URL}/campaigns/${id}/statistics`);

  return response.json();
}