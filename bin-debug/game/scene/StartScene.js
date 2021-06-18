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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        return _super.call(this) || this;
    }
    StartScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    StartScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.createGameScene();
        this.runStartAnimation();
    };
    /**
       * 创建游戏场景
       * Create a game scene
       */
    StartScene.prototype.createGameScene = function () {
        var offsetX = 60;
        // this.sky = this.createBitmapByName("dragon_jpg");
        this.sky = GameUtil.createBitmapByName("dragon_jpg");
        this.addChild(this.sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this.sky.width = stageW;
        this.sky.height = stageH;
        console.log("舞台宽度", stageW);
        console.log("舞台高度", stageH);
        this.topMask = new egret.Shape();
        var r = 50;
        this.topMask.graphics.beginFill(0x295730, 1);
        this.topMask.graphics.drawCircle(stageW / 2 - offsetX, 100, r);
        this.topMask.graphics.endFill();
        //topMask.y = 33;
        this.addChild(this.topMask);
        this.icon = GameUtil.createBitmapByName("dragon_ico_png");
        this.addChild(this.icon);
        this.icon.width = this.icon.width * 0.4;
        this.icon.height = this.icon.height * 0.4;
        this.icon.x = stageW / 2 - this.icon.width / 2 - offsetX;
        this.icon.y = 50;
        this.colorLabel = new egret.TextField();
        this.colorLabel.bold = true;
        this.colorLabel.textColor = 0x295730;
        this.colorLabel.width = stageW - 172;
        this.colorLabel.textAlign = "center";
        this.colorLabel.text = "PaperFly";
        this.colorLabel.size = 40;
        this.colorLabel.x = 180;
        this.colorLabel.y = 70;
        this.addChild(this.colorLabel);
        //     this.myInfo = new egret.TextField();
        //     this.myInfo.bold=true;
        //     this.myInfo.textColor = 0x295730;
        //     this.myInfo.width = stageW - 172;
        //    this. myInfo.textAlign = "center";
        //     this.myInfo.text = "--092818106 胡敬超--";
        //     this.myInfo.size = 40;
        //     this.myInfo.x = 110;
        //     this.myInfo.y = 1070;
        //     this.addChild(this.myInfo);
        this.textfield = new egret.TextField();
        this.addChild(this.textfield);
        this.textfield.alpha = 0;
        this.textfield.width = stageW - 172;
        this.textfield.textAlign = egret.HorizontalAlign.CENTER;
        this.textfield.size = 20;
        this.textfield.textColor = 0xffffff;
        this.textfield.x = 180;
        this.textfield.y = 120;
        this.startBtn = new eui.Button();
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStartClick, this);
        this.startBtn.x = stageW / 4;
        this.startBtn.y = 500;
        this.startBtn.label = "点击开始";
        this.addChild(this.startBtn);
        this.infoBtn = new eui.Button();
        this.infoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnInfoClick, this);
        this.infoBtn.x = stageW / 3 * 1.8;
        this.infoBtn.y = 500;
        this.infoBtn.label = "游戏介绍";
        this.addChild(this.infoBtn);
    };
    //运行log下的文字动画
    StartScene.prototype.runStartAnimation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 1:
                        result = _a.sent();
                        this.startAnimation(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    StartScene.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    /**
     * 游戏介绍按钮点击
     * Click the button
     */
    StartScene.prototype.onBtnInfoClick = function (e) {
        SceneManager.Instance.pushScene(new InfoScene());
    };
    /**
     * 游戏开始按钮点击
     * Click the button
     */
    StartScene.prototype.onBtnStartClick = function (e) {
        var qu = new QuestionScene();
        SceneManager.Instance.changeScene(qu);
        AudioUtil.Instance.play();
    };
    return StartScene;
}(Scene));
__reflect(StartScene.prototype, "StartScene");
