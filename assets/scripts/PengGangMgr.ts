
import { _decorator, Component, Node, Sprite } from 'cc';
import { MahjongMgr, SeatSide } from './MahjongMgr';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PengGangMgr
 * DateTime = Mon Apr 18 2022 00:17:13 GMT+0800 (中国标准时间)
 * Author = 裤子三十八
 * FileBasename = PengGangMgr.ts
 * FileBasenameNoExtension = PengGangMgr
 * URL = db://assets/scripts/PengGangMgr.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
 enum PengGangNode {
    Peng = "Peng",
    Gang = "Gang"
}

@ccclass('PengGangMgr')
export class PengGangMgr extends Component {

    initMahjong(side: SeatSide, num: number[]) {
        var gangNode = this.node.getChildByName(PengGangNode.Gang);
        gangNode.active = num.length == 4;

        for (let index = 0; index < num.length; index++) {
            const mjNum = num[index];
            var node = this.node.children[index];
            node.getComponent(Sprite).spriteFrame = MahjongMgr.instance.getFoldMJSpriteFrame(side, mjNum);
        }
    }

    start () {
        // [3]
        this.initMahjong(SeatSide.Right, [1,2,3]);
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
