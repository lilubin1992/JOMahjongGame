
import { _decorator, Component, Node, SpriteAtlas, SpriteFrame, Prefab, instantiate } from 'cc';
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

/*
0 ~ 8 : tong
9 ~ 17: tiao
18 ~ 26: wan
*/

export enum SeatSide {
    Myself = "Myself",
    Right = "Right",
    Left = "Left",
    Up = "Up"
}

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

enum MJSide {
    Left = "L",
    Myself = "B",
    Right = "R",
    Up = "B"
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

    @property(SpriteAtlas)
    private emptyAtlas: SpriteAtlas = null;

    @property(Prefab)
    private pengGangLeftRight: Prefab = null;

    @property(Prefab)
    private pengGangUpDown: Prefab = null;

    private readonly emptyHoldMap: Map<SeatSide, string> = new Map([
        [SeatSide.Right, "e_mj_right"],
        [SeatSide.Up, "e_mj_up"],
        [SeatSide.Left, "e_mj_left"]
    ]);

    getPengGangLeftRightNode(): Node {
        return instantiate(this.pengGangLeftRight);
    }

    getSideFoldsAtlas(side: SeatSide): SpriteAtlas {
        switch (side) {
            case SeatSide.Up:
            case SeatSide.Myself:
                return this.bottomFoldsAtlas;
            case SeatSide.Left:
                return this.leftFoldsAtlas;
            case SeatSide.Right:
                return this.rightFoldsAtlas;
        }
    }

    getMJType(mj: number): MJType {
        if (mj < 9) {
            return MJType.TONG;
        } else if (mj < 18) {
            return MJType.TIAO;
        } else {
            return MJType.WAN;
        }
    }

    getMJSide(side: SeatSide): MJSide {
        switch (side) {
            case SeatSide.Myself:
                return MJSide.Myself;
            case SeatSide.Left:
                return MJSide.Left;
            case SeatSide.Right:
                return MJSide.Right;
            case SeatSide.Up:
                return MJSide.Up;
        }
    }

    // 获取mj对应的相对数字
    getMJAbsNum(mj: number): MJNum {
        return mj % 9 + 1;
    }

    getMJSpriteFrameName(side: MJSide, type: MJType, num: MJNum): string {
        return side + '_' + type + "_" + num;
    }

    getFoldMJSpriteFrame(side: SeatSide, num: number): SpriteFrame {
        var mjSide = this.getMJSide(side);
        var mjType = this.getMJType(num);
        var mjNum = this.getMJAbsNum(num);
        var mjName = this.getMJSpriteFrameName(mjSide, mjType, mjNum);
        var atlas = this.getSideFoldsAtlas(side);
        return atlas.getSpriteFrame(mjName);
    }
    
    getHoldMJSpriteFrame(side: SeatSide, num: number | null): SpriteFrame {
        if (side == SeatSide.Myself) {
            var mjName = this.getMyselfHoldMJSpriteFrameName(num);
            console.log("num: "+num+"; sprite: " + mjName);
            
            return this.myselfHoldsAtlas.getSpriteFrame(mjName);
        } else {
            return this.getEmptyHoldMJSpriteFrame(side);
        }
    }

    getMyselfHoldMJSpriteFrameName(num: number): string {
        var mjType = this.getMJType(num);
        var mjNum = this.getMJAbsNum(num);
        return "M_" + mjType + "_" + mjNum;
    }

    getEmptyHoldMJSpriteFrame(side: SeatSide): SpriteFrame {
        return this.emptyAtlas.getSpriteFrame(this.emptyHoldMap.get(side));
    }

    // public getHoldMJSpriteFrame(type: MJType, num: MJNum): SpriteFrame {
    //     var mj = this.getMJName(type, num);
    //     return this.bottomFoldsAtlas.getSpriteFrame(mj);
    // }

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
