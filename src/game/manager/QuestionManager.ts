class QuestionManager{
    private static questionManager:QuestionManager;//静态属性，可以直接用类名访问
    private items:Array<QuestionItem> = [];
    private score:number=0;
	//创建一个实例
	public static get Instance(){
        if( QuestionManager.questionManager == null){
            QuestionManager.questionManager = new QuestionManager();
        }
        return QuestionManager.questionManager;
    }

	public constructor() {
        
	}

    public GetQuestion():Array<QuestionItem>{
        let elements=RES.getRes("questions_json");
        let randoms=GameUtil.GetRandomNums(0,9,5);
        this.items=new Array();
        for(let i=0;i<5;i++){
            this.items.push(elements[randoms[i]]);
            //初始化题目，数据。
            this.items[i].selected="";
        }
        return this.items;
    }

    public GetScore():number{
        return this.score;
    }

    public SetScore(score:number):void{
        this.score=score;
    }
}