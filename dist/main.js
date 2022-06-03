(()=>{"use strict";var t,e=function(){function t(){this.left=new i,this.right=new i,this.up=new i,this.down=new i,this.ctrl=new i}return t.prototype.keyDownUp=function(t,e){var i="keydown"==t;switch(e){case"ArrowLeft":this.left.getInput(i);break;case"ArrowUp":this.up.getInput(i);break;case"ArrowRight":this.right.getInput(i);break;case"ArrowDown":this.down.getInput(i);break;case"ControlLeft":this.ctrl.getInput(i)}},t}(),i=function(){function t(){this.active=this.down=!1}return t.prototype.getInput=function(t){this.down!=t&&(this.active=t),this.down=t},t}(),o=function(){function t(t,e){this.buffer=document.createElement("canvas").getContext("2d"),this.context=t.getContext("2d"),this.video=e}return t.prototype.drawBullet=function(t,e){this.buffer.fillStyle=e,this.buffer.fillRect(Math.round(t.x),Math.round(t.y),t.width,t.height)},t.prototype.playVideo=function(){this.video.play()},t.prototype.drawObject=function(t,e,i,o,s,r,n,h,l){this.buffer.drawImage(t,e,i,r,n,Math.round(o),Math.round(s),h,l)},t.prototype.drawScore=function(t,e,i,o,s){for(var r=e.toString(),n=r.length-1;n>-1;n--)this.buffer.drawImage(t,s+80*+r[n],651,80,56,i-80*(r.length-1-n),o,80,56)},t.prototype.drawMap=function(t,e,i,o,s,r,n,h){this.buffer.drawImage(e,0,i,s,19,0,0,s,19),this.buffer.drawImage(t,n,h,s,r,0,19,s,r),this.buffer.drawImage(e,0,o,s,31,0,589,s,31),this.buffer.drawImage(e,0,69,s,260,0,620,s,260),this.buffer.drawImage(e,0,329,s,59,0,880,s,59)},t.prototype.drawTimebar=function(t,e,i,o,s){this.buffer.drawImage(t,0,388,1315,25,e,i,o,s)},t.prototype.fill=function(t){this.buffer.fillStyle=t,this.buffer.fillRect(0,0,this.buffer.canvas.width,this.buffer.canvas.height)},t.prototype.render=function(){this.context.drawImage(this.buffer.canvas,0,0,this.buffer.canvas.width,this.buffer.canvas.height,0,0,this.context.canvas.width,this.context.canvas.height)},t.prototype.resize=function(t,e,i){e/t>i?(this.context.canvas.height=t*i,this.context.canvas.width=t):(this.context.canvas.height=e,this.context.canvas.width=e/i),this.context.imageSmoothingEnabled=!0},t}(),s=function(){function t(t,e,i){var o=this;this.accumulated_time=0,this.animation_frame_request=void 0,this.time=0,this.time_step=t,this.updated=!1,this.update=e,this.render=i,this.handleRun=function(t){o.run(t)}}return t.prototype.run=function(t){for(this.animation_frame_request=window.requestAnimationFrame(this.handleRun),this.accumulated_time+=t-this.time,this.time=t,this.accumulated_time>=3*this.time_step&&(this.accumulated_time=this.time_step);this.accumulated_time>=this.time_step;)this.accumulated_time-=this.time_step,this.update(t),this.updated=!0;this.updated&&(this.updated=!1,this.render(t))},t.prototype.start=function(){this.accumulated_time=this.time_step,this.time=window.performance.now(),this.animation_frame_request=window.requestAnimationFrame(this.handleRun)},t.prototype.stop=function(){window.cancelAnimationFrame(this.animation_frame_request)},t}(),r=function(){function t(t,e){this.count=0,this.delay=e>=1?e:1,this.frame_set=t,this.frame_index=0,this.frame_value=t[0],this.mode="pause"}return t.prototype.animate=function(){"loop"===this.mode&&this.loop()},t.prototype.changeFrameSet=function(t,e,i,o){void 0===i&&(i=10),void 0===o&&(o=0),this.frame_set!==t&&(this.count=0,this.delay=i,this.frame_set=t,this.frame_index=o,this.frame_value=t[o],this.mode=e)},t.prototype.loop=function(){for(this.count++;this.count>this.delay;)this.count-=this.delay,this.frame_index=this.frame_index<this.frame_set.length-1?this.frame_index+1:0,this.frame_value=this.frame_set[this.frame_index]},t}(),n=(t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)},function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function o(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}),h=function(t){function e(e,i){var o=t.call(this,[0,1,2],2)||this;return o.width=30,o.height=50,o.x=e-o.width/2,o.y=i-o.height,o.time=Date.now(),o.changeFrameSet([0,1,2],"loop",2),o}return n(e,t),e}(r),l=function(){function t(t,e,i,o){this.x=t,this.y=e,this.width=i,this.height=o}return t.prototype.getBottom=function(){return this.y+this.height},t.prototype.getLeft=function(){return this.x},t.prototype.getRight=function(){return this.x+this.width},t.prototype.getTop=function(){return this.y},t.prototype.getCenterX=function(){return this.x+.5*this.width},t.prototype.getCenterY=function(){return this.y+.5*this.height},t.prototype.setBottom=function(t){this.y=t-this.height},t.prototype.setLeft=function(t){this.x=t},t.prototype.setRight=function(t){this.x=t-this.width},t.prototype.setTop=function(t){this.y=t},t.prototype.setCenterX=function(t){this.x=t-.5*this.width},t.prototype.setCenterY=function(t){this.y=t-.5*this.height},t}(),a=function(){var t=function(e,i){return t=l.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)l.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function o(){this.constructor=e}t(e,i),e.prototype=null===i?l.create(i):(o.prototype=i.prototype,new o)}}(),c=function(t){function e(e,i,o){var s=t.call(this,e,i,50,3)||this;return s.direction_x=o,s.moves=0,s}return a(e,t),e.prototype.move=function(t){0!=t&&(this.x+=60*this.direction_x),this.moves++},e}(l),d=function(){function t(){}return t.prototype.collidePlatformBottom=function(t,e){return t.getTop()<e&&t.getOldTop()>=e&&(t.setTop(e),t.velocity_y=0,!0)},t.prototype.collideRightPlatformBottom=function(t,e,i,o){return t.getTop()<e&&t.getOldTop()>=e&&t.getLeft()<i+o&&(t.setTop(e),t.velocity_y=0,!0)},t.prototype.collideLeftPlatformBottom=function(t,e,i,o){return t.getTop()<e&&t.getOldTop()>=e&&t.getRight()>i&&(t.setTop(e),t.velocity_y=0,!0)},t.prototype.collidePlatformTop=function(t,e){return t.getBottom()>e&&t.getOldBottom()<=e&&(t.setBottom(e-.01),t.velocity_y=0,t.flying=!1,!0)},t.prototype.collideRightPlatformTop=function(t,e,i,o){return t.getBottom()>e&&t.getOldBottom()<=e&&t.getLeft()<i+o?(t.setBottom(e-.01),t.velocity_y=0,t.flying=!1,!0):(t.flying=!0,!1)},t.prototype.collideLeftPlatformTop=function(t,e,i,o){return t.getBottom()>e&&t.getOldBottom()<=e&&t.getRight()>i?(t.setBottom(e-.01),t.velocity_y=0,t.flying=!1,!0):(t.flying=!0,!1)},t.prototype.collidePlatformLeft=function(t,e){return t.getRight()>e&&t.getOldRight()<=e&&(t.setRight(e-.01),t.velocity_x=0,!0)},t.prototype.collidePlatformRight=function(t,e){return t.getLeft()<e&&t.getOldLeft()>=e&&(t.setLeft(e),t.velocity_x=0,!0)},t.prototype.collide=function(t,e,i,o,s,r){switch(o+=19,t){case 0:break;case 1:if(this.collidePlatformTop(e,o))return;break;case 2:if(this.collidePlatformRight(e,i+s))return;break;case 3:if(this.collidePlatformTop(e,o))return;if(this.collidePlatformRight(e,i+s))return;break;case 4:if(this.collidePlatformBottom(e,o+r))return;break;case 5:if(this.collidePlatformTop(e,o))return;if(this.collidePlatformBottom(e,o+r))return;break;case 6:if(this.collidePlatformBottom(e,o+r))return;if(this.collidePlatformRight(e,i+s))return;break;case 7:if(this.collidePlatformTop(e,o))return;if(this.collidePlatformBottom(e,o+r))return;if(this.collidePlatformRight(e,i+s))return;break;case 8:if(this.collidePlatformLeft(e,i))return;break;case 9:if(this.collidePlatformTop(e,o))return;if(this.collidePlatformLeft(e,i))return;break;case 10:if(this.collidePlatformLeft(e,i))return;if(this.collidePlatformRight(e,i+s))return;break;case 11:if(this.collidePlatformTop(e,o))return;if(this.collidePlatformLeft(e,i))return;if(this.collidePlatformRight(e,i+s))return;break;case 12:if(this.collidePlatformBottom(e,o+r))return;if(this.collidePlatformLeft(e,i))return;break;case 13:if(this.collidePlatformTop(e,o))return;if(this.collidePlatformBottom(e,o+r))return;if(this.collidePlatformLeft(e,i))return;break;case 14:if(this.collidePlatformBottom(e,o+r))return;if(this.collidePlatformLeft(e,i))return;if(this.collidePlatformRight(e,i))return;break;case 15:if(this.collidePlatformTop(e,o))return;if(this.collidePlatformBottom(e,o+r))return;if(this.collidePlatformLeft(e,i))return;if(this.collidePlatformRight(e,i+s))return;break;case 16:if(this.collidePlatformRight(e,i+s/4))return;break;case 17:if(this.collidePlatformLeft(e,i+3*s/4))return;break;case 18:if(this.collideRightPlatformBottom(e,o+r,i,s/4))return;if(this.collidePlatformRight(e,i+s/4))return;break;case 19:if(this.collideLeftPlatformBottom(e,o+r,i+3*s/4,s/4))return;if(this.collidePlatformLeft(e,i+3*s/4))return;break;case 20:if(this.collideRightPlatformTop(e,o,i,s/2))return;if(e.flying=!0,this.collidePlatformRight(e,i+s/2))return;break;case 21:if(this.collideLeftPlatformTop(e,o,i+s/2,s/2))return;if(e.flying=!0,this.collidePlatformLeft(e,i+s/2))return;break;case 22:if(this.collidePlatformRight(e,i+s/2))return;break;case 23:if(this.collidePlatformLeft(e,i+s/2))return;break;case 24:if(this.collideRightPlatformBottom(e,o+r,i,s/2))return;if(this.collidePlatformRight(e,i+s/2))return;break;case 25:if(this.collideLeftPlatformBottom(e,o+r,i+s/2,s/2))return;if(this.collidePlatformLeft(e,i+s/2))return;break;case 26:if(this.collidePlatformRight(e,i+3*s/4))return;break;case 27:if(this.collideRightPlatformBottom(e,o+r,i,3*s/4))return;if(this.collidePlatformRight(e,i+3*s/4))return}},t}(),f=function(){var t=function(e,i){return t=l.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)l.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function o(){this.constructor=e}t(e,i),e.prototype=null===i?l.create(i):(o.prototype=i.prototype,new o)}}(),p=function(t){function e(e){var i=t.call(this,e.x,e.y,e.width,e.height)||this;return i.destination_x=e.destination_x,i.destination_y=e.destination_y,i.destination_zone=e.destination_zone,i}return f(e,t),e.prototype.collideObject=function(t){var e=t.getCenterX(),i=t.getCenterY();return!(e<this.getLeft()||e>this.getRight()||i<this.getTop()||i>this.getBottom())},e}(l),u=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function o(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}(),m=function(t){function e(e){var i=t.call(this,[0,1],5)||this;switch(i.x=e.x,i.y=e.y,i.base_x=e.x,i.base_y=e.y,i.width=e.width,i.height=e.height,i.alive=e.alive,i.type=e.type,e.type){case"spider":case"bat":i.changeFrameSet([0,1],"loop",8)}return i}return u(e,t),e.prototype.collideObject=function(t){return!!this.alive&&!(this.x+this.width<t.getLeft()||this.x>t.getRight()||this.y+this.height<t.getTop()||this.y>t.getBottom())},e.prototype.updatePosition=function(){switch(this.type){case"spider":0==this.frame_index?this.height=52:this.height=56;break;case"bat":0==this.frame_index?this.y+=2:this.y-=2}},e}(r),y=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function o(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}(),_=function(t){function e(e,i,o,s){var r=t.call(this,[0],1)||this;return r.x=e,r.y=i,r.width=o,r.height=s,r.direction_x=1,r.animation_delay=1,r.set=[0,1,2,1],r}return y(e,t),e.prototype.updateAnimation=function(){this.changeFrameSet(this.set,"loop",this.animation_delay),this.animate()},e}(r),w=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function o(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}(),g=function(t){function e(e,i,o){var s=t.call(this,o["fly-left"],10)||this;return s.color1="#404040",s.color2="#f0f0f0",s.width=69,s.height=97,s.flying=!0,s.velocity_x=0,s.velocity_y=0,s.x=e,s.y=i,s.x_old=s.x,s.y_old=s.y,s.flying_loader=0,s.falling_loader=0,s.direction_x=1,s.player_sets=o,s.helicopter=new _(e,i,48,13.5),s.alive=!0,s.moving_direction=1,s}return w(e,t),e.prototype.fly=function(){this.helicopter.animation_delay=1,this.falling_loader=0,0==this.flying_loader&&(this.helicopter.delay=1),this.flying_loader<1?(this.flying_loader+=.08,this.velocity_y=0):(this.flying=!0,this.velocity_y=-10)},e.prototype.fall=function(){this.helicopter.animation_delay=5,this.flying_loader=0,this.falling_loader<1?(this.falling_loader+=.08,this.velocity_y=0):(this.velocity_y=10,this.helicopter.delay=5)},e.prototype.stop=function(){this.velocity_x=0,this.moving_direction=0},e.prototype.moveLeft=function(){this.direction_x=-1,this.velocity_x=-10,this.moving_direction=-1},e.prototype.moveRight=function(){this.direction_x=1,this.velocity_x=10,this.moving_direction=1},e.prototype.placeBomb=function(){console.log("BOMBA, UCEIKAC")},e.prototype.die=function(){this.alive=!1,this.velocity_x=0,this.velocity_y=0},e.prototype.revive=function(){this.alive=!0,this.y=0,this.flying=!0,this.falling_loader=0},e.prototype.updateAnimation=function(){this.alive?this.flying?this.direction_x<0?this.changeFrameSet(this.player_sets["fly-left"],"pause"):this.changeFrameSet(this.player_sets["fly-right"],"pause"):this.direction_x<0?-1==this.moving_direction?this.changeFrameSet(this.player_sets["walk-left"],"loop",2):this.changeFrameSet(this.player_sets["idle-left"],"pause"):this.direction_x>0&&(1==this.moving_direction?this.changeFrameSet(this.player_sets["walk-right"],"loop",2):this.changeFrameSet(this.player_sets["idle-right"],"pause")):(this.changeFrameSet(this.player_sets.dead,"pause"),this.helicopter.changeFrameSet([0],"pause")),this.animate(),this.updateHelicopterPosition(),this.helicopter.updateAnimation()},e.prototype.updatePosition=function(){this.x_old=this.x,this.y_old=this.y,this.x+=this.velocity_x,this.y+=this.velocity_y},e.prototype.updateHelicopterPosition=function(){this.alive?this.helicopter.x=1==this.direction_x?this.x-9:this.x+30:this.helicopter.x=this.x+30,this.helicopter.y=this.y-12},e.prototype.getBottom=function(){return this.y+this.height},e.prototype.getLeft=function(){return this.x},e.prototype.getRight=function(){return this.x+this.width},e.prototype.getTop=function(){return this.y},e.prototype.getOldBottom=function(){return this.y_old+this.height},e.prototype.getOldLeft=function(){return this.x_old},e.prototype.getOldRight=function(){return this.x_old+this.width},e.prototype.getOldTop=function(){return this.y_old},e.prototype.getCenterX=function(){return this.x+.5*this.width},e.prototype.getCenterY=function(){return this.y+.5*this.height},e.prototype.getOldCenterX=function(){return this.x_old+.5*this.width},e.prototype.getOldCenterY=function(){return this.y_old+.5*this.height},e.prototype.setBottom=function(t){this.y=t-this.height},e.prototype.setLeft=function(t){this.x=t},e.prototype.setRight=function(t){this.x=t-this.width},e.prototype.setTop=function(t){this.y=t},e.prototype.setOldBottom=function(t){this.y_old=t-this.height},e.prototype.setOldLeft=function(t){this.x_old=t},e.prototype.setOldRight=function(t){this.x_old=t-this.width},e.prototype.setOldTop=function(t){this.y_old=t},e.prototype.setCenterX=function(t){this.x=t-.5*this.width},e.prototype.setCenterY=function(t){this.y=t-.5*this.height},e.prototype.setOldCenterX=function(t){this.x_old=t-.5*this.width},e.prototype.setOldCenterY=function(t){this.y_old=t-.5*this.height},e}(r),b=function(t,e,i,o,s,r){this.x=t,this.y=e,this.width=i,this.height=o,this.offset_x=s,this.offset_y=r},v=function(t,e,i){this.columns=t,this.tile_width=e,this.tile_height=i,this.player_frames=[new b(8,0,46,65,0,-10),new b(66,0,46,65,0,-10),new b(124,0,46,65,0,-10),new b(182,0,46,65,0,-10),new b(240,0,46,65,0,-10),new b(298,0,46,65,0,-10),new b(356,0,46,65,0,-10),new b(410,0,46,65,0,-10),new b(468,0,46,65,0,-10),new b(526,0,46,65,0,-10),new b(584,0,46,65,0,-10),new b(642,0,46,65,0,-10),new b(700,0,46,65,0,-10),new b(758,0,46,65,0,-10),new b(804,0,58,66,0,-10)],this.helicopter_frames=[new b(0,66,32,9,0,0),new b(32,66,32,9,0,0),new b(64,66,32,9,0,0)],this.bomb_frames=[new b(184,413,30,50,0,0),new b(214,413,30,50,0,0),new b(244,413,30,50,0,0),new b(274,413,41,50,0,0),new b(314,413,77,50,0,0)],this.spider_frames=[new b(0,0,72,52,0,0),new b(72,0,72,56,0,0)],this.bat_frames=[new b(0,56,70,34,0,0),new b(70,56,70,34,0,0)]},x=function(){var t=function(e,i){return t=l.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)l.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function o(){this.constructor=e}t(e,i),e.prototype=null===i?l.create(i):(o.prototype=i.prototype,new o)}}(),P=function(t){function e(e){var i=t.call(this,e.x,e.y,e.width,e.height)||this;return i.active=!0,i}return x(e,t),e.prototype.collideObject=function(t){return!!this.active&&(t.getRight()>this.getLeft()&&t.getOldRight()<=this.getLeft()?(t.setRight(this.getLeft()-.01),t.velocity_x=0,!0):t.getLeft()<this.getRight()&&t.getOldLeft()>=this.getRight()&&(t.setLeft(this.getRight()),t.velocity_x=0,!0))},e}(l),O=function(){function t(t){this.collider=new d,this.audioArray=t,this.background="#000000",this.player_sets={"fly-right":[0],"walk-right":[1,2,3,4,5],"idle-right":[6],"fly-left":[7],"walk-left":[8,9,10,11,12],"idle-left":[13],dead:[14]},this.player=new g(300,19,this.player_sets),this.columns=10,this.rows=6,this.level=1,this.zone=void 0,this.zones=[],this.zone_id=0,this.walls=[],this.monsters=[],this.monster_index=-1,this.doors=[],this.door=void 0,this.bullets=[],this.tile_set=new v(10,164,95),this.height=this.tile_set.tile_height*this.rows+369,this.width=this.tile_set.tile_width*this.columns,this.time=Date.now(),this.time_limit=128,this.lives=4,this.bombs=6,this.bomb=void 0,this.points=0,this.score_bubble=null,this.exit=void 0,this.delay=0,this.block=!1,this.reset=!1}return t.prototype.collideObject=function(t){var e,i,o,s,r;0==this.zone_id&&t.getTop()<19&&(t.setTop(19),t.velocity_y=0),s=Math.floor((t.getTop()-19)/this.tile_set.tile_height),i=Math.floor(t.getLeft()/this.tile_set.tile_width),r=this.collision_map[s*this.columns+i],this.collider.collide(r,t,i*this.tile_set.tile_width,s*this.tile_set.tile_height,this.tile_set.tile_width,this.tile_set.tile_height),s=Math.floor((t.getTop()-19)/this.tile_set.tile_height),o=Math.floor(t.getRight()/this.tile_set.tile_width),r=this.collision_map[s*this.columns+o],this.collider.collide(r,t,o*this.tile_set.tile_width,s*this.tile_set.tile_height,this.tile_set.tile_width,this.tile_set.tile_height),e=Math.floor((t.getBottom()-19)/this.tile_set.tile_height),i=Math.floor(t.getLeft()/this.tile_set.tile_width),r=this.collision_map[e*this.columns+i],this.collider.collide(r,t,i*this.tile_set.tile_width,e*this.tile_set.tile_height,this.tile_set.tile_width,this.tile_set.tile_height),e=Math.floor((t.getBottom()-19)/this.tile_set.tile_height),o=Math.floor(t.getRight()/this.tile_set.tile_width),r=this.collision_map[e*this.columns+o],this.collider.collide(r,t,o*this.tile_set.tile_width,e*this.tile_set.tile_height,this.tile_set.tile_width,this.tile_set.tile_height)},t.prototype.setupLevel=function(t){this.level=t.id,this.zones=t.zones},t.prototype.setup=function(t){this.zone=this.zones[t.id],this.zone_id=t.id,this.score_bubble=null,this.source_y=this.zone.source_y,this.top_coords=this.zone.top_coords,this.bottom_coords=this.zone.bottom_coords,this.collision_map=this.zone.collision_map,this.columns=this.zone.columns,this.rows=this.zone.rows,this.walls=new Array,this.doors=new Array,this.monsters=new Array,this.zone_id=this.zone.id,this.zone.exit?this.exit=this.zone.exit:this.exit=void 0;for(var e=t.doors.length-1;e>-1;--e){var i=this.zone.doors[e];this.doors[e]=new p(i)}for(e=t.walls.length-1;e>-1;--e){var o=this.zone.walls[e];o&&o.active&&(this.walls[e]=new P(o))}for(e=t.monsters.length-1;e>-1;--e){var s=this.zone.monsters[e];s&&s.alive&&(this.monsters[e]=new m(s))}this.door&&(-1!=this.door.destination_x&&(this.player.setCenterX(this.door.destination_x),this.player.setOldCenterX(this.door.destination_x)),-1!=this.door.destination_y&&(this.player.setCenterY(this.door.destination_y),this.player.setOldCenterY(this.door.destination_y)),this.door=void 0)},t.prototype.placeBomb=function(){!this.player.flying&&!this.bomb&&this.bombs>0&&(this.bomb=new h(this.player.getCenterX(),this.player.getBottom()),this.bombs--,this.audioArray[5].play())},t.prototype.fire=function(){var t=new c(1==this.player.direction_x?this.player.getRight():this.player.getLeft()-50,this.player.getTop()+10,this.player.direction_x);this.bullets.push(t),this.audioArray[3].play()},t.prototype.checkTimeLimit=function(){Date.now()-this.time>=1e3&&this.time_limit>0&&this.player.alive&&(this.time=Date.now(),this.time_limit--,0==this.time_limit&&(this.player.die(),this.lives--))},t.prototype.resetGame=function(){this.level=1,this.zone_id=0,this.walls=[],this.doors=[],this.door=void 0,this.lives=4,this.bombs=6,this.time=Date.now(),this.score_bubble=null,this.player.x=300,this.player.y=19,this.player.direction_x=1,this.player.flying=!0,this.reset=!0,this.time_limit=128},t.prototype.loadLevel=function(t){this.level=t,this.zone_id=0,this.walls=[],this.doors=[],this.door=void 0,this.bombs=6,this.time=Date.now(),this.score_bubble=null,this.player.x=300,this.player.y=19,this.player.direction_x=1,this.player.flying=!0,this.reset=!0,this.time_limit=128},t.prototype.reviveCooldown=function(){Date.now()-this.time>=3e3&&(this.monster_index>=0&&(this.monsters[this.monster_index].alive=!1,this.monster_index=-1),0==this.lives&&this.resetGame(),this.player.revive(),this.loadLevel(this.level))},t.prototype.bombExplode=function(){this.player.flying||Math.abs(this.bomb.x+this.bomb.width/2-this.player.getCenterX())<=150&&Math.abs(this.bomb.y-this.player.y)<=200&&(this.player.die(),this.lives--);for(var t=0;t<this.walls.length;t++){var e=this.walls[t];e.active&&Math.abs(this.bomb.x+this.bomb.width/2-(e.x+e.width/2))<=150&&Math.abs(this.bomb.y-e.y)<=200&&(this.points+=75,e.active=!1,this.score_bubble={type:0,x:this.bomb.x,y:this.bomb.y,time:Date.now()})}this.audioArray[2].play()},t.prototype.bombAnimate=function(){if(this.bomb){this.bomb.animate();var t=Date.now()-this.bomb.time;t>=700&&(this.bomb.changeFrameSet([3],"pause"),t>=740&&(this.bomb.changeFrameSet([4],"pause"),t>=760&&(this.background="#6f4f24",t>=780&&(this.background="#67362b",t>=800&&(this.background="#000000",this.bombExplode(),this.bomb=void 0)))))}},t.prototype.checkExit=function(){return!(this.exit.x+this.exit.width<this.player.getLeft()||this.exit.x>this.player.getRight()||this.exit.y+this.exit.height<this.player.getTop()||this.exit.y>this.player.getBottom())},t.prototype.animatePoints=function(){this.time_limit>0?(1==this.time_limit?(this.time_limit-=1,this.points+=13*this.level):(this.time_limit-=2,this.points+=2*this.level*13),this.delay=Date.now(),this.audioArray[4].play()):this.bombs>0?Date.now()-this.delay>=522&&(this.audioArray[1].play(),this.bombs--,this.points+=50,this.delay=Date.now()):(this.block=!1,this.loadLevel(++this.level))},t.prototype.update=function(){if(this.exit&&this.checkExit()&&(this.points+=1e3,this.block=!0,this.exit=void 0),this.block&&this.animatePoints(),!this.block){this.checkTimeLimit(),this.reviveCooldown(),this.player.updatePosition(),this.collideObject(this.player);for(var t=this.walls.length-1;t>-1;--t)this.walls[t].collideObject(this.player);for(t=this.doors.length-1;t>-1;--t){var e=this.doors[t];e.collideObject(this.player)&&(this.zones[this.zone_id].doors=this.doors,this.zones[this.zone_id].walls=this.walls,this.zones[this.zone_id].monsters=this.monsters,this.door=e)}for(t=this.monsters.length-1;t>-1;--t)if((s=this.monsters[t]).animate(),s.updatePosition(),s.collideObject(this.player)&&this.player.alive){this.lives--,this.player.die(),this.monster_index=t;break}for(t=this.bullets.length-1;t>-1;--t)(i=this.bullets[t]).y=this.player.getTop()+10,i.move(t),i.moves>=4&&this.bullets.splice(this.bullets.indexOf(i));for(t=this.bullets.length-1;t>-1;--t)for(var i=this.bullets[t],o=this.monsters.length-1;o>-1;--o){var s;if((s=this.monsters[o]).collideObject(i)){this.monsters[this.monsters.indexOf(s)].alive=!1,this.points+=50,this.score_bubble={type:1,x:s.x,y:s.y,time:Date.now()};break}}this.score_bubble&&Date.now()-this.score_bubble.time>=1500&&(this.score_bubble=null),this.player.updateAnimation(),this.bombAnimate()}},t}(),L=function(){function t(t){this.world=new O(t)}return t.prototype.update=function(){this.world.update()},t}(),k=function(){function t(){this.tile_set_image=new Image,this.rest_map_image=new Image,this.hero_image=new Image,this.monsters_image=new Image,this.currentZoneId="0"}return t.prototype.loadTileSetImage=function(t,e,i,o,s){var r=[this.tile_set_image,this.rest_map_image,this.hero_image,this.monsters_image],n=0;[].forEach.call(r,(function(t){t.complete?++n==r.length&&s():t.addEventListener("load",(function(){++n==r.length&&s()}),!1)})),this.tile_set_image.src=t,this.rest_map_image.src=e,this.hero_image.src=i,this.monsters_image.src=o},t.prototype.requestJSON=function(t,e){var i=new XMLHttpRequest;i.addEventListener("load",(function(){e(JSON.parse(this.responseText))}),{once:!0}),i.open("GET",t),i.send()},t}();window.addEventListener("load",(function(){var t=[new Audio("../sounds/flying.mp3"),new Audio("../sounds/bomb_as_points.mp3"),new Audio("../sounds/explode.mp3"),new Audio("../sounds/fire.mp3"),new Audio("../sounds/load_points.mp3"),new Audio("../sounds/place_bomb.mp3")],i=function(t){h.keyDownUp(t.type,t.code)},r=function(){l.resize(document.documentElement.clientWidth,document.documentElement.clientHeight,a.world.height/a.world.width),l.render()},n=new k,h=new e,l=new o(document.querySelector("canvas"),document.querySelector("video")),a=new L(t),c=new s(1e3/30,(function(){l.fill(a.world.background),l.drawMap(n.tile_set_image,n.rest_map_image,a.world.top_coords,a.world.bottom_coords,a.world.width,a.world.height,0,a.world.source_y),l.drawTimebar(n.rest_map_image,288,661,Math.round(1315*a.world.time_limit/128),25);for(var t=0;t<a.world.lives-1;t++)l.drawObject(n.rest_map_image,0,413,190+100*t,696,60,68,60,68);for(t=0;t<a.world.bombs;t++)l.drawObject(n.rest_map_image,142,413,1031+100*t,696,42,62,42,62);if(l.drawScore(n.rest_map_image,a.world.level,498,800,800),l.drawScore(n.rest_map_image,a.world.points,1400,804,0),a.world.score_bubble&&l.drawObject(n.rest_map_image,70*a.world.score_bubble.type,707,a.world.score_bubble.x,a.world.score_bubble.y,70,24,70,24),a.world.bomb){var e=a.world.tile_set.bomb_frames[a.world.bomb.frame_value];l.drawObject(n.rest_map_image,e.x,e.y,a.world.bomb.x,a.world.bomb.y,e.width,e.height,e.width,e.height)}for(t=0;t<a.world.monsters.length;t++)if(a.world.monsters[t].alive)switch(a.world.monsters[t].type){case"spider":var i=a.world.tile_set.spider_frames[a.world.monsters[t].frame_value];l.drawObject(n.monsters_image,i.x,i.y,a.world.monsters[t].x,a.world.monsters[t].y,i.width,i.height,i.width,i.height);break;case"bat":var o=a.world.tile_set.bat_frames[a.world.monsters[t].frame_value];l.drawObject(n.monsters_image,o.x,o.y,a.world.monsters[t].x,a.world.monsters[t].y,o.width,o.height,o.width,o.height)}for(t=0;t<a.world.bullets.length;t++)l.drawBullet(a.world.bullets[t],"#978053");var s=a.world.tile_set.helicopter_frames[a.world.player.helicopter.frame_value];l.drawObject(n.hero_image,s.x,s.y,a.world.player.helicopter.x,a.world.player.helicopter.y,s.width,s.height,48,13);var r=a.world.tile_set.player_frames[a.world.player.frame_value];for(l.drawObject(n.hero_image,r.x,r.y,a.world.player.x,a.world.player.y,r.width,r.height,69,97),t=0;t<a.world.walls.length;t++)a.world.walls[t].active&&l.drawObject(n.rest_map_image,60,413,a.world.walls[t].x,a.world.walls[t].y,a.world.walls[t].width,a.world.walls[t].height,a.world.walls[t].width,a.world.walls[t].height);l.render()}),(function(){a.world.block||(a.world.player.alive&&(h.left.active||h.right.active?h.left.active?a.world.player.moveLeft():a.world.player.moveRight():a.world.player.stop(),h.up.active?a.world.player.fly():a.world.player.fall(),h.down.active&&(a.world.placeBomb(),h.down.active=!1),h.ctrl.active&&a.world.fire()),a.world.player.flying&&t[0].play(),(a.world.door||a.world.reset)&&(a.world.reset=!1,c.stop(),n.requestJSON("../levels.json",(function(t){if(a.world.door)a.world.setup(t.levels[a.world.level-1].zones[+a.world.door.destination_zone]);else{if(!t.levels[a.world.level-1])return void c.stop();a.world.setupLevel(t.levels[a.world.level-1]),a.world.setup(t.levels[a.world.level-1].zones[0])}c.start()})))),a.update()}));l.buffer.canvas.height=a.world.height,l.buffer.canvas.width=a.world.width,l.buffer.imageSmoothingEnabled=!0,n.requestJSON("../levels.json",(function(t){a.world.setupLevel(t.levels[0]),a.world.setup(t.levels[0].zones[0]),n.loadTileSetImage("images/mapka.png","images/restmap.png","images/hero.png","images/monsters.png",(function(){r(),c.start()}))})),window.addEventListener("keydown",i),window.addEventListener("keyup",i),window.addEventListener("resize",r)}))})();