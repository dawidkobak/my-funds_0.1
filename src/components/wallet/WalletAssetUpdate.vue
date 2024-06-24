<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="#342b84" class="text-white" v-bind="props">
          Stwórz {{ updateAssetCaption }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5"> {{ cardTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :label="label"
                  :hint="hint"
                  persistent-hint
                  required
                  v-model="assetName"
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field label="Amount" model-value="10.00" prefix="$"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false"> Zamknij </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="createWallet"> Zapisz </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup></script>
