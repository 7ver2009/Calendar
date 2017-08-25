(function(){
	function PopupComment(){		
	};

	PopupComment.prototype.open = function(currentBlock){		
		var elementPopup = document.querySelector(".commentPopup");
		var titleValue = document.querySelector(".commentTitle input");
		var dateValue = document.querySelector(".commentDate input");
		var peopleValue = document.querySelector(".commentPeople input");
		var descriptionValue = document.querySelector(".commentDescription textarea");
		var titlePopup = document.querySelector(".commentTitle p");
		var datePopup = document.querySelector(".commentDate p");
		var peoplePopup = document.querySelector(".commentPeople p");
		var descriptionPopup = document.querySelector(".commentDescription p");
		var blockDate = currentBlock.querySelector("b").textContent;	

		titleValue.value = "";
		dateValue.value = "";
		peopleValue.value = "";
		descriptionValue.value = "";

		titleValue.classList.remove("hide");
		dateValue.classList.remove("hide");
		peopleValue.classList.remove("hide");
		descriptionValue.classList.remove("hide");

		titlePopup.classList.add("hide");
		datePopup.classList.add("hide")
		peoplePopup.classList.add("hide")
		descriptionPopup.classList.add("hide")

		elementPopup.classList.remove("hide");		
		currentBlock.classList.add("selectedCalendarBlock");
		titleValue.focus();

		if(currentBlock.classList.contains("discribed")){			

				if(localStorage.getItem(blockDate + "title")){
					titlePopup.textContent = localStorage.getItem(blockDate + "title");
					titleValue.classList.add("hide");
					titlePopup.classList.remove("hide");
				};	

				if(localStorage.getItem(blockDate + "date")){
					datePopup.textContent = localStorage.getItem(blockDate + "date");
					dateValue.classList.add("hide");
					datePopup.classList.remove("hide");					
				}
				else{
					dateValue.classList.remove("hide");
					datePopup.classList.add("hide");					
				};

				if(localStorage.getItem(blockDate + "people")){
					peoplePopup.textContent = localStorage.getItem(blockDate + "people");
					peopleValue.classList.add("hide");
					peoplePopup.classList.remove("hide");
				}
				else{
					peopleValue.classList.remove("hide");
					peoplePopup.classList.add("hide");
				};

				if(localStorage.getItem(blockDate + "description")){
					descriptionPopup.textContent = localStorage.getItem(blockDate + "description");
					descriptionValue.classList.add("hide");
					descriptionPopup.classList.remove("hide");
				}
				else{
					descriptionValue.classList.remove("hide");
					descriptionPopup.classList.add("hide");
				};
		};

		function getCoords(elem){ 
  		var box = elem.getBoundingClientRect();
		  return{
		    top: box.top + pageYOffset,
		    left: box.left + pageXOffset
		  };
		};

		var currentBlockCoordinates = getCoords(currentBlock);		
		if(currentBlockCoordinates.left > 350){			
			elementPopup.style.left = (currentBlockCoordinates.left - 322) + "px";
			elementPopup.style.top = currentBlockCoordinates.top + "px";			
		}
		else{
			elementPopup.style.left = (currentBlockCoordinates.left + 151) + "px";
			elementPopup.style.top = currentBlockCoordinates.top + "px";
		};
	};

	PopupComment.prototype.close = function(){		
		var elementPopup = document.querySelector(".commentPopup");
		elementPopup.classList.add("hide");		
	};

	PopupComment.prototype.changeString = function(elem){		
		var elemP = elem.querySelector("p");
		var elemInput = elem.querySelector("input");
		var elemTextarea = elem.querySelector("textarea"); 		

		if(!elemP.classList.contains("hide") && !elem.classList.contains("commentDescription")){			
			elemP.classList.add("hide");
			elemInput.value = elem.querySelector("p").textContent;
			elemInput.classList.remove("hide");			
		};

		if(!elemP.classList.contains("hide") && elem.classList.contains("commentDescription")){			
			elemP.classList.add("hide");
			elemTextarea.value = elem.querySelector("p").textContent;
			elemTextarea.classList.remove("hide");
		};
	};

	PopupComment.prototype.changeInput = function(elem){
		var elemInput = elem.querySelector("input");
		var elemP = elem.querySelector("p");
		var elemTextarea = elem.querySelector("textarea");

		if(!elem.classList.contains("commentDescription") && elemInput.value){
			elemP.textContent = elemInput.value;
			elemInput.classList.add("hide");
			elemP.classList.remove("hide");
		};

		if(elem.classList.contains("commentDescription") && elemTextarea.value){
			elemP.textContent = elemTextarea.value;
			elemTextarea.classList.add("hide");
			elemP.classList.remove("hide");
		};
	};

	PopupComment.prototype.submit = function(currentBlock, title, date, people, description){					
		var blockDate = currentBlock.querySelector("b").textContent;

		if(title){
			localStorage.setItem(blockDate + "title", title);
		};
		if(date){
			localStorage.setItem(blockDate + "date", date);
		};
		if(people){
			localStorage.setItem(blockDate + "people", people);
		};
		if(description){
			localStorage.setItem(blockDate + "description", description);
		};		
	};	

	PopupComment.prototype.clear = function(currentBlock){
		var blockDate = currentBlock.querySelector("b").textContent;	

		localStorage.removeItem(blockDate + "title");
		localStorage.removeItem(blockDate + "date");
		localStorage.removeItem(blockDate + "people");
		localStorage.removeItem(blockDate + "description");		
	};

	window.PopupComment = PopupComment;
})();