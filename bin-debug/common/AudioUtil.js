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
var AudioUtil = (function (_super) {
    __extends(AudioUtil, _super);
    function AudioUtil(url) {
        var _this = _super.call(this) || this;
        _this.url = url;
        _this.startLoad();
        return _this;
    }
    Object.defineProperty(AudioUtil, "Instance", {
        get: function () {
            if (AudioUtil.audioUtil == null) {
                AudioUtil.audioUtil = new AudioUtil("resource/assets/bg.m4a");
            }
            return AudioUtil.audioUtil;
        },
        enumerable: true,
        configurable: true
    });
    AudioUtil.prototype.startLoad = function () {
        //创建 Sound 对象
        this.audio = new egret.Sound();
        //添加加载完成侦听
        this.audio.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //开始加载
        this.audio.load(this.url);
        console.log("加载完毕");
    };
    AudioUtil.prototype.onLoadComplete = function (event) {
        //获取加载到的 Sound 对象
        // var sound:egret.Sound = <egret.Sound>event.target;  
        // sound.play(0,0);
        var sound = event.target;
        this.channel = sound.play(0, 0);
    };
    AudioUtil.prototype.play = function () {
        var _this = this;
        //防止第一次加载的时候没加载完
        if (this.channel == null) {
            setTimeout(function () {
                _this.channel.volume = 1;
            }, 1000);
        }
        else {
            //播放音乐
            this.channel.volume = 1;
        }
    };
    AudioUtil.prototype.close = function () {
        this.channel.volume = 0;
    };
    return AudioUtil;
}(egret.DisplayObjectContainer));
__reflect(AudioUtil.prototype, "AudioUtil");
