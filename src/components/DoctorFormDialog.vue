<template>
  <v-dialog v-model="isDialogOpen" max-width="500">
    <template #activator="{ props }">
      <v-btn class="mb-2" color="primary" dark v-bind="props">
        Adicionar Médico
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        {{ isEditMode ? 'Editar Médico' : 'Criar Médico' }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="submitForm">
          <v-text-field v-model="localDoctor.name" label="Nome" required></v-text-field>
          <v-text-field v-model="localDoctor.crm" label="CRM" required></v-text-field>
          <v-text-field v-model="localDoctor.uf" label="Estado (UF)" required></v-text-field>
          <v-checkbox v-model="localDoctor.active" label="Ativo"></v-checkbox>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="grey" @click="handleClose">Cancelar</v-btn>
        <v-btn color="primary" @click="submitForm">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, defineComponent, toRefs, watch } from 'vue';


export default defineComponent({
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    doctor: {
      type: Object,
      required: true
    }
  },
  emits: ['update:dialog', 'save-doctor'],
  setup(props, { emit }) {
    const { dialog, doctor } = toRefs(props);
    const isDialogOpen = ref(dialog.value);
    const localDoctor = ref({ ...doctor.value });
    const isEditMode = ref(!!doctor.value.name);

    const handleClose = () => {
      isDialogOpen.value = false;
      emit('update:dialog', false);
      resetLocalDoctor();
    };

    const resetLocalDoctor = () => {
      localDoctor.value = { name: '', crm: '', uf: '', active: false };
      isEditMode.value = false;
    };

    const submitForm = () => {
      const form = document.querySelector('form'); // Simples verificação do formulário
      if (form.checkValidity()) {
        saveDoctor();
      }
    };

    const saveDoctor = () => {
      emit('save-doctor', localDoctor.value);
      handleClose();
    };

    // Watcher para quando a prop dialog mudar, abrir ou fechar o diálogo
    watch(dialog, (newVal) => {
      isDialogOpen.value = newVal;
      isEditMode.value = !!doctor.value.name;
      if (newVal) {
        localDoctor.value = { ...doctor.value };
      } else {
        resetLocalDoctor();
      }
    });

    return {
      isDialogOpen,
      localDoctor,
      isEditMode,
      handleClose,
      submitForm
    };
  }
});
</script>

<style scoped>
  .v-card-title {
    text-align: center;
  }
</style>
