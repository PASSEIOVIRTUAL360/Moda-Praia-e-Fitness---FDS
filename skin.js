// Garden Gnome Software - Skin
// Pano2VR 8.0.2/22555
// Filename: dfgfdgd.ggsk
// Generated 2026-07-30T16:06:01Z

function pano2vrSkin(player,base) {
	player.addVariable('opt_3d_preview', 2, true, { ignoreInState: 1  });
	player.addVariable('vis_thumbnails', 2, false, { ignoreInState: 0  });
	player.addVariable('vis_thumbnails_phone', 2, false, { ignoreInState: 0  });
	player.addVariable('resp_phone', 2, false, { ignoreInState: 1  });
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressedKey = 0;
	var skinKeyPressedText = '';
	this.player=player;
	var pano=player;
	player.setApiVersion(7);
	this.rasterizeHTML = player.getRasterizeHTML();
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; });
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	var cssPrefix="";
	me.fontsLoaded=0;
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown={};
	this.elementMouseOver={};
	var i,hs,el,els,elo,ela,geometry,material;
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	for(var i=0;i<prefixes.length;i++) {
		if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
			cssPrefix='-' + prefixes[i].toLowerCase() + '-';
		}
	}
	
	var parameterToTransform=function(p) {
		return p.def + 'translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
	}
	this._=function(text, params) {
		return player._(text, params);
	}
	
	player.setMargins({'left': {'value': 0, 'unit': 'px'}, 'top': {'value': 0, 'unit': 'px'}, 'right': {'value': 0, 'unit': 'px'}, 'bottom': {'value': 0, 'unit': 'px'}});
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		if (player.is3dModel()) {
			let hg = player.get3dHotspotGroup();
			if (hg) {
				let startObject = null;
				if (startElement !== undefined && startElement != me.divSkin) {
					if (startElement.ggId) {
						hg.traverse(function(el) {
							if (el.userData && el.userData.ggId === startElement.ggId) {
								startObject = el;
							}
						});
					}
				} else {
					startObject = hg;
				}
				if (startObject) {
					startObject.traverse(function(el) {
						if (el.userData && el.userData.ggUpdatePosition) {
							el.userData.ggUpdatePosition();
						}
					});
				}
			}
		}
	}
	player.addListener('sizechanged', function () { me.updateSize(me.divSkin);});
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.languageChanged=function() {
		var stack=[];
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdateText) {
				e.ggUpdateText();
			}
			if (e.ggUpdateAria) {
				e.ggUpdateAria();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('languagechanged', this.languageChanged);
	
	this.getClassStyles = function(className) {
		className = '.' + className;
		for (let sheet of document.styleSheets) {
			try {
				for (let rule of sheet.cssRules || sheet.rules) {
					if (rule.selectorText === className) {
						return rule.style;
					}
				}
			} catch (e) {
				console.warn("Cannot access stylesheet: ", e);
			}
		}
		return null;
	};
	this.paintTextDivToCanvas = function(el, stylesString, textureHeightFromEl, autoSize, scrollbar, measureOnly) {
		if (measureOnly === undefined) measureOnly = false;
		const skinStyles = skin.getClassStyles('ggskin');
		const skinTextStyles = skin.getClassStyles('ggskin_text');
		const skinStylesString = skinStyles ? skinStyles.cssText : '';
		const skinTextStylesString = skinTextStyles ? skinTextStyles.cssText : '';
		let elementStylesString = '';
		if (Array.isArray(el.userData.cssClasses)) {
			el.userData.cssClasses.forEach(function(className) {
				const classStyles = skin.getClassStyles(className);
				if (classStyles) {
					elementStylesString += classStyles.cssText;
				}
			});
		}
		const outerDiv = document.createElement('div');
		const textDiv = document.createElement('div');
		textDiv.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
		textDiv.style = skinStylesString + skinTextStylesString + elementStylesString + stylesString;
		textDiv.innerHTML = el.userData.ggText;
		textDiv.style.position = 'absolute';
		textDiv.style.left = '0px';
		textDiv.style.top = '0px';
		const styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.appendChild(document.createTextNode("@font-face { font-family: 'Hepta Slab'; font-style: normal; font-weight: 400; src: local(''), url('fonts/hepta-slab-latin-regular.woff2') format('woff2'); } .hepta_slab { font-family: 'Hepta Slab', serif; }"));
		outerDiv.appendChild(styleTag);
		outerDiv.appendChild(textDiv);
		document.body.appendChild(outerDiv);
		el.userData.boxWidthCanv = textDiv.clientWidth;
		el.userData.totalHeightCanv = textDiv.clientHeight;
		elStyle = window.getComputedStyle(textDiv);
		const lineHeight = elStyle.lineHeight;
		if (lineHeight !== 'normal') {
			el.userData.lineHeight = parseFloat(lineHeight);
		} else {
			el.userData.lineHeight = parseFloat(elStyle.fontSize) * 1.2;
		}
		if (measureOnly) {
			document.body.removeChild(outerDiv);
			return;
		}
		var canv = el.userData.tmpCanvas;
		var ctx = el.userData.tmpCanvasContext;
		canv.width = textDiv.clientWidth * 2;
		canv.height = textDiv.clientHeight * 2;
		ctx.clearRect(0, 0, canv.width, canv.height);
		if (autoSize) {
			el.userData.boxHeightCanv = el.userData.totalHeightCanv;
		} else {
			el.userData.boxHeightCanv = el.userData.height;
		}
		if (scrollbar && textDiv.clientHeight > el.userData.height) {
			el.userData.textCanvas.width = el.userData.width * 2;
		} else {
			el.userData.textCanvas.width = el.userData.boxWidthCanv * 2;
		}
		el.userData.textCanvas.height = el.userData.boxHeightCanv * 2;
		this.rasterizeHTML.drawHTML(outerDiv.innerHTML, canv, {zoom: 2, baseUrl: player.getBasePath() }).then((renderResult) => {
			el.userData.ggTextureFromCanvas();
		}, (err) => {
			console.error('Error rendering HTML to canvas:', err);
		});
		document.body.removeChild(outerDiv);
	};
	this.rectMaxRadius = function(el) {
		return Math.min(el.userData.width / 2.0 + (el.userData.borderWidth.left + el.userData.borderWidth.right) / 2.0, el.userData.height / 2.0 + (el.userData.borderWidth.top + el.userData.borderWidth.bottom) / 2.0);
	}
	this.rectCalcBorderRadiiInnerShape = function(el) {
		let maxRad = skin.rectMaxRadius(el);
		let bwTopLeft = (el.userData.borderWidth.top + el.userData.borderWidth.left) / 2.0;
		let brTopLeft = Math.max(el.userData.borderRadius.topLeft - bwTopLeft, 0.0);
		brTopLeft = Math.min(brTopLeft, maxRad - bwTopLeft);
		let bwTopRight = (el.userData.borderWidth.top + el.userData.borderWidth.right) / 2.0;
		let brTopRight = Math.max(el.userData.borderRadius.topRight - bwTopRight, 0.0);
		brTopRight = Math.min(brTopRight, maxRad - bwTopRight);
		let bwBottomRight = (el.userData.borderWidth.bottom + el.userData.borderWidth.right) / 2.0;
		let brBottomRight = Math.max(el.userData.borderRadius.bottomRight - bwBottomRight, 0.0);
		brBottomRight = Math.min(brBottomRight, maxRad - bwBottomRight);
		let bwBottomLeft = (el.userData.borderWidth.bottom + el.userData.borderWidth.left) / 2.0;
		let brBottomLeft = Math.max(el.userData.borderRadius.bottomLeft - bwBottomLeft, 0.0);
		brBottomLeft = Math.min(brBottomLeft, maxRad - bwBottomLeft);
		el.userData.borderRadiusInnerShape = {
			topLeft: brTopLeft,
			topRight: brTopRight,
			bottomRight: brBottomRight,
			bottomLeft: brBottomLeft
		};
	}
	this.rectHasRoundedCorners = function(el) {
		return (el.userData.borderRadius.topLeft > 0 || el.userData.borderRadius.topRight > 0 || el.userData.borderRadius.bottomRight > 0 || el.userData.borderRadius.bottomLeft > 0);
	}
	this.disposeGeometryAndMaterial = function(el) {
		if (el.geometry) el.geometry.dispose();
		el.geometry = null;
		if (el.material) el.material.dispose();
	}
	this.removeChildren = function(el, filter) {
		if (filter === undefined) filter ='^.*$';
		const pattern = new RegExp(filter);
		for (let i = el.children.length - 1; i >= 0; i--) {
			let child = el.children[i];
			if (pattern.test(child.name)) {
				if (child.isMesh) {
					skin.disposeGeometryAndMaterial(child);
				}
				el.remove(child);
			}
		}
	};
	this.getDepthFrom = function(root, object) {
		let depth = 0;
		let current = object;
		while (current && current !== root) {
			if (current.userData && current.userData.hasOwnProperty('ggId')) depth++;
			current = current.parent;
		}
		return current === root ? depth : -1;
	};
	this.getElementVrPosition = function(el, x, y) {
		var vrPos = {};
		var renderableEl = el.parent && (el.parent.type == 'Mesh' || el.parent.type == 'Group');
		switch (el.userData.hanchor) {
			case 0:
			vrPos.x = (0) - ((renderableEl ? el.parent.userData.width : 800) / 200.0) + (x / 100.0) + (el.userData.width / 200.0);
			break;
			case 1:
			vrPos.x = (0) + (x / 100.0);
			break;
			case 2:
			vrPos.x = (0) + ((renderableEl ? el.parent.userData.width : 800) / 200.0) - (x / 100.0) - (el.userData.width / 200.0);
			break;
		}
		switch (el.userData.vanchor) {
			case 0:
			vrPos.y = (0) + ((renderableEl ? el.parent.userData.height : 600) / 200.0) - (y / 100.0) - (el.userData.height / 200.0);
			break;
			case 1:
			vrPos.y = (0) - (y / 100.0);
			break;
			case 2:
			vrPos.y = (0) - ((renderableEl ? el.parent.userData.height : 600) / 200.0) + (y / 100.0) + (el.userData.height / 200.0);
			break;
		}
		vrPos.x += el.userData.curScaleOffX;
		vrPos.y += el.userData.curScaleOffY;
		return vrPos;
	}
	this.addSkin=function() {
		var hs='';
		var el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
		this.ggCurrentTime=new Date().getTime();
		me._variable_resp_phone = {};
		me._variable_resp_phone.ggCurrentLogicState = -1;
		me._variable_resp_phone.logicBlock = function() {
			var newLogicState_resp_phone;
			if (
				((player.getViewerSize(true).width <= 1024))
			)
			{
				newLogicState_resp_phone = 0;
			}
			else {
				newLogicState_resp_phone = -1;
			}
			if (me._variable_resp_phone.ggCurrentLogicState != newLogicState_resp_phone) {
				me._variable_resp_phone.ggCurrentLogicState = newLogicState_resp_phone;
				if (me._variable_resp_phone.ggCurrentLogicState == 0) {
					player.setVariableValue('resp_phone', true);
				}
				else {
					player.setVariableValue('resp_phone', false);
				}
			}
		}
		el=me._thumbnails_toggle=document.createElement('div');
		el.ggId="thumbnails_toggle";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		el.userData=el;
		hs ='';
		hs+='background : rgba(80,80,80,0.392157);';
		hs+='border : 1px solid #ffffff;';
		hs+='border-radius : 18px;';
		hs+='bottom : 14px;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : calc(50% - ((50px + 2px) / 2) + 0px);';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._thumbnails_toggle.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._thumbnails_toggle.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_thumbnails_phone') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._thumbnails_toggle.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._thumbnails_toggle.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._thumbnails_toggle.style.transition='background-color 100ms ease 0ms';
				if (me._thumbnails_toggle.ggCurrentLogicStateVisible == 0) {
					me._thumbnails_toggle.style.visibility="hidden";
					me._thumbnails_toggle.ggVisible=false;
				}
				else {
					me._thumbnails_toggle.style.visibility=(Number(me._thumbnails_toggle.style.opacity)>0||!me._thumbnails_toggle.style.opacity)?'inherit':'hidden';
					me._thumbnails_toggle.ggVisible=true;
				}
			}
		}
		me._thumbnails_toggle.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((me.elementMouseOver['thumbnails_toggle'] == true))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._thumbnails_toggle.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._thumbnails_toggle.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				me._thumbnails_toggle.style.transition='background-color 100ms ease 0ms';
				if (me._thumbnails_toggle.ggCurrentLogicStateBackgroundColor == 0) {
					me._thumbnails_toggle.style.backgroundColor="rgba(0,0,0,0.470588)";
				}
				else {
					me._thumbnails_toggle.style.backgroundColor="rgba(80,80,80,0.392157)";
				}
			}
		}
		me._thumbnails_toggle.onclick=function (e) {
			if (
				(
					((player.getVariableValue('resp_phone') == false))
				)
			) {
				player.setVariableValue('vis_thumbnails', !player.getVariableValue('vis_thumbnails'));
			}
			if (
				(
					((player.getVariableValue('resp_phone') == true))
				)
			) {
				player.setVariableValue('vis_thumbnails_phone', true);
			}
		}
		me._thumbnails_toggle.onmouseenter=function (e) {
			me.elementMouseOver['thumbnails_toggle']=true;
			me._thumbnails_toggle.logicBlock_backgroundcolor();
		}
		me._thumbnails_toggle.onmouseleave=function (e) {
			me.elementMouseOver['thumbnails_toggle']=false;
			me._thumbnails_toggle.logicBlock_backgroundcolor();
		}
		me._thumbnails_toggle.ggUpdatePosition=function (useTransition) {
		}
		el=me._btn_thumbnails_icon=document.createElement('div');
		els=me._btn_thumbnails_icon__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIGJhc2VQcm9maWxlPSJ0aW55IiBpZD0iTGF5ZXJfMSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMzYgMzYiIHg9IjBweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeT0iMHB4Ij4KIDxjaXJjbGUgY3g9IjE4Ii'+
			'BjeT0iMTgiIGZpbGw9Im5vbmUiIHI9IjEuNSIgc3Ryb2tlPSIjYzJlODEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjEuMjUiLz4KIDxjaXJjbGUgY3g9IjI4LjUiIGN5PSIxOCIgZmlsbD0ibm9uZSIgcj0iMS41IiBzdHJva2U9IiNjMmU4MTIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMS4yNSIvPgogPGNpcmNsZSBjeD0iNy41IiBjeT0iMTgiIGZpbGw9Im5vbmUiIHI9IjEuNSIgc3Ryb2tl'+
			'PSIjYzJlODEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjEuMjUiLz4KPC9zdmc+Cg==';
		me._btn_thumbnails_icon__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="btn_thumbnails_icon";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		el.userData=el;
		hs ='';
		hs+='height : 38px;';
		hs+='left : calc(50% - ((38px + 0px) / 2) + 0px);';
		hs+='position : absolute;';
		hs+='top : calc(50% - ((38px + 0px) / 2) + 0px);';
		hs+='visibility : inherit;';
		hs+='width : 38px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._btn_thumbnails_icon.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._btn_thumbnails_icon.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnails_toggle.appendChild(me._btn_thumbnails_icon);
		me.divSkin.appendChild(me._thumbnails_toggle);
		el=me._thumbnail_menu=document.createElement('div');
		els=me._thumbnail_menu__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		el.ggContentWidth = 0;
		el.ggContentHeight = 0;
		el.ggDragInertiaX = 0;
		el.ggDragInertiaY = 0;
		el.ggVPercentVisible = 1.0;
		el.ggHPercentVisible = 1.0;
		el.ggInInteraction = false;
		el.ggIsDragging = false;
		hs ='';
		hs+='height : 103px;';
		hs+='left : 50%;';
		hs+='margin-left : -91.5px;';
		hs+='margin-top : -51.5px;';
		hs+='overflow-x : visible;';
		hs+='overflow-y : visible;';
		hs+='position : absolute;';
		hs+='top : 50%;';
		hs+='width : 183px;';
		hs+="";
		els.setAttribute('style',hs);
		me._thumbnail_menu.ggScrollByX = function(diffX) {
			if(!me._thumbnail_menu.ggHorScrollVisible || diffX == 0 || me._thumbnail_menu.ggHPercentVisible >= 1.0) return;
			me._thumbnail_menu.ggScrollPosX = (me._thumbnail_menu__horScrollFg.offsetLeft + diffX);
			me._thumbnail_menu.ggScrollPosX = Math.max(me._thumbnail_menu.ggScrollPosX, 0);
			me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
			me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
			let percentScrolled = me._thumbnail_menu.ggScrollPosX / (me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
			me._thumbnail_menu__content.style.left = -(Math.round((me._thumbnail_menu.ggContentWidth * (1.0 - me._thumbnail_menu.ggHPercentVisible)) * percentScrolled)) + me._thumbnail_menu.ggContentLeftOffset + 'px';
			me._thumbnail_menu.ggScrollPosXPercent = (me._thumbnail_menu__horScrollFg.offsetLeft / me._thumbnail_menu__horScrollBg.offsetWidth);
		}
		me._thumbnail_menu.ggScrollByXSmooth = function(diffX) {
			if(!me._thumbnail_menu.ggHorScrollVisible || diffX == 0 || me._thumbnail_menu.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._thumbnail_menu.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._thumbnail_menu.ggScrollPosX >= me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth)) {
					me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._thumbnail_menu.ggScrollPosX <= 0)) {
					me._thumbnail_menu.ggScrollPosX = Math.max(me._thumbnail_menu.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
			let percentScrolled = me._thumbnail_menu.ggScrollPosX / (me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
			me._thumbnail_menu__content.style.left = -(Math.round((me._thumbnail_menu.ggContentWidth * (1.0 - me._thumbnail_menu.ggHPercentVisible)) * percentScrolled)) + me._thumbnail_menu.ggContentLeftOffset + 'px';
			me._thumbnail_menu.ggScrollPosXPercent = (me._thumbnail_menu__horScrollFg.offsetLeft / me._thumbnail_menu__horScrollBg.offsetWidth);
			}, 10);
		}
		me._thumbnail_menu.ggScrollByY = function(diffY) {
			if(!me._thumbnail_menu.ggVertScrollVisible || diffY == 0 || me._thumbnail_menu.ggVPercentVisible >= 1.0) return;
			me._thumbnail_menu.ggScrollPosY = (me._thumbnail_menu__vertScrollFg.offsetTop + diffY);
			me._thumbnail_menu.ggScrollPosY = Math.max(me._thumbnail_menu.ggScrollPosY, 0);
			me._thumbnail_menu.ggScrollPosY = Math.min(me._thumbnail_menu.ggScrollPosY, me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight);
			me._thumbnail_menu__vertScrollFg.style.top = me._thumbnail_menu.ggScrollPosY + 'px';
			let percentScrolled = me._thumbnail_menu.ggScrollPosY / (me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight);
			me._thumbnail_menu__content.style.top = -(Math.round((me._thumbnail_menu.ggContentHeight * (1.0 - me._thumbnail_menu.ggVPercentVisible)) * percentScrolled)) + me._thumbnail_menu.ggContentTopOffset + 'px';
			me._thumbnail_menu.ggScrollPosYPercent = (me._thumbnail_menu__vertScrollFg.offsetTop / me._thumbnail_menu__vertScrollBg.offsetHeight);
		}
		me._thumbnail_menu.ggScrollByYSmooth = function(diffY) {
			if(!me._thumbnail_menu.ggVertScrollVisible || diffY == 0 || me._thumbnail_menu.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._thumbnail_menu.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._thumbnail_menu.ggScrollPosY >= me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight)) {
					me._thumbnail_menu.ggScrollPosY = Math.min(me._thumbnail_menu.ggScrollPosY, me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._thumbnail_menu.ggScrollPosY <= 0)) {
					me._thumbnail_menu.ggScrollPosY = Math.max(me._thumbnail_menu.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._thumbnail_menu__vertScrollFg.style.top = me._thumbnail_menu.ggScrollPosY + 'px';
			let percentScrolled = me._thumbnail_menu.ggScrollPosY / (me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight);
			me._thumbnail_menu__content.style.top = -(Math.round((me._thumbnail_menu.ggContentHeight * (1.0 - me._thumbnail_menu.ggVPercentVisible)) * percentScrolled)) + me._thumbnail_menu.ggContentTopOffset + 'px';
			me._thumbnail_menu.ggScrollPosYPercent = (me._thumbnail_menu__vertScrollFg.offsetTop / me._thumbnail_menu__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._thumbnail_menu.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._thumbnail_menu.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._thumbnail_menu.ggHPercentVisible);
					me._thumbnail_menu.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._thumbnail_menu.clientWidth - (me._thumbnail_menu.ggVertScrollVisible ? 5 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._thumbnail_menu.clientWidth - (me._thumbnail_menu.ggVertScrollVisible ? 5 : 0))) * me._thumbnail_menu.ggHPercentVisible);
					me._thumbnail_menu.ggScrollByXSmooth(diffX);
				}
			}
			if (me._thumbnail_menu.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._thumbnail_menu.ggVPercentVisible);
					me._thumbnail_menu.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._thumbnail_menu.clientHeight - (me._thumbnail_menu.ggHorScrollVisible ? 5 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._thumbnail_menu.clientHeight - (me._thumbnail_menu.ggHorScrollVisible ? 5 : 0))) * me._thumbnail_menu.ggVPercentVisible);
					me._thumbnail_menu.ggScrollByYSmooth(diffY);
				}
			}
		}
		me._thumbnail_menu__content.mousetouchend = e => {
			let inertiaInterval = setInterval(function() {
				me._thumbnail_menu.ggDragInertiaX *= 0.96;
				me._thumbnail_menu.ggDragInertiaY *= 0.96;
				me._thumbnail_menu.ggScrollByX(me._thumbnail_menu.ggDragInertiaX);
				me._thumbnail_menu.ggScrollByY(me._thumbnail_menu.ggDragInertiaY);
				if (Math.abs(me._thumbnail_menu.ggDragInertiaX) < 1.0 && Math.abs(me._thumbnail_menu.ggDragInertiaY) < 1.0) {
					clearInterval(inertiaInterval);
				}
				}, 10);
			me._thumbnail_menu.ggInInteraction = false;
			setTimeout(function() { me._thumbnail_menu.ggIsDragging = false; }, 100);
		}
		me._thumbnail_menu__content.mousetouchmove = e => {
			if (!me._thumbnail_menu.ggInInteraction) return;
			e = e || window.event;
			if (e.buttons==0) {
				me._thumbnail_menu__content.mousetouchend();
				return;
			}
			e.preventDefault();
			var t = e.touches;
			var eventX = t ? t[0].clientX : e.clientX;
			var eventY = t ? t[0].clientY : e.clientY;
			if (Math.abs(eventX - me._thumbnail_menu.ggDragStartX) > 10 || Math.abs(eventY - me._thumbnail_menu.ggDragStartY) > 10) me._thumbnail_menu.ggIsDragging = true;
			var diffX = (eventX - me._thumbnail_menu.ggDragLastX) * me._thumbnail_menu.ggHPercentVisible;
			var diffY = (eventY - me._thumbnail_menu.ggDragLastY) * me._thumbnail_menu.ggVPercentVisible;
			me._thumbnail_menu.ggDragInertiaX = -diffX;
			me._thumbnail_menu.ggDragInertiaY = -diffY;
			me._thumbnail_menu.ggDragLastX = eventX;
			me._thumbnail_menu.ggDragLastY = eventY;
			me._thumbnail_menu.ggScrollByX(-diffX);
			me._thumbnail_menu.ggScrollByY(-diffY);
		}
		me._thumbnail_menu__content.mousetouchstart = e => {
			e = e || window.event;
			var t = e.touches;
			me._thumbnail_menu.ggDragLastX = me._thumbnail_menu.ggDragStartX = t ? t[0].clientX : e.clientX;
			me._thumbnail_menu.ggDragLastY = me._thumbnail_menu.ggDragStartY = t ? t[0].clientY : e.clientY;
			me._thumbnail_menu.ggInInteraction = true;
		}
		els.onmousedown = me._thumbnail_menu__content.mousetouchstart;
		els.ontouchstart = me._thumbnail_menu__content.mousetouchstart;
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = me._thumbnail_menu__content.mousetouchstart;
		}
		document.addEventListener('mouseup', me._thumbnail_menu.contentMouseupListener = function() { me._thumbnail_menu__content.mousetouchend(); });
		document.addEventListener('touchend', me._thumbnail_menu.contentTouchendListener = function() { me._thumbnail_menu__content.mousetouchend(); });
		document.addEventListener('mousemove', me._thumbnail_menu.contentMousemoveListener = function() { me._thumbnail_menu__content.mousetouchmove(); });
		document.addEventListener('touchmove', me._thumbnail_menu.contentTouchmoveListener = function() { me._thumbnail_menu__content.mousetouchmove(); });
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			document.addEventListener('pointerup', me._thumbnail_menu.pointerupListener = function() { me._thumbnail_menu__content.mousetouchend(); });
			document.addEventListener('pointermove', me._thumbnail_menu.pointermoveListener = function() { me._thumbnail_menu__content.mousetouchmove(); });
		}
		elHorScrollBg = me._thumbnail_menu__horScrollBg = document.createElement('div');
		el.appendChild(elHorScrollBg);
		elHorScrollBg.setAttribute('style', 'position: absolute; left: 0px; bottom: 0px; visibility: hidden; width: 448px; height: 5px; background-color: rgba(128,128,128,0); pointer-events: auto;');
		elHorScrollBg.className='ggskin ggskin_scrollarea_hscrollbg';
		elHorScrollFg = me._thumbnail_menu__horScrollFg = document.createElement('div');
		elHorScrollBg.appendChild(elHorScrollFg);
		elHorScrollFg.className='ggskin ggskin_scrollarea_hscrollfg';
		elHorScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 448px; height: 5px; background-color: rgba(255,255,255,0.666667); pointer-events: auto;');
		me._thumbnail_menu.ggScrollPosX = 0;
		me._thumbnail_menu.ggScrollPosXPercent = 0.0;
		elHorScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._thumbnail_menu.ggDragLastX = e.clientX;
			document.addEventListener('mouseup', me._thumbnail_menu.horMouseupListener = function() {
				let inertiaInterval = setInterval(function() {
					me._thumbnail_menu.ggDragInertiaX *= 0.96;
					me._thumbnail_menu.ggScrollByX(me._thumbnail_menu.ggDragInertiaX);
					if (Math.abs(me._thumbnail_menu.ggDragInertiaX) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 10);
				document.removeEventListener('mouseup', me._thumbnail_menu.horMouseupListener);
				document.removeEventListener('mousemove', me._thumbnail_menu.horMousemoveListener);
			});
			document.addEventListener('mousemove', me._thumbnail_menu.horMousemoveListener = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffX = e.clientX - me._thumbnail_menu.ggDragLastX;
				me._thumbnail_menu.ggDragInertiaX = diffX;
				me._thumbnail_menu.ggDragLastX = e.clientX;
				me._thumbnail_menu.ggScrollByX(diffX);
			});
		}
		elHorScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._thumbnail_menu.ggDragLastX = t ? t[0].clientX : e.clientX;
			me._thumbnail_menu.horTouchEnd = function() {
				let inertiaInterval = setInterval(function() {
					me._thumbnail_menu.ggDragInertiaX *= 0.96;
					me._thumbnail_menu.ggScrollByX(me._thumbnail_menu.ggDragInertiaX);
					if (Math.abs(me._thumbnail_menu.ggDragInertiaX) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 10);
				document.removeEventListener('touchend', me._thumbnail_menu.horTouchendListener);
				document.removeEventListener('touchmove', me._thumbnail_menu.horTouchmoveListener);
				document.removeEventListener('pointerup', me._thumbnail_menu.horPointerupListener);
				document.removeEventListener('pointermove', me._thumbnail_menu.horPointermoveListener);
			}
			document.addEventListener('touchend', me._thumbnail_menu.horTouchendListener = function() { me._thumbnail_menu.horTouchEnd(); });
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.addEventListener('pointerup', me._thumbnail_menu.horPointerupListener = function() { me._thumbnail_menu.horTouchEnd(); });
			}
			me._thumbnail_menu.horTouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = (t ? t[0].clientX : e.clientX) - me._thumbnail_menu.ggDragLastX;
				me._thumbnail_menu.ggDragInertiaX = diffX;
				me._thumbnail_menu.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._thumbnail_menu.ggScrollByX(diffX);
			}
			document.addEventListener('touchmove', me._thumbnail_menu.horTouchmoveListener = function(e) { me._thumbnail_menu.horTouchmove(e); });
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.addEventListener('pointermove', me._thumbnail_menu.horPointermoveListener = function(e) { me._thumbnail_menu.horTouchmove(e); });
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elHorScrollFg.onpointerdown = elHorScrollFg.ontouchstart;
		}
		elHorScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffX = me._thumbnail_menu.ggScrollWidth;
			if (e.offsetX < me._thumbnail_menu.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._thumbnail_menu.ggScrollByXSmooth(diffX);
		}
		elHorScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._thumbnail_menu__horScrollBg.getBoundingClientRect();
			var diffX = me._thumbnail_menu.ggScrollWidth;
			if ((t[0].clientX - rect.left) < me._thumbnail_menu.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._thumbnail_menu.ggScrollByXSmooth(diffX);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaX);
			me._thumbnail_menu.ggScrollByXSmooth(30 * me._thumbnail_menu.ggHPercentVisible * wheelDelta);
		});
		elCornerBg = me._thumbnail_menu__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 5px; height: 5px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="thumbnail_menu";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		el.userData=el;
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='bottom : 77px;';
		hs+='height : 130px;';
		hs+='left : calc(50% - ((70% + 0px) / 2) + 0px);';
		hs+='opacity : 0;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 70%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._thumbnail_menu.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._thumbnail_menu.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_thumbnails') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_menu.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_menu.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_menu.style.transition='opacity 300ms ease 0ms';
				if (me._thumbnail_menu.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_menu.style.visibility=me._thumbnail_menu.ggVisible?'inherit':'hidden';
					me._thumbnail_menu.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._thumbnail_menu.style.opacity == 0.0) { me._thumbnail_menu.style.visibility="hidden"; } }, 305);
					me._thumbnail_menu.style.opacity=0;
				}
			}
		}
		me._thumbnail_menu.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none' && (e.offsetWidth != 0 || e.offsetHeight != 0)) {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none' && e.style['overflow']!='hidden') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				var contentWidth = maxX - minX;
				this.ggContent.style.width = contentWidth + 'px';
				var contentHeight = maxY - minY;
				this.ggContent.style.height = contentHeight + 'px';
			var scaleX = this.getBoundingClientRect().width / this.offsetWidth;
				this.ggContentWidth = contentWidth / scaleX;
			var scaleY = this.getBoundingClientRect().height / this.offsetHeight;
				this.ggContentHeight = contentHeight / scaleY;
				var containerWidth = offsetWidthWithScale;
				if (this.ggVertScrollVisible) containerWidth -= 5;
				if (contentWidth < containerWidth) {
					this.ggContent.style.left = '50%';
					this.ggContent.style.marginLeft = ((contentWidth/-2) - (this.ggVertScrollVisible ? (5/2) : 0)) + 'px';
				}
				else {
					this.ggContent.style.left = this.ggContentLeftOffset + 'px';
					this.ggContent.style.marginLeft = '0px';
				}
				var containerHeight = this.clientHeight;
				if (this.ggHorScrollVisible) containerHeight -= 5;
				if (contentHeight < containerHeight) {
					this.ggContent.style.top = '50%';
					this.ggContent.style.marginTop = ((contentHeight/-2) - (this.ggHorScrollVisible ? (5/2) : 0))  + 'px';
				}
				else {
					this.ggContent.style.top = this.ggContentTopOffset + 'px';
					this.ggContent.style.marginTop = '0px';
				}
				if (contentWidth > Math.ceil(offsetWidthWithScale)) {
					me._thumbnail_menu__horScrollBg.style.visibility = 'inherit';
					me._thumbnail_menu__horScrollFg.style.visibility = 'inherit';
					me._thumbnail_menu.ggHorScrollVisible = true;
				} else {
					me._thumbnail_menu__horScrollBg.style.visibility = 'hidden';
					me._thumbnail_menu__horScrollFg.style.visibility = 'hidden';
					me._thumbnail_menu.ggHorScrollVisible = false;
				}
				if(me._thumbnail_menu.ggHorScrollVisible) {
					me._thumbnail_menu.ggAvailableHeight = me._thumbnail_menu.clientHeight - 5;
					if (me._thumbnail_menu.ggVertScrollVisible) {
						me._thumbnail_menu.ggAvailableWidth = me._thumbnail_menu.clientWidth - 5;
						me._thumbnail_menu.ggAvailableWidthWithScale = me._thumbnail_menu.getBoundingClientRect().width - me._thumbnail_menu__horScrollBg.getBoundingClientRect().height;
					} else {
						me._thumbnail_menu.ggAvailableWidth = me._thumbnail_menu.clientWidth;
						me._thumbnail_menu.ggAvailableWidthWithScale = me._thumbnail_menu.getBoundingClientRect().width;
					}
					me._thumbnail_menu__horScrollBg.style.width = me._thumbnail_menu.ggAvailableWidth + 'px';
					me._thumbnail_menu.ggHPercentVisible = contentWidth != 0 ? me._thumbnail_menu.ggAvailableWidthWithScale / contentWidth : 0.0;
					if (me._thumbnail_menu.ggHPercentVisible > 1.0) me._thumbnail_menu.ggHPercentVisible = 1.0;
					me._thumbnail_menu.ggScrollWidth = Math.round(me._thumbnail_menu__horScrollBg.offsetWidth * me._thumbnail_menu.ggHPercentVisible);
					me._thumbnail_menu__horScrollFg.style.width = me._thumbnail_menu.ggScrollWidth + 'px';
					me._thumbnail_menu.ggScrollPosX = me._thumbnail_menu.ggScrollPosXPercent * me._thumbnail_menu.ggAvailableWidth;
					me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
					me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
					if (me._thumbnail_menu.ggHPercentVisible < 1.0) {
						let percentScrolled = me._thumbnail_menu.ggScrollPosX / (me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
						me._thumbnail_menu__content.style.left = -(Math.round((me._thumbnail_menu.ggContentWidth * (1.0 - me._thumbnail_menu.ggHPercentVisible)) * percentScrolled)) + this.ggContentLeftOffset + 'px';
					}
				} else {
					me._thumbnail_menu.ggAvailableHeight = me._thumbnail_menu.clientHeight;
					me._thumbnail_menu.ggScrollPosX = 0;
					me._thumbnail_menu.ggScrollPosXPercent = 0.0;
				}
				if(horScrollWasVisible != me._thumbnail_menu.ggHorScrollVisible || vertScrollWasVisible != me._thumbnail_menu.ggVertScrollVisible) {
					skin.updateSize(me._thumbnail_menu);
					me._thumbnail_menu.ggUpdatePosition();
				}
			}
		}
		el=me._thumbnail_cloner=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._thumbnail_cloner;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggCloneOffset = 0;
		el.ggCloneOffsetChanged = false;
		el.ggWidth = 182;
		el.ggHeight = 100;
		el.ggSizeChanged = false;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggFilterHsSkinId = '';
		el.ggInstances = [];
		el.ggNumFilterPassed = 0;
		el.getFilteredNodes = function(tourNodes, filter) {
			var filteredNodes = [];
			for (var i = 0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (!nodeData['tags'] || nodeData['tags'].indexOf(filter[j].trim()) == -1) passed = false;
					}
				}
				if (passed) {
					filteredNodes.push(nodeId);
				}
			}
			return filteredNodes;
		}
		el.ggUpdate = function(filter) {
			if(me._thumbnail_cloner.ggUpdating == true) return;
			me._thumbnail_cloner.ggUpdating = true;
			var el=me._thumbnail_cloner;
			var curNumRows = 0;
			curNumRows = me._thumbnail_cloner.ggNumRepeat;
			if (curNumRows < 1) curNumRows = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumRows == curNumRows) && !el.ggSizeChanged && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._thumbnail_cloner.ggUpdating = false;
				return;
			} else {
				el.ggSizeChanged = false;
				el.ggNumCols = 1;
				el.ggNumRows = curNumRows;
			var centerOffsetHor = 0;
			var centerOffsetVert = 0;
				me._thumbnail_cloner.ggCloneOffsetChanged = false;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			if (tourNodes.length == 0) {
				me._thumbnail_cloner.ggUpdating = false;
				return;
			}
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			var keepCloning = true;
			tourNodes = me._thumbnail_cloner.getFilteredNodes(tourNodes, filter);
			me._thumbnail_cloner.ggNumFilterPassed = tourNodes.length;
			for (var i = 0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var nodeData = player.getNodeUserdata(nodeId);
				if (!keepCloning || i < me._thumbnail_cloner.ggCloneOffset) continue;
				var parameter={};
				parameter.top = centerOffsetVert + (row * me._thumbnail_cloner.ggHeight) + 'px';
				parameter.left = centerOffsetHor + (column * me._thumbnail_cloner.ggWidth) + 'px';
				parameter.width=me._thumbnail_cloner.ggWidth + 'px';
				parameter.height=me._thumbnail_cloner.ggHeight + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_thumbnail_cloner_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				row++;
				if (row >= el.ggNumRows) {
					row = 0;
					column++;
					el.ggNumCols++;
				}
			}
			me._thumbnail_cloner.ggNodeCount = me._thumbnail_cloner.ggNumFilterPassed;
			me._thumbnail_cloner.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._thumbnail_cloner.parentNode && me._thumbnail_cloner.parentNode.classList.contains('ggskin_subelement') && me._thumbnail_cloner.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._thumbnail_cloner.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggId="thumbnail_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		el.userData=el;
		hs ='';
		hs+='height : 100px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 182px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._thumbnail_cloner.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._thumbnail_cloner.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._thumbnail_cloner.childNodes.length; i++) {
				var child=me._thumbnail_cloner.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._thumbnail_cloner.ggUpdatePosition=function (useTransition) {
			me._thumbnail_cloner.ggUpdate();
		}
		me._thumbnail_menu__content.appendChild(me._thumbnail_cloner);
		me.divSkin.appendChild(me._thumbnail_menu);
		el=me._screentint_phone=document.createElement('div');
		el.ggId="screentint_phone";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		el.userData=el;
		hs ='';
		hs+='background : rgba(0,0,0,0.705882);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		hs+='backdrop-filter: blur(3px);';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._screentint_phone.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._screentint_phone.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_thumbnails_phone') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._screentint_phone.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._screentint_phone.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._screentint_phone.style.transition='opacity 300ms ease 0ms';
				if (me._screentint_phone.ggCurrentLogicStateAlpha == 0) {
					me._screentint_phone.style.visibility=me._screentint_phone.ggVisible?'inherit':'hidden';
					me._screentint_phone.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._screentint_phone.style.opacity == 0.0) { me._screentint_phone.style.visibility="hidden"; } }, 305);
					me._screentint_phone.style.opacity=0;
				}
			}
		}
		me._screentint_phone.ggUpdatePosition=function (useTransition) {
		}
		el=me._close_popup_phone=document.createElement('div');
		el.ggPermeable=false;
		el.ggId="close_popup_phone";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		el.userData=el;
		hs ='';
		hs+='height : 50px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._close_popup_phone.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._close_popup_phone.onclick=function (e) {
			player.setVariableValue('vis_thumbnails_phone', false);
		}
		me._close_popup_phone.onmouseenter=function (e) {
			me.elementMouseOver['close_popup_phone']=true;
			me._btn_close_popup_phone.logicBlock_visible();
		}
		me._close_popup_phone.onmouseleave=function (e) {
			me.elementMouseOver['close_popup_phone']=false;
			me._btn_close_popup_phone.logicBlock_visible();
		}
		me._close_popup_phone.ggUpdatePosition=function (useTransition) {
		}
		el=me._btn_close_popup_phone=document.createElement('div');
		els=me._btn_close_popup_phone__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMiAzMjsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMyIDMyIiB4PSIwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHk9Ij'+
			'BweCI+CiA8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGQ7Cgkuc3Qwe2ZpbGw6bm9uZTtzdHJva2U6I2MyZTgxMjtzdHJva2Utd2lkdGg6MS4zMzMzO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo1LjMzMzM7fSYjeGQ7Cjwvc3R5bGU+CiA8bGluZSBjbGFzcz0ic3QwIiB4MT0iMjQiIHgyPSI4IiB5MT0iOCIgeTI9IjI0Ii8+CiA8bGluZSBjbGFzcz0ic3QwIiB4MT0iOCIgeDI9IjI0IiB5MT0iOCIgeTI9IjI0Ii8+Cjwvc3ZnPgo=';
		me._btn_close_popup_phone__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._btn_close_popup_phone__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjIuMywgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzNiAzNjsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDM2IDM2IiB4PSIwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHk9Ij'+
			'BweCI+CiA8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGQ7Cgkuc3Qwe2ZpbGw6bm9uZTtzdHJva2U6I0ZGRkZGRjtzdHJva2Utd2lkdGg6MS4yNTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fSYjeGQ7Cjwvc3R5bGU+CiA8bGluZSBjbGFzcz0ic3QwIiB4MT0iMjciIHgyPSI5IiB5MT0iOSIgeTI9IjI3Ii8+CiA8bGluZSBjbGFzcz0ic3QwIiB4MT0iOSIgeDI9IjI3IiB5MT0iOSIgeTI9IjI3Ii8+Cjwvc3ZnPgo=';
		me._btn_close_popup_phone__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggSubElementOver = elo;
		el.ggId="btn_close_popup_phone";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		el.userData=el;
		hs ='';
		hs+='height : 30px;';
		hs+='left : 20px;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._btn_close_popup_phone.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._btn_close_popup_phone.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['close_popup_phone'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._btn_close_popup_phone.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._btn_close_popup_phone.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._btn_close_popup_phone.style.transition='';
				if (me._btn_close_popup_phone.ggCurrentLogicStateVisible == 0) {
					me._btn_close_popup_phone.style.visibility="hidden";
					me._btn_close_popup_phone.ggVisible=false;
				}
				else {
					me._btn_close_popup_phone.style.visibility=(Number(me._btn_close_popup_phone.style.opacity)>0||!me._btn_close_popup_phone.style.opacity)?'inherit':'hidden';
					me._btn_close_popup_phone.ggVisible=true;
				}
			}
		}
		me._btn_close_popup_phone.onmouseenter=function (e) {
			me._btn_close_popup_phone__img.style.visibility='hidden';
			me._btn_close_popup_phone__imgo.style.visibility='inherit';
			me.elementMouseOver['btn_close_popup_phone']=true;
		}
		me._btn_close_popup_phone.onmouseleave=function (e) {
			me._btn_close_popup_phone__img.style.visibility='inherit';
			me._btn_close_popup_phone__imgo.style.visibility='hidden';
			me.elementMouseOver['btn_close_popup_phone']=false;
		}
		me._btn_close_popup_phone.ggUpdatePosition=function (useTransition) {
		}
		me._close_popup_phone.appendChild(me._btn_close_popup_phone);
		me._screentint_phone.appendChild(me._close_popup_phone);
		el=me._thumbnail_scroller_phone=document.createElement('div');
		els=me._thumbnail_scroller_phone__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		el.ggContentWidth = 0;
		el.ggContentHeight = 0;
		el.ggDragInertiaX = 0;
		el.ggDragInertiaY = 0;
		el.ggVPercentVisible = 1.0;
		el.ggHPercentVisible = 1.0;
		el.ggInInteraction = false;
		el.ggIsDragging = false;
		hs ='';
		hs+='height : 99px;';
		hs+='left : 50%;';
		hs+='margin-left : -82.5px;';
		hs+='overflow-x : visible;';
		hs+='overflow-y : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 165px;';
		hs+="";
		els.setAttribute('style',hs);
		me._thumbnail_scroller_phone.ggScrollByX = function(diffX) {
			if(!me._thumbnail_scroller_phone.ggHorScrollVisible || diffX == 0 || me._thumbnail_scroller_phone.ggHPercentVisible >= 1.0) return;
			me._thumbnail_scroller_phone.ggScrollPosX = (me._thumbnail_scroller_phone__horScrollFg.offsetLeft + diffX);
			me._thumbnail_scroller_phone.ggScrollPosX = Math.max(me._thumbnail_scroller_phone.ggScrollPosX, 0);
			me._thumbnail_scroller_phone.ggScrollPosX = Math.min(me._thumbnail_scroller_phone.ggScrollPosX, me._thumbnail_scroller_phone__horScrollBg.offsetWidth - me._thumbnail_scroller_phone__horScrollFg.offsetWidth);
			me._thumbnail_scroller_phone__horScrollFg.style.left = me._thumbnail_scroller_phone.ggScrollPosX + 'px';
			let percentScrolled = me._thumbnail_scroller_phone.ggScrollPosX / (me._thumbnail_scroller_phone__horScrollBg.offsetWidth - me._thumbnail_scroller_phone__horScrollFg.offsetWidth);
			me._thumbnail_scroller_phone__content.style.left = -(Math.round((me._thumbnail_scroller_phone.ggContentWidth * (1.0 - me._thumbnail_scroller_phone.ggHPercentVisible)) * percentScrolled)) + me._thumbnail_scroller_phone.ggContentLeftOffset + 'px';
			me._thumbnail_scroller_phone.ggScrollPosXPercent = (me._thumbnail_scroller_phone__horScrollFg.offsetLeft / me._thumbnail_scroller_phone__horScrollBg.offsetWidth);
		}
		me._thumbnail_scroller_phone.ggScrollByXSmooth = function(diffX) {
			if(!me._thumbnail_scroller_phone.ggHorScrollVisible || diffX == 0 || me._thumbnail_scroller_phone.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._thumbnail_scroller_phone.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._thumbnail_scroller_phone.ggScrollPosX >= me._thumbnail_scroller_phone__horScrollBg.offsetWidth - me._thumbnail_scroller_phone__horScrollFg.offsetWidth)) {
					me._thumbnail_scroller_phone.ggScrollPosX = Math.min(me._thumbnail_scroller_phone.ggScrollPosX, me._thumbnail_scroller_phone__horScrollBg.offsetWidth - me._thumbnail_scroller_phone__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._thumbnail_scroller_phone.ggScrollPosX <= 0)) {
					me._thumbnail_scroller_phone.ggScrollPosX = Math.max(me._thumbnail_scroller_phone.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._thumbnail_scroller_phone__horScrollFg.style.left = me._thumbnail_scroller_phone.ggScrollPosX + 'px';
			let percentScrolled = me._thumbnail_scroller_phone.ggScrollPosX / (me._thumbnail_scroller_phone__horScrollBg.offsetWidth - me._thumbnail_scroller_phone__horScrollFg.offsetWidth);
			me._thumbnail_scroller_phone__content.style.left = -(Math.round((me._thumbnail_scroller_phone.ggContentWidth * (1.0 - me._thumbnail_scroller_phone.ggHPercentVisible)) * percentScrolled)) + me._thumbnail_scroller_phone.ggContentLeftOffset + 'px';
			me._thumbnail_scroller_phone.ggScrollPosXPercent = (me._thumbnail_scroller_phone__horScrollFg.offsetLeft / me._thumbnail_scroller_phone__horScrollBg.offsetWidth);
			}, 10);
		}
		me._thumbnail_scroller_phone.ggScrollByY = function(diffY) {
			if(!me._thumbnail_scroller_phone.ggVertScrollVisible || diffY == 0 || me._thumbnail_scroller_phone.ggVPercentVisible >= 1.0) return;
			me._thumbnail_scroller_phone.ggScrollPosY = (me._thumbnail_scroller_phone__vertScrollFg.offsetTop + diffY);
			me._thumbnail_scroller_phone.ggScrollPosY = Math.max(me._thumbnail_scroller_phone.ggScrollPosY, 0);
			me._thumbnail_scroller_phone.ggScrollPosY = Math.min(me._thumbnail_scroller_phone.ggScrollPosY, me._thumbnail_scroller_phone__vertScrollBg.offsetHeight - me._thumbnail_scroller_phone__vertScrollFg.offsetHeight);
			me._thumbnail_scroller_phone__vertScrollFg.style.top = me._thumbnail_scroller_phone.ggScrollPosY + 'px';
			let percentScrolled = me._thumbnail_scroller_phone.ggScrollPosY / (me._thumbnail_scroller_phone__vertScrollBg.offsetHeight - me._thumbnail_scroller_phone__vertScrollFg.offsetHeight);
			me._thumbnail_scroller_phone__content.style.top = -(Math.round((me._thumbnail_scroller_phone.ggContentHeight * (1.0 - me._thumbnail_scroller_phone.ggVPercentVisible)) * percentScrolled)) + me._thumbnail_scroller_phone.ggContentTopOffset + 'px';
			me._thumbnail_scroller_phone.ggScrollPosYPercent = (me._thumbnail_scroller_phone__vertScrollFg.offsetTop / me._thumbnail_scroller_phone__vertScrollBg.offsetHeight);
		}
		me._thumbnail_scroller_phone.ggScrollByYSmooth = function(diffY) {
			if(!me._thumbnail_scroller_phone.ggVertScrollVisible || diffY == 0 || me._thumbnail_scroller_phone.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._thumbnail_scroller_phone.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._thumbnail_scroller_phone.ggScrollPosY >= me._thumbnail_scroller_phone__vertScrollBg.offsetHeight - me._thumbnail_scroller_phone__vertScrollFg.offsetHeight)) {
					me._thumbnail_scroller_phone.ggScrollPosY = Math.min(me._thumbnail_scroller_phone.ggScrollPosY, me._thumbnail_scroller_phone__vertScrollBg.offsetHeight - me._thumbnail_scroller_phone__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._thumbnail_scroller_phone.ggScrollPosY <= 0)) {
					me._thumbnail_scroller_phone.ggScrollPosY = Math.max(me._thumbnail_scroller_phone.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._thumbnail_scroller_phone__vertScrollFg.style.top = me._thumbnail_scroller_phone.ggScrollPosY + 'px';
			let percentScrolled = me._thumbnail_scroller_phone.ggScrollPosY / (me._thumbnail_scroller_phone__vertScrollBg.offsetHeight - me._thumbnail_scroller_phone__vertScrollFg.offsetHeight);
			me._thumbnail_scroller_phone__content.style.top = -(Math.round((me._thumbnail_scroller_phone.ggContentHeight * (1.0 - me._thumbnail_scroller_phone.ggVPercentVisible)) * percentScrolled)) + me._thumbnail_scroller_phone.ggContentTopOffset + 'px';
			me._thumbnail_scroller_phone.ggScrollPosYPercent = (me._thumbnail_scroller_phone__vertScrollFg.offsetTop / me._thumbnail_scroller_phone__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._thumbnail_scroller_phone.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._thumbnail_scroller_phone.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._thumbnail_scroller_phone.ggHPercentVisible);
					me._thumbnail_scroller_phone.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._thumbnail_scroller_phone.clientWidth - (me._thumbnail_scroller_phone.ggVertScrollVisible ? 8 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._thumbnail_scroller_phone.clientWidth - (me._thumbnail_scroller_phone.ggVertScrollVisible ? 8 : 0))) * me._thumbnail_scroller_phone.ggHPercentVisible);
					me._thumbnail_scroller_phone.ggScrollByXSmooth(diffX);
				}
			}
			if (me._thumbnail_scroller_phone.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._thumbnail_scroller_phone.ggVPercentVisible);
					me._thumbnail_scroller_phone.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._thumbnail_scroller_phone.clientHeight - (me._thumbnail_scroller_phone.ggHorScrollVisible ? 8 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._thumbnail_scroller_phone.clientHeight - (me._thumbnail_scroller_phone.ggHorScrollVisible ? 8 : 0))) * me._thumbnail_scroller_phone.ggVPercentVisible);
					me._thumbnail_scroller_phone.ggScrollByYSmooth(diffY);
				}
			}
		}
		me._thumbnail_scroller_phone__content.mousetouchend = e => {
			let inertiaInterval = setInterval(function() {
				me._thumbnail_scroller_phone.ggDragInertiaX *= 0.96;
				me._thumbnail_scroller_phone.ggDragInertiaY *= 0.96;
				me._thumbnail_scroller_phone.ggScrollByX(me._thumbnail_scroller_phone.ggDragInertiaX);
				me._thumbnail_scroller_phone.ggScrollByY(me._thumbnail_scroller_phone.ggDragInertiaY);
				if (Math.abs(me._thumbnail_scroller_phone.ggDragInertiaX) < 1.0 && Math.abs(me._thumbnail_scroller_phone.ggDragInertiaY) < 1.0) {
					clearInterval(inertiaInterval);
				}
				}, 10);
			me._thumbnail_scroller_phone.ggInInteraction = false;
			setTimeout(function() { me._thumbnail_scroller_phone.ggIsDragging = false; }, 100);
		}
		me._thumbnail_scroller_phone__content.mousetouchmove = e => {
			if (!me._thumbnail_scroller_phone.ggInInteraction) return;
			e = e || window.event;
			if (e.buttons==0) {
				me._thumbnail_scroller_phone__content.mousetouchend();
				return;
			}
			e.preventDefault();
			var t = e.touches;
			var eventX = t ? t[0].clientX : e.clientX;
			var eventY = t ? t[0].clientY : e.clientY;
			if (Math.abs(eventX - me._thumbnail_scroller_phone.ggDragStartX) > 10 || Math.abs(eventY - me._thumbnail_scroller_phone.ggDragStartY) > 10) me._thumbnail_scroller_phone.ggIsDragging = true;
			var diffX = (eventX - me._thumbnail_scroller_phone.ggDragLastX) * me._thumbnail_scroller_phone.ggHPercentVisible;
			var diffY = (eventY - me._thumbnail_scroller_phone.ggDragLastY) * me._thumbnail_scroller_phone.ggVPercentVisible;
			me._thumbnail_scroller_phone.ggDragInertiaX = -diffX;
			me._thumbnail_scroller_phone.ggDragInertiaY = -diffY;
			me._thumbnail_scroller_phone.ggDragLastX = eventX;
			me._thumbnail_scroller_phone.ggDragLastY = eventY;
			me._thumbnail_scroller_phone.ggScrollByX(-diffX);
			me._thumbnail_scroller_phone.ggScrollByY(-diffY);
		}
		me._thumbnail_scroller_phone__content.mousetouchstart = e => {
			e = e || window.event;
			var t = e.touches;
			me._thumbnail_scroller_phone.ggDragLastX = me._thumbnail_scroller_phone.ggDragStartX = t ? t[0].clientX : e.clientX;
			me._thumbnail_scroller_phone.ggDragLastY = me._thumbnail_scroller_phone.ggDragStartY = t ? t[0].clientY : e.clientY;
			me._thumbnail_scroller_phone.ggInInteraction = true;
		}
		els.onmousedown = me._thumbnail_scroller_phone__content.mousetouchstart;
		els.ontouchstart = me._thumbnail_scroller_phone__content.mousetouchstart;
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = me._thumbnail_scroller_phone__content.mousetouchstart;
		}
		document.addEventListener('mouseup', me._thumbnail_scroller_phone.contentMouseupListener = function() { me._thumbnail_scroller_phone__content.mousetouchend(); });
		document.addEventListener('touchend', me._thumbnail_scroller_phone.contentTouchendListener = function() { me._thumbnail_scroller_phone__content.mousetouchend(); });
		document.addEventListener('mousemove', me._thumbnail_scroller_phone.contentMousemoveListener = function() { me._thumbnail_scroller_phone__content.mousetouchmove(); });
		document.addEventListener('touchmove', me._thumbnail_scroller_phone.contentTouchmoveListener = function() { me._thumbnail_scroller_phone__content.mousetouchmove(); });
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			document.addEventListener('pointerup', me._thumbnail_scroller_phone.pointerupListener = function() { me._thumbnail_scroller_phone__content.mousetouchend(); });
			document.addEventListener('pointermove', me._thumbnail_scroller_phone.pointermoveListener = function() { me._thumbnail_scroller_phone__content.mousetouchmove(); });
		}
		elVertScrollBg = me._thumbnail_scroller_phone__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 8px; height: 717px; background-color: rgba(128,128,128,1); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._thumbnail_scroller_phone__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 8px; height: 717px; background-color: rgba(192,192,192,1); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._thumbnail_scroller_phone.ggScrollPosY = 0;
		me._thumbnail_scroller_phone.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._thumbnail_scroller_phone.ggDragLastY = e.clientY;
			document.addEventListener('mouseup', me._thumbnail_scroller_phone.vertMouseupListener = function() {
				let inertiaInterval = setInterval(function() {
					me._thumbnail_scroller_phone.ggDragInertiaY *= 0.96;
					me._thumbnail_scroller_phone.ggScrollByY(me._thumbnail_scroller_phone.ggDragInertiaY);
					if (Math.abs(me._thumbnail_scroller_phone.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 10);
				document.removeEventListener('mouseup', me._thumbnail_scroller_phone.vertMouseupListener);
				document.removeEventListener('mousemove', me._thumbnail_scroller_phone.vertMousemoveListener);
			});
			document.addEventListener('mousemove', me._thumbnail_scroller_phone.vertMousemoveListener = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._thumbnail_scroller_phone.ggDragLastY;
				me._thumbnail_scroller_phone.ggDragInertiaY = diffY;
				me._thumbnail_scroller_phone.ggDragLastY = e.clientY;
				me._thumbnail_scroller_phone.ggScrollByY(diffY);
			});
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._thumbnail_scroller_phone.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._thumbnail_scroller_phone.vertTouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._thumbnail_scroller_phone.ggDragInertiaY *= 0.96;
					me._thumbnail_scroller_phone.ggScrollByY(me._thumbnail_scroller_phone.ggDragInertiaY);
					if (Math.abs(me._thumbnail_scroller_phone.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 10);
				document.removeEventListener('touchend', me._thumbnail_scroller_phone.vertTouchendListener);
				document.removeEventListener('touchmove', me._thumbnail_scroller_phone.vertTouchmoveListener);
				document.removeEventListener('pointerup', me._thumbnail_scroller_phone.vertPointerupListener);
				document.removeEventListener('pointermove', me._thumbnail_scroller_phone.vertPointermoveListener);
			}
			document.addEventListener('touchend', me._thumbnail_scroller_phone.vertTouchendListener = function() { me._thumbnail_scroller_phone.vertTouchend(); });
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.addEventListener('pointerup', me._thumbnail_scroller_phone.vertPointerupListener = function() { me._thumbnail_scroller_phone.vertTouchend(); });
			}
			me._thumbnail_scroller_phone.vertTouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffY = (t ? t[0].clientY : e.clientY) - me._thumbnail_scroller_phone.ggDragLastY;
				me._thumbnail_scroller_phone.ggDragInertiaY = diffY;
				me._thumbnail_scroller_phone.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._thumbnail_scroller_phone.ggScrollByY(diffY);
			}
			document.addEventListener('touchmove', me._thumbnail_scroller_phone.vertTouchmoveListener = function(e) { me._thumbnail_scroller_phone.vertTouchmove(e); });
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.addEventListener('pointermove', me._thumbnail_scroller_phone.vertPointermoveListener = function(e) { me._thumbnail_scroller_phone.vertTouchmove(e); });
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elVertScrollFg.onpointerdown = elVertScrollFg.ontouchstart;
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._thumbnail_scroller_phone.ggScrollHeight;
			if (e.offsetY < me._thumbnail_scroller_phone.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._thumbnail_scroller_phone.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._thumbnail_scroller_phone__vertScrollBg.getBoundingClientRect();
			var diffY = me._thumbnail_scroller_phone.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._thumbnail_scroller_phone.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._thumbnail_scroller_phone.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._thumbnail_scroller_phone.ggScrollByYSmooth(30 * me._thumbnail_scroller_phone.ggVPercentVisible * wheelDelta);
		});
		elCornerBg = me._thumbnail_scroller_phone__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 8px; height: 8px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="thumbnail_scroller_phone";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		el.userData=el;
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='height : calc(100% - 50px);';
		hs+='left : 20px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : inherit;';
		hs+='width : calc(100% - 40px);';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._thumbnail_scroller_phone.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._thumbnail_scroller_phone.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none' && (e.offsetWidth != 0 || e.offsetHeight != 0)) {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none' && e.style['overflow']!='hidden') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				var contentWidth = maxX - minX;
				this.ggContent.style.width = contentWidth + 'px';
				var contentHeight = maxY - minY;
				this.ggContent.style.height = contentHeight + 'px';
			var scaleX = this.getBoundingClientRect().width / this.offsetWidth;
				this.ggContentWidth = contentWidth / scaleX;
			var scaleY = this.getBoundingClientRect().height / this.offsetHeight;
				this.ggContentHeight = contentHeight / scaleY;
				var containerWidth = offsetWidthWithScale;
				if (this.ggVertScrollVisible) containerWidth -= 8;
				if (contentWidth < containerWidth) {
					this.ggContent.style.left = '50%';
					this.ggContent.style.marginLeft = ((contentWidth/-2) - (this.ggVertScrollVisible ? (8/2) : 0)) + 'px';
				}
				else {
					this.ggContent.style.left = this.ggContentLeftOffset + 'px';
					this.ggContent.style.marginLeft = '0px';
				}
				this.ggContent.style.top = -(Math.round(me._thumbnail_scroller_phone.ggScrollPosY / me._thumbnail_scroller_phone.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				if ((me._thumbnail_scroller_phone.ggHorScrollVisible && contentHeight > this.clientHeight - 8) || (!me._thumbnail_scroller_phone.ggHorScrollVisible && contentHeight > this.clientHeight)) {
					me._thumbnail_scroller_phone__vertScrollBg.style.visibility = 'inherit';
					me._thumbnail_scroller_phone__vertScrollFg.style.visibility = 'inherit';
					me._thumbnail_scroller_phone.ggVertScrollVisible = true;
				} else {
					me._thumbnail_scroller_phone__vertScrollBg.style.visibility = 'hidden';
					me._thumbnail_scroller_phone__vertScrollFg.style.visibility = 'hidden';
					me._thumbnail_scroller_phone.ggVertScrollVisible = false;
				}
				if(me._thumbnail_scroller_phone.ggVertScrollVisible) {
					me._thumbnail_scroller_phone.ggAvailableWidth = me._thumbnail_scroller_phone.clientWidth - 8;
					if (me._thumbnail_scroller_phone.ggHorScrollVisible) {
						me._thumbnail_scroller_phone.ggAvailableHeight = me._thumbnail_scroller_phone.clientHeight - 8;
						me._thumbnail_scroller_phone.ggAvailableHeightWithScale = me._thumbnail_scroller_phone.getBoundingClientRect().height - me._thumbnail_scroller_phone__vertScrollBg.getBoundingClientRect().width;
						me._thumbnail_scroller_phone__cornerBg.style.visibility = 'inherit';
					} else {
						me._thumbnail_scroller_phone.ggAvailableHeight = me._thumbnail_scroller_phone.clientHeight;
						me._thumbnail_scroller_phone.ggAvailableHeightWithScale = me._thumbnail_scroller_phone.getBoundingClientRect().height;
						me._thumbnail_scroller_phone__cornerBg.style.visibility = 'hidden';
					}
					me._thumbnail_scroller_phone__vertScrollBg.style.height = me._thumbnail_scroller_phone.ggAvailableHeight + 'px';
					me._thumbnail_scroller_phone.ggVPercentVisible = contentHeight != 0 ? me._thumbnail_scroller_phone.ggAvailableHeightWithScale / contentHeight : 0.0;
					if (me._thumbnail_scroller_phone.ggVPercentVisible > 1.0) me._thumbnail_scroller_phone.ggVPercentVisible = 1.0;
					me._thumbnail_scroller_phone.ggScrollHeight =  Math.round(me._thumbnail_scroller_phone__vertScrollBg.offsetHeight * me._thumbnail_scroller_phone.ggVPercentVisible);
					me._thumbnail_scroller_phone__vertScrollFg.style.height = me._thumbnail_scroller_phone.ggScrollHeight + 'px';
					me._thumbnail_scroller_phone.ggScrollPosY = me._thumbnail_scroller_phone.ggScrollPosYPercent * me._thumbnail_scroller_phone.ggAvailableHeight;
					me._thumbnail_scroller_phone.ggScrollPosY = Math.min(me._thumbnail_scroller_phone.ggScrollPosY, me._thumbnail_scroller_phone__vertScrollBg.offsetHeight - me._thumbnail_scroller_phone__vertScrollFg.offsetHeight);
					me._thumbnail_scroller_phone__vertScrollFg.style.top = me._thumbnail_scroller_phone.ggScrollPosY + 'px';
					if (me._thumbnail_scroller_phone.ggVPercentVisible < 1.0) {
						let percentScrolled = me._thumbnail_scroller_phone.ggScrollPosY / (me._thumbnail_scroller_phone__vertScrollBg.offsetHeight - me._thumbnail_scroller_phone__vertScrollFg.offsetHeight);
						me._thumbnail_scroller_phone__content.style.top = -(Math.round((me._thumbnail_scroller_phone.ggContentHeight * (1.0 - me._thumbnail_scroller_phone.ggVPercentVisible)) * percentScrolled)) + me._thumbnail_scroller_phone.ggContentTopOffset + 'px';
					}
				} else {
					me._thumbnail_scroller_phone.ggAvailableWidth = me._thumbnail_scroller_phone.clientWidth;
					me._thumbnail_scroller_phone.ggScrollPosY = 0;
					me._thumbnail_scroller_phone.ggScrollPosYPercent = 0.0;
					me._thumbnail_scroller_phone__content.style.top = this.ggContentTopOffset + 'px';
					me._thumbnail_scroller_phone__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._thumbnail_scroller_phone.ggHorScrollVisible || vertScrollWasVisible != me._thumbnail_scroller_phone.ggVertScrollVisible) {
					skin.updateSize(me._thumbnail_scroller_phone);
					me._thumbnail_scroller_phone.ggUpdatePosition();
				}
			}
		}
		el=me._node_cloner_phone=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._node_cloner_phone;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		el.ggNumRepeat = 100;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggCloneOffset = 0;
		el.ggCloneOffsetChanged = false;
		el.ggWidth = 166;
		el.ggHeight = 100;
		el.ggSizeChanged = false;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggFilterHsSkinId = '';
		el.ggInstances = [];
		el.ggNumFilterPassed = 0;
		el.getFilteredNodes = function(tourNodes, filter) {
			var filteredNodes = [];
			for (var i = 0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (!nodeData['tags'] || nodeData['tags'].indexOf(filter[j].trim()) == -1) passed = false;
					}
				}
				if (passed) {
					filteredNodes.push(nodeId);
				}
			}
			return filteredNodes;
		}
		el.ggUpdate = function(filter) {
			if(me._node_cloner_phone.ggUpdating == true) return;
			me._node_cloner_phone.ggUpdating = true;
			var el=me._node_cloner_phone;
			var curNumCols = 0;
			var parentWidth = me._node_cloner_phone.parentNode.classList.contains('ggskin_subelement') ? (me._node_cloner_phone.parentNode.parentNode.classList.contains('ggskin_scrollarea') ? me._node_cloner_phone.parentNode.parentNode.ggAvailableWidth : me._node_cloner_phone.parentNode.parentNode.clientWidth) : me._node_cloner_phone.parentNode.clientWidth;
			if (parentWidth == 0) parentWidth = me._node_cloner_phone.parentNode.parentNode.clientWidth;
			curNumCols = Math.floor(((parentWidth - me._node_cloner_phone.offsetLeft) * me._node_cloner_phone.ggNumRepeat / 100.0) / me._node_cloner_phone.offsetWidth);
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && !el.ggSizeChanged && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._node_cloner_phone.ggUpdating = false;
				return;
			} else {
				el.ggSizeChanged = false;
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			var centerOffsetHor = 0;
			var centerOffsetVert = 0;
				me._node_cloner_phone.ggCloneOffsetChanged = false;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			if (tourNodes.length == 0) {
				me._node_cloner_phone.ggUpdating = false;
				return;
			}
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			var keepCloning = true;
			tourNodes = me._node_cloner_phone.getFilteredNodes(tourNodes, filter);
			me._node_cloner_phone.ggNumFilterPassed = tourNodes.length;
			for (var i = 0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var nodeData = player.getNodeUserdata(nodeId);
				if (!keepCloning || i < me._node_cloner_phone.ggCloneOffset) continue;
				var parameter={};
				parameter.top = centerOffsetVert + (row * me._node_cloner_phone.ggHeight) + 'px';
				parameter.left = centerOffsetHor + (column * me._node_cloner_phone.ggWidth) + 'px';
				parameter.width=me._node_cloner_phone.ggWidth + 'px';
				parameter.height=me._node_cloner_phone.ggHeight + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_node_cloner_phone_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
			}
			me._node_cloner_phone.ggNodeCount = me._node_cloner_phone.ggNumFilterPassed;
			me._node_cloner_phone.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._node_cloner_phone.parentNode && me._node_cloner_phone.parentNode.classList.contains('ggskin_subelement') && me._node_cloner_phone.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._node_cloner_phone.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggId="node_cloner_phone";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		el.userData=el;
		hs ='';
		hs+='height : 100px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 166px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._node_cloner_phone.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._node_cloner_phone.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._node_cloner_phone.childNodes.length; i++) {
				var child=me._node_cloner_phone.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._node_cloner_phone.ggUpdatePosition=function (useTransition) {
			me._node_cloner_phone.ggUpdate();
		}
		me._thumbnail_scroller_phone__content.appendChild(me._node_cloner_phone);
		me._screentint_phone.appendChild(me._thumbnail_scroller_phone);
		me.divSkin.appendChild(me._screentint_phone);
		el=me._thumbnail_menu_code=document.createElement('div');
		el.ggPermeable=false;
		el.ggId="thumbnail_menu_code";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_code ";
		el.ggType='code';
		el.userData=el;
		hs ='';
		hs+='height : 20px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._thumbnail_menu_code.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._thumbnail_menu_code.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._thumbnail_menu_code);
		me.elementMouseOver['thumbnails_toggle']=false;
		me._thumbnails_toggle.logicBlock_visible();
		me._thumbnails_toggle.logicBlock_backgroundcolor();
		me._thumbnail_menu.logicBlock_alpha();
		me._screentint_phone.logicBlock_alpha();
		me.elementMouseOver['close_popup_phone']=false;
		me.elementMouseOver['btn_close_popup_phone']=false;
		me._btn_close_popup_phone.logicBlock_visible();
		el = me._thumbnail_menu_code;
		;
		player.addListener('activehotspotchanged', function(event) {
			if (hotspotTemplates.hasOwnProperty('SkinHotspotClass_ht_node')) {
				for(var i = 0; i < hotspotTemplates['SkinHotspotClass_ht_node'].length; i++) {
					hotspotTemplates['SkinHotspotClass_ht_node'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('SkinHotspotClass_ht_node__3d')) {
				for(var i = 0; i < hotspotTemplates['SkinHotspotClass_ht_node__3d'].length; i++) {
					hotspotTemplates['SkinHotspotClass_ht_node__3d'][i].ggEvent_activehotspotchanged();
				}
			}
		});
		player.addListener('changenode', function(event) {
			for(var i = 0; i < me._node_cloner_phone.ggInstances.length; i++) {
				me._node_cloner_phone.ggInstances[i].ggEvent_changenode(event);
			}
			for(var i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
				me._thumbnail_cloner.ggInstances[i].ggEvent_changenode(event);
			}
			if (hotspotTemplates.hasOwnProperty('SkinHotspotClass_ht_node')) {
				for(var i = 0; i < hotspotTemplates['SkinHotspotClass_ht_node'].length; i++) {
					hotspotTemplates['SkinHotspotClass_ht_node'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('SkinHotspotClass_ht_node__3d')) {
				for(var i = 0; i < hotspotTemplates['SkinHotspotClass_ht_node__3d'].length; i++) {
					hotspotTemplates['SkinHotspotClass_ht_node__3d'][i].ggEvent_changenode();
				}
			}
			me._thumbnails_toggle.logicBlock_visible();
			me._thumbnail_menu.logicBlock_alpha();
			me._thumbnail_cloner.ggUpdateConditionNodeChange();
			me._screentint_phone.logicBlock_alpha();
			me._node_cloner_phone.ggUpdateConditionNodeChange();
		});
		player.addListener('changevisitednodes', function(event) {
			for(var i = 0; i < me._node_cloner_phone.ggInstances.length; i++) {
				me._node_cloner_phone.ggInstances[i].ggEvent_changevisitednodes(event);
			}
			for(var i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
				me._thumbnail_cloner.ggInstances[i].ggEvent_changevisitednodes(event);
			}
			if (hotspotTemplates.hasOwnProperty('SkinHotspotClass_ht_node')) {
				for(var i = 0; i < hotspotTemplates['SkinHotspotClass_ht_node'].length; i++) {
					hotspotTemplates['SkinHotspotClass_ht_node'][i].ggEvent_changevisitednodes();
				}
			}
			if (hotspotTemplates.hasOwnProperty('SkinHotspotClass_ht_node__3d')) {
				for(var i = 0; i < hotspotTemplates['SkinHotspotClass_ht_node__3d'].length; i++) {
					hotspotTemplates['SkinHotspotClass_ht_node__3d'][i].ggEvent_changevisitednodes();
				}
			}
		});
		player.addListener('configloaded', function(event) {
			if (hotspotTemplates.hasOwnProperty('SkinHotspotClass_ht_node')) {
				for(var i = 0; i < hotspotTemplates['SkinHotspotClass_ht_node'].length; i++) {
					hotspotTemplates['SkinHotspotClass_ht_node'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('SkinHotspotClass_ht_node__3d')) {
				for(var i = 0; i < hotspotTemplates['SkinHotspotClass_ht_node__3d'].length; i++) {
					hotspotTemplates['SkinHotspotClass_ht_node__3d'][i].ggEvent_configloaded();
				}
			}
			me._thumbnails_toggle.logicBlock_visible();
			me._thumbnail_menu.ggUpdatePosition();
			me._thumbnail_menu.logicBlock_alpha();
			me._screentint_phone.logicBlock_alpha();
			me._thumbnail_scroller_phone.ggUpdatePosition();
		});
		player.addListener('sizechanged', function(event) {
			me._variable_resp_phone.logicBlock();
		});
		player.addListener('varchanged_opt_3d_preview', function(event) {
			if (hotspotTemplates.hasOwnProperty('SkinHotspotClass_ht_node')) {
				for(var i = 0; i < hotspotTemplates['SkinHotspotClass_ht_node'].length; i++) {
					hotspotTemplates['SkinHotspotClass_ht_node'][i].ggEvent_varchanged_opt_3d_preview();
				}
			}
			if (hotspotTemplates.hasOwnProperty('SkinHotspotClass_ht_node__3d')) {
				for(var i = 0; i < hotspotTemplates['SkinHotspotClass_ht_node__3d'].length; i++) {
					hotspotTemplates['SkinHotspotClass_ht_node__3d'][i].ggEvent_varchanged_opt_3d_preview();
				}
			}
		});
		player.addListener('varchanged_vis_thumbnails', function(event) {
			me._thumbnail_menu.logicBlock_alpha();
		});
		player.addListener('varchanged_vis_thumbnails_phone', function(event) {
			me._thumbnails_toggle.logicBlock_visible();
			me._screentint_phone.logicBlock_alpha();
		});
		player.addListener('viewerinit', function(event) {
			me._thumbnail_cloner.ggUpdate();
			me._node_cloner_phone.ggUpdate();
		});
	};
	function SkinCloner_node_cloner_phone_Class(nodeId, parentScope, ggParent, parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.ggUserdata.nodeid=me.ggNodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
			me.__div=document.createElement('div');
			me.__div.setAttribute('style','visibility: inherit; overflow: visible;');
			me.__div.style.position='absolute';
			me.__div.style.left=parameter.left;
			me.__div.style.top=parameter.top;
			me.__div.style.width='';
			me.__div.style.height='';
			me.__div.style.width=parameter.width;
			me.__div.style.height=parameter.height;
			me.__div.ggIsActive = function() {
				return player.getCurrentNode()==me.ggNodeId;
			}
			me.__div.ggElementNodeId=function() {
				return me.ggNodeId;
			}
		el=me._thumbnail_image_phone=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._thumbnail_image_phone;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		els=me._thumbnail_image_phone__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		if (nodeId) els.setAttribute('src',basePath + "images/thumbnail_image_phone_" + nodeId + ".png");
		el.ggNodeId=nodeId;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="thumbnail_image_phone";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		el.userData=el;
		hs ='';
		hs+='height : 83px;';
		hs+='left : 8px;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._thumbnail_image_phone.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._thumbnail_image_phone.onclick=function (e) {
			if (me._thumbnail_image_phone.isDragging()) return;
			player.openNext("{"+me.ggNodeId+"}","");
			player.setVariableValue('vis_thumbnails_phone', false);
		}
		me._thumbnail_image_phone.onmouseenter=function (e) {
			me.elementMouseOver['thumbnail_image_phone']=true;
			me._thumbnail_border_phone.logicBlock_alpha();
		}
		me._thumbnail_image_phone.onmouseleave=function (e) {
			me.elementMouseOver['thumbnail_image_phone']=false;
			me._thumbnail_border_phone.logicBlock_alpha();
		}
		me._thumbnail_image_phone.ggUpdatePosition=function (useTransition) {
		}
		el=me._thumbnail_title_phone=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._thumbnail_title_phone;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		els=me._thumbnail_title_phone__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="thumbnail_title_phone";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text hepta_slab shadow";
		el.ggType='text';
		el.userData=el;
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs='';
		hs+='box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='max-height: 100%;';
		hs+='font-size: 18px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='position: absolute;';
		hs+='top: 50%;';
		hs+='transform: translate(0, -50%);';
		hs+='white-space: pre-line;';
		hs+='padding: 0px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		me._thumbnail_title_phone.ggUpdateText=function() {
			var params = [];
			params.push(String(player._(me.ggUserdata.title)));
			var hs = player._("%1", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._thumbnail_title_phone.ggUpdateText();
		player.addListener('changenode', function() {
			me._thumbnail_title_phone.ggUpdateText();
		});
		el.appendChild(els);
		me._thumbnail_title_phone.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me._thumbnail_image_phone.ggNodeId;
		}
		me._thumbnail_title_phone.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail_image_phone.appendChild(me._thumbnail_title_phone);
		el=me._thumbnail_border_phone=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._thumbnail_border_phone;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		el.ggId="thumbnail_border_phone";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		el.userData=el;
		hs ='';
		hs+='z-index: 10;';
		hs+='background : rgba(0,0,0,0);';
		hs+='border : 2px solid #c2e812;';
		hs+='cursor : pointer;';
		hs+='height : 100%;';
		hs+='left : -2px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -2px;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._thumbnail_border_phone.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me._thumbnail_image_phone.ggNodeId;
		}
		me._thumbnail_border_phone.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['thumbnail_image_phone'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_border_phone.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_border_phone.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_border_phone.style.transition='opacity 100ms ease 0ms';
				if (me._thumbnail_border_phone.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_border_phone.style.visibility=me._thumbnail_border_phone.ggVisible?'inherit':'hidden';
					me._thumbnail_border_phone.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._thumbnail_border_phone.style.opacity == 0.0) { me._thumbnail_border_phone.style.visibility="hidden"; } }, 105);
					me._thumbnail_border_phone.style.opacity=0;
				}
			}
		}
		me._thumbnail_border_phone.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail_image_phone.appendChild(me._thumbnail_border_phone);
		el=me._thumbnail_visited_phone=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._thumbnail_visited_phone;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		els=me._thumbnail_visited_phone__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIGJhc2VQcm9maWxlPSJ0aW55IiBpZD0iTGF5ZXJfMSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMzYgMzYiIHg9IjBweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeT0iMHB4Ij4KIDxwb2x5bGluZSBmaWxsPS'+
			'Jub25lIiBwb2ludHM9IjMwLDkgJiN4YTsmI3g5OzEzLjUsMjUuNSA2LDE4ICIgc3Ryb2tlPSIjYzJlODEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjEuMjUiLz4KPC9zdmc+Cg==';
		me._thumbnail_visited_phone__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="thumbnail_visited_phone";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg glow";
		el.ggType='svg';
		el.userData=el;
		hs ='';
		hs+='height : 28px;';
		hs+='position : absolute;';
		hs+='right : 4px;';
		hs+='top : 4px;';
		hs+='visibility : hidden;';
		hs+='width : 28px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._thumbnail_visited_phone.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me._thumbnail_image_phone.ggNodeId;
		}
		me._thumbnail_visited_phone.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._thumbnail_visited_phone.ggElementNodeId()) == true)) || 
				((me._thumbnail_visited_phone.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._thumbnail_visited_phone.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._thumbnail_visited_phone.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._thumbnail_visited_phone.style.transition='';
				if (me._thumbnail_visited_phone.ggCurrentLogicStateVisible == 0) {
					me._thumbnail_visited_phone.style.visibility=(Number(me._thumbnail_visited_phone.style.opacity)>0||!me._thumbnail_visited_phone.style.opacity)?'inherit':'hidden';
					me._thumbnail_visited_phone.ggVisible=true;
				}
				else {
					me._thumbnail_visited_phone.style.visibility="hidden";
					me._thumbnail_visited_phone.ggVisible=false;
				}
			}
		}
		me._thumbnail_visited_phone.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail_image_phone.appendChild(me._thumbnail_visited_phone);
		me.__div.appendChild(me._thumbnail_image_phone);
		me.elementMouseOver['thumbnail_image_phone']=false;
		me._thumbnail_border_phone.logicBlock_alpha();
		me._thumbnail_visited_phone.logicBlock_visible();
			me.ggEvent_changenode=function(event) {
				me._thumbnail_visited_phone.logicBlock_visible();
				me._thumbnail_visited_phone.logicBlock_visible();
			};
			me.ggEvent_changevisitednodes=function(event) {
				me._thumbnail_visited_phone.logicBlock_visible();
			};
	};
	function SkinCloner_thumbnail_cloner_Class(nodeId, parentScope, ggParent, parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.ggUserdata.nodeid=me.ggNodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
			me.__div=document.createElement('div');
			me.__div.setAttribute('style','visibility: inherit; overflow: visible;');
			me.__div.style.position='absolute';
			me.__div.style.left=parameter.left;
			me.__div.style.top=parameter.top;
			me.__div.style.width='';
			me.__div.style.height='';
			me.__div.style.width=parameter.width;
			me.__div.style.height=parameter.height;
			me.__div.ggIsActive = function() {
				return player.getCurrentNode()==me.ggNodeId;
			}
			me.__div.ggElementNodeId=function() {
				return me.ggNodeId;
			}
		el=me._thumbnail_image=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._thumbnail_image;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		els=me._thumbnail_image__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		if (nodeId) els.setAttribute('src',basePath + "images/thumbnail_image_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="thumbnail_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		el.userData=el;
		hs ='';
		hs+='height : 100px;';
		hs+='left : 2px;';
		hs+='position : absolute;';
		hs+='top : 2px;';
		hs+='visibility : inherit;';
		hs+='width : 180px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._thumbnail_image.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._thumbnail_image.ggUpdatePosition=function (useTransition) {
		}
		me.__div.appendChild(me._thumbnail_image);
		el=me._thumbnail_tint=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._thumbnail_tint;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		el.ggId="thumbnail_tint";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		el.userData=el;
		hs ='';
		hs+='background : rgba(0,0,0,0);';
		hs+='border : 2px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 100px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 180px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._thumbnail_tint.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._thumbnail_tint.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((me.elementMouseOver['thumbnail_tint'] == true))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._thumbnail_tint.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._thumbnail_tint.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				me._thumbnail_tint.style.transition='background-color 100ms ease 0ms';
				if (me._thumbnail_tint.ggCurrentLogicStateBackgroundColor == 0) {
					me._thumbnail_tint.style.backgroundColor="rgba(0,0,0,0.313726)";
				}
				else {
					me._thumbnail_tint.style.backgroundColor="rgba(0,0,0,0)";
				}
			}
		}
		me._thumbnail_tint.onclick=function (e) {
			if (me._thumbnail_tint.isDragging()) return;
			player.openNext("{"+me.ggNodeId+"}","");
		}
		me._thumbnail_tint.onmouseenter=function (e) {
			me.elementMouseOver['thumbnail_tint']=true;
			me._thumbnail_title.logicBlock_alpha();
			me._thumbnail_border.logicBlock_alpha();
			me._thumbnail_tint.logicBlock_backgroundcolor();
		}
		me._thumbnail_tint.onmouseleave=function (e) {
			me.elementMouseOver['thumbnail_tint']=false;
			me._thumbnail_title.logicBlock_alpha();
			me._thumbnail_border.logicBlock_alpha();
			me._thumbnail_tint.logicBlock_backgroundcolor();
		}
		me._thumbnail_tint.ggUpdatePosition=function (useTransition) {
		}
		el=me._thumbnail_title=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._thumbnail_title;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		els=me._thumbnail_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="thumbnail_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text hepta_slab";
		el.ggType='text';
		el.userData=el;
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : default;';
		hs+='height : 100px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 180px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs='';
		hs+='box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='max-height: 100%;';
		hs+='font-size: 18px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='position: absolute;';
		hs+='top: 50%;';
		hs+='transform: translate(0, -50%);';
		hs+='white-space: pre-line;';
		hs+='padding: 0px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		me._thumbnail_title.ggUpdateText=function() {
			var params = [];
			params.push(String(player._(me.ggUserdata.title)));
			var hs = player._("%1", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._thumbnail_title.ggUpdateText();
		player.addListener('changenode', function() {
			me._thumbnail_title.ggUpdateText();
		});
		el.appendChild(els);
		me._thumbnail_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._thumbnail_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['thumbnail_tint'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_title.style.transition='opacity 200ms ease 0ms';
				if (me._thumbnail_title.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_title.style.visibility=me._thumbnail_title.ggVisible?'inherit':'hidden';
					me._thumbnail_title.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._thumbnail_title.style.opacity == 0.0) { me._thumbnail_title.style.visibility="hidden"; } }, 205);
					me._thumbnail_title.style.opacity=0;
				}
			}
		}
		me._thumbnail_title.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail_tint.appendChild(me._thumbnail_title);
		el=me._thumbnail_border=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._thumbnail_border;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		el.ggId="thumbnail_border";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		el.userData=el;
		hs ='';
		hs+='z-index: 10;';
		hs+='background : rgba(0,0,0,0);';
		hs+='border : 2px solid #c2e812;';
		hs+='cursor : pointer;';
		hs+='height : 100px;';
		hs+='left : -2px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -2px;';
		hs+='visibility : hidden;';
		hs+='width : 180px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._thumbnail_border.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._thumbnail_border.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['thumbnail_tint'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_border.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_border.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_border.style.transition='opacity 100ms ease 0ms';
				if (me._thumbnail_border.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_border.style.visibility=me._thumbnail_border.ggVisible?'inherit':'hidden';
					me._thumbnail_border.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._thumbnail_border.style.opacity == 0.0) { me._thumbnail_border.style.visibility="hidden"; } }, 105);
					me._thumbnail_border.style.opacity=0;
				}
			}
		}
		me._thumbnail_border.onclick=function (e) {
			if (me._thumbnail_border.isDragging()) return;
			player.openNext("{"+me.ggNodeId+"}","");
		}
		me._thumbnail_border.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail_tint.appendChild(me._thumbnail_border);
		me.__div.appendChild(me._thumbnail_tint);
		el=me._thumbnail_visited=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._thumbnail_visited;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		els=me._thumbnail_visited__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIGJhc2VQcm9maWxlPSJ0aW55IiBpZD0iTGF5ZXJfMSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMzYgMzYiIHg9IjBweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeT0iMHB4Ij4KIDxwb2x5bGluZSBmaWxsPS'+
			'Jub25lIiBwb2ludHM9IjMwLDkgJiN4YTsmI3g5OzEzLjUsMjUuNSA2LDE4ICIgc3Ryb2tlPSIjYzJlODEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjEuMjUiLz4KPC9zdmc+Cg==';
		me._thumbnail_visited__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="thumbnail_visited";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg glow";
		el.ggType='svg';
		el.userData=el;
		hs ='';
		hs+='height : 30px;';
		hs+='position : absolute;';
		hs+='right : 8px;';
		hs+='top : 6px;';
		hs+='visibility : hidden;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._thumbnail_visited.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._thumbnail_visited.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._thumbnail_visited.ggElementNodeId()) == true)) || 
				((me._thumbnail_visited.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._thumbnail_visited.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._thumbnail_visited.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._thumbnail_visited.style.transition='';
				if (me._thumbnail_visited.ggCurrentLogicStateVisible == 0) {
					me._thumbnail_visited.style.visibility=(Number(me._thumbnail_visited.style.opacity)>0||!me._thumbnail_visited.style.opacity)?'inherit':'hidden';
					me._thumbnail_visited.ggVisible=true;
				}
				else {
					me._thumbnail_visited.style.visibility="hidden";
					me._thumbnail_visited.ggVisible=false;
				}
			}
		}
		me._thumbnail_visited.ggUpdatePosition=function (useTransition) {
		}
		me.__div.appendChild(me._thumbnail_visited);
		me.elementMouseOver['thumbnail_tint']=false;
		me._thumbnail_tint.logicBlock_backgroundcolor();
		me._thumbnail_title.logicBlock_alpha();
		me._thumbnail_border.logicBlock_alpha();
		me._thumbnail_visited.logicBlock_visible();
			me.ggEvent_changenode=function(event) {
				me._thumbnail_visited.logicBlock_visible();
				me._thumbnail_visited.logicBlock_visible();
			};
			me.ggEvent_changevisitednodes=function(event) {
				me._thumbnail_visited.logicBlock_visible();
			};
	};
	function SkinHotspotClass_ht_node__3d(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.ggNodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {
			me._ht_node.visible = (v>0 && me._ht_node.userData.visible);
		}
		el.userData.width = 0;
		el.userData.height = 0;
		el.name = 'ht_node';
		el.userData.x = -2.49;
		el.userData.y = 0.2;
		el.translateZ(0.000);
		el.userData.zIndex = -10000;
		el.userData.zIndexCurrent = -10000;
		el.userData.z = 0.000;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.mouseOverTouchMode = 'clicky';
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.renderOrder = 0;
		el.userData.renderOrder = 0;
		el.userData.isVisible = function() {
			let vis = me._ht_node.visible
			let parentEl = me._ht_node.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node.userData.opacity = v;
			v = v * me._ht_node.userData.parentOpacity;
			if (me._ht_node.userData.setOpacityInternal) me._ht_node.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node.children.length; i++) {
				let child = me._ht_node.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node.userData.parentOpacity = v;
			v = v * me._ht_node.userData.opacity
			if (me._ht_node.userData.setOpacityInternal) me._ht_node.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node.children.length; i++) {
				let child = me._ht_node.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.permeable = false;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node = el;
		el.userData.ggId="ht_node";
		me._ht_node.userData.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_node.userData.onclick=function (e) {
			player.openNext(player._(me.hotspot.url),player._(me.hotspot.target));
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.hasOwnClickAction = true;
		me._ht_node.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node']=true;
			me._chevron_white_lower.logicBlock_alpha();
			me._chevron_black.logicBlock_alpha();
			me._chevron_white.logicBlock_alpha();
			me._hs_preview_image.logicBlock_alpha();
			me._tt_ht_3d.logicBlock_visible();
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_node']=false;
			me._chevron_white_lower.logicBlock_alpha();
			me._chevron_black.logicBlock_alpha();
			me._chevron_white.logicBlock_alpha();
			me._hs_preview_image.logicBlock_alpha();
			me._tt_ht_3d.logicBlock_visible();
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
			player.setActiveHotspot(null);
		}
		me._ht_node.userData.ggUpdatePosition=function (useTransition) {
		}
		el = new THREE.Mesh();
		el.translateX(0);
		el.translateY(1);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 80;
		el.userData.height = 80;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.userData.borderRadius = {};
		el.userData.borderRadiusInnerShape = {};
		el.userData.borderRadius.topLeft = el.userData.borderRadiusInnerShape.topLeft = 0;
		el.userData.borderRadius.topRight = el.userData.borderRadiusInnerShape.topRight = 0;
		el.userData.borderRadius.bottomRight = el.userData.borderRadiusInnerShape.bottomRight = 0;
		el.userData.borderRadius.bottomLeft = el.userData.borderRadiusInnerShape.bottomLeft = 0;
		el.name = 'chevron_white_lower';
		el.userData.x = 0;
		el.userData.y = 1;
		el.translateZ(0.030);
		el.userData.zIndex = -10000;
		el.userData.zIndexCurrent = -10000;
		el.userData.z = 0.030;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.mouseOverTouchMode = 'clicky';
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.renderOrder = 1;
		el.userData.renderOrder = 1;
		el.userData.isVisible = function() {
			let vis = me._chevron_white_lower.visible
			let parentEl = me._chevron_white_lower.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._chevron_white_lower.userData.opacity = v;
			v = v * me._chevron_white_lower.userData.parentOpacity;
			if (me._chevron_white_lower.userData.setOpacityInternal) me._chevron_white_lower.userData.setOpacityInternal(v);
			for (let i = 0; i < me._chevron_white_lower.children.length; i++) {
				let child = me._chevron_white_lower.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._chevron_white_lower.userData.parentOpacity = v;
			v = v * me._chevron_white_lower.userData.opacity
			if (me._chevron_white_lower.userData.setOpacityInternal) me._chevron_white_lower.userData.setOpacityInternal(v);
			for (let i = 0; i < me._chevron_white_lower.children.length; i++) {
				let child = me._chevron_white_lower.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.permeable = false;
		el.userData.visible = true;
		el.userData.opacity = 0.60;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._chevron_white_lower = el;
		el.userData.setOpacityInternal = function(v) {
			if (me._chevron_white_lower.userData.materialNormal) me._chevron_white_lower.userData.materialNormal.opacity = v;
			if (me._chevron_white_lower.userData.materialOver) me._chevron_white_lower.userData.materialOver.opacity = v;
			if (me._chevron_white_lower.userData.materialActive) me._chevron_white_lower.userData.materialActive.opacity = v;
			me._chevron_white_lower.visible = (v>0 && me._chevron_white_lower.userData.visible);
		}
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAHuUlEQVR4nO3d26tcZx3G8edN0yTmrkna5mAqeCgKpYgIXig2udArra1N0xOCva/9E8S7gpWA2vMpbU7NAZWapooWFBSpYJI2TdLWHIo0Ju29WKIhXy/etbJnb/fKnr33zPq9a83zgUDIzfq97/qy3mQyM1syM5tUKXqArgCSpM9I+rqkWyStlLRCeQ8/lvRvSccl/UnS6ZQSQaNanwCfAB4C3md4/wAeBlZGz28dBmwFPpxHeDN9BNwbvQ7rGGAp8JNFhDfTNuDa6HVZBwArgFdHGF/tN8CK6PVZwYDlwKExxFf7rSO0WbUQX81PQpuuxfgcoU1XxTeOv/PN5TVHOOGq+A4GxFc75AgnVAHx1Q4By6P3w1pEju/XweENcoSTAlhGWfHVXsUR9hs5vl'+
	'eCQ7uagzjCfqL8+GoTFeGS6AHaACyTtF/S7dGzDOFbkg5MSoS9fz9gFd8+SXdEzzJPByVtSSn9J3qQcep1gB2Or9b7CHt7BJPf/rRX3Y1Pkr6tfBwvix5kXHoZYBXfPkl3Rs8yArdL2t/XCHt3BPcsvkGvSNrat+O4V0/AgWO3b/FJ0nck7evbk7A3AVbxvSzpu9GzjNEdkvb2KcJeHMED8d0VPUtLfiXpnpTSf6MHWazOPwGr+PZocuKT8l8x9tGDDzp1OsDqBuyWtCV6lgB3Kh/HnY6ws0fwQHx3R88S7JeS7u3qcdzJAIGlysfupMdX+4Wk+7oYYeeO4Co+P/mmu0vSni4ex50KsIpvl6St0bMUaIuk3V2LsDNH8EB890TPUrgDkh7oynHciQCr+HZK8hf9DOeApPtTSpeiB5lL8UdwFd8OlRnf4epXae5WPo6X'+
	'Rg8yl6KfgAPx3Rc9yywOS/pG9fvXJX0pcJYm+5WP4+KfhMUhf0Xa7vF/BGNB/gZcNzDrdcDh4Jma7KUDT8KiANdQbnyHGYhvYOZVwJHg2Zq8jCMcDuXHt+oqszvCLiPHtyv4RjU5wlXiG1hDyRHuwRHOjhzfzuAb1GSo+AbWUnKEnfjXcavoUXwDa1oFHA2evYkjrJHj2xF8Q5ocZQHxDaxtNWVHeM0o72XnkON7KfhGNDkKrB7BGlcDbwavpckuJjVCJiC+gbU6wpKQ43sxeOObvMkI4xtY8xrKjXAnkxIhOb7tsfvdaCzxDax9DfBW8Bqb7KDvEVJ+fGta2ANHGAFYArwQvMFN3qKF+Ab2ouQIX6JvEeL4ZtuTNcCx4LU3eZG+REiO7/ngDW1yjID4BvbmesqNcDtdjxDHN8weOcJxIMf3XOz+NToGXB+9RzVyhG'+
	'8H70mTF4Di3zk/DTm+Z4M3rklR8dVwhKNB2fG9TYHx1YAbcIQLR47vmeCNalJ0fDVyhMeD96rJ85QaITm+p4M3qMlx4IboPRoWZUf4HKVFiOMbOXKEJ4L3rkk5EZLjeyp4Q5p0Mr4aZUf4LNERkuN7Mngjmpygw/HVgBspN8JniIoQx9caHOH/bUgCngheeJMTwI2tbkgLyBGeDN7bJk/TVoQ4vjCUHeFTjDtCyo7vJD2OrwasBd4J3usm44uQHN/jwQtschJYO5aFF4iyI3ySUUdIju+x4IU1eYcJiq9G2RE+AYzmm9fI8f08eEFNJjK+GrCOPkeI4yseOcJ3g+9Fk4VHSI7vZ8ELaPIusG7E97KzKDvCx5lvhOT4fho8eBPHNwtyhO8F35smjzGfCIFHoidu4PiugrIj/PGwi7g/etIG7+H45gSsp9wIvzdz3jRj'+
	'+C9IOiJpRVsbNqS/S9qUUroQPUgXAOsl/UHSzdGzzHBR0pdTSsfrP5j5guEjKjO+zY5veCml85I2SzoVPcsMy5Ubu+LKExD4iqQ32p5oDnV856MH6aLqSfhHSZ8LHmWmr6aU/iJNfwI+GDRMk1NyfItS8JPwSmtJyi+7SPpA0oaoiWao4/tn9CB9AGxQfhJ+NniU2gVJn0wpXa6fgDfL8fVWtZebJJ0OHqW2TtLnpakjeGPcLNOcluMbi2pPN6ucCDdKUwGW8H+qp5VfanF8Y5JSOqcc4ZnoWVQ1VwcY/RE7P/laUkW4SfERJmkqvI8CBzmjHN+5wBkmSiERXpCmAoy6+WeUj13H17KB4/hs0AjnpKmXYZZIOi+pzc9U1E++D1q8ps0AbFR+iebTLV72Q0kbrrwMk1K6LOlQiwOcleMrQnUPNqndJ+Ghqrlp//jY3t'+
	'LFzyofu46vENW9aPM4nr014LUxvx3nTPXItwIBNwFnx9xA80kL3ApcHNOFzwI3tbiftgCMN8KLwK1zDfDgGC7s+DoE+BTjifD7ww7w6AgvegrH1znkCE+NsINH53PxBPwAuLTIi77OIn7ersUi/9Dt3y+ygUvAQyzk45nAbSzsZ1j8C/gRcO0Y9sVaBCwFfljd0/k6Bty22AGWkD+o9AZweY4Lnge2MQFfEjRpyN/Wuq26x3P5K/AAQ/yQm3k9Fslf+vhN5VfN10paqfyq9gVJf5Z0tH6B0fqJ/L9mX5T0NUnrlTv4WLmB9yX9LqUU+d4CMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMz64z/AXXeOH6IH9doAAAA'+
	'AElFTkSuQmCC');
		texture.colorSpace = player.getTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'chevron_white_lower_material';
		el.userData.materialNormal = material;
		el.userData.materialCurrent = material;
		el.userData.createGeometry = function(brTopLeft, brTopRight, brBottomRight, brBottomLeft) {
			let el = me._chevron_white_lower;
			skin.disposeGeometryAndMaterial(el);
			skin.removeChildren(el, 'subElement');
			let minDim = Math.min(el.userData.width, el.userData.height) / 2;
			el.userData.borderRadiusInnerShape.topLeft = Math.min(brTopLeft, minDim);
			el.userData.borderRadiusInnerShape.topRight = Math.min(brTopRight, minDim);
			el.userData.borderRadiusInnerShape.bottomRight = Math.min(brBottomRight, minDim);
			el.userData.borderRadiusInnerShape.bottomLeft = Math.min(brBottomLeft, minDim);
		geometry = new THREE.PlaneGeometry(me._chevron_white_lower.userData.width / 100.0, me._chevron_white_lower.userData.height / 100.0, 5, 5 );
		geometry.name = 'chevron_white_lower_geometry';
		el.geometry = geometry;
		el.material = el.userData.materialCurrent;
		}
		el.userData.createGeometry(0, 0, 0, 0);
		el.userData.ggId="chevron_white_lower";
		me._chevron_white_lower.userData.ggIsActive=function() {
			if ((this.parent) && (this.parent.ggIsActive)) {
				return this.parent.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._chevron_white_lower.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._chevron_white_lower.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._chevron_white_lower.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._chevron_white_lower.ggCurrentLogicStateVisible == 0) {
			me._chevron_white_lower.visible=false;
			player.repaint();
			me._chevron_white_lower.userData.visible=false;
				}
				else {
			me._chevron_white_lower.visible=((!me._chevron_white_lower.material && Number(me._chevron_white_lower.userData.opacity>0)) || (me._chevron_white_lower.material && Number(me._chevron_white_lower.material.opacity)>0))?true:false;
			player.repaint();
			me._chevron_white_lower.userData.visible=true;
				}
			}
		}
		me._chevron_white_lower.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_node'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._chevron_white_lower.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._chevron_white_lower.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._chevron_white_lower.ggCurrentLogicStateAlpha == 0) {
					me._chevron_white_lower.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._chevron_white_lower.userData.transitions.length; i++) {
						if (me._chevron_white_lower.userData.transitions[i].property == 'alpha') {
							clearInterval(me._chevron_white_lower.userData.transitions[i].interval);
							me._chevron_white_lower.userData.transitions.splice(i, 1);
							break;
						}
					}
					{
						let transition_alpha = {};
						transition_alpha.property = 'alpha';
						transition_alpha.startTime = Date.now();
						transition_alpha.startAlpha = me._chevron_white_lower.material ? me._chevron_white_lower.material.opacity : me._chevron_white_lower.userData.opacity;
						transition_alpha.interval = setInterval(() => {
							let currentTime = Date.now() - 0;
							let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
							percentDone = Math.max(percentDone, 0.0);
							percentDone = Math.min(percentDone, 1.0);
							let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
							me._chevron_white_lower.userData.setOpacity(transition_alpha.startAlpha + (me._chevron_white_lower.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
							player.repaint();
							if (percentDone >= 1.0) {
								clearInterval(transition_alpha.interval);
								me._chevron_white_lower.userData.transitions.splice(me._chevron_white_lower.userData.transitions.indexOf(transition_alpha), 1);
							}
						}, 20);
						me._chevron_white_lower.userData.transitions.push(transition_alpha);
					}
				}
				else {
					me._chevron_white_lower.userData.transitionValue_alpha = 0.6;
					for (var i = 0; i < me._chevron_white_lower.userData.transitions.length; i++) {
						if (me._chevron_white_lower.userData.transitions[i].property == 'alpha') {
							clearInterval(me._chevron_white_lower.userData.transitions[i].interval);
							me._chevron_white_lower.userData.transitions.splice(i, 1);
							break;
						}
					}
					{
						let transition_alpha = {};
						transition_alpha.property = 'alpha';
						transition_alpha.startTime = Date.now();
						transition_alpha.startAlpha = me._chevron_white_lower.material ? me._chevron_white_lower.material.opacity : me._chevron_white_lower.userData.opacity;
						transition_alpha.interval = setInterval(() => {
							let currentTime = Date.now() - 0;
							let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
							percentDone = Math.max(percentDone, 0.0);
							percentDone = Math.min(percentDone, 1.0);
							let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
							me._chevron_white_lower.userData.setOpacity(transition_alpha.startAlpha + (me._chevron_white_lower.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
							player.repaint();
							if (percentDone >= 1.0) {
								clearInterval(transition_alpha.interval);
								me._chevron_white_lower.userData.transitions.splice(me._chevron_white_lower.userData.transitions.indexOf(transition_alpha), 1);
							}
						}, 20);
						me._chevron_white_lower.userData.transitions.push(transition_alpha);
					}
				}
			}
		}
		me._chevron_white_lower.userData.onmouseenter=function (e) {
			player.setOverrideCursor('pointer');
			me.elementMouseOver['chevron_white_lower']=true;
		}
		me._chevron_white_lower.userData.onmouseleave=function (e) {
			player.setOverrideCursor('default');
			me.elementMouseOver['chevron_white_lower']=false;
		}
		me._chevron_white_lower.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node.add(me._chevron_white_lower);
		el = new THREE.Mesh();
		el.translateX(0);
		el.translateY(1);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 80;
		el.userData.height = 80;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.userData.borderRadius = {};
		el.userData.borderRadiusInnerShape = {};
		el.userData.borderRadius.topLeft = el.userData.borderRadiusInnerShape.topLeft = 0;
		el.userData.borderRadius.topRight = el.userData.borderRadiusInnerShape.topRight = 0;
		el.userData.borderRadius.bottomRight = el.userData.borderRadiusInnerShape.bottomRight = 0;
		el.userData.borderRadius.bottomLeft = el.userData.borderRadiusInnerShape.bottomLeft = 0;
		el.name = 'chevron_black';
		el.userData.x = 0;
		el.userData.y = 1;
		el.translateZ(0.060);
		el.userData.zIndex = -10000;
		el.userData.zIndexCurrent = -10000;
		el.userData.z = 0.060;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.mouseOverTouchMode = 'clicky';
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.renderOrder = 2;
		el.userData.renderOrder = 2;
		el.userData.isVisible = function() {
			let vis = me._chevron_black.visible
			let parentEl = me._chevron_black.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._chevron_black.userData.opacity = v;
			v = v * me._chevron_black.userData.parentOpacity;
			if (me._chevron_black.userData.setOpacityInternal) me._chevron_black.userData.setOpacityInternal(v);
			for (let i = 0; i < me._chevron_black.children.length; i++) {
				let child = me._chevron_black.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._chevron_black.userData.parentOpacity = v;
			v = v * me._chevron_black.userData.opacity
			if (me._chevron_black.userData.setOpacityInternal) me._chevron_black.userData.setOpacityInternal(v);
			for (let i = 0; i < me._chevron_black.children.length; i++) {
				let child = me._chevron_black.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.permeable = false;
		el.userData.visible = true;
		el.userData.opacity = 0.40;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._chevron_black = el;
		el.userData.setOpacityInternal = function(v) {
			if (me._chevron_black.userData.materialNormal) me._chevron_black.userData.materialNormal.opacity = v;
			if (me._chevron_black.userData.materialOver) me._chevron_black.userData.materialOver.opacity = v;
			if (me._chevron_black.userData.materialActive) me._chevron_black.userData.materialActive.opacity = v;
			me._chevron_black.visible = (v>0 && me._chevron_black.userData.visible);
		}
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAGKklEQVR4nO3d2Y9ecxyA8ed9Z8OdLtNNSbgQ2og7CWK58SeIEAn3+BPEnURFYmvpYmtrqa1UEdxxQUJLVRedViRd9F5UE8HFmaNjet6Zdzvn9z3nfT7J96K96PktTyfTvvPOgCSNqlbqBdRIC7gGuA1YD1wGXDL7++eAP4CDwJfADPBPmmWqaS4FHgJ+IYuqm/kVeIQsUqlvdwO/0X148+cscE/lq1btjQNP0n948+cpYKLSHai2LgE+Ynjx5fPJ7J8tdTQF7GX48eXzKUaoDsqOz4+E6qiq+IxQF5minM/5FpuPMcKRNwXsofr48tmLEY6s1PHNjXCq5L0qmCngQ9LHZ4QjaJJY8eXzEUbYeJPAB6SPrdPswQgbK3p8Rthgk8Bu0sfV7XyIETbGJP'+
	'A+6aPqJ8LJEs5DFaprfEbYABPAe6SPaND5ACOsnabEl89ujLA2mhafEdbIBPAu6WMpa97HCMOaAN4hfSRlz3sYYTijEt/cCH2PSRATwNukj8IIR9AEsIv0MaSadzHCZEY9PiNMaBzjmzvvYISVGQfeIv2lR5u3McLSjQNvkv6yo84ujLA0xmeEyYwDb5D+cusyu2bPTEMwDrxO+kstmm9nJ/U6iuYtjHBg0eO7fHa+C7AeIxyycWAn6S9xofhykSN8EyPs2Rhx4/uO/8eXWwLsC7C+onkDI+xa9PiWLLB2I6y5MWAH6S+raPaxcHy5yBG+jhF2NAZsJ/0lDRJfLnKEOzHCizQpvtwSYH+A9RvhIsaA10h/KUWzn/7iyy0ldoRjA+ytEcaAV0l/GZ3iWzqEPS4Fvg+wn6LZwQhHOArx5YwwmDHgFdIfftF8z3Djyy0j'+
	'boTbGaEIx4CXSX/oVcaXWwb8EGCfRfMaIxBh9PiWlbf1/xhhIm3gJdIfctH8QDXx5SJH+CoNjND4LrYMONDHequYV2hQhG1gG+kPtWgOkCa+3HLiRvgyDYjQ+BZnhCVpA1tJf4id4lte3tZ7thz4kfTnUjQvkd1lrbSBLaQ/vDrElzPCIYkc34/EjC83jREOpA1sJv1h1TG+3DRwkPTnVTTbCBxhG3iR9IdUNAfJLrYuIke4lYARGt/wTQM/kf78wkfYBl4g/aE0Kb5c5Ai3ECDCNrCJ9IdRND9R7/hyK4gb4WYSRmh81THCeVrAxgEXXmZ8K8rbejIrgEOkP9+ieZEKIzS+dCJH+AIVRBg5vkM0O77cSuAw6c+78ghbwPMBNtkpvpVlbTygyBFuooQIW8BzATZXNIcZrfhykSPcSNbMULSAZwNsyvgutoqGR2h88a'+
	'0CjpD+PoYeYQt4JsAmiuYI2cErEznC5+kjwhbwdIDFG1/3VgFHSX8/RfMcPUb4eIBFG1/vIkf4RLebuDfAYovmKMbXjdXEjfD+xRZ/HXAuwEKNbzBRI/wTWL/QwncHWGRRfKsXWrQKrQZ+Jv39zZ89nRZ8U4DFGd9wRY3w5qLFRvui0p8xvmFYQ7wIt8xfZAs4GWBhc+Nb0/0ZaxFrgGOkv9d8TjPv9eJrAyzK+MoVLcLr4UKFa0vadK9mgDuBU6kX0kCnyM52JvVCZq2FCwFGeE11BrgD4yvTSbIIj6deCLPN5QGmfneTH/mqc5LsL3rqCFtwIbyzCRdynCy+kwnXMGoiRHhm7i/WkeYT0RngitK2qMWsJYswxd2vm7uQNvBbxQuYIc4/fkZZigjPUPBpX5XfSPI4xhdJ1RFuLVrErRU93PhiupLqIryl0yI+LvnB'+
	'xhfblcAJym1g70ILuAE4X9KDT8xuULGVGeF5ssYW9GAJDza+ermKciJ8oNsFbBjiQ49hfHV0FcN97XhDLw9vAQ8Dfw340C8Y7OftKq0lwOcM1sBfwEP0+fbM2+nvZ1j8DjwGTPTzUIUyDjxKdqe9dnCArKGBtMneqPQ18PciDzwNPMVofJOgUTNNdrenWTy8b4D76OKH3PT6YXEauAu4muyrGS4jewXlDPAV2Q96/rvHP1P10gZuJPt/49VkHZwja+AX4DPSfm2BJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSpNr4F6S5nAwRIX8MAAAAAElFTkSuQmCC');
		texture.colorSpace = player.getTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'chevron_black_material';
		el.userData.materialNormal = material;
		el.userData.materialCurrent = material;
		el.userData.createGeometry = function(brTopLeft, brTopRight, brBottomRight, brBottomLeft) {
			let el = me._chevron_black;
			skin.disposeGeometryAndMaterial(el);
			skin.removeChildren(el, 'subElement');
			let minDim = Math.min(el.userData.width, el.userData.height) / 2;
			el.userData.borderRadiusInnerShape.topLeft = Math.min(brTopLeft, minDim);
			el.userData.borderRadiusInnerShape.topRight = Math.min(brTopRight, minDim);
			el.userData.borderRadiusInnerShape.bottomRight = Math.min(brBottomRight, minDim);
			el.userData.borderRadiusInnerShape.bottomLeft = Math.min(brBottomLeft, minDim);
		geometry = new THREE.PlaneGeometry(me._chevron_black.userData.width / 100.0, me._chevron_black.userData.height / 100.0, 5, 5 );
		geometry.name = 'chevron_black_geometry';
		el.geometry = geometry;
		el.material = el.userData.materialCurrent;
		}
		el.userData.createGeometry(0, 0, 0, 0);
		el.userData.ggId="chevron_black";
		me._chevron_black.userData.ggIsActive=function() {
			if ((this.parent) && (this.parent.ggIsActive)) {
				return this.parent.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._chevron_black.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._chevron_black.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._chevron_black.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._chevron_black.ggCurrentLogicStateVisible == 0) {
			me._chevron_black.visible=false;
			player.repaint();
			me._chevron_black.userData.visible=false;
				}
				else {
			me._chevron_black.visible=((!me._chevron_black.material && Number(me._chevron_black.userData.opacity>0)) || (me._chevron_black.material && Number(me._chevron_black.material.opacity)>0))?true:false;
			player.repaint();
			me._chevron_black.userData.visible=true;
				}
			}
		}
		me._chevron_black.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_node'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._chevron_black.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._chevron_black.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._chevron_black.ggCurrentLogicStateAlpha == 0) {
					me._chevron_black.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._chevron_black.userData.transitions.length; i++) {
						if (me._chevron_black.userData.transitions[i].property == 'alpha') {
							clearInterval(me._chevron_black.userData.transitions[i].interval);
							me._chevron_black.userData.transitions.splice(i, 1);
							break;
						}
					}
					{
						let transition_alpha = {};
						transition_alpha.property = 'alpha';
						transition_alpha.startTime = Date.now();
						transition_alpha.startAlpha = me._chevron_black.material ? me._chevron_black.material.opacity : me._chevron_black.userData.opacity;
						transition_alpha.interval = setInterval(() => {
							let currentTime = Date.now() - 0;
							let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
							percentDone = Math.max(percentDone, 0.0);
							percentDone = Math.min(percentDone, 1.0);
							let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
							me._chevron_black.userData.setOpacity(transition_alpha.startAlpha + (me._chevron_black.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
							player.repaint();
							if (percentDone >= 1.0) {
								clearInterval(transition_alpha.interval);
								me._chevron_black.userData.transitions.splice(me._chevron_black.userData.transitions.indexOf(transition_alpha), 1);
							}
						}, 20);
						me._chevron_black.userData.transitions.push(transition_alpha);
					}
				}
				else {
					me._chevron_black.userData.transitionValue_alpha = 0.4;
					for (var i = 0; i < me._chevron_black.userData.transitions.length; i++) {
						if (me._chevron_black.userData.transitions[i].property == 'alpha') {
							clearInterval(me._chevron_black.userData.transitions[i].interval);
							me._chevron_black.userData.transitions.splice(i, 1);
							break;
						}
					}
					{
						let transition_alpha = {};
						transition_alpha.property = 'alpha';
						transition_alpha.startTime = Date.now();
						transition_alpha.startAlpha = me._chevron_black.material ? me._chevron_black.material.opacity : me._chevron_black.userData.opacity;
						transition_alpha.interval = setInterval(() => {
							let currentTime = Date.now() - 0;
							let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
							percentDone = Math.max(percentDone, 0.0);
							percentDone = Math.min(percentDone, 1.0);
							let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
							me._chevron_black.userData.setOpacity(transition_alpha.startAlpha + (me._chevron_black.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
							player.repaint();
							if (percentDone >= 1.0) {
								clearInterval(transition_alpha.interval);
								me._chevron_black.userData.transitions.splice(me._chevron_black.userData.transitions.indexOf(transition_alpha), 1);
							}
						}, 20);
						me._chevron_black.userData.transitions.push(transition_alpha);
					}
				}
			}
		}
		me._chevron_black.userData.onmouseenter=function (e) {
			player.setOverrideCursor('pointer');
			me.elementMouseOver['chevron_black']=true;
		}
		me._chevron_black.userData.onmouseleave=function (e) {
			player.setOverrideCursor('default');
			me.elementMouseOver['chevron_black']=false;
		}
		me._chevron_black.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node.add(me._chevron_black);
		el = new THREE.Mesh();
		el.translateX(0);
		el.translateY(1);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 80;
		el.userData.height = 80;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.userData.borderRadius = {};
		el.userData.borderRadiusInnerShape = {};
		el.userData.borderRadius.topLeft = el.userData.borderRadiusInnerShape.topLeft = 0;
		el.userData.borderRadius.topRight = el.userData.borderRadiusInnerShape.topRight = 0;
		el.userData.borderRadius.bottomRight = el.userData.borderRadiusInnerShape.bottomRight = 0;
		el.userData.borderRadius.bottomLeft = el.userData.borderRadiusInnerShape.bottomLeft = 0;
		el.name = 'chevron_white';
		el.userData.x = 0;
		el.userData.y = 1;
		el.translateZ(0.090);
		el.userData.zIndex = -10000;
		el.userData.zIndexCurrent = -10000;
		el.userData.z = 0.090;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.mouseOverTouchMode = 'clicky';
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.renderOrder = 3;
		el.userData.renderOrder = 3;
		el.userData.isVisible = function() {
			let vis = me._chevron_white.visible
			let parentEl = me._chevron_white.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._chevron_white.userData.opacity = v;
			v = v * me._chevron_white.userData.parentOpacity;
			if (me._chevron_white.userData.setOpacityInternal) me._chevron_white.userData.setOpacityInternal(v);
			for (let i = 0; i < me._chevron_white.children.length; i++) {
				let child = me._chevron_white.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._chevron_white.userData.parentOpacity = v;
			v = v * me._chevron_white.userData.opacity
			if (me._chevron_white.userData.setOpacityInternal) me._chevron_white.userData.setOpacityInternal(v);
			for (let i = 0; i < me._chevron_white.children.length; i++) {
				let child = me._chevron_white.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.permeable = false;
		el.userData.visible = true;
		el.userData.opacity = 0.60;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._chevron_white = el;
		el.userData.setOpacityInternal = function(v) {
			if (me._chevron_white.userData.materialNormal) me._chevron_white.userData.materialNormal.opacity = v;
			if (me._chevron_white.userData.materialOver) me._chevron_white.userData.materialOver.opacity = v;
			if (me._chevron_white.userData.materialActive) me._chevron_white.userData.materialActive.opacity = v;
			me._chevron_white.visible = (v>0 && me._chevron_white.userData.visible);
		}
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAHuUlEQVR4nO3d26tcZx3G8edN0yTmrkna5mAqeCgKpYgIXig2udArra1N0xOCva/9E8S7gpWA2vMpbU7NAZWapooWFBSpYJI2TdLWHIo0Ju29WKIhXy/etbJnb/fKnr33zPq9a83zgUDIzfq97/qy3mQyM1syM5tUKXqArgCSpM9I+rqkWyStlLRCeQ8/lvRvSccl/UnS6ZQSQaNanwCfAB4C3md4/wAeBlZGz28dBmwFPpxHeDN9BNwbvQ7rGGAp8JNFhDfTNuDa6HVZBwArgFdHGF/tN8CK6PVZwYDlwKExxFf7rSO0WbUQX81PQpuuxfgcoU1XxTeOv/PN5TVHOOGq+A4GxFc75AgnVAHx1Q4By6P3w1pEju/XweENcoSTAlhGWfHVXsUR9hs5vl'+
	'eCQ7uagzjCfqL8+GoTFeGS6AHaACyTtF/S7dGzDOFbkg5MSoS9fz9gFd8+SXdEzzJPByVtSSn9J3qQcep1gB2Or9b7CHt7BJPf/rRX3Y1Pkr6tfBwvix5kXHoZYBXfPkl3Rs8yArdL2t/XCHt3BPcsvkGvSNrat+O4V0/AgWO3b/FJ0nck7evbk7A3AVbxvSzpu9GzjNEdkvb2KcJeHMED8d0VPUtLfiXpnpTSf6MHWazOPwGr+PZocuKT8l8x9tGDDzp1OsDqBuyWtCV6lgB3Kh/HnY6ws0fwQHx3R88S7JeS7u3qcdzJAIGlysfupMdX+4Wk+7oYYeeO4Co+P/mmu0vSni4ex50KsIpvl6St0bMUaIuk3V2LsDNH8EB890TPUrgDkh7oynHciQCr+HZK8hf9DOeApPtTSpeiB5lL8UdwFd8OlRnf4epXae5WPo6X'+
	'Rg8yl6KfgAPx3Rc9yywOS/pG9fvXJX0pcJYm+5WP4+KfhMUhf0Xa7vF/BGNB/gZcNzDrdcDh4Jma7KUDT8KiANdQbnyHGYhvYOZVwJHg2Zq8jCMcDuXHt+oqszvCLiPHtyv4RjU5wlXiG1hDyRHuwRHOjhzfzuAb1GSo+AbWUnKEnfjXcavoUXwDa1oFHA2evYkjrJHj2xF8Q5ocZQHxDaxtNWVHeM0o72XnkON7KfhGNDkKrB7BGlcDbwavpckuJjVCJiC+gbU6wpKQ43sxeOObvMkI4xtY8xrKjXAnkxIhOb7tsfvdaCzxDax9DfBW8Bqb7KDvEVJ+fGta2ANHGAFYArwQvMFN3qKF+Ab2ouQIX6JvEeL4ZtuTNcCx4LU3eZG+REiO7/ngDW1yjID4BvbmesqNcDtdjxDHN8weOcJxIMf3XOz+NToGXB+9RzVyhG'+
	'8H70mTF4Di3zk/DTm+Z4M3rklR8dVwhKNB2fG9TYHx1YAbcIQLR47vmeCNalJ0fDVyhMeD96rJ85QaITm+p4M3qMlx4IboPRoWZUf4HKVFiOMbOXKEJ4L3rkk5EZLjeyp4Q5p0Mr4aZUf4LNERkuN7Mngjmpygw/HVgBspN8JniIoQx9caHOH/bUgCngheeJMTwI2tbkgLyBGeDN7bJk/TVoQ4vjCUHeFTjDtCyo7vJD2OrwasBd4J3usm44uQHN/jwQtschJYO5aFF4iyI3ySUUdIju+x4IU1eYcJiq9G2RE+AYzmm9fI8f08eEFNJjK+GrCOPkeI4yseOcJ3g+9Fk4VHSI7vZ8ELaPIusG7E97KzKDvCx5lvhOT4fho8eBPHNwtyhO8F35smjzGfCIFHoidu4PiugrIj/PGwi7g/etIG7+H45gSsp9wIvzdz3jRj'+
	'+C9IOiJpRVsbNqS/S9qUUroQPUgXAOsl/UHSzdGzzHBR0pdTSsfrP5j5guEjKjO+zY5veCml85I2SzoVPcsMy5Ubu+LKExD4iqQ32p5oDnV856MH6aLqSfhHSZ8LHmWmr6aU/iJNfwI+GDRMk1NyfItS8JPwSmtJyi+7SPpA0oaoiWao4/tn9CB9AGxQfhJ+NniU2gVJn0wpXa6fgDfL8fVWtZebJJ0OHqW2TtLnpakjeGPcLNOcluMbi2pPN6ucCDdKUwGW8H+qp5VfanF8Y5JSOqcc4ZnoWVQ1VwcY/RE7P/laUkW4SfERJmkqvI8CBzmjHN+5wBkmSiERXpCmAoy6+WeUj13H17KB4/hs0AjnpKmXYZZIOi+pzc9U1E++D1q8ps0AbFR+iebTLV72Q0kbrrwMk1K6LOlQiwOcleMrQnUPNqndJ+Ghqrlp//jY3t'+
	'LFzyofu46vENW9aPM4nr014LUxvx3nTPXItwIBNwFnx9xA80kL3ApcHNOFzwI3tbiftgCMN8KLwK1zDfDgGC7s+DoE+BTjifD7ww7w6AgvegrH1znkCE+NsINH53PxBPwAuLTIi77OIn7ersUi/9Dt3y+ygUvAQyzk45nAbSzsZ1j8C/gRcO0Y9sVaBCwFfljd0/k6Bty22AGWkD+o9AZweY4Lnge2MQFfEjRpyN/Wuq26x3P5K/AAQ/yQm3k9Fslf+vhN5VfN10paqfyq9gVJf5Z0tH6B0fqJ/L9mX5T0NUnrlTv4WLmB9yX9LqUU+d4CMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMz64z/AXXeOH6IH9doAAAA'+
	'AElFTkSuQmCC');
		texture.colorSpace = player.getTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'chevron_white_material';
		el.userData.materialNormal = material;
		el.userData.materialCurrent = material;
		el.userData.createGeometry = function(brTopLeft, brTopRight, brBottomRight, brBottomLeft) {
			let el = me._chevron_white;
			skin.disposeGeometryAndMaterial(el);
			skin.removeChildren(el, 'subElement');
			let minDim = Math.min(el.userData.width, el.userData.height) / 2;
			el.userData.borderRadiusInnerShape.topLeft = Math.min(brTopLeft, minDim);
			el.userData.borderRadiusInnerShape.topRight = Math.min(brTopRight, minDim);
			el.userData.borderRadiusInnerShape.bottomRight = Math.min(brBottomRight, minDim);
			el.userData.borderRadiusInnerShape.bottomLeft = Math.min(brBottomLeft, minDim);
		geometry = new THREE.PlaneGeometry(me._chevron_white.userData.width / 100.0, me._chevron_white.userData.height / 100.0, 5, 5 );
		geometry.name = 'chevron_white_geometry';
		el.geometry = geometry;
		el.material = el.userData.materialCurrent;
		}
		el.userData.createGeometry(0, 0, 0, 0);
		el.userData.ggId="chevron_white";
		me._chevron_white.userData.ggIsActive=function() {
			if ((this.parent) && (this.parent.ggIsActive)) {
				return this.parent.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._chevron_white.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._chevron_white.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._chevron_white.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._chevron_white.ggCurrentLogicStateVisible == 0) {
			me._chevron_white.visible=false;
			player.repaint();
			me._chevron_white.userData.visible=false;
				}
				else {
			me._chevron_white.visible=((!me._chevron_white.material && Number(me._chevron_white.userData.opacity>0)) || (me._chevron_white.material && Number(me._chevron_white.material.opacity)>0))?true:false;
			player.repaint();
			me._chevron_white.userData.visible=true;
				}
			}
		}
		me._chevron_white.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_node'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._chevron_white.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._chevron_white.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._chevron_white.ggCurrentLogicStateAlpha == 0) {
					me._chevron_white.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._chevron_white.userData.transitions.length; i++) {
						if (me._chevron_white.userData.transitions[i].property == 'alpha') {
							clearInterval(me._chevron_white.userData.transitions[i].interval);
							me._chevron_white.userData.transitions.splice(i, 1);
							break;
						}
					}
					{
						let transition_alpha = {};
						transition_alpha.property = 'alpha';
						transition_alpha.startTime = Date.now();
						transition_alpha.startAlpha = me._chevron_white.material ? me._chevron_white.material.opacity : me._chevron_white.userData.opacity;
						transition_alpha.interval = setInterval(() => {
							let currentTime = Date.now() - 0;
							let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
							percentDone = Math.max(percentDone, 0.0);
							percentDone = Math.min(percentDone, 1.0);
							let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
							me._chevron_white.userData.setOpacity(transition_alpha.startAlpha + (me._chevron_white.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
							player.repaint();
							if (percentDone >= 1.0) {
								clearInterval(transition_alpha.interval);
								me._chevron_white.userData.transitions.splice(me._chevron_white.userData.transitions.indexOf(transition_alpha), 1);
							}
						}, 20);
						me._chevron_white.userData.transitions.push(transition_alpha);
					}
				}
				else {
					me._chevron_white.userData.transitionValue_alpha = 0.6;
					for (var i = 0; i < me._chevron_white.userData.transitions.length; i++) {
						if (me._chevron_white.userData.transitions[i].property == 'alpha') {
							clearInterval(me._chevron_white.userData.transitions[i].interval);
							me._chevron_white.userData.transitions.splice(i, 1);
							break;
						}
					}
					{
						let transition_alpha = {};
						transition_alpha.property = 'alpha';
						transition_alpha.startTime = Date.now();
						transition_alpha.startAlpha = me._chevron_white.material ? me._chevron_white.material.opacity : me._chevron_white.userData.opacity;
						transition_alpha.interval = setInterval(() => {
							let currentTime = Date.now() - 0;
							let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
							percentDone = Math.max(percentDone, 0.0);
							percentDone = Math.min(percentDone, 1.0);
							let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
							me._chevron_white.userData.setOpacity(transition_alpha.startAlpha + (me._chevron_white.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
							player.repaint();
							if (percentDone >= 1.0) {
								clearInterval(transition_alpha.interval);
								me._chevron_white.userData.transitions.splice(me._chevron_white.userData.transitions.indexOf(transition_alpha), 1);
							}
						}, 20);
						me._chevron_white.userData.transitions.push(transition_alpha);
					}
				}
			}
		}
		me._chevron_white.userData.onmouseenter=function (e) {
			player.setOverrideCursor('pointer');
			me.elementMouseOver['chevron_white']=true;
		}
		me._chevron_white.userData.onmouseleave=function (e) {
			player.setOverrideCursor('default');
			me.elementMouseOver['chevron_white']=false;
		}
		me._chevron_white.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node.add(me._chevron_white);
		el = new THREE.Mesh();
		el.translateX(0);
		el.translateY(1.75);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 140;
		el.userData.height = 90;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.userData.borderRadius = {};
		el.userData.borderRadiusInnerShape = {};
		el.userData.borderRadius.topLeft = el.userData.borderRadiusInnerShape.topLeft = 0;
		el.userData.borderRadius.topRight = el.userData.borderRadiusInnerShape.topRight = 0;
		el.userData.borderRadius.bottomRight = el.userData.borderRadiusInnerShape.bottomRight = 0;
		el.userData.borderRadius.bottomLeft = el.userData.borderRadiusInnerShape.bottomLeft = 0;
		el.name = 'hs_preview_image';
		el.userData.x = 0;
		el.userData.y = 1.75;
		el.translateZ(0.120);
		el.userData.zIndex = -5;
		el.userData.zIndexCurrent = -5;
		el.userData.z = 0.120;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.mouseOverTouchMode = 'clicky';
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.renderOrder = 4;
		el.userData.renderOrder = 4;
		el.userData.setOpacityInternal = function(v) {
			if (me._hs_preview_image.material) me._hs_preview_image.material.opacity = v;
			me._hs_preview_image.visible = (v>0 && me._hs_preview_image.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._hs_preview_image.visible
			let parentEl = me._hs_preview_image.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._hs_preview_image.userData.opacity = v;
			v = v * me._hs_preview_image.userData.parentOpacity;
			if (me._hs_preview_image.userData.setOpacityInternal) me._hs_preview_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._hs_preview_image.children.length; i++) {
				let child = me._hs_preview_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._hs_preview_image.userData.parentOpacity = v;
			v = v * me._hs_preview_image.userData.opacity
			if (me._hs_preview_image.userData.setOpacityInternal) me._hs_preview_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._hs_preview_image.children.length; i++) {
				let child = me._hs_preview_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.permeable = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._hs_preview_image = el;
		loader = new THREE.TextureLoader();
		el.userData.ggNodeId=nodeId;
		texture = loader.load(basePath + 'images/hs_preview_image_' + nodeId + '.jpg');
		texture.colorSpace = player.getTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'hs_preview_image_material';
		el.material = material;
		el.userData.createGeometry = function(brTopLeft, brTopRight, brBottomRight, brBottomLeft) {
			let el = me._hs_preview_image;
			skin.disposeGeometryAndMaterial(el);
			skin.removeChildren(el, 'subElement');
			let minDim = Math.min(el.userData.width, el.userData.height) / 2;
			el.userData.borderRadiusInnerShape.topLeft = Math.min(brTopLeft, minDim);
			el.userData.borderRadiusInnerShape.topRight = Math.min(brTopRight, minDim);
			el.userData.borderRadiusInnerShape.bottomRight = Math.min(brBottomRight, minDim);
			el.userData.borderRadiusInnerShape.bottomLeft = Math.min(brBottomLeft, minDim);
		geometry = new THREE.PlaneGeometry(me._hs_preview_image.userData.width / 100.0, me._hs_preview_image.userData.height / 100.0, 5, 5 );
		geometry.name = 'hs_preview_image_geometry';
		el.geometry = geometry;
		}
		el.userData.createGeometry(0, 0, 0, 0);
		el.userData.ggId="hs_preview_image";
		me._hs_preview_image.userData.ggIsActive=function() {
			return player.getCurrentNode()==this.userData.ggElementNodeId();
		}
		el.userData.ggElementNodeId=function() {
			return this.userData.ggNodeId;
		}
		me._hs_preview_image.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_node'] == true)) && 
				((player.getVariableValue('opt_3d_preview') == true)) && 
				((player.getIsTour() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._hs_preview_image.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._hs_preview_image.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._hs_preview_image.ggCurrentLogicStateAlpha == 0) {
					me._hs_preview_image.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._hs_preview_image.userData.transitions.length; i++) {
						if (me._hs_preview_image.userData.transitions[i].property == 'alpha') {
							clearInterval(me._hs_preview_image.userData.transitions[i].interval);
							me._hs_preview_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					{
						let transition_alpha = {};
						transition_alpha.property = 'alpha';
						transition_alpha.startTime = Date.now();
						transition_alpha.startAlpha = me._hs_preview_image.material ? me._hs_preview_image.material.opacity : me._hs_preview_image.userData.opacity;
						transition_alpha.interval = setInterval(() => {
							let currentTime = Date.now() - 0;
							let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
							percentDone = Math.max(percentDone, 0.0);
							percentDone = Math.min(percentDone, 1.0);
							let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
							me._hs_preview_image.userData.setOpacity(transition_alpha.startAlpha + (me._hs_preview_image.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
							player.repaint();
							if (percentDone >= 1.0) {
								clearInterval(transition_alpha.interval);
								me._hs_preview_image.userData.transitions.splice(me._hs_preview_image.userData.transitions.indexOf(transition_alpha), 1);
							}
						}, 20);
						me._hs_preview_image.userData.transitions.push(transition_alpha);
					}
				}
				else {
					me._hs_preview_image.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._hs_preview_image.userData.transitions.length; i++) {
						if (me._hs_preview_image.userData.transitions[i].property == 'alpha') {
							clearInterval(me._hs_preview_image.userData.transitions[i].interval);
							me._hs_preview_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					{
						let transition_alpha = {};
						transition_alpha.property = 'alpha';
						transition_alpha.startTime = Date.now();
						transition_alpha.startAlpha = me._hs_preview_image.material ? me._hs_preview_image.material.opacity : me._hs_preview_image.userData.opacity;
						transition_alpha.interval = setInterval(() => {
							let currentTime = Date.now() - 0;
							let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
							percentDone = Math.max(percentDone, 0.0);
							percentDone = Math.min(percentDone, 1.0);
							let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
							me._hs_preview_image.userData.setOpacity(transition_alpha.startAlpha + (me._hs_preview_image.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
							player.repaint();
							if (percentDone >= 1.0) {
								clearInterval(transition_alpha.interval);
								me._hs_preview_image.userData.transitions.splice(me._hs_preview_image.userData.transitions.indexOf(transition_alpha), 1);
							}
						}, 20);
						me._hs_preview_image.userData.transitions.push(transition_alpha);
					}
				}
			}
		}
		me._hs_preview_image.userData.ggUpdatePosition=function (useTransition) {
		}
		el = new THREE.Mesh();
			material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : (player.get3dModelType() != 2 || true) } ); 
			el.userData.transparentIn3d = material.transparent;
			material.name = 'hs_tt_material';
			el.material = material;
		el.translateX(0);
		el.translateY(-0.35);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 140;
		el.userData.height = 20;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.userData.borderRadius = {};
		el.userData.borderRadiusInnerShape = {};
		el.userData.borderRadius.topLeft = el.userData.borderRadiusInnerShape.topLeft = 0;
		el.userData.borderRadius.topRight = el.userData.borderRadiusInnerShape.topRight = 0;
		el.userData.borderRadius.bottomRight = el.userData.borderRadiusInnerShape.bottomRight = 0;
		el.userData.borderRadius.bottomLeft = el.userData.borderRadiusInnerShape.bottomLeft = 0;
		el.name = 'hs_tt';
		el.userData.x = 0;
		el.userData.y = -0.35;
		el.translateZ(0.150);
		el.userData.zIndex = -10000;
		el.userData.zIndexCurrent = -10000;
		el.userData.z = 0.150;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.mouseOverTouchMode = 'clicky';
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.renderOrder = 5;
		el.userData.renderOrder = 5;
		el.userData.isVisible = function() {
			let vis = me._hs_tt.visible
			let parentEl = me._hs_tt.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._hs_tt.userData.opacity = v;
			v = v * me._hs_tt.userData.parentOpacity;
			if (me._hs_tt.userData.setOpacityInternal) me._hs_tt.userData.setOpacityInternal(v);
			for (let i = 0; i < me._hs_tt.children.length; i++) {
				let child = me._hs_tt.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._hs_tt.userData.parentOpacity = v;
			v = v * me._hs_tt.userData.opacity
			if (me._hs_tt.userData.setOpacityInternal) me._hs_tt.userData.setOpacityInternal(v);
			for (let i = 0; i < me._hs_tt.children.length; i++) {
				let child = me._hs_tt.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.permeable = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._hs_tt = el;
		el.userData.borderWidth = {};
		el.userData.borderWidth.default = {};
		el.userData.borderWidth.default.top = 0;
		el.userData.borderWidth.default.right = 0;
		el.userData.borderWidth.default.bottom = 0;
		el.userData.borderWidth.default.left = 0;
		el.userData.borderRadius = {};
		el.userData.borderRadius.default = {};
		el.userData.borderRadius.default.topLeft = 0;
		el.userData.borderRadius.default.topRight = 0;
		el.userData.borderRadius.default.bottomRight = 0;
		el.userData.borderRadius.default.bottomLeft = 0;
		el.userData.borderRadiusInnerShape = {};
		el.userData.createGeometry = function(bwTop, bwRight, bwBottom, bwLeft, brTopLeft, brTopRight, brBottomRight, brBottomLeft) {
			let el = me._hs_tt;
			skin.disposeGeometryAndMaterial(el);
			skin.removeChildren(el, 'subElement');
			if (typeof(bwTop) != 'undefined') {
				el.userData.borderWidth.top = bwTop;
				el.userData.borderWidth.right = bwRight;
				el.userData.borderWidth.bottom = bwBottom;
				el.userData.borderWidth.left = bwLeft;
				el.userData.borderRadius.topLeft = brTopLeft;
				el.userData.borderRadius.topRight = brTopRight;
				el.userData.borderRadius.bottomRight = brBottomRight;
				el.userData.borderRadius.bottomLeft = brBottomLeft;
			}
			let width = el.userData.width / 100.0;
			let height = el.userData.height / 100.0;
			skin.rectCalcBorderRadiiInnerShape(me._hs_tt);
			if (skin.rectHasRoundedCorners(me._hs_tt)) {
		roundedRectShape = new THREE.Shape();
		let borderRadiusTL = me._hs_tt.userData.borderRadiusInnerShape.topLeft / 100.0;
		let borderRadiusTR = me._hs_tt.userData.borderRadiusInnerShape.topRight / 100.0;
		let borderRadiusBR = me._hs_tt.userData.borderRadiusInnerShape.bottomRight / 100.0;
		let borderRadiusBL = me._hs_tt.userData.borderRadiusInnerShape.bottomLeft / 100.0;
		roundedRectShape.moveTo((-width / 2.0) + borderRadiusTL, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - borderRadiusTR, (height / 2.0));
		if (borderRadiusTR > 0.0) {
		roundedRectShape.arc(0, -borderRadiusTR, borderRadiusTR, Math.PI / 2.0, 2.0 * Math.PI, true);
		}
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + borderRadiusBR);
		if (borderRadiusBR > 0.0) {
		roundedRectShape.arc(-borderRadiusBR, 0, borderRadiusBR, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		}
		roundedRectShape.lineTo((-width / 2.0) + borderRadiusBL, (-height / 2.0));
		if (borderRadiusBL > 0.0) {
		roundedRectShape.arc(0, borderRadiusBL, borderRadiusBL, 3.0 * Math.PI / 2.0, Math.PI, true);
		}
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - borderRadiusTL);
		if (borderRadiusTL > 0.0) {
		roundedRectShape.arc(borderRadiusTL, 0, borderRadiusTL, Math.PI, Math.PI / 2.0, true);
		}
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'hs_tt_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
			} else {
				geometry = new THREE.PlaneGeometry(el.userData.width / 100.0, el.userData.height / 100.0, 5, 5);
				geometry.name = 'hs_tt_geometry';
			}
			el.geometry = geometry;
		}
		me._hs_tt.userData.backgroundColorAlpha = 0.196078;
		me._hs_tt.userData.borderColorAlpha = 1;
		me._hs_tt.userData.setOpacityInternal = function(v) {
			me._hs_tt.material.opacity = v;
			if (me._hs_tt.userData.hasScrollbar) {
				me._hs_tt.userData.scrollbar.material.opacity = v;
				me._hs_tt.userData.scrollbarBg.material.opacity = v;
			}
			if (me._hs_tt.userData.ggSubElement) {
				me._hs_tt.userData.ggSubElement.material.opacity = v
				me._hs_tt.userData.ggSubElement.visible = (v>0 && me._hs_tt.userData.visible);
			}
			me._hs_tt.visible = (v>0 && me._hs_tt.userData.visible);
		}
		me._hs_tt.userData.setBackgroundColor = function(v) {
			me._hs_tt.material.color = v;
		}
		me._hs_tt.userData.setBackgroundColorAlpha = function(v) {
			me._hs_tt.userData.backgroundColorAlpha = v;
			me._hs_tt.userData.setOpacity(me._hs_tt.userData.opacity);
		}
		el.userData.createGeometry(0, 0, 0, 0, 0, 0, 0, 0);
		el.userData.backgroundColor = player.getTHREESkinColor('#000000');
		el.userData.textColor = '#ffffff';
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 280;
		canvas.height = 40;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		var tmpCanvas = document.createElement('canvas');
		el.userData.tmpCanvas = tmpCanvas;
		el.userData.tmpCanvasContext = tmpCanvas.getContext('2d');
		el.userData.ggTextureFromCanvas = function() {
			var el = me._hs_tt;
			var canv = me._hs_tt.userData.textCanvas;
			var ctx = me._hs_tt.userData.textCanvasContext;
			var tmpCanv = me._hs_tt.userData.tmpCanvas;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._hs_tt.userData.backgroundColor.r * 255 + ', ' + me._hs_tt.userData.backgroundColor.g * 255 + ', ' + me._hs_tt.userData.backgroundColor.b * 255 + ', ' + me._hs_tt.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			if (tmpCanv.width > 0 && tmpCanv.height > 0) {
				ctx.drawImage(tmpCanv, 0, ( me._hs_tt.userData.scrollPosPercent ? tmpCanv.height * me._hs_tt.userData.scrollPosPercent : 0), canv.width, canv.height, 0, 0, canv.width, canv.height);
			}
		width = me._hs_tt.userData.boxWidthCanv / 100.0;
		height = me._hs_tt.userData.boxHeightCanv / 100.0;
		me._hs_tt.userData.width = me._hs_tt.userData.boxWidthCanv;
		me._hs_tt.userData.height = me._hs_tt.userData.boxHeightCanv;
		me._hs_tt.userData.createGeometry();
		var newPos = skin.getElementVrPosition(me._hs_tt, 0, 0);
		me._hs_tt.position.x = newPos.x;
		me._hs_tt.position.y = newPos.y;
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'hs_tt_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._hs_tt.material.map) {
				me._hs_tt.material.map.dispose();
			}
			me._hs_tt.material.map = textTexture;
			me._hs_tt.material.needsUpdate = true;
			player.repaint();
		}
		el.userData.ggRenderText = function() {
			skin.removeChildren(me._hs_tt, 'scrollbar');
			skin.paintTextDivToCanvas(me._hs_tt, 'box-sizing: border-box; width: 140px; height: auto; font-size: 12px; font-weight: inherit; color: rgba(255,255,255,1); text-align: center; white-space: pre-line; padding: 0px 1px 0px 1px; overflow: hidden;' + '; color: ' + me._hs_tt.userData.textColor + ' !important;', false, true, false);
			me._hs_tt.userData.hasScrollbar = false;
		}
		el.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=hs;
				this.ggRenderText();
			}
		}
		el.userData.setBackgroundColor = function(v) {
			me._hs_tt.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._hs_tt.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._hs_tt.userData.textColor = '#' + v.getHexString();
		}
		el.userData.setTextColorAlpha = function(v) {
			me._hs_tt.userData.textColorAlpha = v;
		}
		el.userData.ggId="hs_tt";
		me._hs_tt.userData.ggIsActive=function() {
			if ((this.parent) && (this.parent.ggIsActive)) {
				return this.parent.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me._hs_preview_image.ggNodeId;
		}
		me._hs_tt.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player._(me.hotspot.title) == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hs_tt.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hs_tt.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._hs_tt.ggCurrentLogicStateVisible == 0) {
			me._hs_tt.visible=false;
			player.repaint();
			me._hs_tt.userData.visible=false;
				}
				else {
			me._hs_tt.visible=((!me._hs_tt.material && Number(me._hs_tt.userData.opacity>0)) || (me._hs_tt.material && Number(me._hs_tt.material.opacity)>0))?true:false;
			player.repaint();
			me._hs_tt.userData.visible=true;
				}
			}
		}
		me._hs_tt.userData.ggUpdatePosition=function (useTransition) {
				me._hs_tt.userData.ggUpdateText(true);
		}
		me._hs_preview_image.add(me._hs_tt);
		el = new THREE.Mesh();
		el.translateX(0.55);
		el.translateY(0.3);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 20;
		el.userData.height = 20;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.userData.borderRadius = {};
		el.userData.borderRadiusInnerShape = {};
		el.userData.borderRadius.topLeft = el.userData.borderRadiusInnerShape.topLeft = 0;
		el.userData.borderRadius.topRight = el.userData.borderRadiusInnerShape.topRight = 0;
		el.userData.borderRadius.bottomRight = el.userData.borderRadiusInnerShape.bottomRight = 0;
		el.userData.borderRadius.bottomLeft = el.userData.borderRadiusInnerShape.bottomLeft = 0;
		el.name = 'hs_visited';
		el.userData.x = 0.55;
		el.userData.y = 0.3;
		el.translateZ(0.180);
		el.userData.zIndex = -10000;
		el.userData.zIndexCurrent = -10000;
		el.userData.z = 0.180;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.mouseOverTouchMode = 'clicky';
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.renderOrder = 6;
		el.userData.renderOrder = 6;
		el.userData.isVisible = function() {
			let vis = me._hs_visited.visible
			let parentEl = me._hs_visited.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._hs_visited.userData.opacity = v;
			v = v * me._hs_visited.userData.parentOpacity;
			if (me._hs_visited.userData.setOpacityInternal) me._hs_visited.userData.setOpacityInternal(v);
			for (let i = 0; i < me._hs_visited.children.length; i++) {
				let child = me._hs_visited.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._hs_visited.userData.parentOpacity = v;
			v = v * me._hs_visited.userData.opacity
			if (me._hs_visited.userData.setOpacityInternal) me._hs_visited.userData.setOpacityInternal(v);
			for (let i = 0; i < me._hs_visited.children.length; i++) {
				let child = me._hs_visited.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.permeable = true;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._hs_visited = el;
		el.userData.setOpacityInternal = function(v) {
			if (me._hs_visited.userData.materialNormal) me._hs_visited.userData.materialNormal.opacity = v;
			if (me._hs_visited.userData.materialOver) me._hs_visited.userData.materialOver.opacity = v;
			if (me._hs_visited.userData.materialActive) me._hs_visited.userData.materialActive.opacity = v;
			me._hs_visited.visible = (v>0 && me._hs_visited.userData.visible);
		}
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABsElEQVRYhe3YsU7CQBzH8Z9QQkJ6lAFdGNh5FTbCxgvwDITwAjyRs4bEUQEHN0eFO6iAYmL5OwikIrTXu6NI0m/SoWmbfpprL7kCSXpd7OxnAbBTQHzNAHzuO5AF8AqATry9rC0AgJQPyABc6jy6oa7gG8VUwIn/ogSoWwLULXZgo9HolUqlkcq1RRx5jut2u9dEtFoul8/lcjlozi3GDtzgaF0IMl7gLk4CGR/wEM6PtG374yTAMBwR0Xg87mcymS9tYLVavWs2mz3TONu2F9pDXK/Xe0S0ICKv0+ncHBkXDejDbQpEyuA450E4eWCtVtvFbZHtdvsP0hBODlipVJ4O4LbIVqt1GxXHGHsPe0WkgLlcbi6EuA+64QYpiRtI4uSHmDE2F0I8hCEN46'+
	'J9JPl8fjaZTMKQJnHRpxlVJOd8qICLDvQh+zHg1IBRkJzzoeM4qjh1IAByHOdtOp0eRAohdHF6wCCkIZw+cIN0XXfgwz0awpkBAqBCoeC6rjswjDMHBEDpdNqzLGtlEPcLaO2TRsnzvKOuDJN1sW5nBZwBUFrxG26EHwuAM/sFnKTSN6sLaQXDaqJCAAAAAElFTkSuQmCC');
		texture.colorSpace = player.getTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'hs_visited_material';
		el.userData.materialNormal = material;
		el.userData.materialCurrent = material;
		el.userData.createGeometry = function(brTopLeft, brTopRight, brBottomRight, brBottomLeft) {
			let el = me._hs_visited;
			skin.disposeGeometryAndMaterial(el);
			skin.removeChildren(el, 'subElement');
			let minDim = Math.min(el.userData.width, el.userData.height) / 2;
			el.userData.borderRadiusInnerShape.topLeft = Math.min(brTopLeft, minDim);
			el.userData.borderRadiusInnerShape.topRight = Math.min(brTopRight, minDim);
			el.userData.borderRadiusInnerShape.bottomRight = Math.min(brBottomRight, minDim);
			el.userData.borderRadiusInnerShape.bottomLeft = Math.min(brBottomLeft, minDim);
		geometry = new THREE.PlaneGeometry(me._hs_visited.userData.width / 100.0, me._hs_visited.userData.height / 100.0, 5, 5 );
		geometry.name = 'hs_visited_geometry';
		el.geometry = geometry;
		el.material = el.userData.materialCurrent;
		}
		el.userData.createGeometry(0, 0, 0, 0);
		el.userData.ggId="hs_visited";
		me._hs_visited.userData.ggIsActive=function() {
			if ((this.parent) && (this.parent.ggIsActive)) {
				return this.parent.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me._hs_preview_image.ggNodeId;
		}
		me._hs_visited.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._hs_visited.userData.ggIsActive() == true)) || 
				((player.nodeVisited(me._hs_visited.ggElementNodeId()) == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hs_visited.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hs_visited.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._hs_visited.ggCurrentLogicStateVisible == 0) {
			me._hs_visited.visible=((!me._hs_visited.material && Number(me._hs_visited.userData.opacity>0)) || (me._hs_visited.material && Number(me._hs_visited.material.opacity)>0))?true:false;
			player.repaint();
			me._hs_visited.userData.visible=true;
				}
				else {
			me._hs_visited.visible=false;
			player.repaint();
			me._hs_visited.userData.visible=false;
				}
			}
		}
		me._hs_visited.userData.ggUpdatePosition=function (useTransition) {
		}
		me._hs_preview_image.add(me._hs_visited);
		me._ht_node.add(me._hs_preview_image);
		el = new THREE.Mesh();
			material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : (player.get3dModelType() != 2 || false) } ); 
			el.userData.transparentIn3d = material.transparent;
			material.name = 'tt_ht_3d_material';
			el.material = material;
		el.translateX(0);
		el.translateY(1.59);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 140;
		el.userData.height = 20;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.userData.borderRadius = {};
		el.userData.borderRadiusInnerShape = {};
		el.userData.borderRadius.topLeft = el.userData.borderRadiusInnerShape.topLeft = 0;
		el.userData.borderRadius.topRight = el.userData.borderRadiusInnerShape.topRight = 0;
		el.userData.borderRadius.bottomRight = el.userData.borderRadiusInnerShape.bottomRight = 0;
		el.userData.borderRadius.bottomLeft = el.userData.borderRadiusInnerShape.bottomLeft = 0;
		el.name = 'tt_ht_3d';
		el.userData.x = 0;
		el.userData.y = 1.59;
		el.translateZ(2.150);
		el.userData.zIndex = 100;
		el.userData.zIndexCurrent = 100;
		el.userData.z = 0.150;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.mouseOverTouchMode = 'clicky';
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.renderOrder = 5;
		el.userData.renderOrder = 5;
		el.userData.isVisible = function() {
			let vis = me._tt_ht_3d.visible
			let parentEl = me._tt_ht_3d.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._tt_ht_3d.userData.opacity = v;
			v = v * me._tt_ht_3d.userData.parentOpacity;
			if (me._tt_ht_3d.userData.setOpacityInternal) me._tt_ht_3d.userData.setOpacityInternal(v);
			for (let i = 0; i < me._tt_ht_3d.children.length; i++) {
				let child = me._tt_ht_3d.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._tt_ht_3d.userData.parentOpacity = v;
			v = v * me._tt_ht_3d.userData.opacity
			if (me._tt_ht_3d.userData.setOpacityInternal) me._tt_ht_3d.userData.setOpacityInternal(v);
			for (let i = 0; i < me._tt_ht_3d.children.length; i++) {
				let child = me._tt_ht_3d.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.permeable = true;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._tt_ht_3d = el;
		el.userData.borderWidth = {};
		el.userData.borderWidth.default = {};
		el.userData.borderWidth.default.top = 1;
		el.userData.borderWidth.default.right = 1;
		el.userData.borderWidth.default.bottom = 1;
		el.userData.borderWidth.default.left = 1;
		el.userData.borderRadius = {};
		el.userData.borderRadius.default = {};
		el.userData.borderRadius.default.topLeft = 0;
		el.userData.borderRadius.default.topRight = 0;
		el.userData.borderRadius.default.bottomRight = 0;
		el.userData.borderRadius.default.bottomLeft = 0;
		el.userData.borderRadiusInnerShape = {};
		el.userData.createGeometry = function(bwTop, bwRight, bwBottom, bwLeft, brTopLeft, brTopRight, brBottomRight, brBottomLeft) {
			let el = me._tt_ht_3d;
			skin.disposeGeometryAndMaterial(el);
			skin.removeChildren(el, 'subElement');
			if (typeof(bwTop) != 'undefined') {
				el.userData.borderWidth.top = bwTop;
				el.userData.borderWidth.right = bwRight;
				el.userData.borderWidth.bottom = bwBottom;
				el.userData.borderWidth.left = bwLeft;
				el.userData.borderRadius.topLeft = brTopLeft;
				el.userData.borderRadius.topRight = brTopRight;
				el.userData.borderRadius.bottomRight = brBottomRight;
				el.userData.borderRadius.bottomLeft = brBottomLeft;
			}
			let width = el.userData.width / 100.0;
			let height = el.userData.height / 100.0;
			skin.rectCalcBorderRadiiInnerShape(me._tt_ht_3d);
			if (skin.rectHasRoundedCorners(me._tt_ht_3d)) {
		roundedRectShape = new THREE.Shape();
		let borderRadiusTL = me._tt_ht_3d.userData.borderRadiusInnerShape.topLeft / 100.0;
		let borderRadiusTR = me._tt_ht_3d.userData.borderRadiusInnerShape.topRight / 100.0;
		let borderRadiusBR = me._tt_ht_3d.userData.borderRadiusInnerShape.bottomRight / 100.0;
		let borderRadiusBL = me._tt_ht_3d.userData.borderRadiusInnerShape.bottomLeft / 100.0;
		roundedRectShape.moveTo((-width / 2.0) + borderRadiusTL, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - borderRadiusTR, (height / 2.0));
		if (borderRadiusTR > 0.0) {
		roundedRectShape.arc(0, -borderRadiusTR, borderRadiusTR, Math.PI / 2.0, 2.0 * Math.PI, true);
		}
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + borderRadiusBR);
		if (borderRadiusBR > 0.0) {
		roundedRectShape.arc(-borderRadiusBR, 0, borderRadiusBR, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		}
		roundedRectShape.lineTo((-width / 2.0) + borderRadiusBL, (-height / 2.0));
		if (borderRadiusBL > 0.0) {
		roundedRectShape.arc(0, borderRadiusBL, borderRadiusBL, 3.0 * Math.PI / 2.0, Math.PI, true);
		}
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - borderRadiusTL);
		if (borderRadiusTL > 0.0) {
		roundedRectShape.arc(borderRadiusTL, 0, borderRadiusTL, Math.PI, Math.PI / 2.0, true);
		}
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'tt_ht_3d_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
			} else {
				geometry = new THREE.PlaneGeometry(el.userData.width / 100.0, el.userData.height / 100.0, 5, 5);
				geometry.name = 'tt_ht_3d_geometry';
			}
			el.geometry = geometry;
			el.userData.borderRadiusInnerShape = {};
		let bWidthLeft = me._tt_ht_3d.userData.borderWidth.left / 100.0;
		let bWidthTop = me._tt_ht_3d.userData.borderWidth.top / 100.0;
		let bWidthRight = me._tt_ht_3d.userData.borderWidth.right / 100.0;
		let bWidthBottom = me._tt_ht_3d.userData.borderWidth.bottom / 100.0;
		let maxRad = skin.rectMaxRadius(me._tt_ht_3d);
		let bRadiusTL = Math.min(me._tt_ht_3d.userData.borderRadius.topLeft / 100.0, maxRad / 100.0);
		let bRadiusTR = Math.min(me._tt_ht_3d.userData.borderRadius.topRight / 100.0, maxRad / 100.0);
		let bRadiusBR = Math.min(me._tt_ht_3d.userData.borderRadius.bottomRight / 100.0, maxRad / 100.0);
		let bRadiusBL = Math.min(me._tt_ht_3d.userData.borderRadius.bottomLeft / 100.0, maxRad / 100.0);
		borderShape = new THREE.Shape();
		borderShape.moveTo((-width / 2.0) - bWidthLeft + bRadiusTL, (height / 2.0) + bWidthTop);
		borderShape.lineTo((width / 2.0) + bWidthRight - bRadiusTR, (height / 2.0) + bWidthTop);
		if (bRadiusTR > 0) {
			borderShape.arc(0, -bRadiusTR, bRadiusTR, Math.PI / 2.0, 2.0 * Math.PI, true);
		}
		borderShape.lineTo((width / 2.0) + bWidthRight, (-height / 2.0) - bWidthBottom + bRadiusBR);
		if (bRadiusBR > 0) {
			borderShape.arc(-bRadiusBR, 0, bRadiusBR, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		}
		borderShape.lineTo((-width / 2.0) - bWidthLeft + bRadiusBL, (-height / 2.0) - bWidthBottom);
		if (bRadiusBL > 0) {
			borderShape.arc(0, bRadiusBL, bRadiusBL, 3.0 * Math.PI / 2.0, Math.PI, true);
		}
		borderShape.lineTo((-width / 2.0) - bWidthLeft, (height / 2.0) + bWidthTop - bRadiusTL);
		if (bRadiusTL > 0) {
			borderShape.arc(bRadiusTL, 0, bRadiusTL, Math.PI, Math.PI / 2.0, true);
		}
		innerShape = new THREE.Path();
		if (skin.rectHasRoundedCorners(me._tt_ht_3d)) {
			let borderRadiusTL = bRadiusTL - ((bWidthTop + bWidthLeft) / 2.0);
			let borderRadiusTR = bRadiusTR - ((bWidthTop + bWidthRight) / 2.0);
			let borderRadiusBR = bRadiusBR - ((bWidthBottom + bWidthRight) / 2.0);
			let borderRadiusBL = bRadiusBL - ((bWidthBottom + bWidthLeft) / 2.0);
		innerShape.moveTo((-width / 2.0) + borderRadiusTL, (height / 2.0));
		innerShape.lineTo((width / 2.0) - borderRadiusTR, (height / 2.0));
		if (borderRadiusTR > 0.0) {
		innerShape.arc(0, -borderRadiusTR, borderRadiusTR, Math.PI / 2.0, 2.0 * Math.PI, true);
		}
		innerShape.lineTo((width / 2.0), (-height / 2.0) + borderRadiusBR);
		if (borderRadiusBR > 0.0) {
		innerShape.arc(-borderRadiusBR, 0, borderRadiusBR, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		}
		innerShape.lineTo((-width / 2.0) + borderRadiusBL, (-height / 2.0));
		if (borderRadiusBL > 0.0) {
		innerShape.arc(0, borderRadiusBL, borderRadiusBL, 3.0 * Math.PI / 2.0, Math.PI, true);
		}
		innerShape.lineTo((-width / 2.0), (height / 2.0) - borderRadiusTL);
		if (borderRadiusTL > 0.0) {
		innerShape.arc(borderRadiusTL, 0, borderRadiusTL, Math.PI, Math.PI / 2.0, true);
		}
		} else {
			innerShape.moveTo((-width / 2.0), (height / 2.0));
			innerShape.lineTo((width / 2.0), (height / 2.0));
			innerShape.lineTo((width / 2.0), (-height / 2.0));
			innerShape.lineTo((-width / 2.0), (-height / 2.0));
		}
		borderShape.holes.push(innerShape);
		borderGeometry = new THREE.ShapeGeometry(borderShape);
		borderGeometry.name = 'tt_ht_3d_subElement_borderGeometry';
		borderMaterial = new THREE.MeshBasicMaterial( {color: player.getTHREESkinColor('#000000'), side: THREE.DoubleSide, transparent: (player.get3dModelType() != 2 || false) } );
		borderMaterial.name = 'tt_ht_3d_subElement_borderMaterial';
		me._tt_ht_3d.userData.border = new THREE.Mesh( borderGeometry, borderMaterial );
		me._tt_ht_3d.userData.border.name = 'tt_ht_3d_subElement_borderMesh';
		me._tt_ht_3d.add(me._tt_ht_3d.userData.border);
		}
		me._tt_ht_3d.userData.backgroundColorAlpha = 0.666667;
		me._tt_ht_3d.userData.borderColorAlpha = 1;
		me._tt_ht_3d.userData.setOpacityInternal = function(v) {
			me._tt_ht_3d.material.opacity = v;
			if (me._tt_ht_3d.userData.hasScrollbar) {
				me._tt_ht_3d.userData.scrollbar.material.opacity = v;
				me._tt_ht_3d.userData.scrollbarBg.material.opacity = v;
			}
			me._tt_ht_3d.userData.border.material.opacity = v * me._tt_ht_3d.userData.borderColorAlpha;
			if (me._tt_ht_3d.userData.ggSubElement) {
				me._tt_ht_3d.userData.ggSubElement.material.opacity = v
				me._tt_ht_3d.userData.ggSubElement.visible = (v>0 && me._tt_ht_3d.userData.visible);
			}
			me._tt_ht_3d.visible = (v>0 && me._tt_ht_3d.userData.visible);
		}
		me._tt_ht_3d.userData.setBackgroundColor = function(v) {
			me._tt_ht_3d.material.color = v;
		}
		me._tt_ht_3d.userData.setBackgroundColorAlpha = function(v) {
			me._tt_ht_3d.userData.backgroundColorAlpha = v;
			me._tt_ht_3d.userData.setOpacity(me._tt_ht_3d.userData.opacity);
		}
		me._tt_ht_3d.userData.setBorderColor = function(v) {
			me._tt_ht_3d.userData.border.material.color = v;
		}
		me._tt_ht_3d.userData.setBorderColorAlpha = function(v) {
			me._tt_ht_3d.userData.borderColorAlpha = v;
			me._tt_ht_3d.userData.setOpacity(me._tt_ht_3d.userData.opacity);
		}
		el.userData.createGeometry(1, 1, 1, 1, 0, 0, 0, 0);
		el.userData.backgroundColor = player.getTHREESkinColor('#000000');
		el.userData.textColor = '#ffffff';
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 280;
		canvas.height = 40;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		var tmpCanvas = document.createElement('canvas');
		el.userData.tmpCanvas = tmpCanvas;
		el.userData.tmpCanvasContext = tmpCanvas.getContext('2d');
		el.userData.ggTextureFromCanvas = function() {
			var el = me._tt_ht_3d;
			var canv = me._tt_ht_3d.userData.textCanvas;
			var ctx = me._tt_ht_3d.userData.textCanvasContext;
			var tmpCanv = me._tt_ht_3d.userData.tmpCanvas;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._tt_ht_3d.userData.backgroundColor.r * 255 + ', ' + me._tt_ht_3d.userData.backgroundColor.g * 255 + ', ' + me._tt_ht_3d.userData.backgroundColor.b * 255 + ', ' + me._tt_ht_3d.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			if (tmpCanv.width > 0 && tmpCanv.height > 0) {
				ctx.drawImage(tmpCanv, 0, ( me._tt_ht_3d.userData.scrollPosPercent ? tmpCanv.height * me._tt_ht_3d.userData.scrollPosPercent : 0), canv.width, canv.height, 0, 0, canv.width, canv.height);
			}
		width = me._tt_ht_3d.userData.boxWidthCanv / 100.0;
		height = me._tt_ht_3d.userData.boxHeightCanv / 100.0;
		me._tt_ht_3d.userData.width = me._tt_ht_3d.userData.boxWidthCanv;
		me._tt_ht_3d.userData.height = me._tt_ht_3d.userData.boxHeightCanv;
		me._tt_ht_3d.userData.createGeometry();
		var newPos = skin.getElementVrPosition(me._tt_ht_3d, 0, -170);
		me._tt_ht_3d.position.x = newPos.x;
		me._tt_ht_3d.position.y = newPos.y;
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'tt_ht_3d_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._tt_ht_3d.material.map) {
				me._tt_ht_3d.material.map.dispose();
			}
			me._tt_ht_3d.material.map = textTexture;
			me._tt_ht_3d.material.needsUpdate = true;
			player.repaint();
		}
		el.userData.ggRenderText = function() {
			skin.removeChildren(me._tt_ht_3d, 'scrollbar');
			skin.paintTextDivToCanvas(me._tt_ht_3d, 'box-sizing: border-box; width: auto; height: auto; font-size: 16px; font-weight: inherit; color: rgba(255,255,255,1); text-align: center; white-space: pre; padding: 0px 1px 0px 1px; overflow: hidden;transform:translate3d(0px,0px,40px) rotateX(-90deg); font-size: 15px; -webkit-backface-visibility: hidden; backface-visibility: hidden;' + '; color: ' + me._tt_ht_3d.userData.textColor + ' !important;', false, true, false);
			me._tt_ht_3d.userData.hasScrollbar = false;
		}
		el.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=hs;
				this.ggRenderText();
			}
		}
		el.userData.setBackgroundColor = function(v) {
			me._tt_ht_3d.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._tt_ht_3d.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._tt_ht_3d.userData.textColor = '#' + v.getHexString();
		}
		el.userData.setTextColorAlpha = function(v) {
			me._tt_ht_3d.userData.textColorAlpha = v;
		}
		el.userData.ggId="tt_ht_3d";
		me._tt_ht_3d.userData.ggIsActive=function() {
			if ((this.parent) && (this.parent.ggIsActive)) {
				return this.parent.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._tt_ht_3d.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsTour() == false)) && 
				((player._(me.hotspot.title) != "")) && 
				((me.elementMouseOver['ht_node'] == true)) && 
				((player.getVariableValue('opt_3d_preview') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_3d.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_3d.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._tt_ht_3d.ggCurrentLogicStateVisible == 0) {
			me._tt_ht_3d.visible=((!me._tt_ht_3d.material && Number(me._tt_ht_3d.userData.opacity>0)) || (me._tt_ht_3d.material && Number(me._tt_ht_3d.material.opacity)>0))?true:false;
			player.repaint();
			me._tt_ht_3d.userData.visible=true;
				}
				else {
			me._tt_ht_3d.visible=false;
			player.repaint();
			me._tt_ht_3d.userData.visible=false;
				}
			}
		}
		me._tt_ht_3d.userData.ggUpdatePosition=function (useTransition) {
				me._tt_ht_3d.userData.ggUpdateText(true);
		}
		me._ht_node.add(me._tt_ht_3d);
		el = new THREE.Group();
		el.translateX(0.33);
		el.translateY(0.205);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 66;
		el.userData.height = 37;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.userData.borderRadius = {};
		el.userData.borderRadiusInnerShape = {};
		el.userData.borderRadius.topLeft = el.userData.borderRadiusInnerShape.topLeft = 0;
		el.userData.borderRadius.topRight = el.userData.borderRadiusInnerShape.topRight = 0;
		el.userData.borderRadius.bottomRight = el.userData.borderRadiusInnerShape.bottomRight = 0;
		el.userData.borderRadius.bottomLeft = el.userData.borderRadiusInnerShape.bottomLeft = 0;
		el.name = '_3d_code';
		el.userData.x = 0.33;
		el.userData.y = 0.205;
		el.translateZ(0.180);
		el.userData.zIndex = -10000;
		el.userData.zIndexCurrent = -10000;
		el.userData.z = 0.180;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.mouseOverTouchMode = 'clicky';
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.renderOrder = 6;
		el.userData.renderOrder = 6;
		el.userData.setOpacityInternal = function(v) {
			if (me.__3d_code.material) me.__3d_code.material.opacity = v;
			me.__3d_code.visible = (v>0 && me.__3d_code.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me.__3d_code.visible
			let parentEl = me.__3d_code.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me.__3d_code.userData.opacity = v;
			v = v * me.__3d_code.userData.parentOpacity;
			if (me.__3d_code.userData.setOpacityInternal) me.__3d_code.userData.setOpacityInternal(v);
			for (let i = 0; i < me.__3d_code.children.length; i++) {
				let child = me.__3d_code.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me.__3d_code.userData.parentOpacity = v;
			v = v * me.__3d_code.userData.opacity
			if (me.__3d_code.userData.setOpacityInternal) me.__3d_code.userData.setOpacityInternal(v);
			for (let i = 0; i < me.__3d_code.children.length; i++) {
				let child = me.__3d_code.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.permeable = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me.__3d_code = el;
		el.userData.ggId="_3d_code";
		me.__3d_code.userData.ggIsActive=function() {
			if ((this.parent) && (this.parent.ggIsActive)) {
				return this.parent.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me.__3d_code.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node.add(me.__3d_code);
		el = new THREE.Group();
		el.translateX(0);
		el.translateY(1.15);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.userData.borderRadius = {};
		el.userData.borderRadiusInnerShape = {};
		el.userData.borderRadius.topLeft = el.userData.borderRadiusInnerShape.topLeft = 0;
		el.userData.borderRadius.topRight = el.userData.borderRadiusInnerShape.topRight = 0;
		el.userData.borderRadius.bottomRight = el.userData.borderRadiusInnerShape.bottomRight = 0;
		el.userData.borderRadius.bottomLeft = el.userData.borderRadiusInnerShape.bottomLeft = 0;
		el.name = 'ht_node_CustomImage';
		el.userData.x = 0;
		el.userData.y = 1.15;
		el.translateZ(0.210);
		el.userData.zIndex = -10000;
		el.userData.zIndexCurrent = -10000;
		el.userData.z = 0.210;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.mouseOverTouchMode = 'clicky';
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.renderOrder = 7;
		el.userData.renderOrder = 7;
		el.userData.isVisible = function() {
			let vis = me._ht_node_customimage.visible
			let parentEl = me._ht_node_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_customimage.userData.opacity = v;
			v = v * me._ht_node_customimage.userData.parentOpacity;
			if (me._ht_node_customimage.userData.setOpacityInternal) me._ht_node_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_customimage.children.length; i++) {
				let child = me._ht_node_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_customimage.userData.parentOpacity = v;
			v = v * me._ht_node_customimage.userData.opacity
			if (me._ht_node_customimage.userData.setOpacityInternal) me._ht_node_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_customimage.children.length; i++) {
				let child = me._ht_node_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.permeable = false;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_customimage = el;
		el.userData.borderWidth = {};
		el.userData.borderWidth.default = {};
		el.userData.borderWidth.default.top = 0;
		el.userData.borderWidth.default.right = 0;
		el.userData.borderWidth.default.bottom = 0;
		el.userData.borderWidth.default.left = 0;
		el.userData.borderRadius = {};
		el.userData.borderRadius.default = {};
		el.userData.borderRadius.default.topLeft = 0;
		el.userData.borderRadius.default.topRight = 0;
		el.userData.borderRadius.default.bottomRight = 0;
		el.userData.borderRadius.default.bottomLeft = 0;
		el.userData.borderRadiusInnerShape = {};
		el.userData.createGeometry = function(bwTop, bwRight, bwBottom, bwLeft, brTopLeft, brTopRight, brBottomRight, brBottomLeft) {
			let el = me._ht_node_customimage;
			skin.disposeGeometryAndMaterial(el);
			skin.removeChildren(el, 'subElement');
			if (typeof(bwTop) != 'undefined') {
				el.userData.borderWidth.top = bwTop;
				el.userData.borderWidth.right = bwRight;
				el.userData.borderWidth.bottom = bwBottom;
				el.userData.borderWidth.left = bwLeft;
				el.userData.borderRadius.topLeft = brTopLeft;
				el.userData.borderRadius.topRight = brTopRight;
				el.userData.borderRadius.bottomRight = brBottomRight;
				el.userData.borderRadius.bottomLeft = brBottomLeft;
			}
			let width = el.userData.width / 100.0;
			let height = el.userData.height / 100.0;
			skin.rectCalcBorderRadiiInnerShape(me._ht_node_customimage);
		}
		me._ht_node_customimage.userData.backgroundColorAlpha = 1;
		me._ht_node_customimage.userData.borderColorAlpha = 1;
		me._ht_node_customimage.userData.setOpacityInternal = function(v) {
			if (me._ht_node_customimage.userData.ggSubElement) {
				me._ht_node_customimage.userData.ggSubElement.material.opacity = v
				me._ht_node_customimage.userData.ggSubElement.visible = (v>0 && me._ht_node_customimage.userData.visible);
			}
			me._ht_node_customimage.visible = (v>0 && me._ht_node_customimage.userData.visible);
		}
		el.userData.createGeometry(0, 0, 0, 0, 0, 0, 0, 0);
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5);
		img.geometry.name = 'ht_node_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getTextureColorSpace();
				let tmpDepthTest = true;
				if (me._ht_node_customimage.userData.ggSubElement.material) {
					tmpDepthTest = me._ht_node_customimage.userData.ggSubElement.material.depthTest;
				}
				var loadedMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true, depthTest: tmpDepthTest, depthWrite: tmpDepthTest });
				loadedMaterial.name = 'ht_node_CustomImage_subElementMaterial';
				me._ht_node_customimage.userData.ggSubElement.material = loadedMaterial;
				me._ht_node_customimage.userData.ggUpdatePosition();
				me._ht_node_customimage.userData.ggText = extUrl;
				me._ht_node_customimage.userData.setOpacity(me._ht_node_customimage.userData.opacity);
			});
		};
		if ((hotspot) && (hotspot.customimage)) {
			var extUrl=hotspot.customimage;
		}
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_node_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_node_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="ht_node_CustomImage";
		me._ht_node_customimage.userData.ggIsActive=function() {
			if ((this.parent) && (this.parent.ggIsActive)) {
				return this.parent.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._ht_node_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_node_customimage.ggCurrentLogicStateVisible == 0) {
			me._ht_node_customimage.visible=false;
			player.repaint();
			me._ht_node_customimage.userData.visible=false;
				}
				else {
			me._ht_node_customimage.visible=((!me._ht_node_customimage.material && Number(me._ht_node_customimage.userData.opacity>0)) || (me._ht_node_customimage.material && Number(me._ht_node_customimage.material.opacity)>0))?true:false;
			player.repaint();
			me._ht_node_customimage.userData.visible=true;
				}
			}
		}
		me._ht_node_customimage.userData.onmouseenter=function (e) {
			player.setOverrideCursor('pointer');
			me.elementMouseOver['ht_node_customimage']=true;
		}
		me._ht_node_customimage.userData.onmouseleave=function (e) {
			player.setOverrideCursor('default');
			me.elementMouseOver['ht_node_customimage']=false;
		}
		me._ht_node_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_node_customimage.userData.clientWidth;
			var parentHeight = me._ht_node_customimage.userData.clientHeight;
			var img = me._ht_node_customimage.userData.ggSubElement;
			if (!img.material || !img.material.map) return;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5);
			img.geometry.name = 'ht_node_CustomImage_imgGeometry';
			}
		}
		me._ht_node.add(me._ht_node_customimage);
		me._ht_node.userData.setOpacity(1.00);
		me.elementMouseOver['ht_node']=false;
		me._chevron_white_lower.userData.setOpacity(0.60);
		me.elementMouseOver['chevron_white_lower']=false;
		me._chevron_white_lower.logicBlock_visible();
		me._chevron_white_lower.logicBlock_alpha();
		me._chevron_black.userData.setOpacity(0.40);
		me.elementMouseOver['chevron_black']=false;
		me._chevron_black.logicBlock_visible();
		me._chevron_black.logicBlock_alpha();
		me._chevron_white.userData.setOpacity(0.60);
		me.elementMouseOver['chevron_white']=false;
		me._chevron_white.logicBlock_visible();
		me._chevron_white.logicBlock_alpha();
		me._hs_preview_image.userData.setOpacity(0.00);
		me._hs_preview_image.logicBlock_alpha();
		me._hs_tt.userData.setOpacity(1.00);
			me._hs_tt.userData.ggUpdateText(true);
		me._hs_tt.logicBlock_visible();
		me._hs_visited.userData.setOpacity(1.00);
		me._hs_visited.logicBlock_visible();
		me._tt_ht_3d.traverse((obj)=>{
			let level = skin.getDepthFrom(me._tt_ht_3d, obj);
			let treePos = obj.parent ? obj.parent.children.indexOf(obj) : 0;
			if (100 > 0) {
				if (obj == me._tt_ht_3d) {
					obj.renderOrder = 10000 + 1000*100
				} else {
					let parentOrder = obj.parent.renderOrder;
					let isSkinElement = obj.userData.hasOwnProperty('ggId');
					obj.renderOrder = parentOrder + (isSkinElement ? (treePos * 100) : 0) + level;
				}
			} else {
				obj.renderOrder = me._tt_ht_3d.userData.renderOrder + level;
			}
			if (obj.material) {
				if (player.get3dModelType() != 2) {
					obj.material.depthTest = false;
					obj.material.depthWrite = false;
				} else {
					obj.material.transparent = true;
				}
			}
		});
		player.repaint();
		me._tt_ht_3d.userData.setOpacity(1.00);
			me._tt_ht_3d.userData.ggUpdateText(true);
		me._tt_ht_3d.logicBlock_visible();
		el = me.__3d_code;
		javascript:"";
this.onUpdatePosition=function(player,hotspot) {
var vs=player.getViewerSize();
var y=vs.height * (1/6*(1+Math.cos(player.getTilt() * Math.PI/90.0)));
var hs= 'translate3d(' + vs.margins.left.valueInPx + 'px,' + vs.margins.top.valueInPx + 'px,-1000px) perspective(500px) translate3d(0px,' + (y) + 'px,0px) ';
hs += 'rotateZ(' + ( player.getRoll()).toFixed(10) + 'deg) ';
hs += 'rotateX(' + ( player.getTilt()).toFixed(10) + 'deg) ';
hs += 'rotateY(' + (-player.getPan()).toFixed(10)  + 'deg) ';
hs += 'rotateY(' + ( hotspot.pan).toFixed(2)  + 'deg) ';
hs += 'rotateX(' + (-hotspot.tilt).toFixed(2) + 'deg) ';
hs += 'rotateX(90deg) ';
this.__div.style.transform=hs;
this.__div.style.left = vs.width / 2 + "px";
this.__div.style.top = vs.height / 2 + "px";
};
		me.__3d_code.userData.setOpacity(1.00);
		me._ht_node_customimage.userData.setOpacity(1.00);
		me.elementMouseOver['ht_node_customimage']=false;
		me._ht_node_customimage.logicBlock_visible();
			me.ggEvent_activehotspotchanged=function() {
				me._chevron_white_lower.logicBlock_visible();
				me._chevron_black.logicBlock_visible();
				me._chevron_white.logicBlock_visible();
				me._hs_tt.logicBlock_visible();
				me._tt_ht_3d.logicBlock_visible();
				me._ht_node_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._chevron_white_lower.logicBlock_visible();
				me._chevron_black.logicBlock_visible();
				me._chevron_white.logicBlock_visible();
				me._hs_preview_image.logicBlock_alpha();
					me._hs_tt.userData.ggUpdateText();
				me._hs_tt.logicBlock_visible();
				me._hs_visited.logicBlock_visible();
				me._hs_visited.logicBlock_visible();
					me._tt_ht_3d.userData.ggUpdateText();
				me._tt_ht_3d.logicBlock_visible();
				me._ht_node_customimage.logicBlock_visible();
			};
			me.ggEvent_changevisitednodes=function() {
				me._hs_visited.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._chevron_white_lower.logicBlock_visible();
				me._chevron_black.logicBlock_visible();
				me._chevron_white.logicBlock_visible();
				me._hs_preview_image.logicBlock_alpha();
				me._hs_tt.logicBlock_visible();
				me._tt_ht_3d.logicBlock_visible();
				me._ht_node_customimage.logicBlock_visible();
			};
			me.ggEvent_varchanged_opt_3d_preview=function() {
				me._hs_preview_image.logicBlock_alpha();
				me._tt_ht_3d.logicBlock_visible();
			};
			me.__obj = me._ht_node;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_node(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggNodeId=nodeId;
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node=document.createElement('div');
		el.ggId="ht_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		el.userData=el;
		hs ='';
		hs+='height : 0px;';
		hs+='left : 71px;';
		hs+='position : absolute;';
		hs+='top : 220px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		hs+='transform-style: preserve-3d;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._ht_node.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_node.onclick=function (e) {
			player.openNext(player._(me.hotspot.url),player._(me.hotspot.target));
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node']=true;
			me._chevron_white_lower.logicBlock_alpha();
			me._chevron_black.logicBlock_alpha();
			me._chevron_white.logicBlock_alpha();
			me._hs_preview_image.logicBlock_alpha();
			me._tt_ht_3d.logicBlock_visible();
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.onmouseleave=function (e) {
			me.elementMouseOver['ht_node']=false;
			me._chevron_white_lower.logicBlock_alpha();
			me._chevron_black.logicBlock_alpha();
			me._chevron_white.logicBlock_alpha();
			me._hs_preview_image.logicBlock_alpha();
			me._tt_ht_3d.logicBlock_visible();
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
			player.setActiveHotspot(null);
		}
		me._ht_node.ggUpdatePosition=function (useTransition) {
		}
		el=me._chevron_white_lower=document.createElement('div');
		els=me._chevron_white_lower__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAwIDEwMDA7IiB2ZXJzaW9uPSIxLjAiIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiIHg9IjBweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bG'+
			'luayIgeT0iMHB4Ij4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CiA8Zz4KICA8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzQuOSw0MzkuN2w0MDAtNDAxYzE3LjktMTcuOSw0MS43LTI1LjQsNjUuMi0yNGMyMy40LTEuNCw0Ny4yLDYuMSw2NS4xLDI0bDQwMCw0MDEgICBjMzMuMiwzMy4zLDMzLjIsODcuNCwwLDEyMC43Yy0zMy4yLDMzLjMtODcuMSwzMy4zLTEyMC40LDBMNTAwLDIxNC43TDE1NS4yLDU2MC40Yy0zMy4yLDMzLjMtODcuMSwzMy4zLTEyMC40LDAgICBTMS43LDQ3MywzNC45LDQzOS43eiIvPgogPC9nPgo8L3N2Zz4K';
		me._chevron_white_lower__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="chevron_white_lower";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		el.userData=el;
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 80px;';
		hs+='left : calc(50% - ((80px + 0px) / 2) + 0px);';
		hs+='opacity : 0.6;';
		hs+='position : absolute;';
		hs+='top : -140px;';
		hs+='visibility : inherit;';
		hs+='width : 80px;';
		hs+='pointer-events:auto;';
		hs+='transform:translate3d(0px,0px,-1px);';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._chevron_white_lower.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._chevron_white_lower.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._chevron_white_lower.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._chevron_white_lower.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._chevron_white_lower.style.transition='opacity 500ms ease 0ms';
				if (me._chevron_white_lower.ggCurrentLogicStateVisible == 0) {
					me._chevron_white_lower.style.visibility="hidden";
					me._chevron_white_lower.ggVisible=false;
				}
				else {
					me._chevron_white_lower.style.visibility=(Number(me._chevron_white_lower.style.opacity)>0||!me._chevron_white_lower.style.opacity)?'inherit':'hidden';
					me._chevron_white_lower.ggVisible=true;
				}
			}
		}
		me._chevron_white_lower.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_node'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._chevron_white_lower.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._chevron_white_lower.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._chevron_white_lower.style.transition='opacity 500ms ease 0ms';
				if (me._chevron_white_lower.ggCurrentLogicStateAlpha == 0) {
					me._chevron_white_lower.style.visibility=me._chevron_white_lower.ggVisible?'inherit':'hidden';
					me._chevron_white_lower.style.opacity=1;
				}
				else {
					me._chevron_white_lower.style.visibility=me._chevron_white_lower.ggVisible?'inherit':'hidden';
					me._chevron_white_lower.style.opacity=0.6;
				}
			}
		}
		me._chevron_white_lower.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node.appendChild(me._chevron_white_lower);
		el=me._chevron_black=document.createElement('div');
		els=me._chevron_black__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAwIDEwMDA7IiB2ZXJzaW9uPSIxLjAiIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiIHg9IjBweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bG'+
			'luayIgeT0iMHB4Ij4KIDxnPgogIDxwYXRoIGQ9Ik0zNC45LDQzOS43bDQwMC00MDFjMTcuOS0xNy45LDQxLjctMjUuNCw2NS4yLTI0YzIzLjQtMS40LDQ3LjIsNi4xLDY1LjEsMjRsNDAwLDQwMWMzMy4yLDMzLjMsMzMuMiw4Ny40LDAsMTIwLjcgICBjLTMzLjIsMzMuMy04Ny4xLDMzLjMtMTIwLjQsMEw1MDAsMjE0LjdMMTU1LjIsNTYwLjRjLTMzLjIsMzMuMy04Ny4xLDMzLjMtMTIwLjQsMFMxLjcsNDczLDM0LjksNDM5Ljd6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._chevron_black__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="chevron_black";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		el.userData=el;
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 80px;';
		hs+='left : calc(50% - ((80px + 0px) / 2) + 0px);';
		hs+='opacity : 0.4;';
		hs+='position : absolute;';
		hs+='top : -140px;';
		hs+='visibility : inherit;';
		hs+='width : 80px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._chevron_black.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._chevron_black.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._chevron_black.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._chevron_black.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._chevron_black.style.transition='opacity 500ms ease 0ms';
				if (me._chevron_black.ggCurrentLogicStateVisible == 0) {
					me._chevron_black.style.visibility="hidden";
					me._chevron_black.ggVisible=false;
				}
				else {
					me._chevron_black.style.visibility=(Number(me._chevron_black.style.opacity)>0||!me._chevron_black.style.opacity)?'inherit':'hidden';
					me._chevron_black.ggVisible=true;
				}
			}
		}
		me._chevron_black.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_node'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._chevron_black.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._chevron_black.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._chevron_black.style.transition='opacity 500ms ease 0ms';
				if (me._chevron_black.ggCurrentLogicStateAlpha == 0) {
					me._chevron_black.style.visibility=me._chevron_black.ggVisible?'inherit':'hidden';
					me._chevron_black.style.opacity=1;
				}
				else {
					me._chevron_black.style.visibility=me._chevron_black.ggVisible?'inherit':'hidden';
					me._chevron_black.style.opacity=0.4;
				}
			}
		}
		me._chevron_black.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node.appendChild(me._chevron_black);
		el=me._chevron_white=document.createElement('div');
		els=me._chevron_white__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAwIDEwMDA7IiB2ZXJzaW9uPSIxLjAiIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiIHg9IjBweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bG'+
			'luayIgeT0iMHB4Ij4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CiA8Zz4KICA8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzQuOSw0MzkuN2w0MDAtNDAxYzE3LjktMTcuOSw0MS43LTI1LjQsNjUuMi0yNGMyMy40LTEuNCw0Ny4yLDYuMSw2NS4xLDI0bDQwMCw0MDEgICBjMzMuMiwzMy4zLDMzLjIsODcuNCwwLDEyMC43Yy0zMy4yLDMzLjMtODcuMSwzMy4zLTEyMC40LDBMNTAwLDIxNC43TDE1NS4yLDU2MC40Yy0zMy4yLDMzLjMtODcuMSwzMy4zLTEyMC40LDAgICBTMS43LDQ3MywzNC45LDQzOS43eiIvPgogPC9nPgo8L3N2Zz4K';
		me._chevron_white__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="chevron_white";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		el.userData=el;
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 80px;';
		hs+='left : calc(50% - ((80px + 0px) / 2) + 0px);';
		hs+='opacity : 0.6;';
		hs+='position : absolute;';
		hs+='top : -140px;';
		hs+='visibility : inherit;';
		hs+='width : 80px;';
		hs+='pointer-events:auto;';
		hs+='transform:translate3d(0px,0px,1px);';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._chevron_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._chevron_white.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._chevron_white.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._chevron_white.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._chevron_white.style.transition='opacity 500ms ease 0ms';
				if (me._chevron_white.ggCurrentLogicStateVisible == 0) {
					me._chevron_white.style.visibility="hidden";
					me._chevron_white.ggVisible=false;
				}
				else {
					me._chevron_white.style.visibility=(Number(me._chevron_white.style.opacity)>0||!me._chevron_white.style.opacity)?'inherit':'hidden';
					me._chevron_white.ggVisible=true;
				}
			}
		}
		me._chevron_white.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_node'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._chevron_white.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._chevron_white.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._chevron_white.style.transition='opacity 500ms ease 0ms';
				if (me._chevron_white.ggCurrentLogicStateAlpha == 0) {
					me._chevron_white.style.visibility=me._chevron_white.ggVisible?'inherit':'hidden';
					me._chevron_white.style.opacity=1;
				}
				else {
					me._chevron_white.style.visibility=me._chevron_white.ggVisible?'inherit':'hidden';
					me._chevron_white.style.opacity=0.6;
				}
			}
		}
		me._chevron_white.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node.appendChild(me._chevron_white);
		el=me._hs_preview_image=document.createElement('div');
		els=me._hs_preview_image__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		if (nodeId) els.setAttribute('src',basePath + "images/hs_preview_image_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hs_preview_image";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		el.userData=el;
		hs ='';
		hs+='z-index: -5;';
		hs+='height : 90px;';
		hs+='left : calc(50% - ((140px + 0px) / 2) + 0px);';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -220px;';
		hs+='visibility : hidden;';
		hs+='width : 140px;';
		hs+='pointer-events:none;';
		hs+='border-radius: 5px; overflow: hidden; box-shadow: 0px 0px 2px #000000; transform:translate3d(0px,0px,90px) rotateX(-90deg) scale(1.5); transform-style: preserve-3d; -webkit-backface-visibility: hidden; backface-visibility: hidden;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._hs_preview_image.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._hs_preview_image.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_node'] == true)) && 
				((player.getVariableValue('opt_3d_preview') == true)) && 
				((player.getIsTour() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._hs_preview_image.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._hs_preview_image.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._hs_preview_image.style.transition='opacity 500ms ease 0ms';
				if (me._hs_preview_image.ggCurrentLogicStateAlpha == 0) {
					me._hs_preview_image.style.visibility=me._hs_preview_image.ggVisible?'inherit':'hidden';
					me._hs_preview_image.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._hs_preview_image.style.opacity == 0.0) { me._hs_preview_image.style.visibility="hidden"; } }, 505);
					me._hs_preview_image.style.opacity=0;
				}
			}
		}
		me._hs_preview_image.ggUpdatePosition=function (useTransition) {
		}
		el=me._hs_tt=document.createElement('div');
		els=me._hs_tt__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="hs_tt";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		el.userData=el;
		hs ='';
		hs+='bottom : 0px;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : default;';
		hs+='height : auto;';
		hs+='left : calc(50% - ((140px + 0px) / 2) + 0px);';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 100%';
		hs='';
		hs+='pointer-events: none;';
		hs+='background : rgba(0,0,0,0.196078);';
		hs+='border : 0px solid #000000;';
		hs+='box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='font-size: 12px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: pre-line;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._hs_tt.ggUpdateText=function() {
			var params = [];
			params.push(String(player._(me.hotspot.title)));
			var hs = player._("%1", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._hs_tt.ggUpdateText();
		player.addListener('changenode', function() {
			me._hs_tt.ggUpdateText();
		});
		el.appendChild(els);
		me._hs_tt.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me._hs_preview_image.ggNodeId;
		}
		me._hs_tt.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player._(me.hotspot.title) == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hs_tt.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hs_tt.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hs_tt.style.transition='';
				if (me._hs_tt.ggCurrentLogicStateVisible == 0) {
					me._hs_tt.style.visibility="hidden";
					me._hs_tt.ggVisible=false;
				}
				else {
					me._hs_tt.style.visibility=(Number(me._hs_tt.style.opacity)>0||!me._hs_tt.style.opacity)?'inherit':'hidden';
					me._hs_tt.ggVisible=true;
				}
			}
		}
		me._hs_tt.ggUpdatePosition=function (useTransition) {
		}
		me._hs_preview_image.appendChild(me._hs_tt);
		el=me._hs_visited=document.createElement('div');
		els=me._hs_visited__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IC0yNDAgMzMyIDEzMCAxMzA7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHg9IjBweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMT'+
			'k5OS94bGluayIgeT0iMHB4Ij4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzAwMDAwMDt9Cgkuc3Qxe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CiA8ZyBpZD0iTGF5ZXJfMV8xXyIvPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0tMTIyLjEsMzQxLjVoLTEwNS44Yy0xLjQsMC0yLjYsMS4xLTIuNiwyLjZ2MTA1LjhjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDEwNS44YzEuNCwwLDIuNi0xLjEsMi42LTIuNlYzNDQuMSAgIEMtMTE5LjYsMzQyLjctMTIwLjcsMzQxLjUtMTIyLjEsMzQxLjV6IE0tMTMyLjgsMzgxLjdsLTUwLjgsNTAuOGMtMC4zLDAu'+
			'My0wLjgsMC41LTEuMiwwLjVjLTAuNSwwLTAuOS0wLjEtMS4zLTAuNWwtMzEuNy0zMS44ICAgYy0wLjctMC43LTAuNy0xLjcsMC0yLjRsMTIuNS0xMi41YzAuNy0wLjcsMS43LTAuNywyLjQsMGwxOCwxOGwzNy4xLTM3LjFjMC43LTAuNywxLjctMC43LDIuNCwwbDEyLjUsMTIuNSAgIEMtMTMyLjEsMzc5LjktMTMyLjEsMzgxLTEzMi44LDM4MS43eiIvPgogIDxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0tMTQ3LjcsMzY2LjhsLTM3LjEsMzcuMWwtMTgtMThjLTAuNy0wLjctMS43LTAuNy0yLjQsMGwtMTIuNSwxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzEuNywzMS44ICAgYzAuMywwLjMsMC44LD'+
			'AuNSwxLjMsMC41YzAuNCwwLDAuOS0wLjIsMS4yLTAuNWw1MC44LTUwLjljMC43LTAuNywwLjctMS43LDAtMi40bC0xMi41LTEyLjVDLTE0NS45LDM2Ni4xLTE0NywzNjYuMS0xNDcuNywzNjYuOHoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._hs_visited__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hs_visited";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		el.userData=el;
		hs ='';
		hs+='height : 20px;';
		hs+='position : absolute;';
		hs+='right : 5px;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 20px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._hs_visited.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me._hs_preview_image.ggNodeId;
		}
		me._hs_visited.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._hs_visited.ggIsActive() == true)) || 
				((player.nodeVisited(me._hs_visited.ggElementNodeId()) == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hs_visited.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hs_visited.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hs_visited.style.transition='';
				if (me._hs_visited.ggCurrentLogicStateVisible == 0) {
					me._hs_visited.style.visibility=(Number(me._hs_visited.style.opacity)>0||!me._hs_visited.style.opacity)?'inherit':'hidden';
					me._hs_visited.ggVisible=true;
				}
				else {
					me._hs_visited.style.visibility="hidden";
					me._hs_visited.ggVisible=false;
				}
			}
		}
		me._hs_visited.ggUpdatePosition=function (useTransition) {
		}
		me._hs_preview_image.appendChild(me._hs_visited);
		me._ht_node.appendChild(me._hs_preview_image);
		el=me._tt_ht_3d=document.createElement('div');
		els=me._tt_ht_3d__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_3d";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'translate(-50%, 0px) ' };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		el.userData=el;
		hs ='';
		hs+='z-index: 100;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : default;';
		hs+='height : auto;';
		hs+='left : calc(50% - ((0px + 2px) / 2) + 0px);';
		hs+='position : absolute;';
		hs+='top : -170px;';
		hs+='transform : translate(-50%, 0px);;';
		hs+='visibility : hidden;';
		hs+='width : auto;';
		hs+='pointer-events:none;';
		hs+='transform:translate3d(0px,0px,40px) rotateX(-90deg); font-size: 15px; -webkit-backface-visibility: hidden; backface-visibility: hidden;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 100%';
		hs='';
		hs+='pointer-events: none;';
		hs+='background : rgba(0,0,0,0.666667);';
		hs+='border : 1px solid #000000;';
		hs+='box-sizing: border-box;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='font-size: 16px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._tt_ht_3d.ggUpdateText=function() {
			var params = [];
			params.push(String(player._(me.hotspot.title)));
			var hs = player._("%1", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_ht_3d.ggUpdateText();
		player.addListener('changenode', function() {
			me._tt_ht_3d.ggUpdateText();
		});
		el.appendChild(els);
		me._tt_ht_3d.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._tt_ht_3d.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsTour() == false)) && 
				((player._(me.hotspot.title) != "")) && 
				((me.elementMouseOver['ht_node'] == true)) && 
				((player.getVariableValue('opt_3d_preview') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_3d.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_3d.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_3d.style.transition='';
				if (me._tt_ht_3d.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_3d.style.visibility=(Number(me._tt_ht_3d.style.opacity)>0||!me._tt_ht_3d.style.opacity)?'inherit':'hidden';
					me._tt_ht_3d.ggVisible=true;
				}
				else {
					me._tt_ht_3d.style.visibility="hidden";
					me._tt_ht_3d.ggVisible=false;
				}
			}
		}
		me._tt_ht_3d.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node.appendChild(me._tt_ht_3d);
		el=me.__3d_code=document.createElement('div');
		el.ggId="_3d_code";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_code ";
		el.ggType='code';
		el.userData=el;
		hs ='';
		hs+='height : 37px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : -39px;';
		hs+='visibility : inherit;';
		hs+='width : 66px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me.__3d_code.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me.__3d_code.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node.appendChild(me.__3d_code);
		el=me._ht_node_customimage=document.createElement('div');
		els=me._ht_node_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		hs ='';
		hs += 'position: absolute;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.onload=function() {me._ht_node_customimage.ggUpdatePosition();}
		el.appendChild(els);
		el.ggSubElement = els;
		hs ='';
		el.ggAltText="";
		el.ggScrollbars=false;
		el.ggUpdateText = function() {
			me._ht_node_customimage.ggSubElement.setAttribute('alt', player._(me._ht_node_customimage.ggAltText));
			me._ht_node_customimage.ggUpdateImageTranslation();
		}
		el.ggSetImage = function(img) {
			me._ht_node_customimage.ggText_untranslated = img;
			me._ht_node_customimage.ggUpdateImageTranslation();
		}
		el.ggUpdateImage = function() {
			me._ht_node_customimage.ggSubElement.style.width = '0px';
			me._ht_node_customimage.ggSubElement.style.height = '0px';
			me._ht_node_customimage.ggSubElement.src='';
			me._ht_node_customimage.ggSubElement.src=me._ht_node_customimage.ggText;
		}
		el.ggUpdateImageTranslation = function() {
			if (me._ht_node_customimage.ggText != player._(me._ht_node_customimage.ggText_untranslated)) {
				me._ht_node_customimage.ggText = player._(me._ht_node_customimage.ggText_untranslated);
				me._ht_node_customimage.ggUpdateImage()
			}
		}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=el.ggText_untranslated=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.ggUpdateText();
		el.ggId="ht_node_CustomImage";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		el.userData=el;
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : calc(50% - ((50px + 0px) / 2) + 0px);';
		hs+='position : absolute;';
		hs+='top : -140px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._ht_node_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._ht_node_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_node_customimage.style.transition='';
				if (me._ht_node_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_node_customimage.style.visibility="hidden";
					me._ht_node_customimage.ggSubElement.src='';
					me._ht_node_customimage.ggVisible=false;
				}
				else {
					me._ht_node_customimage.style.visibility=(Number(me._ht_node_customimage.style.opacity)>0||!me._ht_node_customimage.style.opacity)?'inherit':'hidden';
					me._ht_node_customimage.ggSubElement.src=me._ht_node_customimage.ggText;
					me._ht_node_customimage.ggVisible=true;
				}
			}
		}
		me._ht_node_customimage.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_node_customimage.clientWidth;
			var parentHeight = me._ht_node_customimage.clientHeight;
			var img = me._ht_node_customimage__img;
			var aspectRatioDiv = me._ht_node_customimage.clientWidth / me._ht_node_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			if (!me._ht_node_customimage.ggScrollbars || currentWidth < me._ht_node_customimage.clientWidth) {
				img.style.right='';
				img.style.left='50%';
				img.style.marginLeft='-' + currentWidth/2 + 'px';
			} else {
				img.style.right='';
				img.style.left='0px';
				img.style.marginLeft='0px';
				me._ht_node_customimage.scrollLeft=currentWidth / 2 - me._ht_node_customimage.clientWidth / 2;
			}
			if (!me._ht_node_customimage.ggScrollbars || currentHeight < me._ht_node_customimage.clientHeight) {
				img.style.bottom='';
				img.style.top='50%';
				img.style.marginTop='-' + currentHeight/2 + 'px';
			} else {
				img.style.bottom='';
				img.style.top='0px';
				img.style.marginTop='0px';
				me._ht_node_customimage.scrollTop=currentHeight / 2 - me._ht_node_customimage.clientHeight / 2;
			}
		}
		me._ht_node.appendChild(me._ht_node_customimage);
		me.elementMouseOver['ht_node']=false;
		me._chevron_white_lower.logicBlock_visible();
		me._chevron_white_lower.logicBlock_alpha();
		me._chevron_black.logicBlock_visible();
		me._chevron_black.logicBlock_alpha();
		me._chevron_white.logicBlock_visible();
		me._chevron_white.logicBlock_alpha();
		me._hs_preview_image.logicBlock_alpha();
		me._hs_tt.logicBlock_visible();
		me._hs_visited.logicBlock_visible();
		me._tt_ht_3d.logicBlock_visible();
		el = me.__3d_code;
		javascript:"";
this.onUpdatePosition=function(player,hotspot) {
var vs=player.getViewerSize();
var y=vs.height * (1/6*(1+Math.cos(player.getTilt() * Math.PI/90.0)));
var hs= 'translate3d(' + vs.margins.left.valueInPx + 'px,' + vs.margins.top.valueInPx + 'px,-1000px) perspective(500px) translate3d(0px,' + (y) + 'px,0px) ';
hs += 'rotateZ(' + ( player.getRoll()).toFixed(10) + 'deg) ';
hs += 'rotateX(' + ( player.getTilt()).toFixed(10) + 'deg) ';
hs += 'rotateY(' + (-player.getPan()).toFixed(10)  + 'deg) ';
hs += 'rotateY(' + ( hotspot.pan).toFixed(2)  + 'deg) ';
hs += 'rotateX(' + (-hotspot.tilt).toFixed(2) + 'deg) ';
hs += 'rotateX(90deg) ';
this.__div.style.transform=hs;
this.__div.style.left = vs.width / 2 + "px";
this.__div.style.top = vs.height / 2 + "px";
};
		if ((hotspot) && (hotspot.customimage)) {
			me._ht_node_customimage.style.width=hotspot.customimagewidth + 'px';
			me._ht_node_customimage.style.height=hotspot.customimageheight + 'px';
			let d = 0;
			me._ht_node_customimage.style.left='calc(50% - ' + ((hotspot.customimagewidth)/2 + 0) +'px' + ((d<0) ? ' - ' : ' + ') + d + 'px)';
		}
		me._ht_node_customimage.logicBlock_visible();
			me.ggEvent_activehotspotchanged=function() {
				me._chevron_white_lower.logicBlock_visible();
				me._chevron_black.logicBlock_visible();
				me._chevron_white.logicBlock_visible();
				me._hs_tt.logicBlock_visible();
				me._tt_ht_3d.logicBlock_visible();
				me._ht_node_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._chevron_white_lower.logicBlock_visible();
				me._chevron_black.logicBlock_visible();
				me._chevron_white.logicBlock_visible();
				me._hs_preview_image.logicBlock_alpha();
				me._hs_tt.logicBlock_visible();
				me._hs_visited.logicBlock_visible();
				me._hs_visited.logicBlock_visible();
				me._tt_ht_3d.logicBlock_visible();
				me._ht_node_customimage.logicBlock_visible();
			};
			me.ggEvent_changevisitednodes=function() {
				me._hs_visited.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._chevron_white_lower.logicBlock_visible();
				me._chevron_black.logicBlock_visible();
				me._chevron_white.logicBlock_visible();
				me._hs_preview_image.logicBlock_alpha();
				me._hs_tt.logicBlock_visible();
				me._tt_ht_3d.logicBlock_visible();
				me._ht_node_customimage.logicBlock_visible();
			};
			me.ggEvent_varchanged_opt_3d_preview=function() {
				me._hs_preview_image.logicBlock_alpha();
				me._tt_ht_3d.logicBlock_visible();
			};
			me.__div = me._ht_node;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		{
			hotspot.skinid = 'ht_node';
			hsinst = new SkinHotspotClass_ht_node(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty('SkinHotspotClass_ht_node')) {
				hotspotTemplates['SkinHotspotClass_ht_node'] = [];
			}
			hotspotTemplates['SkinHotspotClass_ht_node'].push(hsinst);
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		hotspotTemplates = {};
	}
	player.addListener('hotspotsremoved',function() {
			me.removeSkinHotspots();
	});
	me.addSkinHotspot3d=function(hotspot) {
		var hsinst = null;
		{
			hotspot.skinid = 'ht_node';
			hsinst = new SkinHotspotClass_ht_node__3d(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty('SkinHotspotClass_ht_node__3d')) {
				hotspotTemplates['SkinHotspotClass_ht_node__3d'] = [];
			}
			hotspotTemplates['SkinHotspotClass_ht_node__3d'].push(hsinst);
		}
		return (hsinst ? hsinst.__obj : null);
	}
	me.removeSkinHotspots=function() {
		hotspotTemplates = {};
	}
	player.addListener('hotspotsremoved',function() {
			me.removeSkinHotspots();
	});
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		if (player.isInVR()) return;
		me.ggCurrentTime=new Date().getTime();
		for (const id in hotspotTemplates) {
			const tmpl=hotspotTemplates[id];
			tmpl.forEach(function(hotspot) {
				if (hotspot.hotspotTimerEvent) {
					hotspot.hotspotTimerEvent();
				}
			});
		};
	};
	player.addListener('timer', me.skinTimerEvent);
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	hs='.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: normal; box-sizing: content-box; } .ggmarkdown p,.ggmarkdown h1,.ggmarkdown h2,.ggmarkdown h3,.ggmarkdown h4 { margin-top: 0px } .ggmarkdown { white-space:normal }@font-face { font-family: "Hepta Slab"; font-style: normal; font-weight: 400; src: local(""), url("$(skinbase)fonts/hepta-slab-latin-regular.woff2") format("woff2"); } .hepta_slab { font-family: "Hepta Slab", serif; }';
	hs = hs.replace(/\$\(skinbase\)/g,basePath);
	style.appendChild(document.createTextNode(hs));
	document.head.appendChild(style);
	document.addEventListener('keyup', function(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			let activeElement = document.activeElement;
			if (activeElement.classList.contains('ggskin') && activeElement.onclick) activeElement.onclick();
		}
	});
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			let activeElement = document.activeElement;
			if (activeElement.classList.contains('ggskin') && activeElement.onmousedown) activeElement.onmousedown();
		}
	});
	document.addEventListener('keyup', function(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			let activeElement = document.activeElement;
			if (activeElement.classList.contains('ggskin') && activeElement.onmouseup) activeElement.onmouseup();
		}
	});
	me.skinTimerEvent();
	document.fonts.onloadingdone = () => {
		if (me.fontsLoaded < 3) {
			me.updateSize(me.divSkin);
			me.fontsLoaded++;
		}
	}
};