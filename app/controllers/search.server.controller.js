var functions=require('../controllers/functionsDefined.js');
var connection=require('../../config/mysql.js')();

exports.query=function(req, res, next){
  var sid=req.body.sid;
  var name=req.body.name;
  var phone=req.body.phone;
  console.log(name);

  if(sid!=null && sid.length==10 && !isNaN(sid)){
    console.log('sid: ' + sid);
    connection.query('SELECT PE.*, GPA.*, Mynet.* FROM PE JOIN Mynet ON PE.SID = Mynet.SID JOIN GPA ON PE.SID = GPA.SID WHERE PE.SID='+sid
      ,function(err, rows, result){
        console.log(JSON.stringify(rows[0]));
        //res.json(rows);
        if(rows.length>0){
          console.log('SELECT T.SID, T.NAME, @curRank:=@curRank +1 AS rank FROM (SELECT PE.SID, PE.Name, GPA.GPA FROM GPA JOIN PE ON GPA.SID=PE.SID WHERE PE.Major=\''+rows[0].Major+'\''+'AND PE.SID LIKE '+'\''+rows[0].SID.substring(0,4)+'%\''+') as T, (select @curRank:=0) r order by T.GPA DESC');
          functions.getRank(rows, res, connection);
        } else {
          rows=[{Name:"User does not exist."}];
          console.log(rows);
          res.json(rows);
        }
      });
  }else if(phone!=null && phone.length==11 && !isNaN(phone)){
    console.log(phone);
    connection.query('SELECT PE.*, GPA.*, Mynet.* FROM Mynet JOIN PE ON PE.SID = Mynet.SID JOIN GPA ON Mynet.SID = GPA.SID WHERE Mynet.Phone='+phone
      ,function(err, rows, result){
        console.log(JSON.stringify(rows[0]));
        //res.json(rows);
        if(rows.length>0){
          functions.getRank(rows, res, connection);
        } else {
          rows=[{Name:"User does not exist."}];
          res.json(rows);
        }
      });
  }else if(name!=null && name.length<5){
    console.log(name);
    connection.query('SELECT PE.*, GPA.*, Mynet.* FROM PE JOIN Mynet ON PE.SID = Mynet.SID JOIN GPA ON PE.SID = GPA.SID WHERE PE.Name=\''+name+'\''
      ,function(err, rows, result){
        console.log(rows.length);
        console.log(rows.toString());
        //res.json(rows);
        if(rows.length>0){
          functions.getRank(rows, res, connection);
        } else {
          rows=[{Name:"User does not exist."}];
          res.json(rows);
        }
      });
  }
}