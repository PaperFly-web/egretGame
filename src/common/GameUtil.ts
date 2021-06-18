// 工具类

class GameUtil {
    
    // 获取舞台高度
    public static getStageHeight(): number {
        return egret.MainContext.instance.stage.stageHeight
    }

    
    // 获取舞台宽度
    public static getStageWidth(): number {
        return egret.MainContext.instance.stage.stageWidth
    }

    // 获取宽度居中
    public static getCenterW(w: number): number {
        return (GameUtil.getStageWidth() - w) / 2
    }

    // 获取高度居中
    public static getCenterH(h: number): number {
        return (GameUtil.getStageHeight() - h) / 2
    }
    

    
    // 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    public static createBitmapByName(name: string) : egret.Bitmap{
        let result = new egret.Bitmap()
        let texture: egret.Texture = RES.getRes(name)
        result.texture = texture;
        return result;
    }

    
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
	public static GetRandomNum(Min, Max):number {
		var Range = Max - Min;
		var Rand = Math.random();
		return (Min + Math.round(Rand * Range));
	}

    //生成指定范围内  指定个数的随机数
    public static GetRandomNums(Min, Max,num):Array<number> {
		
        let nums=new Array<number>();
        let tem;
        for(let i=0;i<num;i++){
            do{
                tem=this.GetRandomNum(Min,Max);
            }while(nums.indexOf(tem)!=-1);
           // console.log("是否重复",nums.indexOf(tem))
            nums.push(tem);
        }
        //console.log(nums);
        return nums;
	}


    /**
     * 数据存储函数
     */
     public static save_key(key_name:string,key_value:string){
        let key:string = key_name;
        let value:string = key_value;
        egret.localStorage.setItem(key,value);
    }
    /**
     * 读取数据
     */
    public static get_key(key_name:string){
        let value:string = egret.localStorage.getItem(key_name);
        return value;
    }
    /**
     * 删除数据
     */
    public static del_key(key_name:string){
        egret.localStorage.removeItem(key_name);
        return true;
    }


    
}