
import { _decorator, Component, Node, Button, Label, log, director } from 'cc';
import { HttpService } from './component/httpservice';
import { gen_handler } from './component/util';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = loading
 * DateTime = Wed Mar 16 2022 21:25:09 GMT+0800 (中国标准时间)
 * Author = 裤子三十八
 * FileBasename = loading.ts
 * FileBasenameNoExtension = loading
 * URL = db://assets/scripts/loading.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('loading')
export class loading extends Component {
    // [1]
    // dummy = '';

    // [2]
    @property(Button)
    startBtn : Button | null = null;

    // host: string = "http://127.0.0.1:3000"

    start () {
        console.log("hello world");
        // this.clickBtn()
    }

    clickBtn() {
        // var lcbel = this.startBtn.node.getChildByName('Label').getComponent(Label);
        // lcbel.string = "hello";
        // log("click btn...");
        // let hand = gen_handler((code, data)=>{
        //     log("hello world:"+data.name);
        // }, "http://127.0.0.1:3000");
        // HttpService.getInst().doGet(this.host + '/users', null, null, hand)
        director.loadScene('mjgame')
    }

    initializeManager() {
        // https://forum.cocos.org/t/cocoscreator-ts/98301

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
