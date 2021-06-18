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
var QuestionScene = (function (_super) {
    __extends(QuestionScene, _super);
    function QuestionScene() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.correct = 0; //答正确的题数
        _this.wrong = 0; //答错误的提速
        _this.no = 0; //没答的
        _this.skinName = "resource/eui_skins/my_skins/QuestionSkin.exml";
        _this.btnNext.skinName = "resource/eui_skins/my_skins/MyBtn.exml";
        _this.btnPre.skinName = "resource/eui_skins/my_skins/MyBtn.exml";
        _this.btnMain.skinName = "resource/eui_skins/my_skins/MyBtn2.exml";
        _this.bg.width = GameUtil.getStageWidth();
        _this.bg.height = GameUtil.getStageHeight();
        _this.btnNext.x = GameUtil.getStageWidth() / 4 * 3;
        _this.btnPre.x = GameUtil.getStageWidth() / 4;
        _this.btnBgMusic.x = GameUtil.getStageWidth() * 0.9;
        _this.btnSubmit.x = GameUtil.getStageWidth() / 2;
        return _this;
    }
    QuestionScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    QuestionScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    QuestionScene.prototype.init = function () {
        var _this = this;
        this.items = QuestionManager.Instance.GetQuestion();
        console.log(this.items);
        this.showQuestion();
        this.btnBgMusic.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMusicClick, this);
        this.btnPre.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPreClick, this);
        this.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextClick, this);
        this.btnMain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMainClick, this);
        this.btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitClick, this);
        //给每个单选按钮，添加一个监听事件，记录用户选择的选项
        this.itemA.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.items[_this.index].selected = 'A';
        }, this);
        this.itemB.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.items[_this.index].selected = 'B';
        }, this);
        this.itemC.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.items[_this.index].selected = 'C';
        }, this);
        this.itemD.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.items[_this.index].selected = 'D';
        }, this);
    };
    QuestionScene.prototype.showQuestion = function () {
        this.itemA.selected = false;
        this.itemB.selected = false;
        this.itemC.selected = false;
        this.itemD.selected = false;
        this.itemLabel.text = (this.index + 1) + "," + this.items[this.index].title;
        this.itemA.label = this.items[this.index].A;
        this.itemB.label = this.items[this.index].B;
        this.itemC.label = this.items[this.index].C;
        this.itemD.label = this.items[this.index].D;
        //返回查看时，设置之前已经选过的
        if (this.items[this.index].selected == 'A') {
            this.itemA.selected = true;
        }
        else if (this.items[this.index].selected == 'B') {
            this.itemB.selected = true;
        }
        else if (this.items[this.index].selected == 'C') {
            this.itemC.selected = true;
        }
        else if (this.items[this.index].selected == 'D') {
            this.itemD.selected = true;
        }
    };
    QuestionScene.prototype.onAddToStage = function (e) {
    };
    //关闭和打开音乐
    QuestionScene.prototype.onMusicClick = function (e) {
        if (this.btnBgMusic.source == "musicPause_png") {
            this.btnBgMusic.source = "musicPlay_png";
            AudioUtil.Instance.play();
        }
        else {
            this.btnBgMusic.source = "musicPause_png";
            AudioUtil.Instance.close();
        }
    };
    //上一题
    QuestionScene.prototype.onPreClick = function (e) {
        if (this.index > 0) {
            this.index--;
        }
        this.showQuestion();
        this.setPreAndNextBtn();
    };
    //下一题
    QuestionScene.prototype.onNextClick = function (e) {
        if (this.index < this.items.length - 1) {
            this.index++;
        }
        this.showQuestion();
        this.setPreAndNextBtn();
    };
    //跳转到主场景
    QuestionScene.prototype.onMainClick = function (e) {
        SceneManager.Instance.changeScene(new StartScene());
        //关闭背景音乐
        AudioUtil.Instance.close();
    };
    //提交按钮点击的时候
    QuestionScene.prototype.onSubmitClick = function (e) {
        //关闭背景音乐
        AudioUtil.Instance.close();
        this.correct = 0;
        this.wrong = 0;
        this.no = 0;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].selected == "") {
                this.no++;
            }
            else if (this.items[i].answer == this.items[i].selected) {
                this.correct++;
            }
            else {
                this.wrong++;
            }
        }
        console.log(this.correct, this.wrong, this.no);
        var maxScore = GameUtil.get_key("score");
        if (!maxScore) {
            GameUtil.save_key("score", "0");
            maxScore = "0";
        }
        var msg = "\n\u5171\u8BA1" + this.items.length + "\u9053\u9898\n\n\u7B54\u5BF9" + this.correct + "\u9053\u9898\n\n\u7B54\u9519" + this.wrong + "\u9053\u9898\n\n\u672A\u7B54" + this.no + "\u9053\u9898\n\n\u5386\u53F2\u6700\u9AD8,\u7B54\u5BF9" + maxScore + "\u9053\u9898";
        //比对此次分数，与历史最高
        if (Number(maxScore) < this.correct) {
            maxScore = this.correct + "";
            GameUtil.save_key("score", maxScore);
        }
        SceneManager.Instance.changeScene(new EndScene(msg));
    };
    //设置上一题和后一题按钮是否可用
    QuestionScene.prototype.setPreAndNextBtn = function () {
        //判断上一题按钮是否可用
        if (this.index == 0) {
            this.btnPre.enabled = false;
        }
        else {
            this.btnPre.enabled = true;
        }
        //判断下一题按钮是否可用
        if (this.index == this.items.length - 1) {
            this.btnNext.enabled = false;
            this.bg.source = "dragon_png";
            this.btnSubmit.visible = true; //显示提交按钮
        }
        else {
            this.btnNext.enabled = true; //下一题按钮不可用
            this.bg.source = "dragon_jpg"; //最后一题了，切换背景图片
            this.btnSubmit.visible = false; //不显示提交按钮
        }
    };
    return QuestionScene;
}(eui.Component));
__reflect(QuestionScene.prototype, "QuestionScene", ["eui.UIComponent", "egret.DisplayObject"]);
