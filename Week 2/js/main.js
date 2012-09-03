//Justin M. Rowe
//ASD 1209
//Project 2

$('#home').on('pageinit', function(){
	
});	
		
$('#addItem').on('pageinit', function(){
	$('#createProject').on('click', formValidate);
});

$('#projectDisplay').on('pageinit', function(){
	getData();
});

/*var autofillData = function(){
	
};*/

var formValidate = function(){
	delete $.validator.methods.date;
	var myForm = $('#projectForm');
	    myForm.validate({
		invalidHandler: function(form, validator) {
		},
		submitHandler: function() {
   	 	var data = $('myForm').serializeArray();
    	storeData(this.key, data);
    	}
	});
};	

var storeData = function(key, data){
	console.log("Key:", key)
	if(!key){
		var id 					= Math.floor(Math.random()*100000001);
	} else {
		id = key;
	}
	var item = {};
		item.pname = ['Project Name:', $('#pname').val()];
		item.pmfname = ['First Name:', $('#pmfname').val()];
		item.pmlname = ['Last Name:', $('#pmlname').val()];
		item.sdate = ['Start Date:', $('#sdate').val()];
		item.fdate = ['Finish Date:', $('#fdate').val()];
		item.contractstart = ['Contract Start Date:', $('#contractstart').val()];
		item.contractaward = ['Contract Award Date:', $('#contractaward').val()];
		item.productionstart = ['Production Start Date:', $('#productionstart').val()];
		item.productionfinish = ['Production Finish Date:', $('#productionfinish').val()];
		item.teststart = ['Testing Start Date:', $('#teststart').val()];
		item.testfinish = ['Testing Finish Date:', $('#testfinish').val()];
		item.delivery = ['Delivery Date:', $('#delivery').val()];
		item.nocontracting = ['Contracting N/A:', $('#nocontracting:checked').val()];
		item.notesting = ['Testing N/A:', $('#notesting:checked').val()];	
		item.notraining = ['Training N/A:', $('#notraining:checked').val()];
		item.notes = ['Notes:', $('#notes').val()];
	localStorage.setItem(id, JSON.stringify(item));
};

var getData = function(){
	for(i=0, j=localStorage.length; i<j; i++){
		var key = localStorage.key(i);
		var project = localStorage.getItem(key);
		var value = JSON.parse(project);
		console.log(value);
		var listI = $('<li>').appendTo('#items');
		for(n in value){
		var makeLi = $('<p>'+ value[n][0] + value[n][1] +'</p>').appendTo(listI);
		}
	};
	$('#items').listview('refresh');	
};

/* var deleteItem = function (){
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
};*/