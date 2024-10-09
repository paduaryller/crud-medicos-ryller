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
      <!-- Loop através da lista filtrada de médicos, 'filteredDoctors', criando um item de lista para cada médico -->
      <li v-for="(med, index) in filteredDoctors" :key="index" class="doctor-item">
        <!-- Exibe o nome, CRM, UF e status (Ativo/Inativo) do médico -->
        <span>{{ med.name }} - CRM: {{ med.crm }} - UF: {{ med.uf }} - {{ med.active ? 'Ativo' : 'Inativo' }}</span>
        <div class="actions">
          <!-- Botão para editar o médico, chamando o método editDoctor e passando o índice -->
          <button @click="editDoctor(index)" class="edit-btn">Editar</button>
          <!-- Botão para excluir o médico, chamando o método deleteDoctor e passando o índice -->
          <button @click="deleteDoctor(index)" class="delete-btn">Excluir</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    // Definindo dados reativos para o componente
    data() {
      return {
        // Objeto para armazenar os dados do médico
        doctor: {
          name: '',  // Nome do médico
          crm: '',  // Número do CRM
          uf: '',  // Estado do CRM (UF)
          active: false,  // Status se o médico está ativo ou não
        },
        doctors: [],  // Lista de médicos
        editMode: false,  // Flag para indicar se estamos no modo de edição
        editIndex: null,  // Índice do médico que está sendo editado
        showActiveOnly: false,  // Flag para filtrar médicos ativos
      };
    },
    computed: {
      // Computed property para filtrar médicos ativos se a flag estiver ativa
      filteredDoctors() {
        // Se a flag 'showActiveOnly' estiver ativa, filtra a lista de médicos para retornar apenas os ativos
        if (this.showActiveOnly) {
          return this.doctors.filter(doctor => doctor.active);
        }
        // Se não, retorna todos os médicos
        return this.doctors;
      }
    },
    methods: {
      // Método para adicionar ou atualizar médico na lista
      saveDoctor() {
        // Se estamos no modo de edição, atualiza o médico existente
        if (this.editMode) {
          this.doctors[this.editIndex] = { ...this.doctor };
        } else {
          // Caso contrário, adiciona um novo médico à lista
          this.doctors.push({ ...this.doctor });
        }
        // Reseta o formulário após salvar
        this.resetForm();
        // Salva a lista atual de médicos no localStorage
        this.saveToLocalStorage();
      },
      // Método para editar um médico
      editDoctor(index) {
        // Armazena o índice do médico que será editado
        this.editIndex = index;
        // Carrega os dados do médico selecionado para o formulário
        this.doctor = { ...this.doctors[index] };
        // Ativa o modo de edição
        this.editMode = true;
      },
      // Método para deletar um médico
      deleteDoctor(index) {
        // Remove o médico da lista usando o índice
        this.doctors.splice(index, 1);
        // Salva a lista atualizada no localStorage
        this.saveToLocalStorage();
      },
      // Método para resetar o formulário
      resetForm() {
        // Limpa os dados do médico no formulário
        this.doctor = { name: '', crm: '', uf: '', active: false };
        // Desativa o modo de edição
        this.editMode = false;
        // Limpa o índice do médico sendo editado
        this.editIndex = null;
      },
      // Método para salvar a lista de médicos no localStorage
      saveToLocalStorage() {
        // Armazena a lista de médicos convertida em string no localStorage
        localStorage.setItem('doctors', JSON.stringify(this.doctors));
      },
      // Método para carregar médicos do localStorage ao montar o componente
      loadFromLocalStorage() {
        // Tenta obter os dados dos médicos do localStorage
        const doctorsData = localStorage.getItem('doctors');
        // Se os dados existirem, converte a string em um objeto e armazena na lista de médicos
        if (doctorsData) {
          this.doctors = JSON.parse(doctorsData);
        }
      }
    },
    mounted() {
      // Carrega a lista de médicos do localStorage quando o componente é montado
      this.loadFromLocalStorage();
    },
    watch: {
      // Observar mudanças na lista de médicos
      doctors: {
        handler() {
          // Salva a lista atualizada no localStorage sempre que houver mudanças
          this.saveToLocalStorage();
        },
        deep: true,  // Observa mudanças profundas (em objetos dentro da lista)
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
