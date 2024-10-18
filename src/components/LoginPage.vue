<!-- src/components/LoginPage.vue -->

<template>
  <v-container>
    <v-form @submit.prevent="login">
      <v-text-field
        v-model="username"
        label="Nome de Usuário"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Senha"
        type="password"
        required
      ></v-text-field>

      <v-btn type="submit" color="primary">Entrar</v-btn> <!-- Mudei aqui -->
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      // Autenticação falsa: redirecionar se credenciais forem válidas
      if (this.username === 'admin' && this.password === 'admin') {
        this.$router.push({ name: 'Doctors' }); // Redireciona para a página de médicos
      } else {
        alert('Credenciais inválidas');
      }
    },
  },
};
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
