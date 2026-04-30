const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function getApiUrl() {
  return API_URL;
}

export async function apiCall(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return response.json();
}

export default {
  getApiUrl,
  apiCall,
};
