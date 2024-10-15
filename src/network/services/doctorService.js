// src/network/services/doctorService.js

import axios from 'axios';

const BASE_URL = 'https://apidev.minhaescala.app/v1/cfm';

const apiRequest = async (method, url, data = {}, params = {}) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      headers: { 'Content-Type': 'application/json' },
      data,
      params,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erro inesperado';
  }
};

export const createDoctor = (doctorData) => {
  return apiRequest('POST', '/', {
    doctorName: doctorData.name,
    crm: doctorData.crm,
    crmUf: doctorData.crmUf,
    type: doctorData.type,
    status: doctorData.status,
    specialties: doctorData.specialties,
  });
};

export const validateDoctor = (crm, crmUf) => {
  return apiRequest('GET', '/', {}, { crm, crmUf });
};
