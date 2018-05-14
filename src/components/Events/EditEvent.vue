<template>
  <v-dialog v-model="editedDialog" name="editedDialog" persistent max-width="560px">
        <v-btn flat color="orange" slot="activator">Edit</v-btn>
                <v-card >
                <form>
                    <v-card-title>
                        <h4 class="headline">{{editedTitle}}</h4>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" flat @click="deleteEvent">Delete</v-btn>
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
                                    v-model="editedTitle"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                    name="location" 
                                    label="Location"
                                    id="location" 
                                    required
                                    :rules="[(v) => v.length <= 45 || 'Max 45 characters']"
                                    v-model="editedLocation"></v-text-field>
                                </v-flex>
                                <!-- <v-flex xs12>
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
                                </v-flex> -->
                                <v-flex xs12>
                                <v-text-field
                                    name="description" 
                                    label="Description"
                                    id="description" 
                                    :rules="[(v) => v.length <= 100 || 'Max 100 characters']"
                                    v-model="editedDescription"></v-text-field>
                                </v-flex>
                                <!-- <v-layout >
                                <v-flex xs12 sm6 md4>
                                    <h4>Choose Event Date</h4>
                                    <v-date-picker color="blue" locale="th" first-day-of-week="1" v-model="date"></v-date-picker>
                                    <p> {{date}} </p>
                                </v-flex>          
                                </v-layout> -->
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <!-- <v-btn color="red darken-1" flat @click="editedDialog = false">Delete</v-btn> -->
                    <v-spacer></v-spacer>
                        <v-btn color="red darken-1" flat @click="editedDialog = false">Cencel</v-btn>
                        <v-btn color="blue darken-1" flat :disabled="!formIsValid" @click="onSaveChange" >Save</v-btn>
                    </v-card-actions>
                </form>
            </v-card>
  </v-dialog>
</template>

<script>
import * as firebase from 'firebase'
export default {
    
    props: ['event'],
    data () {
        return {
            editedDialog: false,
            editedTitle: this.event.title,
            editedDescription: this.event.description,
            editedLocation: this.event.location,
            id: this.event.id,
        }
    },
    computed:  {
        formIsValid () {
            return this.title !== '' &&
                this.location !== '' &&
                this.imageUrl !== '' &&
                this.description !== ''
        },
    },
    methods: {
        deleteEvent() {
            confirm('Are you sure you want to delete this event?') &&  firebase.database().ref('events/' + this.id).remove()
            this.editedDialog = false
            this.$store.dispatch('loadedEvents')
        },
        onSaveChange () {
            if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '' || this.editedLocation.trim() === '') {
                return
            }
            this.editedDialog = false
            this.$store.dispatch('updateEventData', {
                id: this.event.id,
                title: this.editedTitle,
                description: this.editedDescription,
                location: this.editedLocation,
                date: this.editedDate,
            })
            this.$store.dispatch('loadedEvents')
        }
    }
}
</script>

