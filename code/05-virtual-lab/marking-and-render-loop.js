// Virtual Lab: seeded per-student values, marking logic and the render-on-demand loop (verbatim excerpts of lab-prototype/virtual-lab.html)

/* ---------- logic: every student gets different hidden values (seeded), and every mark line explains itself ---------- */
function rng(seed){var a=seed>>>0;return function(){a=(a+0x6D2B79F5)>>>0;var t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}
function r2(x,d){var f=Math.pow(10,d);return Math.round(x*f)/f;}
var OHM={Vs:6,r:0.5,Ra:0.1,RhMax:20};
function newOhm(seed){var r=rng(seed);return{seed:seed,R:r2(4+r()*11,1)};}
function ohmRead(s,slider){
  var I=OHM.Vs/(s.R+(slider/100)*OHM.RhMax+OHM.r+OHM.Ra), V=I*s.R, j=rng(s.seed*131+slider);
  return{V:r2(V*(1+(j()-0.5)*0.01),2),I:r2(I*(1+(j()-0.5)*0.01),3)};
}
function fitLine(pts){
  var n=pts.length,sx=0,sy=0,sxx=0,sxy=0,syy=0,i;
  for(i=0;i<n;i++){sx+=pts[i].x;sy+=pts[i].y;sxx+=pts[i].x*pts[i].x;sxy+=pts[i].x*pts[i].y;syy+=pts[i].y*pts[i].y;}
  var d=n*sxx-sx*sx; if(!n||Math.abs(d)<1e-12) return null;
  var m=(n*sxy-sx*sy)/d, c=(sy-m*sx)/n, rr=(n*sxy-sx*sy)/Math.sqrt(d*(n*syy-sy*sy)||1);
  return{m:m,c:c,r2:rr*rr};
}
function bandMarks(err,bands){for(var i=0;i<bands.length;i++){if(err<=bands[i][0])return bands[i][1];}return 0;}
function markOhm(s,rows,ans){
  var out=[],pts=rows.map(function(r){return{x:r.I,y:r.V};}),fit=fitLine(pts),Is=rows.map(function(r){return r.I;});
  var spread=Is.length?Math.max.apply(null,Is)/Math.max(Math.min.apply(null,Is),1e-9):0;
  var rd=(rows.length>=5?3:rows.length>=3?1:0)+(spread>=1.5?2:0)+(fit&&fit.r2>0.99?1:0);
  out.push({label:'Readings',got:rd,max:6,note:rows.length<5?'Take at least 5 readings.':spread<1.5?'Spread your readings more: use very different rheostat settings.':'Good range of readings.'});
  var g=Number(ans.grad),ge=isFinite(g)&&ans.grad!==''?Math.abs(g-s.R)/s.R:Infinity;
  out.push({label:'Gradient of the graph',got:bandMarks(ge,[[0.05,6],[0.10,3]]),max:6,note:ge===Infinity?'No gradient entered.':ge<=0.05?'Gradient is within 5%.':ge<=0.10?'Close: within 10%.':'Gradient is off by more than 10%. Use two points far apart on the line.'});
  var R=Number(ans.res),re=isFinite(R)&&ans.res!==''?Math.abs(R-s.R)/s.R:Infinity;
  out.push({label:'Resistance of X',got:bandMarks(re,[[0.05,5],[0.10,3],[0.20,1]]),max:5,note:re===Infinity?'No value entered.':re<=0.05?'Within 5% of the true value.':'Not within 5% of the true value.'});
  out.push({label:'Conclusion',got:ans.concl==='prop'?3:0,max:3,note:ans.concl==='prop'?'Correct.':'V is directly proportional to I at constant temperature.'});
  return out;
}
var TIT={cB:0.1,Vp:25};
function newTit(seed){var r=rng(seed),cA=r2(0.08+r()*0.04,3);return{seed:seed,cA:cA,Ve:r2(TIT.Vp*cA/TIT.cB,3),r:r};}
function startReading(s){return r2(Math.floor(s.r()*13)*0.05,2);}
function buretteReading(start,added){return r2(Math.round((start+added)*20)/20,2);}
function isPink(s,added){return added-s.Ve>0.02;}
function markTit(s,runs,ans){
  var out=[],acc=runs.slice(1).map(function(r){return r.titre;}),best=Infinity,i,j;
  for(i=0;i<acc.length;i++)for(j=i+1;j<acc.length;j++)best=Math.min(best,Math.abs(acc[i]-acc[j]));
  var nrun=runs.length;
  out.push({label:'Titrations recorded',got:nrun>=4?4:nrun>=3?3:nrun>=2?1:0,max:4,note:nrun<3?'Record a rough and at least two accurate titrations.':nrun<4?'Three is acceptable. A fourth titration earns full marks.':'Enough titrations.'});
  out.push({label:'Concordant titres',got:best<=0.10001?5:best<=0.20001?2:0,max:5,note:best===Infinity?'You need two accurate titres to compare.':best<=0.10001?'Two accurate titres agree within 0.10 cm³.':'Accurate titres should agree within 0.10 cm³. Add drop by drop near the end.'});
  var m=Number(ans.mean),me=isFinite(m)&&ans.mean!==''?Math.abs(m-s.Ve):Infinity;
  out.push({label:'Mean titre',got:bandMarks(me,[[0.10001,5],[0.20001,3],[0.40001,1]]),max:5,note:me===Infinity?'No mean titre entered.':me<=0.10001?'Accurate.':'Your mean titre is not close enough. Check your end point.'});
  var c=Number(ans.conc),ce=isFinite(c)&&ans.conc!==''?Math.abs(c-s.cA)/s.cA:Infinity;
  out.push({label:'Concentration of HCl',got:bandMarks(ce,[[0.02,4],[0.05,2]]),max:4,note:ce===Infinity?'No value entered.':ce<=0.02?'Within 2%.':'Use cA = (cB × titre) ÷ 25.0 for a 1:1 reaction.'});
  var prep=runs.filter(function(r){return r.prepared;}).length;
  out.push({label:'Procedure',got:nrun&&prep===nrun?2:prep?1:0,max:2,note:nrun&&prep===nrun?'Pipette and indicator used every time.':'Pipette the acid and add indicator before every titration.'});
  return out;
}

/* ---------- main loop: draws only when something changed ---------- */
var last=performance.now();
function frame(now){
  requestAnimationFrame(frame);
  var dt=Math.min((now-last)/1000,0.1);last=now;
  var testing=speedUntil>0;
  if(camTween){camTween.t=Math.min(1,camTween.t+dt/0.5);var q=camTween.t,k=q<0.5?2*q*q:1-Math.pow(-2*q+2,2)/2,f=camTween.from,to=camTween.to;cam.target.set(f.tx+(to.tx-f.tx)*k,f.ty+(to.ty-f.ty)*k,f.tz+(to.tz-f.tz)*k);cam.r=f.r+(to.r-f.r)*k;cam.theta=f.theta+(to.theta-f.theta)*k;cam.phi=f.phi+(to.phi-f.phi)*k;placeCamera();if(q>=1)camTween=null;}
  if(exp==='ohm'){
    if(oSwitch){var I=ohmRead(ohm,ohmSlider()).I;ohmParts.phase+=dt*I*0.05;
      var n=$('low').checked?8:ohmParts.dots.length;
      ohmParts.dots.forEach(function(d,i){d.visible=i<n;if(i<n)d.position.copy(pointOnLoop(ohmParts.phase+i/n));});dirty=true;}
    else ohmParts.dots.forEach(function(d){d.visible=false;});
  }else{
    if(tState.hold>0&&!tRun().final&&tState.start+tState.added<50){
      var amt=tState.hold*dt;dispense(amt);tp.stream.visible=tState.hold>1;
      if(tState.hold<=1&&now-tState.lastDrop>200){tState.lastDrop=now;spawnDrop();}
    }
    tp.drops.forEach(function(d){if(d.on){d.y-=dt*7;d.m.position.set(0,d.y,0);if(d.y<1.0){d.on=false;d.m.visible=false;}dirty=true;}});
    if(tState.flash>0){tState.flash=Math.max(0,tState.flash-dt/(tState.swirl>0?0.3:2.5));tUpdateView();}
    if(tState.swirl>0){tState.swirl-=dt;tUpdateView();if(tState.swirl<=0)tp.flask.rotation.z=0;}
  }
  if(testing){cam.theta+=dt*0.8;placeCamera();speedFrames++;if(now>speedUntil){speedUntil=0;finishSpeed();}}
  if(dirty&&glOK){dirty=false;renderer.render(scene,camera);}
}
