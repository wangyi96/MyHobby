(function(w){
	
	w.wy=Object.create(null);
	w.wy.css = function(node,type,val){
		
		if(typeof node["transforms"] ==="undefined"){
			node["transforms"]={};
		}
		
		if(arguments.length>=3){
			node["transforms"][type] = val;
			
			for(item in node["transforms"]){
				if(node["transforms"].hasOwnProperty(item)){
					var text="";
					
					switch (item){
						case "translateX":
						case "translateY":
							text += item+"("+val+"px)";
							break;
						case "scale":
							text +=item+"("+val+")";
							break;
						case "rotate":
							text +=item+"("+val+"deg)"
							break;
					}
				}
			}
			node.style.transform = node.style.webkitTransform = text ;
		}else if(arguments.length==2){
			val = node["transforms"][type];
			if(typeof val==="undefined"){
				if(type==="translateX"||type==="translateY"||type==="rotate"){
					val = 0;
				}else if(type==="scale"){
					val=1;
				}
			}
			return val;
		}
	}
})(window)