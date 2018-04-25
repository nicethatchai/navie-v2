<template>
   <v-container grid-list-xl >
        <v-layout wrap mb-4 >
            <v-flex xs12 sm6 >
                <bar-chart :chart-data="datacollection" ></bar-chart>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import BarChart from './BarChart.js'
  import * as firebase from 'firebase'

  export default {
    props:['id'],
    components: {
      BarChart
    },
    data () {
      return {
        datacollection: null,
        age:[],
        // age:{
        //   kid: 0,
        //   teen: 0,
        //   young: 0,
        //   adult: 0,
        //   old: 0,
        // },
        gender:{
          male:0,
          female:0
        }
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      countAge() {
        var age = this.age
        var teen = 0
        firebase.database().ref('events/' + this.id + '/registers').once('value')
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            if(childSnapshot.val().age >= 0 && childSnapshot.val().age <= 12) {
              age.kid++
            }
            else if( childSnapshot.val().age > 12 && childSnapshot.val().age <= 22){
              teen++
            }
            else if( childSnapshot.val().age > 22 && childSnapshot.val().age <= 35){
              // age[2]++
            }
            else if( childSnapshot.val().age > 35 && childSnapshot.val().age <= 55){
              // age[3]++
            }
            else if( childSnapshot.val().age > 55){
              // age[4]++
            }
            else{

            }
          })
          var data = {
                    teen: teen,
                  }
            age.push(data)
        })
        this.age = age
        console.log(this.age)
        // var kid = 0
        // var teen = 0
        //     firebase.database().ref('events/' + this.id + '/registers').once('value')
        //     .then(function(snapshot) {
        //       snapshot.forEach(function(childSnapshot) {
        //         if(childSnapshot.val().age == 0 && childSnapshot.val().age <= 12) {
        //           kid++
        //         }
        //         else if( childSnapshot.val().age > 12 && childSnapshot.val().age <= 22){
        //          teen++
        //         }
        //         else if( childSnapshot.val().age > 22 && childSnapshot.val().age <= 35){
        //           // age[2]++
        //         }
        //         else if( childSnapshot.val().age > 35 && childSnapshot.val().age <= 55){
        //           // age[3]++
        //         }
        //         else if( childSnapshot.val().age > 55){
        //           // age[4]++
        //         }
        //         else{

        //         }
                
        //       })
        //       // console.log(this.age)
        //     })


          // this.age = age
          // console.log(teen)
          // console.log(age.teen)
          // firebase.database().ref('events/' + this.id + '/participants').once('value')
          //   .then(function(snapshot) {
          //     snapshot.forEach(function(childSnapshot) {
          //       var childData = childSnapshot.val()
          //       firebase.database().ref('users/' + childSnapshot.key).once('value')
          //       .then(function(snapshot) {
          //         var birthday = new Date(snapshot.val().dob)
          //         var ageDifMs = Date.now() - birthday.getTime()
          //         var ageDate = new Date(ageDifMs);
          //         var age = Math.abs(ageDate.getUTCFullYear() - 1970)
          //         if(age == 0 || age <= 12) {
          //           age.kid++
          //         }
          //         else if( age > 12 || age <= 22){
          //           age.teen++
          //         }
          //         else if( age > 22 || age <= 35){
          //           age.young++
          //         }
          //         else if( age > 35 || age <= 55){
          //           age.adult++
          //         }
          //         else if( age > 55){
          //           age.old++
          //         }
          //         else{
          //         }  
          //       })
          //   })
          // })
          // this.age = age
          // console.log(age)
      },
      countGender() {
        
      },
      fillData () {
        // console.log(this.age)
        this.countAge()
        // const age = {
          
        // }
        console.log(this.age[0])
        // console.log(this.age.teen)
        // var x = this.age


        this.datacollection = {
          labels: ["Kids (0-12)", "Teen (13-22)", "Young Adult (23-35)", "Adult (36-55)", "old adult (56+)"],
          datasets: [
            {
              label: ['Age (years)'],
              // title: 'Participants by age range (years)',
              backgroundColor: ["#edfafd", "#aed9da","#4bbcf4","#2a93d5","#135589"],
              data: [this.age.kid, this.age.teen, this.age.young, this.age.adult, this.age.old],
              
            }
          ], 
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
</style>




