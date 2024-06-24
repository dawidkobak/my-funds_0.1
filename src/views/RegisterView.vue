<template>
  <div class="flex mx-auto">
    <div class="">
      <v-img class="mx-auto my-6" src="/logo.png"></v-img>

      <p class="font-bold text-4xl text-center">Utwórz konto w My Funds</p>

      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">Login</div>

        <v-text-field
          density="compact"
          placeholder="Adres email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Hasło
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Wprowadź hasło"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Powtórz hasło
        </div>

        <v-text-field
          :append-inner-icon="repeatVisivle ? 'mdi-eye-off' : 'mdi-eye'"
          :type="repeatVisivle ? 'text' : 'password'"
          density="compact"
          placeholder="Wprowadź hasło"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="repeatVisivle = !repeatVisivle"
        ></v-text-field>

        <v-btn block class="mb-4" color="blue" size="large" variant="tonal">
          Zarejestruj się
        </v-btn>

        <span class=""
          >Zakładając konto, akceptujesz
          <router-link to="/terms" class="text-blue-500">Regulamin Serwisu My Funds.</router-link>
        </span>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
const repeatVisivle = ref(false)
</script>
