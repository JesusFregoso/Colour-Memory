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
    let scoreTime = 0;
    let timer = new Timer();
    let score = 0;
    let gameStarted = false;
    this.init = ()=>{
        this.generateCards();
        this.updateScores();
    }


    timer.addEventListener('secondsUpdated',(e)=> {
        $('#time .values').html(timer.getTimeValues().toString(['hours', 'minutes', 'seconds']));
    });

    $('#btnSave').click(()=>{
        this.saveScore();
        this.handleModal('close');
    });

    $(document).keydown((e)=>{
        let card = $("[class*='activate']");
        if (card.length == 0) {
            return;
        }
        let card_id = parseInt(card[0].id.substr(5));
        card.removeClass('activate');
        switch (e.which){
            case 13:
                if (gameStarted) {
                    card.addClass('activate');
                    if (card_id == 0 && confirm("Are you sure you want to restart the game, you are gonna lose your score")) {
                        timer.stop();
                        score = 0;
                        this.startGame();
                    }else{
                        this.chooseCard(card);
                    }
                }else{
                    card.addClass('activate');
                    if (card_id == 0 && confirm("Want to start a new Game??")) {
                        this.startGame();

                    }
                }
            break;
            case 38:
                this.moveUp(card_id);
            break;
            case 40:
                this.moveDown(card_id);
            break;
            case 37:
                this.moveLeft(card_id);
            break;
            case 39:
                this.moveRight(card_id);
            break;
            default:
                card.addClass('activate');
            break;
        }
    });

    this.startGame = ()=>{
        gameStarted = true;
        timer.start({precision: 'secondTenths', callback: (values)=> {
            $('#time').html(values.toString(['hours', 'minutes', 'seconds', 'secondTenths']));
        }});
        $('.actual-records').show();
        $('.rank-records').hide();
        this.eliminateCards();
        this.generateCards();
    }

    this.eliminateCards = ()=>{
        $( "ol" ).remove();
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
        $('#card-1').addClass("activate");
    }

    this.chooseCard = (card)=>{
        if ((count < 2) &&  (card.children("img").hasClass("face-up")) === false) {
            console.log(timer);
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
                    score++;
                    score++;
                    $('#score .value').html(score.toString());
                    $("li").children("img[src='" + guess2 + "']").addClass("match");
                    if(cardsFound.number === 7){
                        timer.pause();
                        scoreTime = timer.getTimeValues().toString(['hours', 'minutes', 'seconds']);
                        setTimeout(()=> {
                            timer.stop();
                            this.handleModal('open');
                        },1000)
                    }else{
                        cardsFound.number++;
                    }
                    
                } 
                
                // else it's a miss
                else { 
                    console.log("miss");
                    score--;
                    $('#score .value').html(score.toString());
                    setTimeout(()=> {
                        $("img").not(".match").hide();
                        $("img").not(".match").removeClass("face-up");
                    }, 1000);
                }
                
                // reset
                count = 0;
            }   
        }
    }


    this.moveUp = (card_id)=>{
        switch(card_id){
            case 0:
                $('.btnStartGame').addClass("activate");
            break;
            case 1:
            case 2:
            case 3:
            case 4:
                var moves = card_id + 12;
                $('#card-'+moves).addClass("activate");
            break;
            default:
                var moves = card_id - 4;
                $('#card-'+moves).addClass("activate");
            break;
        }
    }

    this.moveDown = (card_id)=>{
        switch(card_id){
            case 0:
                $('.btnStartGame').addClass("activate");
            break;
            case 13:
            case 14:
            case 15:
            case 16:
                var moves = card_id - 12;
                $('#card-'+moves).addClass("activate");
            break;
            default:
                var moves = card_id + 4;
                $('#card-'+moves).addClass("activate");
            break;
        }
    }
    
    this.moveLeft = (card_id)=>{
        switch(card_id){
            case 0:
                $('#card-16').addClass("activate");
            break;
            case 1:
            case 5:
            case 9:
                var moves = card_id + 3;
                $('#card-'+moves).addClass("activate");
            break;
            case 13:
                $('.btnStartGame').addClass("activate");
            break;
            default:
                var moves = card_id - 1;
                $('#card-'+moves).addClass("activate");
            break;
        }
    }

    this.moveRight = (card_id)=>{
        switch(card_id){
            case 0:
                $('#card-13').addClass("activate");
            break;
            case 4:
            case 8:
            case 12:
                var moves = card_id - 3;
                $('#card-'+moves).addClass("activate");
            break;
            case 16:
                $('.btnStartGame').addClass("activate");
            break;
            default:
                var moves = card_id + 1;
                $('#card-'+moves).addClass("activate");
            break;
        }
    }

    this.updateScores = ()=>{
        $.ajax({
            type: "GET",
            data:{
                get_records:true
            },
            dataType:'json',
            url: "http://localhost/colour-memory/php/controlador.php",
            success:(response)=>{
                $('.actual-records').hide();
                $('.rank-records').show();

                let ul = document.createElement('ol');
                // output images then hide them
                response.records.forEach((record,index)=>{
                    let li = document.createElement('li');
                     $(li).text('Name: '+record.player_name+' Score: '+record.player_score+' Time: '+record.player_time);
                     ul.appendChild(li);
                });

                $(".rank-records").append(ul);
            }
        });
    }

    this.saveScore = ()=>{
        let playerName = $('#playerName').val();
        let playerEmail = $('#playerEmail').val();

        $.ajax({
            type: "POST",
            data:{
                player_name: playerName,
                player_email: playerEmail,
                player_score: score,
                player_time : scoreTime,
                save_record : true
            },
            dataType:'json',
            url: "http://localhost/colour-memory/php/controlador.php",
            success: (response)=> {
                this.handleModal('close');
            }
        });
    }

    this.handleModal = (option)=>{
        // Get the modal
        var modal = document.getElementById('modalRecord');
        // When the user clicks on the button, open the modal
        if (option == 'open') {
            $('#scoreModal').html(score);
            $('#timeModal').html(scoreTime);
            modal.style.display = "block";
        }else{
            modal.style.display = "none";
            this.eliminateCards();
            this.generateCards();
            this.updateScores();
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
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