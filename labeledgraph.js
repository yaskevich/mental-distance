    var w = 1000;
    var h = 600;
    var linkDistance=200;
	
	var gdata;

    var colors = d3.scale.category10();

	var imgs = [{"name":"москва", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/MSK_Collage_2015.png"},
{"name":"санкт-петербург", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/SPB_Collage_2014-3.png"},
{"name":"петербург", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/SPB_Collage_2014-3.png"},
{"name":"самара", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Samara_main.jpg"},
{"name":"пермь", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Perm_Russia.jpg"},
{"name":"саратов", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Saratov_Montage_(2016).png"},
{"name":"екатеринбург", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Ekb_collage.jpg"},
{"name":"одесса", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Odessa-Montage-2016.png"},
{"name":"казань", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/KAZ_Collage_2015.png"},
{"name":"иркутск", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Industrial_panorama_in_Irkutsk,_Russia.jpg"},
{"name":"воронеж", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Главное_здание_управления_ЮВЖД.jpg"},
{"name":"красноярск", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_view_of_Krasnoyarsk_(city_centre).jpg"},
{"name":"ярославль", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Yarolslav_colage.png"},
{"name":"ростов", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Spaso-Jakovlevskij_-1.JPG"},
{"name":"севастополь", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Sevastopol_Collage_2015.png"},
{"name":"курск", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/General_view_of_Kursk_city.JPG"},
{"name":"калуга", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Kaluga_city,_nowadays_(collage).jpg"},
{"name":"псков", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Псков7.jpg"},
{"name":"омск", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Omsk-kollazh.png"},
{"name":"томск", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Томск_(коллаж).png"},
{"name":"тюмень", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Крестовоздвиженская_церковь_(Тюмень)-2.jpg"},
{"name":"смоленск", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Smolensk_railway_station.jpg"},
{"name":"уфа", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/ӨФӨ-6.jpg"},
{"name":"тула", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Стены_Кремля.jpg"},
{"name":"архангельск", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Arkhangelsk_view_from_Vysotka.jpg"},
{"name":"астрахань", "url":"https://commons.wikimedia.org/wiki/Special:FilePath/Astrahan_collage.png"}];
	var lookup = {};
	for (var i = 0, len = imgs.length; i < len; i++) {
		lookup[imgs[i].name] = imgs[i].url;
	}
function loadSlice(key){
			var arr = [];
			var newedges = [];
			dataslice = gdata['slice'+key]
			dataslice.forEach(function (item, index) {
				var ifrom = item.from.substring(0, item.from.length - 4);
				var ito = item.to.substring(0, item.to.length - 4);
				
				if (arr.indexOf(ifrom) ===  -1){
					arr.push(ifrom);
				}
				if (arr.indexOf(ito) ===  -1){
					arr.push(ito);
				}
				
				newedges.push({
					source: arr.indexOf(ifrom),
					target: arr.indexOf(ito),
					value : Math.round(item.cos * 100) / 100
				});
				// console.log(item,index);			  
			});
			var mapped = arr.map(function(x){return {
				name:x,
				img: lookup[x]
				}});
			// console.log(mapped);
			// console.log(newedges);
			

		    var dataset = {nodes: mapped, edges: newedges};
		 
			
			d3.select("#svg").html("");
			var chartDiv = document.getElementById("svg");  
			
			var width = chartDiv.clientWidth;
			var height = chartDiv.clientHeight;
			// var svg = d3.select("body").append("svg").attr({"width":w,"height":h});
			var svg = d3.select(chartDiv).append("svg");
	
		svg.attr("width", width).attr("height", height);		  
		  
		// var defs = svg.append('svg:defs');
		// defs.append("svg:pattern")
			// .attr("id", "myPattern")
			// .attr("width", 1)
			// .attr("height", 1)
			// .append("svg:image")
			// .attr("xlink:href", "flag.ico")
			// .attr("width", 32)
			// .attr("height", 32)
			// .attr("x", 0)
			// .attr("y", 0);
	
	
		  
			var force = d3.layout.force()
				.nodes(dataset.nodes)
				.links(dataset.edges)
				// .size([w,h])
				.size([width, height])
				//.linkDistance([linkDistance])
				.linkDistance(function(d) { return  1/d.value*70; }) 
				.charge([-500])
				.theta(0.1)
				.gravity(0.05)
				.start();


		 

			var edges = svg.selectAll("line")
			  .data(dataset.edges)
			  .enter()
			  .append("line")
			  .attr("id",function(d,i) {return 'edge'+i})
			  .attr('marker-end','url(#arrowhead)')
			  .style("stroke","#ccc")
			  .style("pointer-events", "none");
			
			
	

			
			var nodes = svg.selectAll(".node")
			  .data(dataset.nodes)
			  .enter()
			  .append('g')
			  .attr("class", "node")
			  // .append("circle")
			  // // .attr({"r":15})
			  // .attr({"r":16})
			  // // .style("fill",function(d,i){return colors(i);})
			  // .style("fill", "url(#myPattern)")
			  .call(force.drag);
			  
			 // var nodeCircle = nodes.append("circle")
			 // .attr("r", 20)
			 // .attr("stroke", "gray")
			 // .attr("fill", "none");
		// console.log(d, d.img+"?width=32");
		var nodeims  = nodes.append("svg:image")
		 .attr("xlink:href", function(d){ return d.img})
      .attr("x", -8)
      .attr("y", -8)
      .attr("width", 32)
      .attr("height", 32);

			var nodelabels = svg.selectAll(".nodelabel") 
			   .data(dataset.nodes)
			   .enter()
			   .append("text")
			   .attr({"x":function(d){return d.x;},
					  "y":function(d){return d.y;},
					  "class":"nodelabel",
					  "stroke":"black"})
			   .text(function(d){return d.name;});

			var edgepaths = svg.selectAll(".edgepath")
				.data(dataset.edges)
				.enter()
				.append('path')
				.attr({'d': function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y},
					   'class':'edgepath',
					   'fill-opacity':0,
					   'stroke-opacity':0,
					   'fill':'blue',
					   'stroke':'red',
					   'id':function(d,i) {return 'edgepath'+i}})
				.style("pointer-events", "none");

			var edgelabels = svg.selectAll(".edgelabel")
				.data(dataset.edges)
				.enter()
				.append('text')
				.style("pointer-events", "none")
				.attr({'class':'edgelabel',
					   'id':function(d,i){return 'edgelabel'+i},
					   'dx':80,
					   'dy':0,
					   'font-size':10,
					   'fill':'#aaa'});

			edgelabels.append('textPath')
				.attr('xlink:href',function(d,i) {return '#edgepath'+i})
				.style("pointer-events", "none")
				.text(function(d,i){
					//return 'label '+i + d.value;
					return d.value;
				});


			svg.append('defs').append('marker')
				.attr({'id':'arrowhead',
					   'viewBox':'-0 -5 10 10',
					   'refX':25,
					   'refY':0,
					   //'markerUnits':'strokeWidth',
					   'orient':'auto',
					   'markerWidth':10,
					   'markerHeight':10,
					   'xoverflow':'visible'})
				.append('svg:path')
					.attr('d', 'M 0,-5 L 10 ,0 L 0,5')
					.attr('fill', '#ccc')
					.attr('stroke','#ccc');
			 

			force.on("tick", function(){

				edges.attr({"x1": function(d){return d.source.x;},
							"y1": function(d){return d.source.y;},
							"x2": function(d){return d.target.x;},
							"y2": function(d){return d.target.y;}
				});

				nodes.attr({"cx":function(d){return d.x;},
							"cy":function(d){return d.y;}
				});

				nodelabels.attr("x", function(d) { return d.x; }) 
						  .attr("y", function(d) { return d.y; });

				nodeims.attr("x", function(d) { return d.x; }) 
						  .attr("y", function(d) { return d.y; });

				edgepaths.attr('d', function(d) { var path='M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;
												   //console.log(d)
												   return path});       

				// edgelabels.attr('transform',function(d,i){
					// if (d.target.x<d.source.x){
						// bbox = this.getBBox();
						// rx = bbox.x+bbox.width/2;
						// ry = bbox.y+bbox.height/2;
						// return 'rotate(180 '+rx+' '+ry+')';
						// }
					// else {
						// return 'rotate(0)';
						// }
				// });
			});
}	
	d3.json("all_cos.json", function(error, data) {
			// console.log(data); // this is your data
			var knops  = [1,2,3,4,5,6,7,8];
			var ages  = ["1801–1848", "1849–1896","1897–1916", "1917–1929", "1930–1954", "1955–1990", "1991–2000", "2001–2017"];
			// var key = d3.select("#knops")
			   // .selectAll("div")
			   // .data(data)
			   // .enter()
			   // .append("div")
				   // .attr("class","key_row")
				   // .attr("id",function (d){ return d.line_id;})
				   // .attr("id",function (d){ return d.line_id;});
				   // <button type="button">Click Me!</button>
				   
				   
			    d3.select("#knops")
				.selectAll("input")
				.data(knops)
				.enter()
				.append("input")
				  .attr("type", "button")
				  // .attr("value", function(d){return "Slice " + d;})
				  .attr("value", function(d){return ages[d-1];})
				  .attr("onclick", function(d){return "loadSlice("+d+")";}); 
			gdata = data[0];
			loadSlice(1);

	});
	
	

