<template>
  <div class="flex mx-auto">
    <div class="">
      <v-img class="mx-auto my-6" src="/logo.png"></v-img>

      <p class="font-bold text-4xl text-center">Zaloguj się do My Funds</p>

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

          <router-link to="/reset-password" class="button">
            <span class="text-sm ml-5 text-blue-500">Nie pamiętam hasła</span>
          </router-link>
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

        <router-link to="/investments">
          <v-btn block class="mb-4" color="blue" size="large" variant="tonal"> Zaloguj się </v-btn>
        </router-link>

        <div className="relative flex justify-center text-sm mb-4">
          <span className="bg-white px-2 text-gray-500 text-subtitle-1 text-medium-emphasis">
            Lub kontynuuj z:
          </span>
        </div>

        <div class="grid grid-flow-col grid-cols-2">
          <div>
            <v-btn class="w-full">
              <v-icon start icon="mdi-google" class="text-google"></v-icon>
              Google
            </v-btn>
          </div>

          <div>
            <v-btn class="w-full">
              <v-icon start icon="mdi-facebook" class="text-facebook"></v-icon>
              Facebook
            </v-btn>
          </div>
        </div>

        <v-card-text class="text-center">
          <router-link to="/register" class="button">
            <span class="ml-5 text-blue"
              >Zarejestruj się <v-icon icon="mdi-chevron-right"></v-icon
            ></span>
          </router-link>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>
