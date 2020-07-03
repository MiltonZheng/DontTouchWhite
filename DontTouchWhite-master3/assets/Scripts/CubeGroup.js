// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        black: cc.Node,
        whitesParent: cc.Node,
        blackPos:0,
        speed:1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.manager=cc.find("GameManager").getComponent("GameManager");
        this.blackComp=this.black.getComponent("BlackCube")
        this.cubeWidth=cc.find("Canvas").width/4;
        this.screenHeight=cc.find("Canvas").height/4
        this.blackBtn=this.black.getComponent(cc.Button)
    },

    update(dt)
    {
        if(!this.manager.gameEnd&&!this.manager.gamePause)
        {
            this.node.y-=this.speed*dt;
        }
        //console.log(this.node.y)
        if(this.node.y<-this.screenHeight*2)
        {
            if(this.blackComp.id==0) this.manager.gameEnd=true;
            this.blackComp.particle.node.active=false; //将粒子不可见
            
            this.localReset()
            
        }
    },

    //由于速度的加快，reset的y轴设置有误差
    localReset()
    {
        this.blackBtn.interactable=true
        if(this.manager.highest%6 == 5)
        {
            this.node.y = this.manager.cubeList[this.manager.highest++%6].y + this.screenHeight-1.5*this.manager.currenSpeed/80;
            //console.log("Special Set")
        }
        else
        {this.node.y = this.manager.cubeList[this.manager.highest++%6].y + this.screenHeight;}
        //console.log("Highest:"+this.manager.cubeList[(this.manager.highest-1)%6].y)
        //console.log("Y:"+this.node.y)        
        this.blackPos = Math.floor (Math.random()*4)//重置黑块位置
        //console.log(this.node.name+":"+this.node.y)
        let children = this.whitesParent.children
    
        let i=0;
        for(let j=0;j<4;j++){
            if(this.blackPos==j){
                this.black.x=j*this.cubeWidth-207;
                continue;
            }
            children[i++].x=j*this.cubeWidth-207;
        }
    },

    reset(y,screenHeight){
        this.blackBtn.interactable=true
        
        this.node.y = y*screenHeight-screenHeight;
        
        this.blackPos = Math.floor (Math.random()*4)//重置黑块位置
        //console.log(this.node.name+":"+this.node.y)
        let children = this.whitesParent.children
    
        let i=0;
        for(let j=0;j<4;j++){
            if(this.blackPos==j){
                this.black.x=j*this.cubeWidth-207;
                continue;
            }
            children[i++].x=j*this.cubeWidth-207;
        } 
        //console.log(this.node.y)
    
    },

    
});
