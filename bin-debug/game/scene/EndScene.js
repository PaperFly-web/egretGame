var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var EndScene = (function (_super) {
    __extends(EndScene, _super);
    function EndScene(msg) {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/my_skins/EndSceneSkin.exml";
        _this.endLabel.text = msg;
        _this.bg.width = GameUtil.getStageWidth();
        _this.bg.height = GameUtil.getStageHeight();
        _this.endLabel.x = GameUtil.getStageWidth() / 2;
        _this.topImg.x = GameUtil.getStageWidth() / 2;
        _this.endBtnMain.x = GameUtil.getStageWidth() / 2;
        var data = RES.getRes("end.json");
        var txtr = RES.getRes("end.png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("stand"));
        _this.addChild(mc1);
        mc1.gotoAndPlay(1, 3);
        return _this;
    }
    EndScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    EndScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    EndScene.prototype.init = function () {
        this.endBtnMain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEndBtnMainClick, this);
    };
    EndScene.prototype.onEndBtnMainClick = function (e) {
        SceneManager.Instance.changeScene(new StartScene());
    };
    return EndScene;
}(Scene));
__reflect(EndScene.prototype, "EndScene");
