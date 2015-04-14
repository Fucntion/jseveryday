/**
 * Created by Administrator on 2015/4/14.
 */
var http = require('http');
var fs = require('fs');

http.createServer(function(req,res){
    getTitle(res);
}).listen(3000,"127.0.0.1");

function getTitle(res){
    fs.readFile('./public/title.json', function (err,data) {
        if(err){
            hadErrot(err);
        }else{
            var title=JSON.parse(data.toString());
            getTemplate(title,res)
        }
    });
}

function getTemplate(title,res){
    fs.readFile('./public/template.html', function (err,data) {
        if (err) {
            hadErrot(err);
        } else {
            var tmpl = data.toString();
            formahtml(title, tmpl, res)
        }
    });
}

function formahtml(title,tmpl,res){
    var html=tmpl.replace('%',title.join('</li><li>'));
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(html);
}

function hadError(err,res){
    console.error(err);
    res.end('Server Error');
}
