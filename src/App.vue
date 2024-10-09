<template>
  <div id="app" class="container">
    <h1>Gerenciamento de Médicos</h1>

    <!-- Formulário para adicionar/editar médicos -->
    <form v-on:submit.prevent="saveDoctor" class="doctor-form">
      <div class="form-group">
        <input type="text" id="name" v-model="doctor.name" placeholder="Nome" required />
      </div>
      <div class="form-group">
        <input type="text" id="crm" v-model="doctor.crm" placeholder="CRM" required />
      </div>
      <div class="form-group">
        <input type="text" id="uf" v-model="doctor.uf" placeholder="Estado (UF)" required />
      </div>
      <div class="form-group form-checkbox">
        <input type="checkbox" id="active" v-model="doctor.active" /> Ativo
      </div>
      <button type="submit" class="submit-btn">{{ editMode ? 'Atualizar' : 'Adicionar' }} Médico</button>
    </form>

    <!-- Mensagem quando não há médicos cadastrados -->
    <div v-if="doctors.length === 0" class="no-doctors-message">
      Nenhum médico cadastrado.
    </div>

    <!-- Filtro de médicos -->
    <div class="filter-section">
      <label>
        <input type="checkbox" v-model="showActiveOnly" />
        Mostrar apenas médicos ativos
      </label>
    </div>

    <!-- Lista de médicos cadastrados -->
    <ul class="doctor-list">
      <li v-for="(med, index) in filteredDoctors" :key="index" class="doctor-item">
        <span>{{ med.name }} - CRM: {{ med.crm }} - UF: {{ med.uf }} - {{ med.active ? 'Ativo' : 'Inativo' }}</span>
        <div class="actions">
          <button @click="editDoctor(index)" class="edit-btn">Editar</button>
          <button @click="deleteDoctor(index)" class="delete-btn">Excluir</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doctor: {
        name: '',
        crm: '',
        uf: '',
        active: false,
      },
      doctors: [],  // Lista de médicos
      editMode: false,  // Modo de edição ou novo cadastro
      editIndex: null,  // Índice do médico sendo editado
      showActiveOnly: false,  // Filtro de médicos ativos
    };
  },
  computed: {
    // Filtrar médicos ativos se o filtro estiver ativo
    filteredDoctors() {
      if (this.showActiveOnly) {
        return this.doctors.filter(doctor => doctor.active);
      }
      return this.doctors;
    }
  },
  methods: {
    // Adicionar ou atualizar médico
    saveDoctor() {
      if (this.editMode) {
        this.doctors[this.editIndex] = { ...this.doctor };
      } else {
        this.doctors.push({ ...this.doctor });
      }
      this.resetForm();
      this.saveToLocalStorage();
    },
    // Editar médico
    editDoctor(index) {
      this.editIndex = index;
      this.doctor = { ...this.doctors[index] };
      this.editMode = true;
    },
    // Deletar médico
    deleteDoctor(index) {
      this.doctors.splice(index, 1);
      this.saveToLocalStorage();
    },
    // Resetar o formulário
    resetForm() {
      this.doctor = { name: '', crm: '', uf: '', active: false };
      this.editMode = false;
      this.editIndex = null;
    },
    // Salvar a lista de médicos no localStorage
    saveToLocalStorage() {
      localStorage.setItem('doctors', JSON.stringify(this.doctors));
    },
    // Carregar médicos do localStorage no ciclo de vida 'mounted'
    loadFromLocalStorage() {
      const doctorsData = localStorage.getItem('doctors');
      if (doctorsData) {
        this.doctors = JSON.parse(doctorsData);
      }
    }
  },
  mounted() {
    // Carregar médicos ao montar o componente
    this.loadFromLocalStorage();
  },
  watch: {
    // Observar mudanças na lista de médicos
    doctors: {
      handler() {
        this.saveToLocalStorage();
      },
      deep: true,
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.doctor-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-checkbox {
  display: flex;
  flex-direction: row;
}

input[type="text"], input[type="checkbox"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}

input[type="checkbox"] {
  width: auto;
}

.submit-btn {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #218838;
}

.doctor-list {
  list-style-type: none;
  padding: 0;
}

.doctor-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}

.actions {
  display: flex;
  gap: 10px;
}

.edit-btn,
.delete-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-btn {
  background-color: #007bff;
  color: white;
}

.edit-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}

.filter-section {
  margin-top: 20px;
}

.no-doctors-message {
  text-align: center;
  color: #666;
  margin: 20px 0;
}
</style>
