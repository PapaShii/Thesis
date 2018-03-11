<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate class="primary--text" :width="7" :size="70">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ meetup.productName }}</h6>
            <template>
              <v-spacer></v-spacer>
              <app-edit-product-details-dialog :meetup="meetup"></app-edit-product-details-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="500px"
          ></v-card-media>
          <v-card-text>
            <div class="info--text">{{ meetup.date }}</div>
            <div class="red--text">Product Code: {{ meetup.productCode }}</div>
            <div class="blue--text">Product Category: {{ meetup.productCategory }}</div>
            <div class="green--text">Product Description: {{ meetup.description }}</div>            
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetup () {
        return this.$store.getters.loadedMeetup(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
