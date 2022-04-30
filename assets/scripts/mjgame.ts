
import { _decorator, Component, Node, find, Sprite, SpriteFrame, resources, SpriteAtlas, Game, director } from 'cc';
import { MockMachine } from './component/MockMachine';
import { GameData, SeatData } from './component/SeatData';
import { MahjongMgr, MJNum, MJType, SeatSide } from './MahjongMgr';
import { PengGangMgr } from './PengGangMgr';

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


enum MJGameNode {
    Game = "Game",
    Myself = "Myself",
    Right = "Right",
    Folds = "Folds",
    Holds = "Holds",
    ChuPai = "ChuPai",
    PengGang = "PengGangs"
}
 
@ccclass('mjgame')
export class mjgame extends Component {

    private _game = new GameData();
    
    private _sides = [SeatSide.Myself, SeatSide.Right, SeatSide.Up, SeatSide.Left];

    private _foldsMap: Map<string, Sprite[]> = null;

    private _upFolds: Node[] = null;

    public get foldsMap() : Map<string, Sprite[]> {
        return this._foldsMap;
    }
    
    public set upFolds(v : Node[]) {
        console.log(">>> set upFolds first node: " + v[0].name);
        this._upFolds = v;
    }
    
    public get upFolds() : Node[] {
        return this._upFolds;
    }

    start () {
        // console.log("mjgame start...");
        this.hideAllChuPai();
        this.initFoldsMap();
        this.testUpFold1();
        this._game = new GameData();
        this.refreshMahjongs(this._game);
        this.testUpFold1();
    }

    onLoad() {
        // console.log("mjgame onload...");
    }

    refreshMahjongs(game: GameData) {
        for (let index = 0; index < game.seats.length; index++) {
            const seat = this.getIndexSeat(game, index);
            this.refreshFolds(seat.side, seat.folds);
            this.refreshHolds(seat.side, seat.holds);
            this.refreshPengGang(seat.side);
        }
    }

    getIndexSeat(game: GameData, index: number): SeatData {
        var seat: SeatData = game.seats[index];
        seat.side = this._sides[index];
        return seat
    }

    refreshFolds(side: SeatSide, folds: number[]) {
        var foldNodes = this.foldsMap[side];
        const showCount = folds.length;
        if (side == SeatSide.Up) {
            // this.testUpFold1();
            foldNodes = this.upFolds;
            const startIndex = foldNodes.length - showCount;
            for (let index = foldNodes.length-1; index >= 0; index--) {
                const foldNode = foldNodes[index];
                console.log("up index "+index);
                foldNode.active = index >= startIndex;
                var mjIndex = 0;
                if (foldNode.active) {
                    const mjNum = folds[foldNodes.length-index-1];
                    var foldSprite = foldNodes[index].getComponent(Sprite);
                    var mjFrame = MahjongMgr.instance.getFoldMJSpriteFrame(side, mjNum);
                    foldSprite.spriteFrame = mjFrame;
                    mjIndex++;
                }
            }
        } else {
            for (let index = 0; index < foldNodes.length; index++) {
                const foldNode = foldNodes[index];
                foldNode.active = index < folds.length;
                if (index < folds.length) {
                    const mjNum = folds[index];
                    var foldSprite = foldNodes[index].getComponent(Sprite);
                    var mjFrame = MahjongMgr.instance.getFoldMJSpriteFrame(side, mjNum);
                    foldSprite.spriteFrame = mjFrame;
                }
            }
        }
    
    }

    refreshHolds(side: SeatSide, holds: number[]) {
        if (side == SeatSide.Myself) {
            this.refreshMyselfHolds(holds);
        } else {
            this.refreshOtherHolds(side, holds.length);
        }
    }

    refreshMyselfHolds(holds: number[]) {
        var holdNodes = this.getHolds(SeatSide.Myself);

        for (let index = 0; index < holdNodes.length; index++) {
            const holdNode = holdNodes[index];
            holdNode.active = index < holds.length;
            if (index < holds.length) {
                const mjNum = holds[index];
                var holdSprite = holdNodes[index].getComponent(Sprite);
                var mjFrame = MahjongMgr.instance.getHoldMJSpriteFrame(SeatSide.Myself, mjNum);
                holdSprite.spriteFrame = mjFrame;
            }
        }
    }

    refreshOtherHolds(side: SeatSide, holdCount: number) {
        var holdNodes = this.getHolds(side);
        var remainCount = holdNodes.length - holdCount;

        if (side == SeatSide.Right || side == SeatSide.Up) {
            for (let index = 0; index < holdNodes.length; index++) {
                const node = holdNodes[index];
                node.active = index >= remainCount;    
            }
        } else {
            for (let index = 0; index < holdNodes.length; index++) {
                const node = holdNodes[index];
                node.active = index < holdCount;    
            }
        }

        for (let index = 0; index < holdNodes.length; index++) {
            var holdSprite = holdNodes[index].getComponent(Sprite);
            var mjFrame = MahjongMgr.instance.getHoldMJSpriteFrame(side, null);
            holdSprite.spriteFrame = mjFrame;
        }
    }

    private pgs: number[][] = null;

    refreshPengGang(side: SeatSide) {

        this.pgs = [];

        var width = 200;
        var height = 100;

        var rootNode = this.getPengGangRootNode(side);
        if (side == SeatSide.Right || side == SeatSide.Left) {
            if (rootNode.children.length == 0) {
                for (let index = 0; index < this.pgs.length; index++) {
                    const pgNum = this.pgs[index];
                    var pg = MahjongMgr.instance.getPengGangLeftRightNode();
                    if (side == SeatSide.Right) {
                        pg.setPosition(0, -index * height,0);
                    } else {
                        pg.setPosition(0, index * height,0);
                    }
                    var pgIns: PengGangMgr = pg.getComponent(PengGangMgr);
                    pgIns.initMahjong(side, pgNum);
                    rootNode.addChild(pg);
                }
                
            }
        } else {
            if (rootNode.children.length == 0) {
                for (let index = 0; index < this.pgs.length; index++) {
                    const pgNum = this.pgs[index];
                    var pg = MahjongMgr.instance.getPengGangUpDownNode();
                    if (side == SeatSide.Myself) {
                        pg.setPosition(-index * width,0,0);
                    } else {
                        pg.setPosition(index * width,0,0);
                    }
                    var pgIns: PengGangMgr = pg.getComponent(PengGangMgr);
                    pgIns.initMahjong(side, pgNum);
                    rootNode.addChild(pg); 
                }
                
            }
        }
    }

    hideAllChuPai() {
        this.hideChuPai(SeatSide.Myself);
        this.hideChuPai(SeatSide.Left);
        this.hideChuPai(SeatSide.Right);
        this.hideChuPai(SeatSide.Up);
    }

    hideChuPai(side: SeatSide) {
        this.node.getChildByPath(MJGameNode.Game+'/'+side+'/'+MJGameNode.ChuPai).active = false;
    }

    initFoldsMap() {
        this._foldsMap = new Map();
        this._sides.forEach(element => {
            var children = this.getFolds(element);
            if (element == SeatSide.Up) {
                this._foldsMap[element] = new Array();
                this.upFolds = children;
            } else {
                this._foldsMap[element] = children;
            }
        }); 
    }

    testUpFold1() {
        // var children: Node[] = this.foldsMap[SeatSide.Up];
        console.log(">>> first up fold node: " + this.upFolds[0].name);
    }

    getFolds(side: SeatSide): Node[] {
        var gameNode = this.node.getChildByName(MJGameNode.Game);
        var foldsNode = gameNode.getChildByName(side).getChildByName(MJGameNode.Folds);
        
        /*if (side == SeatSide.Up) {
            console.log(">>> get folds..."+ side);
            // 调整node顺序
            // var children = foldsNode.children.reverse();            
            var children1 = foldsNode.children;
            var revChildren: Node[] = children1.reverse();
            // console.log(">>>node1 name: " + revChildren[0].name);
            
            return revChildren;
        } else */
        if (side == SeatSide.Right) {
            // 逐行调整顺序
            var foldsCount = foldsNode.children.length;
            var firstLineFolds = foldsNode.children.slice(0, foldsCount/2);
            var secondLineFolds = foldsNode.children.slice(foldsCount/2, foldsCount);
            return firstLineFolds.reverse().concat(secondLineFolds.reverse());
        } else {
            return foldsNode.children;
        }
    }

    getHolds(side: SeatSide): Node[] {
        var holdsNode = this.node.getChildByPath(MJGameNode.Game+'/'+side+'/'+MJGameNode.Holds);
        return holdsNode.children;
    }

    getPengGangRootNode(side: SeatSide): Node {
        var node = this.node.getChildByPath(MJGameNode.Game+'/'+side+'/'+MJGameNode.PengGang);
        return node
    }

    moPai() {
        this.testUpFold1()
        console.log(">>> mo pai: ");
        this._game.moPai();
        this.refreshMahjongs(this._game);
    }

    buPai() {
        const pai = MockMachine.instance().buPai();
        console.log(">>> bu pai: " + pai);
    }

    chuPai() {
        console.log(">>> chu pai...");
        this._game.chuPai();
        this.refreshMahjongs(this._game);
    }

    mockNext() {
        console.log("next...");
        MockMachine.instance().shuffle();
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
