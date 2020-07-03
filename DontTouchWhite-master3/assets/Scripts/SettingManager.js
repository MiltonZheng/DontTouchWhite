// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var musicID = require('MusicID');

cc.Class({
    extends: cc.Component,

    properties: {


        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },



    backToStartScene()
    {
        cc.director.loadScene("StartScene")
    },
    // LIFE-CYCLE CALLBACKS:

     /*onLoad () {
         var node = cc.director.getScene().getChildByName('sound track');
     },*/

     setMute(){
       this.AudioSetMute = cc.find("SoundTrackControl").getComponent("SoundTrackControl");
       //console.log(AudioSetMute);
       this.AudioSetMute.MuteBGMusic();
       musicID.GameMusicMute = 1;
     },

     

    cancleMute(){
        this.AudioSetMute = cc.find("SoundTrackControl").getComponent("SoundTrackControl");
        //console.log(AudioSetMute);
        this.AudioSetMute.cancleMuteBGMusic();
        musicID.GameMusicMute = 0;
    },

    playGameMusicForRisk(){
        this.AudioSetMute = cc.find("SoundTrackControl").getComponent("SoundTrackControl");
        //console.log(AudioSetMute);
        this.AudioSetMute.playGameMusicForRisk();
    },

    playGameMusic(){
        this.AudioSetMute = cc.find("SoundTrackControl").getComponent("SoundTrackControl");
        //console.log(AudioSetMute);
        this.AudioSetMute.playGameMusic();
    },

    stopGameMusic(){
        this.AudioSetMute = cc.find("SoundTrackControl").getComponent("SoundTrackControl");
        //console.log(AudioSetMute);
        this.AudioSetMute.stopGameMusic();
    },

    pauseGameMusic(){
        this.AudioSetMute = cc.find("SoundTrackControl").getComponent("SoundTrackControl");
        //console.log(AudioSetMute);
        this.AudioSetMute.pauseGameMusic();
    },

    resumeBGMusic(){
        this.AudioSetMute = cc.find("SoundTrackControl").getComponent("SoundTrackControl");
        //console.log(AudioSetMute);
        this.AudioSetMute.resumeBGMusic();
    },

    start () {

    },

    // update (dt) {},
});
