<template>
   <v-container fluid grid-list-xl>
     <v-alert type="info" :value="isEmpty">
      No one is participated in this event yet
    </v-alert>
        <v-layout row wrap mb-4 >
            <v-flex d-flex xs6  v-if="this.age.kid || this.age.teen || this.age.young || this.age.adult || this.age.old  > 0">
              <v-card>
                <bar-chart :chart-data="datacollection" :options="options" ></bar-chart>
              </v-card>
            </v-flex>

            <v-flex d-flex xs12 sm5>
              <v-layout row wrap>
                <v-container fluid xs4 grid-list-lg justify-center>
                  <v-layout row>
                    <v-flex d-flex xs4 v-if="this.gender.male || this.gender.female > 0">
                      <v-card >
                        <v-container fluid grid-list-lg>
                                <div align="center" >Active</div>
                                <div align="center"  id="active"> {{active}}</div>
                        </v-container>
                      </v-card>
                    </v-flex>

                    <v-flex d-flex xs5 v-if="this.gender.male || this.gender.female > 0">
                      <v-card >
                        <v-container fluid grid-list-lg>
                                <div align="center" >Registered</div>
                                <div align="center" id="registered" >{{totol}}</div>
                        </v-container>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
                

              <v-flex d-flex xs10 v-if="this.gender.male || this.gender.female > 0">
                <v-card>
                  <doughnut-chart :chart-data="datacollectionGenger" :options="optionsGen" ></doughnut-chart>
                </v-card>
              </v-flex>

              </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import BarChart from './BarChart.js'
  import DoughnutChart from './DoughnutChart.js'
  import * as firebase from 'firebase'

  export default {
    props:['id'],
    components: {
      BarChart,
      DoughnutChart,
    },
    data () {
      return {
        datacollection: null,
        datacollectionGenger: null,
        isEmpty:true,
        active: 0,
        totol:0,
        age:{
          kid: 0,
          teen: 0,
          young: 0,
          adult: 0,
          old: 0,
        },
        gender:{
          male:0,
          female:0
        },
        options:{
          legend: { display: false },
          title: {
            display: true,
            text: 'Participant in age range (years)'
          }
        },
        optionsGen:{
          // legend: { display: false },
          title: {
            display: true,
            text: 'Participants by gender'
          }
        },
        type:'doughnut',
      }
    },
    // beforeMount() {
    //   this.countAge()
    // },
    mounted () {
      this.countAge()
      this.countGender()
      this.countActive()
    },
    methods: {
      // checkEmpty() {
      //   console.log('check empty')
      //   if(this.gender.male || this.gender.female > 0){
      //     this.isEmpty = false
      //   }
      //   else {
      //     is.isEmpty = true
      //   }
      // },
      updateStatus() {

      },
      updateGender(gender) {
        this.gender = gender
        this.totol = this.gender.male + this.gender.female
        if(this.totol>0){
          this.isEmpty = false
        }
        this.fillDataGen()
      },
      updateAge(age) {
        this.age = age
        this.fillData()
      },
      updateAcive(active) {
        this.active = active
      },
      countActive() {
        firebase.database().ref('events/' + this.id + '/participants').on('value', (snapshot) => {
          var active = 0
          snapshot.forEach((childSnapshot) => {
            if(childSnapshot.val().active === true){
              active++
            }
          })
          this.updateAcive(active)
        })
      },
      countAge() {
        var age = this.age
        firebase.database().ref('events/' + this.id + '/registers').on('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
              if(childSnapshot.val().age >= 0 && childSnapshot.val().age <= 12) {
                age.kid++
              }
              else if( childSnapshot.val().age > 12 && childSnapshot.val().age <= 22){
                age.teen++
              }
              else if( childSnapshot.val().age > 22 && childSnapshot.val().age <= 35){
                age.young++
              }
              else if( childSnapshot.val().age > 35 && childSnapshot.val().age <= 55){
                age.adult++
              }
              else if( childSnapshot.val().age > 55){
                age.old++
              }
              else{
              }
            })
        })

        firebase.database().ref('events/' + this.id + '/participants').on('value', (snapshot) => {
              snapshot.forEach((childSnapshot) =>{
              var childData = childSnapshot.val()
              firebase.database().ref('users/' + childSnapshot.key).on('value', (snapshot) => {
                var birthday = new Date(snapshot.val().dob)
                var ageDifMs = Date.now() - birthday.getTime()
                var ageDate = new Date(ageDifMs);
                var ageP = Math.abs(ageDate.getUTCFullYear() - 1970)
                
                if(ageP >= 0 && ageP <= 12) {
                  age.kid++
                }
                else if( ageP > 12 && ageP <= 22){
                  age.teen++
                }
                else if( ageP > 22 && ageP <= 35){
                  age.young++
                }
                else if(ageP > 35 && ageP <= 55){
                  age.adult++
                }
                else if( ageP > 55){
                  age.old++
                }
                else{

                }
              })
          })
        })
        this.updateAge(age)
      },
      countGender() {
        var gender = this.gender
        firebase.database().ref('events/' + this.id + '/registers').on('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
              if(childSnapshot.val().gender === 'Male') {
                gender.male++
              }
              else if( childSnapshot.val().gender === 'Female'){
                gender.female++
              }
              else{
              }
            })
        })
          firebase.database().ref('events/' + this.id + '/participants').on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) =>{
              var childData = childSnapshot.val()
              firebase.database().ref('users/' + childSnapshot.key).once('value', (snapshot) => {
                if(snapshot.val().gender === 'Male') {
                  gender.male++
                }
                else if( snapshot.val().gender === 'Female'){
                  gender.female++
                }
                else{
                }
                // this.updateGender(gender)
              })
            })
          })
        this.updateGender(gender)
        },
      fillData () {
        this.datacollection = {
          // labels: ["Kids (0-12)", "Teen (13-22)", "Young Adult (23-35)", "Adult (36-55)", "old adult (56+)"],
          labels: ["Kid (0-12)", "Teen (13-22)", "Young (23-35)", "Adult (36-55)", "Old (56+)"],
          datasets: [
            {
              label: ['People'],
              // title: 'Participants by age range (years)',
              backgroundColor: ["#edfafd", "#aed9da","#4bbcf4","#2a93d5","#135589"],
              data: [this.age.kid, this.age.teen, this.age.young, this.age.adult, this.age.old],
              // data: [5, 10, 12, 4, 8],
            }
          ], 
        }
      },
      fillDataGen() {
        this.datacollectionGenger = {
          labels: ["Male", "Female",],
            datasets: [
              {
                label: "Gender",
                backgroundColor: ["#85C3F4", "#F682BF"],
                data: [this.gender.male,this.gender.female]
              }
            ]
        }
      }
    }
  }
</script>

<style>
  .small {
    max-width: 800px;
    margin:  150px auto;
  }

  #active {
    font-size: 36px;
    font-family: 'Roboto';
    color: #4cbb17
  }

  #registered {
    font-size: 36px;
    font-family: 'Roboto';
    color: #4e4e52
  }
</style>




