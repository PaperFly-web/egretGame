class QuestionScene  extends eui.Component implements eui.UIComponent{
    private items:any;
    private itemLabel:eui.Label;
    private itemA:eui.RadioButton;
    private itemB:eui.RadioButton;
    private itemC:eui.RadioButton;
    private itemD:eui.RadioButton;
    private btnPre:eui.Button;
    private btnNext:eui.Button;
    private btnMain:eui.Button;//主页按钮
    private btnSubmit:eui.Button;
    private bg:eui.Image;//背景图片
    private index:number=0;
    private correct:number=0;//答正确的题数
    private wrong:number=0;//答错误的提速
    private no:number=0;//没答的
    private btnBgMusic:eui.Image;//关闭或者开启背景音乐

    


    public constructor() {
		super();
        this.skinName="resource/eui_skins/my_skins/QuestionSkin.exml";
        this.btnNext.skinName="resource/eui_skins/my_skins/MyBtn.exml";
        this.btnPre.skinName="resource/eui_skins/my_skins/MyBtn.exml";
        this.btnMain.skinName="resource/eui_skins/my_skins/MyBtn2.exml";
        this.bg.width=GameUtil.getStageWidth();
        this.bg.height=GameUtil.getStageHeight();

        this.itemLabel.x=GameUtil.getStageWidth()/2;
        this.btnNext.x=GameUtil.getStageWidth()/4*3;
        this.btnPre.x=GameUtil.getStageWidth()/4;
        this.btnBgMusic.x=GameUtil.getStageWidth()*0.9;
        this.btnSubmit.x=GameUtil.getStageWidth()/2;
	}

    

    protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


    protected childrenCreated():void
	{
		super.childrenCreated();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.init();
	
	}

    private init():void{
        this.items=QuestionManager.Instance.GetQuestion();
        console.log(this.items);
        this.showQuestion();
        this.btnBgMusic.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMusicClick,this);
        this.btnPre.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPreClick,this);
        this.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNextClick,this);
        this.btnMain.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMainClick,this);
        this.btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSubmitClick,this);

        //给每个单选按钮，添加一个监听事件，记录用户选择的选项
        this.itemA.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
            this.items[this.index].selected='A';
        },this);
        this.itemB.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
            this.items[this.index].selected='B';
        },this);
        this.itemC.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
            this.items[this.index].selected='C';
        },this);
        this.itemD.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
            this.items[this.index].selected='D';
        },this);
    }

    private showQuestion():void{
        this.itemA.selected=false;
        this.itemB.selected=false;
        this.itemC.selected=false;
        this.itemD.selected=false;
        this.itemLabel.text=(this.index+1)+","+this.items[this.index].title;
        this.itemA.label=this.items[this.index].A;
        this.itemB.label=this.items[this.index].B;
        this.itemC.label=this.items[this.index].C;
        this.itemD.label=this.items[this.index].D;
        //返回查看时，设置之前已经选过的
        if(this.items[this.index].selected=='A'){
            this.itemA.selected=true;
        }else if(this.items[this.index].selected=='B'){
            this.itemB.selected=true;
        }else if(this.items[this.index].selected=='C'){
            this.itemC.selected=true;
        }else if(this.items[this.index].selected=='D'){
            this.itemD.selected=true;
        }
        
    }

    public onAddToStage(e:egret.Event):void{

    }

    //关闭和打开音乐
    public onMusicClick(e:egret.TouchEvent):void{
        
        if(this.btnBgMusic.source=="musicPause_png"){
            this.btnBgMusic.source="musicPlay_png";
            AudioUtil.Instance.play();
        }else{
            this.btnBgMusic.source="musicPause_png";
            AudioUtil.Instance.close();
        }
    }

    //上一题
    public onPreClick(e:egret.TouchEvent):void{
        if(this.index>0){
            this.index--;
        }
        this.showQuestion();
        this.setPreAndNextBtn();
        
    }

    //下一题
    public onNextClick(e:egret.TouchEvent):void{
        if(this.index<this.items.length-1){
            this.index++;
        }
        this.showQuestion();
        this.setPreAndNextBtn();
        
    }

    //跳转到主场景
    public onMainClick(e:egret.TouchEvent):void{
        SceneManager.Instance.changeScene(new StartScene())
        //关闭背景音乐
        AudioUtil.Instance.close();
    }

    //提交按钮点击的时候
    public onSubmitClick(e:egret.TouchEvent):void{
        //关闭背景音乐
        AudioUtil.Instance.close();

        this.correct=0;
        this.wrong=0;
        this.no=0;
        for(let i=0;i<this.items.length;i++){
            if(this.items[i].selected==""){
                this.no++;
            }
            else if(this.items[i].answer==this.items[i].selected){
                this.correct++;
            }else{
                this.wrong++;
            }
        }
        console.log(this.correct,this.wrong,this.no);

        var maxScore=GameUtil.get_key("score");
        if(!maxScore){
            GameUtil.save_key("score","0");
            maxScore="0";
        }
        let msg=`
共计${this.items.length}道题

答对${this.correct}道题

答错${this.wrong}道题

未答${this.no}道题

历史最高,答对${maxScore}道题`;
        //比对此次分数，与历史最高
        if(Number(maxScore)<this.correct){
            maxScore=this.correct+"";
            GameUtil.save_key("score",maxScore);
        }
        
        SceneManager.Instance.changeScene(new EndScene(msg));
    }
    //设置上一题和后一题按钮是否可用
    public setPreAndNextBtn(){
        //判断上一题按钮是否可用
        if(this.index==0){
            this.btnPre.enabled=false;
        }else{
            this.btnPre.enabled=true;
        }
        //判断下一题按钮是否可用
        if(this.index==this.items.length-1){
            this.btnNext.enabled=false;
            this.bg.source="dragon_png";
            this.btnSubmit.visible=true;//显示提交按钮
        }else{
            this.btnNext.enabled=true;//下一题按钮不可用
            this.bg.source="dragon_jpg";//最后一题了，切换背景图片
            this.btnSubmit.vi