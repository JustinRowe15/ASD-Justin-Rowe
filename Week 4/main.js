$('#home').on('pageinit', function(){
	
});	
		
$('#addItem').on('pageinit', function(){
	$('#createProject').on('click', formValidate);
});

$('#projectDisplay').on('pageinit', function(){
	getData();
	$('#deleteProject').on('click', clearData);
});

$('#ajaxDisplay').on('pageinit', function(){
	$('#pullJSON').on('click', function(){
		$('#itemsJSON').empty();
		$.ajax({
			'url': '/baseline/_all_docs?include_docs=true&start_key="project:"&end_key="project:zzzzz"',
			'type': 'GET',
			'dataType': 'json',
			'success': function(data){
				$.each(data.rows, function(index, project){
					var projectName = project.doc.pname;
					var pmfirstName = project.doc.pmfname;
					var pmlastName = project.doc.pmlname;
					var startDate = project.doc.sdate;
					var finishDate = project.doc.fdate;
					var contractStart = project.doc.contractstart;
					var contractAward = project.doc.contractaward;
					var productionStart = project.doc.productionstart;
					var productionFinish = project.doc.productionfinish;
					var testStart = project.doc.teststart;
					var testFinish = project.doc.testfinish;
					var deliveryDate = project.doc.delivery;
					var noContracting = project.doc.nocontracting;
					var noTesting = project.doc.notesting;
					var noTraining = project.doc.notraining;
					var projectGroup = project.doc.group;
					var projectNotes = project.doc.notes;
					$('#itemsJSON').append(
						$('<li>').append(
							$('<a>').attr("href", "#")
								.text(project.doc.name)
							)
						);
					});
					$('#itemsJSON').listview('refresh');
				}
			});
		});

	$('#pullXML').on('click', function(){
		$('#itemsXML').empty();
		$.ajax({
			url: 'xhr/projects.xml',
			type: 'GET',
			dataType: 'xml',
			success: function(response){
				$(response).find('project').each(function(){
					var projectname = $(this).find('Pname').text();
					var projectmfame = $(this).find('Pmfname').text();
					var projectmlname = $(this).find('Pmlname').text();
					var startdate = $(this).find('Sdate').text();
					var finishdate = $(this).find('Fdate').text();
					var contractstartdate = $(this).find('ContractStart').text();
					var contractawarddate = $(this).find('ContractAward').text();
					var productionstartdate = $(this).find('ProductionStart').text();
					var productionfinishdate = $(this).find('ProductionFinish').text();
					var teststartdate = $(this).find('TestStart').text();
					var testfinishdate = $(this).find('TestFinish').text();
					var projectdelivery = $(this).find('Delivery').text();
					var nocontractingvalue = $(this).find('NoContracting').text();
					var notestingvalue = $(this).find('NoTesting').text();
					var notrainingvalue = $(this).find('NoTraining').text();
					var projectgroup = $(this).find('Group').text();
					var projectnotes = $(this).find('Notes').text();
						$(' '+
							'<div class="projectXML">'+
								'<p>'+ projectname +
								'<br>'+ projectmfame +
								'<br>'+ projectmlname +
								'<br>'+ startdate +
								'<br>'+ finishdate +
								'<br>'+ contractstartdate +
								'<br>'+ contractawarddate +
								'<br>'+ productionstartdate +
								'<br>'+ productionfinishdate +
								'<br>'+ teststartdate +
								'<br>'+ testfinishdate +
								'<br>'+ projectdelivery +
								'<br>'+ nocontractingvalue +
								'<br>'+ notestingvalue +
								'<br>'+ notrainingvalue +
								'<br>'+ projectgroup +
								'<br>'+ projectnotes +'</p>'+
							'</div>'				
					).appendTo('#itemsXML');
				});
			}
		});
	});
	
	$('#pullCSV').on('click', function(){
		$('#itemsCSV').empty();
		$.ajax({
			url: 'xhr/projects.csv',
			type: 'GET',
			dataType: 'text',
			success: function(response){
				var separate = response.split("\n");
				for(i=0; i<separate.length; i++) {
					var projCSV = separate[i];
					$(''+
						'<div class="projectsCSV">'+
							'<p>'+ 'Project Name:' + projCSV[0] +'</p>'+
							'<p>'+ 'First Name:' + projCSV[1] +'</p>'+
							'<p>'+ 'Last Name:' + projCSV[2] +'</p>'+
							'<p>'+ 'Project Start Date:' + projCSV[3] +'</p>'+
							'<p>'+ 'Project Finish Date:' + projCSV[4] +'</p>'+
							'<p>'+ 'Contract Start Date:' + projCSV[5] +'</p>'+
							'<p>'+ 'Contract Finish Date:' + projCSV[6] +'</p>'+
							'<p>'+ 'Production Start Date:' + projCSV[7] +'</p>'+
							'<p>'+ 'Production Finish Date:' + projCSV[8] +'</p>'+
							'<p>'+ 'Testing Start Date:' + projCSV[9] +'</p>'+
							'<p>'+ 'Testing Finish Date:' + projCSV[10] +'</p>'+
							'<p>'+ 'Delivery Date:' + projCSV[11] +'</p>'+
							'<p>'+ 'Contracting N/A:' + projCSV[12] +'</p>'+
							'<p>'+ 'Testing N/A:' + projCSV[13] +'</p>'+
							'<p>'+ 'Training N/A:' + projCSV[14] +'</p>'+
							'<p>'+ 'Group:' + projCSV[15] +'</p>'+
							'<p>'+ 'Notes:' + projCSV[16] +'</p>'+
						'</div>'				
					).appendTo('#itemsCSV');
				};
			}
		});
	});
});



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
					
var clearData = function(){
	$('#items').empty();
	return false;
};