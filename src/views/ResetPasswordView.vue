<template>
  <div class="flex mx-auto">
    <div class="">
      <v-img class="mx-auto my-6" src="/logo.png"></v-img>

      <p class="font-bold text-4xl text-center pb-5">Nie pamiętasz hasła?</p>

      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <p class="pb-8">
          Podaj nam swój adres e-mail który jest Twoim loginem, jeśli mamy go w systemie, wyślemy Ci
          link do zmiany hasła.
        </p>

        <v-text-field
          density="compact"
          placeholder="Adres email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          class="mb-4"
        ></v-text-field>

        <v-btn block class="mb-4" color="blue" size="large" variant="tonal">
          Wyślij wiadomość email
        </v-btn>
      </v-card>
    </div>
  </div>
</template>

<script setup></script>
