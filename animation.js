var mystack = stack();
    // .on("activate", activate)
    // .on("deactivate", deactivate);

// var deptree = d3.select("#deptree");
// var depsvg = deptree.append("svg");


var conll = "1	President	President	PROPN	NNP	Number=Sing	2	compound	_	_\n\
2	Bush	Bush	PROPN	NNP	Number=Sing	5	nsubj	_	_\n\
3	on	on	ADP	IN	_	4	case	_	_\n\
4	Tuesday	Tuesday	PROPN	NNP	Number=Sing	5	nmod	_	_\n\
5	nominated	nominate	VERB	VBD	Mood=Ind|Tense=Past|VerbForm=Fin	0	root	_	_\n\
6	two	two	NUM	CD	NumType=Card	7	nummod	_	_\n\
7	individuals	individual	NOUN	NNS	Number=Plur	5	dobj	_	_\n\
8	to	to	PART	TO	_	9	mark	_	_\n\
9	replace	replace	VERB	VB	VerbForm=Inf	5	advcl	_	_\n\
10	retiring	retire	VERB	VBG	VerbForm=Ger	11	amod	_	_\n\
11	jurists	jurist	NOUN	NNS	Number=Plur	9	dobj	_	_\n\
12	on	on	ADP	IN	_	14	case	_	_\n\
13	federal	federal	ADJ	JJ	Degree=Pos	14	amod	_	_\n\
14	courts	court	NOUN	NNS	Number=Plur	11	nmod	_	_\n\
15	in	in	ADP	IN	_	18	case	_	_\n\
16	the	the	DET	DT	Definite=Def|PronType=Art	18	det	_	_\n\
17	Washington	Washington	PROPN	NNP	Number=Sing	18	compound	_	_\n\
18	area	area	NOUN	NN	Number=Sing	14	nmod	_	SpaceAfter=No"
var data = parseConll(conll)
svg = d3.select("#deptree");
svg.selectAll('text, path').remove();
svg.attr('width', 1000).attr('height', 500);
base = svg.append("g").attr("transform", "scale(0.5)");
treeInfo(data);
drawWords(base, data);
addTags(base, data);
drawArcs(base, data);

const Event_list = {
    threshold_update: 'threshold_update',
    cell_hovered: 'cell_hovered',
    new_page: 'new_page',
    clear_selection:'clear_selection'
};


pcplot = new PCPlot("#lstm", 50, 50, {excluded_cells: [],
                                      selected_cells: [1,2,3],
                                      brush :[0,0],
                                      threshold: 1,
                                      draw_data: [{values : [0.1,0.2,0.3,0.4], index: 1},
                                                  {index: 2, values: [0.3,0.2,0.4,0.1]},
                                                  {index: 3, values: [0.3,0.2,-0.4,-0.1]} ]},
                    {wordBrushScale: d3.scale.linear().domain([0,5]).range([0, 100]),
                     xScale : d3.scale.linear().domain([0,10]).range([0, 1000]),
                     yScale : d3.scale.linear().domain([1,-1]).range([0, 250]),
                     hover_event_name: Event_list.cell_hovered
                    } );


var eventHandler = $({});
// event_handler.bind("trigger", function() {})

eventHandler.bind('cell_hovered', function (e, data) {
    d3.select("#lstm").selectAll('.cell_' + data.cell).classed('hover', data.active);
});

pcplot.bind_event_handler(eventHandler);


pcplot.redraw({});
base = d3.select("#lstm").append("g").attr("id", "b2").attr("transform", "translate("+(50 +125) +","+ (50 + 250 + 25) +")")
update_words(d3.select("#b2"), ["hello", "there", "this", "is", "the", "words"], d3.scale.linear().domain([0,10]).range([0,1000]), 10);

animationIM("#im2latex");


// var mystack = stack()
//     .on("activate", activate)
//     .on("deactivate", deactivate);

// var section = d3.selectAll("section"),
//     follow = d3.select("#follow"),
//     followAnchor = d3.select("#follow-anchor"),
//     deptree = d3.select("#deptree"),
//     followIndex = section[0].indexOf(follow.node()),
//     deptreeIndex = section[0].indexOf(deptree.node());

// function refollow() {
//   followAnchor.style("top", (followIndex + (1 - mystack.scrollRatio()) / 2 - d3.event.offset) * 100 + "%");
// }

// function activate(d, i) {
//   if (i === followIndex) mystack.on("scroll.follow", refollow);
//   if (i === deptreeIndex) startLorenz();
// }

// function deactivate(d, i) {
//   if (i === followIndex) mystack.on("scroll.follow", null);
//   if (i === deptreeIndex) stopLorenz();
// }

// var lorenzInterval;

// function startLorenz() {
//   var δτ = 0.003,
//       ρ = 28,
//       σ = 10,
//       β = 8 / 3,
//       x = .5,
//       y = .5,
//       z = 10,
//       n = 30;

//   var width = 1280,
//       height = 720;

//   var canvas = d3.select("canvas")
//       .style("position", "absolute")
//       .style("top", 0)
//       .style("left", 0)
//       .style("width", "100%")
//       .style("height", "100%")
//       .attr("width", width)
//       .attr("height", height);

//   var color = d3.scale.linear()
//       .domain([0, 20, 30, 50])
//       .range(["yellow", "orange", "brown", "purple"])
//       .interpolate(d3.interpolateHcl);

//   var context = canvas.node().getContext("2d");

//   context.lineWidth = .2;
//   context.fillStyle = "rgba(0,0,0,.03)";

//   d3.timer(function() {
//     context.save();
//     context.globalCompositeOperation = "lighter";
//     context.translate(width / 2, height / 2);
//     context.scale(12, 14);
//     context.rotate(30);
//     for (var i = 0; i < n; ++i) {
//       context.strokeStyle = color(z);
//       context.beginPath();
//       context.moveTo(x, y);
//       x += δτ * σ * (y - x);
//       y += δτ * (x * (ρ - z) - y);
//       z += δτ * (x * y - β * z);
//       context.lineTo(x, y);
//       context.stroke();
//     }
//     context.restore();
//     return !lorenzInterval;
//   });

//   lorenzInterval = setInterval(function() {
//     context.fillRect(0, 0, width, height);
//   }, 100);
// }

// function stopLorenz() {
//   lorenzInterval = clearInterval(lorenzInterval);
// }

