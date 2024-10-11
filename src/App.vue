<template>
  <v-app>
    <v-container>
      <!-- Componente DoctorTable -->
      <doctor-table
      ></doctor-table>

    </v-container>
  </v-app>
</template>

<script>
import DoctorTable from './components/DoctorTable.vue';

export default {
  components: {
    DoctorTable,
  },
};
</script>
