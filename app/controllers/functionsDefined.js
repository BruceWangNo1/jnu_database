module.exports.getRank=function(rows, res, connection) {
  console.log("rows.length: " + rows.length);
  (function(i, len, count, callback){
    for(; i<len;i++){
      (function(i){
        connection.query('SELECT T.SID, T.NAME, @curRank:=@curRank +1 AS rank FROM (SELECT PE.SID, PE.Name, GPA.GPA FROM GPA JOIN PE ON GPA.SID=PE.SID WHERE PE.Major=\''+rows[i].Major+'\''+'AND PE.SID LIKE '+'\''+rows[i].SID.substring(0,4)+'%\''+') as T, (select @curRank:=0) r order by T.GPA DESC'
          ,function(err, rows1, result){
            arr=lookup(rows1);
            console.log("number of students: "+rows1.length);

            console.log(JSON.stringify(arr[rows[i].SID]));

            console.log(arr[rows[i].SID].rank);
            console.log("i " + i);
            rows[i].rank=arr[rows[i].SID].rank;
            rows[i].nos=rows1.length;
            if(++count==len){
              callback();
            }
          });
      }(i));
    }
  }(0, rows.length,0, function(){
    connection.query('SELECT COUNT(*) as count FROM PE WHERE Name LIKE \'%'+rows[0].Name.substring(1)+'\'', 
      function(err, rows1, result){
        console.log(rows1);
        for(i=0; i<rows.length; i++){
          rows[i].count=rows1[0].count;
        }
        res.json(rows);
    });
  }));
}

function lookup(rows1){
  var lookup={};
  for (i=0, len=rows1.length; i<len; i++){
    lookup[rows1[i].SID]=rows1[i];
  }
  return lookup;
}