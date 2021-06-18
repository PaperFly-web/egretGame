class AudioUtil extends egret.DisplayObjectContainer {
    private url:string;
    private audio:egret.Sound ;
    private channel:egret.SoundChannel;//声道


    private static audioUtil:AudioUtil;//直接用类名访问，单例模式
    private constructor(url:string) {
        super();
        this.url=url;
        this.startLoad();
    }
    public static get Instance(){
        if(AudioUtil.audioUtil==null){
            
            AudioUtil.audioUtil=new AudioUtil("resource/assets/bg.m4a");
        }
        return AudioUtil.audioUtil;
    }

    

    private startLoad():void {
        //创建 Sound 对象
        this.audio = new egret.Sound();
        //添加加载完成侦听
        this.audio.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //开始加载
        this.audio.load(this.url);
        console.log("加载完毕")
    }

    private onLoadComplete(event:egret.Event):void {
        //获取加载到的 Sound 对象
        // var sound:egret.Sound = <egret.Sound>event.target;  
        // sound.play(0,0);
        let sound = <egret.Sound>event.target;  
        this.channel=sound.play(0,0);

    }

    public play():void{
        //防止第一次加载的时候没加载完
        if(this.channel==null){
            setTimeout(()=>{
                this.channel.volume=1;
            },1000)
        }else{
            //播放音乐
            this.channel.volume=1;
        }
        
        
        
    }

    public close():void{
        this.channel.volume = 0;
    }
}