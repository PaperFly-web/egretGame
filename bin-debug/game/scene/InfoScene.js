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
var InfoScene = (function (_super) {
    __extends(InfoScene, _super);
    function InfoScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/my_skins/MyPanelSkin.exml";
        _this.bgImg.width = GameUtil.getStageWidth() / 6 * 5; //动态设置背景图片宽度
        _this.bgImg.anchorOffsetX = _this.bgImg.width / 2; //动态设置背景图片x锚点位置
        _this.bgRect.width = GameUtil.getStageWidth();
        _this.bgRect.height = GameUtil.getStageHeight();
        _this.labelPanel.x = GameUtil.getStageWidth() / 2;
        _this.btnPanelClose.x = GameUtil.getStageWidth() / 2;
        _this.bgImg.x = GameUtil.getStageWidth() / 2;
        console.log(_this.bgRect);
        return _this;
    }
    InfoScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    InfoScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    InfoScene.prototype.init = function () {
        console.log(this.btnPanelClose == null);
        this.btnPanelClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelCloseClick, this);
        this.labelPanel.text = "\n\u6BCF\u8F6E\u6E38\u620F\u5171\u8BA1\u4E94\u9053\u9898\n\n\u6BCF\u9898\u4EC5\u4E00\u4E2A\u6B63\u786E\u7B54\u6848\n\n\u7B54\u9898\u8D8A\u591A\u79EF\u5206\u5219\u8D8A\u9AD8\n\n\u5C3D\u53EF\u80FD\u5229\u7528\u6709\u5229\u56E0\u7D20\n        ";
    };
    InfoScene.prototype.onPanelCloseClick = function (e) {
        SceneManager.Instance.popScene();
    };
    return InfoScene;
}(Scene));
__reflect(InfoScene.prototype, "InfoScene");
