var template = require( 'art-template' );
var fs = require("fs");
var data = require('./data.js');
var lineReader = require('line-reader')
, tableList = []
, count = 0;

lineReader.eachLine('./main.csv', function(line, last) {
	
	var tr = line.slice( 0, line.lastIndexOf(',') ).split(',');

	count++;

	if ( count != 1 ) {
		tr[0] = nameDismiss(tr[0]);
	} 

	tableList.push( tr );
  
}).then(function() {

  tableList.pop();
  data.tableList = tableList;
  template.helper('priceFormat', function( number,formatSize ) {
  if ( isNaN(number) ) return number;
	return function(){
        // var l = number.split("").reverse();
        // var t = "",
        // 	price = "";
        // for(var i = 0; i < l.length; i ++ )
        // {
        //     t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        // }
        // for ( var j = t.length; j > 0; j-- ) {
        // 	price += t.charAt( j - 1 ); 
        // }
        // return price;
        var l = number.split("");
        for ( var i = l.length; i > 0; i-- ) {
        	if ( ((i - 1) != 0) && (( i - 1 ) % 3 == 0) ) {
        		l.splice( (l.length - i + 1), 0, ",");
        	}
        }
        return l.join("") + "";
	}
  });
  var html = template(__dirname + '/main', data);
  
  fs.writeFileSync('src/index.html', html);
  // console.log(html);
  
});

function nameDismiss( name ) {
	var missLength = name.length;
	var miss = '';
	for ( var i = 0; i < missLength-1; i++ ) {
		miss += '*';
	}
	rep = name.substr(1);
	name = name.replace(rep,miss);
	return name;
}







