<template>
  <v-dialog
    v-model="isDialogOpen"
    max-width="500"
    @close="handleClose"
  >
    <template v-slot:activator="{ props }">
      <v-btn class="mb-2" color="primary" dark v-bind="props">
        Adicionar Médico
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        {{ isEditMode ? 'Editar Médico' : 'Criar Médico' }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-on:submit.prevent="submitForm">
          <v-text-field
            v-model="localDoctor.name"
            label="Nome"
            required
          ></v-text-field>

          <v-text-field
            v-model="localDoctor.crm"
            label="CRM"
            required
          ></v-text-field>

          <v-text-field
            v-model="localDoctor.uf"
            label="Estado (UF)"
            required
          ></v-text-field>

          <v-checkbox
            v-model="localDoctor.active"
            label="Ativo"
          ></v-checkbox>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="grey"
          @click="handleClose"
        >
          Cancelar
        </v-btn>

        <v-btn
          color="primary"
          @click="submitForm"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
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
  data() {
    return {
      localDoctor: { ...this.doctor },
      isDialogOpen: false, // Iniciar como false
      isEditMode: false // Adiciona a propriedade isEditMode
    };
  },
  watch: {
    dialog(newValue) {
      this.isDialogOpen = newValue;
      this.isEditMode = !!this.doctor.name; // Verifica se é modo de edição
      if (newValue) {
        this.localDoctor = { ...this.doctor };
      } else {
        this.resetLocalDoctor(); // Resetar localDoctor
      }
    }
  },
  methods: {
    handleClose() {
      this.isDialogOpen = false; // Atualizar isDialogOpen
      this.$emit('update:dialog', false); // Emitir evento para o pai
      this.resetLocalDoctor(); // Resetar localDoctor ao fechar
    },
    resetLocalDoctor() {
      this.localDoctor = { name: '', crm: '', uf: '', active: false }; // Valores padrão
      this.isEditMode = false; // Reseta isEditMode
    },
    submitForm() {
      const isValid = this.$refs.form.validate(); // Valida o formulário
      if (isValid) {
        this.saveDoctor();
      }
    },
    saveDoctor() {
      this.$emit('save-doctor', this.localDoctor);
      this.handleClose();
    }
  },
};
</script>
<style scoped>
  .v-card-title {
    text-align: center;
  }
</style>
