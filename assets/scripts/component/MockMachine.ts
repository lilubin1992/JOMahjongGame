import { repeat } from "cc";
import { SeatData } from "./SeatData";

export class MockMachine {

    private static _inst:MockMachine;

    private _turn: number = 0;

    private _cardStack: number[] = null;

    private _seats: SeatData[] = null;

    static instance():MockMachine {
        if(!this._inst)
        {
            this._inst = new MockMachine();
        }
        return this._inst;
    }

    constructor() {
        this.shuffle();
        this.initSeat();
    }

    public get turn() : number {
        return this._turn;
    }

    
    public get seats() : SeatData[] {
        return this._seats;
    }
    

    initSeat() {
        this._seats = [new SeatData(), new SeatData(), new SeatData(), new SeatData()];
        const deals = this.deal();
        for (let index = 0; index < 4; index++) {
            const seat = this.seats[index];
            seat.holds = deals[index];
        }
    }
    
    moPaiDeal(): number[] {
        return [this.moPai(), this.moPai(), this.moPai(), this.moPai()]
    }

    // 摸牌，从牌堆队头摸牌
    moPai(): number {
        return this._cardStack.shift();
    }

    // 补牌，从牌堆队尾摸牌
    buPai(): number {
        return this._cardStack.pop();
    }

    private total: number = 27;

    shuffle() {
        this._cardStack = new Array();

        for (let mjNum = 0; mjNum < this.total; mjNum++) {
            for (let count = 0; count < 4; count++) {
                this._cardStack.push(mjNum);                    
            }           
        }
        console.log(">>>mjNum: "+this._cardStack);

        const length = this._cardStack.length;
        for (let index = 0; index < length; index++) {
            const element = this._cardStack[index];
            const exchangedIndex = Math.floor(Math.random() * length);
            var temp = this._cardStack[index];
            this._cardStack[index] = this._cardStack[exchangedIndex];
            this._cardStack[exchangedIndex] = temp;
        }
        console.log("<<<mjNum: "+this._cardStack);
    }

    deal(): number[][] {
        var result = [[], [], [], []];
        for (let index = 0; index < 4; index++) {
            for (let j = 0; j < 4; j++) {
                var element = result[j];
                element = element.concat(this.moPaiDeal());
                result[j] = element;
            }
            // result.forEach(element => {
            //     element = element.concat(this.moPaiDeal());
            // });             
        }
        console.log("deal: "+result);
        
        return result
    }

}