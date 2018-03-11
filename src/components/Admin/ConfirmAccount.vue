<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card-text>
          <v-container>
            <form @submit.prevent="onBtn">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="firstName"
                    label="First Name"
                    id="firstName"
                    v-model="firstName"
                    type="firstName"
                    required>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="lastName"
                    label="Last Name"
                    id="lastName"
                    v-model="lastName"
                    type="lastName"
                    required>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="accessLevel"
                    label="Access Level"
                    id="accessLevel"
                    v-model="accessLevel"
                    type="accessLevel"
                    style="display: none"
                    required>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn dark type="submit" >
                    REGISTER
                    <v-icon right dark>fingerprint</v-icon>
                    <span slot ="loader" class="custom-loader">
                    <v-icon dark>cached</v-icon>
                    </span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-container>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      accessLevel: '1'
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onBtn () {
      const accountData = {
        firstName: this.firstName,
        lastName: this.lastName,
        accessLevel: this.accessLevel
      }
      this.$store.dispatch('createAccount', accountData)
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
