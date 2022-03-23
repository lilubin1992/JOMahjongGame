
import { _decorator, Component, Node } from 'cc';
import { HttpService } from './httpservice';
import { gen_handler, handler } from './util';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UserManager
 * DateTime = Wed Mar 23 2022 00:21:37 GMT+0800 (中国标准时间)
 * Author = 裤子三十八
 * FileBasename = UserManager.ts
 * FileBasenameNoExtension = UserManager
 * URL = db://assets/scripts/component/UserManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('UserManager')
export class UserManager extends Component {
    
    account: string = null
    userid: string = null
    userName: string = null
    ip: string = null
    roomData = null
    oldRoomId: string = null

    private static _inst: UserManager;

    static shared(): UserManager {
        if (!this._inst) {
            this._inst = new UserManager();
        }
        return this._inst
    }

    // 游客登录认证结果
    onGuestAuth(code: number, response: any) {

    }

    // 游客登录认证
    guestAuth() {
        if (!this.account) {
            this.account = Date.now().toString();
        }
        
        let params = {account: this.account}

        HttpService.shared().doGet("/guestAuth", null, params, gen_handler(this.onGuestAuth));
    }

    // 登录结果
    onLogin(result: any) {

    }

    // 登录
    login(account: string, sign: any) {

    }

    start () {
        
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
