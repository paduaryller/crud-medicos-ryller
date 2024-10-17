
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
        throw error;
      }
    },

    async validateDoctor(crm, crmUf) {
      try {
        const doctorData = await validateDoctor(crm, crmUf);
        Object.assign(this.localDoctor, doctorData);
      } catch (error) {
        throw error;
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
