// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.pos=0
        this.posX=this.node.getParent().x
        this.parent=this.node.getParent().getParent()
    },

    update (dt) {
        this.pos=this.parent.x
        let scale=1-Math.abs(Math.abs(this.pos)-this.posX)/478
        //console.log(scale)
        //console.log(this.pos)
        this.node.width=70*scale;
        this.node.height=310*scale;
        this.node.opacity=255*scale
        //console.log(this.node.name+this.posX)
        //console.log(this.node.size)
    },
});
