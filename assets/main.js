//Main game handler

//VARS====
var coin = document.getElementById('coin')//The only game play in tis project 
var moneydisplay = document.getElementById('money')// Displays the player's current cash
var moneydisplayshop = document.getElementById('moneyshop')// Displays the player's current cash in the RDC
var noti = document.getElementById('noti')// notificaion
var ndescription = document.getElementById('ndescription')// description for notificaion
var nheader = document.getElementById('nheader')
var itemdivs = document.getElementById('itemdivs')//Rev management items
//header for notificaion

function m(){
	player.money = 6666666666666666;
	return 'no u'
}



//Non elements
var deg = 0 //stores amount of\ roation coin flips

// Other VARS
var buy_mk2 = true;
var hover_flip2 = false;
var nickel_upgrade = false;
var buy_workers_mk2 = true;
var eco_mk2 = false;

//Tutorial============
var rev_tut_0 = true;
var rev_tut = true;
var rev_tut2 = true;
var rev_tut3 = true;
var rev_tut4 = true;
var rev_tut5 = true;
var rev_tut6 = true;
var rev_tut7 = true;

function skipTutorial(){
	rev_tut_0 = false;
	rev_tut = false;
	rev_tut2 = false;
	rev_tut3 = false;
	rev_tut4 = false;
	rev_tut5 = false;
	rev_tut6 = false;
	rev_tut7 = false;
	shopbtn.disabled = false
	shopbtn.classList.remove('disabled')
	compbtn.disabled = false
	compbtn.classList.remove('disabled')
	document.getElementById("skip-tut").style.display = "none";
	fadeIn(document.getElementById('robotcard'))
	fadeIn(document.getElementById('personcard'))
	closenotify()
}

//EVENTEARS====
coin.addEventListener('click', function(){
	if(rev_tut2){
		rev_tut2 = false;
		setTimeout(function(){
			notify('Tutorial', 'Keep flipping coins until you reach $1.')
		}, 2000)
	}
	addmoney();
})

coin.addEventListener('contextmenu', function(){
	if(rev_tut2){
		rev_tut2 = false;
		setTimeout(function(){
			notify('Tutorial', 'Keep flipping coins until you reach $1.')
		}, 2000)
	}
	addmoney();
})

//FUNCTIONS====

// Next Stage Function
function nextstage(newMoney){
	stage += 1
	player.clickvalue = newMoney;
	items.forEach(function(item){
		if(item.unlock == stage){
			itemdivs.innerHTML = itemdivs.innerHTML + item.cardcode
		player.icon = "./assets/img/" + stage + ".png"
		reset()
	
		}
	}
	
	)}
//Update Function
window.setInterval(update,30)
function update(){
  moneydisplay.innerText = '$' + player.money / 100;
  moneydisplayshop.innerText = '$' + player.money / 100;
	if(player.money > 99 && rev_tut3 == true){
		rev_tut3 = false;
		setTimeout(function(){
			notify('Tutorial', 'Now, buy a robot to flip for you!')
			fadeIn(document.getElementById('robotcard'))
		}, 1000)
	}
	if(player.money > 199 && rev_tut5 == true){
		rev_tut5 = false;
		setTimeout(function(){
			notify('Tutorial', 'Now, hire a person!')
			fadeIn(document.getElementById('personcard'))
			setTimeout(function(){
				notify('Tutorial', 'People cost more but are better.')
			}, 4000)
		}, 1000)
	}
	if(ecoflipper.amount > 0 && eco_mk2){
		eco_mk2 = false;
		createShopItem("eco-mk-2", "Giant Fans", "Buy mega-fans to", "manipulate the wind", "so that eco-flippers", "flip more coins.", 50);
	}

	if(robot.amount > 0 && buy_mk2){
		buy_mk2 = false;
		createRobotMk2()
	}

	if(person.amount > 0 && buy_workers_mk2){
		buy_workers_mk2 = false;
		createShopItem("one-man-army", "Efficient Workers", "Better salaries lead", "to better workers.", "Workers can flip", "5¢ every second.", 12);
	}

	if(hover_flip2 && nickel_upgrade){
		hover_flip2 = false;
		createShopItem("hover-flip2", "HoverFlip 2™ by Zamazon", "An upgrade to", "the original HoverFlip", "Flips 1.25x when the", "coin is hovered over.", 100);
	}

	if(person.amount > 0 && robot.amount > 0  && rev_tut6){
		rev_tut6 = false;
		setTimeout(function(){
			notify('Tutorial', 'Great! You can hire up to 5 workers.')
			setTimeout(function(){
				notify('Tutorial', 'You\'ve unlocked the R&D Center!')
				setTimeout(function(){
					notify('Tutorial', 'Press \'Go Back\' to view it!')
						document.getElementById("skip-tut").style.display = "none";
					shopbtn.disabled = false
  				shopbtn.classList.remove('disabled')
				}, 3000)
			}, 5000)
		}, 3000)
	}

	noti.style.zIndex = "100 !important";
}
// Open notificaion
function notify(header,description,flip = true){
  noti.style.right = 'calc(100% + 300px)'

  nheader.innerText = header
  ndescription.innerText = description
  noti.style.left = 'calc(100% - 300px)'
  if(flip == true){
setTimeout(closenotify,3000)
  }
}
function closenotify(){
  noti.style.left = 'calc(100% + 300px)'
}
//Player click handler
function addmoney(){
  player.money = Math.round(parseFloat(player.money) + parseFloat(player.clickvalue) * 100);
	deg += 360
	coin.style.transform = "rotateX(" + deg + "deg)"
  setTimeout(reset,2000)
}

function addmoneyhoverflip2(){
  player.money = Math.round(parseFloat(player.money) + parseFloat(player.clickvalue) * 125);
	deg += 360
	coin.style.transform = "rotateX(" + deg + "deg)"
  setTimeout(reset,2000)
}
 
//Reset Coin Styleing
function reset(){ 
document.getElementById('coin').src = player.icon;
   
}

//Buy function
function buy(obj){
  var price = eval( 'parseInt(' +obj + '.price)')
  var value = eval( obj + '.value')
  var name = eval( obj + '.name')
  var wakeup = eval( obj + '.wakeup')
  var max = eval(  'parseInt(' +obj + '.max)')
  var amount = eval(  'parseInt(' +obj + '.amount)') 
  var code = eval( obj + '.code')
  if( player.money >= price * 100){
    if(amount == max){//Reached Limit
      notify('Cannot Buy','You have reached the limit', true)
      document.getElementById("buy-bot").style.display = "none !important";
    }
		else{
				document.getElementById("buy-bot").style.display = "inline-block !important"; //Purchase successful
			eval(wakeup + "()") 
			player.money = player.money - price * 100
			eval( obj + '.amount += 1') 
			if(amount == 0){
				
				eval(' document.getElementById("' + obj + 'info").innerHTML = ""')
				eval(' document.getElementById("' + obj + 'info").innerHTML =  document.getElementById("' + obj + 'info").innerHTML + ' +"'" + code + "' + '</div>' ")
        var updatedamount = eval(  'parseInt(' +obj + '.amount)') 
        updateusage("document.getElementById('" +name +"-displaymax')",updatedamount,max)

			} 
			else{
				eval(' document.getElementById("' + obj + 'info").innerHTML =  document.getElementById("' + obj + 'info").innerHTML + ' +"'" + code + "' + '</div>' ")
        var updatedamount = eval(  'parseInt(' +obj + '.amount)') 
        updateusage("document.getElementById('" +name +"-displaymax')",updatedamount,max)

			}
    }
  }
	else{//Not enough money
    notify('Cannot Buy','You do not have enough money.')
		return;
  }
	if(rev_tut4){
		rev_tut4 = false;
		setTimeout(function(){
			notify('Tutorial', 'Great! 10 robots is the max.')
			setTimeout(function(){
				notify('Tutorial', 'Now, flip until you are at $2.')
			}, 1000)
		}, 1000)
	}
}

//ONJECT WAKE UPS ======
function managerobot(){
	
   document.getElementById('robotbar').style.transition = "width 0.9s ease-in-out"
  document.getElementById('robotbar').style.display = "inline-block"
  document.getElementById('robotbar').style.width = "90%"
  setTimeout(managerobot2,900)
}

function manageecoflipper(){
	document.getElementById("ecobar").style.transition = "width 0.9s ease-in-out"
  document.getElementById("ecobar").style.display = "inline-block"
  document.getElementById("ecobar").style.width = "90%"
  setTimeout(manageecoflipper2,900)
	
}
function manageecoflipper2(){
	player.money += Math.round(parseFloat(ecoflipper.value) * 100);
  document.getElementById("ecobar").style.transition = "width 0.9s ease-in-out"
  document.getElementById("ecobar").style.display = "inline-block"
  document.getElementById("ecobar").style.width = "90%"
  setTimeout(manageecoflipper,900)
}

function managerobot2(){
  player.money += Math.round(parseFloat(robot.value) * 100);
   document.getElementById('robotbar').style.transition = "none"
  document.getElementById('robotbar').style.width = "0%"
  setTimeout(managerobot,100)
}
function manageperson(){
   document.getElementById('personbar').style.transition = "width 0.9s ease-in-out"
  document.getElementById('personbar').style.display = "inline-block"
  document.getElementById('personbar').style.width = "90%"
  setTimeout(manageperson2,900)
}
function manageperson2(){
  player.money += Math.round(parseFloat(person.value) * 100);
   document.getElementById('personbar').style.transition = "none"
  document.getElementById('personbar').style.width = "0%"
  setTimeout(manageperson,100)
}

notify('Tutorial', 'Welcome to the CEO Dashboard', true)
setTimeout(function(){
	if(rev_tut_0){
		compbtn.disabled = false
		compbtn.classList.remove('disabled')
		notify('Tutorial', 'First, click on Revenue Management')
	}
}, 4000)
