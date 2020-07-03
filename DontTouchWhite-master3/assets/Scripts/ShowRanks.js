// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        wxSubContextView: cc.Node,
        closeRanks:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad () {
        // 获取授权
        this.initUserInfoButton();
    },

    showRanks() {
        console.log('执行showRanks！');
        if (typeof wx === 'undefined') {
            return;
        }
        console.log(this.wxSubContextView.active);

        if (!this.wxSubContextView.active) {
            // 设置容器可见
            console.log('设为真！');
            this.closeRanks.active=true;
            this.wxSubContextView.active = true;

            // 设置随机数(把这个当做玩家每局结算时的分数)
            //在实际整合的时候需要修改
            //let score = Math.round(Math.random()*10);

            // 发送结算分数到开放域
            wx.getOpenDataContext().postMessage({
                message: 'showrank',
            });
        }
        else {
            // 设置容器不可见，即关闭排行榜，并让开放域清空排名信息
            this.wxSubContextView.active = false;
            wx.getOpenDataContext().postMessage({
                message: 'clear'
            });
        }
    },

    closeRank(){
        console.log('执行closeRanks！');
        if (typeof wx === 'undefined') {
            return;
        }
        this.closeRanks.active=false;
        this.wxSubContextView.active = false;
        wx.getOpenDataContext().postMessage({
                message: 'clear'
            });
    },

    initUserInfoButton () {
        // 微信授权，此代码来自Cocos官方
        if (typeof wx === 'undefined') {
            return;
        }

        let systemInfo = wx.getSystemInfoSync();
        let width = systemInfo.windowWidth;
        let height = systemInfo.windowHeight;
        let button = wx.createUserInfoButton({
            type: 'text',
            text: '',
            style: {
                left: 0,
                top: 0,
                width: width,
                height: height,
                lineHeight: 40,
                backgroundColor: '#00000000',
                color: '#00000000',
                textAlign: 'center',
                fontSize: 10,
                borderRadius: 4
            }
        });

        button.onTap((res) => {
            if (res.userInfo) {
                // 可以在这里获取当前玩家的个人信息，如头像、微信名等。
                console.log('授权成功！');
                console.log('gdfgdsdhsdfg！');
            }
            else {
                console.log('授权失败！');
            }

            button.hide();
            button.destroy();
        });
    },
});
