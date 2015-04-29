/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-04-27 15:41:13
 * @version $Id$
 */

// 工厂模式
//  function Student(name,id){
//  	var obj1=new Object();
//  	obj1.name = name;
//  	obj1.studentId = id;
//  	obj1.show=function (){
//  		alert(this.name+':'+this.studentId);
//  	}
//  	return obj1;
//  }

// var wjx=Student('wjx',1);
// console.log(wjx instanceof Student);

// 构造函数
// function Student(name,id){
// 	this.name=name;
// 	this.id=id;//无需显示的return  this默认的就是返回对象。
// 	console.log(this);
// }

// var stu1=new Student('wjx',1);
// var stu2=new Student('ljx',2);
// console.log(stu1 instanceof Student);


// 用原型来试试
// function Student(){
// 	//无任何代码的构造函数
// };

// //prototype属性可以看做是对象的原型
// Student.prototype.name='wjx';
// Student.prototype.id=1;

// var stu1=new Student();
// console.log(stu1 instanceof Student);

// 原型的局限
// function Student(){
// 	//无任何代码的构造函数
// };

// //prototype属性可以看做是对象的原型
// Student.prototype.name='wjx';
// Student.prototype.id=1;
// Student.prototype.grade=new Array(68,70,59);//注意这里的grade属性保存的是引用类型而不是值类型

// var stu1=new Student();
// var stu2=new Student();
// stu1.grade.push('100');//给数组添加一个100
// console.log(stu1.grade);//[68, 70, 59, "100"]
// console.log(stu2.grade);//[68, 70, 59, "100"]

// 为什么修改第一个实例的属性第二个会跟着变？
// 因为属性保存的是引用类型，而不是值类型。保存的是对数组的引用地址，所以实例stu1和stu2的grade保存的都是对数组的引用地址


// 混合的构造函数/原型方式
// function Student(name,id){
// 	this.name=name;
// 	this.id=id;
// 	this.grade=new Array(59,66,99,100);
// }

// Student.prototype.show=function(){
// 	for(x in this){
// 		document.write(x+':'+this[x]+'<br/>')
// 	}
// }

// var stu1=new Student('wjx',1);
// stu1.grade.push('nimadan');
// var stu2=new Student('ljx',2);
// stu1.show();
// stu2.show();
// 所有的非函数属性都在构造函数中创建，意味着又能够用构造函数的参数赋予属性默认值了




// test1 字符串衔接类

// function creatString(){
// 	this.arr=new Array();
// }

// creatString.prototype.add=function(str){
// 	this.arr.push(str);
// }

// creatString.prototype.tostr=function(){
// 	return this.arr.join('');
// }
// var obj1=new creatString();
// for(i=1;i<100;i++){
// 	obj1.add('a'+i+i+i+i+i);
// }
// var result=obj1.tostr();
// // console.log(result);
// document.write(result);



var linkArr=[];//创建存放联系人的数组
function CreateLink(name,tel,group){
	this.name=name;
	this.tel=tel;
	this.group=function(group){
		// code
	};
}


CreateLink.prototype.add=function(){
	
}


CreateLink.prototype.delete=function(){

}

CreateLink.prototype.update=function(){

}


CreateLink.prototype.show=function(){

}




