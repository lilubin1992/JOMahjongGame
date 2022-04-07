
import { _decorator, Component, Node, SpriteAtlas, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MahjongMgr
 * DateTime = Tue Apr 05 2022 23:06:20 GMT+0800 (中国标准时间)
 * Author = 裤子三十八
 * FileBasename = MahjongMgr.ts
 * FileBasenameNoExtension = MahjongMgr
 * URL = db://assets/scripts/MahjongMgr.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('MahjongMgr')
export class MahjongMgr extends Component {

    private static _inst: MahjongMgr | null = null;

    static get instance(): MahjongMgr {
        return this._inst;
    }

    @property(SpriteAtlas)
    private bottomAtlas: SpriteAtlas = null;

    @property(SpriteFrame)
    private B_bamboo_1: SpriteFrame = null;

    sayhello(params:string) {
        console.log("hello");
    }

    /**
     * 
     */
    public getBottomMJSpriteFrame(mjId: string): SpriteFrame {
        var atlas = this.bottomAtlas;
        return this.bottomAtlas.getSpriteFrame(mjId);
    }

    start () {
        console.log("mahjongmgr start...");
        
    }

    onLoad() {
        console.log("mahjongmgr onload...");
        // onLoad中对该静态实例变量赋值，才可以加载出设置的spriteFrame等相关属性
        MahjongMgr._inst = this;
    }

}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
