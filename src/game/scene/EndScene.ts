class EndScene extends Scene{
    private endBtnMain:eui.Button;
    private endLabel:eui.Label;
    private bg:eui.Image;
    private topImg:eui.Image;


    private data:any;
    private textture:egret.Texture;

    public constructor(msg:string) {
		super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);


        this.skinName="resource/eui_skins/my_skins/EndSceneSkin.exml";
        this.endLabel.text=msg;
        this.bg.width=GameUtil.getStageWidth();
        this.bg.height=GameUtil.getStageHeight();
        this.endLabel.x=GameUtil.getStageWidth()/2;
        this.topImg.x=GameUtil.getStageWidth()/2;
        this.endBtnMain.x=GameUtil.getStageWidth()/2;
	}

    //处理刚刚添加到舞台后的事件,演示动画
    public onAddToStage(e:egret.Event):void{
        this.data = RES.getRes("end_json");
        this.textture = RES.getRes("end_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( this.data, this.textture );
        var mc:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "end" ) );
        this.addChild(mc);
        mc.anchorOffsetX=mc.width/2;//动态设置背景图片x锚点位置
        mc.anchorOffsetY=mc.height/2;//动态设置背景图片x锚点位置
        mc.x=GameUtil.getStageWidth()/2;//动画居中
        mc.y=GameUtil.getStageHeight()/5;
        mc.play(-1);
        mc.frameRate=10;
    }

    protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


    protected childrenCreated():void
	{
		super.childrenCreated();
        this.init();

	}

    public init():void{
        this.endBtnMain.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onEndBtnMainClick,this);
    }

    public onEndBtnMainClick(e:egret.TouchEvent):void{
        SceneManager.Instance.changeScene(new StartScene())
    }
}