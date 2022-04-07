
import { _decorator, Component, Node, find, Sprite, SpriteFrame, resources, SpriteAtlas } from 'cc';
import { MahjongMgr, MJNum, MJType } from './MahjongMgr';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = mjgame
 * DateTime = Tue Apr 05 2022 20:03:12 GMT+0800 (中国标准时间)
 * Author = 裤子三十八
 * FileBasename = mjgame.ts
 * FileBasenameNoExtension = mjgame
 * URL = db://assets/scripts/mjgame.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('mjgame')
export class mjgame extends Component {

    start () {
        console.log("mjgame start...");
        // var holds = find("Canvas/game/myself/holds", this.node);
        var tNode = this.node;
        var game = this.node.getChildByName("game");
        var holds = this.node.getChildByPath("game/myself/holds");
        // for (let index = 0; index < holds.children.length; index++) {
        //     const element = holds.children[index];
        //     var thisSprite = element.getComponent(Sprite);
        //     thisSprite.spriteFrame
        //     console.log("element"+element);

        // }

        // resources.load("textures/MJ/bottom/B_bamboo_1/spriteFrame", SpriteFrame, (err, data) => {
        //     for (let index = 0; index < holds.children.length; index++) {
        //         const element = holds.children[index];
        //         var thisSprite = element.getComponent(Sprite);
        //         thisSprite.spriteFrame = data;
        //     }
        // });
        var spr = MahjongMgr.instance.getMJName(MJType.TIAO, MJNum.Five);
        console.log("mjname: "+spr);
        // resources.load("textures/MJ/bottom/Z_bottom", SpriteAtlas, (err, atlas) => {
            for (let index = 0; index < 9; index++) {
                const spriteName = "B_bamboo_"+(index+1);
                const element = holds.children[index];
                // element.getComponent(Sprite).spriteFrame = atlas.getSpriteFrame(spriteName);
            }
            // var mah = new MahjongMgr();
            holds.children[1].getComponent(Sprite).spriteFrame = MahjongMgr.instance.getBottomMJSpriteFrame("B_bamboo_1");
        // });
        holds.children[2].getComponent(Sprite).spriteFrame = MahjongMgr.instance.getBottomMJSpriteFrame("B_bamboo_2");
        holds.children[5].getComponent(Sprite).spriteFrame = MahjongMgr.instance.getBottomMJSpriteFrame("B_bamboo_5");
        holds.children[0].getComponent(Sprite).spriteFrame = MahjongMgr.instance.getBottomMJSpriteFrame("B_bamboo_8");

    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
