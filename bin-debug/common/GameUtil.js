// 工具类
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameUtil = (function () {
    function GameUtil() {
    }
    // 获取舞台高度
    GameUtil.getStageHeight = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    // 获取舞台宽度
    GameUtil.getStageWidth = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    // 获取宽度居中
    GameUtil.getCenterW = function (w) {
        return (GameUtil.getStageWidth() - w) / 2;
    };
    // 获取高度居中
    GameUtil.getCenterH = function (h) {
        return (GameUtil.getStageHeight() - h) / 2;
    };
    // 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    GameUtil.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    // // 根据name关键字创建一个MovieClip对象。name属性请参考resources/resource.json配置文件的内容。
    // public static createMovieClipByName(name:string): egret.MovieClip {
    //     let data_stay: any = RES.getRes(name + "_json")
    //     console.log(data_stay)
    //     let texture_stay: egret.Texture = RES.getRes(name + "_png")
    //     let mcFactory_stay: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data_stay, texture_stay)
    //     return new egret.MovieClip(mcFactory_stay.generateMovieClipData(name))
    // }
    /**
     * 生成范围随机数
     * @Min 最小值
     * @Max 最大值
     */
    GameUtil.GetRandomNum = function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    };
    //生成指定范围内  指定个数的随机数
    GameUtil.GetRandomNums = function (Min, Max, num) {
        var nums = new Array();
        var tem;
        for (var i = 0; i < num; i++) {
            do {
                tem = this.GetRandomNum(Min, Max);
            } while (nums.indexOf(tem) != -1);
            // console.log("是否重复",nums.indexOf(tem))
            nums.push(tem);
        }
        //console.log(nums);
        return nums;
    };
    /**
     * 数据存储函数
     */
    GameUtil.save_key = function (key_name, key_value) {
        var key = key_name;
        var value = key_value;
        egret.localStorage.setItem(key, value);
    };
    /**
     * 读取数据
     */
    GameUtil.get_key = function (key_name) {
        var value = egret.localStorage.getItem(key_name);
        return value;
    };
    /**
     * 删除数据
     */
    GameUtil.del_key = function (key_name) {
        egret.localStorage.removeItem(key_name);
        return true;
    };
    return GameUtil;
}());
__reflect(GameUtil.prototype, "GameUtil");
