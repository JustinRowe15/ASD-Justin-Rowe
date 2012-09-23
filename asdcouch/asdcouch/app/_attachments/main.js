$('#home').on('pageinit', function(){
	
});		

$('#projectName').on('pageinit', function(){
	$('#projectName').live('pageshow', function(){
	$.couch.db("baseline").view("baseline/projects", {
		success: function(data) {
			//console.log(data);
			$('#projectNameList').empty();
			$.each(data.rows, function(index, value){
				var item = (value.value || value.doc);
				$('#projectNameList').append(
					$('<li>').append(
						$('<a>')
							.attr("href", "projects.html?project=" + item.pname)
							.text(item.pname)
					)
				);
			});
			$('#projectNameList').listview('refresh');
		}
	});
	});
});

$('#projectManager').on('pageinit', function(){
	$('#projectManager').live('pageshow', function(){
	$.couch.db("baseline").view("baseline/projects", {
		success: function(data) {
			//console.log(data);
			$('#projectManagerList').empty();
			$.each(data.rows, function(index, value){
				var item = (value.value || value.doc);
				$('#projectManagerList').append(
					$('<li>').append(
						$('<a>')
							.attr("href", "projects.html?project=" + item.pmlname)
							.text(item.pmlname)
					)
				);
			});
			$('#projectManagerList').listview('refresh');
		}
	});
	//getData();
	//$('#deleteProject').on('click', clearData);
	});
});

$('#startDate').on('pageinit', function(){
	$('#startDate').live('pageshow', function(){
	$.couch.db("baseline").view("baseline/projects", {
		success: function(data) {
			//console.log(data);
			$('#startDateList').empty();
			$.each(data.rows, function(index, value){
				var item = (value.value || value.doc);
				$('#startDateList').append(
					$('<li>').append(
						$('<a>')
							.attr("href", "projects.html?project=" + item.sdate)
							.text(item.sdate)
					)
				);
			});
			$('#startDateList').listview('refresh');
		}
	});
	//getData();
	//$('#deleteProject').on('click', clearData);
	});
});

$('#deliveryDate').on('pageinit', function(){
	$('#deliveryDate').live('pageshow', function(){
	$.couch.db("baseline").view("baseline/projects", {
		success: function(data) {
			//console.log(data);
			$('#deliveryDateList').empty();
			$.each(data.rows, function(index, value){
				var item = (value.value || value.doc);
				$('#deliveryDateList').append(
					$('<li>').append(
						$('<a>')
							.attr("href", "projects.html?project=" + item.fdate)
							.text(item.fdate)
					)
				);
			});
			$('#deliveryDateList').listview('refresh');
		}
	});
	//getData();
	//$('#deleteProject').on('click', clearData);
	});
});

$('#productType').on('pageinit', function(){
	$('#productType').live('pageshow', function(){
	$.couch.db("baseline").view("baseline/projects", {
		success: function(data) {
			//console.log(data);
			$('#productTypeList').empty();
			$.each(data.rows, function(index, value){
				var item = (value.value || value.doc);
				$('#productTypeList').append(
					$('<li>').append(
						$('<a>')
							.attr("href", "projects.html?project=" + item.group)
							.text(item.group)
					)
				);
			});
			$('#productTypeList').listview('refresh');
		}
	});
	});	
});

$('#addItem').on('pageinit', function(){
	$('#createProject').on('click', formValidate);
});


var formValidate = function(){
	delete $.validator.methods.date;
	var myForm = $('#projectForm');
	    myForm.validate({
		invalidHandler: function(form, validator) {
		},
		submitHandler: function() {
   	 	var data = $('myForm').serializeArray();
    	storeData();
    	}
	});
};	

var storeData = function(data){
	var doc = {};
		doc._id = "project:"+ $('#pname').val()
		doc.pname = ['Project Name:', $('#pname').val()];
		doc.pmfname = ['First Name:', $('#pmfname').val()];
		doc.pmlname = ['Last Name:', $('#pmlname').val()];
		doc.sdate = ['Start Date:', $('#sdate').val()];
		doc.fdate = ['Finish Date:', $('#fdate').val()];
		doc.contractstart = ['Contract Start Date:', $('#contractstart').val()];
		doc.contractaward = ['Contract Award Date:', $('#contractaward').val()];
		doc.productionstart = ['Production Start Date:', $('#productionstart').val()];
		doc.productionfinish = ['Production Finish Date:', $('#productionfinish').val()];
		doc.teststart = ['Testing Start Date:', $('#teststart').val()];
		doc.testfinish = ['Testing Finish Date:', $('#testfinish').val()];
		doc.delivery = ['Delivery Date:', $('#delivery').val()];
		doc.nocontracting = ['Contracting N/A:', $('#nocontracting:checked').val()];
		doc.notesting = ['Testing N/A:', $('#notesting:checked').val()];	
		doc.notraining = ['Training N/A:', $('#notraining:checked').val()];
		doc.group = ['Product Type:', $('#group').val()];
		doc.notes = ['Notes:', $('#notes').val()];
	$.couch.db("baseline").saveDoc(doc, {
    	success: function(data) {
        console.log(data);
        alert("Project Saved!");
        changePage("projectDisplay");
    	},
    error: function(status) {
        console.log(status);
    	}
	});
};

$('#projectDisplay').on('pageinit', function(){
	$('#itemsJSON').listview('refresh');
		$.couch.db("baseline").view("baseline/projects", {
			success: function(data) {
				$('#itemsJSON').empty();
				$.each(data.rows, function(index, value){
					//console.log(index, value)
					var item = (value.value || value.doc);
					$('#itemsJSON').append(
						$('<li>').append(
							$('<a>').attr("href", "projects.html?project=" + item.pname[1]).text(item.pname[1])
							)
					);
					console.log(item.pname[1]);
				});
				$('#itemsJSON').listview('refresh');
			}
		});
});

var urlVars = function(){
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for (var pair in urlPairs){
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	return urlValues;
};

$('#projects').live('pageshow', function(){
	var project = urlVars()["project"];
	console.log(project);
	var projectKey = "project:"+ project
	$.couch.db("baseline").openDoc(projectKey, {
		success: function(data){
			console.log(data);
			$('#projectItems')
							.append($('<li>').text(data.pname[0] + " " + data.pname[1]))
							.append($('<li>').text(data.pmfname[0] + " " + data.pmfname[1]))
							.append($('<li>').text(data.pmlname[0] + " " + data.pmlname[1]))
							.append($('<li>').text(data.sdate[0] + " " + data.sdate[1]))
							.append($('<li>').text(data.fdate[0] + " " + data.fdate[1]))
							.append($('<li>').text(data.contractstart[0] + " " + data.contractstart[1]))
							.append($('<li>').text(data.contractaward[0] + " " + data.contractaward[1]))
							.append($('<li>').text(data.productionstart[0] + " " + data.productionstart[1]))
							.append($('<li>').text(data.productionfinish[0] + " " + data.productionfinish[1]))
							.append($('<li>').text(data.teststart[0] + " " + data.teststart[1]))
							.append($('<li>').text(data.testfinish[0] + " " + data.testfinish[1]))
							.append($('<li>').text(data.delivery[0] + " " + data.delivery[1]))
							.append($('<li>').text(data.nocontracting[0] + " " + data.nocontracting[1]))
							.append($('<li>').text(data.notesting[0] + " " + data.notesting[1]))
							.append($('<li>').text(data.notraining[0] + " " + data.notraining[1]))
							.append($('<li>').text(data.group[0] + " " + data.group[1]))
							.append($('<li>').text(data.notes[0] + " " + data.notes[1]));
						var editBtn = $('<li>' + '<a id="editProject" dataid="'+ data._id +'" datarev="'+ data._rev +'" data-theme="b">Edit Project</a>' +
						'</li>').appendTo('#projectItems');
						editBtn.on('click', function(){
							editProject(data._id)
						});
						var deleteBtn = $('<li>' + '<a id="deleteProject" dataid="'+ data._id +'" datarev="'+ data._rev +'" data-theme="b">Delete Project</a>' +
						'</li>').appendTo('#projectItems');
						deleteBtn.on('click', function(){
							deleteProject(data._id, data._rev)
						});
						
					$('#projectItems').listview('refresh');
			//var key = Math.floor(Math.random()*10001);		
			//var keyValue = localStorage.setItem(key, data._id);		
        	console.log(data);
		}
	});
	
});

var changePage = function(page){
	$.mobile.changePage($('#'+ page),{transition:"slide"});
}



var editProject = function(key){
	changePage("addItem");
	console.log("ProjectId:"+ key);
	//console.log("Edit worked");
	//var project = localStorage.getItem(key)
	//var projectKey = 
	 $.couch.db("baseline").openDoc(key, {
    	success: function(data) {
        	console.log(data);
        var keyRev = data._rev;	
        $('#pname').val(data['pname'][1]);
        $('#pmfname').val(data['pmfname'][1]);
        $('#pmlname').val(data['pmlname'][1]);
        $('#sdate').val(data['sdate'][1]);
        $('#fdate').val(data['fdate'][1]);
        $('#contractstart').val(data['contractstart'][1]);
        $('#contractaward').val(data['contractaward'][1]);
        $('#productionstart').val(data['productionstart'][1]);
        $('#productionfinish').val(data['productionfinish'][1]);
        $('#teststart').val(data['teststart'][1]);
        $('#testfinish').val(data['testfinish'][1]);
        $('#delivery').val(data['delivery'][1]);
        $('#nocontracting').attr('checked', 'checked');
        $('#notesting').attr('checked', 'checked');
        $('#notraining').attr('checked', 'checked');
        //$("#group option:text="+ data['group'][1] +"").attr('selected', 'selected');
        //$('#notes').attr('value', data['notes'][1]);	
        $('#createProject').off('click', formValidate)
		$('#createProject').on('click', function(){
		saveEdit(key, keyRev)
		});
    	},
    	error: function(status) {
        	console.log(status);
    	}
	});
};

var saveEdit = function(key, keyRev){
	var doc = {};
		doc._id = key;
		doc._rev = keyRev;
		doc.pname = ['Project Name:', $('#pname').val()];
		doc.pmfname = ['First Name:', $('#pmfname').val()];
		doc.pmlname = ['Last Name:', $('#pmlname').val()];
		doc.sdate = ['Start Date:', $('#sdate').val()];
		doc.fdate = ['Finish Date:', $('#fdate').val()];
		doc.contractstart = ['Contract Start Date:', $('#contractstart').val()];
		doc.contractaward = ['Contract Award Date:', $('#contractaward').val()];
		doc.productionstart = ['Production Start Date:', $('#productionstart').val()];
		doc.productionfinish = ['Production Finish Date:', $('#productionfinish').val()];
		doc.teststart = ['Testing Start Date:', $('#teststart').val()];
		doc.testfinish = ['Testing Finish Date:', $('#testfinish').val()];
		doc.delivery = ['Delivery Date:', $('#delivery').val()];
		doc.nocontracting = ['Contracting N/A:', $('#nocontracting:checked').val()];
		doc.notesting = ['Testing N/A:', $('#notesting:checked').val()];	
		doc.notraining = ['Training N/A:', $('#notraining:checked').val()];
		doc.group = ['Product Type:', $('#group').val()];
		doc.notes = ['Notes:', $('#notes').val()];
	$.couch.db("baseline").saveDoc(doc, {
    	success: function(data) {
        console.log(data);
        alert("Project Saved!");
        changePage("home")
    	},
    error: function(status) {
        console.log(status);
    	}
	});
	$('#itemsJSON').listview('refresh');
};	
					
var deleteProject = function(key, rev){
	console.log("Delete worked")
	//var projectKey = 
	var doc = {
    	_id: key,
   		_rev: rev
		};
	$.couch.db("baseline").removeDoc(doc, {
    	success: function(data) {
        	console.log(data);
        	changePage("home")
    	},
    	error: function(status) {
        	console.log(status);
    	}
	});
	$('#itemsJSON').listview('refresh');
};

/* $('#projects').on('pageinit', function(){		
	$('#projectItems').empty();
	$.couch.db("baseline").openDoc("baseline/projects", {
    	success: function(data) {
    		$.each(data.rows, function(index, project){
					$('#projectItems')
							.append($('<li>').text(project.value.pname[0] + " " + project.value.pname[1]))
							.append($('<li>').text(project.value.pmfname[0] + " " +project.value.pmfname[1]))
							.append($('<li>').text(project.value.pmlname[0] + " " + project.value.pmlname[1]))
							.append($('<li>').text(project.value.sdate[0] + " " + project.value.sdate[1]))
							.append($('<li>').text(project.value.fdate[1] + " " + project.value.fdate[1]))
							.append($('<li>').text(project.value.contractstart[0] + " " + project.value.contractstart[1]))
							.append($('<li>').text(project.value.contractaward[0] + " " + project.value.contractaward[1]))
							.append($('<li>').text(project.value.productionstart[0] + " " + project.value.productionstart[1]))
							.append($('<li>').text(project.value.productionfinish[0] + " " + project.value.productionfinish[1]))
							.append($('<li>').text(project.value.teststart[0] + " " + project.value.teststart[1]))
							.append($('<li>').text(project.value.testfinish[0] + " " + project.value.testfinish[1]))
							.append($('<li>').text(project.value.delivery[0] + " " + project.value.delivery[1]))
							.append($('<li>').text(project.value.nocontracting[0] + " " + project.value.nocontracting[1]))
							.append($('<li>').text(project.value.notesting[0] + " " + project.value.notesting[1]))
							.append($('<li>').text(project.value.notraining[0] + " " + project.value.notraining[1]))
							.append($('<li>').text(project.value.group[0] + " " + project.value.group[1]))
							.append($('<li>').text(project.value.notes[0] + " " + project.value.notes[1]));
						$('<li>' + '<input type="submit" id="editProject" value="Edit Project" data-id="'+ project.value.id +'" data-rev="'+ project.value.rev +'" data-theme="b" />' +
						'<input type="submit" id="deleteProject" value="Delete Project" data-id="'+ project.value.id +'" data-rev="'+ project.value.rev +'" data-theme="b" />' +
						'</li>').appendTo('#projectItems');
					});
					$('#projectItems').listview('refresh');
        	console.log(data);
    	},
    	error: function(status) {
        	console.log(status);
    	}
	});
$('#editProject').on('click', {id: project.value.id , rev: project.value.rev}, editProject);
$('#deleteProject').on('click', {id: project.value.id , rev: project.value.rev}, deleteProject);
}); */

/* $('#project').on('pageinit', function(){
	$('#projectItems').empty();
	$.couch.db("baseline").openDoc("project:NewProject", {
    success: function(data) {
        console.log(data);
    },
    error: function(status) {
        console.log(status);
    }
	});
}); */

/* var getData = function(){
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
}; */ 