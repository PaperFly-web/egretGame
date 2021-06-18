class StartScene extends Scene {

    public sky: egret.Bitmap;
    public topMask:egret.Shape;
    public icon: egret.Bitmap;
    public  colorLabel :egret.TextField;
    public myInfo:egret.TextField;
    public textfield :egret.TextField;
    public startBtn:eui.Button;
    public infoBtn:eui.Button;

    public constructor() {
		super();
	}

    protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


    protected childrenCreated():void
	{
		super.childrenCreated();
        
        this.createGameScene();
        this.runStartAnimation();
	
	}












  /**
     * 创建游戏场景
     * Create a game scene
     */
    public createGameScene() {
        let offsetX=60;


        // this.sky = this.createBitmapByName("dragon_jpg");
        this.sky = GameUtil.createBitmapByName("dragon_jpg");
        this.addChild(this.sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        this.sky.width = stageW;
        this.sky.height = stageH;

        console.log("舞台宽度",stageW)
        console.log("舞台高度",stageH)

        this.topMask = new egret.Shape();
        let r=50;
        this.topMask.graphics.beginFill(0x295730, 1);
        this.topMask.graphics.drawCircle(stageW/2-offsetX, 100, r);
        this.topMask.graphics.endFill();
        //topMask.y = 33;
        this.addChild(this.topMask);

        this.icon =GameUtil.createBitmapByName("dragon_ico_png");
        this.addChild(this.icon);
        this.icon.width=this.icon.width*0.4;
        this.icon.height=this.icon.height*0.4;
        this.icon.x = stageW/2-this.icon.width/2-offsetX;
        this.icon.y = 50;



        this.colorLabel = new egret.TextField();
        this.colorLabel.bold=true;
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
       


        this.startBtn=new eui.Button();
         this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStartClick, this);
        this.startBtn.x = stageW/4;
        this.startBtn.y = 500;
        this.startBtn.label="点击开始"
        this.addChild(this.startBtn);

        this.infoBtn=new eui.Button();
          this.infoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnInfoClick, this);
         this.infoBtn.x = stageW/3*1.8;
         this.infoBtn.y = 500;
         this.infoBtn.label="游戏介绍"
        this.addChild( this.infoBtn);
    }


    //运行log下的文字动画
    public async runStartAnimation(){
        const result = await RES.getResAsync("description_json")
         this.startAnimation(result);
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    public startAnimation(result: Array<any>): void {
         
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }

    /**
     * 游戏介绍按钮点击
     * Click the button
     */
    private onBtnInfoClick(e: egret.TouchEvent) {
        SceneManager.Instance.pushScene(new InfoScene());
    }

    /**
     * 游戏开始按钮点击
     * Click the button
     */
    private onBtnStartClick(e: egret.TouchEvent) {
        let qu= new QuestionScene();
        
        SceneManager.Instance.changeScene(qu);


        AudioUtil.Instance.play();
    }

}