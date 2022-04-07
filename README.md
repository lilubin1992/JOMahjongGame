# 遇到的问题
1. 跨域问题导致get请求失败，nodejs收到的为option类型请求
解决方法：在launch.json文件中添加调试参数： "runtimeArgs": ["--disable-web-security", "--user-data-dir=xxx"],xxx为服务器本地路径
2. 单例的实现： https://www.cnblogs.com/blakehuangdong/p/13258831.html
3. 全局变量的实现：https://blog.csdn.net/weixin_36393214/article/details/109092087
4. 设置spriteFrame：·holds.children[1].getComponent(Sprite).spriteFrame = MahjongMgr.instance.getBottomMJSpriteFrame("B_bamboo_1");·
5. 修改脚本后需要切换到ide，刷新脚步后进行重载才会生效；

