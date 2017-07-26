function App(){
    let colors = [
        {"value":"red","imageName":'colour-red'},
        {"value":"yellow","imageName":'colour-yellow'},
        {"value":"green","imageName":'colour-green'},
        {"value":"cyan","imageName":'colour-cyan'},
        {"value":"blue","imageName":'colour-blue'},
        {"value":"purple","imageName":'colour-purple'},
        {"value":"pink","imageName":'colour-pink'},
        {"value":"orange","imageName":'colour-orange'},
      ];
    let cards = [];
    let colorRepetido = {};
    let count = 0;
    let guess1 = "";
    let guess2 = "";
    let cardsFound = { number: 0};
    let timer;
    this.init = ()=>{
        this.startGame();
    }


    this.startGame = ()=>{
        timer = new Timer();
        timer.start({precision: 'secondTenths', callback: (values)=> {
            $('#time').html(values.toString(['hours', 'minutes', 'seconds', 'secondTenths']));
        }});
        timer.addEventListener('secondsUpdated',(e)=> {
            $('#time .values').html(timer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']));
        });            
        this.generateCards();
        $(document).keydown((e)=>{
            let card = $("[class*='activate']");
            switch (e.which){
                case 13:
                    this.chooseCard(card);
                break;
                case 38:
                    this.moveUp(card);
                break;
                case 40:
                    this.moveDown(card);
                break;
                case 37:
                    this.moveLeft(card);
                break;
                case 39:
                    this.moveRight(card);
                break;
            }
        });
    }


    this.generateCards = ()=>{
        let copyColors = colors;
        while (copyColors.length != 0) {
            let index = Math.floor(Math.random()*copyColors.length);
            cards.push(copyColors[index]);
            cards.push(copyColors[index]);
            copyColors.splice(index, 1);  // This removes the picked element from the array
        }
        this.randomizeCards();
        this.generateHtml();
    }

    this.generateHtml= ()=>{

        let ol = document.createElement('ol');
        // output images then hide them
        for (var i = 0; i < 16; i++) {
            let li = document.createElement('li');
            li.setAttribute("id", "card-"+(i+1));
            li.setAttribute("value", cards[i].value);
            let img = document.createElement('img');
            img.setAttribute("src", "../resources/images/"+cards[i].imageName+".gif");
            li.appendChild(img);
            ol.appendChild(li);
        }
        $("#game").append(ol);
        $("#game img").hide();
        this.startHover();
    }

    this.startHover = ()=>{
        let element = $('#card-1');
        element.addClass("activate");
    }

    this.chooseCard = (card)=>{
        if ((count < 2) &&  (card.children("img").hasClass("face-up")) === false) {
        
            // increment guess count, show image, mark it as face up
            count++;
            card.children("img").show();
            card.children("img").addClass("face-up");
            
            //guess #1
            if (count === 1 ) { 
                guess1 = card.children("img").attr("src"); 
            }   
            
            //guess #2
            else { 
                guess2 = card.children("img").attr("src"); 
            
            // since it's the 2nd guess check for match
            if (guess1 === guess2) {
                console.log("match");
                console.log(cardsFound.number);
                $("li").children("img[src='" + guess2 + "']").addClass("match");
                if(cardsFound.number === 7){
                    setTimeout(()=> {
                        alert('Congratz you won');
                    },1000)
                }else{
                    cardsFound.number++;
                }
                
            } 
            
            // else it's a miss
            else { 
                console.log("miss");
                setTimeout(()=> {
                    $("img").not(".match").hide();
                    $("img").not(".match").removeClass("face-up");
                }, 1000);
            }
            
            // reset
            count = 0; 
            setTimeout(()=> { console.clear(); }, 60000);      
            }
        }
    }


    this.moveUp = (card)=>{
        card.removeClass('activate');
        let card_id = parseInt(card[0].id.substr(5));
        switch(card_id){
            case 1:
            case 2:
            case 3:
            case 4:
                var moves = card_id + 12;
                var element = $('#card-'+moves);
                element.addClass("activate");
            break;
            default:
                var moves = card_id - 4;
                var element = $('#card-'+moves);
                element.addClass("activate");
            break;
        }
    }

    this.moveDown = (card)=>{
        card.removeClass('activate');
        let card_id = parseInt(card[0].id.substr(5));
        switch(card_id){
            case 13:
            case 14:
            case 15:
            case 16:
                var moves = card_id - 12;
                var element = $('#card-'+moves);
                element.addClass("activate");
            break;
            default:
                var moves = card_id + 4;
                var element = $('#card-'+moves);
                element.addClass("activate");
            break;
        }
    }
    
    this.moveLeft = (card)=>{
        card.removeClass('activate');
        let card_id = parseInt(card[0].id.substr(5));
        switch(card_id){
            case 1:
            case 5:
            case 9:
            case 13:
                var moves = card_id + 3;
                var element = $('#card-'+moves);
                element.addClass("activate");
            break;
            default:
                var moves = card_id - 1;
                var element = $('#card-'+moves);
                element.addClass("activate");
            break;
        }
    }

    this.moveRight = (card)=>{
        card.removeClass('activate');
        let card_id = parseInt(card[0].id.substr(5));
        switch(card_id){
            case 4:
            case 8:
            case 12:
            case 16:
                var moves = card_id - 3;
                var element = $('#card-'+moves);
                element.addClass("activate");
            break;
            default:
                var moves = card_id + 1;
                var element = $('#card-'+moves);
                element.addClass("activate");
            break;
        }
    }

    // randomize array of cards
    this.randomizeCards = ()=>{
        Array.prototype.randomize = function()
        {
            var i = this.length, j, temp;
            while ( --i )
            {
            j = Math.floor( Math.random() * (i - 1) );
            temp = this[i];
            this[i] = this[j];
            this[j] = temp;
            }
        };
        cards.randomize();
    }
}