<template>
    <v-container mt-4>
        <v-layout>
            <v-flex xs12 sm6 md4 >
                <v-card>
                    <v-card-media
                    class="white--text"
                    height="200px"
                    src="https://www.ncl.com/sites/default/files/DestinationGalleries.Hawaii.SnorkelingBay900x400.jpg"
                    >
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline">Hawaii five o</span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                    <v-card-title>
                        <div>
                            <span class="grey--text">1-Jan-2018</span><br>
                            <span>Hawaii</span><br>
                            <span>Short description</span>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat color="orange">View</v-btn>
                        <v-btn flat color="orange">Explore</v-btn>
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
            >
              <v-icon>add</v-icon>
            </v-btn>
    </v-container>
</template>