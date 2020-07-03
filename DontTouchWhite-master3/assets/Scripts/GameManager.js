// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var ModeID=require('ModeID');
var musicid = require('MusicID');

cc.Class({
    extends: cc.Component,

    properties: {
        gameEnd:false,   
        gamePause:false,
        prefab:cc.Prefab,
        cubes:cc.Node,
        endUI:cc.Node,

        starUI:cc.Node,
        slider:cc.Sprite,

        starCount:0,
        score:0,
        scoreLabel:cc.Label,
        totalScoreLabel:cc.Label,
        speedLevel:30,   //单次加速量
        currenSpeed:0,   //当前速度
        speedTime:10,    //加速频率
        highest:5,      //最顶层的cube所处的子层位置

        //toggle组
        toggle1:cc.Toggle,
        toggle2:cc.Toggle,
        toggle3:cc.Toggle,

        targetScore:cc.Label,  //冒险模式目标分数
        scoreLabel2:cc.Label,  //冒险模式当前分数

        simpleScoreUI:cc.Node,
        RiskScoreUI:cc.Node,

        endAnim:cc.Animation,
        endPanelLable:cc.Label

    },
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
             
    },

    start () {
        this.canvas=cc.find("Canvas")
        this.screenHeight=cc.find("Canvas").height/4
        this.cubeList=this.cubes.children;
        this.starList=this.starUI.children;

        this.modeId=ModeID.getInstance().id;
        this.cubeComponents=[]

        this.levelId=ModeID.getInstance().levelId;

        for(let i=0;i<6;i++)
        {
            let cubeGroup = this.cubeList[i].getComponent("CubeGroup")
            this.cubeComponents[i]=cubeGroup;
        }

        //闯关模式分数
        this.levelTarget=[]
        this.levelTarget[0]=20
        this.levelTarget[1]=40
        this.levelTarget[2]=70
        this.levelTarget[3]=100
        this.levelTarget[4]=120
        this.animPlayed=false;
        
        this.startMode() 
        this.gameStop() 
    },

    update (dt) {
        //游戏结束判定
        if(this.gameEnd)
        {
            if(this.modeId==1) this.endPanelLable.string="选择关卡"
            else if(this.modeId==2) this.endPanelLable.string="重设参数"
            else if(this.modeId==3) this.endPanelLable.string="选择音乐"
            //console.log("游戏结束")
            this.endUI.active=true;
            //结束游戏音乐的播放
            this.AudioSetMute = cc.find("SoundTrackControl").getComponent("SoundTrackControl");
            this.AudioSetMute.stopGameMusic();
            
            //冒险模式分数判定
            if(this.modeId==1)
            {
                if(this.score>=this.levelTarget[this.levelId]){
                    this.starCount=3;                    
                }
                else if(this.score>=this.levelTarget[this.levelId]/4*3)
                {
                    this.starCount=2;
                }
                else if(this.score>=this.levelTarget[this.levelId]/2)
                {
                    //1星
                    this.starCount=1;
                }
                
                
                for(let i=0;i<this.starCount;i++)
                {
                    this.starList[i].active=true;
                }
                //console.log(this.starCount)
            }
            this.totalScoreLabel.string=this.score
            if(!this.animPlayed)
            {
                this.endAnim.play('EndPanelAnim')
                this.animPlayed=true;
            } 
        }
        //分数更新
        else{
            this.scoreLabel.string=this.score;
            this.scoreLabel2.string=this.score;
            if(this.modeId==1)
            {
                this.slider.fillRange=this.score/this.levelTarget[this.levelId]
            }
        }
        //冒险模式到达分数后结束
        if(this.modeId==1)
        {
            //toggle检测
            if(this.score>=this.levelTarget[this.levelId]){
                this.toggle3.isChecked=true;                   
            }
            else if(this.score>=this.levelTarget[this.levelId]/4*3)
            {
                this.toggle2.isChecked=true;
            }
            else if(this.score>=this.levelTarget[this.levelId]/2)
            {
                //1星
                this.toggle1.isChecked=true;
            }
            if(this.score==this.levelTarget[this.levelId]){
                this.gameEnd=true;
            }
        }
        //加速
        if(~~(this.score/this.speedTime+1) > this.currenSpeed/this.speedLevel){
            this.currenSpeed=~~(this.score/this.speedTime+1)*this.speedLevel;
            this.setSpeed(this.currenSpeed)
        }

        if(this.modeId==3){
            wx.getOpenDataContext().postMessage({
                message: 'update',
                score: this.score
            });
        }


    },

    

    //改变黑块id
    changeCubeId()
    {
        for(let i=0;i<6;i++)
        {            
            if(this.cubeComponents[i].blackComp.id!=0)
            {
                //console.log(this.cubeComponents[i].blackComp.id)
                this.cubeComponents[i].blackComp.id-=1;
            }
            else{
                this.cubeComponents[i].blackComp.id=5;
            }
        }
    },

    //回到开始界面
    backToStartScene()
    {
        this.AudioSetMute = cc.find("SoundTrackControl").getComponent("SoundTrackControl");
        this.AudioSetMute.resumeBGMusic();
        ModeID.getInstance().id=0;
        cc.director.loadScene("StartScene")
    },

    //返回上级面板
    backToStartPanel()
    {
        this.AudioSetMute = cc.find("SoundTrackControl").getComponent("SoundTrackControl");
        this.AudioSetMute.resumeBGMusic();
        cc.director.loadScene("StartScene")
    },

    gameStop()
    {
        //暂停音乐
        this.AudioSetMute = cc.find("SoundTrackControl").getComponent("SoundTrackControl");
        this.AudioSetMute.pauseGameMusic();
        
        if(this.gameEnd) return;
        this.gamePause=true;
        for(let i=0;i<6;i++)
        {            
            if(this.cubeComponents[i].blackComp.id==0)
            {
                this.cubeComponents[i].blackComp.stopLabel.active=true;
            }
        }
    },

    //游戏开始，根据模式载入
    startMode()
    {
        //console.log(this.modeId)
        if(this.modeId==3){
            this.fastMode();                        
        }
        else if(this.modeId==1)
        {
            this.riskMode(this.levelId)
        }
        else if(this.modeId==2)
        {
            this.selfMode()
        }
    },

    //为所有cube设置速度
    setSpeed(speed)
    {
        for(let i=0;i<6;i++)
        {
            this.cubeComponents[i].speed=speed;
        }
        console.log("setSpeed:"+speed)
    },

    fastMode()
    {
        for(let i=0;i<3;i++){
            this.starList[i].active=false;
        }
        this.simpleScoreUI.active=true;
        this.RiskScoreUI.active=false;
        this.speedLevel=100;
        this.currenSpeed=100;
        this.speedTime=5;
        this.gameEnd=false;
        this.gamePause=false;
        this.score=0;
        this.endUI.active=false;
        //console.log("FastMode On")
        for(let i=0;i<6;i++)
        {
            this.cubeComponents[i].reset(i,this.screenHeight)
            this.cubeComponents[i].blackComp.id=i;
        }
        this.setSpeed(this.currenSpeed)
        
    },

    selfMode()
    {
        //关闭冒险模式UI
        for(let i=0;i<3;i++){
            this.starList[i].active=false;
        }
        this.simpleScoreUI.active=true;
        this.RiskScoreUI.active=false;
        this.speedLevel=ModeID.getInstance().speedCount;
        this.currenSpeed=ModeID.getInstance().initSpeed;
        this.speedTime=ModeID.getInstance().speedTime;
        this.gameEnd=false;
        this.gamePause=false;
        this.time=0;
        this.endUI.active=false;

        for(let i=0;i<6;i++)
        {
            this.cubeComponents[i].reset(i,this.screenHeight)
            this.cubeComponents[i].blackComp.id=i;
        }
        this.setSpeed(this.currenSpeed)
    },

    riskMode(id)
    {
        for(let i=0;i<3;i++){
            this.starList[i].active=false;
        }
        this.simpleScoreUI.active=false;
        this.RiskScoreUI.active=true;
        this.targetScore.string= this.levelTarget[this.levelId]+"/"
        this.speedLevel=80+20*id;
        this.currenSpeed=80+20*id;
        this.speedTime=5;
        this.gameEnd=false;
        this.gamePause=false;
        this.score=0;
        this.endUI.active=false;
        //console.log("FastMode On")
        for(let i=0;i<6;i++)
        {
            this.cubeComponents[i].reset(i,this.screenHeight)
            this.cubeComponents[i].blackComp.id=i;
        }
        this.setSpeed(this.currenSpeed)
    },

    reload()
    {
        //console.log(ModeID.getInstance().id+"     "+musicid.GameMusicMute+"      "+ModeID.getInstance().musicId);
        if(ModeID.getInstance().id==1)
        {
            this.AudioSetMute = cc.find("SoundTrackControl").getComponent("SoundTrackControl");
            this.AudioSetMute.playGameMusicForRisk();
        }
        else if(ModeID.getInstance().id==2||ModeID.getInstance().id==3)
        {
            this.AudioSetMute = cc.find("SoundTrackControl").getComponent("SoundTrackControl");
            this.AudioSetMute.playGameMusic();
        }
        cc.director.loadScene("GameScene");
    }

});
