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

    ctor() {
        this._v = 0;
        this._vx = 0;
        this._accX = 0;
        this._half = 0;
        this._sceneWidth = 0;
        this._maxX = 0;
        this._minX = 0;
    },
    
    // LIFE-CYCLE CALLBACKS:
    
    // onLoad () {},
    
    start () {
        this._v = this.v0;
        this._half = this.node.width/2;
        this._sceneWidth = this.node.getParent().width;
        this._maxX = this._sceneWidth/2;
        this._minX = -this._maxX;
        this._game = this.node.getParent().getComponent('game');
        // this.node.y = -50;
        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotion, this);
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    
    update (dt) {
        this._v += this.a;
        this.node.y += this._v;
        this._vx = this.vx * this._accX;
        this.node.x += this._vx;
        if (this.node.x >= this._maxX) {
            this.node.x -= this._sceneWidth;
        } else if (this.node.x <= this._minX) {
            this.node.x += this._sceneWidth;
        }
        this._game.cameraMove(this.node.y);
    },

    jump(mul) {
        mul = mul || 1;
        this._v = this.v0*mul;
    },

    onDeviceMotion(e) {
        this._accX = e.acc.y <= -1 ? -e.acc.x : e.acc.x;
    },

    onKeyDown (e) {
        if (e.keyCode == 39) {
            this._accX = 1;
        } else if (e.keyCode == 37) {
            this._accX = -1;
        }
    },

    onKeyUp (e) {
        this._accX = 0;
    },

    onCollisionEnter(other, self) {
        // cc.log(other);
    }
});