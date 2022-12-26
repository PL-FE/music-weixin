import { defineStore } from "pinia";
export const musicStore = defineStore('musicStore', {
    state: () => {
        return {
            curSong: {}
        }
    },
    actions: {
        setSong(song) {
            this.curSong = song
        }
    }
})
