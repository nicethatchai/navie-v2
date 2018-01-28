<template>
    <v-card >
        <form @submit.prevent="onCreateEvent">
        <v-card-title>
          <h4 class="headline">Create A New Event</h4>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
              
            <v-layout wrap>
                <!-- <form> -->
                    <v-flex xs12>
                        <v-text-field
                            name="title" 
                            label="Title"
                            id="title" 
                            required
                            v-model="title"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            name="location" 
                            label="Location"
                            id="location" 
                            required
                            v-model="location"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            name="imageUrl" 
                            label="Image Url"
                            id="imageUrl" 
                            required
                            v-model="imageUrl"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <img :src="imageUrl" height="140">
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            name="description" 
                            label="Description"
                            id="description" 
                            multi-line
                            v-model="description"></v-text-field>
                    </v-flex>
                    <v-layout >
                    <v-flex xs12 sm6 md4>
                        <h4>Choose Event Date</h4>
                        <v-date-picker color="blue" locale="th" landscape first-day-of-week="1" v-model="date"></v-date-picker>
                        <p> {{date}} </p>
                    </v-flex>          
                    </v-layout>
                    <!-- </form> -->
            </v-layout>
            
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="dialog = false">Cencel</v-btn>
          <v-btn color="blue darken-1" :disabled="!formIsValid" flat @click.native="dialog = false" type="submit">Add</v-btn>
        </v-card-actions>
        </form>
      </v-card>
  <!-- <v-container>
      <v-layout row>
          <v-flex xs12>
              <h4 class="">Create a new Event</h4>
          </v-flex>
      </v-layout>
      <v-layout row>
          <v-flex xs12>
              <form>
                  <v-layout row>
                        <v-flex xs12 sm6 md4 offset-sm3>
                            <v-text-field
                            name="title"
                            label="Title"
                            ></v-text-field>
                        </v-flex>
                  </v-layout>
              </form>
          </v-flex>
      </v-layout>
  </v-container> -->
</template>

<script>
export default {
  data () {
      return {
          title: '',
          location: '',
          imageUrl: '',
          description: '',
          date: ''
      }
    },
    computed: {
        formIsValid () {
            return this.title !== '' &&
                this.location !== '' &&
                this.imageUrl !== '' &&
                this.description !== ''
        }
    },
    methods: {
        onCreateEvent () {
            if (!this.formIsValid) {
                return
            }
            const eventData = {
                title: this.title,
                location: this.location,
                imageUrl: this.imageUrl,
                description: this.description,
                date: this.date
            }
            this.$store.dispatch('createEvent',eventData)
            this.$router.push('/events')
        }
    }
}
</script>
