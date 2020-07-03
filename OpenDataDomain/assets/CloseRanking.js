// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //Canvas: cc.Node,
        rankScrollView: cc.Node,
        CloseBtn:cc.Node
    },

    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },


    start () {

    },

    closeRank(){
        console.log("closeRank!");
        this.rankScrollView.active=false;
        this.CloseBtn.active=false;
    },

    // update (dt) {},
});
