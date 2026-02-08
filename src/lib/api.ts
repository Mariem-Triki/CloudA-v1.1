"use client";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('cloud_armor_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
};

export const authApi = {
  login: (credentials: any) => apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  me: () => apiFetch('/auth/me'),
};

export const securityApi = {
  getFindings: () => apiFetch('/findings'),
  getAccounts: () => apiFetch('/accounts'),
  getContainerImages: () => apiFetch('/containers/images'),
  runScan: (type: string) => apiFetch(`/scans/${type}`, { method: 'POST' }),
};