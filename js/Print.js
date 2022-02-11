class Print{
    constructor(){ 
        this.DomCanvas = document.getElementById("showcard");
        //this.DomCanvas.DomCanvas=this;
        this.Ctx = this.DomCanvas.getContext("2d");
    }

    DrawImage(){
        this.Ctx.fillStyle ="Green";    
        this.Ctx.fillRect(0,0,800,450);
        //let img = new Image();
        var img = document.getElementById("back");
        //img.src = 'https://deckofcardsapi.com/static/img/back.png';
        this.Ctx.drawImage(img, 10, 10, 100,150);
    }
    DrawCards(cardImg){
        // var img = document.querySelectorAll("#img img");
        // console.log(img);
        // var img = document.getElementById("img").getElementsByTagName("img");
        // console.log(img[0]);

        //document.cardImg.parentNode.insertBefore(back,document.cardImg);
        //cardImg="<img id='back'src='"+cardImg;
        //console.log(cardImg);
        //cardImg+="'alt ='back'></img>";
        //var img = document.getElementById("back");
        // var img = new Image;
        // img.src = cardImg;

        // console.log(cardImg);
        // this.Ctx.drawImage(img, 10, 250, 100,150);
    }

    loadAndDrawImage(cardImg)
    {
        
        let image = new Image();

        image.onload = function()
        {
            // var img = document.querySelectorAll("back");
            // image.append(cardImg);
            console.log(image);
            console.log(this.Ctx);
            this.Ctx.drawImage(image, 10, 250, 100,150);
            
        }

        image.src = cardImg;
    }
}   


    export default Print;