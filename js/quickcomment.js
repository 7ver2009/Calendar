(function(){
	function Quickcomment(){		
	};

	Quickcomment.prototype.open = function(){		
		var quickCommentaryPopup = document.querySelector(".quickCommentaryPopup");
		var quickCommentaryInput = document.querySelector(".quickCommentaryPopup-wrapper input");
		quickCommentaryPopup.classList.remove("hide");
		quickCommentaryInput.focus();
		quickCommentaryInput.value = "";		
	};

	Quickcomment.prototype.close = function(){
		var quickCommentaryPopup = document.querySelector(".quickCommentaryPopup");
		var errorComment = document.querySelector(".errorQuickPopup");
		quickCommentaryPopup.classList.add("hide");		
		errorComment.innerHTML = "";
	};

	Quickcomment.prototype.submit = function(value, year){
	var errorComment = document.querySelector(".errorQuickPopup");
	var errorDateFormat = "Введите данные в формате <br> 13 марта, День рождения!";
	var monthArray = {
			"января": 0,
			"февраля": 1,
			"март": 2,			
			"апреля": 3,
			"мая": 4,
			"июня": 5,
			"июля": 6,
			"август": 7,
			"сентября": 8,
			"октября": 9,
			"ноября": 10,
			"декабря": 11
		};
	var choosenDate; 
	var choosenMonth;	
	var choosenDescription;

	errorComment.innerHTML = "";

		if(value){			
			if(parseInt(value, 10) > 0 && parseInt(value, 10) <= 31 && parseInt(value, 10) !== NaN){							
				choosenDate = parseInt(value, 10);	
				
				for (key in monthArray){
					if(value.indexOf(key) + 1){
						choosenMonth = monthArray[key];
					};			
				};	

				choosenDescription = value.substring(value.indexOf(",") + 1);				

				if(choosenMonth == undefined || choosenDescription == ""){
					errorComment.innerHTML = errorDateFormat;  
				};
			}
			else{
				errorComment.innerHTML = errorDateFormat;  
			};
		}
		else{
			errorComment.innerHTML = "Введите дату и комментарий";
		};

		var choosenFullDate = new Date(year, choosenMonth, choosenDate);		
		localStorage.setItem(choosenFullDate + "title", choosenDescription);					
	};	

	window.Quickcomment = Quickcomment;
})();