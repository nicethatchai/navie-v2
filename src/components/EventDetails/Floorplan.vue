<template>
   <v-container grid-list-xl >
        <v-layout wrap mb-4 >
            <v-flex xs12 sm6 md4 mb-1>
                <v-card>
        <v-card-media
          height="300px"
          src="https://scontent.fbkk10-1.fna.fbcdn.net/v/t34.0-12/28383209_1787278207996460_1462678193_n.png?oh=40a1e0a0c9e38d4bf072f2dc78cd08bf&oe=5A92819E"
        >
          <!-- <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">Top 10 Australian beaches</span>
              </v-flex>
            </v-layout>
          </v-container> -->
        </v-card-media>
        <v-card-title>
          <div>
            <span class="grey--text">CPE 4th floor</span>
            <!-- <span>Whitehaven Beach</span><br>
            <span>Whitsunday Island, Whitsunday Islands</span> -->
          </div>
        </v-card-title>
        <!-- <v-card-actions>
          <v-btn flat color="orange">Edit</v-btn>
        </v-card-actions> -->
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
    </v-container>
</template>
