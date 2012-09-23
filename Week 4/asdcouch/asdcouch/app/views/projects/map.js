function (doc) {
  if (doc._id.substr(0,8) === "project:")  {
    emit(doc._id, {
    		"pname": doc.pname,
    		"pmfname": doc.pmfname,
    		"pmlname": doc.pmlname,
    		"sdate": doc.sdate,
    		"fdate": doc.fdate,
    		"contractstart": doc.contractstart,
    		"contractaward": doc.contractaward,
    		"productionstart": doc.productionstart,
    		"productionfinish": doc.productionfinish,
    		"teststart": doc.teststart,
    		"testfinish": doc.testfinish,
    		"delivery": doc.delivery,
    		"nocontracting": doc.nocontracting,
    		"notesting": doc.notesting,
    		"notraining": doc.notraining,
    		"group": doc.group,
    		"notes": doc.notes
    });
  }
};