<template>
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
        <doctor-form-dialog
          :dialog="dialog"
          :doctor="localDoctor"
          @update:dialog="(val) => dialog = val"
          @save-doctor="saveDoctor"
        />
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Deseja excluir {{ localDoctor.name }}?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" variant="text" @click="closeDelete">Cancelar</v-btn>
              <v-btn color="primary" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.name }}</td>
        <td>{{ item.crm }}</td>
        <td>{{ item.uf }}</td>
        <td>{{ item.active ? 'Ativo' : 'Inativo' }}</td>
        <td>
          <v-icon class="me-2" size="small" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </td>
      </tr>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import DoctorFormDialog from './DoctorFormDialog.vue';

export default {
  components: {
    DoctorFormDialog,
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        { title: 'Nome', key: 'name', align: 'start', sortable: true },
        { title: 'CRM', key: 'crm', sortable: true },
        { title: 'UF', key: 'uf', sortable: true },
        { title: 'Ativo', key: 'active', sortable: true },
        { title: 'Ações', key: 'actions', sortable: false },
      ],
      doctors: [],
      editedIndex: -1,
      localDoctor: {
        name: '',
        crm: '',
        uf: '',
        active: false,
      },
      defaultItem: {
        name: '',
        crm: '',
        uf: '',
        active: false,
      },
    };
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      const doctorsData = localStorage.getItem('doctors');
      if (!doctorsData || doctorsData === "[]") {
        this.doctors = [
          { name: 'Sara Rosa', crm: '12345', uf: 'SP', active: true },
          { name: 'Mario Campos', crm: '67890', uf: 'RJ', active: false },
          { name: 'Joao de Deus', crm: '54321', uf: 'MG', active: true },
          { name: 'Jose Lourival', crm: '12358', uf: 'SP', active: true },
          { name: 'Antonio Coelho', crm: '66482', uf: 'GO', active: true },
          { name: 'Juca Alencar', crm: '95872', uf: 'BA', active: true },
          { name: 'Maria das Dores', crm: '365697', uf: 'SE', active: true },
          { name: 'Joana Alves', crm: '592248', uf: 'PB', active: true },
          { name: 'Bruno Penha', crm: '33254', uf: 'PE', active: false },
          { name: 'Camila Dinis', crm: '56693', uf: 'RS', active: true },
          { name: 'Tadeu Melo', crm: '112569', uf: 'PR', active: true },
          { name: 'Ana Aquino', crm: '33658', uf: 'SC', active: false },
          { name: 'Caio Santos', crm: '52259', uf: 'PA', active: true },
          { name: 'Tamara Junqueira', crm: '23648', uf: 'MG', active: false },
        ];
        this.saveToLocalStorage();
      } else {
        this.loadFromLocalStorage();
      }
    },

    saveDoctor(doctor) {
      if (this.editedIndex > -1) {
        Object.assign(this.doctors[this.editedIndex], doctor);
      } else {
        this.doctors.push(doctor);
      }
      this.saveToLocalStorage();
      this.close();
    },

    saveToLocalStorage() {
      localStorage.setItem('doctors', JSON.stringify(this.doctors));
    },

    loadFromLocalStorage() {
      this.doctors = JSON.parse(localStorage.getItem('doctors'));
    },

    editItem(localDoctor) {
      this.editedIndex = this.doctors.indexOf(localDoctor);
      this.localDoctor = { ...localDoctor };
      this.dialog = true;
      console.log("Index", this.editedIndex);
      console.log("Doctor", this.localDoctor);
      console.log(this.dialog);

    },

    deleteItem(item) {
      this.editedIndex = this.doctors.indexOf(item);
      this.localDoctor = { ...item };
      this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      this.editedIndex = -1;
      this.localDoctor = { ...this.defaultItem };
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    deleteItemConfirm() {
      this.doctors.splice(this.editedIndex, 1);
      if (this.doctors.length === 0) {
        localStorage.removeItem('doctors');
      } else {
        this.saveToLocalStorage();
      }
      this.closeDelete();
    },
  },
};
</script>

<style scoped>
.v-card-title {
  text-align: center;
}
</style>
