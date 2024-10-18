// src/stores/doctorStore.js

import { defineStore } from 'pinia';
import { createDoctor, validateDoctor } from '@/network/services/doctorService';

export const useDoctorStore = defineStore('doctor', {
  state: () => ({
    doctors: [],
    localDoctor: {
      name: '',
      crm: '',
      crmUf: '',
      type: '',
      status: '',
      specialties: [],
    },
    types: ['Principal', 'Secundária'],
    statuses: ['Ativo', 'Cancelado'],
    specialties: [],
    isEditMode: false,
  }),
  actions: {
    async addDoctor(doctorData) {
      try {
        await createDoctor(doctorData);
        this.doctors.push({ ...doctorData });
        this.resetLocalDoctor();
      } catch (error) {
        console.error('Erro ao adicionar o médico:', error);  // Tratar erro de forma útil
        throw new Error('Não foi possível adicionar o médico.'); // Retornar erro com mensagem útil
      }
    },

    async validateDoctor(crm, crmUf) {
      try {
        const doctorData = await validateDoctor(crm, crmUf);
        Object.assign(this.localDoctor, doctorData);
      } catch (error) {
        console.error('Erro ao validar o médico:', error);  // Tratar erro de forma útil
        throw new Error('Não foi possível validar o médico.'); // Retornar erro com mensagem útil
      }
    },

    setEditMode(doctor) {
      this.isEditMode = true;
      this.localDoctor = { ...doctor };
    },

    resetLocalDoctor() {
      this.localDoctor = {
        name: '',
        crm: '',
        crmUf: '',
        type: '',
        status: '',
        specialties: [],
      };
      this.isEditMode = false;
    },
  },
});
