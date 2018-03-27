<template>
   <v-container grid-list-xl >
        <v-layout wrap mb-4 >
            <v-flex xs12 sm6 md4 mb-1>
                <v-card>
        <v-card-media
          height="300px"
          src="https://scontent.fbkk1-3.fna.fbcdn.net/v/t1.0-0/29136707_1738762489495999_7965516849049763840_o.jpg?_nc_fx=fbkk1-5&_nc_eui2=v1%3AAeEcnXJ6ihtWxd4OYZhzHGhj39PczbQ6PXFN9ZLpqycSFGIm6tivCQr0AXMYD8xaMJ4MA2Luush2iuLrX8N0Wk0QgkIek75wxYqGf9LRjpm3-A&oh=195bc691eaf6d2f02367a9b163cc84a0&oe=5B487251"
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
            <span class="grey--text">NSC 2018</span>
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
