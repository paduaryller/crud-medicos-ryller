// src/services/doctorService.js

import axios from 'axios';

const BASE_URL = 'https://apidev.minhaescala.app/v1/cfm';

export const createDoctor = async (doctorData) => {
  const options = {
    method: 'POST',
    url: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    data: {
      doctorName: doctorData.name,
      crm: doctorData.crm,
      crmUf: doctorData.crmUf,
      type: doctorData.type,
      status: doctorData.status,
      specialties: doctorData.specialties,
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error.response.data.message; // Lança o erro para ser tratado no componente
  }
};

export const validateDoctor = async (crm, crmUf) => {
  const options = {
    method: 'GET',
    url: BASE_URL,
    params: { crm, crmUf }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error.response.data.message; // Lança o erro para ser tratado no componente
  }
};
