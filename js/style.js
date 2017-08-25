(function(){

	var calendar = new Calendar();
	var currentDate = new Date();
	var currentMonth = currentDate.getMonth();	
	var currentYear = currentDate.getFullYear();
	var quickCommentOpen = document.querySelector(".header-interface__add");		
	var calendarBlock;

	function calendarRender(){
		calendar.render(currentYear, currentMonth);
		calendarBlock = document.querySelector("table");
		calendarBlock.addEventListener("click", openCalendarComment);		
		quickCommentOpen.addEventListener("click", openQuick);			
	};
	calendarRender();

	var previousMonth = document.querySelector(".main-interface__previous");
	previousMonth.addEventListener("click", toPreviousMonth);
	function toPreviousMonth(){
		currentMonth = currentMonth-1;
		if(currentMonth < 0){
			currentMonth = 11;
			currentYear = currentYear-1;
		};
		calendarRender();				
	};

	var nextMonth = document.querySelector(".main-interface__next");
	nextMonth.addEventListener("click", toNextMonth);
	function toNextMonth(){
		currentMonth = currentMonth+1;
		if(currentMonth == 12){
			currentMonth = 0;
			currentYear = currentYear + 1;
		};
		calendarRender();
	};

	var thisDate = document.querySelector(".main-interface__now");
	thisDate.addEventListener("click", toThisDate);	
	function toThisDate(){
		currentMonth = currentDate.getMonth();
		currentYear = currentDate.getFullYear();
		calendarRender();
	};

	var popupComment = new PopupComment();
	var popupElement = document.querySelector(".commentPopup");
	var commentTitle = document.querySelector(".commentTitle");
	var commentDate = document.querySelector(".commentDate");
	var commentPeople = document.querySelector(".commentPeople");	
	var commentDescription = document.querySelector(".commentDescription");		 	
	var currentCalendarElement;
	
		function openCalendarComment(event){
			if(currentCalendarElement){
				currentCalendarElement.classList.remove("selectedCalendarBlock");
			};				

			if(!popupElement.classList.contains("hide")){
				calendarCloseComment();
				openCalendarComment(event, currentCalendarElement);	
				return			
			};
			currentCalendarElement = event.target;	

			popupComment.open(currentCalendarElement);
			commentTitle.addEventListener("click", commentTitleFocus);
			commentTitle.querySelector("input").addEventListener("blur", commentTitleInput);
			commentDate.addEventListener("click", commentDateFocus);
			commentDate.querySelector("input").addEventListener("blur", commentDateInput);
			commentPeople.addEventListener("click", commentPeopleFocus);
			commentPeople.querySelector("input").addEventListener("blur", commentPeopleInput);
			commentDescription.addEventListener("click", commentDescriptionFocus);
			commentDescription.querySelector("textarea").addEventListener("blur", commentDescriptionInput);
			calendarClose.addEventListener("click", calendarCloseComment);					
		};

	var calendarClose = document.querySelector(".closeButton");	
		function calendarCloseComment(){
			popupComment.close();
			commentTitle.removeEventListener("click", commentTitleFocus);
			commentTitle.querySelector("input").removeEventListener("blur", commentTitleInput);
			commentDate.removeEventListener("click", commentDateFocus);
			commentDate.querySelector("input").removeEventListener("blur", commentDateInput);
			commentPeople.removeEventListener("click", commentPeopleFocus);
			commentPeople.querySelector("input").removeEventListener("blur", commentPeopleInput);
			commentDescription.removeEventListener("click", commentDescriptionFocus);
			commentDescription.querySelector("textarea").removeEventListener("blur", commentDescriptionInput);
			currentCalendarElement.classList.remove("selectedCalendarBlock");
			calendarClose.removeEventListener("click", calendarCloseComment);			
		};	
	
	function commentTitleFocus(){			
		popupComment.changeString(commentTitle);
	};
	
	function commentTitleInput(){
		popupComment.changeInput(commentTitle);
	};	
	
	function commentDateFocus(){			
		popupComment.changeString(commentDate);			
	};
	
	function commentDateInput(){
		popupComment.changeInput(commentDate);
	};
		
	function commentPeopleFocus(){			
		popupComment.changeString(commentPeople);			
	};
	
	function commentPeopleInput(){
		popupComment.changeInput(commentPeople);
	};	
	
	function commentDescriptionFocus(){			
		popupComment.changeString(commentDescription);			
	};
	
	function commentDescriptionInput(){
		popupComment.changeInput(commentDescription);
	};

	var commentSubmit = document.querySelector(".commentSubmit");
	var titleValue = document.querySelector(".commentTitle input");
	var dateValue = document.querySelector(".commentDate input");
	var peopleValue = document.querySelector(".commentPeople input");
	var descriptionValue = document.querySelector(".commentDescription textarea");
	commentSubmit.addEventListener("click", commentSubmitButton);
		function commentSubmitButton(){			
			popupComment.submit(currentCalendarElement, titleValue.value, dateValue.value, peopleValue.value, descriptionValue.value);
			calendarRender();	
			calendarCloseComment();			
		};	

	var commentRemove = document.querySelector(".commentRemove");
	commentRemove.addEventListener("click", commentRemoveButton);
		function commentRemoveButton(){			
			popupComment.clear(currentCalendarElement);						
			calendarCloseComment();
			calendarRender();					
		};

		var quickcomment = new Quickcomment();		
		function openQuick(){
			quickcomment.open();
			quickCloseButton.addEventListener("click", closeQuickPopup);
			quickSubmitButton.addEventListener("click", submitQuickPopup);
		};

		var quickCloseButton = document.querySelector(".quickClose");
			function closeQuickPopup(){
				quickcomment.close();
				quickCloseButton.removeEventListener("click", closeQuickPopup);
				quickSubmitButton.removeEventListener("click", submitQuickPopup);
			};

		var quickSubmitButton = document.querySelector(".quickSubmit");
			function submitQuickPopup(){
				var quickCommentaryInput = document.querySelector(".quickCommentaryPopup-wrapper input");
				quickcomment.submit(quickCommentaryInput.value, currentYear);				
				calendarRender();
			};

})();