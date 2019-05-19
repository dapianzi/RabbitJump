// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        a: -5,
        v0: 40,
        vx: 0,
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    
    start () {
        this._v = this.v0;
        this._vx = 0;
        this._accX = 0;
        this.node.y = -50;
        console.log(this.node.getPosition());
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotion, this);
    },
    
    update (dt) {
        this._v += this.a;
        this.node.y += this._v;
        this._vx = this.vx * this._accX;
        this.node.x += this._vx;
    },

    onDeviceMotion(e) {
        cc.log(this._accX);
        this._accX = e.acc.y <= -1 ? -e.acc.x : e.acc.x;
    },

    onCollisionEnter(other, self) {
        let pos = self.node.getPosition();
        if (self.world.aabb.y > self.world.preAabb.y) {
            console.log('jump up');
        } else {
            this._v = this.v0;
            console.log('jump down');
        }
    }
});