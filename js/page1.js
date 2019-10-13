render(){
    //1、创建图片及其容器
    //1)、容器
    this.boxImg = document.createElement("div");
    this.boxImg.style.cssText = ` 
        position: absolute;
        width: 100%;
        height: 100%;`;
    this.boxDom.appendChild(this.boxImg);
    //2)、图片
    let num = this.imgs.length;
    for(let i=0;i<num;i++){
        let imgDom = document.createElement("img");
        imgDom.src = this.imgs[i];
        imgDom.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
        `;
       
    }
}