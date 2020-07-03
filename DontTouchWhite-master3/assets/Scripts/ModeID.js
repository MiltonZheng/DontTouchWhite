// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//游戏模式，1：冒险模式，2：计时模式，3：极速模式
var ModeID=cc.Class({
    extends: cc.Component,
 
    properties: {
              
    },
    statics:{
        self:null,
         getInstance:function()
         {
                if(ModeID.self==null)
                {
                    var node=new cc.Node("GameManager");
                    ModeID.self=node.addComponent(ModeID);
                }
                return ModeID.self;
         } 
    },
 
 ctor() //构造函数
    {
        this.id=0;
        this.levelId=0;
        this.musicId=0;
        this.initSpeed=80;
        this.speedTime=5;
        this.speedCount=10;
        ModeID.self=this;
    },
});

