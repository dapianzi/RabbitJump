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
        stepAI: [cc.String],
        monsterAI: [cc.String],
        itemAI: [cc.String],
        doodle: {
            type: cc.Node,
            name: '兔子',
            default: null
        },
        step: {
            type: cc.Prefab,
            displayName: '台阶',
            default: null
        },
        camera: {
            type: cc.Node,
            name: '镜头',
            default: null
        },
        minStep: 20,
        maxStep: 150,
        bg0: cc.Node,
        bg1: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this._level = 0;
        this._bgHeight = this.bg0.height;
        this._stepHeight = -this._bgHeight/2;
        this._sceneHeight = this._bgHeight;
        this._score = 0;
        this._records = {};

        this.manager = cc.director.getCollisionManager();
        this.manager.enabled = true;
        // cc.systemEvent.setAccelerometerEnabled(true);
        this._init();

        // 碰撞检测
        // this.node.on
        // 

    },

    update (dt) {



    },

    _init() {
        this._createScene();
    },

    // 循环生成背景
    bgMove() {
        this._sceneHeight += this._bgHeight;
        this._level = Math.log2(this._sceneHeight/this._bgHeight - 1);
        this._createScene();
    },

    cameraMove(y) {
        if (this.camera.y < y) {
            this.camera.y = y;
        }
    },

    // 随机生成场景
    _createScene () {
        let max = this.minStep + (this._level+1) * 40;
        let min = this.minStep;
        while (this._stepHeight < this._sceneHeight) {
            // 随机台阶
            let distance = Math.random() * (max-min) + min;
            this._stepHeight += distance;
            let step = new cc.instantiate(this.step);
            step.setParent(this.node);
            // cc.log(step);
            let rate = Math.random();
            if (rate <= 0.8) {
                step.addComponent(this.stepAI[0]);
            } else {
                step.addComponent(this.stepAI[1]);
            }
            step.y = this._stepHeight;
            step.x = Math.random() * 300 -150;
            // 随机怪物
            // 随机道具
        } 
    },

});
