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

    },

    ctor() {
        this.speed = 1;
        this.minPos = 0;
        this.maxPos = 180;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {
        this.node.color = new cc.Color(255, 255, 0);
        this.halfWidth = this.node.width/2;
    },
    
    update (dt) {
        if ((this.node.x+this.halfWidth>=this.maxPos && this.speed>0) || (this.node.x-this.halfWidth<=this.minPos && this.speed<0)) {
            this.speed *= -1;
        }
        this.node.x += this.speed;
    },

    setRange(min, max) {
        this.min = min;
        this.max = max;
    },

    onCollisionEnter(other, self) {
        let pos = other.node.getPosition();
        if (other.world.aabb.y > other.world.preAabb.y) {
            // cc.log('jump up');
        } else {
            other.node.getComponent('rabbit').jump();
            // cc.log('jump down');
        }
    }
});
