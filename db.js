var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;
var setting = require('./setting');
//module.exports = new Db(setting.db, new Server(setting.host, Connection.DEFAULT_PORT, {}));
 
var db = new Db(setting.db, new Server(setting.host, setting.port, {safe: false}, {auto_reconnect: true}, {}));
exports.db = db;



EmployeeProvider = function() {
  this.db= new Db(setting.db, new Server(setting.host, setting.port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};


EmployeeProvider.prototype.getCollection= function(callback) {
  this.db.collection('name', function(error, employee_collection) {
    if( error ) callback(error);
    else callback(null, employee_collection);
  });
};

//find all employees
EmployeeProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, employee_collection) {
      if( error ) callback(error)
      else {
        employee_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//find an employee by ID
EmployeeProvider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, employee_collection) {
      if( error ) callback(error)
      else {
        employee_collection.findOne({_id: employee_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};


//save new employee
EmployeeProvider.prototype.save = function(employees, callback) {
    this.getCollection(function(error, employee_collection) {
      if( error ) callback(error)
      else {
        if( typeof(employees.length)=="undefined")
          employees = [employees];

        for( var i =0;i< employees.length;i++ ) {
          employee = employees[i];
          employee.created_at = new Date();
        }
        
        employee_collection.insert(employees, function() {
        	console.log(employees);
          callback(null, employees);
        });
      }
    });
};

// update an employee
EmployeeProvider.prototype.update = function(employeeId, employees, callback) {
    this.getCollection(function(error, employee_collection) {
      if( error ) callback(error);
      else {
        employee_collection.update(
					{_id: employee_collection.db.bson_serializer.ObjectID.createFromHexString(employeeId)},
					employees,
					function(error, employees) {
						if(error) callback(error);
						else callback(null, employees)       
					});
      }
    });
};

//delete employee
EmployeeProvider.prototype.delete = function(employeeId, callback) {
	this.getCollection(function(error, employee_collection) {
		if(error) callback(error);
		else {
			employee_collection.remove(
				{_id: employee_collection.db.bson_serializer.ObjectID.createFromHexString(employeeId)},
				function(error, employee){
					if(error) callback(error);
					else callback(null, employee)
				});
			}
	});
};

exports.EmployeeProvider = EmployeeProvider;