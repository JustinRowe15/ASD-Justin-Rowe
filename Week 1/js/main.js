$('#home').on('pageinit', function(){
	
});	
		
$('#addItem').on('pageinit', function(){
	delete $.validator.methods.date;
	var myForm = $('#projectForm');
	    myForm.validate({
		invalidHandler: function(form, validator) {
		},
		submitHandler: function() {
   	 	var data = $('myForm').serializeArray();
    	storeData(data);
    	}

	});

});

var autofillData = function(){
	
};

var getData = function(){
		var makeList = $('<ul></ul>').appendTo('#items');
		for(i=0, j=localStorage.length; i<j; i++){
			var makeLi = $('<li></li>').appendTo('makeList');
		};
		
};

var storeData = function(data){
	if(!data){
		var id 					= Math.floor(Math.random()*100000001);
	} else {
		id = data;
	}
	var item = {};
		item.pname = ['Project Name:', $('#pname').val];
		item.pmfname = ['First Name:', $('#pmfname').val];
		item.pmlname = ['Last Name:', $('#pmlname').val];
		item.sdate = ['Start Date:', $('#sdate').val];
		item.fdate = ['Finish Date:', $('#fdate').val];
		item.contractstart = ['Contract Start Date:', $('#contractstart').val];
		item.contractfinish = ['Contract Finish Date:', $('#contractfinish').val];
		item.productionstart = ['Production Start Date:', $('#productionstart').val];
		item.productionfinish = ['Production Finish Date:', $('#productionfinish').val];
		item.teststart = ['Testing Start Date:', $('#teststart').val];
		item.testfinish = ['Testing Finish Date:', $('#testfinish').val];
		item.delivery = ['Delivery Date:', $('#delivery').val];
		item.nocontracting = ['Contracting N/A:', $('#nocontracting:checked').val];
		item.notesting = ['Testing N/A:', $('#notesting:checked').val];	
		item.notraining = ['Training N/A:', $('#notraining:checked').val];
		item.notes = ['Notes:', $('#notes').val];
	localStorage.setItem(id, JSON.stringify(item));
	alert("Project Saved!");
};

var	deleteItem = function (){
	var ask = confirm("Are you sure you want to delete this project?");
	if(ask){
		localStorage.empty(this.data);
		alert("Project deleted!");
		return false;
	} else {
		alert("Project was not deleted.")
	}	
};
					
var clearLocal = function(){
	if(localStorage.length === 0){
		alert("There is no data to clear.")
	} else {
		localStorage.empty();
		alert("All contacts are deleted!");
		return false;
		}
};

$('#createProject').on('click', getData)