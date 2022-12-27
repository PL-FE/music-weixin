import { defineStore } from "pinia";
export const musicStore = defineStore('musicStore', {
    state: () => {
        return {
            curSong: {},
            bgAudioManager:{},
            isPlaying:false,
            songTime:0,
        }
    },
    actions: {
        setSong(song:songTypes) {
            this.curSong = song
        },
        setBgAudioManager(bgAudioManager:any) {
            this.bgAudioManager = bgAudioManager
        },
        setPlay(flag:boolean){
            this.isPlaying = flag
        },
        setSongTime(time:number){
            this.songTime = time
        }
    }
})
