<template>
    <v-dialog v-model="dialog" name="dialog" persistent max-width="560px">
        <!-- style="display:none" -->
        <v-btn  dark slot="activator"  @click="dialog = true">Open Dialog</v-btn>
        <v-card >
                <form @submit.prevent="onCreateEvent">
                    <v-card-title>
                        <h4 class="headline">Create A New Event</h4>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
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
                                    :rules="[(v) => v.length <= 45 || 'Max 45 characters']"
                                    v-model="location"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                <v-btn raised @click="onPickFile">Upload Image</v-btn>
                                <input 
                                    type="file" 
                                    style="display:none" 
                                    ref="fileInput" 
                                    accept="image/*"
                                    @change="onFilePicked">
                                </v-flex>
                                <v-flex xs12>
                                    <img :src="imageUrl" height="140">
                                </v-flex>
                                <v-flex xs12>
                                <v-text-field
                                    name="description" 
                                    label="Description"
                                    id="description" 
                                    :rules="[(v) => v.length <= 100 || 'Max 100 characters']"
                                    v-model="description"></v-text-field>
                                </v-flex>
                                <v-layout >
                                <v-flex xs12 sm6 md4>
                                    <h4>Choose Event Date</h4>
                                    <v-date-picker color="blue" locale="th" landscape first-day-of-week="1" v-model="date" :reactive="reactive"></v-date-picker>
                                    <p> {{date}} </p>
                                </v-flex>          
                                </v-layout>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click="dialog = false">Cencel</v-btn>
                    <v-btn color="blue darken-1" :disabled="!formIsValid" flat @click="dialog = false" type="submit">Add</v-btn>
                    </v-card-actions>
                </form>
            </v-card>
    </v-dialog>
</template>

<script>

export default {
    data () {
      return {
          dialog: false,
          title: '',
          location: '',
          imageUrl: '',
          description: '',
          date: '',
          image: null,
          reactive: false
      }
    },
    computed: {
        formIsValid () {
            return this.title !== '' &&
                this.location !== '' &&
                this.imageUrl !== '' &&
                this.description !== ''
        },
    },
    method: {
        onCreateEvent () {
            if (!this.formIsValid) {
                return
            }
            if (!this.image) {
                return
            }
            const eventData = {
                title: this.title,
                location: this.location,
                image: this.image,
                description: this.description,
                date: this.date
            }
            this.$store.dispatch('createEvent',eventData)
            this.$router.push('/events')
            
        },
        onPickFile() {
            this.$refs.fileInput.click()
        },
        onFilePicked(event) {
            const files = event.target.files
            let filename = files[0].name
            if (filename.lastIndexOf('.') <= 0) {
                return alert('Please add a valid file!')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        },
    }
}
</script>
