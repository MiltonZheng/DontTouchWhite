// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        targetToggle:cc.Toggle,
        targetParticle:cc.ParticleSystem,
        hasPlay:false
    },

    // LIFE-CYCLE CALLBACKS:
    
    // onLoad () {},

    start () {
        
    },

    update (dt) {
        if(this.hasPlay) return;
        if(this.targetToggle.isChecked){
            this.targetParticle.resetSystem()
            
            this.hasPlay=true;
        }
    },
});
