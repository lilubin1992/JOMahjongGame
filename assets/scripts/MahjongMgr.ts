
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

export enum MJType {
    WAN = "character",
    TONG = "dot",
    TIAO = "bamboo"
}

export enum MJNum {
    One = 1,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine
}

enum SeatSide {
    Pre = "L",
    Myself = "B",
    Next = "R",
    Cross = "B"
}
 
@ccclass('MahjongMgr')
export class MahjongMgr extends Component {

    private static _inst: MahjongMgr | null = null;

    static get instance(): MahjongMgr {
        return this._inst;
    }

    @property(SpriteAtlas)
    private bottomFoldsAtlas: SpriteAtlas = null;

    @property(SpriteAtlas)
    private leftFoldsAtlas: SpriteAtlas = null;

    @property(SpriteAtlas)
    private rightFoldsAtlas: SpriteAtlas = null;

    @property(SpriteAtlas)
    private myselfHoldsAtlas: SpriteAtlas = null;


    @property(SpriteFrame)
    private B_bamboo_1: SpriteFrame = null;

    getMJName(type: MJType, num: MJNum): string {
        return type + "_" + num;
    }

    public getBottomMJSpriteFrame(mjId: string): SpriteFrame {
        return this.bottomFoldsAtlas.getSpriteFrame(mjId);
    }

    public getHoldMJSpriteFrame(type: MJType, num: MJNum): SpriteFrame {
        var mj = this.getMJName(type, num);
        return this.bottomFoldsAtlas.getSpriteFrame(mj);
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
