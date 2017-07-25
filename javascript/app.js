function App(){
    let colors = [
        {"value":"cyan","class":'cyan-card'},
        {"value":"purple","class":'purple-card'},
        {"value":"yellow","class":'yellow-card'},
        {"value":"blue","class":'blue-card'},
        {"value":"orange","class":'orange-card'},
        {"value":"green","class":'green-card'},
        {"value":"brown","class":'brown-card'},
        {"value":"red","class":'red-card'},
      ];
    let cards = [];
    let colorRepetido = {};
    this.init = ()=>{
        this.startGame();
    }

    this.startGame = ()=>{
        this.generateCards();
    }

    this.generateCards = ()=>{
        let copyColors = colors;
        while (copyColors.length != 0) {
            var index = Math.floor(Math.random()*copyColors.length);
            cards.push(copyColors[index]);
            cards.push(copyColors[index]);
            copyColors.splice(index, 1);  // This removes the picked element from the array
        }
        this.randomizeCards();
        this.generateHtml();
    }
    this.generateHtml= ()=>{
            // output images then hide them
        var output = "<ol>"; 
        for (var i = 0; i < 16; i++) { 
        output += "<li>";
        output += "<div class='card'><div class='card-block "+cards[i].class+"'>This is some text within a card block.</div>";
        output += "</li>";
        }
        output += "</ol>";
        document.getElementById("container").innerHTML = output;
        $("card").hide();

        var guess1 = "";
        var guess2 = "";
        var count = 0;
    }


    // $("li").click(function() {
    // if ((count < 2) &&  ($(this).children("img").hasClass("face-up")) === false) {
        
    //     // increment guess count, show image, mark it as face up
    //     count++;
    //     $(this).children("img").show();
    //     $(this).children("img").addClass("face-up");
        
    //     //guess #1
    //     if (count === 1 ) { 
    //     guess1 = $(this).children("img").attr("src"); 
    //     }   
        
    //     //guess #2
    //     else { 
    //     guess2 = $(this).children("img").attr("src"); 
        
    //     // since it's the 2nd guess check for match
    //     if (guess1 === guess2) { 
    //         console.log("match");
    //         $("li").children("img[src='" + guess2 + "']").addClass("match");
    //     } 
        
    //     // else it's a miss
    //     else { 
    //         console.log("miss");
    //         setTimeout(function() {
    //         $("img").not(".match").hide();
    //         $("img").not(".match").removeClass("face-up");
    //         }, 1000);
    //     }
        
    //     // reset
    //     count = 0; 
    //     setTimeout(function() { console.clear(); }, 60000);      
    //     }
    // }
    // });

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