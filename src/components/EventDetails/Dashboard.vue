<template>
   <v-container grid-list-xl >
        <v-layout wrap mb-4 >
            <v-flex xs12 sm6 >
                <line-chart :chart-data="datacollection"></line-chart>
                <!-- <line-chart :chart-data="datacollection"></line-chart> -->
                <button @click="fillData()">Randomize</button>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Active User',
              backgroundColor: '#41B883',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
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




