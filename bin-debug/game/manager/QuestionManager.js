var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var QuestionManager = (function () {
    function QuestionManager() {
        this.items = [];
        this.score = 0;
    }
    Object.defineProperty(QuestionManager, "Instance", {
        //创建一个实例
        get: function () {
            if (QuestionManager.questionManager == null) {
                QuestionManager.questionManager = new QuestionManager();
            }
            return QuestionManager.questionManager;
        },
        enumerable: true,
        configurable: true
    });
    QuestionManager.prototype.GetQuestion = function () {
        var elements = RES.getRes("questions_json");
        var randoms = GameUtil.GetRandomNums(0, 9, 5);
        this.items = new Array();
        for (var i = 0; i < 5; i++) {
            this.items.push(elements[randoms[i]]);
            //初始化题目，数据。
            this.items[i].selected = "";
        }
        return this.items;
    };
    QuestionManager.prototype.GetScore = function () {
        return this.score;
    };
    QuestionManager.prototype.SetScore = function (score) {
        this.score = score;
    };
    return QuestionManager;
}());
__reflect(QuestionManager.prototype, "QuestionManager");
