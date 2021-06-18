class SceneManager {
    private static sceneManager:SceneManager;//直接用类名访问，单例模式
    private currentScene:Scene;//需要展示的场景
    public rootLayer:eui.UILayer;//起始场景
    private pop_scene:Scene;//弹出场景


    public constructor(){
        
    }
    

    public static get Instance(){
        if(SceneManager.sceneManager==null){
            
            SceneManager.sceneManager=new SceneManager();
        }
        return SceneManager.sceneManager;
    }


    //切换场景
    public changeScene(s:Scene){
        //先移除当前正在展示的场景
        if(this.currentScene){
            this.rootLayer.removeChild(this.currentScene);
            this.currentScene=null;
        }
        //在把需要展示的场景添加进去
        this.rootLayer.addChild(s);
        this.currentScene=s;
    }

    //弹出场景
    public pushScene(s:Scene){
        this.popScene();
        if(!this.pop_scene){
            this.rootLayer.addChild(s);
            this.pop_scene=s;
        }
    }

    //关闭场景
    public popScene(){
        if(this.pop_scene){
            this.rootLayer.removeChild(this.pop_scene);
            this.pop_scene=null;
            //console.log("移除弹出窗")
        }
    }
}