## 1.项目简单介绍
我做的这个大作业，是一个关于端午节的答题小程序。让用户通过答题的方式，能更多的了解到关于中国传统文化端午节的知识，并且也能让用户感受到传统文化的美。
## 2.代码目录介绍
- common
        -  放置工具类的地方
- manager
        -  放置各种管理器，管理着各自对应的部分
- pojo
        -  放着各种实例类
- scene
        -  游戏中的场景都存放在这里
![1](https://github.com/PaperFly-web/asset/blob/master/img/egret_game/1.png?raw=true)
## 3.项目整体架构
![1](https://github.com/PaperFly-web/asset/blob/master/img/egret_game/2.png?raw=true)
## 4.部分关键代码解释
- QuestionManager.ts部分
-  我们的问题，不是一个死的数据，而是从数据源中随机抽取5个问题在页面中进行演示
```javaScript
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
```

- 场景中的元素位置自适应
    我通过改变元素的锚点位置，让其在元素的中间
    然后获取舞台的宽度，让元素的位置根据宽度进行自适应
    如下图
![1](https://github.com/PaperFly-web/asset/blob/master/img/egret_game/3.png?raw=true)
- 使用本地存储，记录用户的答题最高历史记录
# 5.如何使用
- 主页面
        - 点击开始   这个按钮就是开始游戏
        - 游戏介绍  这个按钮，点击后就有有关本次游戏的介绍
     
![1](https://github.com/PaperFly-web/asset/blob/master/img/egret_game/4.png?raw=true)

- 游戏运行页面

![1](https://github.com/PaperFly-web/asset/blob/master/img/egret_game/5.png?raw=true)

- 结束页面
        -点击Agin   回到主页面
        
![1](https://github.com/PaperFly-web/asset/blob/master/img/egret_game/6.png?raw=true)
