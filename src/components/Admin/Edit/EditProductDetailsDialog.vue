<template>
  <v-dialog width="350px" persistent v-model="editDialog">
      <v-btn dark fab accent slot="activator">
          <v-icon>edit</v-icon>
      </v-btn>
      <v-card>
          <v-container>
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-card-title>Edit Product</v-card-title>
                  </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-card-text>
                        <v-text-field
                            name="productName"
                            label="Product Name"
                            id="productName"
                            v-model="editedProductName"
                            required></v-text-field>
                        <v-text-field
                            name="productCode"
                            label="Product Code"
                            id="productCode"
                            v-model="editedProductCode"
                            required></v-text-field>
                        <v-text-field
                            name="productCategory"
                            label="Product Category"
                            id="productCategory"
                            v-model="editedProductCategory"
                            required></v-text-field>
                        <v-text-field
                            name="description"
                            label="Description"
                            id="description"
                            multi-line
                            v-model="editedDescription"
                            required></v-text-field>
                      </v-card-text>
                  </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-card-actions>
                          <v-btn 
                          flat 
                          class="blue--text darken-1" 
                          @click="editDialog = false">Close</v-btn>
                          <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Save</v-btn>
                          <v-btn flat class="blue--text darken-1" @click="onDeleteChanges">Delete</v-btn>
                      </v-card-actions>
                  </v-flex>
              </v-layout>
          </v-container>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      editDialog: false,
      editedProductName: this.meetup.productName,
      editedProductCode: this.meetup.productCode,
      editedProductCategory: this.meetup.productCategory,
      editedDescription: this.meetup.description,
      date: this.meetup.date,
      imageUrl: this.meetup.imageUrl
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedProductName.trim() === '' || this.editedProductCode.trim() === '' || this.editedProductCategory.trim() === '' || this.editedDescription.trim() === '') {
        return
      }
      this.editDialog = false
      this.$store.dispatch('updateProductData', {
        id: this.meetup.id,
        productName: this.editedProductName,
        productCode: this.editedProductCode,
        productCategory: this.editedProductCategory,
        description: this.editedDescription
      })
    },
    onDeleteChanges () {
      this.editDialog = false
      this.$store.dispatch('deleteProductData', {
        id: this.meetup.id,
        productName: this.editedProductName,
        productCode: this.editedProductCode,
        productCategory: this.editedProductCategory,
        description: this.editedDescription,
        date: this.date,
        imageUrl: this.imageUrl
      })
      this.$router.push('/ViewProduct')
    }
  }
}
</script>

