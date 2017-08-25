(function(){
	function Calendar(){		
	};

	Calendar.prototype.render = function(year, month){	

		var weekArray = [
			"Понедельник",
			"Вторник",
			"Среда",
			"Четверг",
			"Пятница",
			"Суббота",
			"Воскресенье"
		];

		var monthArray = {
			"январь": "Январь",
			"февраль": "Февраль",
			"март": "Март",			
			"апрель": "Апрель",
			"май": "Май",
			"июнь": "Июнь",
			"июль": "Июль",
			"август": "Август",
			"сентябрь": "Сентябрь",
			"октябрь": "Октябрь",
			"ноябрь": "Ноябрь",
			"декабрь": "Декабрь"
		};

		var date = new Date(year, month);
		var thisDay = date.getDay() - 1;
		if(thisDay < 0){
			thisDay = 6;
		};		
		var calendarMonth = "<table ><tr>";

		for(var i = 0; i < thisDay; i++){			
			var toPreviousMonthMillisecond = 24 * 60 * 60 * 1000 * (thisDay - i);
			var lastMonthDateStorage = new Date(+date - toPreviousMonthMillisecond);
			var lastMonthDate = lastMonthDateStorage.getDate();	
			var lastMonthLocalStorageTitle	= localStorage.getItem(lastMonthDateStorage + "title");
			var lastMonthLocalStoragePeople	= localStorage.getItem(lastMonthDateStorage + "people");
			if(!lastMonthLocalStoragePeople){
				lastMonthLocalStoragePeople = "";
			};

			if(lastMonthLocalStorageTitle){
				calendarMonth += "<th class='discribed'>";
			}
			else{
				calendarMonth += "<th>";
			};	

			calendarMonth += weekArray[i] + ", " + lastMonthDate + "<b>" + lastMonthDateStorage + "</b>";

			if(lastMonthLocalStorageTitle){
				calendarMonth += "<br>" + lastMonthLocalStorageTitle + "<br>" + lastMonthLocalStoragePeople + "</th>";
			}
			else{
				calendarMonth += "</th>";
			};								
		};

		var currentDate;		
		for(var i = 0; i < (7 - thisDay); i++){			
			var thisMonthDate = new Date(+date + (24 * 60 * 60 * 1000 * i));			
			var weekDay = thisMonthDate.getDay() - 1;	
			var thisMonthLocalStorageTitle	= localStorage.getItem(thisMonthDate + "title");
			var thisMonthLocalStoragePeople	= localStorage.getItem(thisMonthDate + "people");
			if(!thisMonthLocalStoragePeople){
				thisMonthLocalStoragePeople = "";
			};	

			if (weekDay < 1){
				weekDay = 6;
			};

			if(thisMonthLocalStorageTitle){
				calendarMonth += "<th class='discribed'>";
			}
			else{
				calendarMonth += "<th>";
			};	

			calendarMonth += weekArray[weekDay] + ", " + thisMonthDate.getDate() + "<b>" + thisMonthDate + "</b>";	

			if(thisMonthLocalStorageTitle){
				calendarMonth += "<br>" + thisMonthLocalStorageTitle + "<br>" + thisMonthLocalStoragePeople + "</th>";
			}
			else{
				calendarMonth += "</th>";
			};	

			currentDate = thisMonthDate.getDate();
		};
		calendarMonth += "</tr>";

		var lastCurrentDate = new Date (year, month+1, 0);
		var lastDay = lastCurrentDate.getDate();
		var lastDayWeek = new Date(year, month, lastDay).getDay();				
		while(currentDate < lastDay){
			calendarMonth += "<tr>";
			
			for(i = 0; i < 7; i++){				
				if (currentDate < lastDay){
					currentDate++;
					var monthDateStorage = new Date(year, month, currentDate);
					var toMonthLocalStorageTitle	= localStorage.getItem(monthDateStorage + "title");
					var toMonthLocalStoragePeople	= localStorage.getItem(monthDateStorage + "people");
					if(!toMonthLocalStoragePeople){
						toMonthLocalStoragePeople = "";
					};	

					if(toMonthLocalStorageTitle){
						calendarMonth += "<td class='discribed'>";
					}
					else{
						calendarMonth += "<td>";
					};		

					calendarMonth += currentDate + "<b>" + monthDateStorage + "</b>"; 

					if(toMonthLocalStorageTitle){
						calendarMonth += "<br>" + toMonthLocalStorageTitle + "<br>" + toMonthLocalStoragePeople + "</td>";
					}
					else{
						calendarMonth += "</td>";
					};	
				};				
			};	
				
			if(currentDate != lastDay){
				calendarMonth += "</tr>";						
			}
			else{
				if(lastCurrentDate.getDay() == 0){
					calendarMonth += "</tr>";
				};
			};					
		};

		if(lastCurrentDate.getDay() !== 0){			
			for(var i = 0; i <= 6 - lastCurrentDate.getDay(); i++){
				var nextMonthDateStorage = new Date(year, month+1, 1+i)
				var nextMonthDay = nextMonthDateStorage.getDate();	
				var nextMonthLocalStorageTitle	= localStorage.getItem(nextMonthDateStorage + "title");
				var nextMonthLocalStoragePeople	= localStorage.getItem(nextMonthDateStorage + "people");
				if(!nextMonthLocalStoragePeople){
						nextMonthLocalStoragePeople = "";
					};	


				if(nextMonthLocalStorageTitle){
						calendarMonth += "<td class='discribed'>";
				}
				else{
					calendarMonth += "<td>";
				};		

				calendarMonth += nextMonthDay + "<b>" + nextMonthDateStorage + "</b>";

				if(nextMonthLocalStorageTitle){
						calendarMonth += "<br>" + nextMonthLocalStorageTitle + "<br>" + nextMonthLocalStoragePeople + "</td>";
				}
				else{
					calendarMonth += "</td>";
				};	
			};
			calendarMonth += "</tr>";
		};
		calendarMonth += "</table>";

		var table = document.querySelector(".calendarTable");		
		table.innerHTML = calendarMonth; 

		var	titleSpan = document.querySelector(".main-interface__date");
		titleSpan.textContent = monthArray[date.toLocaleString("ru", {month: "long"})] + " " + date.getFullYear();		
	};

	window.Calendar = Calendar;
})();