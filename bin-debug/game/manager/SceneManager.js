var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneManager = (function () {
    function SceneManager() {
    }
    Object.defineProperty(SceneManager, "Instance", {
        get: function () {
            if (SceneManager.sceneManager == null) {
                SceneManager.sceneManager = new SceneManager();
            }
            return SceneManager.sceneManager;
        },
        enumerable: true,
        configurable: true
    });
    //切换场景
    SceneManager.prototype.changeScene = function (s) {
        //先移除当前正在展示的场景
        if (this.currentScene) {
            this.rootLayer.removeChild(this.currentScene);
            this.currentScene = null;
        }
        //在把需要展示的场景添加进去
        this.rootLayer.addChild(s);
        this.currentScene = s;
    };
    //弹出场景
    SceneManager.prototype.pushScene = function (s) {
        this.popScene();
        if (!this.pop_scene) {
            this.rootLayer.addChild(s);
            this.pop_scene = s;
        }
    };
    //关闭场景
    SceneManager.prototype.popScene = function () {
        if (this.pop_scene) {
            this.rootLayer.removeChild(this.pop_scene);
            this.pop_scene = null;
            //console.log("移除弹出窗")
        }
    };
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
