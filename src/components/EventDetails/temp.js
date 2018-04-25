// import { Line, mixins } from 'vue-chartjs'
// const { reactiveProp } = mixins
// import * as firebase from 'firebase'

// export default {
//   data () {
//     return {
//       }
//     },
//   extends: Line,
//   mixins: [reactiveProp],
//   props: ['options'],
//   mounted () {
//     new Chart(document.getElementById("bar-chart"), {
//       type: 'bar',
//         data: {
//             labels: ["Kids (0-12)", "Teen (13-22)", "Young Adult (23-35)", "Adult (36-55)", "old adult (56+)"],
//             datasets: [
//             {
//                 label: "Age (years)",
//                 backgroundColor: ["#edfafd", "#aed9da","#4bbcf4","#2a93d5","#135589"],
//                 data: [2,10,5,7,2]
//             }
//             ]
//         },
//         options: {
//           legend: { display: false },
//           title: {
//             display: true,
//             text: 'Participants by age range (years)'
//           }
//         }
//     });

//     new Chart(document.getElementById("doughnut-chart"), {
//       type: 'doughnut',
//       data: {
//         labels: ["Male", "Female",],
//         datasets: [
//           {
//             label: "Gender",
//             backgroundColor: ["#3e95cd", "#c45850"],
//             data: [12,11,]
//           }
//         ]
//       },
//       options: {
//         title: {
//           display: true,
//           text: 'Participants by gender'
//         }
//       }
//   });
//     // this.chartData is created in the mixin.
//     // If you want to pass options please create a local options object
//     // this.renderChart(this.chartData, this.options)
//   }
  
// }

// <template>
//    <v-container grid-list-xl >
//         <v-layout wrap mb-4 >
//             <v-flex xs12 sm7 >
//               <canvas id="bar-chart" width="800" height="600"></canvas>
//               <line-chart :chart-data="datacollection" style="display:none"></line-chart>
              
//                 <!-- <canvas id="doughnut-chart" width="800" height="450"></canvas> -->
//                 <!-- <line-chart :chart-data="datacollection"></line-chart> -->
//             </v-flex>
//             <v-flex xs12 sm5 >
//               <canvas id="doughnut-chart" width="800" height="800"></canvas>
//             </v-flex>
//         </v-layout>
//     </v-container>
// </template>

// <script>
//   import LineChart from './LineChart.js'

//   export default {
//     components: {
//       LineChart
//     },
//     data () {
//       return {
//         datacollection: null
//       }
//     },
//     mounted () {
//       this.fillData()
//     },
//     methods: {
//     }
//   }
// </script>
