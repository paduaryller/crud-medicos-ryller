<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="doctors"
      :sort-by="[{ key: 'name', order: 'asc' }]"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Gerenciamento de médicos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500">
            <template #activator="{ props }">
              <v-btn class="mb-2" color="primary" dark v-bind="props">
                Adicionar Médico
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5">
                {{ isEditMode ? 'Visualizar Médico' : 'Criar Médico' }}
              </v-card-title>
              <v-card-text>
                <v-form ref="form" @submit.prevent="submitForm">
                  <v-text-field v-model="localDoctor.name" label="Nome" :disabled="isEditMode" required />
                  <v-text-field v-model="localDoctor.crm" label="CRM" :disabled="isEditMode" required />
                  <v-text-field v-model="localDoctor.crmUf" label="Estado (UF)" :disabled="isEditMode" required />
                  <v-select v-model="localDoctor.type" :items="types" label="Tipo" :disabled="isEditMode" required />
                  <v-select v-model="localDoctor.status" :items="statuses" label="Status" :disabled="isEditMode" required />
                  <v-autocomplete
                    v-model="localDoctor.specialties"
                    :items="specialties"
                    label="Especialidades"
                    multiple
                    :disabled="isEditMode"
                    required
                  />
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-btn color="grey" @click="closeDialog">Fechar</v-btn>
                <v-btn v-if="!isEditMode" color="primary" @click="submitForm">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">
                Deseja excluir {{ localDoctor.name }}?
              </v-card-title>
              <v-card-actions>
                <v-btn color="grey" variant="text" @click="closeDelete">Cancelar</v-btn>
                <v-btn color="primary" variant="text" @click="deleteItemConfirm">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.crm }}</td>
          <td>{{ item.crmUf }}</td>
          <td>{{ item.status }}</td>
          <td>
            <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useDoctorStore } from '@/stores/doctorStore';

export default {
  setup() {
    const doctorStore = useDoctorStore();
    const dialog = ref(false);
    const dialogDelete = ref(false);
    const headers = [
      { title: 'Nome', value: 'name' },
      { title: 'CRM', value: 'crm' },
      { title: 'Estado (UF)', value: 'crmUf' },
      { title: 'Status', value: 'status' },
      { title: 'Ações', value: 'actions', sortable: false },
    ];

    const submitForm = async () => {
      try {
        await doctorStore.addDoctor(doctorStore.localDoctor);
        alert('Médico criado com sucesso!');
        closeDialog();
      } catch (error) {
        alert(`Erro ao criar médico: ${error}`);
      }
    };

    const closeDialog = () => {
      dialog.value = false;
      doctorStore.resetLocalDoctor();
    };

    const editItem = (item) => {
      doctorStore.setEditMode(item);
      dialog.value = true;
    };

    return {
      dialog,
      dialogDelete,
      ...doctorStore,
      headers,
      submitForm,
      closeDialog,
      editItem,
    };
  },
};
</script>

<style scoped>
/* Estilos opcionais */
</style>
