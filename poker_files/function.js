Document.prototype.getElementsByClassName = function (classname)
{
	var tags = this.getElementsByTagName("*");
	var classes = new Array();
	var counter = -1;
	for (var i = 0; i < tags.length; i++)
	{
		if (tags[i].className == classname)
		{
			counter++;
			classes[counter] = tags[i]
		}
	}
	return classes
}

var instructions = prompt('would you like to see the instructions first?');	
var ante = 0;
var cardsLeft = 52;
var money = 100;
var deck = new Array();
var playingDeck = new Array();

for(var i = 0; i <= 3; i++)
{
	deck[i] = new Array();
	playingDeck[i] = new Array();
	for(var j = 0; j < 13; j++)
	{
		var suitoff = i+1, cardoff = j+1;
		deck[i][j] = 4*(cardoff)-(4-suitoff);
		playingDeck[i][j] = 4*(cardoff)-(4-suitoff);
	}
};

var hand = new Array();
hand[0] = new Array();
hand[1] = new Array();
hand[2] = new Array();
for(var i = 0; i < 4; i++)
{
	hand[1][i] = 0;
}

for(var i = 0; i < 13; i++)
{
	hand[2][i] = 0;
}

evaluateHand = function()
{
	var cardPlay = 0, tempHand = $.extend(true, [], hand);
	hand[0].sort(function(a,b)
	{
		return a-b;
	});
	var fstCard = hand[0][0];
	var counter = 0;
	for(var i = 1; i<6; i++)
	{
		if(hand[0][i-1] == (fstCard + (i-1)))
		{
			counter++;
		}
	}
	var pair = 0;
	var pears = 0;
	while((pair = hand[2].indexOf(2)) > -1)
	{
		hand[2].remove(pair);
		pears++;
	}
	if(hand[1].indexOf(5) > -1 && hand[0] == [0, 9, 10, 11, 12])
	{
		cardPlay = 9;
	}
	else if(counter == 5 && hand[1].indexOf(5) > -1)
	{
		cardPlay = 8;
	}
	else if(hand[2].indexOf(4) > -1)
	{
		cardPlay = 7; 
	}
	else if(hand[2].indexOf(3) > -1 && pears == 1)
	{
		cardPlay = 6;
	}
	else if(hand[1].indexOf(5) > -1)
	{
		cardPlay = 5;
	}
	else if(counter == 5)
	{
		cardPlay = 4;
	}
	else if(hand[2].indexOf(3) > -1)
	{
		cardPlay = 3;
	}
	else if(pears == 2)
	{
		cardPlay = 2;
	}
	else if(pears == 1)
	{
		cardPlay = 1;
	}
	hand = tempHand;
	return cardPlay;
}

endGame = function()
{
	$('.currentMoney').text('$' + money);
	for(var i = 1; i < 6; i++)
	{
		var nDist = 63+(203*i);
		$(".card.c" + i).animate({"top": "-=270px", "left": "-="+nDist+"px","queue":"false"}).removeClass("card c" + i);
	}
	for(var i = 1; i < 6; i++)
	{
		var nDist = 63+(203*i);
		$(".selected.c"+i).animate({"left": "-="+nDist+"px","queue":"false"}).removeClass("selected c"+i);				
	}
	for(var i = 0; i < 4; i++)
	{
		hand[1][i] = 0;
	}
	for(var i = 0; i < 13; i++)
	{
		hand[2][i] = 0;
	}
	anteBox();
	ante = 0;
}

checkHand = function()
{
	var imposter = ante;
	cardPlay = evaluateHand();
	switch(cardPlay)
	{
		case 0:
		alert('YOU WIN.....nothing');
		ante = 0;
		break;

		case 1:
		alert('pair 1.5 ' + ante);
		ante = Math.round(1.5 * imposter);
		alert(ante);
		break;

		case 2:
		alert('two pair 2.25 ' + ante);
		ante = Math.round(2.25 * imposter);
		alert(ante);
		break;

		case 3:
		alert('3 of a kind 3.25 ' + ante);
		ante = Math.round(3.25 * imposter);
		alert(ante);
		break;

		case 4:
		alert('straight 4.5 ' + ante);
		ante = Math.round(4.5 * imposter);
		alert(ante);
		break;

		case 5:
		alert('flush 6 ' + ante);
		ante = Math.round(6 * imposter);
		alert(ante);
		break;

		case 6:
		alert('full house 7.75 ' + ante);
		ante = Math.round(7.75 * imposter);
		alert(ante);
		break;

		case 7:
		alert('four of a kind 9.75 ' + ante);
		ante = Math.round(9.75 * imposter);
		alert(ante);
		break;

		case 8:
		alert('straight flush 12 ' + ante);
		ante = Math.round(12 * imposter);
		alert(ante);
		break;
		
		case 9:
		alert('royal flush 15 ' + ante);
		ante = Math.round(15 * imposter);
		alert(ante);
		break;
	}
	check = 0;
	ToF = false;
	money += ante;
	$('.currentMoney').text('$' + money);
}

var newClass = Array();

findCard = function(card)
{
	for(var i = 0; i < deck.length; i++)
	{
		for(var j = 0; j < deck[i].length; j++)
		{
			if(deck[i][j] == card) return [i, j];
		}
	}
	return false;
}

giveClass = function()
{
	var b = 0;
	for(var i=1; i < 6; i++)
	{
		var classSelecter = $(".selected").hasClass("c"+i)
		if(classSelecter == true)
		{
			var img = $('.selected.c'+i).attr('src');
			var card = img.split('.', 1)[0].split('/', 2)[1];
			card = findCard(card);
			hand[1][card[0]]--;
			hand[2][card[1]]--;
			newClass[b++] = "c"+i;
		}
	}
}
			
getRandomCard = function()
{
	if(playingDeck.length == 0) return false;
	var suit = Math.floor(Math.random()*playingDeck.length);
	while(playingDeck[suit].length == 0)
	{
		playingDeck.remove(suit);
		if(playingDeck.length == 0) return false;
		suit = Math.floor(Math.random()*playingDeck.length);
	}
	var cardVal = Math.floor((Math.random()*playingDeck[suit].length));
	var val = playingDeck[suit][cardVal];
	playingDeck[suit].remove(cardVal);
	return val;
}

deal_Em = function()
{
	$('.money').text(money);
	ante = document.getElementsByClassName('ante')[0].value;
	if(ante.length == 0 || ante == 0)
	{
		alert('please enter a real number less than $' + money);
	}
	else if(instructions && instructions.match('nig-nogs') && ante < money)
	{
		alert('please enter $1,000,000,000 as your ante to continue');
	}
	else if(money >= ante)
	{
		money -= ante;
		$(".currentMoney").text('$' + money);
		for(var i = 1; i<=5; i++)
		{
			var card = String('.c'+i);
			$(card).show();
		}
		$('#ante').hide();
	}
	else
	{
		alert('Im sorry you dont have enough money to bet that high' + '\n' + '\n' + '	     please enter a number less than $' + money)
	}
	ToF = true;
}

anteBox = function()
{
	if( cardsLeft < 5 )
	{
		return false;
	}
	$('#ante').show();
	$('.ante').focus();
	$('.money').text(money);
}

newPickle = function()
{
	if( cardsLeft < 5 )
	{
//		$('endStats').show();
		$('.c6').hide();
		cardsLeft = 0;
		$(".cards").text(cardsLeft);
	}
	endGame();
	$('.new').hide();
	clickNum = 0;
}
	
potato = function()
{
	for(var i= 1; i < 6; i++)
	{
		var card = getRandomCard();
		var dist = 63 + (i*203);
		$("<img />").appendTo('body').addClass('card c'+ i).attr('src', 'images/'+ card +'.png').css({"z-index" : cardIndex, "position" : "absolute", "left" : '20px' , "top" : "50%"}).animate({"left" : '+='+dist+'px',"queue":"true"}).delay(10);
		cardIndex--;
		var original = findCard(card);
		hand[1][original[0]]++;
		hand[2][original[1]]++; 
		cardsLeft--;
		$(".cards").text(cardsLeft);
	}
}
var check = 0;
var clickNum = 0;
var cardIndex = 0;
var ToF = false;
var pickles = 0;
var cardBug =0;
$(document).ready(function()
{
	$('.new').hide();
	$('.ante').attr('value', '');
	$('.ante').focus();
	$(".cards").text(cardsLeft);
	$('.c6').css({"position":"absolute","top":"50%", "left":"20px","z-index": "1"});
	for(var i = 1; i<=5; i++)
	{
		var card = String('.c'+i);
		$(card).css({"z-index" : cardIndex, "position" : "absolute", "left" : (20-i-i)+'px' , "top" : "50%"}).hide();
		cardsLeft--;
		cardIndex--;
	}
	var pattern = new RegExp(/.*?y.*?/gi);
	if(instructions && instructions.match(pattern) != null)
	{
		window.open('instructions.html');
	}
	if(instructions && instructions.match('Gibly bits'))
	{
		money = 9001;
	}
	else if(instructions && instructions.match('nig-nogs'))
	{
		money = 1000000000;
	}
	$('.money').text(money);
	var a= 0;			
	$(".c6").click(function()
	{
		if(!ToF) return false;
		if(check == 0 )
		{
			if(pickles != 0)
			{
				for(var i = 1; i <=5; i++)
				{
					var card = getRandomCard();
					console.log("c"+i);
					document.getElementsByClassName("c"+i)[0].src = "images/" + card + ".png";
					var original = findCard(card);
					hand[0][i-1] = original[1];
					hand[1][original[0]]++;
					hand[2][original[1]]++;
				}
				$(".cards").text(cardsLeft);
				for(var i=5; i>=0; i--)
				{
					var dist = 1088 -(a*205);
					$(".c"+i).animate({"left": "+="+dist+"px"}, "slow"); 
					a++;
				}
				pickles++;
				cardBug = 1;
			}
			else
			{
				potato();
			}
			check++;
		}
		else if(check > 0) 
		{
			if( cardsLeft < clickNum )
			{
				endGame();
//				$('endStats').show();
				$('.c6').hide();
				cardsLeft = 0;
				$(".cards").text(cardsLeft);
			}
			else if( cardsLeft >= clickNum )
			{
				$('.new').show();
				giveClass();
				for(var i = 1; i < 6; i++)
				{
					var nDist = 63+(203*i);
					$(".selected.c"+i).animate({"left": "-="+nDist+"px","queue":"true"}).removeClass("selected c"+i);
				}
				for(var i=0; i < clickNum; i++)
				{
					var card = getRandomCard();
					var dist = 63 + (newClass[i].split('')[1]*203);
					$("<img />").appendTo('body').addClass('card '+newClass[i]).attr('src', 'images/'+ card +'.png').css({"z-index" : cardIndex, "position" : "absolute", "left" : '20px' , "top" : "50%"}).animate({"left" : '+='+dist+'px',"queue":"true"}).delay(10);
					cardIndex--;
					var original = findCard(card);
					hand[1][original[0]]++;
					hand[2][original[1]]++; 
					cardsLeft--;
					$(".cards").text(cardsLeft);
				}	
				clickNum = 0;
				checkHand();
			}
		}
	});

	$(".card").live("click", function()
	{
		if(cardBug == 1)
		{
			$(this).addClass("selected").removeClass("card").animate({"top": "-=270px","queue":"false"}).delay(10);
			clickNum++;
			if(clickNum > 2)
			{
				money -= (5 * (clickNum - 2));
				$('.currentMoney').text('$' + money);
		}	}
	});	

	$(".selected").live("click", function()
	{
		if(cardBug == 1)
		{
			$(this).addClass("card").removeClass("selected").animate({"top": "+=270px","queue":"false"}).delay(10);
			if(clickNum > 2)
			{
				money += (5 * (clickNum - 2));
				$('.currentMoney').text('$' + money);
			}
		}	clickNum--;
	});

	$(".ante").keydown(function(event)
	{
		valids = [[48, 96, 33],[57, 105, 42]];
		for(var i=0; i<2; i++)
		{
			if( (event.keyCode >= valids[0][i] && event.keyCode <= valids[1][i] ) || event.keyCode == 8)
			{
				return true;
			}
		}
		return false;
	});

	$('img').mousedown(function()
	{
		return false;
	});

	$('*').live('mousedown', function()
	{
		var stoof = $(this).is('input');
		return stoof;
	});
});


	
