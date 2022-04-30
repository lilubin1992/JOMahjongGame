import { Game } from "cc";
import { SeatSide } from "../MahjongMgr";
import { MockMachine } from "./MockMachine";

export class SeatData {

    private _folds: number[] | null = null;
    private _holds: number[] | null = null; 

    private _side: SeatSide = null;

    constructor() {
        this._folds = new Array()
        this._holds = new Array()
        // this._folds.push(0,1,2,3,4,5,6,9,10,11,18,19,20);
        // this._holds.push(0,0,2,3,4,5,5,6,7,8)
    }
    
    public get folds() : number[] {
        return this._folds;
    }

    public set folds(v : number[]) {
        this._folds = v;
    }
    
    public get side() : SeatSide {
        return this._side;
    }

    public get holds() : number[] {
        return this._holds.sort((a,b)=>a-b);
    }
    
    public set holds(v : number[]) {
        this._holds = v;
    }
    
    
    public set side(v : SeatSide) {
        this._side = v;
    }
    
}

export class GameData {

    private static _inst: GameData | null = null;

    private _seats: SeatData[] | null = null;

    constructor() {
        // var myself = new SeatData();
        // var rightSeat = new SeatData();
        // var upSeat = new SeatData();
        // var leftSeat = new SeatData();
        // this._seats = [myself, rightSeat, upSeat, leftSeat];
        this._seats = MockMachine.instance().seats;
    }

    static get instance(): GameData {
        return this._inst;
    }

    public get seats() : SeatData[] {
        return this._seats;
    }

    moPai() {
        MockMachine.instance().nextTurn();
        this._seats = MockMachine.instance().seats;
    }
    
    chuPai() {
        MockMachine.instance().chuPai();
        this._seats = MockMachine.instance().seats;
    }

}