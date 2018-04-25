<template>
    <v-container grid-list-xl onload="onLoadEvents();">
        <v-layout >
            <v-flex xs12 class="text-xs-center">
             <v-progress-circular 
             indeterminate 
             v-bind:size="50" 
             color="blue"
             v-if="loading"></v-progress-circular>        
            </v-flex>
        </v-layout>
        
        <v-layout wrap mb-4 v-if="!loading">
            <v-flex xs12 sm6 md4 mb-1 v-for="event in events" :key="event.id">
                <v-card>
                    <v-card-media
                    class="white--text"
                    height="200px"
                    :src="event.imageUrl"
                    >
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline">{{event.title}}</span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                    <v-card-title>
                        <div>
                            <span class="red--text" > <v-icon small color="red">place</v-icon> {{event.location}}</span>
                            <p>{{event.description}}</p>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat color="orange" :to="/events/ + event.id + /dashboard/">View</v-btn>
                        <app-edit-event :event="event"></app-edit-event>
                        <v-spacer></v-spacer>
                        <span class="grey--text">{{event.date}}</span>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>

        <v-btn
            fixed
            dark
            fab
            bottom
            right
            color="pink"
            v-on:click.native="dialog = true">
            <v-icon>add</v-icon>
        </v-btn>

        <!-- Create Events Dialog -->
        <v-dialog v-model="dialog" name="dialog" persistent max-width="560px">
            <v-btn style="display:none" dark slot="activator">Open Dialog</v-btn>
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
                    <v-btn color="red darken-1" flat @click.native="dialog = false">Cencel</v-btn>
                    <v-btn color="blue darken-1" :disabled="!formIsValid" flat @click.native="dialog = false" type="submit">Add</v-btn>
                    </v-card-actions>
                </form>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import EditEvent from './EditEvent.vue'


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
        events () {
            return this.$store.getters.loadedEvents
      },
        formIsValid () {
            return this.title !== '' &&
                this.location !== '' &&
                this.imageUrl !== '' &&
                this.description !== ''
        },
        loading () {
            return this.$store.getters.loading
        }
    },
     methods: {
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
        onLoadEvents () {
            this.$store.dispatch('loadedEvents')
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
    },
    components: {
        appEditEvent:EditEvent
    },
    beforeMount() {
        this.onLoadEvents()
    }
        
}
</script>
