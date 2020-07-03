// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// AudioEngine.js

var musicid = require('MusicID');
var ModeID=require('ModeID');

cc.Class({
    extends: cc.Component,

    properties: {
        audio: {
            default: null,
            type: cc.AudioClip
        },
        gameMusic:{
            default:[],
            type:[cc.AudioClip]
        }
        
    },

    onLoad: function () {
        this.playBGMusic();
        cc.game.addPersistRootNode(this.node);
    },

    playBGMusic:function(){
        this.current = cc.audioEngine.play(this.audio,false,0.4);
        musicid.id[0] = this.current;
        //console.log("musicid");
        //console.log(musicid.sumMusic);
        //console.log(musicid.id[musicid.sumMusic]);
    },

    setLoop: function () {
        cc.audioEngine.setLoop(this.audio, true);
    },

    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    },

    MuteGameMusic(){
        musicid.GameMusicMute = true;
    },

    CancleMuteGameMusic(){
        musicid.GameMusicMute = false;
    },

    MuteBGMusic:function () {//静音背景音乐
        cc.audioEngine.setVolume(musicid.id[0],0);
    },
    
    cancleMuteBGMusic:function(){//取消背景音乐静音
        cc.audioEngine.setVolume(musicid.id[0],0.4);
    },

    playGameMusicForRisk:function(){
        cc.audioEngine.pause(musicid.id[0]);   
        
            if(ModeID.getInstance().levelId==0)
            {
                this.current = cc.audioEngine.play(this.gameMusic[0],true,0.5);
                musicid.GameMusicID = this.current;
            }
            else if(ModeID.getInstance().levelId==1)
            {
                this.current = cc.audioEngine.play(this.gameMusic[1],true,0.5);
                musicid.GameMusicID = this.current;
            }
            else if(ModeID.getInstance().levelId==2)
            {
                this.current = cc.audioEngine.play(this.gameMusic[2],true,0.5);
                musicid.GameMusicID = this.current;
            }
            else if(ModeID.getInstance().levelId==3)
            {
                this.current = cc.audioEngine.play(this.gameMusic[3],true,0.5);
                musicid.GameMusicID = this.current;
            }
            else if(ModeID.getInstance().levelId==4)
            {
                this.current = cc.audioEngine.play(this.gameMusic[4],true,0.5);
                musicid.GameMusicID = this.current;
            }
        
    },

    playGameMusic:function(){
        cc.audioEngine.pause(musicid.id[0]);   
        
            if(ModeID.getInstance().musicId==0)
            {
                this.current = cc.audioEngine.play(this.gameMusic[0],true,0.5);
                musicid.GameMusicID = this.current;
            }
            else if(ModeID.getInstance().musicId==1)
            {
                this.current = cc.audioEngine.play(this.gameMusic[1],true,0.5);
                musicid.GameMusicID = this.current;
            }
            else if(ModeID.getInstance().musicId==2)
            {

                this.current = cc.audioEngine.play(this.gameMusic[2],true,0.5);
                musicid.GameMusicID = this.current;
            }
            else if(ModeID.getInstance().musicId==3)
            {
                this.current = cc.audioEngine.play(this.gameMusic[3],true,0.5);
                musicid.GameMusicID = this.current;
            }
            else if(ModeID.getInstance().musicId==4)
            {
                this.current = cc.audioEngine.play(this.gameMusic[4],true,0.5);
                musicid.GameMusicID = this.current;
            }
        
    },

    stopGameMusic:function(){
        cc.audioEngine.stop(musicid.GameMusicID);
    },

    pauseGameMusic:function(){
        cc.audioEngine.pause(musicid.GameMusicID);
    },
    resumeGameMusic:function(){
        cc.audioEngine.resume(musicid.GameMusicID);
    },
    resumeBGMusic:function(){
        cc.audioEngine.resume(musicid.id[0]);
    },
});