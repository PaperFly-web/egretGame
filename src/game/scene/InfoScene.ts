class InfoScene extends Scene{
    private btnPanelClose:eui.Button;
    private labelPanel:eui.Label;
    private bgRect:eui.Rect;
    private bgImg:eui.Image;
    public constructor() {
		super();
        this.skinName="resource/eui_skins/my_skins/MyPanelSkin.exml";
        this.bgImg.width=GameUtil.getStageWidth()/6*5;//动态设置背景图片宽度
        this.bgImg.anchorOffsetX=this.bgImg.width/2;//动态设置背景图片x锚点位置


        this.bgRect.width=GameUtil.getStageWidth();
        this.bgRect.height=GameUtil.getStageHeight();
        this.labelPanel.x=GameUtil.getStageWidth()/2;
        this.btnPanelClose.x=GameUtil.getStageWidth()/2;
        this.bgImg.x=GameUtil.getStageWidth()/2;
        console.log(this.bgRect)
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
        console.log(this.btnPanelClose==null);
        this.btnPanelClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPanelCloseClick,this);
        this.labelPanel.text=`
每轮游戏共计五道题

每题仅一个正确答案

答题越多积分则越高

尽可能利用有利因素
        `
    }

    public onPanelCloseClick(e:egret.TouchEvent):void{
        SceneManager.Instance.popScene();
    }
}