import{C as pm,V as K,M as En,T as wn,Q as Bc,S as $c,a as Pe,R as gm,P as ym,b as _m,c as zc,d as xu,e as Ou,f as Fu,W as Uu,g as Bu,h as vm,B as ai,i as Oe,j as ot,k as qc,l as Or,A as $u,D as so,m as zu,G as jc,n as Hc,o as Gc,p as wm}from"./three-BjpUMhs0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Em="modulepreload",Im=function(i){return"/RoomBuilder/"+i},Wc={},Kc=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let u=function(h){return Promise.all(h.map(f=>Promise.resolve(f).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=u(t.map(h=>{if(h=Im(h),h in Wc)return;Wc[h]=!0;const f=h.endsWith(".css"),p=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${p}`))return;const v=document.createElement("link");if(v.rel=f?"stylesheet":Em,f||(v.as="script"),v.crossOrigin="",v.href=h,c&&v.setAttribute("nonce",c),document.head.appendChild(v),f)return new Promise((R,D)=>{v.addEventListener("load",R),v.addEventListener("error",()=>D(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return s.then(a=>{for(const c of a||[])c.status==="rejected"&&r(c.reason);return e().catch(r)})},Qc={type:"change"},Mo={type:"start"},qu={type:"end"},es=new gm,Yc=new ym,Tm=Math.cos(70*_m.DEG2RAD),de=new K,ke=2*Math.PI,Y={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Fr=1e-6;class bm extends pm{constructor(e,t=null){super(e,t),this.state=Y.NONE,this.target=new K,this.cursor=new K,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:En.ROTATE,MIDDLE:En.DOLLY,RIGHT:En.PAN},this.touches={ONE:wn.ROTATE,TWO:wn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new K,this._lastQuaternion=new Bc,this._lastTargetPosition=new K,this._quat=new Bc().setFromUnitVectors(e.up,new K(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new $c,this._sphericalDelta=new $c,this._scale=1,this._panOffset=new K,this._rotateStart=new Pe,this._rotateEnd=new Pe,this._rotateDelta=new Pe,this._panStart=new Pe,this._panEnd=new Pe,this._panDelta=new Pe,this._dollyStart=new Pe,this._dollyEnd=new Pe,this._dollyDelta=new Pe,this._dollyDirection=new K,this._mouse=new Pe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Sm.bind(this),this._onPointerDown=Am.bind(this),this._onPointerUp=Rm.bind(this),this._onContextMenu=Vm.bind(this),this._onMouseWheel=Dm.bind(this),this._onKeyDown=km.bind(this),this._onTouchStart=Mm.bind(this),this._onTouchMove=Nm.bind(this),this._onMouseDown=Pm.bind(this),this._onMouseMove=Cm.bind(this),this._interceptControlDown=Lm.bind(this),this._interceptControlUp=xm.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Qc),this.update(),this.state=Y.NONE}update(e=null){const t=this.object.position;de.copy(t).sub(this.target),de.applyQuaternion(this._quat),this._spherical.setFromVector3(de),this.autoRotate&&this.state===Y.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=ke:n>Math.PI&&(n-=ke),s<-Math.PI?s+=ke:s>Math.PI&&(s-=ke),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(de.setFromSpherical(this._spherical),de.applyQuaternion(this._quatInverse),t.copy(this.target).add(de),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const c=de.length();a=this._clampDistance(c*this._scale);const u=c-a;this.object.position.addScaledVector(this._dollyDirection,u),this.object.updateMatrixWorld(),r=!!u}else if(this.object.isOrthographicCamera){const c=new K(this._mouse.x,this._mouse.y,0);c.unproject(this.object);const u=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=u!==this.object.zoom;const h=new K(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(c),this.object.updateMatrixWorld(),a=de.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(es.origin.copy(this.object.position),es.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(es.direction))<Tm?this.object.lookAt(this.target):(Yc.setFromNormalAndCoplanarPoint(this.object.up,this.target),es.intersectPlane(Yc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Fr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Fr||this._lastTargetPosition.distanceToSquared(this.target)>Fr?(this.dispatchEvent(Qc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ke/60*this.autoRotateSpeed*e:ke/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){de.setFromMatrixColumn(t,0),de.multiplyScalar(-e),this._panOffset.add(de)}_panUp(e,t){this.screenSpacePanning===!0?de.setFromMatrixColumn(t,1):(de.setFromMatrixColumn(t,0),de.crossVectors(this.object.up,de)),de.multiplyScalar(e),this._panOffset.add(de)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;de.copy(s).sub(this.target);let r=de.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,c=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ke*this._rotateDelta.x/t.clientHeight),this._rotateUp(ke*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ke*this._rotateDelta.x/t.clientHeight),this._rotateUp(ke*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,c=(e.pageY+t.y)*.5;this._updateZoomParameters(a,c)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Pe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Am(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Sm(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Rm(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(qu),this.state=Y.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Pm(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case En.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Y.DOLLY;break;case En.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Y.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Y.ROTATE}break;case En.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Y.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Y.PAN}break;default:this.state=Y.NONE}this.state!==Y.NONE&&this.dispatchEvent(Mo)}function Cm(i){switch(this.state){case Y.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Y.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Y.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Dm(i){this.enabled===!1||this.enableZoom===!1||this.state!==Y.NONE||(i.preventDefault(),this.dispatchEvent(Mo),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(qu))}function km(i){this.enabled!==!1&&this._handleKeyDown(i)}function Mm(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case wn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Y.TOUCH_ROTATE;break;case wn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Y.TOUCH_PAN;break;default:this.state=Y.NONE}break;case 2:switch(this.touches.TWO){case wn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Y.TOUCH_DOLLY_PAN;break;case wn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Y.TOUCH_DOLLY_ROTATE;break;default:this.state=Y.NONE}break;default:this.state=Y.NONE}this.state!==Y.NONE&&this.dispatchEvent(Mo)}function Nm(i){switch(this._trackPointer(i),this.state){case Y.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Y.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Y.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Y.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Y.NONE}}function Vm(i){this.enabled!==!1&&i.preventDefault()}function Lm(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function xm(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class ts{scene;camera;renderer;roomMesh;furnitureMeshes=new Map;furniture=[];boundingBoxes=new Map;controls;container;manipulationMode="none";selectedFurnitureId=null;roomDimensions=null;raycaster=new zc;mouse=new Pe;isDragging=!1;dragStartPosition=new K;dragOffset=new K;lastMousePosition=new Pe;snapToGrid=!0;gridSize=.5;selectionBox=null;dragHandles=null;handleMeshes=new Map;isDraggingHandle=!1;activeHandle=null;appInstance=null;constructor(e,t){this.container=e,this.appInstance=t,this.initializeScene(),this.setupLighting(),this.setupControls(),this.animate()}initializeScene(){this.scene=new xu,this.scene.background=new Ou(15790320);const e=this.getContainerWidth(),t=this.getContainerHeight();this.camera=new Fu(75,e/t,.1,1e3),this.camera.position.set(10,10,10),this.camera.lookAt(0,0,0),this.renderer=new Uu({antialias:!0}),this.renderer.setSize(e,t),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Bu,this.renderer.outputColorSpace=vm,this.container.appendChild(this.renderer.domElement),window.addEventListener("resize",()=>this.onWindowResize()),window.ResizeObserver&&new ResizeObserver(()=>this.onWindowResize()).observe(this.container)}createRoom(e){this.roomDimensions=e;try{this.roomMesh&&this.scene.remove(this.roomMesh);const t=new ai(e.width,e.height,e.length),n=new Oe({color:16777215,transparent:!0,opacity:.1,wireframe:!0});this.roomMesh=new ot(t,n),this.roomMesh.position.y=e.height/2,this.scene.add(this.roomMesh);const s=new qc(e.width,e.length),r=new Oe({color:9127187,transparent:!0,opacity:.8}),a=new ot(s,r);a.rotation.x=-Math.PI/2,a.position.y=0,a.receiveShadow=!0,this.scene.add(a);const c=new ot(s,r);c.rotation.x=Math.PI/2,c.position.y=e.height,this.scene.add(c);const u=Math.max(e.width,e.length,e.height),h=Math.min(u*1.2,30);this.camera.position.set(h,e.height*.6,h),this.camera.lookAt(0,e.height*.3,0),this.controls.target.set(0,e.height*.3,0),this.controls.reset(),this.controls.update(),setTimeout(()=>{this.onWindowResize()},100),this.setupClickHandling()}catch(t){throw console.error("Error creating room:",t),t}}addFurniture(e){const t=new ai(e.width,e.height,e.depth),n=new Oe({color:e.color}),s=new ot(t,n);s.position.set(e.x,e.y,e.z);const a=(typeof e.rotation=="number"?e.rotation:0)*(Math.PI/180);s.rotation.y=a,s.castShadow=!0,s.receiveShadow=!0,s.userData={furnitureId:e.id,furniture:e},s.name=e.name,this.addFurnitureLabel(s,e.name),this.scene.add(s),this.furnitureMeshes.set(e.id,s),this.createBoundingBox(s,e.id),this.furniture.push(e)}removeFurniture(e){const t=this.furnitureMeshes.get(e);t&&(this.scene.remove(t),this.furnitureMeshes.delete(e));const n=this.boundingBoxes.get(e);n&&(this.scene.remove(n),this.boundingBoxes.delete(e)),this.furniture=this.furniture.filter(s=>s.id!==e)}clearAllFurniture(){this.furnitureMeshes.forEach((e,t)=>{this.scene.remove(e)}),this.furnitureMeshes.clear(),this.boundingBoxes.forEach((e,t)=>{this.scene.remove(e)}),this.boundingBoxes.clear(),this.furniture=[]}addFurnitureLabel(e,t){}createBoundingBox(e,t){const n=new Or(e,65280);n.visible=!0,this.scene.add(n),this.boundingBoxes.set(t,n)}setupLighting(){const e=new $u(4210752,.6);this.scene.add(e);const t=new so(16777215,.8);t.position.set(10,10,5),t.castShadow=!0,t.shadow.mapSize.width=2048,t.shadow.mapSize.height=2048,this.scene.add(t);const n=new zu(16777215,.5,100);n.position.set(0,5,0),this.scene.add(n)}setupControls(){this.controls=new bm(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.enableZoom=!0,this.controls.enablePan=!0,this.controls.enableRotate=!0,this.controls.minDistance=5,this.controls.maxDistance=100}animate(){requestAnimationFrame(()=>this.animate()),this.controls&&this.controls.update(),this.renderer.render(this.scene,this.camera)}getContainerWidth(){const e=this.container.clientWidth||this.container.offsetWidth;if(e>0)return e;const t=this.container.parentElement?.clientWidth||window.innerWidth;return Math.max(t*.75,800)}getContainerHeight(){const e=this.container.clientHeight||this.container.offsetHeight;return e>0?e:Math.max(window.innerHeight-70,400)}onWindowResize(){requestAnimationFrame(()=>{const e=this.getContainerWidth(),t=this.getContainerHeight();e>0&&t>0&&(this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.controls&&this.controls.update())})}render(){this.renderer.render(this.scene,this.camera)}getFurnitureAtPosition(e,t){const n=new zc,s=new Pe;s.x=e/this.container.clientWidth*2-1,s.y=-(t/this.container.clientHeight)*2+1,n.setFromCamera(s,this.camera);const r=Array.from(this.furnitureMeshes.values()),a=n.intersectObjects(r);return a.length>0?a[0].object.userData.furniture:null}highlightFurniture(e,t){const n=this.furnitureMeshes.get(e);if(n){const s=n.material;t?(s.emissive.setHex(4473924),s.opacity=.8):(s.emissive.setHex(0),s.opacity=1)}}captureThumbnail(){try{return this.renderer.render(this.scene,this.camera),this.renderer.domElement.toDataURL("image/png")}catch(e){return console.error("Error capturing thumbnail:",e),""}}setManipulationMode(e){this.manipulationMode=e,this.selectedFurnitureId&&(this.highlightFurniture(this.selectedFurnitureId,!1),this.selectedFurnitureId=null),this.controls.enabled=e==="none"||e==="view"}getManipulationMode(){return this.manipulationMode}getSelectedFurnitureId(){return this.selectedFurnitureId}setupClickHandling(){this.renderer.domElement.addEventListener("click",e=>{this.handleClick(e)}),this.renderer.domElement.addEventListener("mousedown",e=>{this.handleMouseDown(e)}),this.renderer.domElement.addEventListener("mousemove",e=>{this.handleMouseMove(e)}),this.renderer.domElement.addEventListener("mouseup",e=>{this.handleMouseUp(e)}),this.renderer.domElement.addEventListener("contextmenu",e=>{this.isDragging&&e.preventDefault()})}handleClick(e){if(this.isDragging||this.manipulationMode==="none")return;const t=this.renderer.domElement.getBoundingClientRect();this.mouse.x=(e.clientX-t.left)/t.width*2-1,this.mouse.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const n=Array.from(this.furnitureMeshes.values()),s=this.raycaster.intersectObjects(n);if(s.length>0){const r=s[0].object,a=this.getFurnitureIdFromMesh(r);a&&this.selectFurniture(a)}else this.deselectFurniture()}handleMouseDown(e){if(e.button!==0||this.manipulationMode==="none")return;const t=this.renderer.domElement.getBoundingClientRect();if(this.mouse.x=(e.clientX-t.left)/t.width*2-1,this.mouse.y=-((e.clientY-t.top)/t.height)*2+1,this.lastMousePosition.set(this.mouse.x,this.mouse.y),this.raycaster.setFromCamera(this.mouse,this.camera),this.dragHandles){const r=this.raycaster.intersectObject(this.dragHandles,!0);if(r.length>0){const a=r[0].object;if(a.userData.isHandle){e.stopPropagation(),e.preventDefault(),a.userData.type==="rotate"?this.startRotation(a.userData.axis):this.startHandleDrag(a.userData.axis);return}}}const n=Array.from(this.furnitureMeshes.values()),s=this.raycaster.intersectObjects(n);if(s.length>0){const r=s[0].object,a=this.getFurnitureIdFromMesh(r);if(a){this.selectFurniture(a),this.isDragging=!0,this.selectedFurnitureId=a;const c=this.getIntersectionWithFloor(this.mouse);c&&(this.dragStartPosition.copy(c),this.dragOffset.copy(r.position).sub(c)),this.renderer.domElement.style.cursor="grabbing",this.container.classList.add("dragging"),this.controls.enabled=!1}}else this.selectedFurnitureId&&this.deselectFurniture()}handleMouseMove(e){if(this.manipulationMode==="none")return;const t=this.renderer.domElement.getBoundingClientRect();if(this.mouse.x=(e.clientX-t.left)/t.width*2-1,this.mouse.y=-((e.clientY-t.top)/t.height)*2+1,this.isDragging&&this.selectedFurnitureId)if(this.isDraggingHandle)this.handleHandleDrag();else{const n=this.getIntersectionWithFloor(this.mouse);if(n){let s=n.clone().add(this.dragOffset);this.snapToGrid&&(s=this.snapPositionToGrid(s));const r=this.constrainToRoomBoundaries(s,this.selectedFurnitureId),a=this.furnitureMeshes.get(this.selectedFurnitureId);a&&(a.position.copy(r),this.updateSelectionVisuals())}}else this.handleHoverEffects()}handleMouseUp(e){this.isDragging&&(this.isDragging=!1,this.isDraggingHandle=!1,this.activeHandle=null,this.renderer.domElement.style.cursor="grab",this.container.classList.remove("dragging"),this.controls.enabled=!0,this.selectedFurnitureId&&this.container.dispatchEvent(new CustomEvent("furnitureDragged",{detail:{furnitureId:this.selectedFurnitureId,position:this.getFurniturePosition(this.selectedFurnitureId)}})))}getIntersectionWithFloor(e){this.raycaster.setFromCamera(e,this.camera);const t=new qc(1e3,1e3),n=new ot(t);n.rotation.x=-Math.PI/2,n.position.y=0;const s=this.raycaster.intersectObject(n);return s.length>0?s[0].point:null}snapPositionToGrid(e){const t=e.clone();return t.x=Math.round(e.x/this.gridSize)*this.gridSize,t.z=Math.round(e.z/this.gridSize)*this.gridSize,t}setSnapToGrid(e){this.snapToGrid=e}setGridSize(e){this.gridSize=e}createSelectionVisuals(e){const t=this.furnitureMeshes.get(e);t&&(this.clearSelection(),this.selectionBox=new Or(t,65280),this.scene.add(this.selectionBox),this.createDragHandles(t))}createDragHandles(e){this.dragHandles=new jc;const t=new Hc().setFromObject(e),n=t.getSize(new K),s=t.getCenter(new K),r=Math.max(n.x,n.y,n.z),c=Math.max(.1,Math.min(.5,r*.15)),u=Math.max(.2,Math.min(1,r*.4)),h=Math.max(.1,Math.min(.6,c*3)),f=Math.max(.1,r*.1),p=this.createHandle("x+",new K(s.x+n.x/2+f,s.y,s.z),new K(u,c,c),16711680);this.dragHandles.add(p),this.handleMeshes.set("x+",p);const v=this.createHandle("x-",new K(s.x-n.x/2-f,s.y,s.z),new K(u,c,c),16737894);this.dragHandles.add(v),this.handleMeshes.set("x-",v);const R=this.createRotationSphere("x-rot",new K(s.x+n.x/2+f+u/2+h/2,s.y,s.z),h,16711680);this.dragHandles.add(R),this.handleMeshes.set("x-rot",R);const D=this.createHandle("y+",new K(s.x,s.y+n.y/2+f,s.z),new K(c,u,c),65280);this.dragHandles.add(D),this.handleMeshes.set("y+",D);const N=this.createHandle("y-",new K(s.x,s.y-n.y/2-f,s.z),new K(c,u,c),6750054);this.dragHandles.add(N),this.handleMeshes.set("y-",N);const C=this.createRotationSphere("y-rot",new K(s.x,s.y+n.y/2+f+u/2+h/2,s.z),h,65280);this.dragHandles.add(C),this.handleMeshes.set("y-rot",C);const B=this.createHandle("z+",new K(s.x,s.y,s.z+n.z/2+f),new K(c,c,u),255);this.dragHandles.add(B),this.handleMeshes.set("z+",B);const z=this.createHandle("z-",new K(s.x,s.y,s.z-n.z/2-f),new K(c,c,u),6711039);this.dragHandles.add(z),this.handleMeshes.set("z-",z);const q=this.createRotationSphere("z-rot",new K(s.x,s.y,s.z+n.z/2+f+u/2+h/2),h,255);this.dragHandles.add(q),this.handleMeshes.set("z-rot",q),this.scene.add(this.dragHandles)}createCubeLogo(){const e=new jc,t=new ai(1,1,1),n=new Oe({color:3447003}),s=new Oe({color:16777215}),r=new Oe({color:15528177}),a=new ot(t,[s,s,n,s,s,r]);a.position.set(0,0,0),a.castShadow=!0,a.receiveShadow=!0,e.add(a);const c=new so(16777215,.8);return c.position.set(2,2,2),e.add(c),e}createHandle(e,t,n,s){const r=new ai(n.x,n.y,n.z),a=new Gc({color:s,transparent:!0,opacity:.9,wireframe:!1}),c=new ot(r,a);return c.position.copy(t),c.userData={axis:e,isHandle:!0,type:"move"},c}createRotationSphere(e,t,n,s){const r=new wm(n,16,16),a=new Gc({color:s,transparent:!0,opacity:.9,wireframe:!1}),c=new ot(r,a);return c.position.copy(t),c.userData={axis:e,isHandle:!0,type:"rotate"},c}clearSelection(){this.selectionBox&&(this.scene.remove(this.selectionBox),this.selectionBox=null),this.dragHandles&&(this.scene.remove(this.dragHandles),this.dragHandles=null),this.handleMeshes.clear()}handleHandleDrag(){if(!this.selectedFurnitureId||!this.activeHandle)return;const e=this.furnitureMeshes.get(this.selectedFurnitureId);if(!e)return;const t=new Pe(this.mouse.x-this.lastMousePosition.x,this.mouse.y-this.lastMousePosition.y),n=8;let r=e.position.clone().clone();switch(this.activeHandle){case"x+":r.x+=t.x*n;break;case"x-":r.x-=t.x*n;break;case"y+":r.y+=t.y*n;break;case"y-":r.y-=t.y*n;break;case"z+":r.z+=t.x*n;break;case"z-":r.z-=t.x*n;break}this.snapToGrid&&!this.activeHandle.startsWith("y")&&(r=this.snapPositionToGrid(r));const a=this.constrainToRoomBoundaries(r,this.selectedFurnitureId);e.position.copy(a),this.updateSelectionVisuals(),this.container.dispatchEvent(new CustomEvent("furnitureDragged",{detail:{furnitureId:this.selectedFurnitureId,position:a}})),this.lastMousePosition.set(this.mouse.x,this.mouse.y)}updateSelectionVisuals(){if(!this.selectedFurnitureId)return;if(this.selectionBox){this.scene.remove(this.selectionBox);const t=this.furnitureMeshes.get(this.selectedFurnitureId);t&&(this.selectionBox=new Or(t,65280),this.scene.add(this.selectionBox))}const e=this.boundingBoxes.get(this.selectedFurnitureId);if(e){this.scene.remove(e);const t=this.furnitureMeshes.get(this.selectedFurnitureId);t&&this.createBoundingBox(t,this.selectedFurnitureId)}if(this.dragHandles){this.scene.remove(this.dragHandles);const t=this.furnitureMeshes.get(this.selectedFurnitureId);t&&this.createDragHandles(t)}}handleHoverEffects(){if(!this.dragHandles)return;this.raycaster.setFromCamera(this.mouse,this.camera);const e=this.raycaster.intersectObject(this.dragHandles,!0);if(this.handleMeshes.forEach(t=>{const n=t.material;n.opacity=.7,t.scale.set(1,1,1)}),e.length>0){const t=e[0].object;if(t.userData.isHandle){const n=t.material;n.opacity=1,t.scale.set(1.1,1.1,1.1),this.renderer.domElement.style.cursor=t.userData.type==="rotate"?"grab":"ew-resize"}}else this.renderer.domElement.style.cursor="default"}startHandleDrag(e){this.isDraggingHandle=!0,this.activeHandle=e,this.isDragging=!0,this.lastMousePosition.set(this.mouse.x,this.mouse.y),this.controls.enabled=!1,this.renderer.domElement.style.cursor="grabbing"}isPositionValid(e,t){if(!this.roomDimensions)return!0;const n=this.roomDimensions.width/2,s=this.roomDimensions.length/2,r=this.roomDimensions.height;if(!t)return e.x>=-n+.1&&e.x<=n-.1&&e.y>=.1&&e.y<=r-.1&&e.z>=-s+.1&&e.z<=s-.1;const a=this.furniture.find(C=>C.id===t);if(!a)return!0;const c=a.rotation||0,u=Math.abs(Math.cos(c)),h=Math.abs(Math.sin(c)),f=a.width*u+a.depth*h,p=a.width*h+a.depth*u,v=a.height,R=f/2,D=v/2,N=p/2;return e.x>=-n+R+.1&&e.x<=n-R-.1&&e.y>=D&&e.y<=r-D-.1&&e.z>=-s+N+.1&&e.z<=s-N-.1}startRotation(e){if(!this.selectedFurnitureId)return;const t=this.furnitureMeshes.get(this.selectedFurnitureId);if(!t)return;const n=Math.PI/4;let s=t.rotation.clone();switch(e){case"x-rot":s.x+=n;break;case"y-rot":s.y+=n;break;case"z-rot":s.z+=n;break}this.isRotationValid(t,s)&&(t.rotation.copy(s),this.updateSelectionVisuals(),this.appInstance&&this.appInstance.updateFurnitureRotation&&this.appInstance.updateFurnitureRotation(this.selectedFurnitureId,s.y))}isRotationValid(e,t){if(!this.roomDimensions)return!0;const n=e.clone();n.rotation.copy(t);const s=new Hc().setFromObject(n),r=s.getSize(new K),a=s.getCenter(new K),c=this.roomDimensions.width/2,u=this.roomDimensions.length/2,h=this.roomDimensions.height/2;return a.x-r.x/2>=-c&&a.x+r.x/2<=c&&a.z-r.z/2>=-u&&a.z+r.z/2<=u&&a.y+r.y/2<=h}selectFurniture(e){if(this.manipulationMode==="delete"){this.removeFurniture(e),this.container.dispatchEvent(new CustomEvent("furnitureDeleted",{detail:{furnitureId:e}}));return}if(this.manipulationMode==="view"){this.selectedFurnitureId=e,this.highlightFurniture(e,!0),this.container.dispatchEvent(new CustomEvent("furnitureSelected",{detail:{furnitureId:e,mode:"view"}}));return}this.selectedFurnitureId&&(this.highlightFurniture(this.selectedFurnitureId,!1),this.clearSelection()),this.selectedFurnitureId=e,this.highlightFurniture(e,!0),this.createSelectionVisuals(e),(this.manipulationMode==="move"||this.manipulationMode==="rotate"||this.manipulationMode==="delete")&&(this.controls.enabled=!1),this.container.dispatchEvent(new CustomEvent("furnitureSelected",{detail:{furnitureId:e,mode:this.manipulationMode}}))}deselectFurniture(){this.selectedFurnitureId&&(this.highlightFurniture(this.selectedFurnitureId,!1),this.clearSelection(),this.selectedFurnitureId=null,this.isDraggingHandle=!1,this.activeHandle=null,this.controls.enabled=this.manipulationMode==="none"||this.manipulationMode==="view",this.container.dispatchEvent(new CustomEvent("furnitureDeselected",{detail:{mode:this.manipulationMode}})))}getFurnitureIdFromMesh(e){for(const[t,n]of this.furnitureMeshes)if(n===e)return t;return null}moveFurniture(e,t){const n=this.furnitureMeshes.get(e);return!n||!this.roomDimensions?!1:this.isPositionValid(new K(t.x,t.y,t.z),e)?(n.position.set(t.x,t.y,t.z),!0):!1}rotateFurniture(e,t){const n=this.furnitureMeshes.get(e);if(!n)return!1;const s=t==="clockwise"?Math.PI/4:-Math.PI/4;n.rotation.y+=s;const r=this.furniture.find(a=>a.id===e);if(r){const a=n.rotation.y*180/Math.PI;r.rotation=a,n.userData.furniture.rotation=a}return!0}constrainToRoomBoundaries(e,t){if(!this.roomDimensions)return e;const n=this.furniture.find(E=>E.id===t);if(!n)return e;const s=n.width,r=n.height,a=n.depth,c=n.rotation||0,u=this.roomDimensions.width/2,h=this.roomDimensions.length/2,f=this.roomDimensions.height,p=Math.abs(Math.cos(c)),v=Math.abs(Math.sin(c)),R=s*p+a*v,D=s*v+a*p,N=r,C=R/2,B=N/2,z=D/2,q=.1,ge=Math.max(-u+C+q,Math.min(u-C-q,e.x)),we=Math.max(B,Math.min(f-B-q,e.y)),re=Math.max(-h+z+q,Math.min(h-z-q,e.z));return{x:ge,y:we,z:re}}toggleBoundingBoxes(e){this.boundingBoxes.forEach((t,n)=>{t.visible=e})}getFurniturePosition(e){const t=this.furnitureMeshes.get(e);return t?{x:t.position.x,y:t.position.y,z:t.position.z}:null}getFurnitureRotation(e){const t=this.furnitureMeshes.get(e);return t?t.rotation.y*180/Math.PI:0}resetView(){if(!this.roomDimensions)return;const e=Math.max(this.roomDimensions.width,this.roomDimensions.length)*2;this.camera.position.set(e,e,e),this.camera.lookAt(0,0,0),this.controls.target.set(0,0,0),this.controls.update()}}class Xc{furniture=[];templates=[{name:"Twin Bed",type:"bed",dimensions:{width:2.5,height:1.5,depth:6.25},color:3100495,price:300,category:"bedroom",description:'Standard twin size bed (30" x 75")'},{name:"Twin XL Bed",type:"bed",dimensions:{width:2.5,height:1.5,depth:6.75},color:3100495,price:350,category:"bedroom",description:'Twin XL bed (30" x 81")'},{name:"Full Bed",type:"bed",dimensions:{width:4.5,height:1.5,depth:6.25},color:3100495,price:500,category:"bedroom",description:'Full size bed (54" x 75")'},{name:"Queen Bed",type:"bed",dimensions:{width:5,height:1.5,depth:6.67},color:3100495,price:600,category:"bedroom",description:'Queen size bed (60" x 80")'},{name:"King Bed",type:"bed",dimensions:{width:6.33,height:1.5,depth:6.67},color:3100495,price:800,category:"bedroom",description:'King size bed (76" x 80")'},{name:"California King Bed",type:"bed",dimensions:{width:6,height:1.5,depth:7},color:3100495,price:850,category:"bedroom",description:'California King bed (72" x 84")'},{name:"Dining Chair",type:"chair",dimensions:{width:1.5,height:3,depth:1.5},color:9127187,price:120,category:"seating",description:"Standard dining chair"},{name:"Office Chair",type:"chair",dimensions:{width:2,height:3.5,depth:2},color:4286945,price:200,category:"seating",description:"Ergonomic office chair"},{name:"2-Seat Sofa",type:"sofa",dimensions:{width:5,height:2.5,depth:2.5},color:4286945,price:600,category:"seating",description:"2-seat loveseat"},{name:"3-Seat Sofa",type:"sofa",dimensions:{width:7,height:2.5,depth:2.5},color:4286945,price:800,category:"seating",description:"3-seat sofa"},{name:"Sectional Sofa",type:"sofa",dimensions:{width:8,height:2.5,depth:3},color:4286945,price:1200,category:"seating",description:"Large sectional sofa"},{name:"Coffee Table",type:"table",dimensions:{width:3,height:1.25,depth:1.5},color:6636321,price:250,category:"functional",description:"Standard coffee table"},{name:"End Table",type:"table",dimensions:{width:1.5,height:1.5,depth:1.5},color:6636321,price:150,category:"functional",description:"Side/end table"},{name:"Dining Table (4-seat)",type:"table",dimensions:{width:3,height:2.5,depth:2},color:9127187,price:400,category:"functional",description:"4-person dining table"},{name:"Dining Table (6-seat)",type:"table",dimensions:{width:4,height:2.5,depth:2.5},color:9127187,price:500,category:"functional",description:"6-person dining table"},{name:"Dining Table (8-seat)",type:"table",dimensions:{width:5,height:2.5,depth:3},color:9127187,price:600,category:"functional",description:"8-person dining table"},{name:"Desk",type:"table",dimensions:{width:4,height:2.5,depth:2},color:6636321,price:300,category:"functional",description:"Standard office desk"},{name:"Dresser",type:"storage",dimensions:{width:3,height:2.5,depth:1.5},color:9127187,price:400,category:"storage",description:"Standard dresser"},{name:"Nightstand",type:"storage",dimensions:{width:1.5,height:1.5,depth:1.5},color:9127187,price:150,category:"storage",description:"Bedside nightstand"},{name:"Bookshelf",type:"storage",dimensions:{width:2,height:5,depth:1},color:6636321,price:200,category:"storage",description:"Tall bookshelf"},{name:"Wardrobe",type:"storage",dimensions:{width:2,height:6,depth:1.5},color:9127187,price:500,category:"storage",description:"Standalone wardrobe"},{name:"Floor Lamp",type:"lamp",dimensions:{width:1,height:5,depth:1},color:0,price:80,category:"lighting",description:"Modern floor lamp"},{name:"Table Lamp",type:"lamp",dimensions:{width:.5,height:1.5,depth:.5},color:0,price:50,category:"lighting",description:"Standard table lamp"},{name:"Ceiling Fan",type:"lighting",dimensions:{width:2,height:.5,depth:2},color:0,price:150,category:"lighting",description:"Ceiling fan with light"}];addFurniture(e,t){const n={id:this.generateId(),name:e.name,type:e.type,width:e.dimensions.width,height:e.dimensions.height,depth:e.dimensions.depth,x:t.x,y:t.y,z:t.z,rotation:t.rotation,color:e.color,price:e.price,category:e.category,brand:e.brand,productUrl:e.productUrl,reasoning:e.reasoning,description:e.description};return this.furniture.push(n),n}removeFurniture(e){const t=this.furniture.findIndex(n=>n.id===e);return t!==-1?(this.furniture.splice(t,1),!0):!1}updateFurniturePosition(e,t){const n=this.furniture.find(s=>s.id===e);return n?(n.x=t.x,n.y=t.y,n.z=t.z,n.rotation=t.rotation,!0):!1}getFurniture(){return[...this.furniture]}getFurnitureById(e){return this.furniture.find(t=>t.id===e)}getTemplates(){return[...this.templates]}getTemplatesByCategory(e){return this.templates.filter(t=>t.category===e)}getTotalCost(){return this.furniture.reduce((e,t)=>e+(t.price||0),0)}generateId(){return Math.random().toString(36).substr(2,9)}}class Om{apiKey;baseUrl="https://generativelanguage.googleapis.com/v1beta";constructor(){this.apiKey="AIzaSyB-xcuHOeOeQQw4kMFk8YAL1M-d0vbNGjw"}async getDecorationSuggestions(e,t,n,s){try{return await this.getGeminiSuggestions(e,t,n,s)}catch(r){throw console.error("Error getting AI suggestions:",r),new Error("Unable to get AI suggestions. Please check your API key and try again.")}}async getGeminiSuggestions(e,t,n,s){if(!this.apiKey||this.apiKey==="your-gemini-api-key-here")throw new Error("Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your .env file.");const r=this.createPrompt(e,t,n,s),a=await fetch(`${this.baseUrl}/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:r}]}],generationConfig:{temperature:.7,topK:40,topP:.95,maxOutputTokens:8192}})});if(!a.ok){const h=await a.text();throw console.error("Gemini API error response:",h),new Error(`Gemini API error: ${a.status} - ${h}`)}const c=await a.json();if(!c.candidates||!c.candidates[0]||!c.candidates[0].content)throw new Error("Invalid response format from Gemini API");let u="";if(c.candidates[0].content.parts&&c.candidates[0].content.parts[0])u=c.candidates[0].content.parts[0].text;else if(c.candidates[0].content.text)u=c.candidates[0].content.text;else if(c.candidates[0].text)u=c.candidates[0].text;else if(c.candidates[0].content&&typeof c.candidates[0].content=="string")u=c.candidates[0].content;else throw new Error("Unexpected response structure from Gemini API");return this.parseAISuggestions(u,s)}createPrompt(e,t,n,s){return`You are an expert interior designer. Suggest 5 specific furniture items for a ${n} room with these exact dimensions: ${e.width}ft wide × ${e.length}ft long × ${e.height}ft high. Budget: $${s}.

Consider the room proportions:
- Floor area: ${(e.width*e.length).toFixed(1)} sq ft
- Room volume: ${(e.width*e.length*e.height).toFixed(1)} cubic ft
- Aspect ratio: ${(e.width/e.length).toFixed(2)}:1

For each suggestion, provide:
1. Specific item name (e.g., "IKEA HEMNES Dresser", "West Elm Modern Sofa")
2. Brief description
3. Estimated cost in USD
4. Category (seating, storage, lighting, decoration, functional)
5. Priority (high, medium, low)
6. Dimensions in feet (width x height x depth)
7. Brand/store where it can be purchased
8. Actual product URL (real link to the product)
9. Brief reasoning for the suggestion based on room size

Format as JSON:
{
  "suggestions": [
    {
      "item": "Specific Item Name",
      "description": "Brief description",
      "estimatedCost": 150,
      "category": "storage",
      "priority": "high",
      "dimensions": {"width": 2.5, "height": 3.0, "depth": 1.5},
      "brand": "IKEA",
      "productUrl": "https://actual-product-url.com",
      "reasoning": "Why this item fits the space"
    }
  ]
}

Focus on real, purchasable items that fit the room dimensions and budget. Consider the existing furniture and suggest complementary pieces.`}parseAISuggestions(e,t){try{const n=e.match(/\{[\s\S]*\}/);if(!n)throw new Error("No JSON found in AI response");return(JSON.parse(n[0]).suggestions||[]).filter(a=>a.estimatedCost<=t*.3).map(a=>({item:a.item||"Unknown Item",description:a.description||"AI suggested item",estimatedCost:a.estimatedCost||0,category:a.category||"decoration",priority:a.priority||"medium"})).slice(0,7)}catch(n){throw console.error("Error parsing AI suggestions:",n),new Error("Failed to parse AI suggestions. Please try again.")}}async testConnection(){try{return!this.apiKey||this.apiKey==="your-gemini-api-key-here"?!1:(await fetch(`${this.baseUrl}/models?key=${this.apiKey}`)).ok}catch{return!1}}async createFurnitureFromSuggestion(e){try{const t=await this.getFurnitureSpecification(e);return{name:e.item,type:this.mapCategoryToType(e.category),dimensions:t.dimensions||{width:2,height:2,depth:2},color:t.color||9127187,price:e.estimatedCost,category:e.category,description:e.description,brand:t.brand||e.brand,productUrl:e.productUrl,reasoning:e.reasoning,source:t.source,imageUrl:t.imageUrl}}catch(t){return console.error("Error creating furniture from suggestion:",t),{name:e.item,type:this.mapCategoryToType(e.category),dimensions:{width:2,height:2,depth:2},color:9127187,price:e.estimatedCost,category:e.category,description:e.description}}}async getFurnitureSpecification(e){const t=`Provide detailed specifications for the furniture item: "${e.item}"

Please provide:
1. Exact dimensions in feet (width x height x depth)
2. Typical color/material (provide hex color code)
3. Brand/manufacturer
4. Where to purchase (store/website)
5. Product image URL if available

Format as JSON:
{
  "dimensions": {"width": 2.5, "height": 3.0, "depth": 1.5},
  "color": "#8B4513",
  "brand": "IKEA",
  "source": "ikea.com",
  "imageUrl": "https://example.com/image.jpg"
}`;try{const n=await fetch(`${this.baseUrl}/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:t}]}]})});if(!n.ok)throw new Error("API request failed");const a=(await n.json()).candidates[0].content.parts[0].text.match(/\{[\s\S]*\}/);if(a)return JSON.parse(a[0])}catch(n){console.error("Error getting furniture specification:",n)}return{dimensions:{width:2,height:2,depth:2},color:9127187,brand:"Unknown",source:"Various retailers"}}mapCategoryToType(e){return{seating:"chair",storage:"dresser",lighting:"lamp",decoration:"decoration",functional:"table"}[e]||"decoration"}}const Fm=()=>{};var Jc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ju=function(i){const e=[];let t=0;for(let n=0;n<i.length;n++){let s=i.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<i.length&&(i.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(i.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Um=function(i){const e=[];let t=0,n=0;for(;t<i.length;){const s=i[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const r=i[t++];e[n++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=i[t++],a=i[t++],c=i[t++],u=((s&7)<<18|(r&63)<<12|(a&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{const r=i[t++],a=i[t++];e[n++]=String.fromCharCode((s&15)<<12|(r&63)<<6|a&63)}}return e.join("")},Hu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(i,e){if(!Array.isArray(i))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<i.length;s+=3){const r=i[s],a=s+1<i.length,c=a?i[s+1]:0,u=s+2<i.length,h=u?i[s+2]:0,f=r>>2,p=(r&3)<<4|c>>4;let v=(c&15)<<2|h>>6,R=h&63;u||(R=64,a||(v=64)),n.push(t[f],t[p],t[v],t[R])}return n.join("")},encodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(i):this.encodeByteArray(ju(i),e)},decodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(i):Um(this.decodeStringToByteArray(i,e))},decodeStringToByteArray(i,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<i.length;){const r=t[i.charAt(s++)],c=s<i.length?t[i.charAt(s)]:0;++s;const h=s<i.length?t[i.charAt(s)]:64;++s;const p=s<i.length?t[i.charAt(s)]:64;if(++s,r==null||c==null||h==null||p==null)throw new Bm;const v=r<<2|c>>4;if(n.push(v),h!==64){const R=c<<4&240|h>>2;if(n.push(R),p!==64){const D=h<<6&192|p;n.push(D)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let i=0;i<this.ENCODED_VALS.length;i++)this.byteToCharMap_[i]=this.ENCODED_VALS.charAt(i),this.charToByteMap_[this.byteToCharMap_[i]]=i,this.byteToCharMapWebSafe_[i]=this.ENCODED_VALS_WEBSAFE.charAt(i),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]]=i,i>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)]=i,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)]=i)}}};class Bm extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const $m=function(i){const e=ju(i);return Hu.encodeByteArray(e,!0)},ws=function(i){return $m(i).replace(/\./g,"")},Gu=function(i){try{return Hu.decodeString(i,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qm=()=>zm().__FIREBASE_DEFAULTS__,jm=()=>{if(typeof process>"u"||typeof Jc>"u")return;const i=Jc.__FIREBASE_DEFAULTS__;if(i)return JSON.parse(i)},Hm=()=>{if(typeof document>"u")return;let i;try{i=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=i&&Gu(i[1]);return e&&JSON.parse(e)},Bs=()=>{try{return Fm()||qm()||jm()||Hm()}catch(i){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${i}`);return}},Wu=i=>Bs()?.emulatorHosts?.[i],Gm=i=>{const e=Wu(i);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},Ku=()=>Bs()?.config,Qu=i=>Bs()?.[`_${i}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function On(i){try{return(i.startsWith("http://")||i.startsWith("https://")?new URL(i).hostname:i).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Yu(i){return(await fetch(i,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Km(i,e){if(i.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",s=i.iat||0,r=i.sub||i.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...i};return[ws(JSON.stringify(t)),ws(JSON.stringify(a)),""].join(".")}const di={};function Qm(){const i={prod:[],emulator:[]};for(const e of Object.keys(di))di[e]?i.emulator.push(e):i.prod.push(e);return i}function Ym(i){let e=document.getElementById(i),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",i),t=!0),{created:t,element:e}}let Zc=!1;function Xu(i,e){if(typeof window>"u"||typeof document>"u"||!On(window.location.host)||di[i]===e||di[i]||Zc)return;di[i]=e;function t(v){return`__firebase__banner__${v}`}const n="__firebase__banner",r=Qm().prod.length>0;function a(){const v=document.getElementById(n);v&&v.remove()}function c(v){v.style.display="flex",v.style.background="#7faaf0",v.style.position="fixed",v.style.bottom="5px",v.style.left="5px",v.style.padding=".5em",v.style.borderRadius="5px",v.style.alignItems="center"}function u(v,R){v.setAttribute("width","24"),v.setAttribute("id",R),v.setAttribute("height","24"),v.setAttribute("viewBox","0 0 24 24"),v.setAttribute("fill","none"),v.style.marginLeft="-6px"}function h(){const v=document.createElement("span");return v.style.cursor="pointer",v.style.marginLeft="16px",v.style.fontSize="24px",v.innerHTML=" &times;",v.onclick=()=>{Zc=!0,a()},v}function f(v,R){v.setAttribute("id",R),v.innerText="Learn more",v.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",v.setAttribute("target","__blank"),v.style.paddingLeft="5px",v.style.textDecoration="underline"}function p(){const v=Ym(n),R=t("text"),D=document.getElementById(R)||document.createElement("span"),N=t("learnmore"),C=document.getElementById(N)||document.createElement("a"),B=t("preprendIcon"),z=document.getElementById(B)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(v.created){const q=v.element;c(q),f(C,N);const ge=h();u(z,B),q.append(z,D,C,ge),document.body.appendChild(q)}r?(D.innerText="Preview backend disconnected.",z.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(z.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,D.innerText="Preview backend running in this workspace."),D.setAttribute("id",R)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Xm(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ae())}function Jm(){const i=Bs()?.forceEnvironment;if(i==="node")return!0;if(i==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Zm(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Ju(){const i=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof i=="object"&&i.id!==void 0}function ep(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function tp(){const i=Ae();return i.indexOf("MSIE ")>=0||i.indexOf("Trident/")>=0}function np(){return!Jm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Zu(){try{return typeof indexedDB=="object"}catch{return!1}}function eh(){return new Promise((i,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),i(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}function ip(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sp="FirebaseError";class Ge extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=sp,Object.setPrototypeOf(this,Ge.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,an.prototype.create)}}class an{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],a=r?rp(r,n):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new Ge(s,c,n)}}function rp(i,e){return i.replace(op,(t,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const op=/\{\$([^}]+)}/g;function ap(i){for(const e in i)if(Object.prototype.hasOwnProperty.call(i,e))return!1;return!0}function Nt(i,e){if(i===e)return!0;const t=Object.keys(i),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const r=i[s],a=e[s];if(el(r)&&el(a)){if(!Nt(r,a))return!1}else if(r!==a)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function el(i){return i!==null&&typeof i=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pi(i){const e=[];for(const[t,n]of Object.entries(i))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function cp(i,e){const t=new lp(i,e);return t.subscribe.bind(t)}class lp{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");up(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=Ur),s.error===void 0&&(s.error=Ur),s.complete===void 0&&(s.complete=Ur);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function up(i,e){if(typeof i!="object"||i===null)return!1;for(const t of e)if(t in i&&typeof i[t]=="function")return!0;return!1}function Ur(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hp=1e3,dp=2,fp=14400*1e3,mp=.5;function tl(i,e=hp,t=dp){const n=e*Math.pow(t,i),s=Math.round(mp*n*(Math.random()-.5)*2);return Math.min(fp,n+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(i){return i&&i._delegate?i._delegate:i}class je{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pp{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new Wm;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(yp(e))try{this.getOrInitializeService({instanceIdentifier:Qt})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});n.resolve(r)}catch{}}}}clearInstance(e=Qt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Qt){return this.instances.has(e)}getOptions(e=Qt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[r,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(r);n===c&&a.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const r=this.instances.get(n);return r&&e(r,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:gp(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Qt){return this.component?this.component.multipleInstances?e:Qt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function gp(i){return i===Qt?void 0:i}function yp(i){return i.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _p{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new pp(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var j;(function(i){i[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT"})(j||(j={}));const vp={debug:j.DEBUG,verbose:j.VERBOSE,info:j.INFO,warn:j.WARN,error:j.ERROR,silent:j.SILENT},wp=j.INFO,Ep={[j.DEBUG]:"log",[j.VERBOSE]:"log",[j.INFO]:"info",[j.WARN]:"warn",[j.ERROR]:"error"},Ip=(i,e,...t)=>{if(e<i.logLevel)return;const n=new Date().toISOString(),s=Ep[e];if(s)console[s](`[${n}]  ${i.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class $s{constructor(e){this.name=e,this._logLevel=wp,this._logHandler=Ip,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in j))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?vp[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,j.DEBUG,...e),this._logHandler(this,j.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,j.VERBOSE,...e),this._logHandler(this,j.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,j.INFO,...e),this._logHandler(this,j.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,j.WARN,...e),this._logHandler(this,j.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,j.ERROR,...e),this._logHandler(this,j.ERROR,...e)}}const Tp=(i,e)=>e.some(t=>i instanceof t);let nl,il;function bp(){return nl||(nl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ap(){return il||(il=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const th=new WeakMap,ro=new WeakMap,nh=new WeakMap,Br=new WeakMap,No=new WeakMap;function Sp(i){const e=new Promise((t,n)=>{const s=()=>{i.removeEventListener("success",r),i.removeEventListener("error",a)},r=()=>{t(Ct(i.result)),s()},a=()=>{n(i.error),s()};i.addEventListener("success",r),i.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&th.set(t,i)}).catch(()=>{}),No.set(e,i),e}function Rp(i){if(ro.has(i))return;const e=new Promise((t,n)=>{const s=()=>{i.removeEventListener("complete",r),i.removeEventListener("error",a),i.removeEventListener("abort",a)},r=()=>{t(),s()},a=()=>{n(i.error||new DOMException("AbortError","AbortError")),s()};i.addEventListener("complete",r),i.addEventListener("error",a),i.addEventListener("abort",a)});ro.set(i,e)}let oo={get(i,e,t){if(i instanceof IDBTransaction){if(e==="done")return ro.get(i);if(e==="objectStoreNames")return i.objectStoreNames||nh.get(i);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ct(i[e])},set(i,e,t){return i[e]=t,!0},has(i,e){return i instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in i}};function Pp(i){oo=i(oo)}function Cp(i){return i===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=i.call($r(this),e,...t);return nh.set(n,e.sort?e.sort():[e]),Ct(n)}:Ap().includes(i)?function(...e){return i.apply($r(this),e),Ct(th.get(this))}:function(...e){return Ct(i.apply($r(this),e))}}function Dp(i){return typeof i=="function"?Cp(i):(i instanceof IDBTransaction&&Rp(i),Tp(i,bp())?new Proxy(i,oo):i)}function Ct(i){if(i instanceof IDBRequest)return Sp(i);if(Br.has(i))return Br.get(i);const e=Dp(i);return e!==i&&(Br.set(i,e),No.set(e,i)),e}const $r=i=>No.get(i);function ih(i,e,{blocked:t,upgrade:n,blocking:s,terminated:r}={}){const a=indexedDB.open(i,e),c=Ct(a);return n&&a.addEventListener("upgradeneeded",u=>{n(Ct(a.result),u.oldVersion,u.newVersion,Ct(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{r&&u.addEventListener("close",()=>r()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const kp=["get","getKey","getAll","getAllKeys","count"],Mp=["put","add","delete","clear"],zr=new Map;function sl(i,e){if(!(i instanceof IDBDatabase&&!(e in i)&&typeof e=="string"))return;if(zr.get(e))return zr.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=Mp.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||kp.includes(t)))return;const r=async function(a,...c){const u=this.transaction(a,s?"readwrite":"readonly");let h=u.store;return n&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&u.done]))[0]};return zr.set(e,r),r}Pp(i=>({...i,get:(e,t,n)=>sl(e,t)||i.get(e,t,n),has:(e,t)=>!!sl(e,t)||i.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Np{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Vp(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function Vp(i){return i.getComponent()?.type==="VERSION"}const ao="@firebase/app",rl="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht=new $s("@firebase/app"),Lp="@firebase/app-compat",xp="@firebase/analytics-compat",Op="@firebase/analytics",Fp="@firebase/app-check-compat",Up="@firebase/app-check",Bp="@firebase/auth",$p="@firebase/auth-compat",zp="@firebase/database",qp="@firebase/data-connect",jp="@firebase/database-compat",Hp="@firebase/functions",Gp="@firebase/functions-compat",Wp="@firebase/installations",Kp="@firebase/installations-compat",Qp="@firebase/messaging",Yp="@firebase/messaging-compat",Xp="@firebase/performance",Jp="@firebase/performance-compat",Zp="@firebase/remote-config",eg="@firebase/remote-config-compat",tg="@firebase/storage",ng="@firebase/storage-compat",ig="@firebase/firestore",sg="@firebase/ai",rg="@firebase/firestore-compat",og="firebase",ag="12.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const co="[DEFAULT]",cg={[ao]:"fire-core",[Lp]:"fire-core-compat",[Op]:"fire-analytics",[xp]:"fire-analytics-compat",[Up]:"fire-app-check",[Fp]:"fire-app-check-compat",[Bp]:"fire-auth",[$p]:"fire-auth-compat",[zp]:"fire-rtdb",[qp]:"fire-data-connect",[jp]:"fire-rtdb-compat",[Hp]:"fire-fn",[Gp]:"fire-fn-compat",[Wp]:"fire-iid",[Kp]:"fire-iid-compat",[Qp]:"fire-fcm",[Yp]:"fire-fcm-compat",[Xp]:"fire-perf",[Jp]:"fire-perf-compat",[Zp]:"fire-rc",[eg]:"fire-rc-compat",[tg]:"fire-gcs",[ng]:"fire-gcs-compat",[ig]:"fire-fst",[rg]:"fire-fst-compat",[sg]:"fire-vertex","fire-js":"fire-js",[og]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Es=new Map,lg=new Map,lo=new Map;function ol(i,e){try{i.container.addComponent(e)}catch(t){ht.debug(`Component ${e.name} failed to register with FirebaseApp ${i.name}`,t)}}function tt(i){const e=i.name;if(lo.has(e))return ht.debug(`There were multiple attempts to register component ${e}.`),!1;lo.set(e,i);for(const t of Es.values())ol(t,i);for(const t of lg.values())ol(t,i);return!0}function cn(i,e){const t=i.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),i.container.getProvider(e)}function Be(i){return i==null?!1:i.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ug={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Dt=new an("app","Firebase",ug);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hg{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new je("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Dt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fn=ag;function sh(i,e={}){let t=i;typeof e!="object"&&(e={name:e});const n={name:co,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw Dt.create("bad-app-name",{appName:String(s)});if(t||(t=Ku()),!t)throw Dt.create("no-options");const r=Es.get(s);if(r){if(Nt(t,r.options)&&Nt(n,r.config))return r;throw Dt.create("duplicate-app",{appName:s})}const a=new _p(s);for(const u of lo.values())a.addComponent(u);const c=new hg(t,n,a);return Es.set(s,c),c}function Vo(i=co){const e=Es.get(i);if(!e&&i===co&&Ku())return sh();if(!e)throw Dt.create("no-app",{appName:i});return e}function Ue(i,e,t){let n=cg[i]??i;t&&(n+=`-${t}`);const s=n.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const a=[`Unable to register library "${n}" with version "${e}":`];s&&a.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&r&&a.push("and"),r&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ht.warn(a.join(" "));return}tt(new je(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dg="firebase-heartbeat-database",fg=1,yi="firebase-heartbeat-store";let qr=null;function rh(){return qr||(qr=ih(dg,fg,{upgrade:(i,e)=>{switch(e){case 0:try{i.createObjectStore(yi)}catch(t){console.warn(t)}}}}).catch(i=>{throw Dt.create("idb-open",{originalErrorMessage:i.message})})),qr}async function mg(i){try{const t=(await rh()).transaction(yi),n=await t.objectStore(yi).get(oh(i));return await t.done,n}catch(e){if(e instanceof Ge)ht.warn(e.message);else{const t=Dt.create("idb-get",{originalErrorMessage:e?.message});ht.warn(t.message)}}}async function al(i,e){try{const n=(await rh()).transaction(yi,"readwrite");await n.objectStore(yi).put(e,oh(i)),await n.done}catch(t){if(t instanceof Ge)ht.warn(t.message);else{const n=Dt.create("idb-set",{originalErrorMessage:t?.message});ht.warn(n.message)}}}function oh(i){return`${i.name}!${i.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pg=1024,gg=30;class yg{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new vg(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),n=cl();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(s=>s.date===n))return;if(this._heartbeatsCache.heartbeats.push({date:n,agent:t}),this._heartbeatsCache.heartbeats.length>gg){const s=wg(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ht.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=cl(),{heartbeatsToSend:t,unsentEntries:n}=_g(this._heartbeatsCache.heartbeats),s=ws(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return ht.warn(e),""}}}function cl(){return new Date().toISOString().substring(0,10)}function _g(i,e=pg){const t=[];let n=i.slice();for(const s of i){const r=t.find(a=>a.agent===s.agent);if(r){if(r.dates.push(s.date),ll(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),ll(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class vg{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Zu()?eh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await mg(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return al(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return al(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function ll(i){return ws(JSON.stringify({version:2,heartbeats:i})).length}function wg(i){if(i.length===0)return-1;let e=0,t=i[0].date;for(let n=1;n<i.length;n++)i[n].date<t&&(t=i[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eg(i){tt(new je("platform-logger",e=>new Np(e),"PRIVATE")),tt(new je("heartbeat",e=>new yg(e),"PRIVATE")),Ue(ao,rl,i),Ue(ao,rl,"esm2020"),Ue("fire-js","")}Eg("");var ul=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var kt,ah;(function(){var i;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,g){function _(){}_.prototype=g.prototype,E.F=g.prototype,E.prototype=new _,E.prototype.constructor=E,E.D=function(I,w,b){for(var y=Array(arguments.length-2),De=2;De<arguments.length;De++)y[De-2]=arguments[De];return g.prototype[w].apply(I,y)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(n,t),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,g,_){_||(_=0);const I=Array(16);if(typeof g=="string")for(var w=0;w<16;++w)I[w]=g.charCodeAt(_++)|g.charCodeAt(_++)<<8|g.charCodeAt(_++)<<16|g.charCodeAt(_++)<<24;else for(w=0;w<16;++w)I[w]=g[_++]|g[_++]<<8|g[_++]<<16|g[_++]<<24;g=E.g[0],_=E.g[1],w=E.g[2];let b=E.g[3],y;y=g+(b^_&(w^b))+I[0]+3614090360&4294967295,g=_+(y<<7&4294967295|y>>>25),y=b+(w^g&(_^w))+I[1]+3905402710&4294967295,b=g+(y<<12&4294967295|y>>>20),y=w+(_^b&(g^_))+I[2]+606105819&4294967295,w=b+(y<<17&4294967295|y>>>15),y=_+(g^w&(b^g))+I[3]+3250441966&4294967295,_=w+(y<<22&4294967295|y>>>10),y=g+(b^_&(w^b))+I[4]+4118548399&4294967295,g=_+(y<<7&4294967295|y>>>25),y=b+(w^g&(_^w))+I[5]+1200080426&4294967295,b=g+(y<<12&4294967295|y>>>20),y=w+(_^b&(g^_))+I[6]+2821735955&4294967295,w=b+(y<<17&4294967295|y>>>15),y=_+(g^w&(b^g))+I[7]+4249261313&4294967295,_=w+(y<<22&4294967295|y>>>10),y=g+(b^_&(w^b))+I[8]+1770035416&4294967295,g=_+(y<<7&4294967295|y>>>25),y=b+(w^g&(_^w))+I[9]+2336552879&4294967295,b=g+(y<<12&4294967295|y>>>20),y=w+(_^b&(g^_))+I[10]+4294925233&4294967295,w=b+(y<<17&4294967295|y>>>15),y=_+(g^w&(b^g))+I[11]+2304563134&4294967295,_=w+(y<<22&4294967295|y>>>10),y=g+(b^_&(w^b))+I[12]+1804603682&4294967295,g=_+(y<<7&4294967295|y>>>25),y=b+(w^g&(_^w))+I[13]+4254626195&4294967295,b=g+(y<<12&4294967295|y>>>20),y=w+(_^b&(g^_))+I[14]+2792965006&4294967295,w=b+(y<<17&4294967295|y>>>15),y=_+(g^w&(b^g))+I[15]+1236535329&4294967295,_=w+(y<<22&4294967295|y>>>10),y=g+(w^b&(_^w))+I[1]+4129170786&4294967295,g=_+(y<<5&4294967295|y>>>27),y=b+(_^w&(g^_))+I[6]+3225465664&4294967295,b=g+(y<<9&4294967295|y>>>23),y=w+(g^_&(b^g))+I[11]+643717713&4294967295,w=b+(y<<14&4294967295|y>>>18),y=_+(b^g&(w^b))+I[0]+3921069994&4294967295,_=w+(y<<20&4294967295|y>>>12),y=g+(w^b&(_^w))+I[5]+3593408605&4294967295,g=_+(y<<5&4294967295|y>>>27),y=b+(_^w&(g^_))+I[10]+38016083&4294967295,b=g+(y<<9&4294967295|y>>>23),y=w+(g^_&(b^g))+I[15]+3634488961&4294967295,w=b+(y<<14&4294967295|y>>>18),y=_+(b^g&(w^b))+I[4]+3889429448&4294967295,_=w+(y<<20&4294967295|y>>>12),y=g+(w^b&(_^w))+I[9]+568446438&4294967295,g=_+(y<<5&4294967295|y>>>27),y=b+(_^w&(g^_))+I[14]+3275163606&4294967295,b=g+(y<<9&4294967295|y>>>23),y=w+(g^_&(b^g))+I[3]+4107603335&4294967295,w=b+(y<<14&4294967295|y>>>18),y=_+(b^g&(w^b))+I[8]+1163531501&4294967295,_=w+(y<<20&4294967295|y>>>12),y=g+(w^b&(_^w))+I[13]+2850285829&4294967295,g=_+(y<<5&4294967295|y>>>27),y=b+(_^w&(g^_))+I[2]+4243563512&4294967295,b=g+(y<<9&4294967295|y>>>23),y=w+(g^_&(b^g))+I[7]+1735328473&4294967295,w=b+(y<<14&4294967295|y>>>18),y=_+(b^g&(w^b))+I[12]+2368359562&4294967295,_=w+(y<<20&4294967295|y>>>12),y=g+(_^w^b)+I[5]+4294588738&4294967295,g=_+(y<<4&4294967295|y>>>28),y=b+(g^_^w)+I[8]+2272392833&4294967295,b=g+(y<<11&4294967295|y>>>21),y=w+(b^g^_)+I[11]+1839030562&4294967295,w=b+(y<<16&4294967295|y>>>16),y=_+(w^b^g)+I[14]+4259657740&4294967295,_=w+(y<<23&4294967295|y>>>9),y=g+(_^w^b)+I[1]+2763975236&4294967295,g=_+(y<<4&4294967295|y>>>28),y=b+(g^_^w)+I[4]+1272893353&4294967295,b=g+(y<<11&4294967295|y>>>21),y=w+(b^g^_)+I[7]+4139469664&4294967295,w=b+(y<<16&4294967295|y>>>16),y=_+(w^b^g)+I[10]+3200236656&4294967295,_=w+(y<<23&4294967295|y>>>9),y=g+(_^w^b)+I[13]+681279174&4294967295,g=_+(y<<4&4294967295|y>>>28),y=b+(g^_^w)+I[0]+3936430074&4294967295,b=g+(y<<11&4294967295|y>>>21),y=w+(b^g^_)+I[3]+3572445317&4294967295,w=b+(y<<16&4294967295|y>>>16),y=_+(w^b^g)+I[6]+76029189&4294967295,_=w+(y<<23&4294967295|y>>>9),y=g+(_^w^b)+I[9]+3654602809&4294967295,g=_+(y<<4&4294967295|y>>>28),y=b+(g^_^w)+I[12]+3873151461&4294967295,b=g+(y<<11&4294967295|y>>>21),y=w+(b^g^_)+I[15]+530742520&4294967295,w=b+(y<<16&4294967295|y>>>16),y=_+(w^b^g)+I[2]+3299628645&4294967295,_=w+(y<<23&4294967295|y>>>9),y=g+(w^(_|~b))+I[0]+4096336452&4294967295,g=_+(y<<6&4294967295|y>>>26),y=b+(_^(g|~w))+I[7]+1126891415&4294967295,b=g+(y<<10&4294967295|y>>>22),y=w+(g^(b|~_))+I[14]+2878612391&4294967295,w=b+(y<<15&4294967295|y>>>17),y=_+(b^(w|~g))+I[5]+4237533241&4294967295,_=w+(y<<21&4294967295|y>>>11),y=g+(w^(_|~b))+I[12]+1700485571&4294967295,g=_+(y<<6&4294967295|y>>>26),y=b+(_^(g|~w))+I[3]+2399980690&4294967295,b=g+(y<<10&4294967295|y>>>22),y=w+(g^(b|~_))+I[10]+4293915773&4294967295,w=b+(y<<15&4294967295|y>>>17),y=_+(b^(w|~g))+I[1]+2240044497&4294967295,_=w+(y<<21&4294967295|y>>>11),y=g+(w^(_|~b))+I[8]+1873313359&4294967295,g=_+(y<<6&4294967295|y>>>26),y=b+(_^(g|~w))+I[15]+4264355552&4294967295,b=g+(y<<10&4294967295|y>>>22),y=w+(g^(b|~_))+I[6]+2734768916&4294967295,w=b+(y<<15&4294967295|y>>>17),y=_+(b^(w|~g))+I[13]+1309151649&4294967295,_=w+(y<<21&4294967295|y>>>11),y=g+(w^(_|~b))+I[4]+4149444226&4294967295,g=_+(y<<6&4294967295|y>>>26),y=b+(_^(g|~w))+I[11]+3174756917&4294967295,b=g+(y<<10&4294967295|y>>>22),y=w+(g^(b|~_))+I[2]+718787259&4294967295,w=b+(y<<15&4294967295|y>>>17),y=_+(b^(w|~g))+I[9]+3951481745&4294967295,E.g[0]=E.g[0]+g&4294967295,E.g[1]=E.g[1]+(w+(y<<21&4294967295|y>>>11))&4294967295,E.g[2]=E.g[2]+w&4294967295,E.g[3]=E.g[3]+b&4294967295}n.prototype.v=function(E,g){g===void 0&&(g=E.length);const _=g-this.blockSize,I=this.C;let w=this.h,b=0;for(;b<g;){if(w==0)for(;b<=_;)s(this,E,b),b+=this.blockSize;if(typeof E=="string"){for(;b<g;)if(I[w++]=E.charCodeAt(b++),w==this.blockSize){s(this,I),w=0;break}}else for(;b<g;)if(I[w++]=E[b++],w==this.blockSize){s(this,I),w=0;break}}this.h=w,this.o+=g},n.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var g=1;g<E.length-8;++g)E[g]=0;g=this.o*8;for(var _=E.length-8;_<E.length;++_)E[_]=g&255,g/=256;for(this.v(E),E=Array(16),g=0,_=0;_<4;++_)for(let I=0;I<32;I+=8)E[g++]=this.g[_]>>>I&255;return E};function r(E,g){var _=c;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=g(E)}function a(E,g){this.h=g;const _=[];let I=!0;for(let w=E.length-1;w>=0;w--){const b=E[w]|0;I&&b==g||(_[w]=b,I=!1)}this.g=_}var c={};function u(E){return-128<=E&&E<128?r(E,function(g){return new a([g|0],g<0?-1:0)}):new a([E|0],E<0?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return p;if(E<0)return C(h(-E));const g=[];let _=1;for(let I=0;E>=_;I++)g[I]=E/_|0,_*=4294967296;return new a(g,0)}function f(E,g){if(E.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(E.charAt(0)=="-")return C(f(E.substring(1),g));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=h(Math.pow(g,8));let I=p;for(let b=0;b<E.length;b+=8){var w=Math.min(8,E.length-b);const y=parseInt(E.substring(b,b+w),g);w<8?(w=h(Math.pow(g,w)),I=I.j(w).add(h(y))):(I=I.j(_),I=I.add(h(y)))}return I}var p=u(0),v=u(1),R=u(16777216);i=a.prototype,i.m=function(){if(N(this))return-C(this).m();let E=0,g=1;for(let _=0;_<this.g.length;_++){const I=this.i(_);E+=(I>=0?I:4294967296+I)*g,g*=4294967296}return E},i.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(D(this))return"0";if(N(this))return"-"+C(this).toString(E);const g=h(Math.pow(E,6));var _=this;let I="";for(;;){const w=ge(_,g).g;_=B(_,w.j(g));let b=((_.g.length>0?_.g[0]:_.h)>>>0).toString(E);if(_=w,D(_))return b+I;for(;b.length<6;)b="0"+b;I=b+I}},i.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function D(E){if(E.h!=0)return!1;for(let g=0;g<E.g.length;g++)if(E.g[g]!=0)return!1;return!0}function N(E){return E.h==-1}i.l=function(E){return E=B(this,E),N(E)?-1:D(E)?0:1};function C(E){const g=E.g.length,_=[];for(let I=0;I<g;I++)_[I]=~E.g[I];return new a(_,~E.h).add(v)}i.abs=function(){return N(this)?C(this):this},i.add=function(E){const g=Math.max(this.g.length,E.g.length),_=[];let I=0;for(let w=0;w<=g;w++){let b=I+(this.i(w)&65535)+(E.i(w)&65535),y=(b>>>16)+(this.i(w)>>>16)+(E.i(w)>>>16);I=y>>>16,b&=65535,y&=65535,_[w]=y<<16|b}return new a(_,_[_.length-1]&-2147483648?-1:0)};function B(E,g){return E.add(C(g))}i.j=function(E){if(D(this)||D(E))return p;if(N(this))return N(E)?C(this).j(C(E)):C(C(this).j(E));if(N(E))return C(this.j(C(E)));if(this.l(R)<0&&E.l(R)<0)return h(this.m()*E.m());const g=this.g.length+E.g.length,_=[];for(var I=0;I<2*g;I++)_[I]=0;for(I=0;I<this.g.length;I++)for(let w=0;w<E.g.length;w++){const b=this.i(I)>>>16,y=this.i(I)&65535,De=E.i(w)>>>16,zt=E.i(w)&65535;_[2*I+2*w]+=y*zt,z(_,2*I+2*w),_[2*I+2*w+1]+=b*zt,z(_,2*I+2*w+1),_[2*I+2*w+1]+=y*De,z(_,2*I+2*w+1),_[2*I+2*w+2]+=b*De,z(_,2*I+2*w+2)}for(E=0;E<g;E++)_[E]=_[2*E+1]<<16|_[2*E];for(E=g;E<2*g;E++)_[E]=0;return new a(_,0)};function z(E,g){for(;(E[g]&65535)!=E[g];)E[g+1]+=E[g]>>>16,E[g]&=65535,g++}function q(E,g){this.g=E,this.h=g}function ge(E,g){if(D(g))throw Error("division by zero");if(D(E))return new q(p,p);if(N(E))return g=ge(C(E),g),new q(C(g.g),C(g.h));if(N(g))return g=ge(E,C(g)),new q(C(g.g),g.h);if(E.g.length>30){if(N(E)||N(g))throw Error("slowDivide_ only works with positive integers.");for(var _=v,I=g;I.l(E)<=0;)_=we(_),I=we(I);var w=re(_,1),b=re(I,1);for(I=re(I,2),_=re(_,2);!D(I);){var y=b.add(I);y.l(E)<=0&&(w=w.add(_),b=y),I=re(I,1),_=re(_,1)}return g=B(E,w.j(g)),new q(w,g)}for(w=p;E.l(g)>=0;){for(_=Math.max(1,Math.floor(E.m()/g.m())),I=Math.ceil(Math.log(_)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),b=h(_),y=b.j(g);N(y)||y.l(E)>0;)_-=I,b=h(_),y=b.j(g);D(b)&&(b=v),w=w.add(b),E=B(E,y)}return new q(w,E)}i.B=function(E){return ge(this,E).h},i.and=function(E){const g=Math.max(this.g.length,E.g.length),_=[];for(let I=0;I<g;I++)_[I]=this.i(I)&E.i(I);return new a(_,this.h&E.h)},i.or=function(E){const g=Math.max(this.g.length,E.g.length),_=[];for(let I=0;I<g;I++)_[I]=this.i(I)|E.i(I);return new a(_,this.h|E.h)},i.xor=function(E){const g=Math.max(this.g.length,E.g.length),_=[];for(let I=0;I<g;I++)_[I]=this.i(I)^E.i(I);return new a(_,this.h^E.h)};function we(E){const g=E.g.length+1,_=[];for(let I=0;I<g;I++)_[I]=E.i(I)<<1|E.i(I-1)>>>31;return new a(_,E.h)}function re(E,g){const _=g>>5;g%=32;const I=E.g.length-_,w=[];for(let b=0;b<I;b++)w[b]=g>0?E.i(b+_)>>>g|E.i(b+_+1)<<32-g:E.i(b+_);return new a(w,E.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,ah=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,kt=a}).apply(typeof ul<"u"?ul:typeof self<"u"?self:typeof window<"u"?window:{});var ns=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ch,ci,lh,us,uo,uh,hh,dh;(function(){var i,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof ns=="object"&&ns];for(var l=0;l<o.length;++l){var d=o[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function s(o,l){if(l)e:{var d=n;o=o.split(".");for(var m=0;m<o.length-1;m++){var T=o[m];if(!(T in d))break e;d=d[T]}o=o[o.length-1],m=d[o],l=l(m),l!=m&&l!=null&&e(d,o,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(l){var d=[],m;for(m in l)Object.prototype.hasOwnProperty.call(l,m)&&d.push([m,l[m]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var r=r||{},a=this||self;function c(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function u(o,l,d){return o.call.apply(o.bind,arguments)}function h(o,l,d){return h=u,h.apply(null,arguments)}function f(o,l){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function p(o,l){function d(){}d.prototype=l.prototype,o.Z=l.prototype,o.prototype=new d,o.prototype.constructor=o,o.Ob=function(m,T,A){for(var k=Array(arguments.length-2),$=2;$<arguments.length;$++)k[$-2]=arguments[$];return l.prototype[T].apply(m,k)}}var v=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function R(o){const l=o.length;if(l>0){const d=Array(l);for(let m=0;m<l;m++)d[m]=o[m];return d}return[]}function D(o,l){for(let m=1;m<arguments.length;m++){const T=arguments[m];var d=typeof T;if(d=d!="object"?d:T?Array.isArray(T)?"array":d:"null",d=="array"||d=="object"&&typeof T.length=="number"){d=o.length||0;const A=T.length||0;o.length=d+A;for(let k=0;k<A;k++)o[d+k]=T[k]}else o.push(T)}}class N{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function C(o){a.setTimeout(()=>{throw o},0)}function B(){var o=E;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class z{constructor(){this.h=this.g=null}add(l,d){const m=q.get();m.set(l,d),this.h?this.h.next=m:this.g=m,this.h=m}}var q=new N(()=>new ge,o=>o.reset());class ge{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let we,re=!1,E=new z,g=()=>{const o=Promise.resolve(void 0);we=()=>{o.then(_)}};function _(){for(var o;o=B();){try{o.h.call(o.g)}catch(d){C(d)}var l=q;l.j(o),l.h<100&&(l.h++,o.next=l.g,l.g=o)}re=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function w(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}w.prototype.h=function(){this.defaultPrevented=!0};var b=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};a.addEventListener("test",d,l),a.removeEventListener("test",d,l)}catch{}return o})();function y(o){return/^[\s\xa0]*$/.test(o)}function De(o,l){w.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,l)}p(De,w),De.prototype.init=function(o,l){const d=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget,l||(d=="mouseover"?l=o.fromElement:d=="mouseout"&&(l=o.toElement)),this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&De.Z.h.call(this)},De.prototype.h=function(){De.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var zt="closure_listenable_"+(Math.random()*1e6|0),Of=0;function Ff(o,l,d,m,T){this.listener=o,this.proxy=null,this.src=l,this.type=d,this.capture=!!m,this.ha=T,this.key=++Of,this.da=this.fa=!1}function Ui(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Bi(o,l,d){for(const m in o)l.call(d,o[m],m,o)}function Uf(o,l){for(const d in o)l.call(void 0,o[d],d,o)}function Ua(o){const l={};for(const d in o)l[d]=o[d];return l}const Ba="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function $a(o,l){let d,m;for(let T=1;T<arguments.length;T++){m=arguments[T];for(d in m)o[d]=m[d];for(let A=0;A<Ba.length;A++)d=Ba[A],Object.prototype.hasOwnProperty.call(m,d)&&(o[d]=m[d])}}function $i(o){this.src=o,this.g={},this.h=0}$i.prototype.add=function(o,l,d,m,T){const A=o.toString();o=this.g[A],o||(o=this.g[A]=[],this.h++);const k=mr(o,l,m,T);return k>-1?(l=o[k],d||(l.fa=!1)):(l=new Ff(l,this.src,A,!!m,T),l.fa=d,o.push(l)),l};function fr(o,l){const d=l.type;if(d in o.g){var m=o.g[d],T=Array.prototype.indexOf.call(m,l,void 0),A;(A=T>=0)&&Array.prototype.splice.call(m,T,1),A&&(Ui(l),o.g[d].length==0&&(delete o.g[d],o.h--))}}function mr(o,l,d,m){for(let T=0;T<o.length;++T){const A=o[T];if(!A.da&&A.listener==l&&A.capture==!!d&&A.ha==m)return T}return-1}var pr="closure_lm_"+(Math.random()*1e6|0),gr={};function za(o,l,d,m,T){if(Array.isArray(l)){for(let A=0;A<l.length;A++)za(o,l[A],d,m,T);return null}return d=Ha(d),o&&o[zt]?o.J(l,d,c(m)?!!m.capture:!1,T):Bf(o,l,d,!1,m,T)}function Bf(o,l,d,m,T,A){if(!l)throw Error("Invalid event type");const k=c(T)?!!T.capture:!!T;let $=_r(o);if($||(o[pr]=$=new $i(o)),d=$.add(l,d,m,k,A),d.proxy)return d;if(m=$f(),d.proxy=m,m.src=o,m.listener=d,o.addEventListener)b||(T=k),T===void 0&&(T=!1),o.addEventListener(l.toString(),m,T);else if(o.attachEvent)o.attachEvent(ja(l.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function $f(){function o(d){return l.call(o.src,o.listener,d)}const l=zf;return o}function qa(o,l,d,m,T){if(Array.isArray(l))for(var A=0;A<l.length;A++)qa(o,l[A],d,m,T);else m=c(m)?!!m.capture:!!m,d=Ha(d),o&&o[zt]?(o=o.i,A=String(l).toString(),A in o.g&&(l=o.g[A],d=mr(l,d,m,T),d>-1&&(Ui(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete o.g[A],o.h--)))):o&&(o=_r(o))&&(l=o.g[l.toString()],o=-1,l&&(o=mr(l,d,m,T)),(d=o>-1?l[o]:null)&&yr(d))}function yr(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[zt])fr(l.i,o);else{var d=o.type,m=o.proxy;l.removeEventListener?l.removeEventListener(d,m,o.capture):l.detachEvent?l.detachEvent(ja(d),m):l.addListener&&l.removeListener&&l.removeListener(m),(d=_r(l))?(fr(d,o),d.h==0&&(d.src=null,l[pr]=null)):Ui(o)}}}function ja(o){return o in gr?gr[o]:gr[o]="on"+o}function zf(o,l){if(o.da)o=!0;else{l=new De(l,this);const d=o.listener,m=o.ha||o.src;o.fa&&yr(o),o=d.call(m,l)}return o}function _r(o){return o=o[pr],o instanceof $i?o:null}var vr="__closure_events_fn_"+(Math.random()*1e9>>>0);function Ha(o){return typeof o=="function"?o:(o[vr]||(o[vr]=function(l){return o.handleEvent(l)}),o[vr])}function Ee(){I.call(this),this.i=new $i(this),this.M=this,this.G=null}p(Ee,I),Ee.prototype[zt]=!0,Ee.prototype.removeEventListener=function(o,l,d,m){qa(this,o,l,d,m)};function Se(o,l){var d,m=o.G;if(m)for(d=[];m;m=m.G)d.push(m);if(o=o.M,m=l.type||l,typeof l=="string")l=new w(l,o);else if(l instanceof w)l.target=l.target||o;else{var T=l;l=new w(m,o),$a(l,T)}T=!0;let A,k;if(d)for(k=d.length-1;k>=0;k--)A=l.g=d[k],T=zi(A,m,!0,l)&&T;if(A=l.g=o,T=zi(A,m,!0,l)&&T,T=zi(A,m,!1,l)&&T,d)for(k=0;k<d.length;k++)A=l.g=d[k],T=zi(A,m,!1,l)&&T}Ee.prototype.N=function(){if(Ee.Z.N.call(this),this.i){var o=this.i;for(const l in o.g){const d=o.g[l];for(let m=0;m<d.length;m++)Ui(d[m]);delete o.g[l],o.h--}}this.G=null},Ee.prototype.J=function(o,l,d,m){return this.i.add(String(o),l,!1,d,m)},Ee.prototype.K=function(o,l,d,m){return this.i.add(String(o),l,!0,d,m)};function zi(o,l,d,m){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();let T=!0;for(let A=0;A<l.length;++A){const k=l[A];if(k&&!k.da&&k.capture==d){const $=k.listener,he=k.ha||k.src;k.fa&&fr(o.i,k),T=$.call(he,m)!==!1&&T}}return T&&!m.defaultPrevented}function qf(o,l){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=h(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:a.setTimeout(o,l||0)}function Ga(o){o.g=qf(()=>{o.g=null,o.i&&(o.i=!1,Ga(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class jf extends I{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Ga(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Hn(o){I.call(this),this.h=o,this.g={}}p(Hn,I);var Wa=[];function Ka(o){Bi(o.g,function(l,d){this.g.hasOwnProperty(d)&&yr(l)},o),o.g={}}Hn.prototype.N=function(){Hn.Z.N.call(this),Ka(this)},Hn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var wr=a.JSON.stringify,Hf=a.JSON.parse,Gf=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function Qa(){}function Ya(){}var Gn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Er(){w.call(this,"d")}p(Er,w);function Ir(){w.call(this,"c")}p(Ir,w);var qt={},Xa=null;function qi(){return Xa=Xa||new Ee}qt.Ia="serverreachability";function Ja(o){w.call(this,qt.Ia,o)}p(Ja,w);function Wn(o){const l=qi();Se(l,new Ja(l))}qt.STAT_EVENT="statevent";function Za(o,l){w.call(this,qt.STAT_EVENT,o),this.stat=l}p(Za,w);function Re(o){const l=qi();Se(l,new Za(l,o))}qt.Ja="timingevent";function ec(o,l){w.call(this,qt.Ja,o),this.size=l}p(ec,w);function Kn(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},l)}function Qn(){this.g=!0}Qn.prototype.ua=function(){this.g=!1};function Wf(o,l,d,m,T,A){o.info(function(){if(o.g)if(A){var k="",$=A.split("&");for(let X=0;X<$.length;X++){var he=$[X].split("=");if(he.length>1){const me=he[0];he=he[1];const Ke=me.split("_");k=Ke.length>=2&&Ke[1]=="type"?k+(me+"="+he+"&"):k+(me+"=redacted&")}}}else k=null;else k=A;return"XMLHTTP REQ ("+m+") [attempt "+T+"]: "+l+`
`+d+`
`+k})}function Kf(o,l,d,m,T,A,k){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+T+"]: "+l+`
`+d+`
`+A+" "+k})}function dn(o,l,d,m){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Yf(o,d)+(m?" "+m:"")})}function Qf(o,l){o.info(function(){return"TIMEOUT: "+l})}Qn.prototype.info=function(){};function Yf(o,l){if(!o.g)return l;if(!l)return null;try{const A=JSON.parse(l);if(A){for(o=0;o<A.length;o++)if(Array.isArray(A[o])){var d=A[o];if(!(d.length<2)){var m=d[1];if(Array.isArray(m)&&!(m.length<1)){var T=m[0];if(T!="noop"&&T!="stop"&&T!="close")for(let k=1;k<m.length;k++)m[k]=""}}}}return wr(A)}catch{return l}}var ji={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},tc={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},nc;function Tr(){}p(Tr,Qa),Tr.prototype.g=function(){return new XMLHttpRequest},nc=new Tr;function Yn(o){return encodeURIComponent(String(o))}function Xf(o){var l=1;o=o.split(":");const d=[];for(;l>0&&o.length;)d.push(o.shift()),l--;return o.length&&d.push(o.join(":")),d}function yt(o,l,d,m){this.j=o,this.i=l,this.l=d,this.S=m||1,this.V=new Hn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new ic}function ic(){this.i=null,this.g="",this.h=!1}var sc={},br={};function Ar(o,l,d){o.M=1,o.A=Gi(We(l)),o.u=d,o.R=!0,rc(o,null)}function rc(o,l){o.F=Date.now(),Hi(o),o.B=We(o.A);var d=o.B,m=o.S;Array.isArray(m)||(m=[String(m)]),_c(d.i,"t",m),o.C=0,d=o.j.L,o.h=new ic,o.g=xc(o.j,d?l:null,!o.u),o.P>0&&(o.O=new jf(h(o.Y,o,o.g),o.P)),l=o.V,d=o.g,m=o.ba;var T="readystatechange";Array.isArray(T)||(T&&(Wa[0]=T.toString()),T=Wa);for(let A=0;A<T.length;A++){const k=za(d,T[A],m||l.handleEvent,!1,l.h||l);if(!k)break;l.g[k.key]=k}l=o.J?Ua(o.J):{},o.u?(o.v||(o.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,l)):(o.v="GET",o.g.ea(o.B,o.v,null,l)),Wn(),Wf(o.i,o.v,o.B,o.l,o.S,o.u)}yt.prototype.ba=function(o){o=o.target;const l=this.O;l&&wt(o)==3?l.j():this.Y(o)},yt.prototype.Y=function(o){try{if(o==this.g)e:{const $=wt(this.g),he=this.g.ya(),X=this.g.ca();if(!($<3)&&($!=3||this.g&&(this.h.h||this.g.la()||Ac(this.g)))){this.K||$!=4||he==7||(he==8||X<=0?Wn(3):Wn(2)),Sr(this);var l=this.g.ca();this.X=l;var d=Jf(this);if(this.o=l==200,Kf(this.i,this.v,this.B,this.l,this.S,$,l),this.o){if(this.U&&!this.L){t:{if(this.g){var m,T=this.g;if((m=T.g?T.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(m)){var A=m;break t}}A=null}if(o=A)dn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Rr(this,o);else{this.o=!1,this.m=3,Re(12),jt(this),Xn(this);break e}}if(this.R){o=!0;let me;for(;!this.K&&this.C<d.length;)if(me=Zf(this,d),me==br){$==4&&(this.m=4,Re(14),o=!1),dn(this.i,this.l,null,"[Incomplete Response]");break}else if(me==sc){this.m=4,Re(15),dn(this.i,this.l,d,"[Invalid Chunk]"),o=!1;break}else dn(this.i,this.l,me,null),Rr(this,me);if(oc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),$!=4||d.length!=0||this.h.h||(this.m=1,Re(16),o=!1),this.o=this.o&&o,!o)dn(this.i,this.l,d,"[Invalid Chunked Response]"),jt(this),Xn(this);else if(d.length>0&&!this.W){this.W=!0;var k=this.j;k.g==this&&k.aa&&!k.P&&(k.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),Lr(k),k.P=!0,Re(11))}}else dn(this.i,this.l,d,null),Rr(this,d);$==4&&jt(this),this.o&&!this.K&&($==4?Mc(this.j,this):(this.o=!1,Hi(this)))}else fm(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,Re(12)):(this.m=0,Re(13)),jt(this),Xn(this)}}}catch{}finally{}};function Jf(o){if(!oc(o))return o.g.la();const l=Ac(o.g);if(l==="")return"";let d="";const m=l.length,T=wt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return jt(o),Xn(o),"";o.h.i=new a.TextDecoder}for(let A=0;A<m;A++)o.h.h=!0,d+=o.h.i.decode(l[A],{stream:!(T&&A==m-1)});return l.length=0,o.h.g+=d,o.C=0,o.h.g}function oc(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Zf(o,l){var d=o.C,m=l.indexOf(`
`,d);return m==-1?br:(d=Number(l.substring(d,m)),isNaN(d)?sc:(m+=1,m+d>l.length?br:(l=l.slice(m,m+d),o.C=m+d,l)))}yt.prototype.cancel=function(){this.K=!0,jt(this)};function Hi(o){o.T=Date.now()+o.H,ac(o,o.H)}function ac(o,l){if(o.D!=null)throw Error("WatchDog timer not null");o.D=Kn(h(o.aa,o),l)}function Sr(o){o.D&&(a.clearTimeout(o.D),o.D=null)}yt.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Qf(this.i,this.B),this.M!=2&&(Wn(),Re(17)),jt(this),this.m=2,Xn(this)):ac(this,this.T-o)};function Xn(o){o.j.I==0||o.K||Mc(o.j,o)}function jt(o){Sr(o);var l=o.O;l&&typeof l.dispose=="function"&&l.dispose(),o.O=null,Ka(o.V),o.g&&(l=o.g,o.g=null,l.abort(),l.dispose())}function Rr(o,l){try{var d=o.j;if(d.I!=0&&(d.g==o||Pr(d.h,o))){if(!o.L&&Pr(d.h,o)&&d.I==3){try{var m=d.Ba.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var T=m;if(T[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<o.F)Xi(d),Qi(d);else break e;Vr(d),Re(18)}}else d.xa=T[1],0<d.xa-d.K&&T[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=Kn(h(d.Va,d),6e3));uc(d.h)<=1&&d.ta&&(d.ta=void 0)}else Gt(d,11)}else if((o.L||d.g==o)&&Xi(d),!y(l))for(T=d.Ba.g.parse(l),l=0;l<T.length;l++){let X=T[l];const me=X[0];if(!(me<=d.K))if(d.K=me,X=X[1],d.I==2)if(X[0]=="c"){d.M=X[1],d.ba=X[2];const Ke=X[3];Ke!=null&&(d.ka=Ke,d.j.info("VER="+d.ka));const Wt=X[4];Wt!=null&&(d.za=Wt,d.j.info("SVER="+d.za));const Et=X[5];Et!=null&&typeof Et=="number"&&Et>0&&(m=1.5*Et,d.O=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const It=o.g;if(It){const Zi=It.g?It.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Zi){var A=m.h;A.g||Zi.indexOf("spdy")==-1&&Zi.indexOf("quic")==-1&&Zi.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(Cr(A,A.h),A.h=null))}if(m.G){const xr=It.g?It.g.getResponseHeader("X-HTTP-Session-Id"):null;xr&&(m.wa=xr,Z(m.J,m.G,xr))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-o.F,d.j.info("Handshake RTT: "+d.T+"ms")),m=d;var k=o;if(m.na=Lc(m,m.L?m.ba:null,m.W),k.L){hc(m.h,k);var $=k,he=m.O;he&&($.H=he),$.D&&(Sr($),Hi($)),m.g=k}else Dc(m);d.i.length>0&&Yi(d)}else X[0]!="stop"&&X[0]!="close"||Gt(d,7);else d.I==3&&(X[0]=="stop"||X[0]=="close"?X[0]=="stop"?Gt(d,7):Nr(d):X[0]!="noop"&&d.l&&d.l.qa(X),d.A=0)}}Wn(4)}catch{}}var em=class{constructor(o,l){this.g=o,this.map=l}};function cc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function lc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function uc(o){return o.h?1:o.g?o.g.size:0}function Pr(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function Cr(o,l){o.g?o.g.add(l):o.h=l}function hc(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}cc.prototype.cancel=function(){if(this.i=dc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function dc(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const d of o.g.values())l=l.concat(d.G);return l}return R(o.i)}var fc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function tm(o,l){if(o){o=o.split("&");for(let d=0;d<o.length;d++){const m=o[d].indexOf("=");let T,A=null;m>=0?(T=o[d].substring(0,m),A=o[d].substring(m+1)):T=o[d],l(T,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function _t(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;o instanceof _t?(this.l=o.l,Jn(this,o.j),this.o=o.o,this.g=o.g,Zn(this,o.u),this.h=o.h,Dr(this,vc(o.i)),this.m=o.m):o&&(l=String(o).match(fc))?(this.l=!1,Jn(this,l[1]||"",!0),this.o=ei(l[2]||""),this.g=ei(l[3]||"",!0),Zn(this,l[4]),this.h=ei(l[5]||"",!0),Dr(this,l[6]||"",!0),this.m=ei(l[7]||"")):(this.l=!1,this.i=new ni(null,this.l))}_t.prototype.toString=function(){const o=[];var l=this.j;l&&o.push(ti(l,mc,!0),":");var d=this.g;return(d||l=="file")&&(o.push("//"),(l=this.o)&&o.push(ti(l,mc,!0),"@"),o.push(Yn(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&o.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(ti(d,d.charAt(0)=="/"?sm:im,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",ti(d,om)),o.join("")},_t.prototype.resolve=function(o){const l=We(this);let d=!!o.j;d?Jn(l,o.j):d=!!o.o,d?l.o=o.o:d=!!o.g,d?l.g=o.g:d=o.u!=null;var m=o.h;if(d)Zn(l,o.u);else if(d=!!o.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var T=l.h.lastIndexOf("/");T!=-1&&(m=l.h.slice(0,T+1)+m)}if(T=m,T==".."||T==".")m="";else if(T.indexOf("./")!=-1||T.indexOf("/.")!=-1){m=T.lastIndexOf("/",0)==0,T=T.split("/");const A=[];for(let k=0;k<T.length;){const $=T[k++];$=="."?m&&k==T.length&&A.push(""):$==".."?((A.length>1||A.length==1&&A[0]!="")&&A.pop(),m&&k==T.length&&A.push("")):(A.push($),m=!0)}m=A.join("/")}else m=T}return d?l.h=m:d=o.i.toString()!=="",d?Dr(l,vc(o.i)):d=!!o.m,d&&(l.m=o.m),l};function We(o){return new _t(o)}function Jn(o,l,d){o.j=d?ei(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function Zn(o,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);o.u=l}else o.u=null}function Dr(o,l,d){l instanceof ni?(o.i=l,am(o.i,o.l)):(d||(l=ti(l,rm)),o.i=new ni(l,o.l))}function Z(o,l,d){o.i.set(l,d)}function Gi(o){return Z(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function ei(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function ti(o,l,d){return typeof o=="string"?(o=encodeURI(o).replace(l,nm),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function nm(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var mc=/[#\/\?@]/g,im=/[#\?:]/g,sm=/[#\?]/g,rm=/[#\?@]/g,om=/#/g;function ni(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function Ht(o){o.g||(o.g=new Map,o.h=0,o.i&&tm(o.i,function(l,d){o.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}i=ni.prototype,i.add=function(o,l){Ht(this),this.i=null,o=fn(this,o);let d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(l),this.h+=1,this};function pc(o,l){Ht(o),l=fn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function gc(o,l){return Ht(o),l=fn(o,l),o.g.has(l)}i.forEach=function(o,l){Ht(this),this.g.forEach(function(d,m){d.forEach(function(T){o.call(l,T,m,this)},this)},this)};function yc(o,l){Ht(o);let d=[];if(typeof l=="string")gc(o,l)&&(d=d.concat(o.g.get(fn(o,l))));else for(o=Array.from(o.g.values()),l=0;l<o.length;l++)d=d.concat(o[l]);return d}i.set=function(o,l){return Ht(this),this.i=null,o=fn(this,o),gc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},i.get=function(o,l){return o?(o=yc(this,o),o.length>0?String(o[0]):l):l};function _c(o,l,d){pc(o,l),d.length>0&&(o.i=null,o.g.set(fn(o,l),R(d)),o.h+=d.length)}i.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(let m=0;m<l.length;m++){var d=l[m];const T=Yn(d);d=yc(this,d);for(let A=0;A<d.length;A++){let k=T;d[A]!==""&&(k+="="+Yn(d[A])),o.push(k)}}return this.i=o.join("&")};function vc(o){const l=new ni;return l.i=o.i,o.g&&(l.g=new Map(o.g),l.h=o.h),l}function fn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function am(o,l){l&&!o.j&&(Ht(o),o.i=null,o.g.forEach(function(d,m){const T=m.toLowerCase();m!=T&&(pc(this,m),_c(this,T,d))},o)),o.j=l}function cm(o,l){const d=new Qn;if(a.Image){const m=new Image;m.onload=f(vt,d,"TestLoadImage: loaded",!0,l,m),m.onerror=f(vt,d,"TestLoadImage: error",!1,l,m),m.onabort=f(vt,d,"TestLoadImage: abort",!1,l,m),m.ontimeout=f(vt,d,"TestLoadImage: timeout",!1,l,m),a.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else l(!1)}function lm(o,l){const d=new Qn,m=new AbortController,T=setTimeout(()=>{m.abort(),vt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:m.signal}).then(A=>{clearTimeout(T),A.ok?vt(d,"TestPingServer: ok",!0,l):vt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(T),vt(d,"TestPingServer: error",!1,l)})}function vt(o,l,d,m,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),m(d)}catch{}}function um(){this.g=new Gf}function kr(o){this.i=o.Sb||null,this.h=o.ab||!1}p(kr,Qa),kr.prototype.g=function(){return new Wi(this.i,this.h)};function Wi(o,l){Ee.call(this),this.H=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(Wi,Ee),i=Wi.prototype,i.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=l,this.readyState=1,si(this)},i.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(l.body=o),(this.H||a).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},i.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,ii(this)),this.readyState=0},i.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,si(this)),this.g&&(this.readyState=3,si(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;wc(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function wc(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}i.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?ii(this):si(this),this.readyState==3&&wc(this)}},i.Oa=function(o){this.g&&(this.response=this.responseText=o,ii(this))},i.Na=function(o){this.g&&(this.response=o,ii(this))},i.ga=function(){this.g&&ii(this)};function ii(o){o.readyState=4,o.l=null,o.j=null,o.B=null,si(o)}i.setRequestHeader=function(o,l){this.A.append(o,l)},i.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},i.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=l.next();return o.join(`\r
`)};function si(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Wi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Ec(o){let l="";return Bi(o,function(d,m){l+=m,l+=":",l+=d,l+=`\r
`}),l}function Mr(o,l,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=Ec(d),typeof o=="string"?d!=null&&Yn(d):Z(o,l,d))}function ne(o){Ee.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(ne,Ee);var hm=/^https?$/i,dm=["POST","PUT"];i=ne.prototype,i.Fa=function(o){this.H=o},i.ea=function(o,l,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():nc.g(),this.g.onreadystatechange=v(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(A){Ic(this,A);return}if(o=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var T in m)d.set(T,m[T]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const A of m.keys())d.set(A,m.get(A));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(A=>A.toLowerCase()=="content-type"),T=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(dm,l,void 0)>=0)||m||T||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,k]of d)this.g.setRequestHeader(A,k);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(A){Ic(this,A)}};function Ic(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.o=5,Tc(o),Ki(o)}function Tc(o){o.A||(o.A=!0,Se(o,"complete"),Se(o,"error"))}i.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Se(this,"complete"),Se(this,"abort"),Ki(this))},i.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ki(this,!0)),ne.Z.N.call(this)},i.Ca=function(){this.u||(this.B||this.v||this.j?bc(this):this.Xa())},i.Xa=function(){bc(this)};function bc(o){if(o.h&&typeof r<"u"){if(o.v&&wt(o)==4)setTimeout(o.Ca.bind(o),0);else if(Se(o,"readystatechange"),wt(o)==4){o.h=!1;try{const A=o.ca();e:switch(A){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var m;if(m=A===0){let k=String(o.D).match(fc)[1]||null;!k&&a.self&&a.self.location&&(k=a.self.location.protocol.slice(0,-1)),m=!hm.test(k?k.toLowerCase():"")}d=m}if(d)Se(o,"complete"),Se(o,"success");else{o.o=6;try{var T=wt(o)>2?o.g.statusText:""}catch{T=""}o.l=T+" ["+o.ca()+"]",Tc(o)}}finally{Ki(o)}}}}function Ki(o,l){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const d=o.g;o.g=null,l||Se(o,"ready");try{d.onreadystatechange=null}catch{}}}i.isActive=function(){return!!this.g};function wt(o){return o.g?o.g.readyState:0}i.ca=function(){try{return wt(this)>2?this.g.status:-1}catch{return-1}},i.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},i.La=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),Hf(l)}};function Ac(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function fm(o){const l={};o=(o.g&&wt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(y(o[m]))continue;var d=Xf(o[m]);const T=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const A=l[T]||[];l[T]=A,A.push(d)}Uf(l,function(m){return m.join(", ")})}i.ya=function(){return this.o},i.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function ri(o,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||l}function Sc(o){this.za=0,this.i=[],this.j=new Qn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=ri("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=ri("baseRetryDelayMs",5e3,o),this.Za=ri("retryDelaySeedMs",1e4,o),this.Ta=ri("forwardChannelMaxRetries",2,o),this.va=ri("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new cc(o&&o.concurrentRequestLimit),this.Ba=new um,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}i=Sc.prototype,i.ka=8,i.I=1,i.connect=function(o,l,d,m){Re(0),this.W=o,this.H=l||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.J=Lc(this,null,this.W),Yi(this)};function Nr(o){if(Rc(o),o.I==3){var l=o.V++,d=We(o.J);if(Z(d,"SID",o.M),Z(d,"RID",l),Z(d,"TYPE","terminate"),oi(o,d),l=new yt(o,o.j,l),l.M=2,l.A=Gi(We(d)),d=!1,a.navigator&&a.navigator.sendBeacon)try{d=a.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&a.Image&&(new Image().src=l.A,d=!0),d||(l.g=xc(l.j,null),l.g.ea(l.A)),l.F=Date.now(),Hi(l)}Vc(o)}function Qi(o){o.g&&(Lr(o),o.g.cancel(),o.g=null)}function Rc(o){Qi(o),o.v&&(a.clearTimeout(o.v),o.v=null),Xi(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Yi(o){if(!lc(o.h)&&!o.m){o.m=!0;var l=o.Ea;we||g(),re||(we(),re=!0),E.add(l,o),o.D=0}}function mm(o,l){return uc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=l.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=Kn(h(o.Ea,o,l),Nc(o,o.D)),o.D++,!0)}i.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const T=new yt(this,this.j,o);let A=this.o;if(this.U&&(A?(A=Ua(A),$a(A,this.U)):A=this.U),this.u!==null||this.R||(T.J=A,A=null),this.S)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(l+=m,l>4096){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=Cc(this,T,l),d=We(this.J),Z(d,"RID",o),Z(d,"CVER",22),this.G&&Z(d,"X-HTTP-Session-Id",this.G),oi(this,d),A&&(this.R?l="headers="+Yn(Ec(A))+"&"+l:this.u&&Mr(d,this.u,A)),Cr(this.h,T),this.Ra&&Z(d,"TYPE","init"),this.S?(Z(d,"$req",l),Z(d,"SID","null"),T.U=!0,Ar(T,d,null)):Ar(T,d,l),this.I=2}}else this.I==3&&(o?Pc(this,o):this.i.length==0||lc(this.h)||Pc(this))};function Pc(o,l){var d;l?d=l.l:d=o.V++;const m=We(o.J);Z(m,"SID",o.M),Z(m,"RID",d),Z(m,"AID",o.K),oi(o,m),o.u&&o.o&&Mr(m,o.u,o.o),d=new yt(o,o.j,d,o.D+1),o.u===null&&(d.J=o.o),l&&(o.i=l.G.concat(o.i)),l=Cc(o,d,1e3),d.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Cr(o.h,d),Ar(d,m,l)}function oi(o,l){o.H&&Bi(o.H,function(d,m){Z(l,m,d)}),o.l&&Bi({},function(d,m){Z(l,m,d)})}function Cc(o,l,d){d=Math.min(o.i.length,d);const m=o.l?h(o.l.Ka,o.l,o):null;e:{var T=o.i;let $=-1;for(;;){const he=["count="+d];$==-1?d>0?($=T[0].g,he.push("ofs="+$)):$=0:he.push("ofs="+$);let X=!0;for(let me=0;me<d;me++){var A=T[me].g;const Ke=T[me].map;if(A-=$,A<0)$=Math.max(0,T[me].g-100),X=!1;else try{A="req"+A+"_"||"";try{var k=Ke instanceof Map?Ke:Object.entries(Ke);for(const[Wt,Et]of k){let It=Et;c(Et)&&(It=wr(Et)),he.push(A+Wt+"="+encodeURIComponent(It))}}catch(Wt){throw he.push(A+"type="+encodeURIComponent("_badmap")),Wt}}catch{m&&m(Ke)}}if(X){k=he.join("&");break e}}k=void 0}return o=o.i.splice(0,d),l.G=o,k}function Dc(o){if(!o.g&&!o.v){o.Y=1;var l=o.Da;we||g(),re||(we(),re=!0),E.add(l,o),o.A=0}}function Vr(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=Kn(h(o.Da,o),Nc(o,o.A)),o.A++,!0)}i.Da=function(){if(this.v=null,kc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=Kn(h(this.Wa,this),o)}},i.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Re(10),Qi(this),kc(this))};function Lr(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function kc(o){o.g=new yt(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var l=We(o.na);Z(l,"RID","rpc"),Z(l,"SID",o.M),Z(l,"AID",o.K),Z(l,"CI",o.F?"0":"1"),!o.F&&o.ia&&Z(l,"TO",o.ia),Z(l,"TYPE","xmlhttp"),oi(o,l),o.u&&o.o&&Mr(l,o.u,o.o),o.O&&(o.g.H=o.O);var d=o.g;o=o.ba,d.M=1,d.A=Gi(We(l)),d.u=null,d.R=!0,rc(d,o)}i.Va=function(){this.C!=null&&(this.C=null,Qi(this),Vr(this),Re(19))};function Xi(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Mc(o,l){var d=null;if(o.g==l){Xi(o),Lr(o),o.g=null;var m=2}else if(Pr(o.h,l))d=l.G,hc(o.h,l),m=1;else return;if(o.I!=0){if(l.o)if(m==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var T=o.D;m=qi(),Se(m,new ec(m,d)),Yi(o)}else Dc(o);else if(T=l.m,T==3||T==0&&l.X>0||!(m==1&&mm(o,l)||m==2&&Vr(o)))switch(d&&d.length>0&&(l=o.h,l.i=l.i.concat(d)),T){case 1:Gt(o,5);break;case 4:Gt(o,10);break;case 3:Gt(o,6);break;default:Gt(o,2)}}}function Nc(o,l){let d=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(d*=2),d*l}function Gt(o,l){if(o.j.info("Error code "+l),l==2){var d=h(o.bb,o),m=o.Ua;const T=!m;m=new _t(m||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Jn(m,"https"),Gi(m),T?cm(m.toString(),d):lm(m.toString(),d)}else Re(2);o.I=0,o.l&&o.l.pa(l),Vc(o),Rc(o)}i.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Re(2)):(this.j.info("Failed to ping google.com"),Re(1))};function Vc(o){if(o.I=0,o.ja=[],o.l){const l=dc(o.h);(l.length!=0||o.i.length!=0)&&(D(o.ja,l),D(o.ja,o.i),o.h.i.length=0,R(o.i),o.i.length=0),o.l.oa()}}function Lc(o,l,d){var m=d instanceof _t?We(d):new _t(d);if(m.g!="")l&&(m.g=l+"."+m.g),Zn(m,m.u);else{var T=a.location;m=T.protocol,l=l?l+"."+T.hostname:T.hostname,T=+T.port;const A=new _t(null);m&&Jn(A,m),l&&(A.g=l),T&&Zn(A,T),d&&(A.h=d),m=A}return d=o.G,l=o.wa,d&&l&&Z(m,d,l),Z(m,"VER",o.ka),oi(o,m),m}function xc(o,l,d){if(l&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Aa&&!o.ma?new ne(new kr({ab:d})):new ne(o.ma),l.Fa(o.L),l}i.isActive=function(){return!!this.l&&this.l.isActive(this)};function Oc(){}i=Oc.prototype,i.ra=function(){},i.qa=function(){},i.pa=function(){},i.oa=function(){},i.isActive=function(){return!0},i.Ka=function(){};function Ji(){}Ji.prototype.g=function(o,l){return new Ve(o,l)};function Ve(o,l){Ee.call(this),this.g=new Sc(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(o?o["X-WebChannel-Client-Profile"]=l.sa:o={"X-WebChannel-Client-Profile":l.sa}),this.g.U=o,(o=l&&l.Qb)&&!y(o)&&(this.g.u=o),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!y(l)&&(this.g.G=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new mn(this)}p(Ve,Ee),Ve.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ve.prototype.close=function(){Nr(this.g)},Ve.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.v&&(d={},d.__data__=wr(o),o=d);l.i.push(new em(l.Ya++,o)),l.I==3&&Yi(l)},Ve.prototype.N=function(){this.g.l=null,delete this.j,Nr(this.g),delete this.g,Ve.Z.N.call(this)};function Fc(o){Er.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const d in l){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}p(Fc,Er);function Uc(){Ir.call(this),this.status=1}p(Uc,Ir);function mn(o){this.g=o}p(mn,Oc),mn.prototype.ra=function(){Se(this.g,"a")},mn.prototype.qa=function(o){Se(this.g,new Fc(o))},mn.prototype.pa=function(o){Se(this.g,new Uc)},mn.prototype.oa=function(){Se(this.g,"b")},Ji.prototype.createWebChannel=Ji.prototype.g,Ve.prototype.send=Ve.prototype.o,Ve.prototype.open=Ve.prototype.m,Ve.prototype.close=Ve.prototype.close,dh=function(){return new Ji},hh=function(){return qi()},uh=qt,uo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},ji.NO_ERROR=0,ji.TIMEOUT=8,ji.HTTP_ERROR=6,us=ji,tc.COMPLETE="complete",lh=tc,Ya.EventType=Gn,Gn.OPEN="a",Gn.CLOSE="b",Gn.ERROR="c",Gn.MESSAGE="d",Ee.prototype.listen=Ee.prototype.J,ci=Ya,ne.prototype.listenOnce=ne.prototype.K,ne.prototype.getLastError=ne.prototype.Ha,ne.prototype.getLastErrorCode=ne.prototype.ya,ne.prototype.getStatus=ne.prototype.ca,ne.prototype.getResponseJson=ne.prototype.La,ne.prototype.getResponseText=ne.prototype.la,ne.prototype.send=ne.prototype.ea,ne.prototype.setWithCredentials=ne.prototype.Fa,ch=ne}).apply(typeof ns<"u"?ns:typeof self<"u"?self:typeof window<"u"?window:{});const hl="@firebase/firestore",dl="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Te.UNAUTHENTICATED=new Te(null),Te.GOOGLE_CREDENTIALS=new Te("google-credentials-uid"),Te.FIRST_PARTY=new Te("first-party-uid"),Te.MOCK_USER=new Te("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Un="12.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tn=new $s("@firebase/firestore");function gn(){return tn.logLevel}function V(i,...e){if(tn.logLevel<=j.DEBUG){const t=e.map(Lo);tn.debug(`Firestore (${Un}): ${i}`,...t)}}function dt(i,...e){if(tn.logLevel<=j.ERROR){const t=e.map(Lo);tn.error(`Firestore (${Un}): ${i}`,...t)}}function Cn(i,...e){if(tn.logLevel<=j.WARN){const t=e.map(Lo);tn.warn(`Firestore (${Un}): ${i}`,...t)}}function Lo(i){if(typeof i=="string")return i;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(t){return JSON.stringify(t)})(i)}catch{return i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(i,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,fh(i,n,t)}function fh(i,e,t){let n=`FIRESTORE (${Un}) INTERNAL ASSERTION FAILED: ${e} (ID: ${i.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw dt(n),new Error(n)}function Q(i,e,t,n){let s="Unexpected state";typeof t=="string"?s=t:n=t,i||fh(e,s,n)}function U(i,e){return i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends Ge{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Ig{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Te.UNAUTHENTICATED)))}shutdown(){}}class Tg{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class bg{constructor(e){this.t=e,this.currentUser=Te.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Q(this.o===void 0,42304);let n=this.i;const s=u=>this.i!==n?(n=this.i,t(u)):Promise.resolve();let r=new ut;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new ut,e.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const u=r;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new ut)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((n=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(Q(typeof n.accessToken=="string",31837,{l:n}),new mh(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Q(e===null||typeof e=="string",2055,{h:e}),new Te(e)}}class Ag{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=Te.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Sg{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new Ag(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Te.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class fl{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Rg{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Be(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Q(this.o===void 0,3512);const n=r=>{r.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);const a=r.token!==this.m;return this.m=r.token,V("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(r.token):Promise.resolve()};this.o=r=>{e.enqueueRetryable((()=>n(r)))};const s=r=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((r=>s(r))),setTimeout((()=>{if(!this.appCheck){const r=this.V.getImmediate({optional:!0});r?s(r):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new fl(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(Q(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new fl(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pg(i){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(i);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<i;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=Pg(40);for(let r=0;r<s.length;++r)n.length<20&&s[r]<t&&(n+=e.charAt(s[r]%62))}return n}}function H(i,e){return i<e?-1:i>e?1:0}function ho(i,e){const t=Math.min(i.length,e.length);for(let n=0;n<t;n++){const s=i.charAt(n),r=e.charAt(n);if(s!==r)return jr(s)===jr(r)?H(s,r):jr(s)?1:-1}return H(i.length,e.length)}const Cg=55296,Dg=57343;function jr(i){const e=i.charCodeAt(0);return e>=Cg&&e<=Dg}function Dn(i,e,t){return i.length===e.length&&i.every(((n,s)=>t(n,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ml="__name__";class Qe{constructor(e,t,n){t===void 0?t=0:t>e.length&&x(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&x(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return Qe.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Qe?e.forEach((n=>{t.push(n)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const r=Qe.compareSegments(e.get(s),t.get(s));if(r!==0)return r}return H(e.length,t.length)}static compareSegments(e,t){const n=Qe.isNumericId(e),s=Qe.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?Qe.extractNumericId(e).compare(Qe.extractNumericId(t)):ho(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return kt.fromString(e.substring(4,e.length-2))}}class J extends Qe{construct(e,t,n){return new J(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new M(S.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((s=>s.length>0)))}return new J(t)}static emptyPath(){return new J([])}}const kg=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class _e extends Qe{construct(e,t,n){return new _e(e,t,n)}static isValidIdentifier(e){return kg.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),_e.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ml}static keyField(){return new _e([ml])}static fromServerFormat(e){const t=[];let n="",s=0;const r=()=>{if(n.length===0)throw new M(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new M(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new M(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(n+=c,s++):(r(),s++)}if(r(),a)throw new M(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new _e(t)}static emptyPath(){return new _e([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(J.fromString(e))}static fromName(e){return new L(J.fromString(e).popFirst(5))}static empty(){return new L(J.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&J.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return J.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new J(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ph(i,e,t){if(!t)throw new M(S.INVALID_ARGUMENT,`Function ${i}() cannot be called with an empty ${e}.`)}function Mg(i,e,t,n){if(e===!0&&n===!0)throw new M(S.INVALID_ARGUMENT,`${i} and ${t} cannot be used together.`)}function pl(i){if(!L.isDocumentKey(i))throw new M(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${i} has ${i.length}.`)}function gl(i){if(L.isDocumentKey(i))throw new M(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${i} has ${i.length}.`)}function gh(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}function zs(i){if(i===void 0)return"undefined";if(i===null)return"null";if(typeof i=="string")return i.length>20&&(i=`${i.substring(0,20)}...`),JSON.stringify(i);if(typeof i=="number"||typeof i=="boolean")return""+i;if(typeof i=="object"){if(i instanceof Array)return"an array";{const e=(function(n){return n.constructor?n.constructor.name:null})(i);return e?`a custom ${e} object`:"an object"}}return typeof i=="function"?"a function":x(12329,{type:typeof i})}function ft(i,e){if("_delegate"in i&&(i=i._delegate),!(i instanceof e)){if(e.name===i.constructor.name)throw new M(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=zs(i);throw new M(S.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return i}function Ng(i,e){if(e<=0)throw new M(S.INVALID_ARGUMENT,`Function ${i}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function le(i,e){const t={typeString:i};return e&&(t.value=e),t}function Ci(i,e){if(!gh(i))throw new M(S.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const s=e[n].typeString,r="value"in e[n]?{value:e[n].value}:void 0;if(!(n in i)){t=`JSON missing required field: '${n}'`;break}const a=i[n];if(s&&typeof a!==s){t=`JSON field '${n}' must be a ${s}.`;break}if(r!==void 0&&a!==r.value){t=`Expected '${n}' field to equal '${r.value}'`;break}}if(t)throw new M(S.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yl=-62135596800,_l=1e6;class ee{static now(){return ee.fromMillis(Date.now())}static fromDate(e){return ee.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*_l);return new ee(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new M(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new M(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<yl)throw new M(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new M(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/_l}_compareTo(e){return this.seconds===e.seconds?H(this.nanoseconds,e.nanoseconds):H(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ee._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ci(e,ee._jsonSchema))return new ee(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-yl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ee._jsonSchemaVersion="firestore/timestamp/1.0",ee._jsonSchema={type:le("string",ee._jsonSchemaVersion),seconds:le("number"),nanoseconds:le("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{static fromTimestamp(e){return new F(e)}static min(){return new F(new ee(0,0))}static max(){return new F(new ee(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _i=-1;function Vg(i,e){const t=i.toTimestamp().seconds,n=i.toTimestamp().nanoseconds+1,s=F.fromTimestamp(n===1e9?new ee(t+1,0):new ee(t,n));return new Vt(s,L.empty(),e)}function Lg(i){return new Vt(i.readTime,i.key,_i)}class Vt{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Vt(F.min(),L.empty(),_i)}static max(){return new Vt(F.max(),L.empty(),_i)}}function xg(i,e){let t=i.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(i.documentKey,e.documentKey),t!==0?t:H(i.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Og="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Fg{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bn(i){if(i.code!==S.FAILED_PRECONDITION||i.message!==Og)throw i;V("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&x(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P(((n,s)=>{this.nextCallback=r=>{this.wrapSuccess(e,r).next(n,s)},this.catchCallback=r=>{this.wrapFailure(t,r).next(n,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):P.reject(t)}static resolve(e){return new P(((t,n)=>{t(e)}))}static reject(e){return new P(((t,n)=>{n(e)}))}static waitFor(e){return new P(((t,n)=>{let s=0,r=0,a=!1;e.forEach((c=>{++s,c.next((()=>{++r,a&&r===s&&t()}),(u=>n(u)))})),a=!0,r===s&&t()}))}static or(e){let t=P.resolve(!1);for(const n of e)t=t.next((s=>s?P.resolve(s):n()));return t}static forEach(e,t){const n=[];return e.forEach(((s,r)=>{n.push(t.call(this,s,r))})),this.waitFor(n)}static mapArray(e,t){return new P(((n,s)=>{const r=e.length,a=new Array(r);let c=0;for(let u=0;u<r;u++){const h=u;t(e[h]).next((f=>{a[h]=f,++c,c===r&&n(a)}),(f=>s(f)))}}))}static doWhile(e,t){return new P(((n,s)=>{const r=()=>{e()===!0?t().next((()=>{r()}),s):n()};r()}))}}function Ug(i){const e=i.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function $n(i){return i.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>t.writeSequenceNumber(n))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}qs.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oo=-1;function js(i){return i==null}function Is(i){return i===0&&1/i==-1/0}function Bg(i){return typeof i=="number"&&Number.isInteger(i)&&!Is(i)&&i<=Number.MAX_SAFE_INTEGER&&i>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yh="";function $g(i){let e="";for(let t=0;t<i.length;t++)e.length>0&&(e=vl(e)),e=zg(i.get(t),e);return vl(e)}function zg(i,e){let t=e;const n=i.length;for(let s=0;s<n;s++){const r=i.charAt(s);switch(r){case"\0":t+="";break;case yh:t+="";break;default:t+=r}}return t}function vl(i){return i+yh+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wl(i){let e=0;for(const t in i)Object.prototype.hasOwnProperty.call(i,t)&&e++;return e}function Bt(i,e){for(const t in i)Object.prototype.hasOwnProperty.call(i,t)&&e(t,i[t])}function _h(i){for(const e in i)if(Object.prototype.hasOwnProperty.call(i,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e,t){this.comparator=e,this.root=t||ye.EMPTY}insert(e,t){return new te(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ye.BLACK,null,null))}remove(e){return new te(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ye.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new is(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new is(this.root,e,this.comparator,!1)}getReverseIterator(){return new is(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new is(this.root,e,this.comparator,!0)}}class is{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let r=1;for(;!e.isEmpty();)if(r=t?n(e.key,t):1,t&&s&&(r*=-1),r<0)e=this.isReverse?e.left:e.right;else{if(r===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ye{constructor(e,t,n,s,r){this.key=e,this.value=t,this.color=n??ye.RED,this.left=s??ye.EMPTY,this.right=r??ye.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,r){return new ye(e??this.key,t??this.value,n??this.color,s??this.left,r??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const r=n(e,s.key);return s=r<0?s.copy(null,null,null,s.left.insert(e,t,n),null):r===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ye.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return ye.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ye.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ye.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw x(43730,{key:this.key,value:this.value});if(this.right.isRed())throw x(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw x(27949);return e+(this.isRed()?0:1)}}ye.EMPTY=null,ye.RED=!0,ye.BLACK=!1;ye.EMPTY=new class{constructor(){this.size=0}get key(){throw x(57766)}get value(){throw x(16141)}get color(){throw x(16727)}get left(){throw x(29726)}get right(){throw x(36894)}copy(e,t,n,s,r){return this}insert(e,t,n){return new ye(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e){this.comparator=e,this.data=new te(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new El(this.data.getIterator())}getIteratorFrom(e){return new El(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((n=>{t=t.add(n)})),t}isEqual(e){if(!(e instanceof fe)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,r=n.getNext().key;if(this.comparator(s,r)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new fe(this.comparator);return t.data=e,t}}class El{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this.fields=e,e.sort(_e.comparator)}static empty(){return new Le([])}unionWith(e){let t=new fe(_e.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Le(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Dn(this.fields,e.fields,((t,n)=>t.isEqual(n)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new vh("Invalid base64 string: "+r):r}})(e);return new ve(t)}static fromUint8Array(e){const t=(function(s){let r="";for(let a=0;a<s.length;++a)r+=String.fromCharCode(s[a]);return r})(e);return new ve(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return H(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ve.EMPTY_BYTE_STRING=new ve("");const qg=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Lt(i){if(Q(!!i,39018),typeof i=="string"){let e=0;const t=qg.exec(i);if(Q(!!t,46558,{timestamp:i}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(i);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:ie(i.seconds),nanos:ie(i.nanos)}}function ie(i){return typeof i=="number"?i:typeof i=="string"?Number(i):0}function xt(i){return typeof i=="string"?ve.fromBase64String(i):ve.fromUint8Array(i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wh="server_timestamp",Eh="__type__",Ih="__previous_value__",Th="__local_write_time__";function Hs(i){return(i?.mapValue?.fields||{})[Eh]?.stringValue===wh}function Gs(i){const e=i.mapValue.fields[Ih];return Hs(e)?Gs(e):e}function vi(i){const e=Lt(i.mapValue.fields[Th].timestampValue);return new ee(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jg{constructor(e,t,n,s,r,a,c,u,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=r,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f}}const Ts="(default)";class wi{constructor(e,t){this.projectId=e,this.database=t||Ts}static empty(){return new wi("","")}get isDefaultDatabase(){return this.database===Ts}isEqual(e){return e instanceof wi&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bh="__type__",Hg="__max__",ss={mapValue:{}},Ah="__vector__",bs="value";function Ot(i){return"nullValue"in i?0:"booleanValue"in i?1:"integerValue"in i||"doubleValue"in i?2:"timestampValue"in i?3:"stringValue"in i?5:"bytesValue"in i?6:"referenceValue"in i?7:"geoPointValue"in i?8:"arrayValue"in i?9:"mapValue"in i?Hs(i)?4:Wg(i)?9007199254740991:Gg(i)?10:11:x(28295,{value:i})}function nt(i,e){if(i===e)return!0;const t=Ot(i);if(t!==Ot(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return i.booleanValue===e.booleanValue;case 4:return vi(i).isEqual(vi(e));case 3:return(function(s,r){if(typeof s.timestampValue=="string"&&typeof r.timestampValue=="string"&&s.timestampValue.length===r.timestampValue.length)return s.timestampValue===r.timestampValue;const a=Lt(s.timestampValue),c=Lt(r.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos})(i,e);case 5:return i.stringValue===e.stringValue;case 6:return(function(s,r){return xt(s.bytesValue).isEqual(xt(r.bytesValue))})(i,e);case 7:return i.referenceValue===e.referenceValue;case 8:return(function(s,r){return ie(s.geoPointValue.latitude)===ie(r.geoPointValue.latitude)&&ie(s.geoPointValue.longitude)===ie(r.geoPointValue.longitude)})(i,e);case 2:return(function(s,r){if("integerValue"in s&&"integerValue"in r)return ie(s.integerValue)===ie(r.integerValue);if("doubleValue"in s&&"doubleValue"in r){const a=ie(s.doubleValue),c=ie(r.doubleValue);return a===c?Is(a)===Is(c):isNaN(a)&&isNaN(c)}return!1})(i,e);case 9:return Dn(i.arrayValue.values||[],e.arrayValue.values||[],nt);case 10:case 11:return(function(s,r){const a=s.mapValue.fields||{},c=r.mapValue.fields||{};if(wl(a)!==wl(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!nt(a[u],c[u])))return!1;return!0})(i,e);default:return x(52216,{left:i})}}function Ei(i,e){return(i.values||[]).find((t=>nt(t,e)))!==void 0}function kn(i,e){if(i===e)return 0;const t=Ot(i),n=Ot(e);if(t!==n)return H(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return H(i.booleanValue,e.booleanValue);case 2:return(function(r,a){const c=ie(r.integerValue||r.doubleValue),u=ie(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(i,e);case 3:return Il(i.timestampValue,e.timestampValue);case 4:return Il(vi(i),vi(e));case 5:return ho(i.stringValue,e.stringValue);case 6:return(function(r,a){const c=xt(r),u=xt(a);return c.compareTo(u)})(i.bytesValue,e.bytesValue);case 7:return(function(r,a){const c=r.split("/"),u=a.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=H(c[h],u[h]);if(f!==0)return f}return H(c.length,u.length)})(i.referenceValue,e.referenceValue);case 8:return(function(r,a){const c=H(ie(r.latitude),ie(a.latitude));return c!==0?c:H(ie(r.longitude),ie(a.longitude))})(i.geoPointValue,e.geoPointValue);case 9:return Tl(i.arrayValue,e.arrayValue);case 10:return(function(r,a){const c=r.fields||{},u=a.fields||{},h=c[bs]?.arrayValue,f=u[bs]?.arrayValue,p=H(h?.values?.length||0,f?.values?.length||0);return p!==0?p:Tl(h,f)})(i.mapValue,e.mapValue);case 11:return(function(r,a){if(r===ss.mapValue&&a===ss.mapValue)return 0;if(r===ss.mapValue)return 1;if(a===ss.mapValue)return-1;const c=r.fields||{},u=Object.keys(c),h=a.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const v=ho(u[p],f[p]);if(v!==0)return v;const R=kn(c[u[p]],h[f[p]]);if(R!==0)return R}return H(u.length,f.length)})(i.mapValue,e.mapValue);default:throw x(23264,{he:t})}}function Il(i,e){if(typeof i=="string"&&typeof e=="string"&&i.length===e.length)return H(i,e);const t=Lt(i),n=Lt(e),s=H(t.seconds,n.seconds);return s!==0?s:H(t.nanos,n.nanos)}function Tl(i,e){const t=i.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const r=kn(t[s],n[s]);if(r)return r}return H(t.length,n.length)}function Mn(i){return fo(i)}function fo(i){return"nullValue"in i?"null":"booleanValue"in i?""+i.booleanValue:"integerValue"in i?""+i.integerValue:"doubleValue"in i?""+i.doubleValue:"timestampValue"in i?(function(t){const n=Lt(t);return`time(${n.seconds},${n.nanos})`})(i.timestampValue):"stringValue"in i?i.stringValue:"bytesValue"in i?(function(t){return xt(t).toBase64()})(i.bytesValue):"referenceValue"in i?(function(t){return L.fromName(t).toString()})(i.referenceValue):"geoPointValue"in i?(function(t){return`geo(${t.latitude},${t.longitude})`})(i.geoPointValue):"arrayValue"in i?(function(t){let n="[",s=!0;for(const r of t.values||[])s?s=!1:n+=",",n+=fo(r);return n+"]"})(i.arrayValue):"mapValue"in i?(function(t){const n=Object.keys(t.fields||{}).sort();let s="{",r=!0;for(const a of n)r?r=!1:s+=",",s+=`${a}:${fo(t.fields[a])}`;return s+"}"})(i.mapValue):x(61005,{value:i})}function hs(i){switch(Ot(i)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Gs(i);return e?16+hs(e):16;case 5:return 2*i.stringValue.length;case 6:return xt(i.bytesValue).approximateByteSize();case 7:return i.referenceValue.length;case 9:return(function(n){return(n.values||[]).reduce(((s,r)=>s+hs(r)),0)})(i.arrayValue);case 10:case 11:return(function(n){let s=0;return Bt(n.fields,((r,a)=>{s+=r.length+hs(a)})),s})(i.mapValue);default:throw x(13486,{value:i})}}function As(i,e){return{referenceValue:`projects/${i.projectId}/databases/${i.database}/documents/${e.path.canonicalString()}`}}function mo(i){return!!i&&"integerValue"in i}function Fo(i){return!!i&&"arrayValue"in i}function bl(i){return!!i&&"nullValue"in i}function Al(i){return!!i&&"doubleValue"in i&&isNaN(Number(i.doubleValue))}function ds(i){return!!i&&"mapValue"in i}function Gg(i){return(i?.mapValue?.fields||{})[bh]?.stringValue===Ah}function fi(i){if(i.geoPointValue)return{geoPointValue:{...i.geoPointValue}};if(i.timestampValue&&typeof i.timestampValue=="object")return{timestampValue:{...i.timestampValue}};if(i.mapValue){const e={mapValue:{fields:{}}};return Bt(i.mapValue.fields,((t,n)=>e.mapValue.fields[t]=fi(n))),e}if(i.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(i.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=fi(i.arrayValue.values[t]);return e}return{...i}}function Wg(i){return(((i.mapValue||{}).fields||{}).__type__||{}).stringValue===Hg}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(e){this.value=e}static empty(){return new Ne({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!ds(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=fi(t)}setAll(e){let t=_e.emptyPath(),n={},s=[];e.forEach(((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,n,s),n={},s=[],t=c.popLast()}a?n[c.lastSegment()]=fi(a):s.push(c.lastSegment())}));const r=this.getFieldsMap(t);this.applyChanges(r,n,s)}delete(e){const t=this.field(e.popLast());ds(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return nt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];ds(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){Bt(t,((s,r)=>e[s]=r));for(const s of n)delete e[s]}clone(){return new Ne(fi(this.value))}}function Sh(i){const e=[];return Bt(i.fields,((t,n)=>{const s=new _e([t]);if(ds(n)){const r=Sh(n.mapValue).fields;if(r.length===0)e.push(s);else for(const a of r)e.push(s.child(a))}else e.push(s)})),new Le(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e,t,n,s,r,a,c){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=r,this.data=a,this.documentState=c}static newInvalidDocument(e){return new be(e,0,F.min(),F.min(),F.min(),Ne.empty(),0)}static newFoundDocument(e,t,n,s){return new be(e,1,t,F.min(),n,s,0)}static newNoDocument(e,t){return new be(e,2,t,F.min(),F.min(),Ne.empty(),0)}static newUnknownDocument(e,t){return new be(e,3,t,F.min(),F.min(),Ne.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(F.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ne.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ne.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=F.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof be&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new be(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e,t){this.position=e,this.inclusive=t}}function Sl(i,e,t){let n=0;for(let s=0;s<i.position.length;s++){const r=e[s],a=i.position[s];if(r.field.isKeyField()?n=L.comparator(L.fromName(a.referenceValue),t.key):n=kn(a,t.data.field(r.field)),r.dir==="desc"&&(n*=-1),n!==0)break}return n}function Rl(i,e){if(i===null)return e===null;if(e===null||i.inclusive!==e.inclusive||i.position.length!==e.position.length)return!1;for(let t=0;t<i.position.length;t++)if(!nt(i.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(e,t="asc"){this.field=e,this.dir=t}}function Kg(i,e){return i.dir===e.dir&&i.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rh{}class ce extends Rh{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new Yg(e,t,n):t==="array-contains"?new Zg(e,n):t==="in"?new ey(e,n):t==="not-in"?new ty(e,n):t==="array-contains-any"?new ny(e,n):new ce(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new Xg(e,n):new Jg(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(kn(t,this.value)):t!==null&&Ot(this.value)===Ot(t)&&this.matchesComparison(kn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return x(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class He extends Rh{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new He(e,t)}matches(e){return Ph(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Ph(i){return i.op==="and"}function Ch(i){return Qg(i)&&Ph(i)}function Qg(i){for(const e of i.filters)if(e instanceof He)return!1;return!0}function po(i){if(i instanceof ce)return i.field.canonicalString()+i.op.toString()+Mn(i.value);if(Ch(i))return i.filters.map((e=>po(e))).join(",");{const e=i.filters.map((t=>po(t))).join(",");return`${i.op}(${e})`}}function Dh(i,e){return i instanceof ce?(function(n,s){return s instanceof ce&&n.op===s.op&&n.field.isEqual(s.field)&&nt(n.value,s.value)})(i,e):i instanceof He?(function(n,s){return s instanceof He&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce(((r,a,c)=>r&&Dh(a,s.filters[c])),!0):!1})(i,e):void x(19439)}function kh(i){return i instanceof ce?(function(t){return`${t.field.canonicalString()} ${t.op} ${Mn(t.value)}`})(i):i instanceof He?(function(t){return t.op.toString()+" {"+t.getFilters().map(kh).join(" ,")+"}"})(i):"Filter"}class Yg extends ce{constructor(e,t,n){super(e,t,n),this.key=L.fromName(n.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class Xg extends ce{constructor(e,t){super(e,"in",t),this.keys=Mh("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class Jg extends ce{constructor(e,t){super(e,"not-in",t),this.keys=Mh("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Mh(i,e){return(e.arrayValue?.values||[]).map((t=>L.fromName(t.referenceValue)))}class Zg extends ce{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Fo(t)&&Ei(t.arrayValue,this.value)}}class ey extends ce{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ei(this.value.arrayValue,t)}}class ty extends ce{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ei(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Ei(this.value.arrayValue,t)}}class ny extends ce{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Fo(t)||!t.arrayValue.values)&&t.arrayValue.values.some((n=>Ei(this.value.arrayValue,n)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iy{constructor(e,t=null,n=[],s=[],r=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=r,this.startAt=a,this.endAt=c,this.Te=null}}function Pl(i,e=null,t=[],n=[],s=null,r=null,a=null){return new iy(i,e,t,n,s,r,a)}function Uo(i){const e=U(i);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((n=>po(n))).join(","),t+="|ob:",t+=e.orderBy.map((n=>(function(r){return r.field.canonicalString()+r.dir})(n))).join(","),js(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((n=>Mn(n))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((n=>Mn(n))).join(",")),e.Te=t}return e.Te}function Bo(i,e){if(i.limit!==e.limit||i.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<i.orderBy.length;t++)if(!Kg(i.orderBy[t],e.orderBy[t]))return!1;if(i.filters.length!==e.filters.length)return!1;for(let t=0;t<i.filters.length;t++)if(!Dh(i.filters[t],e.filters[t]))return!1;return i.collectionGroup===e.collectionGroup&&!!i.path.isEqual(e.path)&&!!Rl(i.startAt,e.startAt)&&Rl(i.endAt,e.endAt)}function go(i){return L.isDocumentKey(i.path)&&i.collectionGroup===null&&i.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e,t=null,n=[],s=[],r=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=r,this.limitType=a,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function sy(i,e,t,n,s,r,a,c){return new ln(i,e,t,n,s,r,a,c)}function $o(i){return new ln(i)}function Cl(i){return i.filters.length===0&&i.limit===null&&i.startAt==null&&i.endAt==null&&(i.explicitOrderBy.length===0||i.explicitOrderBy.length===1&&i.explicitOrderBy[0].field.isKeyField())}function zo(i){return i.collectionGroup!==null}function In(i){const e=U(i);if(e.Ie===null){e.Ie=[];const t=new Set;for(const r of e.explicitOrderBy)e.Ie.push(r),t.add(r.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new fe(_e.comparator);return a.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((r=>{t.has(r.canonicalString())||r.isKeyField()||e.Ie.push(new Ii(r,n))})),t.has(_e.keyField().canonicalString())||e.Ie.push(new Ii(_e.keyField(),n))}return e.Ie}function Ye(i){const e=U(i);return e.Ee||(e.Ee=ry(e,In(i))),e.Ee}function ry(i,e){if(i.limitType==="F")return Pl(i.path,i.collectionGroup,e,i.filters,i.limit,i.startAt,i.endAt);{e=e.map((s=>{const r=s.dir==="desc"?"asc":"desc";return new Ii(s.field,r)}));const t=i.endAt?new Nn(i.endAt.position,i.endAt.inclusive):null,n=i.startAt?new Nn(i.startAt.position,i.startAt.inclusive):null;return Pl(i.path,i.collectionGroup,e,i.filters,i.limit,t,n)}}function yo(i,e){const t=i.filters.concat([e]);return new ln(i.path,i.collectionGroup,i.explicitOrderBy.slice(),t,i.limit,i.limitType,i.startAt,i.endAt)}function Ss(i,e,t){return new ln(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),e,t,i.startAt,i.endAt)}function Ws(i,e){return Bo(Ye(i),Ye(e))&&i.limitType===e.limitType}function Nh(i){return`${Uo(Ye(i))}|lt:${i.limitType}`}function yn(i){return`Query(target=${(function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map((s=>kh(s))).join(", ")}]`),js(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((s=>Mn(s))).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((s=>Mn(s))).join(",")),`Target(${n})`})(Ye(i))}; limitType=${i.limitType})`}function Ks(i,e){return e.isFoundDocument()&&(function(n,s){const r=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(r):L.isDocumentKey(n.path)?n.path.isEqual(r):n.path.isImmediateParentOf(r)})(i,e)&&(function(n,s){for(const r of In(n))if(!r.field.isKeyField()&&s.data.field(r.field)===null)return!1;return!0})(i,e)&&(function(n,s){for(const r of n.filters)if(!r.matches(s))return!1;return!0})(i,e)&&(function(n,s){return!(n.startAt&&!(function(a,c,u){const h=Sl(a,c,u);return a.inclusive?h<=0:h<0})(n.startAt,In(n),s)||n.endAt&&!(function(a,c,u){const h=Sl(a,c,u);return a.inclusive?h>=0:h>0})(n.endAt,In(n),s))})(i,e)}function oy(i){return i.collectionGroup||(i.path.length%2==1?i.path.lastSegment():i.path.get(i.path.length-2))}function Vh(i){return(e,t)=>{let n=!1;for(const s of In(i)){const r=ay(s,e,t);if(r!==0)return r;n=n||s.field.isKeyField()}return 0}}function ay(i,e,t){const n=i.field.isKeyField()?L.comparator(e.key,t.key):(function(r,a,c){const u=a.data.field(r),h=c.data.field(r);return u!==null&&h!==null?kn(u,h):x(42886)})(i.field,e,t);switch(i.dir){case"asc":return n;case"desc":return-1*n;default:return x(19790,{direction:i.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,r]of n)if(this.equalsFn(s,e))return r}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return void(s[r]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Bt(this.inner,((t,n)=>{for(const[s,r]of n)e(s,r)}))}isEmpty(){return _h(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cy=new te(L.comparator);function mt(){return cy}const Lh=new te(L.comparator);function li(...i){let e=Lh;for(const t of i)e=e.insert(t.key,t);return e}function xh(i){let e=Lh;return i.forEach(((t,n)=>e=e.insert(t,n.overlayedDocument))),e}function Yt(){return mi()}function Oh(){return mi()}function mi(){return new un((i=>i.toString()),((i,e)=>i.isEqual(e)))}const ly=new te(L.comparator),uy=new fe(L.comparator);function G(...i){let e=uy;for(const t of i)e=e.add(t);return e}const hy=new fe(H);function dy(){return hy}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qo(i,e){if(i.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Is(e)?"-0":e}}function Fh(i){return{integerValue:""+i}}function Uh(i,e){return Bg(e)?Fh(e):qo(i,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(){this._=void 0}}function fy(i,e,t){return i instanceof Ti?(function(s,r){const a={fields:{[Eh]:{stringValue:wh},[Th]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return r&&Hs(r)&&(r=Gs(r)),r&&(a.fields[Ih]=r),{mapValue:a}})(t,e):i instanceof bi?$h(i,e):i instanceof Ai?zh(i,e):(function(s,r){const a=Bh(s,r),c=Dl(a)+Dl(s.Ae);return mo(a)&&mo(s.Ae)?Fh(c):qo(s.serializer,c)})(i,e)}function my(i,e,t){return i instanceof bi?$h(i,e):i instanceof Ai?zh(i,e):t}function Bh(i,e){return i instanceof Si?(function(n){return mo(n)||(function(r){return!!r&&"doubleValue"in r})(n)})(e)?e:{integerValue:0}:null}class Ti extends Qs{}class bi extends Qs{constructor(e){super(),this.elements=e}}function $h(i,e){const t=qh(e);for(const n of i.elements)t.some((s=>nt(s,n)))||t.push(n);return{arrayValue:{values:t}}}class Ai extends Qs{constructor(e){super(),this.elements=e}}function zh(i,e){let t=qh(e);for(const n of i.elements)t=t.filter((s=>!nt(s,n)));return{arrayValue:{values:t}}}class Si extends Qs{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Dl(i){return ie(i.integerValue||i.doubleValue)}function qh(i){return Fo(i)&&i.arrayValue.values?i.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jh{constructor(e,t){this.field=e,this.transform=t}}function py(i,e){return i.field.isEqual(e.field)&&(function(n,s){return n instanceof bi&&s instanceof bi||n instanceof Ai&&s instanceof Ai?Dn(n.elements,s.elements,nt):n instanceof Si&&s instanceof Si?nt(n.Ae,s.Ae):n instanceof Ti&&s instanceof Ti})(i.transform,e.transform)}class gy{constructor(e,t){this.version=e,this.transformResults=t}}class ze{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ze}static exists(e){return new ze(void 0,e)}static updateTime(e){return new ze(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function fs(i,e){return i.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(i.updateTime):i.exists===void 0||i.exists===e.isFoundDocument()}class Ys{}function Hh(i,e){if(!i.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return i.isNoDocument()?new jo(i.key,ze.none()):new Di(i.key,i.data,ze.none());{const t=i.data,n=Ne.empty();let s=new fe(_e.comparator);for(let r of e.fields)if(!s.has(r)){let a=t.field(r);a===null&&r.length>1&&(r=r.popLast(),a=t.field(r)),a===null?n.delete(r):n.set(r,a),s=s.add(r)}return new $t(i.key,n,new Le(s.toArray()),ze.none())}}function yy(i,e,t){i instanceof Di?(function(s,r,a){const c=s.value.clone(),u=Ml(s.fieldTransforms,r,a.transformResults);c.setAll(u),r.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(i,e,t):i instanceof $t?(function(s,r,a){if(!fs(s.precondition,r))return void r.convertToUnknownDocument(a.version);const c=Ml(s.fieldTransforms,r,a.transformResults),u=r.data;u.setAll(Gh(s)),u.setAll(c),r.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(i,e,t):(function(s,r,a){r.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function pi(i,e,t,n){return i instanceof Di?(function(r,a,c,u){if(!fs(r.precondition,a))return c;const h=r.value.clone(),f=Nl(r.fieldTransforms,u,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null})(i,e,t,n):i instanceof $t?(function(r,a,c,u){if(!fs(r.precondition,a))return c;const h=Nl(r.fieldTransforms,u,a),f=a.data;return f.setAll(Gh(r)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map((p=>p.field)))})(i,e,t,n):(function(r,a,c){return fs(r.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c})(i,e,t)}function _y(i,e){let t=null;for(const n of i.fieldTransforms){const s=e.data.field(n.field),r=Bh(n.transform,s||null);r!=null&&(t===null&&(t=Ne.empty()),t.set(n.field,r))}return t||null}function kl(i,e){return i.type===e.type&&!!i.key.isEqual(e.key)&&!!i.precondition.isEqual(e.precondition)&&!!(function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&Dn(n,s,((r,a)=>py(r,a)))})(i.fieldTransforms,e.fieldTransforms)&&(i.type===0?i.value.isEqual(e.value):i.type!==1||i.data.isEqual(e.data)&&i.fieldMask.isEqual(e.fieldMask))}class Di extends Ys{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class $t extends Ys{constructor(e,t,n,s,r=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function Gh(i){const e=new Map;return i.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const n=i.data.field(t);e.set(t,n)}})),e}function Ml(i,e,t){const n=new Map;Q(i.length===t.length,32656,{Re:t.length,Ve:i.length});for(let s=0;s<t.length;s++){const r=i[s],a=r.transform,c=e.data.field(r.field);n.set(r.field,my(a,c,t[s]))}return n}function Nl(i,e,t){const n=new Map;for(const s of i){const r=s.transform,a=t.data.field(s.field);n.set(s.field,fy(r,a,e))}return n}class jo extends Ys{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class vy extends Ys{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wy{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const r=this.mutations[s];r.key.isEqual(e.key)&&yy(r,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=pi(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=pi(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Oh();return this.mutations.forEach((s=>{const r=e.get(s.key),a=r.overlayedDocument;let c=this.applyToLocalView(a,r.mutatedFields);c=t.has(s.key)?null:c;const u=Hh(a,c);u!==null&&n.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(F.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),G())}isEqual(e){return this.batchId===e.batchId&&Dn(this.mutations,e.mutations,((t,n)=>kl(t,n)))&&Dn(this.baseMutations,e.baseMutations,((t,n)=>kl(t,n)))}}class Ho{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){Q(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let s=(function(){return ly})();const r=e.mutations;for(let a=0;a<r.length;a++)s=s.insert(r[a].key,n[a].version);return new Ho(e,t,n,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ey{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iy{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ae,W;function Ty(i){switch(i){case S.OK:return x(64938);case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0;default:return x(15467,{code:i})}}function Wh(i){if(i===void 0)return dt("GRPC error has no .code"),S.UNKNOWN;switch(i){case ae.OK:return S.OK;case ae.CANCELLED:return S.CANCELLED;case ae.UNKNOWN:return S.UNKNOWN;case ae.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case ae.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case ae.INTERNAL:return S.INTERNAL;case ae.UNAVAILABLE:return S.UNAVAILABLE;case ae.UNAUTHENTICATED:return S.UNAUTHENTICATED;case ae.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case ae.NOT_FOUND:return S.NOT_FOUND;case ae.ALREADY_EXISTS:return S.ALREADY_EXISTS;case ae.PERMISSION_DENIED:return S.PERMISSION_DENIED;case ae.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case ae.ABORTED:return S.ABORTED;case ae.OUT_OF_RANGE:return S.OUT_OF_RANGE;case ae.UNIMPLEMENTED:return S.UNIMPLEMENTED;case ae.DATA_LOSS:return S.DATA_LOSS;default:return x(39323,{code:i})}}(W=ae||(ae={}))[W.OK=0]="OK",W[W.CANCELLED=1]="CANCELLED",W[W.UNKNOWN=2]="UNKNOWN",W[W.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",W[W.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",W[W.NOT_FOUND=5]="NOT_FOUND",W[W.ALREADY_EXISTS=6]="ALREADY_EXISTS",W[W.PERMISSION_DENIED=7]="PERMISSION_DENIED",W[W.UNAUTHENTICATED=16]="UNAUTHENTICATED",W[W.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",W[W.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",W[W.ABORTED=10]="ABORTED",W[W.OUT_OF_RANGE=11]="OUT_OF_RANGE",W[W.UNIMPLEMENTED=12]="UNIMPLEMENTED",W[W.INTERNAL=13]="INTERNAL",W[W.UNAVAILABLE=14]="UNAVAILABLE",W[W.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function by(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ay=new kt([4294967295,4294967295],0);function Vl(i){const e=by().encode(i),t=new ah;return t.update(e),new Uint8Array(t.digest())}function Ll(i){const e=new DataView(i.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),r=e.getUint32(12,!0);return[new kt([t,n],0),new kt([s,r],0)]}class Go{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new ui(`Invalid padding: ${t}`);if(n<0)throw new ui(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new ui(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new ui(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=kt.fromNumber(this.ge)}ye(e,t,n){let s=e.add(t.multiply(kt.fromNumber(n)));return s.compare(Ay)===1&&(s=new kt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Vl(e),[n,s]=Ll(t);for(let r=0;r<this.hashCount;r++){const a=this.ye(n,s,r);if(!this.we(a))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,r=new Uint8Array(Math.ceil(e/8)),a=new Go(r,s,t);return n.forEach((c=>a.insert(c))),a}insert(e){if(this.ge===0)return;const t=Vl(e),[n,s]=Ll(t);for(let r=0;r<this.hashCount;r++){const a=this.ye(n,s,r);this.Se(a)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class ui extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e,t,n,s,r){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,ki.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Xs(F.min(),s,new te(H),mt(),G())}}class ki{constructor(e,t,n,s,r){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new ki(n,t,G(),G(),G())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(e,t,n,s){this.be=e,this.removedTargetIds=t,this.key=n,this.De=s}}class Kh{constructor(e,t){this.targetId=e,this.Ce=t}}class Qh{constructor(e,t,n=ve.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class xl{constructor(){this.ve=0,this.Fe=Ol(),this.Me=ve.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=G(),t=G(),n=G();return this.Fe.forEach(((s,r)=>{switch(r){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:x(38017,{changeType:r})}})),new ki(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=Ol()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,Q(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Sy{constructor(e){this.Ge=e,this.ze=new Map,this.je=mt(),this.Je=rs(),this.He=rs(),this.Ye=new te(H)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.We(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:x(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((n,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,n=e.Ce.count,s=this.ot(t);if(s){const r=s.target;if(go(r))if(n===0){const a=new L(r.path);this.et(t,a,be.newNoDocument(a,F.min()))}else Q(n===1,20013,{expectedCount:n});else{const a=this._t(t);if(a!==n){const c=this.ut(e),u=c?this.ct(c,e,a):1;if(u!==0){this.it(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,h)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:r=0}=t;let a,c;try{a=xt(n).toUint8Array()}catch(u){if(u instanceof vh)return Cn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Go(a,s,r)}catch(u){return Cn(u instanceof ui?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let s=0;return n.forEach((r=>{const a=this.Ge.ht(),c=`projects/${a.projectId}/databases/${a.database}/documents/${r.path.canonicalString()}`;e.mightContain(c)||(this.et(t,r,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((r,a)=>{const c=this.ot(a);if(c){if(r.current&&go(c.target)){const u=new L(c.target.path);this.It(u).has(a)||this.Et(a,u)||this.et(a,u,be.newNoDocument(u,e))}r.Be&&(t.set(a,r.ke()),r.qe())}}));let n=G();this.He.forEach(((r,a)=>{let c=!0;a.forEachWhile((u=>{const h=this.ot(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(n=n.add(r))})),this.je.forEach(((r,a)=>a.setReadTime(e)));const s=new Xs(e,t,this.Ye,this.je,n);return this.je=mt(),this.Je=rs(),this.He=rs(),this.Ye=new te(H),s}Xe(e,t){if(!this.rt(e))return;const n=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new xl,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new fe(H),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new fe(H),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||V("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new xl),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function rs(){return new te(L.comparator)}function Ol(){return new te(L.comparator)}const Ry={asc:"ASCENDING",desc:"DESCENDING"},Py={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Cy={and:"AND",or:"OR"};class Dy{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function _o(i,e){return i.useProto3Json||js(e)?e:{value:e}}function Rs(i,e){return i.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Yh(i,e){return i.useProto3Json?e.toBase64():e.toUint8Array()}function ky(i,e){return Rs(i,e.toTimestamp())}function Xe(i){return Q(!!i,49232),F.fromTimestamp((function(t){const n=Lt(t);return new ee(n.seconds,n.nanos)})(i))}function Wo(i,e){return vo(i,e).canonicalString()}function vo(i,e){const t=(function(s){return new J(["projects",s.projectId,"databases",s.database])})(i).child("documents");return e===void 0?t:t.child(e)}function Xh(i){const e=J.fromString(i);return Q(nd(e),10190,{key:e.toString()}),e}function wo(i,e){return Wo(i.databaseId,e.path)}function Hr(i,e){const t=Xh(e);if(t.get(1)!==i.databaseId.projectId)throw new M(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+i.databaseId.projectId);if(t.get(3)!==i.databaseId.database)throw new M(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+i.databaseId.database);return new L(Zh(t))}function Jh(i,e){return Wo(i.databaseId,e)}function My(i){const e=Xh(i);return e.length===4?J.emptyPath():Zh(e)}function Eo(i){return new J(["projects",i.databaseId.projectId,"databases",i.databaseId.database]).canonicalString()}function Zh(i){return Q(i.length>4&&i.get(4)==="documents",29091,{key:i.toString()}),i.popFirst(5)}function Fl(i,e,t){return{name:wo(i,e),fields:t.value.mapValue.fields}}function Ny(i,e){let t;if("targetChange"in e){e.targetChange;const n=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:x(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],r=(function(h,f){return h.useProto3Json?(Q(f===void 0||typeof f=="string",58123),ve.fromBase64String(f||"")):(Q(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),ve.fromUint8Array(f||new Uint8Array))})(i,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&(function(h){const f=h.code===void 0?S.UNKNOWN:Wh(h.code);return new M(f,h.message||"")})(a);t=new Qh(n,s,r,c||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=Hr(i,n.document.name),r=Xe(n.document.updateTime),a=n.document.createTime?Xe(n.document.createTime):F.min(),c=new Ne({mapValue:{fields:n.document.fields}}),u=be.newFoundDocument(s,r,a,c),h=n.targetIds||[],f=n.removedTargetIds||[];t=new ms(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=Hr(i,n.document),r=n.readTime?Xe(n.readTime):F.min(),a=be.newNoDocument(s,r),c=n.removedTargetIds||[];t=new ms([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=Hr(i,n.document),r=n.removedTargetIds||[];t=new ms([],r,s,null)}else{if(!("filter"in e))return x(11601,{Rt:e});{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:r}=n,a=new Iy(s,r),c=n.targetId;t=new Kh(c,a)}}return t}function Vy(i,e){let t;if(e instanceof Di)t={update:Fl(i,e.key,e.value)};else if(e instanceof jo)t={delete:wo(i,e.key)};else if(e instanceof $t)t={update:Fl(i,e.key,e.data),updateMask:qy(e.fieldMask)};else{if(!(e instanceof vy))return x(16599,{Vt:e.type});t={verify:wo(i,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((n=>(function(r,a){const c=a.transform;if(c instanceof Ti)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof bi)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Ai)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Si)return{fieldPath:a.field.canonicalString(),increment:c.Ae};throw x(20930,{transform:a.transform})})(0,n)))),e.precondition.isNone||(t.currentDocument=(function(s,r){return r.updateTime!==void 0?{updateTime:ky(s,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:x(27497)})(i,e.precondition)),t}function Ly(i,e){return i&&i.length>0?(Q(e!==void 0,14353),i.map((t=>(function(s,r){let a=s.updateTime?Xe(s.updateTime):Xe(r);return a.isEqual(F.min())&&(a=Xe(r)),new gy(a,s.transformResults||[])})(t,e)))):[]}function xy(i,e){return{documents:[Jh(i,e.path)]}}function Oy(i,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=Jh(i,s);const r=(function(h){if(h.length!==0)return td(He.create(h,"and"))})(e.filters);r&&(t.structuredQuery.where=r);const a=(function(h){if(h.length!==0)return h.map((f=>(function(v){return{field:_n(v.field),direction:By(v.dir)}})(f)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=_o(i,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{ft:t,parent:s}}function Fy(i){let e=My(i.parent);const t=i.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){Q(n===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let r=[];t.where&&(r=(function(p){const v=ed(p);return v instanceof He&&Ch(v)?v.getFilters():[v]})(t.where));let a=[];t.orderBy&&(a=(function(p){return p.map((v=>(function(D){return new Ii(vn(D.field),(function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(D.direction))})(v)))})(t.orderBy));let c=null;t.limit&&(c=(function(p){let v;return v=typeof p=="object"?p.value:p,js(v)?null:v})(t.limit));let u=null;t.startAt&&(u=(function(p){const v=!!p.before,R=p.values||[];return new Nn(R,v)})(t.startAt));let h=null;return t.endAt&&(h=(function(p){const v=!p.before,R=p.values||[];return new Nn(R,v)})(t.endAt)),sy(e,s,a,r,c,"F",u,h)}function Uy(i,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return x(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function ed(i){return i.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=vn(t.unaryFilter.field);return ce.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=vn(t.unaryFilter.field);return ce.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=vn(t.unaryFilter.field);return ce.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=vn(t.unaryFilter.field);return ce.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return x(61313);default:return x(60726)}})(i):i.fieldFilter!==void 0?(function(t){return ce.create(vn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return x(58110);default:return x(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(i):i.compositeFilter!==void 0?(function(t){return He.create(t.compositeFilter.filters.map((n=>ed(n))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return x(1026)}})(t.compositeFilter.op))})(i):x(30097,{filter:i})}function By(i){return Ry[i]}function $y(i){return Py[i]}function zy(i){return Cy[i]}function _n(i){return{fieldPath:i.canonicalString()}}function vn(i){return _e.fromServerFormat(i.fieldPath)}function td(i){return i instanceof ce?(function(t){if(t.op==="=="){if(Al(t.value))return{unaryFilter:{field:_n(t.field),op:"IS_NAN"}};if(bl(t.value))return{unaryFilter:{field:_n(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Al(t.value))return{unaryFilter:{field:_n(t.field),op:"IS_NOT_NAN"}};if(bl(t.value))return{unaryFilter:{field:_n(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:_n(t.field),op:$y(t.op),value:t.value}}})(i):i instanceof He?(function(t){const n=t.getFilters().map((s=>td(s)));return n.length===1?n[0]:{compositeFilter:{op:zy(t.op),filters:n}}})(i):x(54877,{filter:i})}function qy(i){const e=[];return i.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function nd(i){return i.length>=4&&i.get(0)==="projects"&&i.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(e,t,n,s,r=F.min(),a=F.min(),c=ve.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Pt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Pt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Pt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Pt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jy{constructor(e){this.yt=e}}function Hy(i){const e=Fy({parent:i.parent,structuredQuery:i.structuredQuery});return i.limitType==="LAST"?Ss(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gy{constructor(){this.Cn=new Wy}addToCollectionParentIndex(e,t){return this.Cn.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(Vt.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(Vt.min())}updateCollectionGroup(e,t,n){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class Wy{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new fe(J.comparator),r=!s.has(n);return this.index[t]=s.add(n),r}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new fe(J.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ul={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},id=41943040;class Me{static withCacheSize(e){return new Me(e,Me.DEFAULT_COLLECTION_PERCENTILE,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Me.DEFAULT_COLLECTION_PERCENTILE=10,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Me.DEFAULT=new Me(id,Me.DEFAULT_COLLECTION_PERCENTILE,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Me.DISABLED=new Me(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Vn(0)}static cr(){return new Vn(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bl="LruGarbageCollector",Ky=1048576;function $l([i,e],[t,n]){const s=H(i,t);return s===0?H(e,n):s}class Qy{constructor(e){this.Ir=e,this.buffer=new fe($l),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();$l(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Yy{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){V(Bl,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){$n(t)?V(Bl,"Ignoring IndexedDB error during garbage collection: ",t):await Bn(t)}await this.Vr(3e5)}))}}class Xy{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next((n=>Math.floor(t/100*n)))}nthSequenceNumber(e,t){if(t===0)return P.resolve(qs.ce);const n=new Qy(t);return this.mr.forEachTarget(e,(s=>n.Ar(s.sequenceNumber))).next((()=>this.mr.pr(e,(s=>n.Ar(s))))).next((()=>n.maxValue))}removeTargets(e,t,n){return this.mr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(Ul)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ul):this.yr(e,t)))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let n,s,r,a,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(n=p,c=Date.now(),this.removeTargets(e,n,t)))).next((p=>(r=p,u=Date.now(),this.removeOrphanedDocuments(e,n)))).next((p=>(h=Date.now(),gn()<=j.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${r} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:r,documentsRemoved:p}))))}}function Jy(i,e){return new Xy(i,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zy{constructor(){this.changes=new un((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,be.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?P.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(n=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(n!==null&&pi(n.mutation,s,Le.empty(),ee.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.getLocalViewOfDocuments(e,n,G()).next((()=>n))))}getLocalViewOfDocuments(e,t,n=G()){const s=Yt();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,n).next((r=>{let a=li();return r.forEach(((c,u)=>{a=a.insert(c,u.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const n=Yt();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,G())))}populateOverlays(e,t,n){const s=[];return n.forEach((r=>{t.has(r)||s.push(r)})),this.documentOverlayCache.getOverlays(e,s).next((r=>{r.forEach(((a,c)=>{t.set(a,c)}))}))}computeViews(e,t,n,s){let r=mt();const a=mi(),c=(function(){return mi()})();return t.forEach(((u,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof $t)?r=r.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),pi(f.mutation,h,f.mutation.getFieldMask(),ee.now())):a.set(h.key,Le.empty())})),this.recalculateAndSaveOverlays(e,r).next((u=>(u.forEach(((h,f)=>a.set(h,f))),t.forEach(((h,f)=>c.set(h,new e_(f,a.get(h)??null)))),c)))}recalculateAndSaveOverlays(e,t){const n=mi();let s=new te(((a,c)=>a-c)),r=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const c of a)c.keys().forEach((u=>{const h=t.get(u);if(h===null)return;let f=n.get(u)||Le.empty();f=c.applyToLocalView(h,f),n.set(u,f);const p=(s.get(c.batchId)||G()).add(u);s=s.insert(c.batchId,p)}))})).next((()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,p=Oh();f.forEach((v=>{if(!r.has(v)){const R=Hh(t.get(v),n.get(v));R!==null&&p.set(v,R),r=r.add(v)}})),a.push(this.documentOverlayCache.saveOverlays(e,h,p))}return P.waitFor(a)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.recalculateAndSaveOverlays(e,n)))}getDocumentsMatchingQuery(e,t,n,s){return(function(a){return L.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):zo(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next((r=>{const a=s-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-r.size):P.resolve(Yt());let c=_i,u=r;return a.next((h=>P.forEach(h,((f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),r.get(f)?P.resolve():this.remoteDocumentCache.getEntry(e,f).next((v=>{u=u.insert(f,v)}))))).next((()=>this.populateOverlays(e,h,r))).next((()=>this.computeViews(e,u,h,G()))).next((f=>({batchId:c,changes:xh(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next((n=>{let s=li();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const r=t.collectionGroup;let a=li();return this.indexManager.getCollectionParents(e,r).next((c=>P.forEach(c,(u=>{const h=(function(p,v){return new ln(v,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,u.child(r));return this.getDocumentsMatchingCollectionQuery(e,h,n,s).next((f=>{f.forEach(((p,v)=>{a=a.insert(p,v)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,n,s){let r;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((a=>(r=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,r,s)))).next((a=>{r.forEach(((u,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,be.newInvalidDocument(f)))}));let c=li();return a.forEach(((u,h)=>{const f=r.get(u);f!==void 0&&pi(f.mutation,h,Le.empty(),ee.now()),Ks(t,h)&&(c=c.insert(u,h))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return P.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Xe(s.createTime)}})(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,(function(s){return{name:s.name,query:Hy(s.bundledQuery),readTime:Xe(s.readTime)}})(t)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i_{constructor(){this.overlays=new te(L.comparator),this.qr=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Yt();return P.forEach(t,(s=>this.getOverlay(e,s).next((r=>{r!==null&&n.set(s,r)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((s,r)=>{this.St(e,t,r)})),P.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.qr.get(n);return s!==void 0&&(s.forEach((r=>this.overlays=this.overlays.remove(r))),this.qr.delete(n)),P.resolve()}getOverlaysForCollection(e,t,n){const s=Yt(),r=t.length+1,a=new L(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===r&&u.largestBatchId>n&&s.set(u.getKey(),u)}return P.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let r=new te(((h,f)=>h-f));const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=r.get(h.largestBatchId);f===null&&(f=Yt(),r=r.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=Yt(),u=r.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return P.resolve(c)}St(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(n.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new Ey(t,n));let r=this.qr.get(t);r===void 0&&(r=G(),this.qr.set(t,r)),this.qr.set(t,r.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s_{constructor(){this.sessionToken=ve.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ko{constructor(){this.Qr=new fe(pe.$r),this.Ur=new fe(pe.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const n=new pe(e,t);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(e,t){e.forEach((n=>this.addReference(n,t)))}removeReference(e,t){this.Gr(new pe(e,t))}zr(e,t){e.forEach((n=>this.removeReference(n,t)))}jr(e){const t=new L(new J([])),n=new pe(t,e),s=new pe(t,e+1),r=[];return this.Ur.forEachInRange([n,s],(a=>{this.Gr(a),r.push(a.key)})),r}Jr(){this.Qr.forEach((e=>this.Gr(e)))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new L(new J([])),n=new pe(t,e),s=new pe(t,e+1);let r=G();return this.Ur.forEachInRange([n,s],(a=>{r=r.add(a.key)})),r}containsKey(e){const t=new pe(e,0),n=this.Qr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class pe{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return L.comparator(e.key,t.key)||H(e.Yr,t.Yr)}static Kr(e,t){return H(e.Yr,t.Yr)||L.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new fe(pe.$r)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const r=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new wy(r,t,n,s);this.mutationQueue.push(a);for(const c of s)this.Zr=this.Zr.add(new pe(c.key,r)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return P.resolve(a)}lookupMutationBatch(e,t){return P.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.ei(n),r=s<0?0:s;return P.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?Oo:this.tr-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new pe(t,0),s=new pe(t,Number.POSITIVE_INFINITY),r=[];return this.Zr.forEachInRange([n,s],(a=>{const c=this.Xr(a.Yr);r.push(c)})),P.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new fe(H);return t.forEach((s=>{const r=new pe(s,0),a=new pe(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([r,a],(c=>{n=n.add(c.Yr)}))})),P.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let r=n;L.isDocumentKey(r)||(r=r.child(""));const a=new pe(new L(r),0);let c=new fe(H);return this.Zr.forEachWhile((u=>{const h=u.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.Yr)),!0)}),a),P.resolve(this.ti(c))}ti(e){const t=[];return e.forEach((n=>{const s=this.Xr(n);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){Q(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Zr;return P.forEach(t.mutations,(s=>{const r=new pe(s.key,t.batchId);return n=n.delete(r),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Zr=n}))}ir(e){}containsKey(e,t){const n=new pe(t,0),s=this.Zr.firstAfterOrEqual(n);return P.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o_{constructor(e){this.ri=e,this.docs=(function(){return new te(L.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),r=s?s.size:0,a=this.ri(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:a}),this.size+=a-r,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return P.resolve(n?n.document.mutableCopy():be.newInvalidDocument(t))}getEntries(e,t){let n=mt();return t.forEach((s=>{const r=this.docs.get(s);n=n.insert(s,r?r.document.mutableCopy():be.newInvalidDocument(s))})),P.resolve(n)}getDocumentsMatchingQuery(e,t,n,s){let r=mt();const a=t.path,c=new L(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||xg(Lg(f),n)<=0||(s.has(f.key)||Ks(t,f))&&(r=r.insert(f.key,f.mutableCopy()))}return P.resolve(r)}getAllFromCollectionGroup(e,t,n,s){x(9500)}ii(e,t){return P.forEach(this.docs,(n=>t(n)))}newChangeBuffer(e){return new a_(this)}getSize(e){return P.resolve(this.size)}}class a_ extends Zy{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(n)})),P.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c_{constructor(e){this.persistence=e,this.si=new un((t=>Uo(t)),Bo),this.lastRemoteSnapshotVersion=F.min(),this.highestTargetId=0,this.oi=0,this._i=new Ko,this.targetCount=0,this.ai=Vn.ur()}forEachTarget(e,t){return this.si.forEach(((n,s)=>t(s))),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.oi&&(this.oi=t),P.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new Vn(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.Pr(t),P.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,n){let s=0;const r=[];return this.si.forEach(((a,c)=>{c.sequenceNumber<=t&&n.get(c.targetId)===null&&(this.si.delete(a),r.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),P.waitFor(r).next((()=>s))}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const n=this.si.get(t)||null;return P.resolve(n)}addMatchingKeys(e,t,n){return this._i.Wr(t,n),P.resolve()}removeMatchingKeys(e,t,n){this._i.zr(t,n);const s=this.persistence.referenceDelegate,r=[];return s&&t.forEach((a=>{r.push(s.markPotentiallyOrphaned(e,a))})),P.waitFor(r)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),P.resolve()}getMatchingKeysForTargetId(e,t){const n=this._i.Hr(t);return P.resolve(n)}containsKey(e,t){return P.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sd{constructor(e,t){this.ui={},this.overlays={},this.ci=new qs(0),this.li=!1,this.li=!0,this.hi=new s_,this.referenceDelegate=e(this),this.Pi=new c_(this),this.indexManager=new Gy,this.remoteDocumentCache=(function(s){return new o_(s)})((n=>this.referenceDelegate.Ti(n))),this.serializer=new jy(t),this.Ii=new n_(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new i_,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.ui[e.toKey()];return n||(n=new r_(t,this.referenceDelegate),this.ui[e.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,n){V("MemoryPersistence","Starting transaction:",e);const s=new l_(this.ci.next());return this.referenceDelegate.Ei(),n(s).next((r=>this.referenceDelegate.di(s).next((()=>r)))).toPromise().then((r=>(s.raiseOnCommittedEvent(),r)))}Ai(e,t){return P.or(Object.values(this.ui).map((n=>()=>n.containsKey(e,t))))}}class l_ extends Fg{constructor(e){super(),this.currentSequenceNumber=e}}class Qo{constructor(e){this.persistence=e,this.Ri=new Ko,this.Vi=null}static mi(e){return new Qo(e)}get fi(){if(this.Vi)return this.Vi;throw x(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.fi.delete(n.toString()),P.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.fi.add(n.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),P.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach((s=>this.fi.add(s.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((r=>this.fi.add(r.toString())))})).next((()=>n.removeTargetData(e,t)))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.fi,(n=>{const s=L.fromPath(n);return this.gi(e,s).next((r=>{r||t.removeEntry(s,F.min())}))})).next((()=>(this.Vi=null,t.apply(e))))}updateLimboDocument(e,t){return this.gi(e,t).next((n=>{n?this.fi.delete(t.toString()):this.fi.add(t.toString())}))}Ti(e){return 0}gi(e,t){return P.or([()=>P.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Ps{constructor(e,t){this.persistence=e,this.pi=new un((n=>$g(n.path)),((n,s)=>n.isEqual(s))),this.garbageCollector=Jy(this,t)}static mi(e,t){return new Ps(e,t)}Ei(){}di(e){return P.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}wr(e){let t=0;return this.pr(e,(n=>{t++})).next((()=>t))}pr(e,t){return P.forEach(this.pi,((n,s)=>this.br(e,n,s).next((r=>r?P.resolve():t(s)))))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),r=s.newChangeBuffer();return s.ii(e,(a=>this.br(e,a,t).next((c=>{c||(n++,r.removeEntry(a,F.min()))})))).next((()=>r.apply(e))).next((()=>n))}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),P.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),P.resolve()}removeReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),P.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),P.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=hs(e.data.value)),t}br(e,t,n){return P.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.pi.get(t);return P.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.Es=n,this.ds=s}static As(e,t){let n=G(),s=G();for(const r of t.docChanges)switch(r.type){case 0:n=n.add(r.doc.key);break;case 1:s=s.add(r.doc.key)}return new Yo(e,t.fromCache,n,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u_{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h_{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return np()?8:Ug(Ae())>0?6:4})()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,s){const r={result:null};return this.ys(e,t).next((a=>{r.result=a})).next((()=>{if(!r.result)return this.ws(e,t,s,n).next((a=>{r.result=a}))})).next((()=>{if(r.result)return;const a=new u_;return this.Ss(e,t,a).next((c=>{if(r.result=c,this.Vs)return this.bs(e,t,a,c.size)}))})).next((()=>r.result))}bs(e,t,n,s){return n.documentReadCount<this.fs?(gn()<=j.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",yn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),P.resolve()):(gn()<=j.DEBUG&&V("QueryEngine","Query:",yn(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.gs*s?(gn()<=j.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",yn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ye(t))):P.resolve())}ys(e,t){if(Cl(t))return P.resolve(null);let n=Ye(t);return this.indexManager.getIndexType(e,n).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=Ss(t,null,"F"),n=Ye(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((r=>{const a=G(...r);return this.ps.getDocuments(e,a).next((c=>this.indexManager.getMinOffset(e,n).next((u=>{const h=this.Ds(t,c);return this.Cs(t,h,a,u.readTime)?this.ys(e,Ss(t,null,"F")):this.vs(e,h,t,u)}))))})))))}ws(e,t,n,s){return Cl(t)||s.isEqual(F.min())?P.resolve(null):this.ps.getDocuments(e,n).next((r=>{const a=this.Ds(t,r);return this.Cs(t,a,n,s)?P.resolve(null):(gn()<=j.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),yn(t)),this.vs(e,a,t,Vg(s,_i)).next((c=>c)))}))}Ds(e,t){let n=new fe(Vh(e));return t.forEach(((s,r)=>{Ks(e,r)&&(n=n.add(r))})),n}Cs(e,t,n,s){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const r=e.limitType==="F"?t.last():t.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(s)>0)}Ss(e,t,n){return gn()<=j.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",yn(t)),this.ps.getDocumentsMatchingQuery(e,t,Vt.min(),n)}vs(e,t,n,s){return this.ps.getDocumentsMatchingQuery(e,n,s).next((r=>(t.forEach((a=>{r=r.insert(a.key,a)})),r)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xo="LocalStore",d_=3e8;class f_{constructor(e,t,n,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new te(H),this.xs=new un((r=>Uo(r)),Bo),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(n)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new t_(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Ms)))}}function m_(i,e,t,n){return new f_(i,e,t,n)}async function rd(i,e){const t=U(i);return await t.persistence.runTransaction("Handle user change","readonly",(n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next((r=>(s=r,t.Bs(e),t.mutationQueue.getAllMutationBatches(n)))).next((r=>{const a=[],c=[];let u=G();for(const h of s){a.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of r){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(n,u).next((h=>({Ls:h,removedBatchIds:a,addedBatchIds:c})))}))}))}function p_(i,e){const t=U(i);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const s=e.batch.keys(),r=t.Ns.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,f){const p=h.batch,v=p.keys();let R=P.resolve();return v.forEach((D=>{R=R.next((()=>f.getEntry(u,D))).next((N=>{const C=h.docVersions.get(D);Q(C!==null,48541),N.version.compareTo(C)<0&&(p.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))}))})),R.next((()=>c.mutationQueue.removeMutationBatch(u,p)))})(t,n,e,r).next((()=>r.apply(n))).next((()=>t.mutationQueue.performConsistencyCheck(n))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(c){let u=G();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(n,s)))}))}function od(i){const e=U(i);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Pi.getLastRemoteSnapshotVersion(t)))}function g_(i,e){const t=U(i),n=e.snapshotVersion;let s=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(r=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});s=t.Ms;const c=[];e.targetChanges.forEach(((f,p)=>{const v=s.get(p);if(!v)return;c.push(t.Pi.removeMatchingKeys(r,f.removedDocuments,p).next((()=>t.Pi.addMatchingKeys(r,f.addedDocuments,p))));let R=v.withSequenceNumber(r.currentSequenceNumber);e.targetMismatches.get(p)!==null?R=R.withResumeToken(ve.EMPTY_BYTE_STRING,F.min()).withLastLimboFreeSnapshotVersion(F.min()):f.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(f.resumeToken,n)),s=s.insert(p,R),(function(N,C,B){return N.resumeToken.approximateByteSize()===0||C.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=d_?!0:B.addedDocuments.size+B.modifiedDocuments.size+B.removedDocuments.size>0})(v,R,f)&&c.push(t.Pi.updateTargetData(r,R))}));let u=mt(),h=G();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(r,f))})),c.push(y_(r,a,e.documentUpdates).next((f=>{u=f.ks,h=f.qs}))),!n.isEqual(F.min())){const f=t.Pi.getLastRemoteSnapshotVersion(r).next((p=>t.Pi.setTargetsMetadata(r,r.currentSequenceNumber,n)));c.push(f)}return P.waitFor(c).next((()=>a.apply(r))).next((()=>t.localDocuments.getLocalViewOfDocuments(r,u,h))).next((()=>u))})).then((r=>(t.Ms=s,r)))}function y_(i,e,t){let n=G(),s=G();return t.forEach((r=>n=n.add(r))),e.getEntries(i,n).next((r=>{let a=mt();return t.forEach(((c,u)=>{const h=r.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(F.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):V(Xo,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{ks:a,qs:s}}))}function __(i,e){const t=U(i);return t.persistence.runTransaction("Get next mutation batch","readonly",(n=>(e===void 0&&(e=Oo),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e))))}function v_(i,e){const t=U(i);return t.persistence.runTransaction("Allocate target","readwrite",(n=>{let s;return t.Pi.getTargetData(n,e).next((r=>r?(s=r,P.resolve(s)):t.Pi.allocateTargetId(n).next((a=>(s=new Pt(e,a,"TargetPurposeListen",n.currentSequenceNumber),t.Pi.addTargetData(n,s).next((()=>s)))))))})).then((n=>{const s=t.Ms.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(n.targetId,n),t.xs.set(e,n.targetId)),n}))}async function Io(i,e,t){const n=U(i),s=n.Ms.get(e),r=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",r,(a=>n.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!$n(a))throw a;V(Xo,`Failed to update sequence numbers for target ${e}: ${a}`)}n.Ms=n.Ms.remove(e),n.xs.delete(s.target)}function zl(i,e,t){const n=U(i);let s=F.min(),r=G();return n.persistence.runTransaction("Execute query","readwrite",(a=>(function(u,h,f){const p=U(u),v=p.xs.get(f);return v!==void 0?P.resolve(p.Ms.get(v)):p.Pi.getTargetData(h,f)})(n,a,Ye(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,n.Pi.getMatchingKeysForTargetId(a,c.targetId).next((u=>{r=u}))})).next((()=>n.Fs.getDocumentsMatchingQuery(a,e,t?s:F.min(),t?r:G()))).next((c=>(w_(n,oy(e),c),{documents:c,Qs:r})))))}function w_(i,e,t){let n=i.Os.get(e)||F.min();t.forEach(((s,r)=>{r.readTime.compareTo(n)>0&&(n=r.readTime)})),i.Os.set(e,n)}class ql{constructor(){this.activeTargetIds=dy()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class E_{constructor(){this.Mo=new ql,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,n){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new ql,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I_{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jl="ConnectivityMonitor";class Hl{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){V(jl,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){V(jl,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let os=null;function To(){return os===null?os=(function(){return 268435456+Math.round(2147483648*Math.random())})():os++,"0x"+os.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gr="RestConnection",T_={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class b_{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${n}/databases/${s}`,this.Wo=this.databaseId.database===Ts?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Go(e,t,n,s,r){const a=To(),c=this.zo(e,t.toUriEncodedString());V(Gr,`Sending RPC '${e}' ${a}:`,c,n);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,s,r);const{host:h}=new URL(c),f=On(h);return this.Jo(e,c,u,n,f).then((p=>(V(Gr,`Received RPC '${e}' ${a}: `,p),p)),(p=>{throw Cn(Gr,`RPC '${e}' ${a} failed with error: `,p,"url: ",c,"request:",n),p}))}Ho(e,t,n,s,r,a){return this.Go(e,t,n,s,r)}jo(e,t,n){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Un})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,r)=>e[r]=s)),n&&n.headers.forEach(((s,r)=>e[r]=s))}zo(e,t){const n=T_[e];return`${this.Uo}/v1/${t}:${n}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A_{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ie="WebChannelConnection";class S_ extends b_{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,n,s,r){const a=To();return new Promise(((c,u)=>{const h=new ch;h.setWithCredentials(!0),h.listenOnce(lh.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case us.NO_ERROR:const p=h.getResponseJson();V(Ie,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),c(p);break;case us.TIMEOUT:V(Ie,`RPC '${e}' ${a} timed out`),u(new M(S.DEADLINE_EXCEEDED,"Request time out"));break;case us.HTTP_ERROR:const v=h.getStatus();if(V(Ie,`RPC '${e}' ${a} failed with status:`,v,"response text:",h.getResponseText()),v>0){let R=h.getResponseJson();Array.isArray(R)&&(R=R[0]);const D=R?.error;if(D&&D.status&&D.message){const N=(function(B){const z=B.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(z)>=0?z:S.UNKNOWN})(D.status);u(new M(N,D.message))}else u(new M(S.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new M(S.UNAVAILABLE,"Connection failed."));break;default:x(9055,{l_:e,streamId:a,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{V(Ie,`RPC '${e}' ${a} completed.`)}}));const f=JSON.stringify(s);V(Ie,`RPC '${e}' ${a} sending request:`,s),h.send(t,"POST",f,n,15)}))}T_(e,t,n){const s=To(),r=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=dh(),c=hh(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,t,n),u.encodeInitMessageHeaders=!0;const f=r.join("");V(Ie,`Creating RPC '${e}' stream ${s}: ${f}`,u);const p=a.createWebChannel(f,u);this.I_(p);let v=!1,R=!1;const D=new A_({Yo:C=>{R?V(Ie,`Not sending because RPC '${e}' stream ${s} is closed:`,C):(v||(V(Ie,`Opening RPC '${e}' stream ${s} transport.`),p.open(),v=!0),V(Ie,`RPC '${e}' stream ${s} sending:`,C),p.send(C))},Zo:()=>p.close()}),N=(C,B,z)=>{C.listen(B,(q=>{try{z(q)}catch(ge){setTimeout((()=>{throw ge}),0)}}))};return N(p,ci.EventType.OPEN,(()=>{R||(V(Ie,`RPC '${e}' stream ${s} transport opened.`),D.o_())})),N(p,ci.EventType.CLOSE,(()=>{R||(R=!0,V(Ie,`RPC '${e}' stream ${s} transport closed`),D.a_(),this.E_(p))})),N(p,ci.EventType.ERROR,(C=>{R||(R=!0,Cn(Ie,`RPC '${e}' stream ${s} transport errored. Name:`,C.name,"Message:",C.message),D.a_(new M(S.UNAVAILABLE,"The operation could not be completed")))})),N(p,ci.EventType.MESSAGE,(C=>{if(!R){const B=C.data[0];Q(!!B,16349);const z=B,q=z?.error||z[0]?.error;if(q){V(Ie,`RPC '${e}' stream ${s} received error:`,q);const ge=q.status;let we=(function(g){const _=ae[g];if(_!==void 0)return Wh(_)})(ge),re=q.message;we===void 0&&(we=S.INTERNAL,re="Unknown error status: "+ge+" with message "+q.message),R=!0,D.a_(new M(we,re)),p.close()}else V(Ie,`RPC '${e}' stream ${s} received:`,B),D.u_(B)}})),N(c,uh.STAT_EVENT,(C=>{C.stat===uo.PROXY?V(Ie,`RPC '${e}' stream ${s} detected buffering proxy`):C.stat===uo.NOPROXY&&V(Ie,`RPC '${e}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{D.__()}),0),D}terminate(){this.c_.forEach((e=>e.close())),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter((t=>t===e))}}function Wr(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Js(i){return new Dy(i,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ad{constructor(e,t,n=1e3,s=1.5,r=6e4){this.Mi=e,this.timerId=t,this.d_=n,this.A_=s,this.R_=r,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-n);s>0&&V("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gl="PersistentStream";class cd{constructor(e,t,n,s,r,a,c,u){this.Mi=e,this.S_=n,this.b_=s,this.connection=r,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new ad(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===S.RESOURCE_EXHAUSTED?(dt(t.toString()),dt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,s])=>{this.D_===t&&this.G_(n,s)}),(n=>{e((()=>{const s=new M(S.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(s)}))}))}G_(e,t){const n=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo((()=>{n((()=>this.listener.Xo()))})),this.stream.t_((()=>{n((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{n((()=>this.z_(s)))})),this.stream.onMessage((s=>{n((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return V(Gl,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget((()=>this.D_===e?t():(V(Gl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class R_ extends cd{constructor(e,t,n,s,r,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,a),this.serializer=r}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Ny(this.serializer,e),n=(function(r){if(!("targetChange"in r))return F.min();const a=r.targetChange;return a.targetIds&&a.targetIds.length?F.min():a.readTime?Xe(a.readTime):F.min()})(e);return this.listener.H_(t,n)}Y_(e){const t={};t.database=Eo(this.serializer),t.addTarget=(function(r,a){let c;const u=a.target;if(c=go(u)?{documents:xy(r,u)}:{query:Oy(r,u).ft},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Yh(r,a.resumeToken);const h=_o(r,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(F.min())>0){c.readTime=Rs(r,a.snapshotVersion.toTimestamp());const h=_o(r,a.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const n=Uy(this.serializer,e);n&&(t.labels=n),this.q_(t)}Z_(e){const t={};t.database=Eo(this.serializer),t.removeTarget=e,this.q_(t)}}class P_ extends cd{constructor(e,t,n,s,r,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,a),this.serializer=r}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return Q(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Q(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Q(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=Ly(e.writeResults,e.commitTime),n=Xe(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=Eo(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((n=>Vy(this.serializer,n)))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C_{}class D_ extends C_{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new M(S.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,n,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([r,a])=>this.connection.Go(e,vo(t,n),s,r,a))).catch((r=>{throw r.name==="FirebaseError"?(r.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new M(S.UNKNOWN,r.toString())}))}Ho(e,t,n,s,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,c])=>this.connection.Ho(e,vo(t,n),s,a,c,r))).catch((a=>{throw a.name==="FirebaseError"?(a.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new M(S.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class k_{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(dt(t),this.aa=!1):V("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nn="RemoteStore";class M_{constructor(e,t,n,s,r){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=r,this.Aa.Oo((a=>{n.enqueueAndForget((async()=>{hn(this)&&(V(nn,"Restarting streams for network reachability change."),await(async function(u){const h=U(u);h.Ea.add(4),await Mi(h),h.Ra.set("Unknown"),h.Ea.delete(4),await Zs(h)})(this))}))})),this.Ra=new k_(n,s)}}async function Zs(i){if(hn(i))for(const e of i.da)await e(!0)}async function Mi(i){for(const e of i.da)await e(!1)}function ld(i,e){const t=U(i);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),ta(t)?ea(t):zn(t).O_()&&Zo(t,e))}function Jo(i,e){const t=U(i),n=zn(t);t.Ia.delete(e),n.O_()&&ud(t,e),t.Ia.size===0&&(n.O_()?n.L_():hn(t)&&t.Ra.set("Unknown"))}function Zo(i,e){if(i.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(F.min())>0){const t=i.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}zn(i).Y_(e)}function ud(i,e){i.Va.Ue(e),zn(i).Z_(e)}function ea(i){i.Va=new Sy({getRemoteKeysForTarget:e=>i.remoteSyncer.getRemoteKeysForTarget(e),At:e=>i.Ia.get(e)||null,ht:()=>i.datastore.serializer.databaseId}),zn(i).start(),i.Ra.ua()}function ta(i){return hn(i)&&!zn(i).x_()&&i.Ia.size>0}function hn(i){return U(i).Ea.size===0}function hd(i){i.Va=void 0}async function N_(i){i.Ra.set("Online")}async function V_(i){i.Ia.forEach(((e,t)=>{Zo(i,e)}))}async function L_(i,e){hd(i),ta(i)?(i.Ra.ha(e),ea(i)):i.Ra.set("Unknown")}async function x_(i,e,t){if(i.Ra.set("Online"),e instanceof Qh&&e.state===2&&e.cause)try{await(async function(s,r){const a=r.cause;for(const c of r.targetIds)s.Ia.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.Ia.delete(c),s.Va.removeTarget(c))})(i,e)}catch(n){V(nn,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Cs(i,n)}else if(e instanceof ms?i.Va.Ze(e):e instanceof Kh?i.Va.st(e):i.Va.tt(e),!t.isEqual(F.min()))try{const n=await od(i.localStore);t.compareTo(n)>=0&&await(function(r,a){const c=r.Va.Tt(a);return c.targetChanges.forEach(((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=r.Ia.get(h);f&&r.Ia.set(h,f.withResumeToken(u.resumeToken,a))}})),c.targetMismatches.forEach(((u,h)=>{const f=r.Ia.get(u);if(!f)return;r.Ia.set(u,f.withResumeToken(ve.EMPTY_BYTE_STRING,f.snapshotVersion)),ud(r,u);const p=new Pt(f.target,u,h,f.sequenceNumber);Zo(r,p)})),r.remoteSyncer.applyRemoteEvent(c)})(i,t)}catch(n){V(nn,"Failed to raise snapshot:",n),await Cs(i,n)}}async function Cs(i,e,t){if(!$n(e))throw e;i.Ea.add(1),await Mi(i),i.Ra.set("Offline"),t||(t=()=>od(i.localStore)),i.asyncQueue.enqueueRetryable((async()=>{V(nn,"Retrying IndexedDB access"),await t(),i.Ea.delete(1),await Zs(i)}))}function dd(i,e){return e().catch((t=>Cs(i,t,e)))}async function er(i){const e=U(i),t=Ft(e);let n=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Oo;for(;O_(e);)try{const s=await __(e.localStore,n);if(s===null){e.Ta.length===0&&t.L_();break}n=s.batchId,F_(e,s)}catch(s){await Cs(e,s)}fd(e)&&md(e)}function O_(i){return hn(i)&&i.Ta.length<10}function F_(i,e){i.Ta.push(e);const t=Ft(i);t.O_()&&t.X_&&t.ea(e.mutations)}function fd(i){return hn(i)&&!Ft(i).x_()&&i.Ta.length>0}function md(i){Ft(i).start()}async function U_(i){Ft(i).ra()}async function B_(i){const e=Ft(i);for(const t of i.Ta)e.ea(t.mutations)}async function $_(i,e,t){const n=i.Ta.shift(),s=Ho.from(n,e,t);await dd(i,(()=>i.remoteSyncer.applySuccessfulWrite(s))),await er(i)}async function z_(i,e){e&&Ft(i).X_&&await(async function(n,s){if((function(a){return Ty(a)&&a!==S.ABORTED})(s.code)){const r=n.Ta.shift();Ft(n).B_(),await dd(n,(()=>n.remoteSyncer.rejectFailedWrite(r.batchId,s))),await er(n)}})(i,e),fd(i)&&md(i)}async function Wl(i,e){const t=U(i);t.asyncQueue.verifyOperationInProgress(),V(nn,"RemoteStore received new credentials");const n=hn(t);t.Ea.add(3),await Mi(t),n&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await Zs(t)}async function q_(i,e){const t=U(i);e?(t.Ea.delete(2),await Zs(t)):e||(t.Ea.add(2),await Mi(t),t.Ra.set("Unknown"))}function zn(i){return i.ma||(i.ma=(function(t,n,s){const r=U(t);return r.sa(),new R_(n,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)})(i.datastore,i.asyncQueue,{Xo:N_.bind(null,i),t_:V_.bind(null,i),r_:L_.bind(null,i),H_:x_.bind(null,i)}),i.da.push((async e=>{e?(i.ma.B_(),ta(i)?ea(i):i.Ra.set("Unknown")):(await i.ma.stop(),hd(i))}))),i.ma}function Ft(i){return i.fa||(i.fa=(function(t,n,s){const r=U(t);return r.sa(),new P_(n,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)})(i.datastore,i.asyncQueue,{Xo:()=>Promise.resolve(),t_:U_.bind(null,i),r_:z_.bind(null,i),ta:B_.bind(null,i),na:$_.bind(null,i)}),i.da.push((async e=>{e?(i.fa.B_(),await er(i)):(await i.fa.stop(),i.Ta.length>0&&(V(nn,`Stopping write stream with ${i.Ta.length} pending writes`),i.Ta=[]))}))),i.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e,t,n,s,r){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=r,this.deferred=new ut,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,r){const a=Date.now()+n,c=new na(e,t,a,s,r);return c.start(n),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ia(i,e){if(dt("AsyncQueue",`${e}: ${i}`),$n(i))return new M(S.UNAVAILABLE,`${e}: ${i}`);throw i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{static emptySet(e){return new Tn(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||L.comparator(t.key,n.key):(t,n)=>L.comparator(t.key,n.key),this.keyedMap=li(),this.sortedSet=new te(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Tn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,r=n.getNext().key;if(!s.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new Tn;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kl{constructor(){this.ga=new te(L.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?e.type!==0&&n.type===3?this.ga=this.ga.insert(t,e):e.type===3&&n.type!==1?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.ga=this.ga.remove(t):e.type===1&&n.type===2?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):x(63341,{Rt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,n)=>{e.push(n)})),e}}class Ln{constructor(e,t,n,s,r,a,c,u,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=r,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,s,r){const a=[];return t.forEach((c=>{a.push({type:0,doc:c})})),new Ln(e,t,Tn.emptySet(t),a,n,s,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ws(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j_{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class H_{constructor(){this.queries=Ql(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,n){const s=U(t),r=s.queries;s.queries=Ql(),r.forEach(((a,c)=>{for(const u of c.Sa)u.onError(n)}))})(this,new M(S.ABORTED,"Firestore shutting down"))}}function Ql(){return new un((i=>Nh(i)),Ws)}async function pd(i,e){const t=U(i);let n=3;const s=e.query;let r=t.queries.get(s);r?!r.ba()&&e.Da()&&(n=2):(r=new j_,n=e.Da()?0:1);try{switch(n){case 0:r.wa=await t.onListen(s,!0);break;case 1:r.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=ia(a,`Initialization of query '${yn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,r),r.Sa.push(e),e.va(t.onlineState),r.wa&&e.Fa(r.wa)&&sa(t)}async function gd(i,e){const t=U(i),n=e.query;let s=3;const r=t.queries.get(n);if(r){const a=r.Sa.indexOf(e);a>=0&&(r.Sa.splice(a,1),r.Sa.length===0?s=e.Da()?0:1:!r.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function G_(i,e){const t=U(i);let n=!1;for(const s of e){const r=s.query,a=t.queries.get(r);if(a){for(const c of a.Sa)c.Fa(s)&&(n=!0);a.wa=s}}n&&sa(t)}function W_(i,e,t){const n=U(i),s=n.queries.get(e);if(s)for(const r of s.Sa)r.onError(t);n.queries.delete(e)}function sa(i){i.Ca.forEach((e=>{e.next()}))}var bo,Yl;(Yl=bo||(bo={})).Ma="default",Yl.Cache="cache";class yd{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new Ln(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const n=t!=="Offline";return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Ln.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==bo.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _d{constructor(e){this.key=e}}class vd{constructor(e){this.key=e}}class K_{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=G(),this.mutatedKeys=G(),this.eu=Vh(e),this.tu=new Tn(this.eu)}get nu(){return this.Ya}ru(e,t){const n=t?t.iu:new Kl,s=t?t.tu:this.tu;let r=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,p)=>{const v=s.get(f),R=Ks(this.query,p)?p:null,D=!!v&&this.mutatedKeys.has(v.key),N=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let C=!1;v&&R?v.data.isEqual(R.data)?D!==N&&(n.track({type:3,doc:R}),C=!0):this.su(v,R)||(n.track({type:2,doc:R}),C=!0,(u&&this.eu(R,u)>0||h&&this.eu(R,h)<0)&&(c=!0)):!v&&R?(n.track({type:0,doc:R}),C=!0):v&&!R&&(n.track({type:1,doc:v}),C=!0,(u||h)&&(c=!0)),C&&(R?(a=a.add(R),r=N?r.add(f):r.delete(f)):(a=a.delete(f),r=r.delete(f)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),r=r.delete(f.key),n.track({type:1,doc:f})}return{tu:a,iu:n,Cs:c,mutatedKeys:r}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const r=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort(((f,p)=>(function(R,D){const N=C=>{switch(C){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return x(20277,{Rt:C})}};return N(R)-N(D)})(f.type,p.type)||this.eu(f.doc,p.doc))),this.ou(n),s=s??!1;const c=t&&!s?this._u():[],u=this.Xa.size===0&&this.current&&!s?1:0,h=u!==this.Za;return this.Za=u,a.length!==0||h?{snapshot:new Ln(this.query,e.tu,r,a,e.mutatedKeys,u===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Kl,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Ya=this.Ya.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ya=this.Ya.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=G(),this.tu.forEach((n=>{this.uu(n.key)&&(this.Xa=this.Xa.add(n.key))}));const t=[];return e.forEach((n=>{this.Xa.has(n)||t.push(new vd(n))})),this.Xa.forEach((n=>{e.has(n)||t.push(new _d(n))})),t}cu(e){this.Ya=e.Qs,this.Xa=G();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Ln.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const ra="SyncEngine";class Q_{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Y_{constructor(e){this.key=e,this.hu=!1}}class X_{constructor(e,t,n,s,r,a){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=r,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new un((c=>Nh(c)),Ws),this.Iu=new Map,this.Eu=new Set,this.du=new te(L.comparator),this.Au=new Map,this.Ru=new Ko,this.Vu={},this.mu=new Map,this.fu=Vn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function J_(i,e,t=!0){const n=Ad(i);let s;const r=n.Tu.get(e);return r?(n.sharedClientState.addLocalQueryTarget(r.targetId),s=r.view.lu()):s=await wd(n,e,t,!0),s}async function Z_(i,e){const t=Ad(i);await wd(t,e,!0,!1)}async function wd(i,e,t,n){const s=await v_(i.localStore,Ye(e)),r=s.targetId,a=i.sharedClientState.addLocalQueryTarget(r,t);let c;return n&&(c=await ev(i,e,r,a==="current",s.resumeToken)),i.isPrimaryClient&&t&&ld(i.remoteStore,s),c}async function ev(i,e,t,n,s){i.pu=(p,v,R)=>(async function(N,C,B,z){let q=C.view.ru(B);q.Cs&&(q=await zl(N.localStore,C.query,!1).then((({documents:E})=>C.view.ru(E,q))));const ge=z&&z.targetChanges.get(C.targetId),we=z&&z.targetMismatches.get(C.targetId)!=null,re=C.view.applyChanges(q,N.isPrimaryClient,ge,we);return Jl(N,C.targetId,re.au),re.snapshot})(i,p,v,R);const r=await zl(i.localStore,e,!0),a=new K_(e,r.Qs),c=a.ru(r.documents),u=ki.createSynthesizedTargetChangeForCurrentChange(t,n&&i.onlineState!=="Offline",s),h=a.applyChanges(c,i.isPrimaryClient,u);Jl(i,t,h.au);const f=new Q_(e,t,a);return i.Tu.set(e,f),i.Iu.has(t)?i.Iu.get(t).push(e):i.Iu.set(t,[e]),h.snapshot}async function tv(i,e,t){const n=U(i),s=n.Tu.get(e),r=n.Iu.get(s.targetId);if(r.length>1)return n.Iu.set(s.targetId,r.filter((a=>!Ws(a,e)))),void n.Tu.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Io(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),t&&Jo(n.remoteStore,s.targetId),Ao(n,s.targetId)})).catch(Bn)):(Ao(n,s.targetId),await Io(n.localStore,s.targetId,!0))}async function nv(i,e){const t=U(i),n=t.Tu.get(e),s=t.Iu.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),Jo(t.remoteStore,n.targetId))}async function iv(i,e,t){const n=uv(i);try{const s=await(function(a,c){const u=U(a),h=ee.now(),f=c.reduce(((R,D)=>R.add(D.key)),G());let p,v;return u.persistence.runTransaction("Locally write mutations","readwrite",(R=>{let D=mt(),N=G();return u.Ns.getEntries(R,f).next((C=>{D=C,D.forEach(((B,z)=>{z.isValidDocument()||(N=N.add(B))}))})).next((()=>u.localDocuments.getOverlayedDocuments(R,D))).next((C=>{p=C;const B=[];for(const z of c){const q=_y(z,p.get(z.key).overlayedDocument);q!=null&&B.push(new $t(z.key,q,Sh(q.value.mapValue),ze.exists(!0)))}return u.mutationQueue.addMutationBatch(R,h,B,c)})).next((C=>{v=C;const B=C.applyToLocalDocumentSet(p,N);return u.documentOverlayCache.saveOverlays(R,C.batchId,B)}))})).then((()=>({batchId:v.batchId,changes:xh(p)})))})(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),(function(a,c,u){let h=a.Vu[a.currentUser.toKey()];h||(h=new te(H)),h=h.insert(c,u),a.Vu[a.currentUser.toKey()]=h})(n,s.batchId,t),await Ni(n,s.changes),await er(n.remoteStore)}catch(s){const r=ia(s,"Failed to persist write");t.reject(r)}}async function Ed(i,e){const t=U(i);try{const n=await g_(t.localStore,e);e.targetChanges.forEach(((s,r)=>{const a=t.Au.get(r);a&&(Q(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?Q(a.hu,14607):s.removedDocuments.size>0&&(Q(a.hu,42227),a.hu=!1))})),await Ni(t,n,e)}catch(n){await Bn(n)}}function Xl(i,e,t){const n=U(i);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.Tu.forEach(((r,a)=>{const c=a.view.va(e);c.snapshot&&s.push(c.snapshot)})),(function(a,c){const u=U(a);u.onlineState=c;let h=!1;u.queries.forEach(((f,p)=>{for(const v of p.Sa)v.va(c)&&(h=!0)})),h&&sa(u)})(n.eventManager,e),s.length&&n.Pu.H_(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function sv(i,e,t){const n=U(i);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.Au.get(e),r=s&&s.key;if(r){let a=new te(L.comparator);a=a.insert(r,be.newNoDocument(r,F.min()));const c=G().add(r),u=new Xs(F.min(),new Map,new te(H),a,c);await Ed(n,u),n.du=n.du.remove(r),n.Au.delete(e),oa(n)}else await Io(n.localStore,e,!1).then((()=>Ao(n,e,t))).catch(Bn)}async function rv(i,e){const t=U(i),n=e.batch.batchId;try{const s=await p_(t.localStore,e);Td(t,n,null),Id(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await Ni(t,s)}catch(s){await Bn(s)}}async function ov(i,e,t){const n=U(i);try{const s=await(function(a,c){const u=U(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next((p=>(Q(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(h,p)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(n.localStore,e);Td(n,e,t),Id(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await Ni(n,s)}catch(s){await Bn(s)}}function Id(i,e){(i.mu.get(e)||[]).forEach((t=>{t.resolve()})),i.mu.delete(e)}function Td(i,e,t){const n=U(i);let s=n.Vu[n.currentUser.toKey()];if(s){const r=s.get(e);r&&(t?r.reject(t):r.resolve(),s=s.remove(e)),n.Vu[n.currentUser.toKey()]=s}}function Ao(i,e,t=null){i.sharedClientState.removeLocalQueryTarget(e);for(const n of i.Iu.get(e))i.Tu.delete(n),t&&i.Pu.yu(n,t);i.Iu.delete(e),i.isPrimaryClient&&i.Ru.jr(e).forEach((n=>{i.Ru.containsKey(n)||bd(i,n)}))}function bd(i,e){i.Eu.delete(e.path.canonicalString());const t=i.du.get(e);t!==null&&(Jo(i.remoteStore,t),i.du=i.du.remove(e),i.Au.delete(t),oa(i))}function Jl(i,e,t){for(const n of t)n instanceof _d?(i.Ru.addReference(n.key,e),av(i,n)):n instanceof vd?(V(ra,"Document no longer in limbo: "+n.key),i.Ru.removeReference(n.key,e),i.Ru.containsKey(n.key)||bd(i,n.key)):x(19791,{wu:n})}function av(i,e){const t=e.key,n=t.path.canonicalString();i.du.get(t)||i.Eu.has(n)||(V(ra,"New document in limbo: "+t),i.Eu.add(n),oa(i))}function oa(i){for(;i.Eu.size>0&&i.du.size<i.maxConcurrentLimboResolutions;){const e=i.Eu.values().next().value;i.Eu.delete(e);const t=new L(J.fromString(e)),n=i.fu.next();i.Au.set(n,new Y_(t)),i.du=i.du.insert(t,n),ld(i.remoteStore,new Pt(Ye($o(t.path)),n,"TargetPurposeLimboResolution",qs.ce))}}async function Ni(i,e,t){const n=U(i),s=[],r=[],a=[];n.Tu.isEmpty()||(n.Tu.forEach(((c,u)=>{a.push(n.pu(u,e,t).then((h=>{if((h||t)&&n.isPrimaryClient){const f=h?!h.fromCache:t?.targetChanges.get(u.targetId)?.current;n.sharedClientState.updateQueryState(u.targetId,f?"current":"not-current")}if(h){s.push(h);const f=Yo.As(u.targetId,h);r.push(f)}})))})),await Promise.all(a),n.Pu.H_(s),await(async function(u,h){const f=U(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>P.forEach(h,(v=>P.forEach(v.Es,(R=>f.persistence.referenceDelegate.addReference(p,v.targetId,R))).next((()=>P.forEach(v.ds,(R=>f.persistence.referenceDelegate.removeReference(p,v.targetId,R)))))))))}catch(p){if(!$n(p))throw p;V(Xo,"Failed to update sequence numbers: "+p)}for(const p of h){const v=p.targetId;if(!p.fromCache){const R=f.Ms.get(v),D=R.snapshotVersion,N=R.withLastLimboFreeSnapshotVersion(D);f.Ms=f.Ms.insert(v,N)}}})(n.localStore,r))}async function cv(i,e){const t=U(i);if(!t.currentUser.isEqual(e)){V(ra,"User change. New user:",e.toKey());const n=await rd(t.localStore,e);t.currentUser=e,(function(r,a){r.mu.forEach((c=>{c.forEach((u=>{u.reject(new M(S.CANCELLED,a))}))})),r.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await Ni(t,n.Ls)}}function lv(i,e){const t=U(i),n=t.Au.get(e);if(n&&n.hu)return G().add(n.key);{let s=G();const r=t.Iu.get(e);if(!r)return s;for(const a of r){const c=t.Tu.get(a);s=s.unionWith(c.view.nu)}return s}}function Ad(i){const e=U(i);return e.remoteStore.remoteSyncer.applyRemoteEvent=Ed.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=lv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=sv.bind(null,e),e.Pu.H_=G_.bind(null,e.eventManager),e.Pu.yu=W_.bind(null,e.eventManager),e}function uv(i){const e=U(i);return e.remoteStore.remoteSyncer.applySuccessfulWrite=rv.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=ov.bind(null,e),e}class Ds{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Js(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return m_(this.persistence,new h_,e.initialUser,this.serializer)}Cu(e){return new sd(Qo.mi,this.serializer)}Du(e){return new E_}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ds.provider={build:()=>new Ds};class hv extends Ds{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){Q(this.persistence.referenceDelegate instanceof Ps,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Yy(n,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Me.withCacheSize(this.cacheSizeBytes):Me.DEFAULT;return new sd((n=>Ps.mi(n,t)),this.serializer)}}class So{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Xl(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=cv.bind(null,this.syncEngine),await q_(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new H_})()}createDatastore(e){const t=Js(e.databaseInfo.databaseId),n=(function(r){return new S_(r)})(e.databaseInfo);return(function(r,a,c,u){return new D_(r,a,c,u)})(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return(function(n,s,r,a,c){return new M_(n,s,r,a,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Xl(this.syncEngine,t,0)),(function(){return Hl.v()?new Hl:new I_})())}createSyncEngine(e,t){return(function(s,r,a,c,u,h,f){const p=new X_(s,r,a,c,u,h);return f&&(p.gu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const n=U(t);V(nn,"RemoteStore shutting down."),n.Ea.add(5),await Mi(n),n.Aa.shutdown(),n.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}So.provider={build:()=>new So};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sd{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):dt("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut="FirestoreClient";class dv{constructor(e,t,n,s,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=s,this.user=Te.UNAUTHENTICATED,this.clientId=xo.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(n,(async a=>{V(Ut,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(n,(a=>(V(Ut,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new ut;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=ia(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function Kr(i,e){i.asyncQueue.verifyOperationInProgress(),V(Ut,"Initializing OfflineComponentProvider");const t=i.configuration;await e.initialize(t);let n=t.initialUser;i.setCredentialChangeListener((async s=>{n.isEqual(s)||(await rd(e.localStore,s),n=s)})),e.persistence.setDatabaseDeletedListener((()=>i.terminate())),i._offlineComponents=e}async function Zl(i,e){i.asyncQueue.verifyOperationInProgress();const t=await fv(i);V(Ut,"Initializing OnlineComponentProvider"),await e.initialize(t,i.configuration),i.setCredentialChangeListener((n=>Wl(e.remoteStore,n))),i.setAppCheckTokenChangeListener(((n,s)=>Wl(e.remoteStore,s))),i._onlineComponents=e}async function fv(i){if(!i._offlineComponents)if(i._uninitializedComponentsProvider){V(Ut,"Using user provided OfflineComponentProvider");try{await Kr(i,i._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===S.FAILED_PRECONDITION||s.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Cn("Error using user provided cache. Falling back to memory cache: "+t),await Kr(i,new Ds)}}else V(Ut,"Using default OfflineComponentProvider"),await Kr(i,new hv(void 0));return i._offlineComponents}async function Rd(i){return i._onlineComponents||(i._uninitializedComponentsProvider?(V(Ut,"Using user provided OnlineComponentProvider"),await Zl(i,i._uninitializedComponentsProvider._online)):(V(Ut,"Using default OnlineComponentProvider"),await Zl(i,new So))),i._onlineComponents}function mv(i){return Rd(i).then((e=>e.syncEngine))}async function Pd(i){const e=await Rd(i),t=e.eventManager;return t.onListen=J_.bind(null,e.syncEngine),t.onUnlisten=tv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Z_.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=nv.bind(null,e.syncEngine),t}function pv(i,e,t={}){const n=new ut;return i.asyncQueue.enqueueAndForget((async()=>(function(r,a,c,u,h){const f=new Sd({next:v=>{f.Nu(),a.enqueueAndForget((()=>gd(r,p)));const R=v.docs.has(c);!R&&v.fromCache?h.reject(new M(S.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&v.fromCache&&u&&u.source==="server"?h.reject(new M(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(v)},error:v=>h.reject(v)}),p=new yd($o(c.path),f,{includeMetadataChanges:!0,qa:!0});return pd(r,p)})(await Pd(i),i.asyncQueue,e,t,n))),n.promise}function gv(i,e,t={}){const n=new ut;return i.asyncQueue.enqueueAndForget((async()=>(function(r,a,c,u,h){const f=new Sd({next:v=>{f.Nu(),a.enqueueAndForget((()=>gd(r,p))),v.fromCache&&u.source==="server"?h.reject(new M(S.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(v)},error:v=>h.reject(v)}),p=new yd(c,f,{includeMetadataChanges:!0,qa:!0});return pd(r,p)})(await Pd(i),i.asyncQueue,e,t,n))),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cd(i){const e={};return i.timeoutSeconds!==void 0&&(e.timeoutSeconds=i.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eu=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dd="firestore.googleapis.com",tu=!0;class nu{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new M(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Dd,this.ssl=tu}else this.host=e.host,this.ssl=e.ssl??tu;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=id;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Ky)throw new M(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Mg("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Cd(e.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new M(S.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new M(S.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new M(S.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(n,s){return n.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class tr{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new nu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new M(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new nu(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new Ig;switch(n.type){case"firstParty":return new Sg(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new M(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const n=eu.get(t);n&&(V("ComponentProvider","Removing Datastore"),eu.delete(t),n.terminate())})(this),Promise.resolve()}}function yv(i,e,t,n={}){i=ft(i,tr);const s=On(e),r=i._getSettings(),a={...r,emulatorOptions:i._getEmulatorOptions()},c=`${e}:${t}`;s&&(Yu(`https://${c}`),Xu("Firestore",!0)),r.host!==Dd&&r.host!==c&&Cn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...r,host:c,ssl:s,emulatorOptions:n};if(!Nt(u,a)&&(i._setSettings(u),n.mockUserToken)){let h,f;if(typeof n.mockUserToken=="string")h=n.mockUserToken,f=Te.MOCK_USER;else{h=Km(n.mockUserToken,i._app?.options.projectId);const p=n.mockUserToken.sub||n.mockUserToken.user_id;if(!p)throw new M(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new Te(p)}i._authCredentials=new Tg(new mh(h,f))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new gt(this.firestore,e,this._query)}}class ue{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Mt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ue(this.firestore,e,this._key)}toJSON(){return{type:ue._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(Ci(t,ue._jsonSchema))return new ue(e,n||null,new L(J.fromString(t.referencePath)))}}ue._jsonSchemaVersion="firestore/documentReference/1.0",ue._jsonSchema={type:le("string",ue._jsonSchemaVersion),referencePath:le("string")};class Mt extends gt{constructor(e,t,n){super(e,t,$o(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ue(this.firestore,null,new L(e))}withConverter(e){return new Mt(this.firestore,e,this._path)}}function Qr(i,e,...t){if(i=se(i),ph("collection","path",e),i instanceof tr){const n=J.fromString(e,...t);return gl(n),new Mt(i,null,n)}{if(!(i instanceof ue||i instanceof Mt))throw new M(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=i._path.child(J.fromString(e,...t));return gl(n),new Mt(i.firestore,null,n)}}function bt(i,e,...t){if(i=se(i),arguments.length===1&&(e=xo.newId()),ph("doc","path",e),i instanceof tr){const n=J.fromString(e,...t);return pl(n),new ue(i,null,new L(n))}{if(!(i instanceof ue||i instanceof Mt))throw new M(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=i._path.child(J.fromString(e,...t));return pl(n),new ue(i.firestore,i instanceof Mt?i.converter:null,new L(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iu="AsyncQueue";class su{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new ad(this,"async_queue_retry"),this._c=()=>{const n=Wr();n&&V(iu,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=e;const t=Wr();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Wr();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new ut;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Xu.push(e),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!$n(e))throw e;V(iu,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((n=>{throw this.nc=n,this.rc=!1,dt("INTERNAL UNHANDLED ERROR: ",ru(n)),n})).then((n=>(this.rc=!1,n))))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=na.createAndSchedule(this,e,t,n,(r=>this.hc(r)));return this.tc.push(s),s}uc(){this.nc&&x(47125,{Pc:ru(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((t,n)=>t.targetTimeMs-n.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function ru(i){let e=i.message||"";return i.stack&&(e=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),e}class qn extends tr{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new su,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new su(e),this._firestoreClient=void 0,await e}}}function _v(i,e){const t=typeof i=="object"?i:Vo(),n=typeof i=="string"?i:Ts,s=cn(t,"firestore").getImmediate({identifier:n});if(!s._initialized){const r=Gm("firestore");r&&yv(s,...r)}return s}function aa(i){if(i._terminated)throw new M(S.FAILED_PRECONDITION,"The client has already been terminated.");return i._firestoreClient||vv(i),i._firestoreClient}function vv(i){const e=i._freezeSettings(),t=(function(s,r,a,c){return new jg(s,r,a,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,Cd(c.experimentalLongPollingOptions),c.useFetchStreams,c.isUsingEmulator)})(i._databaseId,i._app?.options.appId||"",i._persistenceKey,e);i._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(i._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),i._firestoreClient=new dv(i._authCredentials,i._appCheckCredentials,i._queue,t,i._componentsProvider&&(function(s){const r=s?._online.build();return{_offline:s?._offline.build(r),_online:r}})(i._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Fe(ve.fromBase64String(e))}catch(t){throw new M(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Fe(ve.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Fe._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Ci(e,Fe._jsonSchema))return Fe.fromBase64String(e.bytes)}}Fe._jsonSchemaVersion="firestore/bytes/1.0",Fe._jsonSchema={type:le("string",Fe._jsonSchemaVersion),bytes:le("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new M(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new _e(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new M(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new M(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return H(this._lat,e._lat)||H(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Je._jsonSchemaVersion}}static fromJSON(e){if(Ci(e,Je._jsonSchema))return new Je(e.latitude,e.longitude)}}Je._jsonSchemaVersion="firestore/geoPoint/1.0",Je._jsonSchema={type:le("string",Je._jsonSchemaVersion),latitude:le("number"),longitude:le("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(n,s){if(n.length!==s.length)return!1;for(let r=0;r<n.length;++r)if(n[r]!==s[r])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Ze._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ci(e,Ze._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Ze(e.vectorValues);throw new M(S.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ze._jsonSchemaVersion="firestore/vectorValue/1.0",Ze._jsonSchema={type:le("string",Ze._jsonSchemaVersion),vectorValues:le("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wv=/^__.*__$/;class Ev{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new $t(e,this.data,this.fieldMask,t,this.fieldTransforms):new Di(e,this.data,t,this.fieldTransforms)}}class kd{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new $t(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Md(i){switch(i){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw x(40011,{Ac:i})}}class ca{constructor(e,t,n,s,r,a){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,r===void 0&&this.Rc(),this.fieldTransforms=r||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new ca({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),n=this.Vc({path:t,fc:!1});return n.gc(e),n}yc(e){const t=this.path?.child(e),n=this.Vc({path:t,fc:!1});return n.Rc(),n}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return ks(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(Md(this.Ac)&&wv.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class Iv{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Js(e)}Cc(e,t,n,s=!1){return new ca({Ac:e,methodName:t,Dc:n,path:_e.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ir(i){const e=i._freezeSettings(),t=Js(i._databaseId);return new Iv(i._databaseId,!!e.ignoreUndefinedProperties,t)}function Tv(i,e,t,n,s,r={}){const a=i.Cc(r.merge||r.mergeFields?2:0,e,t,s);ha("Data must be an object, but it was:",a,n);const c=Vd(n,a);let u,h;if(r.merge)u=new Le(a.fieldMask),h=a.fieldTransforms;else if(r.mergeFields){const f=[];for(const p of r.mergeFields){const v=Ro(e,p,t);if(!a.contains(v))throw new M(S.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);xd(f,v)||f.push(v)}u=new Le(f),h=a.fieldTransforms.filter((p=>u.covers(p.field)))}else u=null,h=a.fieldTransforms;return new Ev(new Ne(c),u,h)}class sr extends Vi{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof sr}}class la extends Vi{_toFieldTransform(e){return new jh(e.path,new Ti)}isEqual(e){return e instanceof la}}class ua extends Vi{constructor(e,t){super(e),this.Fc=t}_toFieldTransform(e){const t=new Si(e.serializer,Uh(e.serializer,this.Fc));return new jh(e.path,t)}isEqual(e){return e instanceof ua&&this.Fc===e.Fc}}function bv(i,e,t,n){const s=i.Cc(1,e,t);ha("Data must be an object, but it was:",s,n);const r=[],a=Ne.empty();Bt(n,((u,h)=>{const f=da(e,u,t);h=se(h);const p=s.yc(f);if(h instanceof sr)r.push(f);else{const v=Li(h,p);v!=null&&(r.push(f),a.set(f,v))}}));const c=new Le(r);return new kd(a,c,s.fieldTransforms)}function Av(i,e,t,n,s,r){const a=i.Cc(1,e,t),c=[Ro(e,n,t)],u=[s];if(r.length%2!=0)throw new M(S.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let v=0;v<r.length;v+=2)c.push(Ro(e,r[v])),u.push(r[v+1]);const h=[],f=Ne.empty();for(let v=c.length-1;v>=0;--v)if(!xd(h,c[v])){const R=c[v];let D=u[v];D=se(D);const N=a.yc(R);if(D instanceof sr)h.push(R);else{const C=Li(D,N);C!=null&&(h.push(R),f.set(R,C))}}const p=new Le(h);return new kd(f,p,a.fieldTransforms)}function Nd(i,e,t,n=!1){return Li(t,i.Cc(n?4:3,e))}function Li(i,e){if(Ld(i=se(i)))return ha("Unsupported field value:",e,i),Vd(i,e);if(i instanceof Vi)return(function(n,s){if(!Md(s.Ac))throw s.Sc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${n._methodName}() is not currently supported inside arrays`);const r=n._toFieldTransform(s);r&&s.fieldTransforms.push(r)})(i,e),null;if(i===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),i instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return(function(n,s){const r=[];let a=0;for(const c of n){let u=Li(c,s.wc(a));u==null&&(u={nullValue:"NULL_VALUE"}),r.push(u),a++}return{arrayValue:{values:r}}})(i,e)}return(function(n,s){if((n=se(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Uh(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const r=ee.fromDate(n);return{timestampValue:Rs(s.serializer,r)}}if(n instanceof ee){const r=new ee(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Rs(s.serializer,r)}}if(n instanceof Je)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Fe)return{bytesValue:Yh(s.serializer,n._byteString)};if(n instanceof ue){const r=s.databaseId,a=n.firestore._databaseId;if(!a.isEqual(r))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:Wo(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof Ze)return(function(a,c){return{mapValue:{fields:{[bh]:{stringValue:Ah},[bs]:{arrayValue:{values:a.toArray().map((h=>{if(typeof h!="number")throw c.Sc("VectorValues must only contain numeric values.");return qo(c.serializer,h)}))}}}}}})(n,s);throw s.Sc(`Unsupported field value: ${zs(n)}`)})(i,e)}function Vd(i,e){const t={};return _h(i)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Bt(i,((n,s)=>{const r=Li(s,e.mc(n));r!=null&&(t[n]=r)})),{mapValue:{fields:t}}}function Ld(i){return!(typeof i!="object"||i===null||i instanceof Array||i instanceof Date||i instanceof ee||i instanceof Je||i instanceof Fe||i instanceof ue||i instanceof Vi||i instanceof Ze)}function ha(i,e,t){if(!Ld(t)||!gh(t)){const n=zs(t);throw n==="an object"?e.Sc(i+" a custom object"):e.Sc(i+" "+n)}}function Ro(i,e,t){if((e=se(e))instanceof nr)return e._internalPath;if(typeof e=="string")return da(i,e);throw ks("Field path arguments must be of type string or ",i,!1,void 0,t)}const Sv=new RegExp("[~\\*/\\[\\]]");function da(i,e,t){if(e.search(Sv)>=0)throw ks(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,i,!1,void 0,t);try{return new nr(...e.split("."))._internalPath}catch{throw ks(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,i,!1,void 0,t)}}function ks(i,e,t,n,s){const r=n&&!n.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(r||a)&&(u+=" (found",r&&(u+=` in field ${n}`),a&&(u+=` in document ${s}`),u+=")"),new M(S.INVALID_ARGUMENT,c+i+u)}function xd(i,e){return i.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa{constructor(e,t,n,s,r){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new ue(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Rv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(rr("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Rv extends fa{data(){return super.data()}}function rr(i,e){return typeof e=="string"?da(i,e):e instanceof nr?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pv(i){if(i.limitType==="L"&&i.explicitOrderBy.length===0)throw new M(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ma{}class or extends ma{}function oe(i,e,...t){let n=[];e instanceof ma&&n.push(e),n=n.concat(t),(function(r){const a=r.filter((u=>u instanceof pa)).length,c=r.filter((u=>u instanceof ar)).length;if(a>1||a>0&&c>0)throw new M(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const s of n)i=s._apply(i);return i}class ar extends or{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new ar(e,t,n)}_apply(e){const t=this._parse(e);return Od(e._query,t),new gt(e.firestore,e.converter,yo(e._query,t))}_parse(e){const t=ir(e.firestore);return(function(r,a,c,u,h,f,p){let v;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new M(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){au(p,f);const D=[];for(const N of p)D.push(ou(u,r,N));v={arrayValue:{values:D}}}else v=ou(u,r,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||au(p,f),v=Nd(c,a,p,f==="in"||f==="not-in");return ce.create(h,f,v)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function st(i,e,t){const n=e,s=rr("where",i);return ar._create(s,n,t)}class pa extends ma{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new pa(e,t)}_parse(e){const t=this._queryConstraints.map((n=>n._parse(e))).filter((n=>n.getFilters().length>0));return t.length===1?t[0]:He.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,r){let a=s;const c=r.getFlattenedFilters();for(const u of c)Od(a,u),a=yo(a,u)})(e._query,t),new gt(e.firestore,e.converter,yo(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class ga extends or{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new ga(e,t)}_apply(e){const t=(function(s,r,a){if(s.startAt!==null)throw new M(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new M(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ii(r,a)})(e._query,this._field,this._direction);return new gt(e.firestore,e.converter,(function(s,r){const a=s.explicitOrderBy.concat([r]);return new ln(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)})(e._query,t))}}function rt(i,e="asc"){const t=e,n=rr("orderBy",i);return ga._create(n,t)}class ya extends or{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new ya(e,t,n)}_apply(e){return new gt(e.firestore,e.converter,Ss(e._query,this._limit,this._limitType))}}function as(i){return Ng("limit",i),ya._create("limit",i,"F")}class _a extends or{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new _a(e,t,n)}_apply(e){const t=Dv(e,this.type,this._docOrFields,this._inclusive);return new gt(e.firestore,e.converter,(function(s,r){return new ln(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,r,s.endAt)})(e._query,t))}}function Cv(...i){return _a._create("startAfter",i,!1)}function Dv(i,e,t,n){if(t[0]=se(t[0]),t[0]instanceof fa)return(function(r,a,c,u,h){if(!u)throw new M(S.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const f=[];for(const p of In(r))if(p.field.isKeyField())f.push(As(a,u.key));else{const v=u.data.field(p.field);if(Hs(v))throw new M(S.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+p.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(v===null){const R=p.field.canonicalString();throw new M(S.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${R}' (used as the orderBy) does not exist.`)}f.push(v)}return new Nn(f,h)})(i._query,i.firestore._databaseId,e,t[0]._document,n);{const s=ir(i.firestore);return(function(a,c,u,h,f,p){const v=a.explicitOrderBy;if(f.length>v.length)throw new M(S.INVALID_ARGUMENT,`Too many arguments provided to ${h}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const R=[];for(let D=0;D<f.length;D++){const N=f[D];if(v[D].field.isKeyField()){if(typeof N!="string")throw new M(S.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${h}(), but got a ${typeof N}`);if(!zo(a)&&N.indexOf("/")!==-1)throw new M(S.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${h}() must be a plain document ID, but '${N}' contains a slash.`);const C=a.path.child(J.fromString(N));if(!L.isDocumentKey(C))throw new M(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${h}() must result in a valid document path, but '${C}' is not because it contains an odd number of segments.`);const B=new L(C);R.push(As(c,B))}else{const C=Nd(u,h,N);R.push(C)}}return new Nn(R,p)})(i._query,i.firestore._databaseId,s,e,t,n)}}function ou(i,e,t){if(typeof(t=se(t))=="string"){if(t==="")throw new M(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!zo(e)&&t.indexOf("/")!==-1)throw new M(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(J.fromString(t));if(!L.isDocumentKey(n))throw new M(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return As(i,new L(n))}if(t instanceof ue)return As(i,t._key);throw new M(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${zs(t)}.`)}function au(i,e){if(!Array.isArray(i)||i.length===0)throw new M(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Od(i,e){const t=(function(s,r){for(const a of s)for(const c of a.getFlattenedFilters())if(r.indexOf(c.op)>=0)return c.op;return null})(i.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new M(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new M(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class kv{convertValue(e,t="none"){switch(Ot(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ie(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(xt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw x(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return Bt(e,((s,r)=>{n[s]=this.convertValue(r,t)})),n}convertVectorValue(e){const t=e.fields?.[bs].arrayValue?.values?.map((n=>ie(n.doubleValue)));return new Ze(t)}convertGeoPoint(e){return new Je(ie(e.latitude),ie(e.longitude))}convertArray(e,t){return(e.values||[]).map((n=>this.convertValue(n,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Gs(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(vi(e));default:return null}}convertTimestamp(e){const t=Lt(e);return new ee(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=J.fromString(e);Q(nd(n),9688,{name:e});const s=new wi(n.get(1),n.get(3)),r=new L(n.popFirst(5));return s.isEqual(t)||dt(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mv(i,e,t){let n;return n=i?i.toFirestore(e):e,n}class hi{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Zt extends fa{constructor(e,t,n,s,r,a){super(e,t,n,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ps(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(rr("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new M(S.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Zt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Zt._jsonSchemaVersion="firestore/documentSnapshot/1.0",Zt._jsonSchema={type:le("string",Zt._jsonSchemaVersion),bundleSource:le("string","DocumentSnapshot"),bundleName:le("string"),bundle:le("string")};class ps extends Zt{data(e={}){return super.data(e)}}class bn{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new hi(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new ps(this._firestore,this._userDataWriter,n.key,n,new hi(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new M(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,r){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((c=>{const u=new ps(s._firestore,s._userDataWriter,c.doc.key,c.doc,new hi(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>r||c.type!==3)).map((c=>{const u=new ps(s._firestore,s._userDataWriter,c.doc.key,c.doc,new hi(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:Nv(c.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new M(S.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=bn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=xo.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach((r=>{r._document!==null&&(t.push(r._document),n.push(this._userDataWriter.convertObjectMap(r._document.data.value.mapValue.fields,"previous")),s.push(r.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Nv(i){switch(i){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return x(61501,{type:i})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cu(i){i=ft(i,ue);const e=ft(i.firestore,qn);return pv(aa(e),i._key).then((t=>Lv(e,i,t)))}bn._jsonSchemaVersion="firestore/querySnapshot/1.0",bn._jsonSchema={type:le("string",bn._jsonSchemaVersion),bundleSource:le("string","QuerySnapshot"),bundleName:le("string"),bundle:le("string")};class Fd extends kv{constructor(e){super(),this.firestore=e}convertBytes(e){return new Fe(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ue(this.firestore,null,t)}}function pn(i){i=ft(i,gt);const e=ft(i.firestore,qn),t=aa(e),n=new Fd(e);return Pv(i._query),gv(t,i._query).then((s=>new bn(e,n,i,s)))}function cs(i,e,t,...n){i=ft(i,ue);const s=ft(i.firestore,qn),r=ir(s);let a;return a=typeof(e=se(e))=="string"||e instanceof nr?Av(r,"updateDoc",i._key,e,t,n):bv(r,"updateDoc",i._key,e),va(s,[a.toMutation(i._key,ze.exists(!0))])}function Vv(i){return va(ft(i.firestore,qn),[new jo(i._key,ze.none())])}function Yr(i,e){const t=ft(i.firestore,qn),n=bt(i),s=Mv(i.converter,e);return va(t,[Tv(ir(i.firestore),"addDoc",n._key,s,i.converter!==null,{}).toMutation(n._key,ze.exists(!1))]).then((()=>n))}function va(i,e){return(function(n,s){const r=new ut;return n.asyncQueue.enqueueAndForget((async()=>iv(await mv(n),s,r))),r.promise})(aa(i),e)}function Lv(i,e,t){const n=t.docs.get(e._key),s=new Fd(i);return new Zt(i,s,e._key,n,new hi(t.hasPendingWrites,t.fromCache),e.converter)}function Kt(){return new la("serverTimestamp")}function lu(i){return new ua("increment",i)}(function(e,t=!0){(function(s){Un=s})(Fn),tt(new je("firestore",((n,{instanceIdentifier:s,options:r})=>{const a=n.getProvider("app").getImmediate(),c=new qn(new bg(n.getProvider("auth-internal")),new Rg(a,n.getProvider("app-check-internal")),(function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new M(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new wi(h.options.projectId,f)})(a,s),a);return r={useFetchStreams:t,...r},c._setSettings(r),c}),"PUBLIC").setMultipleInstances(!0)),Ue(hl,dl,e),Ue(hl,dl,"esm2020")})();var xv="firebase",Ov="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ue(xv,Ov,"app");function Ud(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Fv=Ud,Bd=new an("auth","Firebase",Ud());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ms=new $s("@firebase/auth");function Uv(i,...e){Ms.logLevel<=j.WARN&&Ms.warn(`Auth (${Fn}): ${i}`,...e)}function gs(i,...e){Ms.logLevel<=j.ERROR&&Ms.error(`Auth (${Fn}): ${i}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function it(i,...e){throw Ea(i,...e)}function qe(i,...e){return Ea(i,...e)}function wa(i,e,t){const n={...Fv(),[e]:t};return new an("auth","Firebase",n).create(e,{appName:i.name})}function en(i){return wa(i,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Bv(i,e,t){const n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&it(i,"argument-error"),wa(i,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Ea(i,...e){if(typeof i!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=i.name),i._errorFactory.create(t,...n)}return Bd.create(i,...e)}function O(i,e,...t){if(!i)throw Ea(e,...t)}function ct(i){const e="INTERNAL ASSERTION FAILED: "+i;throw gs(e),new Error(e)}function pt(i,e){i||ct(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Po(){return typeof self<"u"&&self.location?.href||""}function $v(){return uu()==="http:"||uu()==="https:"}function uu(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zv(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&($v()||Ju()||"connection"in navigator)?navigator.onLine:!0}function qv(){if(typeof navigator>"u")return null;const i=navigator;return i.languages&&i.languages[0]||i.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi{constructor(e,t){this.shortDelay=e,this.longDelay=t,pt(t>e,"Short delay should be less than long delay!"),this.isMobile=Xm()||ep()}get(){return zv()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ia(i,e){pt(i.emulator,"Emulator should always be set here");const{url:t}=i.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ct("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ct("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ct("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jv={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hv=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Gv=new xi(3e4,6e4);function Ta(i,e){return i.tenantId&&!e.tenantId?{...e,tenantId:i.tenantId}:e}async function jn(i,e,t,n,s={}){return zd(i,s,async()=>{let r={},a={};n&&(e==="GET"?a=n:r={body:JSON.stringify(n)});const c=Pi({key:i.config.apiKey,...a}).slice(1),u=await i._getAdditionalHeaders();u["Content-Type"]="application/json",i.languageCode&&(u["X-Firebase-Locale"]=i.languageCode);const h={method:e,headers:u,...r};return Zm()||(h.referrerPolicy="no-referrer"),i.emulatorConfig&&On(i.emulatorConfig.host)&&(h.credentials="include"),$d.fetch()(await qd(i,i.config.apiHost,t,c),h)})}async function zd(i,e,t){i._canInitEmulator=!1;const n={...jv,...e};try{const s=new Kv(i),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await r.json();if("needConfirmation"in a)throw ls(i,"account-exists-with-different-credential",a);if(r.ok&&!("errorMessage"in a))return a;{const c=r.ok?a.errorMessage:a.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ls(i,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw ls(i,"email-already-in-use",a);if(u==="USER_DISABLED")throw ls(i,"user-disabled",a);const f=n[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw wa(i,f,h);it(i,f)}}catch(s){if(s instanceof Ge)throw s;it(i,"network-request-failed",{message:String(s)})}}async function Wv(i,e,t,n,s={}){const r=await jn(i,e,t,n,s);return"mfaPendingCredential"in r&&it(i,"multi-factor-auth-required",{_serverResponse:r}),r}async function qd(i,e,t,n){const s=`${e}${t}?${n}`,r=i,a=r.config.emulator?Ia(i.config,s):`${i.config.apiScheme}://${s}`;return Hv.includes(t)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(a).toString():a}class Kv{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(qe(this.auth,"network-request-failed")),Gv.get())})}}function ls(i,e,t){const n={appName:i.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const s=qe(i,e,n);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qv(i,e){return jn(i,"POST","/v1/accounts:delete",e)}async function Ns(i,e){return jn(i,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gi(i){if(i)try{const e=new Date(Number(i));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Yv(i,e=!1){const t=se(i),n=await t.getIdToken(e),s=ba(n);O(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,a=r?.sign_in_provider;return{claims:s,token:n,authTime:gi(Xr(s.auth_time)),issuedAtTime:gi(Xr(s.iat)),expirationTime:gi(Xr(s.exp)),signInProvider:a||null,signInSecondFactor:r?.sign_in_second_factor||null}}function Xr(i){return Number(i)*1e3}function ba(i){const[e,t,n]=i.split(".");if(e===void 0||t===void 0||n===void 0)return gs("JWT malformed, contained fewer than 3 sections"),null;try{const s=Gu(t);return s?JSON.parse(s):(gs("Failed to decode base64 JWT payload"),null)}catch(s){return gs("Caught error parsing JWT payload as JSON",s?.toString()),null}}function hu(i){const e=ba(i);return O(e,"internal-error"),O(typeof e.exp<"u","internal-error"),O(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ri(i,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof Ge&&Xv(n)&&i.auth.currentUser===i&&await i.auth.signOut(),n}}function Xv({code:i}){return i==="auth/user-disabled"||i==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jv{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=gi(this.lastLoginAt),this.creationTime=gi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vs(i){const e=i.auth,t=await i.getIdToken(),n=await Ri(i,Ns(e,{idToken:t}));O(n?.users.length,e,"internal-error");const s=n.users[0];i._notifyReloadListener(s);const r=s.providerUserInfo?.length?jd(s.providerUserInfo):[],a=ew(i.providerData,r),c=i.isAnonymous,u=!(i.email&&s.passwordHash)&&!a?.length,h=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Co(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(i,f)}async function Zv(i){const e=se(i);await Vs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ew(i,e){return[...i.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function jd(i){return i.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tw(i,e){const t=await zd(i,{},async()=>{const n=Pi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=i.config,a=await qd(i,s,"/v1/token",`key=${r}`),c=await i._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:n};return i.emulatorConfig&&On(i.emulatorConfig.host)&&(u.credentials="include"),$d.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function nw(i,e){return jn(i,"POST","/v2/accounts:revokeToken",Ta(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){O(e.idToken,"internal-error"),O(typeof e.idToken<"u","internal-error"),O(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):hu(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){O(e.length!==0,"internal-error");const t=hu(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(O(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:r}=await tw(e,t);this.updateTokensAndExpiration(n,s,Number(r))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:r}=t,a=new An;return n&&(O(typeof n=="string","internal-error",{appName:e}),a.refreshToken=n),s&&(O(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),r&&(O(typeof r=="number","internal-error",{appName:e}),a.expirationTime=r),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new An,this.toJSON())}_performRefresh(){return ct("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tt(i,e){O(typeof i=="string"||typeof i>"u","internal-error",{appName:e})}class $e{constructor({uid:e,auth:t,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new Jv(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Co(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Ri(this,this.stsTokenManager.getToken(this.auth,e));return O(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Yv(this,e)}reload(){return Zv(this)}_assign(e){this!==e&&(O(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new $e({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){O(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Vs(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Be(this.auth.app))return Promise.reject(en(this.auth));const e=await this.getIdToken();return await Ri(this,Qv(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,s=t.email??void 0,r=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:v,isAnonymous:R,providerData:D,stsTokenManager:N}=t;O(p&&N,e,"internal-error");const C=An.fromJSON(this.name,N);O(typeof p=="string",e,"internal-error"),Tt(n,e.name),Tt(s,e.name),O(typeof v=="boolean",e,"internal-error"),O(typeof R=="boolean",e,"internal-error"),Tt(r,e.name),Tt(a,e.name),Tt(c,e.name),Tt(u,e.name),Tt(h,e.name),Tt(f,e.name);const B=new $e({uid:p,auth:e,email:s,emailVerified:v,displayName:n,isAnonymous:R,photoURL:a,phoneNumber:r,tenantId:c,stsTokenManager:C,createdAt:h,lastLoginAt:f});return D&&Array.isArray(D)&&(B.providerData=D.map(z=>({...z}))),u&&(B._redirectEventId=u),B}static async _fromIdTokenResponse(e,t,n=!1){const s=new An;s.updateFromServerResponse(t);const r=new $e({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await Vs(r),r}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];O(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?jd(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!r?.length,c=new An;c.updateFromIdToken(n);const u=new $e({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Co(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!r?.length};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const du=new Map;function lt(i){pt(i instanceof Function,"Expected a class definition");let e=du.get(i);return e?(pt(e instanceof i,"Instance stored in cache mismatched with class"),e):(e=new i,du.set(i,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Hd.type="NONE";const fu=Hd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ys(i,e,t){return`firebase:${i}:${e}:${t}`}class Sn{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:r}=this.auth;this.fullUserKey=ys(this.userKey,s.apiKey,r),this.fullPersistenceKey=ys("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ns(this.auth,{idToken:e}).catch(()=>{});return t?$e._fromGetAccountInfoResponse(this.auth,t,e):null}return $e._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Sn(lt(fu),e,n);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let r=s[0]||lt(fu);const a=ys(n,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(a);if(f){let p;if(typeof f=="string"){const v=await Ns(e,{idToken:f}).catch(()=>{});if(!v)break;p=await $e._fromGetAccountInfoResponse(e,v,f)}else p=$e._fromJSON(e,f);h!==r&&(c=p),r=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!r._shouldAllowMigration||!u.length?new Sn(r,e,n):(r=u[0],c&&await r._set(a,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==r)try{await h._remove(a)}catch{}})),new Sn(r,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mu(i){const e=i.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Qd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Gd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Xd(e))return"Blackberry";if(Jd(e))return"Webos";if(Wd(e))return"Safari";if((e.includes("chrome/")||Kd(e))&&!e.includes("edge/"))return"Chrome";if(Yd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=i.match(t);if(n?.length===2)return n[1]}return"Other"}function Gd(i=Ae()){return/firefox\//i.test(i)}function Wd(i=Ae()){const e=i.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Kd(i=Ae()){return/crios\//i.test(i)}function Qd(i=Ae()){return/iemobile/i.test(i)}function Yd(i=Ae()){return/android/i.test(i)}function Xd(i=Ae()){return/blackberry/i.test(i)}function Jd(i=Ae()){return/webos/i.test(i)}function Aa(i=Ae()){return/iphone|ipad|ipod/i.test(i)||/macintosh/i.test(i)&&/mobile/i.test(i)}function iw(i=Ae()){return Aa(i)&&!!window.navigator?.standalone}function sw(){return tp()&&document.documentMode===10}function Zd(i=Ae()){return Aa(i)||Yd(i)||Jd(i)||Xd(i)||/windows phone/i.test(i)||Qd(i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ef(i,e=[]){let t;switch(i){case"Browser":t=mu(Ae());break;case"Worker":t=`${mu(Ae())}-${i}`;break;default:t=i}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Fn}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rw{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=r=>new Promise((a,c)=>{try{const u=e(r);a(u)}catch(u){c(u)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ow(i,e={}){return jn(i,"GET","/v2/passwordPolicy",Ta(i,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aw=6;class cw{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??aw,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lw{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new pu(this),this.idTokenSubscription=new pu(this),this.beforeStateQueue=new rw(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Bd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=lt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Sn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ns(this,{idToken:e}),n=await $e._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Be(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,a=n?._redirectEventId,c=await this.tryRedirectSignIn(e);(!r||r===a)&&c?.user&&(n=c.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(r){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return O(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Vs(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=qv()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Be(this.app))return Promise.reject(en(this));const t=e?se(e):null;return t&&O(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&O(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Be(this.app)?Promise.reject(en(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Be(this.app)?Promise.reject(en(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(lt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ow(this),t=new cw(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new an("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await nw(this,n)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&lt(e)||this._popupRedirectResolver;O(t,this,"argument-error"),this.redirectPersistenceManager=await Sn.create(this,[lt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(O(c,this,"internal-error"),c.then(()=>{a||r(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,n,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return O(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ef(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if(Be(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Uv(`Error while retrieving App Check token: ${e.error}`),e?.token}}function cr(i){return se(i)}class pu{constructor(e){this.auth=e,this.observer=null,this.addObserver=cp(t=>this.observer=t)}get next(){return O(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Sa={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function uw(i){Sa=i}function hw(i){return Sa.loadJS(i)}function dw(){return Sa.gapiScript}function fw(i){return`__${i}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mw(i,e){const t=cn(i,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(Nt(r,e??{}))return s;it(s,"already-initialized")}return t.initialize({options:e})}function pw(i,e){const t=e?.persistence||[],n=(Array.isArray(t)?t:[t]).map(lt);e?.errorMap&&i._updateErrorMap(e.errorMap),i._initializeWithPersistence(n,e?.popupRedirectResolver)}function gw(i,e,t){const n=cr(i);O(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!1,r=tf(e),{host:a,port:c}=yw(e),u=c===null?"":`:${c}`,h={url:`${r}//${a}${u}/`},f=Object.freeze({host:a,port:c,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!n._canInitEmulator){O(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),O(Nt(h,n.config.emulator)&&Nt(f,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=h,n.emulatorConfig=f,n.settings.appVerificationDisabledForTesting=!0,On(a)?(Yu(`${r}//${a}${u}`),Xu("Auth",!0)):_w()}function tf(i){const e=i.indexOf(":");return e<0?"":i.substr(0,e+1)}function yw(i){const e=tf(i),t=/(\/\/)?([^?#/]+)/.exec(i.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const r=s[1];return{host:r,port:gu(n.substr(r.length+1))}}else{const[r,a]=n.split(":");return{host:r,port:gu(a)}}}function gu(i){if(!i)return null;const e=Number(i);return isNaN(e)?null:e}function _w(){function i(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",i):i())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ct("not implemented")}_getIdTokenResponse(e){return ct("not implemented")}_linkToIdToken(e,t){return ct("not implemented")}_getReauthenticationResolver(e){return ct("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rn(i,e){return Wv(i,"POST","/v1/accounts:signInWithIdp",Ta(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vw="http://localhost";class sn extends nf{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new sn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):it("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s,...r}=t;if(!n||!s)return null;const a=new sn(n,s);return a.idToken=r.idToken||void 0,a.accessToken=r.accessToken||void 0,a.secret=r.secret,a.nonce=r.nonce,a.pendingToken=r.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Rn(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Rn(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Rn(e,t)}buildRequest(){const e={requestUri:vw,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Pi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi extends Ra{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At extends Oi{constructor(){super("facebook.com")}static credential(e){return sn._fromParams({providerId:At.PROVIDER_ID,signInMethod:At.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return At.credentialFromTaggedObject(e)}static credentialFromError(e){return At.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return At.credential(e.oauthAccessToken)}catch{return null}}}At.FACEBOOK_SIGN_IN_METHOD="facebook.com";At.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at extends Oi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return sn._fromParams({providerId:at.PROVIDER_ID,signInMethod:at.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return at.credentialFromTaggedObject(e)}static credentialFromError(e){return at.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return at.credential(t,n)}catch{return null}}}at.GOOGLE_SIGN_IN_METHOD="google.com";at.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St extends Oi{constructor(){super("github.com")}static credential(e){return sn._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return St.credential(e.oauthAccessToken)}catch{return null}}}St.GITHUB_SIGN_IN_METHOD="github.com";St.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt extends Oi{constructor(){super("twitter.com")}static credential(e,t){return sn._fromParams({providerId:Rt.PROVIDER_ID,signInMethod:Rt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Rt.credentialFromTaggedObject(e)}static credentialFromError(e){return Rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Rt.credential(t,n)}catch{return null}}}Rt.TWITTER_SIGN_IN_METHOD="twitter.com";Rt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const r=await $e._fromIdTokenResponse(e,n,s),a=yu(n);return new xn({user:r,providerId:a,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=yu(n);return new xn({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function yu(i){return i.providerId?i.providerId:"phoneNumber"in i?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls extends Ge{constructor(e,t,n,s){super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,Ls.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new Ls(e,t,n,s)}}function sf(i,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(i):t._getIdTokenResponse(i)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Ls._fromErrorAndOperation(i,r,e,n):r})}async function ww(i,e,t=!1){const n=await Ri(i,e._linkToIdToken(i.auth,await i.getIdToken()),t);return xn._forOperation(i,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ew(i,e,t=!1){const{auth:n}=i;if(Be(n.app))return Promise.reject(en(n));const s="reauthenticate";try{const r=await Ri(i,sf(n,s,e,i),t);O(r.idToken,n,"internal-error");const a=ba(r.idToken);O(a,n,"internal-error");const{sub:c}=a;return O(i.uid===c,n,"user-mismatch"),xn._forOperation(i,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&it(n,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Iw(i,e,t=!1){if(Be(i.app))return Promise.reject(en(i));const n="signIn",s=await sf(i,n,e),r=await xn._fromIdTokenResponse(i,n,s);return t||await i._updateCurrentUser(r.user),r}function Tw(i,e,t,n){return se(i).onIdTokenChanged(e,t,n)}function bw(i,e,t){return se(i).beforeAuthStateChanged(e,t)}function Aw(i,e,t,n){return se(i).onAuthStateChanged(e,t,n)}function Sw(i){return se(i).signOut()}const xs="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(xs,"1"),this.storage.removeItem(xs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rw=1e3,Pw=10;class of extends rf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Zd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(n);!t&&this.localCache[n]===a||this.notifyListeners(n,a)},r=this.storage.getItem(n);sw()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Pw):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},Rw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}of.type="LOCAL";const Cw=of;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class af extends rf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}af.type="SESSION";const cf=af;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dw(i){return Promise.all(i.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const n=new lr(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:r}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const c=Array.from(a).map(async h=>h(t.origin,r)),u=await Dw(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}lr.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pa(i="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return i+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,a;return new Promise((c,u)=>{const h=Pa("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},n);a={messageChannel:s,onMessage(p){const v=p;if(v.data.eventId===h)switch(v.data.status){case"ack":clearTimeout(f),r=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),c(v.data.response);break;default:clearTimeout(f),clearTimeout(r),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(){return window}function Mw(i){et().location.href=i}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lf(){return typeof et().WorkerGlobalScope<"u"&&typeof et().importScripts=="function"}async function Nw(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Vw(){return navigator?.serviceWorker?.controller||null}function Lw(){return lf()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uf="firebaseLocalStorageDb",xw=1,Os="firebaseLocalStorage",hf="fbase_key";class Fi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ur(i,e){return i.transaction([Os],e?"readwrite":"readonly").objectStore(Os)}function Ow(){const i=indexedDB.deleteDatabase(uf);return new Fi(i).toPromise()}function Do(){const i=indexedDB.open(uf,xw);return new Promise((e,t)=>{i.addEventListener("error",()=>{t(i.error)}),i.addEventListener("upgradeneeded",()=>{const n=i.result;try{n.createObjectStore(Os,{keyPath:hf})}catch(s){t(s)}}),i.addEventListener("success",async()=>{const n=i.result;n.objectStoreNames.contains(Os)?e(n):(n.close(),await Ow(),e(await Do()))})})}async function _u(i,e,t){const n=ur(i,!0).put({[hf]:e,value:t});return new Fi(n).toPromise()}async function Fw(i,e){const t=ur(i,!1).get(e),n=await new Fi(t).toPromise();return n===void 0?null:n.value}function vu(i,e){const t=ur(i,!0).delete(e);return new Fi(t).toPromise()}const Uw=800,Bw=3;class df{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Do(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>Bw)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return lf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=lr._getInstance(Lw()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Nw(),!this.activeServiceWorker)return;this.sender=new kw(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Vw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Do();return await _u(e,xs,"1"),await vu(e,xs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>_u(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>Fw(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>vu(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=ur(s,!1).getAll();return new Fi(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Uw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}df.type="LOCAL";const $w=df;new xi(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ff(i,e){return e?lt(e):(O(i._popupRedirectResolver,i,"argument-error"),i._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca extends nf{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Rn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Rn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Rn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function zw(i){return Iw(i.auth,new Ca(i),i.bypassAuthState)}function qw(i){const{auth:e,user:t}=i;return O(t,e,"internal-error"),Ew(t,new Ca(i),i.bypassAuthState)}async function jw(i){const{auth:e,user:t}=i;return O(t,e,"internal-error"),ww(t,new Ca(i),i.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mf{constructor(e,t,n,s,r=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:r,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:n,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return zw;case"linkViaPopup":case"linkViaRedirect":return jw;case"reauthViaPopup":case"reauthViaRedirect":return qw;default:it(this.auth,"internal-error")}}resolve(e){pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hw=new xi(2e3,1e4);async function Gw(i,e,t){if(Be(i.app))return Promise.reject(qe(i,"operation-not-supported-in-this-environment"));const n=cr(i);Bv(i,e,Ra);const s=ff(n,t);return new Xt(n,"signInViaPopup",e,s).executeNotNull()}class Xt extends mf{constructor(e,t,n,s,r){super(e,t,s,r),this.provider=n,this.authWindow=null,this.pollId=null,Xt.currentPopupAction&&Xt.currentPopupAction.cancel(),Xt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return O(e,this.auth,"internal-error"),e}async onExecution(){pt(this.filter.length===1,"Popup operations only handle one event");const e=Pa();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(qe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(qe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Xt.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(qe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Hw.get())};e()}}Xt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ww="pendingRedirect",_s=new Map;class Kw extends mf{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=_s.get(this.auth._key());if(!e){try{const n=await Qw(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}_s.set(this.auth._key(),e)}return this.bypassAuthState||_s.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Qw(i,e){const t=Jw(e),n=Xw(i);if(!await n._isAvailable())return!1;const s=await n._get(t)==="true";return await n._remove(t),s}function Yw(i,e){_s.set(i._key(),e)}function Xw(i){return lt(i._redirectPersistence)}function Jw(i){return ys(Ww,i.config.apiKey,i.name)}async function Zw(i,e,t=!1){if(Be(i.app))return Promise.reject(en(i));const n=cr(i),s=ff(n,e),a=await new Kw(n,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await n._persistUserIfCurrent(a.user),await n._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eE=600*1e3;class tE{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!nE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!pf(e)){const n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(qe(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=eE&&this.cachedEventUids.clear(),this.cachedEventUids.has(wu(e))}saveEventToCache(e){this.cachedEventUids.add(wu(e)),this.lastProcessedEventTime=Date.now()}}function wu(i){return[i.type,i.eventId,i.sessionId,i.tenantId].filter(e=>e).join("-")}function pf({type:i,error:e}){return i==="unknown"&&e?.code==="auth/no-auth-event"}function nE(i){switch(i.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return pf(i);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iE(i,e={}){return jn(i,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,rE=/^https?/;async function oE(i){if(i.config.emulator)return;const{authorizedDomains:e}=await iE(i);for(const t of e)try{if(aE(t))return}catch{}it(i,"unauthorized-domain")}function aE(i){const e=Po(),{protocol:t,hostname:n}=new URL(e);if(i.startsWith("chrome-extension://")){const a=new URL(i);return a.hostname===""&&n===""?t==="chrome-extension:"&&i.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===n}if(!rE.test(t))return!1;if(sE.test(i))return n===i;const s=i.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cE=new xi(3e4,6e4);function Eu(){const i=et().___jsl;if(i?.H){for(const e of Object.keys(i.H))if(i.H[e].r=i.H[e].r||[],i.H[e].L=i.H[e].L||[],i.H[e].r=[...i.H[e].L],i.CP)for(let t=0;t<i.CP.length;t++)i.CP[t]=null}}function lE(i){return new Promise((e,t)=>{function n(){Eu(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Eu(),t(qe(i,"network-request-failed"))},timeout:cE.get()})}if(et().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(et().gapi?.load)n();else{const s=fw("iframefcb");return et()[s]=()=>{gapi.load?n():t(qe(i,"network-request-failed"))},hw(`${dw()}?onload=${s}`).catch(r=>t(r))}}).catch(e=>{throw vs=null,e})}let vs=null;function uE(i){return vs=vs||lE(i),vs}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hE=new xi(5e3,15e3),dE="__/auth/iframe",fE="emulator/auth/iframe",mE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},pE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function gE(i){const e=i.config;O(e.authDomain,i,"auth-domain-config-required");const t=e.emulator?Ia(e,fE):`https://${i.config.authDomain}/${dE}`,n={apiKey:e.apiKey,appName:i.name,v:Fn},s=pE.get(i.config.apiHost);s&&(n.eid=s);const r=i._getFrameworks();return r.length&&(n.fw=r.join(",")),`${t}?${Pi(n).slice(1)}`}async function yE(i){const e=await uE(i),t=et().gapi;return O(t,i,"internal-error"),e.open({where:document.body,url:gE(i),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:mE,dontclear:!0},n=>new Promise(async(s,r)=>{await n.restyle({setHideOnLeave:!1});const a=qe(i,"network-request-failed"),c=et().setTimeout(()=>{r(a)},hE.get());function u(){et().clearTimeout(c),s(n)}n.ping(u).then(u,()=>{r(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _E={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},vE=500,wE=600,EE="_blank",IE="http://localhost";class Iu{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function TE(i,e,t,n=vE,s=wE){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const u={..._E,width:n.toString(),height:s.toString(),top:r,left:a},h=Ae().toLowerCase();t&&(c=Kd(h)?EE:t),Gd(h)&&(e=e||IE,u.scrollbars="yes");const f=Object.entries(u).reduce((v,[R,D])=>`${v}${R}=${D},`,"");if(iw(h)&&c!=="_self")return bE(e||"",c),new Iu(null);const p=window.open(e||"",c,f);O(p,i,"popup-blocked");try{p.focus()}catch{}return new Iu(p)}function bE(i,e){const t=document.createElement("a");t.href=i,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AE="__/auth/handler",SE="emulator/auth/handler",RE=encodeURIComponent("fac");async function Tu(i,e,t,n,s,r){O(i.config.authDomain,i,"auth-domain-config-required"),O(i.config.apiKey,i,"invalid-api-key");const a={apiKey:i.config.apiKey,appName:i.name,authType:t,redirectUrl:n,v:Fn,eventId:s};if(e instanceof Ra){e.setDefaultLanguage(i.languageCode),a.providerId=e.providerId||"",ap(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof Oi){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}i.tenantId&&(a.tid=i.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await i._getAppCheckToken(),h=u?`#${RE}=${encodeURIComponent(u)}`:"";return`${PE(i)}?${Pi(c).slice(1)}${h}`}function PE({config:i}){return i.emulator?Ia(i,SE):`https://${i.authDomain}/${AE}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jr="webStorageSupport";class CE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=cf,this._completeRedirectFn=Zw,this._overrideRedirectResult=Yw}async _openPopup(e,t,n,s){pt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await Tu(e,t,n,Po(),s);return TE(e,r,Pa())}async _openRedirect(e,t,n,s){await this._originValidation(e);const r=await Tu(e,t,n,Po(),s);return Mw(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(pt(r,"If manager is not set, promise should be"),r)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await yE(e),n=new tE(e);return t.register("authEvent",s=>(O(s?.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Jr,{type:Jr},s=>{const r=s?.[0]?.[Jr];r!==void 0&&t(!!r),it(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=oE(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Zd()||Wd()||Aa()}}const DE=CE;var bu="@firebase/auth",Au="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e(n?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){O(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ME(i){switch(i){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function NE(i){tt(new je("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=n.options;O(a&&!a.includes(":"),"invalid-api-key",{appName:n.name});const u={apiKey:a,authDomain:c,clientPlatform:i,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ef(i)},h=new lw(n,s,r,u);return pw(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),tt(new je("auth-internal",e=>{const t=cr(e.getProvider("auth").getImmediate());return(n=>new kE(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ue(bu,Au,ME(i)),Ue(bu,Au,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VE=300,LE=Qu("authIdTokenMaxAge")||VE;let Su=null;const xE=i=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>LE)return;const s=t?.token;Su!==s&&(Su=s,await fetch(i,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function OE(i=Vo()){const e=cn(i,"auth");if(e.isInitialized())return e.getImmediate();const t=mw(i,{popupRedirectResolver:DE,persistence:[$w,Cw,cf]}),n=Qu("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(n,location.origin);if(location.origin===r.origin){const a=xE(r.toString());bw(t,a,()=>a(t.currentUser)),Tw(t,c=>a(c))}}const s=Wu("auth");return s&&gw(t,`http://${s}`),t}function FE(){return document.getElementsByTagName("head")?.[0]??document}uw({loadJS(i){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",i),n.onload=e,n.onerror=s=>{const r=qe("internal-error");r.customData=s,t(r)},n.type="text/javascript",n.charset="UTF-8",FE().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});NE("Browser");const gf="@firebase/installations",Da="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yf=1e4,_f=`w:${Da}`,vf="FIS_v2",UE="https://firebaseinstallations.googleapis.com/v1",BE=3600*1e3,$E="installations",zE="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qE={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},rn=new an($E,zE,qE);function wf(i){return i instanceof Ge&&i.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ef({projectId:i}){return`${UE}/projects/${i}/installations`}function If(i){return{token:i.token,requestStatus:2,expiresIn:HE(i.expiresIn),creationTime:Date.now()}}async function Tf(i,e){const n=(await e.json()).error;return rn.create("request-failed",{requestName:i,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function bf({apiKey:i}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":i})}function jE(i,{refreshToken:e}){const t=bf(i);return t.append("Authorization",GE(e)),t}async function Af(i){const e=await i();return e.status>=500&&e.status<600?i():e}function HE(i){return Number(i.replace("s","000"))}function GE(i){return`${vf} ${i}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WE({appConfig:i,heartbeatServiceProvider:e},{fid:t}){const n=Ef(i),s=bf(i),r=e.getImmediate({optional:!0});if(r){const h=await r.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const a={fid:t,authVersion:vf,appId:i.appId,sdkVersion:_f},c={method:"POST",headers:s,body:JSON.stringify(a)},u=await Af(()=>fetch(n,c));if(u.ok){const h=await u.json();return{fid:h.fid||t,registrationStatus:2,refreshToken:h.refreshToken,authToken:If(h.authToken)}}else throw await Tf("Create Installation",u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sf(i){return new Promise(e=>{setTimeout(e,i)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KE(i){return btoa(String.fromCharCode(...i)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QE=/^[cdef][\w-]{21}$/,ko="";function YE(){try{const i=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(i),i[0]=112+i[0]%16;const t=XE(i);return QE.test(t)?t:ko}catch{return ko}}function XE(i){return KE(i).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hr(i){return`${i.appName}!${i.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf=new Map;function Pf(i,e){const t=hr(i);Cf(t,e),JE(t,e)}function Cf(i,e){const t=Rf.get(i);if(t)for(const n of t)n(e)}function JE(i,e){const t=ZE();t&&t.postMessage({key:i,fid:e}),eI()}let Jt=null;function ZE(){return!Jt&&"BroadcastChannel"in self&&(Jt=new BroadcastChannel("[Firebase] FID Change"),Jt.onmessage=i=>{Cf(i.data.key,i.data.fid)}),Jt}function eI(){Rf.size===0&&Jt&&(Jt.close(),Jt=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tI="firebase-installations-database",nI=1,on="firebase-installations-store";let Zr=null;function ka(){return Zr||(Zr=ih(tI,nI,{upgrade:(i,e)=>{switch(e){case 0:i.createObjectStore(on)}}})),Zr}async function Fs(i,e){const t=hr(i),s=(await ka()).transaction(on,"readwrite"),r=s.objectStore(on),a=await r.get(t);return await r.put(e,t),await s.done,(!a||a.fid!==e.fid)&&Pf(i,e.fid),e}async function Df(i){const e=hr(i),n=(await ka()).transaction(on,"readwrite");await n.objectStore(on).delete(e),await n.done}async function dr(i,e){const t=hr(i),s=(await ka()).transaction(on,"readwrite"),r=s.objectStore(on),a=await r.get(t),c=e(a);return c===void 0?await r.delete(t):await r.put(c,t),await s.done,c&&(!a||a.fid!==c.fid)&&Pf(i,c.fid),c}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ma(i){let e;const t=await dr(i.appConfig,n=>{const s=iI(n),r=sI(i,s);return e=r.registrationPromise,r.installationEntry});return t.fid===ko?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function iI(i){const e=i||{fid:YE(),registrationStatus:0};return kf(e)}function sI(i,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(rn.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},n=rI(i,t);return{installationEntry:t,registrationPromise:n}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:oI(i)}:{installationEntry:e}}async function rI(i,e){try{const t=await WE(i,e);return Fs(i.appConfig,t)}catch(t){throw wf(t)&&t.customData.serverCode===409?await Df(i.appConfig):await Fs(i.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function oI(i){let e=await Ru(i.appConfig);for(;e.registrationStatus===1;)await Sf(100),e=await Ru(i.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:n}=await Ma(i);return n||t}return e}function Ru(i){return dr(i,e=>{if(!e)throw rn.create("installation-not-found");return kf(e)})}function kf(i){return aI(i)?{fid:i.fid,registrationStatus:0}:i}function aI(i){return i.registrationStatus===1&&i.registrationTime+yf<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cI({appConfig:i,heartbeatServiceProvider:e},t){const n=lI(i,t),s=jE(i,t),r=e.getImmediate({optional:!0});if(r){const h=await r.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const a={installation:{sdkVersion:_f,appId:i.appId}},c={method:"POST",headers:s,body:JSON.stringify(a)},u=await Af(()=>fetch(n,c));if(u.ok){const h=await u.json();return If(h)}else throw await Tf("Generate Auth Token",u)}function lI(i,{fid:e}){return`${Ef(i)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Na(i,e=!1){let t;const n=await dr(i.appConfig,r=>{if(!Mf(r))throw rn.create("not-registered");const a=r.authToken;if(!e&&dI(a))return r;if(a.requestStatus===1)return t=uI(i,e),r;{if(!navigator.onLine)throw rn.create("app-offline");const c=mI(r);return t=hI(i,c),c}});return t?await t:n.authToken}async function uI(i,e){let t=await Pu(i.appConfig);for(;t.authToken.requestStatus===1;)await Sf(100),t=await Pu(i.appConfig);const n=t.authToken;return n.requestStatus===0?Na(i,e):n}function Pu(i){return dr(i,e=>{if(!Mf(e))throw rn.create("not-registered");const t=e.authToken;return pI(t)?{...e,authToken:{requestStatus:0}}:e})}async function hI(i,e){try{const t=await cI(i,e),n={...e,authToken:t};return await Fs(i.appConfig,n),t}catch(t){if(wf(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await Df(i.appConfig);else{const n={...e,authToken:{requestStatus:0}};await Fs(i.appConfig,n)}throw t}}function Mf(i){return i!==void 0&&i.registrationStatus===2}function dI(i){return i.requestStatus===2&&!fI(i)}function fI(i){const e=Date.now();return e<i.creationTime||i.creationTime+i.expiresIn<e+BE}function mI(i){const e={requestStatus:1,requestTime:Date.now()};return{...i,authToken:e}}function pI(i){return i.requestStatus===1&&i.requestTime+yf<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gI(i){const e=i,{installationEntry:t,registrationPromise:n}=await Ma(e);return n?n.catch(console.error):Na(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yI(i,e=!1){const t=i;return await _I(t),(await Na(t,e)).token}async function _I(i){const{registrationPromise:e}=await Ma(i);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vI(i){if(!i||!i.options)throw eo("App Configuration");if(!i.name)throw eo("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!i.options[t])throw eo(t);return{appName:i.name,projectId:i.options.projectId,apiKey:i.options.apiKey,appId:i.options.appId}}function eo(i){return rn.create("missing-app-config-values",{valueName:i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nf="installations",wI="installations-internal",EI=i=>{const e=i.getProvider("app").getImmediate(),t=vI(e),n=cn(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:n,_delete:()=>Promise.resolve()}},II=i=>{const e=i.getProvider("app").getImmediate(),t=cn(e,Nf).getImmediate();return{getId:()=>gI(t),getToken:s=>yI(t,s)}};function TI(){tt(new je(Nf,EI,"PUBLIC")),tt(new je(wI,II,"PRIVATE"))}TI();Ue(gf,Da);Ue(gf,Da,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Us="analytics",bI="firebase_id",AI="origin",SI=60*1e3,RI="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Va="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ce=new $s("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PI={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},xe=new an("analytics","Analytics",PI);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CI(i){if(!i.startsWith(Va)){const e=xe.create("invalid-gtag-resource",{gtagURL:i});return Ce.warn(e.message),""}return i}function Vf(i){return Promise.all(i.map(e=>e.catch(t=>t)))}function DI(i,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(i,e)),t}function kI(i,e){const t=DI("firebase-js-sdk-policy",{createScriptURL:CI}),n=document.createElement("script"),s=`${Va}?l=${i}&id=${e}`;n.src=t?t?.createScriptURL(s):s,n.async=!0,document.head.appendChild(n)}function MI(i){let e=[];return Array.isArray(window[i])?e=window[i]:window[i]=e,e}async function NI(i,e,t,n,s,r){const a=n[s];try{if(a)await e[a];else{const u=(await Vf(t)).find(h=>h.measurementId===s);u&&await e[u.appId]}}catch(c){Ce.error(c)}i("config",s,r)}async function VI(i,e,t,n,s){try{let r=[];if(s&&s.send_to){let a=s.send_to;Array.isArray(a)||(a=[a]);const c=await Vf(t);for(const u of a){const h=c.find(p=>p.measurementId===u),f=h&&e[h.appId];if(f)r.push(f);else{r=[];break}}}r.length===0&&(r=Object.values(e)),await Promise.all(r),i("event",n,s||{})}catch(r){Ce.error(r)}}function LI(i,e,t,n){async function s(r,...a){try{if(r==="event"){const[c,u]=a;await VI(i,e,t,c,u)}else if(r==="config"){const[c,u]=a;await NI(i,e,t,n,c,u)}else if(r==="consent"){const[c,u]=a;i("consent",c,u)}else if(r==="get"){const[c,u,h]=a;i("get",c,u,h)}else if(r==="set"){const[c]=a;i("set",c)}else i(r,...a)}catch(c){Ce.error(c)}}return s}function xI(i,e,t,n,s){let r=function(...a){window[n].push(arguments)};return window[s]&&typeof window[s]=="function"&&(r=window[s]),window[s]=LI(r,i,e,t),{gtagCore:r,wrappedGtag:window[s]}}function OI(i){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(Va)&&t.src.includes(i))return t;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FI=30,UI=1e3;class BI{constructor(e={},t=UI){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Lf=new BI;function $I(i){return new Headers({Accept:"application/json","x-goog-api-key":i})}async function zI(i){const{appId:e,apiKey:t}=i,n={method:"GET",headers:$I(t)},s=RI.replace("{app-id}",e),r=await fetch(s,n);if(r.status!==200&&r.status!==304){let a="";try{const c=await r.json();c.error?.message&&(a=c.error.message)}catch{}throw xe.create("config-fetch-failed",{httpStatus:r.status,responseMessage:a})}return r.json()}async function qI(i,e=Lf,t){const{appId:n,apiKey:s,measurementId:r}=i.options;if(!n)throw xe.create("no-app-id");if(!s){if(r)return{measurementId:r,appId:n};throw xe.create("no-api-key")}const a=e.getThrottleMetadata(n)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new GI;return setTimeout(async()=>{c.abort()},SI),xf({appId:n,apiKey:s,measurementId:r},a,c,e)}async function xf(i,{throttleEndTimeMillis:e,backoffCount:t},n,s=Lf){const{appId:r,measurementId:a}=i;try{await jI(n,e)}catch(c){if(a)return Ce.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${c?.message}]`),{appId:r,measurementId:a};throw c}try{const c=await zI(i);return s.deleteThrottleMetadata(r),c}catch(c){const u=c;if(!HI(u)){if(s.deleteThrottleMetadata(r),a)return Ce.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${u?.message}]`),{appId:r,measurementId:a};throw c}const h=Number(u?.customData?.httpStatus)===503?tl(t,s.intervalMillis,FI):tl(t,s.intervalMillis),f={throttleEndTimeMillis:Date.now()+h,backoffCount:t+1};return s.setThrottleMetadata(r,f),Ce.debug(`Calling attemptFetch again in ${h} millis`),xf(i,f,n,s)}}function jI(i,e){return new Promise((t,n)=>{const s=Math.max(e-Date.now(),0),r=setTimeout(t,s);i.addEventListener(()=>{clearTimeout(r),n(xe.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function HI(i){if(!(i instanceof Ge)||!i.customData)return!1;const e=Number(i.customData.httpStatus);return e===429||e===500||e===503||e===504}class GI{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function WI(i,e,t,n,s){if(s&&s.global){i("event",t,n);return}else{const r=await e,a={...n,send_to:r};i("event",t,a)}}async function KI(i,e,t,n){if(n&&n.global){const s={};for(const r of Object.keys(t))s[`user_properties.${r}`]=t[r];return i("set",s),Promise.resolve()}else{const s=await e;i("config",s,{update:!0,user_properties:t})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QI(){if(Zu())try{await eh()}catch(i){return Ce.warn(xe.create("indexeddb-unavailable",{errorInfo:i?.toString()}).message),!1}else return Ce.warn(xe.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function YI(i,e,t,n,s,r,a){const c=qI(i);c.then(v=>{t[v.measurementId]=v.appId,i.options.measurementId&&v.measurementId!==i.options.measurementId&&Ce.warn(`The measurement ID in the local Firebase config (${i.options.measurementId}) does not match the measurement ID fetched from the server (${v.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(v=>Ce.error(v)),e.push(c);const u=QI().then(v=>{if(v)return n.getId()}),[h,f]=await Promise.all([c,u]);OI(r)||kI(r,h.measurementId),s("js",new Date);const p=a?.config??{};return p[AI]="firebase",p.update=!0,f!=null&&(p[bI]=f),s("config",h.measurementId,p),h.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XI{constructor(e){this.app=e}_delete(){return delete Pn[this.app.options.appId],Promise.resolve()}}let Pn={},Cu=[];const Du={};let to="dataLayer",JI="gtag",ku,La,Mu=!1;function ZI(){const i=[];if(Ju()&&i.push("This is a browser extension environment."),ip()||i.push("Cookies are not available."),i.length>0){const e=i.map((n,s)=>`(${s+1}) ${n}`).join(" "),t=xe.create("invalid-analytics-context",{errorInfo:e});Ce.warn(t.message)}}function eT(i,e,t){ZI();const n=i.options.appId;if(!n)throw xe.create("no-app-id");if(!i.options.apiKey)if(i.options.measurementId)Ce.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${i.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw xe.create("no-api-key");if(Pn[n]!=null)throw xe.create("already-exists",{id:n});if(!Mu){MI(to);const{wrappedGtag:r,gtagCore:a}=xI(Pn,Cu,Du,to,JI);La=r,ku=a,Mu=!0}return Pn[n]=YI(i,Cu,Du,e,ku,to,t),new XI(i)}function tT(i=Vo()){i=se(i);const e=cn(i,Us);return e.isInitialized()?e.getImmediate():nT(i)}function nT(i,e={}){const t=cn(i,Us);if(t.isInitialized()){const s=t.getImmediate();if(Nt(e,t.getOptions()))return s;throw xe.create("already-initialized")}return t.initialize({options:e})}function iT(i,e,t){i=se(i),KI(La,Pn[i.app.options.appId],e,t).catch(n=>Ce.error(n))}function sT(i,e,t,n){i=se(i),WI(La,Pn[i.app.options.appId],e,t,n).catch(s=>Ce.error(s))}const Nu="@firebase/analytics",Vu="0.10.19";function rT(){tt(new je(Us,(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return eT(n,s,t)},"PUBLIC")),tt(new je("analytics-internal",i,"PRIVATE")),Ue(Nu,Vu),Ue(Nu,Vu,"esm2020");function i(e){try{const t=e.getProvider(Us).getImmediate();return{logEvent:(n,s,r)=>sT(t,n,s,r),setUserProperties:(n,s)=>iT(t,n,s)}}catch(t){throw xe.create("interop-component-reg-failed",{reason:t})}}}rT();const oT={apiKey:"AIzaSyCvu8YJ6yQh5bXeDaoyGgo3LYiFgw8x-tA",authDomain:"roombuilder-4ffd9.firebaseapp.com",projectId:"roombuilder-4ffd9",storageBucket:"roombuilder-4ffd9.firebasestorage.app",messagingSenderId:"319855638873",appId:"1:319855638873:web:495b5457b1750911d6f448",measurementId:"G-Q0DWR8K1ZC"},xa=sh(oT),no=_v(xa),io=OE(xa);tT(xa);class Oa{designsCollection=Qr(no,"designs");commentsCollection=Qr(no,"comments");profilesCollection=Qr(no,"profiles");constructor(){this.testConnection()}cleanUndefinedValues(e){if(e==null)return null;if(Array.isArray(e))return e.map(t=>this.cleanUndefinedValues(t)).filter(t=>t!==null);if(typeof e=="object"){const t={};for(const[n,s]of Object.entries(e))if(s!==void 0){const r=this.cleanUndefinedValues(s);r!==null&&(t[n]=r)}return t}return e}async testConnection(){try{const e=oe(this.designsCollection,as(1));await pn(e);const t=oe(this.designsCollection,st("isPublic","==",!0),as(5));await pn(t);const n=oe(this.designsCollection,as(10));await pn(n)}catch(e){console.error("FirestoreService: Connection failed:",e),console.error("FirestoreService: Error details:",e)}}async saveDesign(e){try{const t=this.cleanUndefinedValues({...e,createdAt:Kt(),updatedAt:Kt(),likes:0,views:0});return(await Yr(this.designsCollection,t)).id}catch(t){throw console.error("Error saving design:",t),t}}async updateDesign(e,t){try{const n=bt(this.designsCollection,e),s=this.cleanUndefinedValues({...t,updatedAt:Kt()});await cs(n,s)}catch(n){throw console.error("Error updating design:",n),n}}async deleteDesign(e){try{const t=bt(this.designsCollection,e);await Vv(t)}catch(t){throw console.error("Error deleting design:",t),t}}async getDesign(e){try{const t=bt(this.designsCollection,e),n=await cu(t);if(n.exists()){const s=n.data();return{id:n.id,...s,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}else return null}catch(t){throw console.error("Error getting design:",t),t}}async getPublicDesigns(e){try{let t=oe(this.designsCollection,st("isPublic","==",!0));e.roomType&&(t=oe(t,st("roomType","==",e.roomType))),e.budgetMin!==void 0&&(t=oe(t,st("budget",">=",e.budgetMin))),e.budgetMax!==void 0&&(t=oe(t,st("budget","<=",e.budgetMax))),e.tags&&e.tags.length>0&&(t=oe(t,st("tags","array-contains-any",e.tags)));try{switch(e.sortBy){case"newest":t=oe(t,rt("createdAt","desc"));break;case"popular":t=oe(t,rt("likes","desc"),rt("createdAt","desc"));break;case"likes":t=oe(t,rt("likes","desc"));break;case"views":t=oe(t,rt("views","desc"));break;default:t=oe(t,rt("createdAt","desc"));break}}catch(c){console.warn("FirestoreService: Error applying sort, using default:",c),t=oe(t,rt("createdAt","desc"))}t=oe(t,as(e.limit)),e.lastDoc&&(t=oe(t,Cv(e.lastDoc)));const n=await pn(t),s=[];n.forEach(c=>{try{const u=c.data(),h=u.createdAt?.toDate?u.createdAt.toDate():new Date(u.createdAt||Date.now()),f=u.updatedAt?.toDate?u.updatedAt.toDate():new Date(u.updatedAt||Date.now());s.push({id:c.id,...u,createdAt:h.getTime(),updatedAt:f.getTime()})}catch(u){console.error("FirestoreService: Error processing document:",c.id,u)}});const r=n.docs[n.docs.length-1]||null,a=n.docs.length===e.limit;return{designs:s,lastDoc:r,hasMore:a}}catch(t){throw console.error("Error getting public designs:",t),t}}async createTestDesign(){try{const e={title:"Test Design",description:"This is a test design to verify Firestore connectivity",roomDimensions:{width:10,length:12,height:9},furniture:[],budget:1e3,roomType:"living",tags:["test","debug"],isPublic:!0,author:{uid:"test-user",displayName:"Test User",photoURL:null},createdAt:Kt(),updatedAt:Kt(),likes:0,views:0};await Yr(this.designsCollection,e)}catch(e){console.error("FirestoreService: Error creating test design:",e)}}async getUserDesigns(e,t=!1){try{let n=oe(this.designsCollection,st("author.uid","==",e));t||(n=oe(n,st("isPublic","==",!0))),n=oe(n,rt("createdAt","desc"));const s=await pn(n),r=[];return s.forEach(a=>{const c=a.data();r.push({id:a.id,...c,createdAt:c.createdAt||Date.now(),updatedAt:c.updatedAt||Date.now()})}),r}catch(n){throw console.error("Error getting user designs:",n),n}}hasUserLikedDesign(e,t){return this.getLikedDesigns(t).includes(e)}getLikedDesigns(e){const t=`likedDesigns_${e}`,n=localStorage.getItem(t);return n?JSON.parse(n):[]}addLikedDesign(e,t){const n=this.getLikedDesigns(e);if(!n.includes(t)){n.push(t);const s=`likedDesigns_${e}`;localStorage.setItem(s,JSON.stringify(n))}}async likeDesign(e,t){if(!t)throw new Error("User ID is required to like a design");if(this.hasUserLikedDesign(e,t))throw new Error("You have already liked this design");try{const n=bt(this.designsCollection,e);await cs(n,{likes:lu(1)}),this.addLikedDesign(t,e)}catch(n){throw console.error("Error liking design:",n),n}}async incrementViews(e){try{const t=`viewed_${e}`;if(sessionStorage.getItem(t))return;const n=bt(this.designsCollection,e);await cs(n,{views:lu(1)}),sessionStorage.setItem(t,"true")}catch(t){console.error("Error incrementing views:",t)}}async addComment(e,t){try{const n=this.cleanUndefinedValues({designId:e,...t,createdAt:Kt(),likes:0});return(await Yr(this.commentsCollection,n)).id}catch(n){throw console.error("Error adding comment:",n),n}}async getDesignComments(e){try{const t=oe(this.commentsCollection,st("designId","==",e),rt("createdAt","desc")),n=await pn(t),s=[];return n.forEach(r=>{const a=r.data();s.push({id:r.id,...a,createdAt:a.createdAt||Date.now()})}),s}catch(t){throw console.error("Error getting comments:",t),t}}async updateUserProfile(e,t){try{const n=bt(this.profilesCollection,e),s=this.cleanUndefinedValues({...t,updatedAt:Kt()});await cs(n,s)}catch(n){throw console.error("Error updating user profile:",n),n}}async getUserProfile(e){try{const t=bt(this.profilesCollection,e),n=await cu(t);if(n.exists()){const s=n.data();return{uid:e,...s,createdAt:s.createdAt||Date.now()}}else return null}catch(t){throw console.error("Error getting user profile:",t),t}}}const Lu=Object.freeze(Object.defineProperty({__proto__:null,FirestoreService:Oa},Symbol.toStringTag,{value:"Module"}));class Fa{googleProvider;currentUser=null;authStateListeners=[];isSigningIn=!1;constructor(){this.googleProvider=new at,this.googleProvider.addScope("profile"),this.googleProvider.addScope("email"),Aw(io,e=>{e?this.currentUser={uid:e.uid,displayName:e.displayName,email:e.email,photoURL:e.photoURL}:this.currentUser=null,this.authStateListeners.forEach(t=>t(this.currentUser))})}async signInWithGoogle(){if(this.isSigningIn)return null;this.isSigningIn=!0;try{return await Gw(io,this.googleProvider),new Promise(e=>{setTimeout(()=>{this.isSigningIn=!1,e(this.currentUser)},100)})}catch(e){throw this.isSigningIn=!1,e}}async signOut(){try{this.currentUser=null,await Sw(io),this.authStateListeners.forEach(e=>e(null))}catch{this.currentUser=null,this.authStateListeners.forEach(t=>t(null))}}getCurrentUser(){return this.currentUser}isAuthenticated(){return this.currentUser!==null}isCurrentlySigningIn(){return this.isSigningIn}onAuthStateChange(e){return this.authStateListeners.push(e),e(this.currentUser),()=>{const t=this.authStateListeners.indexOf(e);t>-1&&this.authStateListeners.splice(t,1)}}async waitForAuthState(){return new Promise(e=>{if(this.currentUser!==void 0)e(this.currentUser);else{const t=this.onAuthStateChange(n=>{t(),e(n)})}})}}class aT{firestoreService;authService;container;currentFilters;lastDoc=null;hasMore=!0;constructor(e,t){this.container=e,this.firestoreService=new Oa,this.authService=t,this.currentFilters={sortBy:"newest",limit:50}}async initialize(){if(!this.authService.isAuthenticated()){this.showAuthenticationRequired();return}this.renderGallery(),this.setupEventListeners(),await this.loadDesigns(!0)}renderGallery(){const e=this.authService.getCurrentUser(),t=e?.displayName||"User",n=e?.photoURL||"";this.container.innerHTML=`
      <div class="gallery-container">
        <div class="gallery-header">
          <div class="gallery-title-section">
            <h2>Community Designs</h2>
            <div class="user-welcome">
              <div class="user-info">
                ${n?`<img src="${n}" alt="${t}" class="user-avatar">`:""}
                <span class="welcome-text">Welcome back, ${t}!</span>
              </div>
            </div>
            <div class="gallery-actions">
              <button id="create-new-room" class="btn-primary">
                <i class="icon-plus"></i> Create New Room
              </button>
              <button id="back-to-builder" class="btn-secondary">
                <i class="icon-arrow-left"></i> Back to Builder
              </button>
            </div>
          </div>
          <div class="debug-actions" style="margin-bottom: 15px;">
            <button id="create-test-design" class="btn-secondary" style="font-size: 12px; padding: 5px 10px;">
              Create Test Design
            </button>
          </div>
          <div class="gallery-filters">
            <select id="room-type-filter" class="filter-select">
              <option value="">All Room Types</option>
              <option value="living">Living Room</option>
              <option value="bedroom">Bedroom</option>
              <option value="kitchen">Kitchen</option>
              <option value="bathroom">Bathroom</option>
              <option value="office">Office</option>
              <option value="dining">Dining Room</option>
            </select>
            <select id="sort-filter" class="filter-select">
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="likes">Most Liked</option>
              <option value="views">Most Viewed</option>
            </select>
            <div class="budget-filter">
              <label>Budget Range:</label>
              <input type="number" id="budget-min" placeholder="Min" min="0">
              <span>-</span>
              <input type="number" id="budget-max" placeholder="Max" min="0">
            </div>
          </div>
        </div>
        <div class="gallery-grid" id="designs-grid">
          <!-- Designs will be loaded here -->
        </div>
        <div class="gallery-loading" id="loading-indicator" style="display: none;">
          <div class="spinner"></div>
          <p>Loading more designs...</p>
        </div>
        <button id="load-more-btn" class="btn-primary" style="display: none;">Load More</button>
      </div>
    `}async loadDesigns(e=!0){if(e&&(this.lastDoc=null,this.hasMore=!0,document.getElementById("designs-grid").innerHTML=""),!!this.hasMore)try{document.getElementById("loading-indicator").style.display="block",document.getElementById("load-more-btn").style.display="none";const t={...this.currentFilters,lastDoc:this.lastDoc},n=await this.firestoreService.getPublicDesigns(t);this.lastDoc=n.lastDoc,this.hasMore=n.hasMore,e&&(document.getElementById("designs-grid").innerHTML=""),n.designs.length===0?e&&this.showNoDesignsMessage():n.designs.forEach(s=>{this.addDesignCard(s)}),this.hasMore&&(document.getElementById("load-more-btn").style.display="block")}catch(t){console.error("Error loading designs:",t),this.showError("Failed to load designs. Please try again.")}finally{document.getElementById("loading-indicator").style.display="none"}}addDesignCard(e){const t=document.getElementById("designs-grid");if(!t){console.error("DesignGallery: designs-grid element not found!");return}const n=this.authService?.getCurrentUser(),s=n?this.firestoreService.hasUserLikedDesign(e.id,n.uid):!1,r=document.createElement("div");r.className="design-card",r.innerHTML=`
      <div class="design-thumbnail" style="background-color: #f0f0f0;">
        ${e.thumbnail?`<img src="${e.thumbnail}" alt="${e.title}">`:'<div class="placeholder-thumbnail">3D Preview</div>'}
      </div>
      <div class="design-info">
        <h3 class="design-title">${e.title}</h3>
        <p class="design-description">${e.description}</p>
        <div class="design-meta">
          <span class="design-room-type">${e.roomType}</span>
          <span class="design-budget">$${e.budget}</span>
        </div>
        <div class="design-stats">
          <span class="stat" title="Number of likes">
            <i class="icon-heart"></i> ${e.likes} likes
          </span>
          <span class="stat" title="Number of views">
            <i class="icon-eye"></i> ${e.views} views
          </span>
          <span class="stat" title="Number of furniture items">
            <i class="icon-furniture"></i> ${e.furniture.length} items
          </span>
        </div>
        <div class="design-author">
          <img src="${e.author.photoURL||"/default-avatar.png"}" alt="${e.author.displayName}" class="author-avatar">
          <span class="author-name">${e.author.displayName}</span>
        </div>
        <div class="design-actions">
          <button class="btn-secondary view-design-btn" data-design-id="${e.id}">Load Design</button>
          <button class="btn-primary like-design-btn ${s?"liked":""}" data-design-id="${e.id}" ${s?"disabled":""}>
            <i class="icon-heart"></i> ${s?"Liked!":"Like"}
          </button>
        </div>
      </div>
    `,t.appendChild(r)}setupEventListeners(){document.getElementById("room-type-filter")?.addEventListener("change",n=>{const s=n.target.value;this.currentFilters.roomType=s||void 0,this.loadDesigns(!0)}),document.getElementById("sort-filter")?.addEventListener("change",n=>{const s=n.target.value;this.currentFilters.sortBy=s,this.loadDesigns(!0)});const e=document.getElementById("budget-min"),t=document.getElementById("budget-max");e?.addEventListener("input",()=>{this.currentFilters.budgetMin=e.value?parseFloat(e.value):void 0,this.loadDesigns(!0)}),t?.addEventListener("input",()=>{this.currentFilters.budgetMax=t.value?parseFloat(t.value):void 0,this.loadDesigns(!0)}),document.getElementById("load-more-btn")?.addEventListener("click",()=>{this.loadDesigns(!1)}),document.getElementById("create-test-design")?.addEventListener("click",async()=>{try{await this.firestoreService.createTestDesign(),await this.loadDesigns(!0)}catch(n){console.error("Error creating test design:",n)}}),document.getElementById("create-new-room")?.addEventListener("click",()=>{this.container.dispatchEvent(new CustomEvent("navigateToBuilder",{detail:{action:"createNewRoom"}}))}),document.getElementById("back-to-builder")?.addEventListener("click",()=>{this.container.dispatchEvent(new CustomEvent("navigateToBuilder",{detail:{action:"backToBuilder"}}))}),document.addEventListener("click",n=>{const s=n.target;if(s.classList.contains("view-design-btn")){const r=s.getAttribute("data-design-id");r&&this.viewDesign(r)}if(s.classList.contains("like-design-btn")){const r=s.getAttribute("data-design-id");r&&this.likeDesign(r,s)}})}async viewDesign(e){if(!this.authService.isAuthenticated()){this.showError("Please sign in to view designs.");return}try{const t=await this.firestoreService.getDesign(e);if(!t)throw new Error("Design not found");await this.firestoreService.incrementViews(e),this.container.dispatchEvent(new CustomEvent("designSelected",{detail:{design:t}}))}catch(t){console.error("Error viewing design:",t),this.showError("Failed to load design. Please try again.")}}async likeDesign(e,t){if(!this.authService||!this.authService.isAuthenticated()){this.showError("Please sign in to like designs.");return}const n=this.authService.getCurrentUser();if(!n){this.showError("User not found. Please sign in again.");return}if(this.firestoreService.hasUserLikedDesign(e,n.uid)){this.showError("You have already liked this design.");return}try{await this.firestoreService.likeDesign(e,n.uid),await this.firestoreService.incrementViews(e),t.innerHTML='<i class="icon-heart"></i> Liked!',t.classList.add("liked"),t.disabled=!0;const r=t.closest(".design-card")?.querySelector(".stat .icon-heart")?.parentElement;if(r){const a=parseInt(r.textContent?.replace(/[^\d]/g,"")||"0");r.innerHTML=`<i class="icon-heart"></i> ${a+1}`}}catch(s){console.error("Error liking design:",s),s instanceof Error&&s.message&&s.message.includes("permission")?this.showError("Please sign in to like designs."):s instanceof Error&&s.message&&s.message.includes("already liked")?this.showError("You have already liked this design."):this.showError("Failed to like design. Please try again.")}}showError(e){const t=document.createElement("div");t.className="error-message",t.textContent=e,t.style.cssText=`
      background: #ffebee;
      color: #c62828;
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0;
      text-align: center;
    `;const n=document.getElementById("designs-grid");n?.parentNode?.insertBefore(t,n),setTimeout(()=>{t.remove()},5e3)}showNoDesignsMessage(){const e=document.querySelector(".no-designs-message");e&&e.remove();const t=document.createElement("div");t.className="no-designs-message",t.innerHTML=`
      <div style="text-align: center; padding: 40px 20px; color: #666;">
        <div style="font-size: 48px; margin-bottom: 16px;">🏠</div>
        <h3 style="margin: 0 0 8px 0; color: #333;">No designs found</h3>
        <p style="margin: 0; color: #666;">Be the first to publish a design to the community!</p>
      </div>
    `;const n=document.getElementById("designs-grid");n&&n.appendChild(t)}async refresh(){await this.loadDesigns(!0)}async loadNewDesigns(){await this.loadDesigns(!1)}updateFilters(e){this.currentFilters={...this.currentFilters,...e},this.loadDesigns(!0)}showAuthenticationRequired(){this.container.innerHTML=`
      <div class="gallery-container">
        <div class="authentication-required">
          <div class="auth-required-content">
            <div class="auth-icon">🔒</div>
            <h2>Sign In Required</h2>
            <p>Please sign in with your Google account to view community designs.</p>
            <button id="sign-in-btn" class="btn-primary">
              <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    `,document.getElementById("sign-in-btn")?.addEventListener("click",async()=>{try{await this.authService.signInWithGoogle(),await this.initialize()}catch(e){console.error("Error signing in:",e),this.showError("Failed to sign in. Please try again.")}})}}class cT{container;firestoreService;authService;onPublishCallback;constructor(e){this.container=e,this.firestoreService=new Oa,this.authService=new Fa}show(e,t){this.onPublishCallback=t,this.renderDialog(e)}renderDialog(e){this.container.querySelectorAll(".publish-dialog-overlay").forEach(s=>s.remove());const n=document.createElement("div");n.className="publish-dialog-overlay",n.innerHTML=`
      <div class="publish-dialog">
        <div class="publish-dialog-header">
          <h2>Publish Your Design</h2>
          <button class="close-dialog-btn">&times;</button>
        </div>
        <div class="publish-dialog-content">
          <form id="publish-form">
            <div class="form-group">
              <label for="design-title">Design Title *</label>
              <input type="text" id="design-title" required placeholder="Enter a catchy title for your design">
            </div>
            
            <div class="form-group">
              <label for="design-description">Description *</label>
              <textarea id="design-description" required placeholder="Describe your design, inspiration, or any special features..."></textarea>
            </div>
            
            <div class="form-group">
              <label for="design-tags">Tags (comma-separated)</label>
              <input type="text" id="design-tags" placeholder="modern, cozy, minimal, etc.">
              <small>Help others find your design by adding relevant tags</small>
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" id="is-public" checked>
                <span class="checkmark"></span>
                Make this design public
              </label>
              <small>Public designs can be viewed and liked by other users</small>
            </div>
            
            <div class="design-summary">
              <h3>Design Summary</h3>
              <div class="summary-grid">
                <div class="summary-item">
                  <span class="summary-label">Room Type:</span>
                  <span class="summary-value">${e.roomType}</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">Dimensions:</span>
                  <span class="summary-value">${e.roomDimensions.width} × ${e.roomDimensions.length} × ${e.roomDimensions.height} ft</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">Furniture Items:</span>
                  <span class="summary-value">${e.furniture.length}</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">Total Budget:</span>
                  <span class="summary-value">$${e.budget}</span>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="publish-dialog-footer">
          <button type="button" class="btn-secondary" id="cancel-publish">Cancel</button>
          <button type="button" class="btn-primary" id="publish-design">Publish Design</button>
        </div>
      </div>
    `,this.container.appendChild(n),this.setupEventListeners(e,n)}setupEventListeners(e,t){t.querySelector(".close-dialog-btn")?.addEventListener("click",()=>{this.close(t)}),t.querySelector("#cancel-publish")?.addEventListener("click",()=>{this.close(t)}),t.querySelector("#publish-design")?.addEventListener("click",async()=>{await this.handlePublish(e)}),t.addEventListener("click",n=>{n.target===n.currentTarget&&this.close(t)})}async handlePublish(e){const t=document.getElementById("publish-form");if(!t.checkValidity()){t.reportValidity();return}const n=document.getElementById("design-title").value,s=document.getElementById("design-description").value,r=document.getElementById("design-tags").value,a=document.getElementById("is-public").checked,c=r?r.split(",").map(u=>u.trim()).filter(u=>u.length>0):[];try{const u=document.getElementById("publish-design");u.textContent="Publishing...",u.disabled=!0;const h=this.authService.getCurrentUser();if(!h)throw new Error("User not authenticated");const f={uid:h.uid,displayName:h.displayName,photoURL:h.photoURL},p=await this.firestoreService.saveDesign({title:n,description:s,roomDimensions:e.roomDimensions,furniture:e.furniture,budget:e.budget,roomType:e.roomType,author:f,isPublic:a,tags:c,thumbnail:e.thumbnail||""});this.showSuccess(p),this.onPublishCallback&&this.onPublishCallback(p)}catch(u){console.error("Error publishing design:",u),this.showError("Failed to publish design. Please try again.");const h=document.getElementById("publish-design");h.textContent="Publish Design",h.disabled=!1}}showSuccess(e){this.container.querySelectorAll(".publish-dialog-overlay").forEach(s=>s.remove());const n=document.createElement("div");n.className="publish-dialog-overlay",n.innerHTML=`
      <div class="publish-dialog success-dialog">
        <div class="success-content">
          <div class="success-icon">✓</div>
          <h2>Design Published Successfully!</h2>
          <p>Your design has been shared with the community.</p>
          <div class="success-actions">
            <button class="btn-primary" id="view-design" data-design-id="${e}">View My Design</button>
            <button class="btn-secondary" id="close-success">Close</button>
          </div>
        </div>
      </div>
    `,this.container.appendChild(n),n.querySelector("#view-design")?.addEventListener("click",()=>{this.container.dispatchEvent(new CustomEvent("viewPublishedDesign",{detail:{designId:e}})),this.close(n)}),n.querySelector("#close-success")?.addEventListener("click",()=>{this.close(n)})}showError(e){const t=document.createElement("div");t.className="error-message",t.textContent=e,t.style.cssText=`
      background: #ffebee;
      color: #c62828;
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0;
      text-align: center;
    `;const n=document.getElementById("publish-form");n?.insertBefore(t,n.firstChild),setTimeout(()=>{t.remove()},5e3)}close(e){const t=e||document.querySelector(".publish-dialog-overlay");t&&t.remove()}}class lT{container;authService;constructor(e,t){this.container=e,this.authService=t}render(){const e=this.authService.getCurrentUser(),t=this.authService.isAuthenticated();e&&t?this.renderLoggedInProfile(e):this.renderLoggedOutProfile()}renderLoggedInProfile(e){const t=this.testPhotoURL(e.photoURL),n=t?`<img src="${e.photoURL}" alt="${e.displayName||"User"}" class="user-avatar" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`:"",s=`<div class="default-avatar" ${t?'style="display:none;"':""}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </div>`;this.container.innerHTML=`
      <div class="user-profile logged-in">
        <div class="login-status">
          <div class="status-indicator">
            <div class="status-dot"></div>
            <span class="status-text">Logged In</span>
          </div>
        </div>
        <div class="user-info">
          ${n}
          ${s}
          <div class="user-details">
            <span class="user-name">${e.displayName||"Anonymous User"}</span>
            <span class="user-email">${e.email||"No email"}</span>
          </div>
        </div>
        <button class="logout-btn" id="logout-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16,17 21,12 16,7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Sign Out
        </button>
      </div>
    `,document.getElementById("logout-btn")?.addEventListener("click",async()=>{await this.handleLogout()})}renderLoggedOutProfile(){this.container.innerHTML=`
      <div class="user-profile logged-out">
        <div class="user-info">
          <div class="default-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div class="user-details">
            <span class="user-name">Guest User</span>
            <span class="user-email">Sign in to publish designs</span>
          </div>
        </div>
        <button class="login-btn" id="login-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10,17 15,12 10,7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
          Sign In
        </button>
      </div>
    `,document.getElementById("login-btn")?.addEventListener("click",()=>{this.container.dispatchEvent(new CustomEvent("requestLogin"))})}async handleLogout(){try{await this.authService.signOut(),this.render()}catch(e){console.error("Error signing out:",e),this.showError("Failed to sign out. Please try again.")}}showError(e){const t=document.createElement("div");t.className="error-message",t.textContent=e,t.style.cssText=`
      background: #ffebee;
      color: #c62828;
      padding: 8px 12px;
      border-radius: 4px;
      margin: 8px 0;
      text-align: center;
      font-size: 12px;
    `,this.container.appendChild(t),setTimeout(()=>{t.remove()},3e3)}refresh(){this.render()}testPhotoURL(e){if(!e||e.trim()==="")return!1;try{return new URL(e),!0}catch{return!1}}}class uT{container;authService;onLoginCallback;constructor(e){this.container=e,this.authService=new Fa}show(e){this.onLoginCallback=e,this.renderModal()}renderModal(){const e=document.createElement("div");e.className="login-modal-overlay",e.innerHTML=`
      <div class="login-modal">
        <div class="login-modal-header">
          <h2>Sign in to publish designs</h2>
          <button class="close-login-btn">&times;</button>
        </div>
        <div class="login-modal-content">
          <div class="login-description">
            <p>To publish and share your room designs with the community, please sign in with your Google account.</p>
          </div>
          <div class="login-benefits">
            <h3>Benefits of signing in:</h3>
            <ul>
              <li>✨ Publish and share your designs</li>
              <li>❤️ Like and save favorite designs</li>
              <li>💬 Comment on community designs</li>
              <li>👤 Build your design portfolio</li>
              <li>📊 Track your design statistics</li>
            </ul>
          </div>
          <div class="login-actions">
            <button class="google-login-btn" id="google-login">
              <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <p class="login-privacy">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    `,this.container.appendChild(e),this.setupEventListeners()}setupEventListeners(){document.querySelector(".close-login-btn")?.addEventListener("click",()=>{this.close()}),document.querySelector(".login-modal-overlay")?.addEventListener("click",e=>{e.target===e.currentTarget&&this.close()}),document.getElementById("google-login")?.addEventListener("click",async()=>{await this.handleGoogleLogin()})}async handleGoogleLogin(){const e=document.getElementById("google-login");if(!this.authService.isCurrentlySigningIn())try{e.innerHTML=`
        <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20">
          <circle cx="12" cy="12" r="10" stroke="#4285F4" stroke-width="2" fill="none"/>
          <path d="M12 2v4" stroke="#4285F4" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 18v4" stroke="#4285F4" stroke-width="2" stroke-linecap="round"/>
          <path d="M4.93 4.93l2.83 2.83" stroke="#4285F4" stroke-width="2" stroke-linecap="round"/>
          <path d="M16.24 16.24l2.83 2.83" stroke="#4285F4" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Signing in...
      `,e.disabled=!0;const t=await this.authService.signInWithGoogle();if(t)this.showSuccess(t),this.onLoginCallback&&this.onLoginCallback(t);else throw new Error("No user returned after sign in")}catch(t){console.error("Login error:",t),this.showError("Failed to sign in. Please try again."),e.innerHTML=`
        <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      `,e.disabled=!1}}showSuccess(e){const t=this.container.querySelector(".login-modal-overlay");t&&t.remove();const n=document.createElement("div");n.className="login-modal-overlay",n.innerHTML=`
      <div class="login-modal success-modal">
        <div class="success-content">
          <div class="success-icon">✓</div>
          <h2>Welcome, ${e.displayName}!</h2>
          <p>You're now signed in and can publish your designs.</p>
          <div class="user-info">
            <img src="${e.photoURL||"/default-avatar.png"}" alt="${e.displayName}" class="user-avatar">
            <div class="user-details">
              <span class="user-name">${e.displayName}</span>
              <span class="user-email">${e.email}</span>
            </div>
          </div>
          <button class="btn-primary" id="close-success">Get Started</button>
        </div>
      </div>
    `,this.container.appendChild(n),document.getElementById("close-success")?.addEventListener("click",()=>{this.close()})}showError(e){const t=document.createElement("div");t.className="error-message",t.textContent=e,t.style.cssText=`
      background: #ffebee;
      color: #c62828;
      padding: 10px;
      border-radius: 4px;
      margin: 15px 0;
      text-align: center;
    `;const n=document.querySelector(".login-modal-content");n?.insertBefore(t,n.firstChild),setTimeout(()=>{t.remove()},5e3)}close(){const e=this.container.querySelector(".login-modal-overlay");e&&e.remove()}}class hT{scene;camera;renderer;cube;animationId=null;container;constructor(e){this.container=e,this.initializeScene(),this.createCube(),this.animate()}initializeScene(){this.scene=new xu,this.scene.background=new Ou(16316922),this.camera=new Fu(75,this.container.clientWidth/this.container.clientHeight,.1,1e3),this.camera.position.set(3,3,3),this.camera.lookAt(0,0,0),this.renderer=new Uu({antialias:!0,alpha:!0}),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Bu,this.container.appendChild(this.renderer.domElement),this.setupLighting(),window.addEventListener("resize",()=>this.onWindowResize())}setupLighting(){const e=new $u(4210752,.6);this.scene.add(e);const t=new so(16777215,.8);t.position.set(5,5,5),t.castShadow=!0,t.shadow.mapSize.width=2048,t.shadow.mapSize.height=2048,this.scene.add(t);const n=new zu(3447003,.5,10);n.position.set(-2,2,2),this.scene.add(n)}createCube(){const e=new ai(1,1,1),t=[new Oe({color:16777215}),new Oe({color:16777215}),new Oe({color:3447003}),new Oe({color:16777215}),new Oe({color:16777215}),new Oe({color:15528177})];this.cube=new ot(e,t),this.cube.castShadow=!0,this.cube.receiveShadow=!0,this.scene.add(this.cube),this.cube.rotation.x=.2,this.cube.rotation.y=.2}animate(){this.animationId=requestAnimationFrame(()=>this.animate()),this.cube&&(this.cube.rotation.y+=.005,this.cube.rotation.x+=.002),this.renderer.render(this.scene,this.camera)}onWindowResize(){const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}dispose(){this.animationId&&cancelAnimationFrame(this.animationId),this.scene.clear(),this.renderer.dispose(),this.container.contains(this.renderer.domElement)&&this.container.removeChild(this.renderer.domElement)}getCube(){return this.cube}}class dT{room3D=null;furnitureManager;decorationAI;designGallery;publishDialog;authService;userProfile;loginModal;cubeLogo;state;container;currentView="builder";constructor(){this.container=document.getElementById("app"),this.state={roomDimensions:null,furniture:[],selectedFurniture:null,isEditing:!1,isViewing:!1,budget:1e3,roomType:"living",isPublished:!1},this.initializeServices(),this.initializeUI()}initializeServices(){this.furnitureManager=new Xc,this.decorationAI=new Om,this.publishDialog=new cT(this.container),this.authService=new Fa,this.loginModal=new uT(this.container)}initializeUI(){this.container.innerHTML=`
      <div class="app-container">
        <div class="sidebar">
          <div id="app-logo"></div>
          <div id="user-profile"></div>
          <div id="my-rooms"></div>
          <div id="room-management"></div>
          <div id="room-setup"></div>
          <div id="furniture-search"></div>
          <div id="furniture-palette"></div>
          <div id="suggestions"></div>
          <div id="budget-tracker"></div>
        </div>
        <div class="main-content">
          <div id="3d-viewport"></div>
          <div class="drag-instructions hidden" id="drag-instructions">
            <strong>Drag Mode:</strong> Click and drag furniture to move them around the room
          </div>
          <div class="selection-instructions hidden" id="selection-instructions">
            <strong>Selection Mode:</strong> Click furniture to select, then use colored handles to move along specific axes
            <br><span class="handle-x">Red = X-axis</span> | <span class="handle-y">Green = Y-axis</span> | <span class="handle-z">Blue = Z-axis</span>
            <br><strong>Rotation:</strong> <span class="handle-x">Red sphere = X-rotation</span> | <span class="handle-y">Green sphere = Y-rotation</span> | <span class="handle-z">Blue sphere = Z-rotation</span>
          </div>
          <div class="view-instructions hidden" id="view-instructions">
            <strong>View Mode:</strong> Click on any furniture to view its details and specifications
          </div>
          <div class="controls">
            <button id="get-suggestions" class="btn-secondary">Get AI Suggestions</button>
            <button id="edit-mode" class="btn-secondary" disabled>Edit Mode</button>
            <button id="view-mode" class="btn-secondary" disabled>View Mode</button>
            <button id="delete-selected" class="btn-secondary" disabled>Delete Selected</button>
            <button id="reset-view" class="btn-secondary">Reset View</button>
            <button id="publish-design" class="btn-primary">Publish Design</button>
            <button id="browse-designs" class="btn-secondary">
              <i class="icon-community"></i> Browse Community
            </button>
          </div>
          <div class="manipulation-controls" id="manipulation-controls" style="display: none;">
            <div class="manipulation-mode-buttons">
              <button id="manipulation-mode-move" class="btn-manipulation active" data-mode="move">
                <i class="icon-move"></i> Move
              </button>
              <button id="manipulation-mode-rotate" class="btn-manipulation" data-mode="rotate">
                <i class="icon-rotate"></i> Rotate
              </button>
              <button id="manipulation-mode-delete" class="btn-manipulation" data-mode="delete">
                <i class="icon-delete"></i> Delete
              </button>
            </div>
            <div class="manipulation-actions" id="manipulation-actions" style="display: none;">
              <div class="position-controls">
                <label>Position:</label>
                <div class="position-inputs">
                  <input type="number" id="position-x" placeholder="X" step="0.1">
                  <input type="number" id="position-y" placeholder="Y" step="0.1">
                  <input type="number" id="position-z" placeholder="Z" step="0.1">
                  <button id="apply-position" class="btn-small">Apply</button>
                </div>
              </div>
              <div class="rotation-controls">
                <label>Rotation:</label>
                <div class="rotation-buttons">
                  <button id="rotate-left" class="btn-small">↺ 45°</button>
                  <button id="rotate-right" class="btn-small">↻ 45°</button>
                </div>
              </div>
              <div class="drag-settings">
                <label>Drag Settings:</label>
                <div class="drag-options">
                  <label class="checkbox-label">
                    <input type="checkbox" id="snap-to-grid" checked>
                    <span>Snap to Grid (0.5 units)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="instructions">
            <p><strong>3D Controls:</strong> Mouse to rotate, scroll to zoom, right-click + drag to pan</p>
            <p><strong>Furniture:</strong> Click items in the sidebar to add them to your room</p>
          </div>
        </div>
      </div>
    `,this.setupAppLogo(),this.setupUserProfile(),this.setupMyRooms(),this.setupRoomManagement(),this.setupRoomInput(),this.setupFurnitureSearch(),this.setupFurniturePalette(),this.setupBudgetTracker(),this.setupEventListeners(),this.setupAuthStateListener(),this.updateAllButtonStates()}setupAppLogo(){const e=document.getElementById("app-logo");e.innerHTML=`
      <div class="app-logo-section">
        <div class="logo-container" id="logo-container"></div>
        <h2 class="app-title">Room Builder</h2>
        <p class="app-subtitle">3D Room Planner</p>
      </div>
    `;const t=document.getElementById("logo-container");this.cubeLogo=new hT(t)}setupMyRooms(){const e=document.getElementById("my-rooms");e.innerHTML=`
      <div class="my-rooms-section">
        <h3>My Rooms</h3>
        <div class="rooms-list" id="rooms-list">
          <p class="no-rooms-message">No saved rooms yet</p>
        </div>
        <div class="room-actions">
          <button id="save-current-room" class="btn-secondary" disabled>Save Current Room</button>
        </div>
      </div>
    `,document.getElementById("save-current-room")?.addEventListener("click",()=>{this.saveCurrentRoom()}),this.loadSavedRooms(),this.syncPublishedRooms()}setupRoomManagement(){const e=document.getElementById("room-management");e.innerHTML=`
      <div class="room-management-section">
        <h3>Room Management</h3>
        <div class="room-actions">
          <button id="clear-room-btn" class="btn-warning" disabled>Clear Room</button>
          <button id="delete-room-btn" class="btn-danger" disabled>Delete Room</button>
        </div>
      </div>
    `,document.getElementById("clear-room-btn")?.addEventListener("click",()=>{this.clearCurrentRoom()}),document.getElementById("delete-room-btn")?.addEventListener("click",()=>{this.deleteCurrentRoom()})}setupRoomInput(){const e=document.getElementById("room-setup");e.innerHTML=`
      <div class="form-section">
        <h3>Room Dimensions</h3>
        <div class="input-group">
          <label for="width">Width:</label>
          <div class="dimension-input">
            <input type="number" id="width-ft" min="1" max="50" step="1" placeholder="12" value="12">
            <span>ft</span>
            <input type="number" id="width-in" min="0" max="11" step="1" placeholder="0" value="0">
            <span>in</span>
          </div>
        </div>
        <div class="input-group">
          <label for="length">Length:</label>
          <div class="dimension-input">
            <input type="number" id="length-ft" min="1" max="50" step="1" placeholder="15" value="15">
            <span>ft</span>
            <input type="number" id="length-in" min="0" max="11" step="1" placeholder="0" value="0">
            <span>in</span>
          </div>
        </div>
        <div class="input-group">
          <label for="height">Height:</label>
          <div class="dimension-input">
            <input type="number" id="height-ft" min="6" max="20" step="1" placeholder="9" value="9">
            <span>ft</span>
            <input type="number" id="height-in" min="0" max="11" step="1" placeholder="0" value="0">
            <span>in</span>
          </div>
        </div>
        <button id="create-room" class="btn-primary">Create Room</button>
      </div>
    `,document.getElementById("create-room")?.addEventListener("click",()=>{this.handleCreateRoom()})}setupFurnitureSearch(){const e=document.getElementById("furniture-search");e.innerHTML=`
      <div class="search-section">
        <h3>Find Furniture</h3>
        <div class="search-input-group">
          <input type="text" id="furniture-search-input" placeholder="Search for furniture (e.g., 'sofa', 'dining table')" disabled>
          <button id="search-furniture-btn" class="btn-secondary" disabled>
            <i class="icon-search"></i> Search
          </button>
        </div>
        <div class="search-results" id="search-results" style="display: none;">
          <div class="search-results-header">
            <h4>Search Results</h4>
            <button id="clear-search" class="btn-small btn-secondary">Clear</button>
          </div>
          <div class="search-results-list" id="search-results-list">
            <!-- Results will be populated here -->
          </div>
        </div>
        <div class="search-info" id="search-info" style="display: none;">
          <p class="search-match-info"></p>
        </div>
      </div>
    `,document.getElementById("search-furniture-btn")?.addEventListener("click",()=>{this.searchFurniture()}),document.getElementById("furniture-search-input")?.addEventListener("keypress",t=>{t.key==="Enter"&&this.searchFurniture()}),document.getElementById("clear-search")?.addEventListener("click",()=>{this.clearSearch()})}setupFurniturePalette(){const e=document.getElementById("furniture-palette"),t=this.furnitureManager.getTemplates();e.innerHTML=`
      <div class="palette-section">
        <h3>Furniture Library</h3>
        <div class="category-tabs">
          <button class="tab-btn active" data-category="all">All</button>
          <button class="tab-btn" data-category="bedroom">Bedroom</button>
          <button class="tab-btn" data-category="seating">Seating</button>
          <button class="tab-btn" data-category="storage">Storage</button>
          <button class="tab-btn" data-category="lighting">Lighting</button>
          <button class="tab-btn" data-category="functional">Functional</button>
        </div>
        <div class="furniture-grid">
          ${t.map(n=>`
            <div class="furniture-item" data-template='${JSON.stringify(n)}'>
              <div class="furniture-preview" style="background-color: #${n.color.toString(16).padStart(6,"0")}"></div>
              <div class="furniture-info">
                <span class="furniture-name">${n.name}</span>
                <span class="furniture-price">$${n.price}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `,this.setupFurnitureEventListeners()}setupFurnitureEventListeners(){document.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",t=>{const n=t.target.dataset.category;this.filterFurnitureByCategory(n),document.querySelectorAll(".tab-btn").forEach(s=>s.classList.remove("active")),t.target.classList.add("active")})}),document.querySelectorAll(".furniture-item").forEach(e=>{e.addEventListener("click",t=>{const n=JSON.parse(t.currentTarget.dataset.template);this.addFurnitureToRoom(n)})})}filterFurnitureByCategory(e){document.querySelectorAll(".furniture-item").forEach(n=>{const s=JSON.parse(n.dataset.template),r=e==="all"||s.category===e;n.style.display=r?"block":"none"})}setupBudgetTracker(){const e=document.getElementById("budget-tracker");e.innerHTML=`
      <div class="budget-section">
        <h3>Budget Tracker</h3>
        <div class="budget-input">
          <label for="budget">Budget:</label>
          <input type="number" id="budget" value="${this.state.budget}" min="0">
        </div>
        <div class="budget-info">
          <div class="budget-item">
            <span>Furniture Cost:</span>
            <span id="furniture-cost">$0</span>
          </div>
          <div class="budget-item">
            <span>Remaining:</span>
            <span id="remaining-budget">$${this.state.budget}</span>
          </div>
        </div>
      </div>
    `;const t=document.getElementById("budget");t.addEventListener("input",()=>{this.state.budget=parseFloat(t.value)||0,this.updateBudgetDisplay()})}setupEventListeners(){document.getElementById("get-suggestions")?.addEventListener("click",()=>{this.getAISuggestions()}),document.getElementById("edit-mode")?.addEventListener("click",()=>{this.toggleEditMode()}),document.getElementById("view-mode")?.addEventListener("click",()=>{this.toggleViewMode()}),document.getElementById("delete-selected")?.addEventListener("click",()=>{this.deleteSelectedFurniture()}),document.getElementById("reset-view")?.addEventListener("click",()=>{this.resetCameraView()}),document.getElementById("publish-design")?.addEventListener("click",()=>{this.publishDesign()}),document.getElementById("browse-designs")?.addEventListener("click",()=>{this.toggleGallery()}),this.setupManipulationEventListeners()}setupManipulationEventListeners(){document.querySelectorAll(".btn-manipulation").forEach(t=>{t.addEventListener("click",n=>{const r=n.target.dataset.mode;this.setManipulationMode(r)})}),document.getElementById("apply-position")?.addEventListener("click",()=>{this.applyPosition()}),document.getElementById("rotate-left")?.addEventListener("click",()=>{this.rotateSelectedFurniture("counterclockwise")}),document.getElementById("rotate-right")?.addEventListener("click",()=>{this.rotateSelectedFurniture("clockwise")}),document.getElementById("snap-to-grid")?.addEventListener("change",t=>{const n=t.target;this.room3D&&this.room3D.setSnapToGrid(n.checked)});const e=document.getElementById("3d-viewport");e&&(e.addEventListener("furnitureSelected",t=>{this.onFurnitureSelected(t.detail)}),e.addEventListener("furnitureDeselected",t=>{this.onFurnitureDeselected(t.detail)}),e.addEventListener("furnitureDragged",t=>{this.onFurnitureDragged(t.detail)}),e.addEventListener("furnitureDeleted",t=>{this.onFurnitureDeleted(t.detail)}))}handleCreateRoom(){if(!this.authService.isAuthenticated()){this.loginModal.show(()=>{this.proceedWithCreateRoom()});return}this.proceedWithCreateRoom()}proceedWithCreateRoom(){const e=parseInt(document.getElementById("width-ft").value)||0,t=parseInt(document.getElementById("width-in").value)||0,n=parseInt(document.getElementById("length-ft").value)||0,s=parseInt(document.getElementById("length-in").value)||0,r=parseInt(document.getElementById("height-ft").value)||0,a=parseInt(document.getElementById("height-in").value)||0,c=e+t/12,u=n+s/12,h=r+a/12;if(c<=0||u<=0||h<=0){alert("All dimensions must be greater than 0");return}if(c<6||u<6||h<6){alert("Room dimensions must be at least 6 feet in all directions");return}const f={width:c,length:u,height:h};this.state.roomDimensions=f;try{const p=document.getElementById("3d-viewport");if(!p)throw new Error("3D viewport element not found");this.room3D=new ts(p,this),this.room3D.createRoom(f);const v=document.getElementById("room-setup"),R=document.getElementById("furniture-palette");v&&(v.style.display="none"),R&&(R.style.display="block"),this.updateRoomManagementButtons(),this.updateAllButtonStates()}catch(p){console.error("Error creating room:",p),alert("Error creating room. Please check the console for details.")}}addFurnitureToRoom(e){if(!this.authService.isAuthenticated()){this.loginModal.show(()=>{this.proceedWithAddFurniture(e)});return}this.proceedWithAddFurniture(e)}proceedWithAddFurniture(e){if(!this.state.roomDimensions){alert("Please create a room first");return}this.showNotification("Loading furniture...","info");const t={x:0,y:e.dimensions.height/2,z:0,rotation:0},n=this.furnitureManager.addFurniture(e,t);this.room3D&&this.room3D.addFurniture(n),this.state.furniture.push(n),this.updateBudgetDisplay(),this.updateRoomManagementButtons(),this.updateAllButtonStates(),this.showNotification(`Added "${n.name}" to your room!`,"success")}updateBudgetDisplay(){const e=this.furnitureManager.getTotalCost(),t=this.state.budget-e;document.getElementById("furniture-cost").textContent=`$${e}`,document.getElementById("remaining-budget").textContent=`$${t}`;const n=document.getElementById("remaining-budget");t<0?n.style.color="red":t<this.state.budget*.2?n.style.color="orange":n.style.color="green"}async getAISuggestions(){if(!this.authService.isAuthenticated()){this.loginModal.show(()=>{this.proceedWithAISuggestions()});return}this.proceedWithAISuggestions()}async proceedWithAISuggestions(){if(!this.state.roomDimensions){alert("Please create a room first");return}const e=document.getElementById("suggestions");e.innerHTML=`
      <div class="suggestions-section">
        <h3>AI Suggestions</h3>
        <div class="loading-state">
          <div class="loading-spinner"></div>
          <p>Generating suggestions...</p>
        </div>
      </div>
    `;const t=document.getElementById("get-suggestions"),n=t.textContent;t.textContent="Generating...",t.disabled=!0;try{if(!await this.decorationAI.testConnection())throw new Error("Cannot connect to Gemini API. Please check your API key.");const r=await this.decorationAI.getDecorationSuggestions(this.state.roomDimensions,this.state.furniture,this.state.roomType,this.state.budget);this.displaySuggestions(r)}catch(s){console.error("Error getting AI suggestions:",s),this.showNotification("AI suggestions unavailable. Please check your API key and try again.","error"),e.innerHTML=`
        <div class="suggestions-section">
          <h3>AI Suggestions</h3>
          <div class="suggestion-error">
            <p>Unable to get AI suggestions. Please ensure your Gemini API key is configured correctly.</p>
            <p>Check the console for more details.</p>
          </div>
        </div>
      `}finally{t.textContent=n,t.disabled=!1}}displaySuggestions(e){const t=document.getElementById("suggestions");t.innerHTML=`
      <div class="suggestions-section">
        <h3>AI Suggestions</h3>
        <div class="suggestions-list">
          ${e.map((n,s)=>`
            <div class="suggestion-item" data-suggestion-index="${s}">
              <div class="suggestion-header">
                <span class="suggestion-name">${n.item}</span>
                <span class="suggestion-cost">$${n.estimatedCost}</span>
              </div>
              <p class="suggestion-description">${n.description}</p>
              <div class="suggestion-meta">
                <span class="suggestion-category">${n.category}</span>
                <span class="suggestion-priority priority-${n.priority}">${n.priority}</span>
              </div>
              <div class="suggestion-actions">
                <button class="btn-small btn-primary add-suggestion-btn" data-suggestion-index="${s}">
                  Add to Room
                </button>
                <button class="btn-small btn-secondary view-details-btn" data-suggestion-index="${s}">
                  View Details
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `,this.setupSuggestionEventListeners(e)}setupSuggestionEventListeners(e){document.querySelectorAll(".add-suggestion-btn").forEach(t=>{t.addEventListener("click",async n=>{const s=parseInt(n.target.dataset.suggestionIndex),r=e[s];await this.addSuggestionToRoom(r)})}),document.querySelectorAll(".view-details-btn").forEach(t=>{t.addEventListener("click",n=>{const s=parseInt(n.target.dataset.suggestionIndex),r=e[s];this.showSuggestionDetails(r)})})}async addSuggestionToRoom(e){try{if(!this.authService.isAuthenticated()){this.loginModal.show(()=>{this.addSuggestionToRoom(e)});return}this.showNotification("Loading furniture...","info");const t=await this.decorationAI.createFurnitureFromSuggestion(e),n={x:0,y:t.dimensions.height/2,z:0,rotation:0},s=this.furnitureManager.addFurniture(t,n);this.room3D&&this.room3D.addFurniture(s),this.state.furniture.push(s),this.updateBudgetDisplay(),this.updateRoomManagementButtons(),this.updateAllButtonStates(),this.showNotification(`Added "${s.name}" to your room!`,"success")}catch(t){console.error("Error adding suggestion to room:",t),this.showNotification("Error adding suggestion to room","error")}}showSuggestionDetails(e){const t=document.createElement("div");t.className="suggestion-modal",t.innerHTML=`
      <div class="modal-content">
        <div class="modal-header">
          <h3>${e.item}</h3>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <p><strong>Description:</strong> ${e.description}</p>
          <p><strong>Category:</strong> ${e.category}</p>
          <p><strong>Priority:</strong> ${e.priority}</p>
          <p><strong>Estimated Cost:</strong> $${e.estimatedCost}</p>
          ${e.dimensions?`
            <p><strong>Dimensions:</strong> ${e.dimensions.width}ft × ${e.dimensions.height}ft × ${e.dimensions.depth}ft</p>
          `:""}
          ${e.brand?`
            <p><strong>Brand:</strong> ${e.brand}</p>
          `:""}
          ${e.reasoning?`
            <p><strong>Why this fits:</strong> ${e.reasoning}</p>
          `:""}
          ${e.productUrl?`
            <p><strong>Product Link:</strong> <a href="${e.productUrl}" target="_blank" rel="noopener noreferrer">View Product →</a></p>
          `:""}
        </div>
        <div class="modal-footer">
          <button class="btn-primary add-suggestion-btn">Add to Room</button>
          <button class="btn-secondary close-modal">Close</button>
        </div>
      </div>
    `,document.body.appendChild(t),t.querySelector(".close-modal")?.addEventListener("click",()=>{document.body.removeChild(t)}),t.querySelector(".add-suggestion-btn")?.addEventListener("click",async()=>{await this.addSuggestionToRoom(e),document.body.removeChild(t)}),t.addEventListener("click",n=>{n.target===t&&document.body.removeChild(t)})}showNotification(e,t){const n=document.createElement("div");n.className=`notification notification-${t}`,n.textContent=e,document.body.appendChild(n),setTimeout(()=>{document.body.contains(n)&&document.body.removeChild(n)},3e3)}toggleEditMode(){if(!this.authService.isAuthenticated()){this.loginModal.show(()=>{this.proceedWithToggleEditMode()});return}this.proceedWithToggleEditMode()}toggleViewMode(){if(!this.authService.isAuthenticated()){this.loginModal.show(()=>{this.proceedWithToggleViewMode()});return}this.proceedWithToggleViewMode()}proceedWithToggleEditMode(){this.state.isEditing=!this.state.isEditing;const e=document.getElementById("edit-mode"),t=document.getElementById("delete-selected"),n=document.getElementById("manipulation-controls");if(this.state.isEditing){e.textContent="Exit Edit",e.classList.add("active"),t.disabled=!1,n&&(n.style.display="block");const s=document.getElementById("drag-instructions");s&&s.classList.remove("hidden");const r=document.getElementById("selection-instructions");r&&r.classList.remove("hidden");const a=document.getElementById("3d-viewport");a&&a.classList.add("drag-mode"),this.setManipulationMode("move")}else{e.textContent="Edit Mode",e.classList.remove("active"),t.disabled=!0,this.state.selectedFurniture=null,n&&(n.style.display="none");const s=document.getElementById("drag-instructions");s&&s.classList.add("hidden");const r=document.getElementById("selection-instructions");r&&r.classList.add("hidden");const a=document.getElementById("3d-viewport");a&&a.classList.remove("drag-mode","dragging"),this.room3D&&this.room3D.setManipulationMode("none")}}proceedWithToggleViewMode(){this.state.isViewing=!this.state.isViewing;const e=document.getElementById("view-mode");if(this.state.isViewing){e.textContent="Exit View",e.classList.add("active"),this.room3D&&this.room3D.setManipulationMode("view");const t=document.getElementById("view-instructions");t&&t.classList.remove("hidden")}else{e.textContent="View Mode",e.classList.remove("active"),this.state.selectedFurniture=null;const t=document.getElementById("view-instructions");t&&t.classList.add("hidden"),this.room3D&&this.room3D.setManipulationMode("none")}}deleteSelectedFurniture(){if(!this.authService.isAuthenticated()){this.loginModal.show(()=>{this.proceedWithDeleteSelectedFurniture()});return}this.proceedWithDeleteSelectedFurniture()}proceedWithDeleteSelectedFurniture(){if(!this.state.selectedFurniture){alert("Please select a furniture item first");return}confirm(`Are you sure you want to delete "${this.state.selectedFurniture.name}"?`)&&(this.furnitureManager.removeFurniture(this.state.selectedFurniture.id),this.room3D&&this.room3D.removeFurniture(this.state.selectedFurniture.id),this.state.furniture=this.state.furniture.filter(e=>e.id!==this.state.selectedFurniture.id),this.state.selectedFurniture=null,this.updateBudgetDisplay(),this.updateRoomManagementButtons(),this.updateAllButtonStates())}resetCameraView(){if(!this.authService.isAuthenticated()){this.loginModal.show(()=>{this.proceedWithResetCameraView()});return}this.proceedWithResetCameraView()}proceedWithResetCameraView(){if(!this.state.roomDimensions||!this.room3D){alert("Please create a room first");return}this.room3D.resetView()}publishDesign(){if(!this.state.roomDimensions||this.state.furniture.length===0){alert("Please create a room and add some furniture before publishing.");return}this.proceedWithPublishing()}proceedWithPublishing(){if(!this.state.roomDimensions){alert("Room dimensions are required for publishing.");return}let e="";if(this.room3D)try{e=this.room3D.captureThumbnail()}catch(n){console.error("Error capturing thumbnail:",n)}const t={roomDimensions:this.state.roomDimensions,furniture:this.state.furniture,budget:this.state.budget,roomType:this.state.roomType,thumbnail:e};this.publishDialog.show(t,()=>{this.state.isPublished=!0,this.updateRoomManagementButtons(),this.saveCurrentRoomToLocal(),this.showGallery()})}toggleGallery(){if(!this.authService.isAuthenticated()){this.loginModal.show(()=>{this.proceedWithToggleGallery()});return}this.proceedWithToggleGallery()}proceedWithToggleGallery(){this.currentView==="builder"?this.showGallery():this.showBuilder()}showGallery(){this.currentView="gallery";const e=document.querySelector(".main-content");e.innerHTML='<div id="gallery-container"></div>';const t=document.getElementById("gallery-container");this.designGallery=new aT(t,this.authService),this.designGallery.initialize(),t.addEventListener("designSelected",s=>{const r=s.detail.design;this.loadDesignFromGallery(r)}),this.container.addEventListener("viewPublishedDesign",async s=>{const r=s.detail.designId;try{const{FirestoreService:a}=await Kc(async()=>{const{FirestoreService:h}=await Promise.resolve().then(()=>Lu);return{FirestoreService:h}},void 0),c=new a,u=await c.getDesign(r);u&&(await c.incrementViews(r),this.loadDesignFromGallery(u))}catch(a){console.error("Error viewing published design:",a),this.showNotification("Error loading your published design","error")}}),t.addEventListener("navigateToBuilder",s=>{const r=s.detail.action;r==="createNewRoom"?(this.showBuilder(),this.resetToInitialState()):r==="backToBuilder"&&this.showBuilder()});const n=document.getElementById("browse-designs");n.textContent="Back to Builder"}showBuilder(){this.currentView="builder";const e=document.querySelector(".main-content");if(e.innerHTML=`
      <div id="3d-viewport"></div>
      <div class="drag-instructions hidden" id="drag-instructions">
        <strong>Drag Mode:</strong> Click and drag furniture to move them around the room
      </div>
      <div class="selection-instructions hidden" id="selection-instructions">
        <strong>Selection Mode:</strong> Click furniture to select, then use colored handles to move along specific axes
        <br><span class="handle-x">Red = X-axis</span> | <span class="handle-y">Green = Y-axis</span> | <span class="handle-z">Blue = Z-axis</span>
        <br><strong>Rotation:</strong> <span class="handle-x">Red sphere = X-rotation</span> | <span class="handle-y">Green sphere = Y-rotation</span> | <span class="handle-z">Blue sphere = Z-rotation</span>
      </div>
      <div class="view-instructions hidden" id="view-instructions">
        <strong>View Mode:</strong> Click on any furniture to view its details and specifications
      </div>
      <div class="controls">
        <button id="get-suggestions" class="btn-secondary">Get AI Suggestions</button>
        <button id="edit-mode" class="btn-secondary" disabled>Edit Mode</button>
        <button id="view-mode" class="btn-secondary" disabled>View Mode</button>
        <button id="delete-selected" class="btn-secondary" disabled>Delete Selected</button>
        <button id="reset-view" class="btn-secondary">Reset View</button>
        <button id="publish-design" class="btn-primary">Publish Design</button>
        <button id="browse-designs" class="btn-secondary">
          <i class="icon-community"></i> Browse Community
        </button>
      </div>
      <div class="manipulation-controls" id="manipulation-controls" style="display: none;">
        <div class="manipulation-mode-buttons">
          <button id="manipulation-mode-move" class="btn-manipulation active" data-mode="move">
            <i class="icon-move"></i> Move
          </button>
          <button id="manipulation-mode-rotate" class="btn-manipulation" data-mode="rotate">
            <i class="icon-rotate"></i> Rotate
          </button>
          <button id="manipulation-mode-delete" class="btn-manipulation" data-mode="delete">
            <i class="icon-delete"></i> Delete
          </button>
        </div>
        <div class="manipulation-actions" id="manipulation-actions" style="display: none;">
          <div class="position-controls">
            <label>Position:</label>
            <div class="position-inputs">
              <input type="number" id="position-x" placeholder="X" step="0.1">
              <input type="number" id="position-y" placeholder="Y" step="0.1">
              <input type="number" id="position-z" placeholder="Z" step="0.1">
              <button id="apply-position" class="btn-small">Apply</button>
            </div>
          </div>
          <div class="rotation-controls">
            <label>Rotation:</label>
            <div class="rotation-buttons">
              <button id="rotate-left" class="btn-small">↺ 45°</button>
              <button id="rotate-right" class="btn-small">↻ 45°</button>
            </div>
          </div>
          <div class="drag-settings">
            <label>Drag Settings:</label>
            <div class="drag-options">
              <label class="checkbox-label">
                <input type="checkbox" id="snap-to-grid" checked>
                <span>Snap to Grid (0.5 units)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="instructions">
        <p><strong>3D Controls:</strong> Mouse to rotate, scroll to zoom, right-click + drag to pan</p>
        <p><strong>Furniture:</strong> Click items in the sidebar to add them to your room</p>
      </div>
    `,this.setupEventListeners(),this.setupRoomManagement(),this.updateRoomManagementButtons(),this.state.roomDimensions)try{const n=document.getElementById("3d-viewport");this.room3D=new ts(n,this),this.room3D.createRoom(this.state.roomDimensions),this.state.furniture.forEach(s=>{this.room3D&&this.room3D.addFurniture(s)})}catch(n){console.error("Error re-initializing 3D viewport:",n)}const t=document.getElementById("browse-designs");t.textContent="Browse Community",this.updateAllButtonStates()}loadDesignFromGallery(e){this.showBuilder(),this.state.roomDimensions=e.roomDimensions,this.state.furniture=e.furniture,this.state.budget=e.budget,this.state.roomType=e.roomType,this.state.isPublished=!1;const t=e.title||`Community Design ${new Date().toLocaleDateString()}`;if(this.saveRoomWithName(t),this.updateBudgetDisplay(),this.state.roomDimensions)try{const n=document.getElementById("3d-viewport");n.style.width="100%",n.style.height="calc(100vh - 70px)",setTimeout(()=>{this.room3D=new ts(n,this),this.state.roomDimensions&&this.room3D.createRoom(this.state.roomDimensions),this.state.furniture.forEach(s=>{this.room3D&&this.room3D.addFurniture(s)}),this.updateRoomManagementButtons(),this.updateAllButtonStates()},100)}catch(n){console.error("Error loading design into 3D viewport:",n),alert("Error loading design. Please try again.")}}setupUserProfile(){const e=document.getElementById("user-profile");this.userProfile=new lT(e,this.authService),this.userProfile.render(),e.addEventListener("requestLogin",()=>{this.loginModal.show(()=>{this.userProfile.refresh()})})}setupAuthStateListener(){this.authService.onAuthStateChange(()=>{this.userProfile&&this.userProfile.refresh(),this.updateAllButtonStates()})}updatePublishButtonState(){const e=document.getElementById("publish-design");e&&(e.textContent="Publish Design",e.title="Publish your design to the community",e.disabled=!1)}saveCurrentRoom(){if(!this.state.roomDimensions||this.state.furniture.length===0){alert("Please create a room and add some furniture before saving.");return}const e=prompt("Enter a name for this room:");e&&this.saveRoomWithName(e)}saveCurrentRoomToLocal(){if(!this.state.roomDimensions||this.state.furniture.length===0)return;const e=`My Design ${new Date().toLocaleDateString()}`;this.saveRoomWithName(e)}saveRoomWithName(e){const t={id:Date.now().toString(),name:e,roomDimensions:this.state.roomDimensions,furniture:this.state.furniture,budget:this.state.budget,roomType:this.state.roomType,savedAt:new Date().toISOString(),isPublished:this.state.isPublished},n=this.getSavedRooms();n.push(t),localStorage.setItem("savedRooms",JSON.stringify(n)),this.loadSavedRooms(),this.updateSaveButtonState(),this.state.isPublished||this.showNotification(`Room "${e}" saved successfully!`,"success")}loadSavedRooms(){const e=this.getSavedRooms(),t=document.getElementById("rooms-list");if(t){if(e.length===0){t.innerHTML='<p class="no-rooms-message">No saved rooms yet</p>';return}t.innerHTML=e.map(n=>`
      <div class="saved-room-item" data-room-id="${n.id}">
        <div class="room-info">
          <h4>${n.name} ${n.isPublished?'<span class="published-badge">Published</span>':""}</h4>
          <p class="room-details">
            ${n.roomDimensions.width}ft × ${n.roomDimensions.length}ft × ${n.roomDimensions.height}ft
            <br>${n.furniture.length} furniture items
            <br>Saved: ${new Date(n.savedAt).toLocaleDateString()}
          </p>
        </div>
        <div class="room-actions">
          <button class="btn-small btn-primary load-room-btn" data-room-id="${n.id}">Load</button>
          <button class="btn-small btn-danger delete-room-btn" data-room-id="${n.id}">Delete</button>
        </div>
      </div>
    `).join(""),t.querySelectorAll(".load-room-btn").forEach(n=>{n.addEventListener("click",s=>{const r=s.target.dataset.roomId;this.loadSavedRoom(r)})}),t.querySelectorAll(".delete-room-btn").forEach(n=>{n.addEventListener("click",s=>{const r=s.target.dataset.roomId;this.deleteSavedRoom(r)})})}}getSavedRooms(){try{const e=localStorage.getItem("savedRooms");return e?JSON.parse(e):[]}catch(e){return console.error("Error loading saved rooms:",e),[]}}loadSavedRoom(e){const n=this.getSavedRooms().find(s=>s.id===e);if(!n){alert("Room not found");return}if(this.state.roomDimensions=n.roomDimensions,this.state.furniture=n.furniture,this.state.budget=n.budget,this.state.roomType=n.roomType,this.state.isPublished=!1,this.updateBudgetDisplay(),this.state.roomDimensions)try{const s=document.getElementById("3d-viewport");s.style.width="100%",s.style.height="calc(100vh - 70px)",setTimeout(()=>{this.room3D=new ts(s,this),this.state.roomDimensions&&this.room3D.createRoom(this.state.roomDimensions),this.state.furniture.forEach(r=>{this.room3D&&this.room3D.addFurniture(r)}),this.updateRoomManagementButtons(),this.updateAllButtonStates(),this.updateSaveButtonState()},100),this.showNotification(`Room "${n.name}" loaded successfully!`,"success")}catch(s){console.error("Error loading room:",s),alert("Error loading room. Please try again.")}}deleteSavedRoom(e){const t=this.getSavedRooms(),n=t.find(s=>s.id===e);if(!n){alert("Room not found");return}if(confirm(`Are you sure you want to delete "${n.name}"?`)){const s=t.filter(r=>r.id!==e);localStorage.setItem("savedRooms",JSON.stringify(s)),this.loadSavedRooms(),this.showNotification(`Room "${n.name}" deleted`,"success")}}updateSaveButtonState(){const e=document.getElementById("save-current-room");if(e){const t=this.state.roomDimensions!==null,n=this.state.furniture.length>0,s=t&&n;e.disabled=!s,e.title=s?"Save current room to your collection":"Create a room and add furniture first"}}async syncPublishedRooms(){if(this.authService.isAuthenticated())try{const{FirestoreService:e}=await Kc(async()=>{const{FirestoreService:u}=await Promise.resolve().then(()=>Lu);return{FirestoreService:u}},void 0),t=new e,n=this.authService.getCurrentUser();if(!n)return;const s=await t.getUserDesigns(n.uid,!0);if(s.length===0)return;const r=this.getSavedRooms(),a=new Set(r.map(u=>u.firestoreId));let c=0;for(const u of s)if(!a.has(u.id)){const h=u.createdAt?u.createdAt.toDate?u.createdAt.toDate():new Date(u.createdAt):new Date,f={id:`firestore_${u.id}`,firestoreId:u.id,name:u.title||`Published Room ${h.toLocaleDateString()}`,roomDimensions:u.roomDimensions,furniture:u.furniture,budget:u.budget,roomType:u.roomType,savedAt:h.toISOString(),isPublished:!0};r.push(f),c++}c>0&&(localStorage.setItem("savedRooms",JSON.stringify(r)),this.loadSavedRooms())}catch(e){console.error("Error syncing published rooms:",e)}}updateAllButtonStates(){const e=this.authService.isAuthenticated();this.updatePublishButtonState();const t=document.getElementById("create-room");t&&(t.textContent="Create Room",t.title="Create a new room",t.disabled=!1);const n=document.getElementById("get-suggestions");n&&(n.textContent="Get AI Suggestions",n.title="Get AI-powered decoration suggestions",n.disabled=!1);const s=document.getElementById("browse-designs");s&&(s.textContent="Browse Community",s.title="Browse community designs",s.disabled=!1);const r=document.getElementById("edit-mode");if(r){const h=this.state.roomDimensions!==null,f=this.state.furniture.length>0,p=e&&h&&f;r.disabled=!p,r.title=p?"Edit furniture in your room":"Create a room and add furniture first",p||(r.textContent="Edit Mode",r.classList.remove("active"))}const a=document.getElementById("view-mode");if(a){const h=this.state.roomDimensions!==null,f=this.state.furniture.length>0,p=e&&h&&f;a.disabled=!p,a.title=p?"View furniture details":"Create a room and add furniture first",p||(a.textContent="View Mode",a.classList.remove("active"))}const c=document.getElementById("clear-room-btn"),u=document.getElementById("delete-room-btn");c&&(c.textContent="Clear Room",c.title="Remove all furniture from the room",c.disabled=!e||!this.state.roomDimensions||this.state.furniture.length===0),u&&(u.textContent="Delete Room",u.title="Delete the current room and start over",u.disabled=!e),this.updateSearchButtonStates(),this.updateSaveButtonState()}updateSearchButtonStates(){const e=this.authService.isAuthenticated(),t=this.state.roomDimensions!==null,n=document.getElementById("furniture-search-input"),s=document.getElementById("search-furniture-btn");if(n&&s){const r=e&&t;n.disabled=!r,s.disabled=!r,r?n.placeholder="Search for furniture (e.g., 'sofa', 'dining table')":n.placeholder=t?"Please sign in to search":"Create a room first to search"}}searchFurniture(){const t=document.getElementById("furniture-search-input").value.trim().toLowerCase();if(!t){this.showNotification("Please enter a search term","error");return}if(!this.state.roomDimensions){this.showNotification("Please create a room first","error");return}const s=this.furnitureManager.getTemplates().filter(a=>{const c=a.name.toLowerCase(),u=a.type.toLowerCase(),h=a.category.toLowerCase(),f=a.description.toLowerCase();return c.includes(t)||u.includes(t)||h.includes(t)||f.includes(t)});if(s.length===0){this.showSearchResults([],"No furniture found matching your search.");return}const r=this.sortByRoomCompatibility(s);this.showSearchResults(r,`Found ${r.length} furniture items matching "${t}"`)}sortByRoomCompatibility(e){if(!this.state.roomDimensions)return e;const t=this.state.roomDimensions.width*this.state.roomDimensions.length;return e.sort((n,s)=>{const r=n.dimensions.width*n.dimensions.depth,a=s.dimensions.width*s.dimensions.depth,c=Math.abs(r-t*.1),u=Math.abs(a-t*.1);return c-u})}showSearchResults(e,t){const n=document.getElementById("search-results"),s=document.getElementById("search-results-list"),r=document.getElementById("search-info"),a=document.querySelector(".search-match-info");if(!(!n||!s||!r||!a)){if(n.style.display="block",r.style.display="block",a.textContent=t,e.length===0){s.innerHTML='<p class="no-results">No furniture found matching your search criteria.</p>';return}s.innerHTML=e.map(c=>{const u=this.calculateCompatibility(c),h=u>.8?"excellent":u>.6?"good":u>.4?"fair":"poor";return`
        <div class="search-result-item" data-template='${JSON.stringify(c)}'>
          <div class="result-preview" style="background-color: #${c.color.toString(16).padStart(6,"0")}"></div>
          <div class="result-info">
            <h5>${c.name}</h5>
            <p class="result-details">
              ${c.dimensions.width}ft × ${c.dimensions.height}ft × ${c.dimensions.depth}ft
              <br>$${c.price} • ${c.category}
            </p>
            <div class="compatibility-score">
              <span class="compatibility-label">Room Fit:</span>
              <span class="compatibility-value ${h}">
                ${Math.round(u*100)}%
              </span>
            </div>
          </div>
          <div class="result-actions">
            <button class="btn-small btn-primary add-from-search" data-template='${JSON.stringify(c)}'>
              Add to Room
            </button>
          </div>
        </div>
      `}).join(""),s.querySelectorAll(".add-from-search").forEach(c=>{c.addEventListener("click",u=>{const h=JSON.parse(u.target.dataset.template);this.addFurnitureToRoom(h),this.showNotification(`Added "${h.name}" to your room!`,"success")})})}}calculateCompatibility(e){if(!this.state.roomDimensions)return 0;const t=this.state.roomDimensions.width*this.state.roomDimensions.length,n=t*this.state.roomDimensions.height,s=e.dimensions.width*e.dimensions.depth,r=s*e.dimensions.height,a=Math.min(s/(t*.1),1),c=Math.min(r/(n*.05),1);return a*.7+c*.3}clearSearch(){const e=document.getElementById("furniture-search-input"),t=document.getElementById("search-results"),n=document.getElementById("search-info");e&&(e.value=""),t&&(t.style.display="none"),n&&(n.style.display="none")}deleteCurrentRoom(){if(!this.authService.isAuthenticated()){this.loginModal.show(()=>{this.proceedWithDeleteRoom()});return}this.proceedWithDeleteRoom()}proceedWithDeleteRoom(){if(!this.state.roomDimensions){this.resetToInitialState();return}confirm("Are you sure you want to delete the current room? This will remove all furniture and reset the design.")&&this.resetToInitialState()}resetToInitialState(){this.state={roomDimensions:null,furniture:[],selectedFurniture:null,isEditing:!1,isViewing:!1,budget:1e3,roomType:"living",isPublished:!1},this.safelyClearViewport();const e=document.getElementById("room-setup"),t=document.getElementById("furniture-palette");e&&(e.style.display="block"),t&&(t.style.display="none"),this.updateBudgetDisplay(),this.updateRoomManagementButtons(),this.updateAllButtonStates()}clearCurrentRoom(){if(!this.authService.isAuthenticated()){this.loginModal.show(()=>{this.proceedWithClearRoom()});return}this.proceedWithClearRoom()}proceedWithClearRoom(){if(!this.state.roomDimensions){alert("No room to clear");return}confirm("Are you sure you want to clear all furniture from the current room? The room will remain but all furniture will be removed.")&&(this.room3D&&this.room3D.clearAllFurniture(),this.state.furniture=[],this.furnitureManager=new Xc,this.updateBudgetDisplay(),this.updateRoomManagementButtons(),this.updateAllButtonStates())}updateRoomManagementButtons(){const e=document.getElementById("delete-room-btn"),t=document.getElementById("clear-room-btn");if(e&&(e.disabled=!1),t){const n=this.state.isPublished||!this.state.roomDimensions||this.state.furniture.length===0;t.disabled=n,this.state.isPublished?(t.textContent="Room Published",t.title="Cannot clear room after publishing",t.classList.add("published-disabled")):(t.textContent="Clear Room",t.title="Remove all furniture from the room",t.classList.remove("published-disabled"))}this.updateAllButtonStates()}safelyClearViewport(){try{const e=document.getElementById("3d-viewport");if(!e)return;e.innerHTML="",this.room3D=null}catch(e){console.error("Error clearing viewport:",e);const t=document.getElementById("3d-viewport");t&&(t.innerHTML="")}}setManipulationMode(e){this.room3D&&(this.room3D.setManipulationMode(e),this.updateManipulationUI(e))}updateManipulationUI(e){document.querySelectorAll(".btn-manipulation").forEach(s=>{s.classList.remove("active")}),document.querySelector(`[data-mode="${e}"]`)?.classList.add("active");const t=document.getElementById("manipulation-controls"),n=document.getElementById("manipulation-actions");t&&(t.style.display="block"),n&&(n.style.display=e==="move"||e==="rotate"?"block":"none")}onFurnitureSelected(e){this.state.selectedFurniture=this.state.furniture.find(t=>t.id===e.furnitureId)||null,e.mode==="move"&&this.state.selectedFurniture?this.updatePositionInputs():e.mode==="view"&&this.state.selectedFurniture&&this.showFurnitureDetails(this.state.selectedFurniture)}onFurnitureDeselected(e){this.state.selectedFurniture=null}onFurnitureDragged(e){const t=this.state.furniture.find(n=>n.id===e.furnitureId);t&&(t.x=e.position.x,t.y=e.position.y,t.z=e.position.z)}onFurnitureDeleted(e){this.furnitureManager.removeFurniture(e.furnitureId),this.state.furniture=this.state.furniture.filter(t=>t.id!==e.furnitureId),this.state.selectedFurniture=null,this.updateBudgetDisplay(),this.updateRoomManagementButtons(),this.updateAllButtonStates()}updatePositionInputs(){if(!this.room3D||!this.state.selectedFurniture)return;const e=this.room3D.getFurniturePosition(this.state.selectedFurniture.id);if(e){const t=document.getElementById("position-x"),n=document.getElementById("position-y"),s=document.getElementById("position-z");t&&(t.value=e.x.toFixed(1)),n&&(n.value=e.y.toFixed(1)),s&&(s.value=e.z.toFixed(1))}}applyPosition(){if(!this.room3D||!this.state.selectedFurniture)return;const e=document.getElementById("position-x"),t=document.getElementById("position-y"),n=document.getElementById("position-z"),s={x:parseFloat(e.value)||0,y:parseFloat(t.value)||0,z:parseFloat(n.value)||0};if(this.room3D.moveFurniture(this.state.selectedFurniture.id,s)){const a=this.state.furniture.find(c=>c.id===this.state.selectedFurniture.id);a&&(a.x=s.x,a.y=s.y,a.z=s.z)}else alert("Cannot move furniture to that position - it would be outside room boundaries!")}rotateSelectedFurniture(e){if(!this.room3D||!this.state.selectedFurniture)return;if(this.room3D.rotateFurniture(this.state.selectedFurniture.id,e)){const n=this.state.furniture.find(s=>s.id===this.state.selectedFurniture.id);n&&(n.rotation=this.room3D.getFurnitureRotation(this.state.selectedFurniture.id))}}updateFurnitureRotation(e,t){const n=this.state.furniture.find(s=>s.id===e);n&&(n.rotation=t)}updateFurniturePosition(e,t){const n=this.state.furniture.find(s=>s.id===e);n&&(n.x=t.x,n.y=t.y,n.z=t.z)}getCubeLogo(){return this.cubeLogo}showFurnitureDetails(e){const t=document.createElement("div");t.className="furniture-details-modal",t.innerHTML=`
      <div class="modal-content">
        <div class="modal-header">
          <h3>${e.name}</h3>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="furniture-info">
            <p><strong>Type:</strong> ${e.type}</p>
            <p><strong>Category:</strong> ${e.category}</p>
            <p><strong>Price:</strong> $${e.price}</p>
            <p><strong>Dimensions:</strong> ${e.width}ft × ${e.height}ft × ${e.depth}ft</p>
            <p><strong>Position:</strong> X: ${e.x.toFixed(1)}, Y: ${e.y.toFixed(1)}, Z: ${e.z.toFixed(1)}</p>
            <p><strong>Rotation:</strong> ${(e.rotation*180/Math.PI).toFixed(1)}°</p>
            ${e.productUrl?`
              <p><strong>Product Link:</strong> <a href="${e.productUrl}" target="_blank" rel="noopener noreferrer">View Product →</a></p>
            `:""}
            ${e.brand?`
              <p><strong>Brand:</strong> ${e.brand}</p>
            `:""}
            ${e.reasoning?`
              <p><strong>Why this fits:</strong> ${e.reasoning}</p>
            `:""}
          </div>
          <div class="furniture-actions">
            <button class="btn-primary edit-furniture-btn">Edit This Item</button>
            <button class="btn-danger delete-furniture-btn">Delete This Item</button>
          </div>
        </div>
      </div>
    `,document.body.appendChild(t),t.querySelector(".close-modal")?.addEventListener("click",n=>{n.stopPropagation(),document.body.removeChild(t)}),t.querySelector(".edit-furniture-btn")?.addEventListener("click",()=>{this.state.isViewing=!1,this.state.isEditing=!0,this.state.selectedFurniture=e;const n=document.getElementById("view-mode"),s=document.getElementById("edit-mode");n&&(n.textContent="View Mode",n.classList.remove("active")),s&&(s.textContent="Exit Edit",s.classList.add("active")),this.room3D&&this.room3D.setManipulationMode("move"),document.body.removeChild(t)}),t.querySelector(".delete-furniture-btn")?.addEventListener("click",()=>{confirm(`Are you sure you want to delete "${e.name}"?`)&&(this.furnitureManager.removeFurniture(e.id),this.room3D&&this.room3D.removeFurniture(e.id),this.state.furniture=this.state.furniture.filter(n=>n.id!==e.id),this.state.selectedFurniture=null,this.updateBudgetDisplay(),this.updateRoomManagementButtons(),this.updateAllButtonStates(),document.body.removeChild(t))}),t.addEventListener("click",n=>{n.target===t&&document.body.removeChild(t)})}}new dT;
