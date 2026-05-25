import{a as Ie,b as Se,c as fe}from"./chunk-5IORCEOD.js";import{a as J}from"./chunk-IMPZ7UGB.js";import{a as xe}from"./chunk-ZJ45HMNY.js";import{b as sn}from"./chunk-LKTE2YWL.js";import{a as We,b as fn}from"./chunk-RELHBJJP.js";import{a as de}from"./chunk-7AR5UXG3.js";import{a as Le}from"./chunk-XKBSMKNP.js";import{b as De,c as ln,d as ke,f as se,g as Oe,n as cn}from"./chunk-K2IDXOCV.js";import{a as T,b as G}from"./chunk-45OWWDV7.js";import{a as M}from"./chunk-JX5O4HI2.js";import{a as ne}from"./chunk-6S43R6PL.js";import{a as c}from"./chunk-ZRLECQ27.js";import{a as A}from"./chunk-FEOWMVRK.js";import{a as an,b as Ge}from"./chunk-CUQT2UK5.js";import{a as H}from"./chunk-CB3KB2D3.js";import{a,c as X}from"./chunk-I46SWINN.js";import{a as N}from"./chunk-LNIYJJXS.js";import{a as h}from"./chunk-4D2ERGZX.js";import{a as q}from"./chunk-EDZQSM3T.js";import{a as x}from"./chunk-PJGSCWXZ.js";import{a as u}from"./chunk-NUC3LT2W.js";var E={_maximumCombinedTextureImageUnits:0,_maximumCubeMapSize:0,_maximumFragmentUniformVectors:0,_maximumTextureImageUnits:0,_maximumRenderbufferSize:0,_maximumTextureSize:0,_maximumVaryingVectors:0,_maximumVertexAttributes:0,_maximumVertexTextureImageUnits:0,_maximumVertexUniformVectors:0,_minimumAliasedLineWidth:0,_maximumAliasedLineWidth:0,_minimumAliasedPointSize:0,_maximumAliasedPointSize:0,_maximumViewportWidth:0,_maximumViewportHeight:0,_maximumTextureFilterAnisotropy:0,_maximumDrawBuffers:0,_maximumColorAttachments:0,_highpFloatSupported:!1,_highpIntSupported:!1,_uniformBufferOffsetAlignment:256,_maxUniformBufferBinding:36,_maxArrayTextureLayers:256};Object.defineProperties(E,{maximumCombinedTextureImageUnits:{get:function(){return E._maximumCombinedTextureImageUnits}},maximumCubeMapSize:{get:function(){return E._maximumCubeMapSize}},maximumFragmentUniformVectors:{get:function(){return E._maximumFragmentUniformVectors}},maximumTextureImageUnits:{get:function(){return E._maximumTextureImageUnits}},maximumRenderbufferSize:{get:function(){return E._maximumRenderbufferSize}},maximumTextureSize:{get:function(){return E._maximumTextureSize}},maximumVaryingVectors:{get:function(){return E._maximumVaryingVectors}},maximumVertexAttributes:{get:function(){return E._maximumVertexAttributes}},maximumVertexTextureImageUnits:{get:function(){return E._maximumVertexTextureImageUnits}},maximumVertexUniformVectors:{get:function(){return E._maximumVertexUniformVectors}},minimumAliasedLineWidth:{get:function(){return E._minimumAliasedLineWidth}},maximumAliasedLineWidth:{get:function(){return E._maximumAliasedLineWidth}},minimumAliasedPointSize:{get:function(){return E._minimumAliasedPointSize}},maximumAliasedPointSize:{get:function(){return E._maximumAliasedPointSize}},maximumViewportWidth:{get:function(){return E._maximumViewportWidth}},maximumViewportHeight:{get:function(){return E._maximumViewportHeight}},maximumTextureFilterAnisotropy:{get:function(){return E._maximumTextureFilterAnisotropy}},maximumDrawBuffers:{get:function(){return E._maximumDrawBuffers}},maximumColorAttachments:{get:function(){return E._maximumColorAttachments}},highpFloatSupported:{get:function(){return E._highpFloatSupported}},highpIntSupported:{get:function(){return E._highpIntSupported}},uniformBufferOffsetAlignment:{get:function(){return E._uniformBufferOffsetAlignment}},maxUniformBufferBinding:{get:function(){return E._maxUniformBufferBinding}},maxArrayTextureLayers:{get:function(){return E._maxArrayTextureLayers}}});var Z=E;function Ei(e,n,t,o){var r=u(n.vertexBuffer),i=u(n.value),l=n.value?n.value.length:n.componentsPerAttribute;if(!r&&!i)throw new x("attribute must have a vertexBuffer or a value.");if(r&&i)throw new x("attribute cannot have both a vertexBuffer and a value.  It must have either a vertexBuffer property defining per-vertex data or a value property defining data for all vertices.");if(l!==1&&l!==2&&l!==3&&l!==4)throw i?new x("attribute.value.length must be in the range [1, 4]."):new x("attribute.componentsPerAttribute must be in the range [1, 4].");if(u(n.componentDatatype)&&!M.validate(n.componentDatatype))throw new x("attribute must have a valid componentDatatype or not specify it.");if(u(n.strideInBytes)&&n.strideInBytes>255)throw new x("attribute must have a strideInBytes less than or equal to 255 or not specify it.");if(u(n.instanceDivisor)&&n.instanceDivisor>0&&!o.instancedArrays)throw new x("instanced arrays is not supported");if(u(n.instanceDivisor)&&n.instanceDivisor<0)throw new x("attribute must have an instanceDivisor greater than or equal to zero");if(u(n.instanceDivisor)&&i)throw new x("attribute cannot have have an instanceDivisor if it is not backed by a buffer");if(u(n.instanceDivisor)&&n.instanceDivisor>0&&n.index===0)throw new x("attribute zero cannot have an instanceDivisor greater than 0");var m={index:h(n.index,t),enabled:h(n.enabled,!0),vertexBuffer:n.vertexBuffer,value:i?n.value.slice(0):void 0,componentsPerAttribute:l,componentDatatype:h(n.componentDatatype,M.FLOAT),normalize:h(n.normalize,!1),offsetInBytes:h(n.offsetInBytes,0),strideInBytes:h(n.strideInBytes,0),instanceDivisor:h(n.instanceDivisor,0)};if(r)m.vertexAttrib=function(f){var v=this.index;f.bindBuffer(f.ARRAY_BUFFER,this.vertexBuffer._getBuffer()),f.vertexAttribPointer(v,this.componentsPerAttribute,this.componentDatatype,this.normalize,this.strideInBytes,this.offsetInBytes),f.enableVertexAttribArray(v),this.instanceDivisor>0&&(o.glVertexAttribDivisor(v,this.instanceDivisor),o._vertexAttribDivisors[v]=this.instanceDivisor,o._previousDrawInstanced=!0)},m.disableVertexAttribArray=function(f){f.disableVertexAttribArray(this.index),this.instanceDivisor>0&&o.glVertexAttribDivisor(t,0)};else{switch(m.componentsPerAttribute){case 1:m.vertexAttrib=function(f){f.vertexAttrib1fv(this.index,this.value)};break;case 2:m.vertexAttrib=function(f){f.vertexAttrib2fv(this.index,this.value)};break;case 3:m.vertexAttrib=function(f){f.vertexAttrib3fv(this.index,this.value)};break;case 4:m.vertexAttrib=function(f){f.vertexAttrib4fv(this.index,this.value)};break}m.disableVertexAttribArray=function(f){}}e.push(m)}function mn(e,n,t){for(var o=0;o<n.length;++o){var r=n[o];r.enabled&&r.vertexAttrib(e)}u(t)&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t._getBuffer())}function ie(e){e=h(e,h.EMPTY_OBJECT),q.defined("options.context",e.context),q.defined("options.attributes",e.attributes);var n=e.context,t=n._gl,o=e.attributes,r=e.indexBuffer,i,l=[],m=1,f=!1,v=!1,p=o.length;for(i=0;i<p;++i)Ei(l,o[i],i,n);for(p=l.length,i=0;i<p;++i){var s=l[i];if(u(s.vertexBuffer)&&s.instanceDivisor===0){var d=s.strideInBytes||s.componentsPerAttribute*M.getSizeInBytes(s.componentDatatype);m=s.vertexBuffer.sizeInBytes/d;break}}for(i=0;i<p;++i)l[i].instanceDivisor>0&&(f=!0),u(l[i].value)&&(v=!0);var g={};for(i=0;i<p;++i){var C=l[i].index;if(g[C])throw new x("Index "+C+" is used by more than one attribute.");g[C]=!0}var y;n.vertexArrayObject&&(y=n.glCreateVertexArray(),n.glBindVertexArray(y),mn(t,l,r),n.glBindVertexArray(null)),this._numberOfVertices=m,this._hasInstancedAttributes=f,this._hasConstantAttributes=v,this._context=n,this._gl=t,this._vao=y,this._attributes=l,this._indexBuffer=r}function un(e){return e.values.length/e.componentsPerAttribute}function Ai(e){return M.getSizeInBytes(e.componentDatatype)*e.componentsPerAttribute}function Di(e){var n,t,o,r=[];for(t in e)e.hasOwnProperty(t)&&u(e[t])&&u(e[t].values)&&(r.push(t),e[t].componentDatatype===M.DOUBLE&&(e[t].componentDatatype=M.FLOAT,e[t].values=M.createTypedArray(M.FLOAT,e[t].values)));var i,l=r.length;if(l>0)for(i=un(e[r[0]]),n=1;n<l;++n){var m=un(e[r[n]]);if(m!==i)throw new ne("Each attribute list must have the same number of vertices.  Attribute "+r[n]+" has a different number of vertices ("+m.toString()+") than attribute "+r[0]+" ("+i.toString()+").")}r.sort(function(F,B){return M.getSizeInBytes(e[B].componentDatatype)-M.getSizeInBytes(e[F].componentDatatype)});var f=0,v={};for(n=0;n<l;++n)t=r[n],o=e[t],v[t]=f,f+=Ai(o);if(f>0){var p=M.getSizeInBytes(e[r[0]].componentDatatype),s=f%p;s!==0&&(f+=p-s);var d=i*f,g=new ArrayBuffer(d),C={};for(n=0;n<l;++n){t=r[n];var y=M.getSizeInBytes(e[t].componentDatatype);C[t]={pointer:M.createTypedArray(e[t].componentDatatype,g),index:v[t]/y,strideInComponentType:f/y}}for(n=0;n<i;++n)for(var S=0;S<l;++S){t=r[S],o=e[t];for(var O=o.values,R=C[t],U=R.pointer,V=o.componentsPerAttribute,D=0;D<V;++D)U[R.index+D]=O[n*V+D];R.index+=R.strideInComponentType}return{buffer:g,offsetsInBytes:v,vertexSizeInBytes:f}}}ie.fromGeometry=function(e){e=h(e,h.EMPTY_OBJECT),q.defined("options.context",e.context);var n=e.context,t=h(e.geometry,h.EMPTY_OBJECT),o=h(e.bufferUsage,Se.DYNAMIC_DRAW),r=h(e.attributeLocations,h.EMPTY_OBJECT),i=h(e.interleave,!1),l=e.vertexArrayAttributes,m,f,v,p=u(l)?l:[],s=t.attributes;if(i){var d=Di(s);if(u(d)){v=fe.createVertexBuffer({context:n,typedArray:d.buffer,usage:o});var g=d.offsetsInBytes,C=d.vertexSizeInBytes;for(m in s)s.hasOwnProperty(m)&&u(s[m])&&(f=s[m],u(f.values)?p.push({index:r[m],vertexBuffer:v,componentDatatype:f.componentDatatype,componentsPerAttribute:f.componentsPerAttribute,normalize:f.normalize,offsetInBytes:g[m],strideInBytes:C}):p.push({index:r[m],value:f.value,componentDatatype:f.componentDatatype,normalize:f.normalize}))}}else for(m in s)if(s.hasOwnProperty(m)&&u(s[m])){f=s[m];var y=f.componentDatatype;y===M.DOUBLE&&(y=M.FLOAT),v=void 0,u(f.values)&&(v=fe.createVertexBuffer({context:n,typedArray:M.createTypedArray(y,f.values),usage:o})),p.push({index:r[m],vertexBuffer:v,value:f.value,componentDatatype:y,componentsPerAttribute:f.componentsPerAttribute,normalize:f.normalize})}var S,O=t.indices;return u(O)&&(cn.computeNumberOfVertices(t)>=N.SIXTY_FOUR_KILOBYTES&&n.elementIndexUint?S=fe.createIndexBuffer({context:n,typedArray:new Uint32Array(O),usage:o,indexDatatype:Le.UNSIGNED_INT}):S=fe.createIndexBuffer({context:n,typedArray:new Uint16Array(O),usage:o,indexDatatype:Le.UNSIGNED_SHORT})),new ie({context:n,attributes:p,indexBuffer:S})};Object.defineProperties(ie.prototype,{numberOfAttributes:{get:function(){return this._attributes.length}},numberOfVertices:{get:function(){return this._numberOfVertices}},indexBuffer:{get:function(){return this._indexBuffer}}});ie.prototype.getAttribute=function(e){return q.defined("index",e),this._attributes[e]};function Oi(e){var n=e._context,t=e._hasInstancedAttributes;if(!(!t&&!n._previousDrawInstanced)){n._previousDrawInstanced=t;var o=n._vertexAttribDivisors,r=e._attributes,i=Z.maximumVertexAttributes,l;if(t){var m=r.length;for(l=0;l<m;++l){var f=r[l];if(f.enabled){var v=f.instanceDivisor,p=f.index;v!==o[p]&&(n.glVertexAttribDivisor(p,v),o[p]=v)}}}else for(l=0;l<i;++l)o[l]>0&&(n.glVertexAttribDivisor(l,0),o[l]=0)}}function Ii(e,n){for(var t=e._attributes,o=t.length,r=0;r<o;++r){var i=t[r];i.enabled&&u(i.value)&&i.vertexAttrib(n)}}ie.prototype._bind=function(){u(this._vao)?(this._context.glBindVertexArray(this._vao),this._context.instancedArrays&&Oi(this),this._hasConstantAttributes&&Ii(this,this._gl)):mn(this._gl,this._attributes,this._indexBuffer)};ie.prototype._unBind=function(){if(u(this._vao))this._context.glBindVertexArray(null);else{for(var e=this._attributes,n=this._gl,t=0;t<e.length;++t){var o=e[t];o.enabled&&o.disableVertexAttribArray(n)}this._indexBuffer&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,null)}};ie.prototype.isDestroyed=function(){return!1};ie.prototype.destroy=function(){for(var e=this._attributes,n=0;n<e.length;++n){var t=e[n].vertexBuffer;u(t)&&!t.isDestroyed()&&t.vertexArrayDestroyable&&t.destroy()}var o=this._indexBuffer;return u(o)&&!o.isDestroyed()&&o.vertexArrayDestroyable&&o.destroy(),u(this._vao)&&this._context.glDeleteVertexArray(this._vao),Ie(this)};var dn=ie;function ue(e){e=h(e,h.EMPTY_OBJECT),this._boundingVolume=e.boundingVolume,this._orientedBoundingBox=e.orientedBoundingBox,this._cull=h(e.cull,!0),this._occlude=h(e.occlude,!0),this._modelMatrix=e.modelMatrix,this._primitiveType=h(e.primitiveType,Oe.TRIANGLES),this._vertexArray=e.vertexArray,this._count=e.count,this._offset=h(e.offset,0),this._instanceCount=h(e.instanceCount,0),this._shaderProgram=e.shaderProgram,this._uniformMap=e.uniformMap,this._renderState=e.renderState,this._framebuffer=e.framebuffer,this._pass=e.pass,this._executeInClosestFrustum=h(e.executeInClosestFrustum,!1),this._owner=e.owner,this._debugShowBoundingVolume=h(e.debugShowBoundingVolume,!1),this._debugOverlappingFrustums=0,this._castShadows=h(e.castShadows,!1),this._receiveShadows=h(e.receiveShadows,!1),this._selectCastShadows=!1,this._pickId=e.pickId,this._pickOnly=h(e.pickOnly,!1),this.dirty=!0,this.lastDirtyTime=0,this.derivedCommands={},this._uniformBuffers=[]}Object.defineProperties(ue.prototype,{boundingVolume:{get:function(){return this._boundingVolume},set:function(e){this._boundingVolume!==e&&(this._boundingVolume=e,this.dirty=!0)}},orientedBoundingBox:{get:function(){return this._orientedBoundingBox},set:function(e){this._orientedBoundingBox!==e&&(this._orientedBoundingBox=e,this.dirty=!0)}},cull:{get:function(){return this._cull},set:function(e){this._cull!==e&&(this._cull=e,this.dirty=!0)}},occlude:{get:function(){return this._occlude},set:function(e){this._occlude!==e&&(this._occlude=e,this.dirty=!0)}},test:{get:function(){return this._test},set:function(e){this._test=e}},modelMatrix:{get:function(){return this._modelMatrix},set:function(e){this._modelMatrix!==e&&(this._modelMatrix=e,this.dirty=!0)}},primitiveType:{get:function(){return this._primitiveType},set:function(e){this._primitiveType!==e&&(this._primitiveType=e,this.dirty=!0)}},vertexArray:{get:function(){return this._vertexArray},set:function(e){this._vertexArray!==e&&(this._vertexArray=e,this.dirty=!0)}},count:{get:function(){return this._count},set:function(e){this._count!==e&&(this._count=e,this.dirty=!0)}},offset:{get:function(){return this._offset},set:function(e){this._offset!==e&&(this._offset=e,this.dirty=!0)}},instanceCount:{get:function(){return this._instanceCount},set:function(e){this._instanceCount!==e&&(this._instanceCount=e,this.dirty=!0)}},shaderProgram:{get:function(){return this._shaderProgram},set:function(e){this._shaderProgram!==e&&(this._shaderProgram=e,this.dirty=!0)}},castShadows:{get:function(){return this._castShadows},set:function(e){this._castShadows!==e&&(this._castShadows=e,this.dirty=!0)}},selectCastShadows:{get:function(){return this._selectCastShadows},set:function(e){this._selectCastShadows!==e&&(this._selectCastShadows=e,this.dirty=!0)}},receiveShadows:{get:function(){return this._receiveShadows},set:function(e){this._receiveShadows!==e&&(this._receiveShadows=e,this.dirty=!0)}},uniformMap:{get:function(){return this._uniformMap},set:function(e){this._uniformMap!==e&&(this._uniformMap=e,this.dirty=!0)}},renderState:{get:function(){return this._renderState},set:function(e){this._renderState!==e&&(this._renderState=e,this.dirty=!0)}},framebuffer:{get:function(){return this._framebuffer},set:function(e){this._framebuffer!==e&&(this._framebuffer=e,this.dirty=!0)}},pass:{get:function(){return this._pass},set:function(e){this._pass!==e&&(this._pass=e,this.dirty=!0)}},executeInClosestFrustum:{get:function(){return this._executeInClosestFrustum},set:function(e){this._executeInClosestFrustum!==e&&(this._executeInClosestFrustum=e,this.dirty=!0)}},owner:{get:function(){return this._owner},set:function(e){this._owner!==e&&(this._owner=e,this.dirty=!0)}},debugShowBoundingVolume:{get:function(){return this._debugShowBoundingVolume},set:function(e){this._debugShowBoundingVolume!==e&&(this._debugShowBoundingVolume=e,this.dirty=!0)}},debugOverlappingFrustums:{get:function(){return this._debugOverlappingFrustums},set:function(e){this._debugOverlappingFrustums!==e&&(this._debugOverlappingFrustums=e,this.dirty=!0)}},pickId:{get:function(){return this._pickId},set:function(e){this._pickId!==e&&(this._pickId=e,this.dirty=!0)}},pickOnly:{get:function(){return this._pickOnly},set:function(e){this._pickOnly!==e&&(this._pickOnly=e,this.dirty=!0)}}});ue.prototype.addUniformBuffer=function(e){e.increaseRef(),this._uniformBuffers.push(e)};ue.prototype.removeAllUniformBuffer=function(){if(!!u(this._uniformBuffers)){for(var e=0;e<this._uniformBuffers.length;e++)this._uniformBuffers[e].decreaseRef();this._uniformBuffers=[]}};ue.shallowClone=function(e,n){if(!!u(e))return u(n)||(n=new ue),n._boundingVolume=e._boundingVolume,n._orientedBoundingBox=e._orientedBoundingBox,n._cull=e._cull,n._occlude=e._occlude,n._modelMatrix=e._modelMatrix,n._primitiveType=e._primitiveType,n._vertexArray=e._vertexArray,n._count=e._count,n._offset=e._offset,n._instanceCount=e._instanceCount,n._shaderProgram=e._shaderProgram,n._uniformMap=e._uniformMap,n._uniformBuffers=e._uniformBuffers,n._renderState=e._renderState,n._framebuffer=e._framebuffer,n._pass=e._pass,n._executeInClosestFrustum=e._executeInClosestFrustum,n._owner=e._owner,n._debugShowBoundingVolume=e._debugShowBoundingVolume,n._debugOverlappingFrustums=e._debugOverlappingFrustums,n._castShadows=e._castShadows,n._receiveShadows=e._receiveShadows,n._selectCastShadows=e._selectCastShadows,n._pickId=e._pickId,n._pickOnly=e._pickOnly,n._pointCloudEyeDomeLighting=e._pointCloudEyeDomeLighting,n.dirty=!0,n.lastDirtyTime=0,n};ue.prototype.removeAllFastBundleAndBindGroups=function(){this.bindGroups=void 0,this._fastBundle={}};ue.prototype.execute=function(e,n){e.draw(this,n)};var pn=ue;function Ri(e,n){var t=/#define OUTPUT_DECLARATION/,o=e.split(`
`);if(/#version 300 es/g.test(e))return e;var r=-1,i,l;for(i=0;i<o.length;++i)if(l=o[i],t.test(l)){r=i;break}if(r===-1)throw new x("Could not find a #define OUTPUT_DECLARATION!");var m=[];for(i=0;i<10;i++){var f="gl_FragData\\["+i+"\\]",v="czm_out"+i,p=new RegExp(f,"g");p.test(e)&&(vn(v,m),ae(f,v,o),o.splice(r,0,"layout(location = "+i+") out vec4 "+v+";"),r+=1)}var s="czm_fragColor";Pi("gl_FragColor",o)&&(vn(s,m),ae("gl_FragColor",s,o),o.splice(r,0,"layout(location = 0) out vec4 czm_fragColor;"),r+=1);var d=Fi(m,o),g={};for(i=0;i<o.length;i++){l=o[i];for(var C in d)if(d.hasOwnProperty(C)){var y=new RegExp("(layout)[^]+(out)[^]+("+C+")[^]+","g");y.test(l)&&(g[l]=C)}}for(var S in g)if(g.hasOwnProperty(S)){var O=g[S],R=o.indexOf(S),U=d[O],V=U.length,D;for(D=0;D<V;D++)o.splice(R,0,U[D]);for(R+=V+1,D=V-1;D>=0;D--)o.splice(R,0,"#endif //"+U[D])}var F="#version 300 es",B=!1;for(i=0;i<o.length;i++)/#version/.test(o[i])&&(o[i]=F,B=!0);return B||o.splice(0,0,F),hn("EXT_draw_buffers",o),hn("EXT_frag_depth",o),ae("texture2D","texture",o),ae("texture3D","texture",o),ae("textureCube","texture",o),ae("gl_FragDepthEXT","gl_FragDepth",o),n?ae("varying","in",o):(ae("attribute","in",o),ae("varying","out",o)),Vi(o)}function ae(e,n,t){for(var o="(^|[^\\w])("+e+")($|[^\\w])",r=new RegExp(o,"g"),i=t.length,l=0;l<i;++l){var m=t[l];t[l]=m.replace(r,"$1"+n+"$3")}}function Mi(e,n,t){for(var o=t.length,r=0;r<o;++r){var i=t[r];t[r]=i.replace(e,n)}}function Pi(e,n){for(var t="(^|[^\\w])("+e+")($|[^\\w])",o=new RegExp(t,"g"),r=n.length,i=0;i<r;++i){var l=n[i];if(o.test(l))return!0}return!1}function Vi(e){for(var n="",t=e.length,o=0;o<t;++o)n+=e[o]+`
`;return n}function vn(e,n){n.indexOf(e)===-1&&n.push(e)}function Fi(e,n){for(var t={},o=e.length,r=[],i=0;i<n.length;++i){var l=n[i],m=/(#ifdef|#if)/g.test(l),f=/#else/g.test(l),v=/#endif/g.test(l);if(m)r.push(l);else if(f){var p=r[r.length-1],s=p.replace("ifdef","ifndef");/if/g.test(s)&&(s=s.replace(/(#if\s+)(\S*)([^]*)/,"$1!($2)$3")),r.pop(),r.push(s)}else if(v)r.pop();else if(!/layout/g.test(l))for(var d=0;d<o;++d){var g=e[d];l.indexOf(g)!==-1&&(u(t[g])?t[g]=t[g].filter(function(C){return r.indexOf(C)>=0}):t[g]=r.slice())}}return t}function hn(e,n){var t="#extension\\s+GL_"+e+"\\s+:\\s+[a-zA-Z0-9]+\\s*$";Mi(new RegExp(t,"g"),"",n)}var gn=Ri;var Bi=new a;function _(e){this._size=e.size,this._datatype=e.datatype,this.getValue=e.getValue}var P={};P[c.FLOAT]="float";P[c.FLOAT_VEC2]="vec2";P[c.FLOAT_VEC3]="vec3";P[c.FLOAT_VEC4]="vec4";P[c.INT]="int";P[c.INT_VEC2]="ivec2";P[c.INT_VEC3]="ivec3";P[c.INT_VEC4]="ivec4";P[c.BOOL]="bool";P[c.BOOL_VEC2]="bvec2";P[c.BOOL_VEC3]="bvec3";P[c.BOOL_VEC4]="bvec4";P[c.FLOAT_MAT2]="mat2";P[c.FLOAT_MAT3]="mat3";P[c.FLOAT_MAT4]="mat4";P[c.SAMPLER_2D]="sampler2D";P[c.SAMPLER_CUBE]="samplerCube";_.prototype.getDeclaration=function(e){var n="uniform "+P[this._datatype]+" "+e,t=this._size;return t===1?n+=";":n+="["+t.toString()+"];",n};var Ni={czm_viewport:new _({size:1,datatype:c.FLOAT_VEC4,getValue:function(e){return e.viewportCartesian4}}),czm_currentViewportOffset:new _({size:1,datatype:c.FLOAT_VEC4,getValue:function(e){return e.viewportOffset}}),czm_viewportOrthographic:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.viewportOrthographic}}),czm_viewportTransformation:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.viewportTransformation}}),czm_globeDepthTexture:new _({size:1,datatype:c.SAMPLER_2D,getValue:function(e){return e.globeDepthTexture}}),czm_model:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.model}}),czm_inverseModel:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.inverseModel}}),czm_view:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.view}}),czm_view3D:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.view3D}}),czm_viewRotation:new _({size:1,datatype:c.FLOAT_MAT3,getValue:function(e){return e.viewRotation}}),czm_viewRotation3D:new _({size:1,datatype:c.FLOAT_MAT3,getValue:function(e){return e.viewRotation3D}}),czm_inverseView:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.inverseView}}),czm_inverseView3D:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.inverseView3D}}),czm_inverseViewRotation:new _({size:1,datatype:c.FLOAT_MAT3,getValue:function(e){return e.inverseViewRotation}}),czm_inverseViewRotation3D:new _({size:1,datatype:c.FLOAT_MAT3,getValue:function(e){return e.inverseViewRotation3D}}),czm_projection:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.projection}}),czm_inverseProjection:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.inverseProjection}}),czm_infiniteProjection:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.infiniteProjection}}),czm_modelView:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.modelView}}),czm_modelView3D:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.modelView3D}}),czm_modelViewRelativeToEye:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.modelViewRelativeToEye}}),czm_inverseModelView:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.inverseModelView}}),czm_inverseModelView3D:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.inverseModelView3D}}),czm_viewProjection:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.viewProjection}}),czm_inverseViewProjection:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.inverseViewProjection}}),czm_modelViewProjection:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.modelViewProjection}}),czm_inverseModelViewProjection:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.inverseModelViewProjection}}),czm_modelViewProjectionRelativeToEye:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.modelViewProjectionRelativeToEye}}),czm_modelViewInfiniteProjection:new _({size:1,datatype:c.FLOAT_MAT4,getValue:function(e){return e.modelViewInfiniteProjection}}),czm_orthographicIn3D:new _({size:1,datatype:c.FLOAT,getValue:function(e){return e.orthographicIn3D?1:0}}),czm_normal:new _({size:1,datatype:c.FLOAT_MAT3,getValue:function(e){return e.normal}}),czm_normal3D:new _({size:1,datatype:c.FLOAT_MAT3,getValue:function(e){return e.normal3D}}),czm_inverseNormal:new _({size:1,datatype:c.FLOAT_MAT3,getValue:function(e){return e.inverseNormal}}),czm_inverseNormal3D:new _({size:1,datatype:c.FLOAT_MAT3,getValue:function(e){return e.inverseNormal3D}}),czm_eyeHeight2D:new _({size:1,datatype:c.FLOAT_VEC2,getValue:function(e){return e.eyeHeight2D}}),czm_entireFrustum:new _({size:1,datatype:c.FLOAT_VEC2,getValue:function(e){return e.entireFrustum}}),czm_currentFrustum:new _({size:1,datatype:c.FLOAT_VEC2,getValue:function(e){return e.currentFrustum}}),czm_frustumPlanes:new _({size:1,datatype:c.FLOAT_VEC4,getValue:function(e){return e.frustumPlanes}}),czm_farDepthFromNearPlusOne:new _({size:1,datatype:c.FLOAT,getValue:function(e){return e.farDepthFromNearPlusOne}}),czm_log2FarDepthFromNearPlusOne:new _({size:1,datatype:c.FLOAT,getValue:function(e){return e.log2FarDepthFromNearPlusOne}}),czm_oneOverLog2FarDepthFromNearPlusOne:new _({size:1,datatype:c.FLOAT,getValue:function(e){return e.oneOverLog2FarDepthFromNearPlusOne}}),czm_sunPositionWC:new _({size:1,datatype:c.FLOAT_VEC3,getValue:function(e){return e.sunPositionWC}}),czm_sunPositionColumbusView:new _({size:1,datatype:c.FLOAT_VEC3,getValue:function(e){return e.sunPositionColumbusView}}),czm_sunDirectionEC:new _({size:1,datatype:c.FLOAT_VEC3,getValue:function(e){return e.sunDirectionEC}}),czm_sunDirectionWC:new _({size:1,datatype:c.FLOAT_VEC3,getValue:function(e){return e.sunDirectionWC}}),czm_moonDirectionEC:new _({size:1,datatype:c.FLOAT_VEC3,getValue:function(e){return e.moonDirectionEC}}),czm_lightDirectionEC:new _({size:1,datatype:c.FLOAT_VEC3,getValue:function(e){return e.lightDirectionEC}}),czm_lightDirectionWC:new _({size:1,datatype:c.FLOAT_VEC3,getValue:function(e){return e.lightDirectionWC}}),czm_lightColor:new _({size:1,datatype:c.FLOAT_VEC3,getValue:function(e){return e.lightColor}}),czm_lightColorHdr:new _({size:1,datatype:c.FLOAT_VEC3,getValue:function(e){return e.lightColorHdr}}),czm_encodedCameraPositionMCHigh:new _({size:1,datatype:c.FLOAT_VEC3,getValue:function(e){return e.encodedCameraPositionMCHigh}}),czm_encodedCameraPositionMCLow:new _({size:1,datatype:c.FLOAT_VEC3,getValue:function(e){return e.encodedCameraPositionMCLow}}),czm_cameraPositionWC:new _({size:1,datatype:c.FLOAT_VEC3,getValue:function(e){return e._cameraPosition}}),czm_viewerPositionWC:new _({size:1,datatype:c.FLOAT_VEC3,getValue:function(e){return G.getTranslation(e.inverseView,Bi)}}),czm_frameNumber:new _({size:1,datatype:c.FLOAT,getValue:function(e){return e.frameState.frameNumber}}),czm_morphTime:new _({size:1,datatype:c.FLOAT,getValue:function(e){return e.frameState.morphTime}}),czm_sceneMode:new _({size:1,datatype:c.FLOAT,getValue:function(e){return e.frameState.mode}}),czm_pass:new _({size:1,datatype:c.FLOAT,getValue:function(e){return e.pass}}),czm_backgroundColor:new _({size:1,datatype:c.FLOAT_VEC4,getValue:function(e){return e.backgroundColor}}),czm_brdfLut:new _({size:1,datatype:c.SAMPLER_2D,getValue:function(e){return e.brdfLut}}),czm_environmentMap:new _({size:1,datatype:c.SAMPLER_CUBE,getValue:function(e){return e.environmentMap}}),czm_specularEnvironmentMaps:new _({size:1,datatype:c.SAMPLER_2D,getValue:function(e){return e.specularEnvironmentMaps}}),czm_specularEnvironmentMapSize:new _({size:1,datatype:c.FLOAT_VEC2,getValue:function(e){return e.specularEnvironmentMapsDimensions}}),czm_specularEnvironmentMapsMaximumLOD:new _({size:1,datatype:c.FLOAT,getValue:function(e){return e.specularEnvironmentMapsMaximumLOD}}),czm_sphericalHarmonicCoefficients:new _({size:9,datatype:c.FLOAT_VEC3,getValue:function(e){return e.sphericalHarmonicCoefficients}}),czm_SH:new _({size:7,datatype:c.FLOAT_VEC4,getValue:function(e){return e.sphericalHarmonics.shArr}}),czm_temeToPseudoFixed:new _({size:1,datatype:c.FLOAT_MAT3,getValue:function(e){return e.temeToPseudoFixedMatrix}}),czm_pixelRatio:new _({size:1,datatype:c.FLOAT,getValue:function(e){return e.pixelRatio}}),czm_resolutionScale:new _({size:1,datatype:c.FLOAT,getValue:function(e){return e.resolutionScale}}),czm_fogDensity:new _({size:1,datatype:c.FLOAT,getValue:function(e){return e.fogDensity}}),czm_imagerySplitPosition:new _({size:1,datatype:c.FLOAT_VEC2,getValue:function(e){return e.imagerySplitPosition}}),czm_globeSplitPosition:new _({size:1,datatype:c.FLOAT_VEC2,getValue:function(e){return e.globeSplitPosition}}),czm_geometricToleranceOverMeter:new _({size:1,datatype:c.FLOAT,getValue:function(e){return e.geometricToleranceOverMeter}}),czm_minimumDisableDepthTestDistance:new _({size:1,datatype:c.FLOAT,getValue:function(e){return e.minimumDisableDepthTestDistance}}),czm_invertClassificationColor:new _({size:1,datatype:c.FLOAT_VEC4,getValue:function(e){return e.invertClassificationColor}}),czm_gamma:new _({size:1,datatype:c.FLOAT,getValue:function(e){return e.gamma}}),czm_sunColor:new _({size:1,datatype:c.FLOAT_VEC3,getValue:function(e){return e.sunColor}}),czm_globeDepthTextureDim:new _({size:1,datatype:c.FLOAT_VEC2,getValue:function(e){return e.globeDepthTextureDim}}),czm_nonSelDepthTexture:new _({size:1,datatype:c.SAMPLER_2D,getValue:function(e){return e.nonSelDepthTexture}}),czm_maskTexture:new _({size:1,datatype:c.SAMPLER_2D,getValue:function(e){return e.maskTexture}}),czm_hdrEnvMap:new _({size:1,datatype:c.SAMPLER_2D,getValue:function(e){return e.hdrEnvMap}}),czm_toneMappingExposure:new _({size:1,datatype:c.FLOAT,getValue:function(e){return e.toneMappingExposure}})},Ce=Ni;function _n(e){}_n.removeUnuseMacroCode=function(e,n,t){if(!Hi(t))return t;var o=ki(t),r=[];return Yi(e,n,o,t,r),ji(t,r)};function Hi(e){return!(e.indexOf("defined",0)>=0||e.indexOf("#if ",0)>=0||e.indexOf("#elif ",0)>=0)}function Ui(e,n,t){var o=e.indexOf(`
`,t+n+1),r=t+n+1;return e.substring(r,o)}function xn(e){this.ifIndex=u(e.ifIndex)?e.ifIndex:void 0,this.elseIndex=u(e.elseIndex)?e.elseIndex:void 0,this.endIndex=u(e.endIndex)?e.endIndex:void 0,this.ifChildTokens=[],this.elseChildTokens=[],this.parentToken=u(e.parentToken)?e.parentToken:void 0,this.type=u(e.type)?e.type:void 0}xn.prototype.addChildToken=function(e){u(this.elseIndex)?this.elseChildTokens.push(e):this.ifChildTokens.push(e)};function pe(e,n){this.Key=e,this.String=n,this.StringLength=n.length}pe.isEqual=function(e,n){return e.Key===n.Key};var $={TK_IFDEF:new pe(0,"#ifdef"),TK_IFNEF:new pe(1,"#ifndef"),TK_ELSE:new pe(2,"#else"),TK_END:new pe(3,"#endif")};function Gi(e,n){var t=-1,o=$.TK_IFDEF;for(var r in $){var i=$[r],l=e.indexOf(i.String,n);(t===-1||l>=0&&l<t)&&(t=l,o=i)}return{type:o,findIndex:t}}function ki(e){for(var n=[],t=0,o=0,r=void 0;t!==-1;){var i=Gi(e,o);if(t=i.findIndex,o=t+i.type.StringLength,t===-1)break;switch(i.type.Key){case $.TK_IFDEF.Key:case $.TK_IFNEF.Key:{var l=new xn({type:i.type,ifIndex:t});u(r)?u(r.endIndex)?(u(r.parentToken)||n.push(l),r=l):(r.addChildToken(l),l.parentToken=r,r=l):(r=l,n.push(l));break}case $.TK_ELSE.Key:{if(!u(r))continue;r.elseIndex=t;break}case $.TK_END.Key:{if(!u(r))continue;r.endIndex=t,u(r.parentToken)&&(r=r.parentToken);break}default:break}}return n}function Wi(e,n,t){return pe.isEqual(t,$.TK_IFDEF)&&u(e[n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")])?!0:!!(pe.isEqual(t,$.TK_IFNEF)&&!u(e[n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")]))}function qe(e,n,t,o){var r=0,i=0,l=e.type.StringLength,m=Ui(t,l,e.ifIndex),f=Wi(n,m,e.type);if(f){u(e.elseIndex)&&(r=e.elseIndex+$.TK_ELSE.StringLength+1,o.push({startIndex:r,endIndex:e.endIndex}));for(var v=0;v<e.ifChildTokens.length;v++)qe(e.ifChildTokens[v],n,t,o)}else{u(e.elseIndex)?o.push({startIndex:e.ifIndex+e.type.StringLength+qi(t,e.ifIndex,e.type.String)+m.length,endIndex:e.elseIndex}):o.push({startIndex:e.ifIndex,endIndex:e.endIndex+$.TK_END.StringLength});for(var v=0;v<e.elseChildTokens.length;v++)qe(e.elseChildTokens[v],n,t,o)}}function qi(e,n,t){for(var o=t.length,r=n+o;r<e.length;r++){var i=e.charAt(r);if(i!==" ")break}return r-(n+o)}function Xi(e,n,t){var o=n.defines,r={};if(u(o))for(var i=0;i<o.length;++i){var l=o[i];r[l]=1}if(u(e._sysShaderDefines))for(var i=0;i<e._sysShaderDefines.length;++i){var m=e._sysShaderDefines[i];r[m]=1}for(var f=0,v=0;f!==-1&&(f=t.indexOf("#define ",v),f!==-1);){var p=f+8,s=t.indexOf(`
`,f),d=t.substring(p,s).trim();r[d]=1,v=s}return r}function Yi(e,n,t,o,r){if(t.length!==0)for(var i=Xi(e,n,o),l=0;l<t.length;l++){var m=t[l];qe(m,i,o,r)}}function ji(e,n){for(var t=e,o=0;o<n.length;o++){var r=n[o];if(r.endIndex-r.startIndex>1){var i=e.substring(r.startIndex,r.endIndex);t=t.replace(i,"")}}return t=t.replace(/(#ifdef|#ifndef|#else|#endif).*/gm,""),t}var Xe=_n;var Cn=`/**
 * A built-in GLSL floating-point constant for converting radians to degrees.
 *
 * @alias czm_degreesPerRadian
 * @glslConstant
 *
 * @see CesiumMath.DEGREES_PER_RADIAN
 *
 * @example
 * // GLSL declaration
 * const float czm_degreesPerRadian = ...;
 *
 * // Example
 * float deg = czm_degreesPerRadian * rad;
 */
const float czm_degreesPerRadian = 57.29577951308232;
`;var Tn=`/**
 * A built-in GLSL vec2 constant for defining the depth range.
 * This is a workaround to a bug where IE11 does not implement gl_DepthRange.
 *
 * @alias czm_depthRange
 * @glslConstant
 *
 * @example
 * // GLSL declaration
 * float depthRangeNear = czm_depthRange.near;
 * float depthRangeFar = czm_depthRange.far;
 *
 */
const czm_depthRangeStruct czm_depthRange = czm_depthRangeStruct(0.0, 1.0);
`;var yn=`/**
 * The reciprocal of the radius of the WGS84 ellipsoid.
 *
 * @name czm_ellipsoidInverseRadii
 * @glslConstant
 */
const vec3 czm_ellipsoidInverseRadii = vec3(1.0 / 6378137.0, 1.0 / 6378137.0, 1.0 / 6356752.314245);
`;var zn=`/**
 * The radius of the WGS84 ellipsoid.
 *
 * @name czm_ellipsoidRadii
 * @glslConstant
 */
const vec3 czm_ellipsoidRadii = vec3(6378137.0, 6378137.0, 6356752.314245);
`;var bn=`/**
 * 0.1
 *
 * @name czm_epsilon1
 * @glslConstant
 */
const float czm_epsilon1 = 0.1;
`;var wn=`/**
 * 0.01
 *
 * @name czm_epsilon2
 * @glslConstant
 */
const float czm_epsilon2 = 0.01;
`;var Ln=`/**
 * 0.001
 *
 * @name czm_epsilon3
 * @glslConstant
 */
const float czm_epsilon3 = 0.001;
`;var Sn=`/**
 * 0.0001
 *
 * @name czm_epsilon4
 * @glslConstant
 */
const float czm_epsilon4 = 0.0001;
`;var En=`/**
 * 0.00001
 *
 * @name czm_epsilon5
 * @glslConstant
 */
const float czm_epsilon5 = 0.00001;
`;var An=`/**
 * 0.000001
 *
 * @name czm_epsilon6
 * @glslConstant
 */
const float czm_epsilon6 = 0.000001;
`;var Dn=`/**
 * 0.0000001
 *
 * @name czm_epsilon7
 * @glslConstant
 */
const float czm_epsilon7 = 0.0000001;
`;var On=`/**
 * DOC_TBA
 *
 * @name czm_infinity
 * @glslConstant
 */
const float czm_infinity = 5906376272000.0;  // Distance from the Sun to Pluto in meters.  TODO: What is best given lowp, mediump, and highp?
`;var In=`/**
 * A built-in GLSL floating-point constant for <code>1/pi</code>.
 *
 * @alias czm_oneOverPi
 * @glslConstant
 *
 * @see CesiumMath.ONE_OVER_PI
 *
 * @example
 * // GLSL declaration
 * const float czm_oneOverPi = ...;
 *
 * // Example
 * float pi = 1.0 / czm_oneOverPi;
 */
const float czm_oneOverPi = 0.3183098861837907;
`;var Rn=`/**
 * A built-in GLSL floating-point constant for <code>1/2pi</code>.
 *
 * @alias czm_oneOverTwoPi
 * @glslConstant
 *
 * @see CesiumMath.ONE_OVER_TWO_PI
 *
 * @example
 * // GLSL declaration
 * const float czm_oneOverTwoPi = ...;
 *
 * // Example
 * float pi = 2.0 * czm_oneOverTwoPi;
 */
const float czm_oneOverTwoPi = 0.15915494309189535;
`;var Mn=`/**
 * The automatic GLSL constant for {@link Pass#CESIUM_3D_TILE}
 *
 * @name czm_passCesium3DTile
 * @glslConstant
 *
 * @see czm_pass
 */
const float czm_passCesium3DTile = 4.0;
`;var Pn=`/**
 * The automatic GLSL constant for {@link Pass#CESIUM_3D_TILE_CLASSIFICATION}
 *
 * @name czm_passCesium3DTileClassification
 * @glslConstant
 *
 * @see czm_pass
 */
const float czm_passCesium3DTileClassification = 5.0;
`;var Vn=`/**
 * The automatic GLSL constant for {@link Pass#CESIUM_3D_TILE_CLASSIFICATION_IGNORE_SHOW}
 *
 * @name czm_passCesium3DTileClassificationIgnoreShow
 * @glslConstant
 *
 * @see czm_pass
 */
const float czm_passCesium3DTileClassificationIgnoreShow = 6.0;
`;var Fn=`/**
 * The automatic GLSL constant for {@link Pass#CLASSIFICATION}
 *
 * @name czm_passClassification
 * @glslConstant
 *
 * @see czm_pass
 */
const float czm_passClassification = 7.0;
`;var Bn=`/**
 * The automatic GLSL constant for {@link Pass#COMPUTE}
 *
 * @name czm_passCompute
 * @glslConstant
 *
 * @see czm_pass
 */
const float czm_passCompute = 1.0;
`;var Nn=`/**
 * The automatic GLSL constant for {@link Pass#ENVIRONMENT}
 *
 * @name czm_passEnvironment
 * @glslConstant
 *
 * @see czm_pass
 */
const float czm_passEnvironment = 0.0;
`;var Hn=`/**
 * The automatic GLSL constant for {@link Pass#GLOBE}
 *
 * @name czm_passGlobe
 * @glslConstant
 *
 * @see czm_pass
 */
const float czm_passGlobe = 2.0;
`;var Un=`/**
 * The automatic GLSL constant for {@link Pass#GROUND}
 *
 * @name czm_passGround
 * @glslConstant
 *
 * @see czm_pass
 */
const float czm_passGround = 4.0;
`;var Gn=`/**
 * The automatic GLSL constant for {@link Pass#OPAQUE}
 *
 * @name czm_passOpaque
 * @glslConstant
 *
 * @see czm_pass
 */
const float czm_passOpaque = 12.0;
`;var kn=`/**
 * The automatic GLSL constant for {@link Pass#OVERLAY}
 *
 * @name czm_passOverlay
 * @glslConstant
 *
 * @see czm_pass
 */
const float czm_passOverlay = 20.0;`;var Wn=`/**
 * The automatic GLSL constant for {@link Pass#TERRAIN_CLASSIFICATION}
 *
 * @name czm_passTerrainClassification
 * @glslConstant
 *
 * @see czm_pass
 */
const float czm_passTerrainClassification = 3.0;
`;var qn=`/**
 * The automatic GLSL constant for {@link Pass#TRANSLUCENT}
 *
 * @name czm_passTranslucent
 * @glslConstant
 *
 * @see czm_pass
 */
const float czm_passTranslucent = 18.0;`;var Xn=`/**
 * A built-in GLSL floating-point constant for <code>Math.PI</code>.
 *
 * @alias czm_pi
 * @glslConstant
 *
 * @see CesiumMath.PI
 *
 * @example
 * // GLSL declaration
 * const float czm_pi = ...;
 *
 * // Example
 * float twoPi = 2.0 * czm_pi;
 */
const float czm_pi = 3.141592653589793;
`;var Yn=`/**
 * A built-in GLSL floating-point constant for <code>pi/4</code>.
 *
 * @alias czm_piOverFour
 * @glslConstant
 *
 * @see CesiumMath.PI_OVER_FOUR
 *
 * @example
 * // GLSL declaration
 * const float czm_piOverFour = ...;
 *
 * // Example
 * float pi = 4.0 * czm_piOverFour;
 */
const float czm_piOverFour = 0.7853981633974483;
`;var jn=`/**
 * A built-in GLSL floating-point constant for <code>pi/6</code>.
 *
 * @alias czm_piOverSix
 * @glslConstant
 *
 * @see CesiumMath.PI_OVER_SIX
 *
 * @example
 * // GLSL declaration
 * const float czm_piOverSix = ...;
 *
 * // Example
 * float pi = 6.0 * czm_piOverSix;
 */
const float czm_piOverSix = 0.5235987755982988;
`;var Zn=`/**
 * A built-in GLSL floating-point constant for <code>pi/3</code>.
 *
 * @alias czm_piOverThree
 * @glslConstant
 *
 * @see CesiumMath.PI_OVER_THREE
 *
 * @example
 * // GLSL declaration
 * const float czm_piOverThree = ...;
 *
 * // Example
 * float pi = 3.0 * czm_piOverThree;
 */
const float czm_piOverThree = 1.0471975511965976;
`;var Kn=`/**
 * A built-in GLSL floating-point constant for <code>pi/2</code>.
 *
 * @alias czm_piOverTwo
 * @glslConstant
 *
 * @see CesiumMath.PI_OVER_TWO
 *
 * @example
 * // GLSL declaration
 * const float czm_piOverTwo = ...;
 *
 * // Example
 * float pi = 2.0 * czm_piOverTwo;
 */
const float czm_piOverTwo = 1.5707963267948966;
`;var Qn=`/**
 * A built-in GLSL floating-point constant for converting degrees to radians.
 *
 * @alias czm_radiansPerDegree
 * @glslConstant
 *
 * @see CesiumMath.RADIANS_PER_DEGREE
 *
 * @example
 * // GLSL declaration
 * const float czm_radiansPerDegree = ...;
 *
 * // Example
 * float rad = czm_radiansPerDegree * deg;
 */
const float czm_radiansPerDegree = 0.017453292519943295;
`;var Jn=`/**
 * The constant identifier for the 2D {@link SceneMode}
 *
 * @name czm_sceneMode2D
 * @glslConstant
 * @see czm_sceneMode
 * @see czm_sceneModeColumbusView
 * @see czm_sceneMode3D
 * @see czm_sceneModeMorphing
 */
const float czm_sceneMode2D = 2.0;
`;var $n=`/**
 * The constant identifier for the 3D {@link SceneMode}
 *
 * @name czm_sceneMode3D
 * @glslConstant
 * @see czm_sceneMode
 * @see czm_sceneMode2D
 * @see czm_sceneModeColumbusView
 * @see czm_sceneModeMorphing
 */
const float czm_sceneMode3D = 3.0;
`;var et=`/**
 * The constant identifier for the Columbus View {@link SceneMode}
 *
 * @name czm_sceneModeColumbusView
 * @glslConstant
 * @see czm_sceneMode
 * @see czm_sceneMode2D
 * @see czm_sceneMode3D
 * @see czm_sceneModeMorphing
 */
const float czm_sceneModeColumbusView = 1.0;
`;var nt=`/**
 * The constant identifier for the Morphing {@link SceneMode}
 *
 * @name czm_sceneModeMorphing
 * @glslConstant
 * @see czm_sceneMode
 * @see czm_sceneMode2D
 * @see czm_sceneModeColumbusView
 * @see czm_sceneMode3D
 */
const float czm_sceneModeMorphing = 0.0;
`;var tt=`/**
 * A built-in GLSL floating-point constant for one solar radius.
 *
 * @alias czm_solarRadius
 * @glslConstant
 *
 * @see CesiumMath.SOLAR_RADIUS
 *
 * @example
 * // GLSL declaration
 * const float czm_solarRadius = ...;
 */
const float czm_solarRadius = 695500000.0;
`;var ot=`/**
 * A built-in GLSL floating-point constant for <code>3pi/2</code>.
 *
 * @alias czm_threePiOver2
 * @glslConstant
 *
 * @see CesiumMath.THREE_PI_OVER_TWO
 *
 * @example
 * // GLSL declaration
 * const float czm_threePiOver2 = ...;
 *
 * // Example
 * float pi = (2.0 / 3.0) * czm_threePiOver2;
 */
const float czm_threePiOver2 = 4.71238898038469;
`;var rt=`/**
 * A built-in GLSL floating-point constant for <code>2pi</code>.
 *
 * @alias czm_twoPi
 * @glslConstant
 *
 * @see CesiumMath.TWO_PI
 *
 * @example
 * // GLSL declaration
 * const float czm_twoPi = ...;
 *
 * // Example
 * float pi = czm_twoPi / 2.0;
 */
const float czm_twoPi = 6.283185307179586;
`;var it=`/**
 * The maximum latitude, in radians, both North and South, supported by a Web Mercator
 * (EPSG:3857) projection.  Technically, the Mercator projection is defined
 * for any latitude up to (but not including) 90 degrees, but it makes sense
 * to cut it off sooner because it grows exponentially with increasing latitude.
 * The logic behind this particular cutoff value, which is the one used by
 * Google Maps, Bing Maps, and Esri, is that it makes the projection
 * square.  That is, the rectangle is equal in the X and Y directions.
 *
 * The constant value is computed as follows:
 *   czm_pi * 0.5 - (2.0 * atan(exp(-czm_pi)))
 *
 * @name czm_webMercatorMaxLatitude
 * @glslConstant
 */
const float czm_webMercatorMaxLatitude = 1.4844222297453324;
`;var at=`/**
 * @name czm_depthRangeStruct
 * @glslStruct
 */
struct czm_depthRangeStruct
{
    float near;
    float far;
};
`;var lt=`/** DOC_TBA
 *
 * @name czm_ellipsoid
 * @glslStruct
 */
struct czm_ellipsoid
{
    vec3 center;
    vec3 radii;
    vec3 inverseRadii;
    vec3 inverseRadiiSquared;
};
`;var ct=`/**
 * Holds material information that can be used for lighting. Returned by all czm_getMaterial functions.
 *
 * @name czm_material
 * @glslStruct
 *
 * @property {vec3} diffuse Incoming light that scatters evenly in all directions.
 * @property {float} specular Intensity of incoming light reflecting in a single direction.
 * @property {float} shininess The sharpness of the specular reflection.  Higher values create a smaller, more focused specular highlight.
 * @property {vec3} normal Surface's normal in eye coordinates. It is used for effects such as normal mapping. The default is the surface's unmodified normal.
 * @property {vec3} emission Light emitted by the material equally in all directions. The default is vec3(0.0), which emits no light.
 * @property {float} alpha Opacity of this material. 0.0 is completely transparent; 1.0 is completely opaque.
 */
struct czm_material
{
    vec3 diffuse;
    float specular;
    float shininess;
    vec3 normal;
    vec3 emission;
    float alpha;
};
`;var st=`/**
 * Used as input to every material's czm_getMaterial function.
 *
 * @name czm_materialInput
 * @glslStruct
 *
 * @property {float} s 1D texture coordinates.
 * @property {vec2} st 2D texture coordinates.
 * @property {vec3} str 3D texture coordinates.
 * @property {vec3} normalEC Unperturbed surface normal in eye coordinates.
 * @property {mat3} tangentToEyeMatrix Matrix for converting a tangent space normal to eye space.
 * @property {vec3} positionToEyeEC Vector from the fragment to the eye in eye coordinates.  The magnitude is the distance in meters from the fragment to the eye.
 * @property {float} height The height of the terrain in meters above or below the WGS84 ellipsoid.  Only available for globe materials.
 * @property {float} slope The slope of the terrain normalized from 0 to 1.  0 is completely vertical, 1 is completely flat.  Only available for globe materials.
 */
struct czm_materialInput
{
    float s;
    vec2 st;
    vec3 str;
    vec3 normalEC;
    mat3 tangentToEyeMatrix;
    vec3 positionToEyeEC;
    float height;
    float slope;
};
`;var ft=`/**
 * DOC_TBA
 *
 * @name czm_ray
 * @glslStruct
 */
struct czm_ray
{
    vec3 origin;
    vec3 direction;
};
`;var ut=`/**
 * DOC_TBA
 *
 * @name czm_raySegment
 * @glslStruct
 */
struct czm_raySegment
{
    float start;
    float stop;
};

/**
 * DOC_TBA
 *
 * @name czm_emptyRaySegment
 * @glslConstant 
 */
const czm_raySegment czm_emptyRaySegment = czm_raySegment(-czm_infinity, -czm_infinity);

/**
 * DOC_TBA
 *
 * @name czm_fullRaySegment
 * @glslConstant 
 */
const czm_raySegment czm_fullRaySegment = czm_raySegment(0.0, czm_infinity);
`;var mt=`struct czm_s3mMaterialInput
{
    vec4 ambientColor;
    vec4 diffuseColor;
    vec4 ambientLightColor;
    vec4 sunLightColor;
    mat4 texMatrix;
    float texture0Width;
    float texture1Width;
    vec3 sunDirectionEC;
    float sunLightON;
    vec3 normalWorld;
    vec3 normalGround;
    vec3 positionWorld;
    vec3 sunDirectionWC;
    vec4 surfaceAlbedo;
};
`;var dt=`struct czm_shadowParameters
{
#ifdef USE_CUBE_MAP_SHADOW
    vec3 texCoords;
#else
    vec2 texCoords;
#endif

    float depthBias;
    float depth;
    float nDotL;
    vec2 texelStepSize;
    float normalShadingSmooth;
    float darkness;
};
`;var pt=`// See:

vec3 czm_acesTonemapping(vec3 color) {
    float g = 0.985;
    float a = 0.065;
    float b = 0.0001;
    float c = 0.433;
    float d = 0.238;

    color = (color * (color + a) - b) / (color * (g * color + c) + d);

    color = clamp(color, 0.0, 1.0);

    return color;
}
`;var vt=`uniform float uBrightness;
uniform float uContrast;
uniform float uHue;
uniform float uSaturation;
uniform float uOneOverGamma;
vec3 czm_adjustColor(vec3 inputColor)
{
    vec3 outputColor = inputColor;
    outputColor.rgb = mix(vec3(0.0), outputColor.rgb, uBrightness);
    outputColor.rgb = mix(vec3(0.5), outputColor.rgb, uContrast);
    outputColor.rgb = czm_hue(outputColor.rgb, uHue);
    outputColor.rgb = clamp(outputColor.rgb, 0.0, 1.0);
    outputColor.rgb = czm_saturation(outputColor.rgb, uSaturation);
    outputColor.rgb = pow(outputColor.rgb, vec3(uOneOverGamma));
    return outputColor;
}`;var ht=`/**
 * @private
 */
float czm_alphaWeight(float a)
{
    float z = (gl_FragCoord.z - czm_viewportTransformation[3][2]) / czm_viewportTransformation[2][2];

    // See Weighted Blended Order-Independent Transparency for examples of different weighting functions:
    return pow(a + 0.01, 4.0) + max(1e-2, min(3.0 * 1e3, 0.003 / (1e-5 + pow(abs(z) / 200.0, 4.0))));
}
`;var gt=`/**
 * Procedural anti-aliasing by blurring two colors that meet at a sharp edge.
 *
 * @name czm_antialias
 * @glslFunction
 *
 * @param {vec4} color1 The color on one side of the edge.
 * @param {vec4} color2 The color on the other side of the edge.
 * @param {vec4} currentcolor The current color, either <code>color1</code> or <code>color2</code>.
 * @param {float} dist The distance to the edge in texture coordinates.
 * @param {float} [fuzzFactor=0.1] Controls the blurriness between the two colors.
 * @returns {vec4} The anti-aliased color.
 *
 * @example
 * // GLSL declarations
 * vec4 czm_antialias(vec4 color1, vec4 color2, vec4 currentColor, float dist, float fuzzFactor);
 * vec4 czm_antialias(vec4 color1, vec4 color2, vec4 currentColor, float dist);
 *
 * // get the color for a material that has a sharp edge at the line y = 0.5 in texture space
 * float dist = abs(textureCoordinates.t - 0.5);
 * vec4 currentColor = mix(bottomColor, topColor, step(0.5, textureCoordinates.t));
 * vec4 color = czm_antialias(bottomColor, topColor, currentColor, dist, 0.1);
 */
vec4 czm_antialias(vec4 color1, vec4 color2, vec4 currentColor, float dist, float fuzzFactor)
{
    float val1 = clamp(dist / fuzzFactor, 0.0, 1.0);
    float val2 = clamp((dist - 0.5) / fuzzFactor, 0.0, 1.0);
    val1 = val1 * (1.0 - val2);
    val1 = val1 * val1 * (3.0 - (2.0 * val1));
    val1 = pow(val1, 0.5); //makes the transition nicer
    
    vec4 midColor = (color1 + color2) * 0.5;
    return mix(midColor, currentColor, val1);
}

vec4 czm_antialias(vec4 color1, vec4 color2, vec4 currentColor, float dist)
{
    return czm_antialias(color1, color2, currentColor, dist, 0.1);
}
`;var _t=`/**
 * Approximately computes spherical coordinates given a normal.
 * Uses approximate inverse trigonometry for speed and consistency,
 * since inverse trigonometry can differ from vendor-to-vendor and when compared with the CPU.
 *
 * @name czm_approximateSphericalCoordinates
 * @glslFunction
 *
 * @param {vec3} normal arbitrary-length normal.
 *
 * @returns {vec2} Approximate latitude and longitude spherical coordinates.
 */
vec2 czm_approximateSphericalCoordinates(vec3 normal) {
    // Project into plane with vertical for latitude
    float latitudeApproximation = czm_fastApproximateAtan(sqrt(normal.x * normal.x + normal.y * normal.y), normal.z);
    float longitudeApproximation = czm_fastApproximateAtan(normal.x, normal.y);
    return vec2(latitudeApproximation, longitudeApproximation);
}
`;var xt=`/**
 * Branchless ternary operator to be used when it's inexpensive to explicitly
 * evaluate both possibilities for a float expression.
 *
 * @name czm_branchFreeTernary
 * @glslFunction
 *
 * @param {bool} comparison A comparison statement
 * @param {float} a Value to return if the comparison is true.
 * @param {float} b Value to return if the comparison is false.
 *
 * @returns {float} equivalent of comparison ? a : b
 */
float czm_branchFreeTernary(bool comparison, float a, float b) {
    float useA = float(comparison);
    return a * useA + b * (1.0 - useA);
}

/**
 * Branchless ternary operator to be used when it's inexpensive to explicitly
 * evaluate both possibilities for a vec2 expression.
 *
 * @name czm_branchFreeTernary
 * @glslFunction
 *
 * @param {bool} comparison A comparison statement
 * @param {vec2} a Value to return if the comparison is true.
 * @param {vec2} b Value to return if the comparison is false.
 *
 * @returns {vec2} equivalent of comparison ? a : b
 */
vec2 czm_branchFreeTernary(bool comparison, vec2 a, vec2 b) {
    float useA = float(comparison);
    return a * useA + b * (1.0 - useA);
}

/**
 * Branchless ternary operator to be used when it's inexpensive to explicitly
 * evaluate both possibilities for a vec3 expression.
 *
 * @name czm_branchFreeTernary
 * @glslFunction
 *
 * @param {bool} comparison A comparison statement
 * @param {vec3} a Value to return if the comparison is true.
 * @param {vec3} b Value to return if the comparison is false.
 *
 * @returns {vec3} equivalent of comparison ? a : b
 */
vec3 czm_branchFreeTernary(bool comparison, vec3 a, vec3 b) {
    float useA = float(comparison);
    return a * useA + b * (1.0 - useA);
}

/**
 * Branchless ternary operator to be used when it's inexpensive to explicitly
 * evaluate both possibilities for a vec4 expression.
 *
 * @name czm_branchFreeTernary
 * @glslFunction
 *
 * @param {bool} comparison A comparison statement
 * @param {vec3} a Value to return if the comparison is true.
 * @param {vec3} b Value to return if the comparison is false.
 *
 * @returns {vec3} equivalent of comparison ? a : b
 */
vec4 czm_branchFreeTernary(bool comparison, vec4 a, vec4 b) {
    float useA = float(comparison);
    return a * useA + b * (1.0 - useA);
}
`;var Ct=`
vec4 czm_cascadeColor(vec4 weights)
{
    return vec4(1.0, 0.0, 0.0, 1.0) * weights.x +
           vec4(0.0, 1.0, 0.0, 1.0) * weights.y +
           vec4(0.0, 0.0, 1.0, 1.0) * weights.z +
           vec4(1.0, 0.0, 1.0, 1.0) * weights.w;
}
`;var Tt=`
uniform vec4 shadowMap_cascadeDistances;

float czm_cascadeDistance(vec4 weights)
{
    return dot(shadowMap_cascadeDistances, weights);
}
`;var yt=`
uniform mat4 shadowMap_cascadeMatrices[4];

mat4 czm_cascadeMatrix(vec4 weights)
{
    return shadowMap_cascadeMatrices[0] * weights.x +
           shadowMap_cascadeMatrices[1] * weights.y +
           shadowMap_cascadeMatrices[2] * weights.z +
           shadowMap_cascadeMatrices[3] * weights.w;
}
`;var zt=`
uniform vec4 shadowMap_cascadeSplits[2];

vec4 czm_cascadeWeights(float depthEye)
{
    // One component is set to 1.0 and all others set to 0.0.
    vec4 near = step(shadowMap_cascadeSplits[0], vec4(depthEye));
    vec4 far = step(depthEye, shadowMap_cascadeSplits[1]);
    return near * far;
}
`;var bt=`#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
uniform float clip_mode;
uniform vec4 clip_planes[6];
uniform vec4 clip_line_color;
const float clip_lineWidth = 3.0;

float GetClipDistance(vec3 pos, vec3 planeNormal, float disToOrigin)
{
	return dot(planeNormal, pos) + disToOrigin;
}

float ClipBehindAllPlane(float fBorderWidth, vec4 clip_vertex)
{
float distance = 0.0;
float result = -1.0;
#ifdef CLIPPLANE
distance = GetClipDistance(clip_vertex.xyz, clip_planes[0].xyz, clip_planes[0].w);
if (distance < 0.0)
{
return 1.0;
}
else if (distance < fBorderWidth)
{
result = 0.0;
}
#else
for(int i = 0; i < 6; i++)
{
distance = GetClipDistance(clip_vertex.xyz, clip_planes[i].xyz, clip_planes[i].w);
if(distance < 0.0)
{
return 1.0;
}
else if(distance < fBorderWidth)
{
result = 0.0;
}
}
#endif
return result;
}

float ClipBehindAnyPlane(float fBorderWidth, vec4 clip_vertex)
{
	float result = 1.0;
	for(int i = 0; i < 6; i++)
	{
		float distance = GetClipDistance(clip_vertex.xyz, clip_planes[i].xyz, clip_planes[i].w);
		if((distance + fBorderWidth) < 0.0)
		{
			return -1.0;
		}
		else if(distance < 0.0)
		{
			result = 0.0;
		}
	}
	return result;
}

float ClipAnythingButLine(float fBorderWidth, vec4 clip_vertex)
{
	float result = -1.0;
	for(int i = 0; i < 6; i++)
	{
		float distance = GetClipDistance(clip_vertex.xyz, clip_planes[i].xyz, clip_planes[i].w);
		if(distance < 0.0)
		{
			return -1.0;
		}
		else if(distance < fBorderWidth)
		{
			result = 0.0;
		}
	}
	return result;
}

vec4 czm_clip(vec4 clip_vertex, float fIsFiltByID)
{
    if(fIsFiltByID < 0.1)
    {
        return vec4(1.0);
    }
	if(clip_mode < 0.5)
	{
		return vec4(1.0);
	}
#ifdef GL_OES_standard_derivatives
	float dxc = abs(dFdx(clip_vertex.x));
	float dyc = abs(dFdy(clip_vertex.y));
	float fBorderWidth = max(dxc, dyc) * clip_lineWidth;
#else
	float fBorderWidth = clip_lineWidth;
#endif
	float clipResult = 1.0;
	if(clip_line_color.a < 0.01)
	{
		fBorderWidth = 0.0;
	}
	if(clip_mode < 1.5)
	{
		clipResult = ClipBehindAnyPlane(fBorderWidth, clip_vertex);
	}
	else if(clip_mode < 2.5)
	{
		clipResult = ClipBehindAllPlane(fBorderWidth, clip_vertex);
	}
	else if(clip_mode < 3.5)
	{
		clipResult = ClipAnythingButLine(fBorderWidth, clip_vertex);
	}
	if(clipResult < -0.5)
	{
		discard;
	}
	else if(clipResult < 0.5)
	{
		return clip_line_color;
	}
	else
	{
        return vec4(1.0);
	}
}`;var wt=`/**
 * DOC_TBA
 *
 * @name czm_columbusViewMorph
 * @glslFunction
 */
vec4 czm_columbusViewMorph(vec4 position2D, vec4 position3D, float time)
{
    // Just linear for now.
    vec3 p = mix(position2D.xyz, position3D.xyz, time);
    return vec4(p, 1.0);
}
`;var Lt=`vec4 czm_computeLightColorInFP(czm_s3mMaterialInput material, vec3 positionMC, float hasNormal, vec3 normal)
{
    vec3 normalEC;
    #ifdef HAS_NORMAL
    float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
    normalEC = normalize(normal) * faceDirection;
    #else
    normalEC = normalize(czm_normal*czm_computeNormal(positionMC));
    #endif
    vec3 positionEC = vec3(czm_modelView * vec4(positionMC,1.0)).xyz;
    return czm_directionLight(material, normalEC, -positionEC, positionMC);
}`;var St=`vec4 czm_computeLightColorInstanceInFP(czm_s3mMaterialInput material, vec3 positionRotateMC, vec3 positionMC, float hasNormal, vec3 normal)
{
    vec3 normalEC;
    #ifdef HAS_NORMAL
        float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
        normalEC = normalize(normal) * faceDirection;
    #else
        normalEC = normalize(czm_normal*czm_computeNormal(positionRotateMC));
    #endif
    vec3 positionEC = vec3(czm_modelView * vec4(positionMC,1.0)).xyz;
    return czm_directionLight(material, normalEC, -positionEC, positionMC);
}`;var Et=`#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
vec3 czm_computeNormal(in vec3 oriVertex)
{
	vec3 normal = cross(vec3(dFdx(oriVertex.x), dFdx(oriVertex.y), dFdx(oriVertex.z)), vec3(dFdy(oriVertex.x), dFdy(oriVertex.y), dFdy(oriVertex.z)));
	normal = normalize(normal);
	return normal;
}`;var At=`/**
 * Returns a position in model coordinates relative to eye taking into
 * account the current scene mode: 3D, 2D, or Columbus view.
 * <p>
 * This uses standard position attributes, <code>position3DHigh</code>, 
 * <code>position3DLow</code>, <code>position2DHigh</code>, and <code>position2DLow</code>, 
 * and should be used when writing a vertex shader for an {@link Appearance}.
 * </p>
 *
 * @name czm_computePosition
 * @glslFunction
 *
 * @returns {vec4} The position relative to eye.
 *
 * @example
 * vec4 p = czm_computePosition();
 * v_positionEC = (czm_modelViewRelativeToEye * p).xyz;
 * gl_Position = czm_modelViewProjectionRelativeToEye * p;
 *
 * @see czm_translateRelativeToEye
 */
vec4 czm_computePosition();
`;var Dt=`/**
 * @private
 */
vec2 cordic(float angle)
{
// Scale the vector by the appropriate factor for the 24 iterations to follow.
    vec2 vector = vec2(6.0725293500888267e-1, 0.0);
// Iteration 1
    float sense = (angle < 0.0) ? -1.0 : 1.0;
 //   float factor = sense * 1.0;  // 2^-0
    mat2 rotation = mat2(1.0, sense, -sense, 1.0);
    vector = rotation * vector;
    angle -= sense * 7.8539816339744828e-1;  // atan(2^-0)
// Iteration 2
    sense = (angle < 0.0) ? -1.0 : 1.0;
    float factor = sense * 5.0e-1;  // 2^-1
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 4.6364760900080609e-1;  // atan(2^-1)
// Iteration 3
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 2.5e-1;  // 2^-2
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 2.4497866312686414e-1;  // atan(2^-2)
// Iteration 4
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 1.25e-1;  // 2^-3
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 1.2435499454676144e-1;  // atan(2^-3)
// Iteration 5
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 6.25e-2;  // 2^-4
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 6.2418809995957350e-2;  // atan(2^-4)
// Iteration 6
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 3.125e-2;  // 2^-5
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 3.1239833430268277e-2;  // atan(2^-5)
// Iteration 7
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 1.5625e-2;  // 2^-6
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 1.5623728620476831e-2;  // atan(2^-6)
// Iteration 8
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 7.8125e-3;  // 2^-7
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 7.8123410601011111e-3;  // atan(2^-7)
// Iteration 9
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 3.90625e-3;  // 2^-8
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 3.9062301319669718e-3;  // atan(2^-8)
// Iteration 10
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 1.953125e-3;  // 2^-9
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 1.9531225164788188e-3;  // atan(2^-9)
// Iteration 11
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 9.765625e-4;  // 2^-10
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 9.7656218955931946e-4;  // atan(2^-10)
// Iteration 12
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 4.8828125e-4;  // 2^-11
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 4.8828121119489829e-4;  // atan(2^-11)
// Iteration 13
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 2.44140625e-4;  // 2^-12
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 2.4414062014936177e-4;  // atan(2^-12)
// Iteration 14
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 1.220703125e-4;  // 2^-13
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 1.2207031189367021e-4;  // atan(2^-13)
// Iteration 15
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 6.103515625e-5;  // 2^-14
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 6.1035156174208773e-5;  // atan(2^-14)
// Iteration 16
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 3.0517578125e-5;  // 2^-15
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 3.0517578115526096e-5;  // atan(2^-15)
// Iteration 17
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 1.52587890625e-5;  // 2^-16
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 1.5258789061315762e-5;  // atan(2^-16)
// Iteration 18
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 7.62939453125e-6;  // 2^-17
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 7.6293945311019700e-6;  // atan(2^-17)
// Iteration 19
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 3.814697265625e-6;  // 2^-18
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 3.8146972656064961e-6;  // atan(2^-18)
// Iteration 20
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 1.9073486328125e-6;  // 2^-19
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 1.9073486328101870e-6;  // atan(2^-19)
// Iteration 21
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 9.5367431640625e-7;  // 2^-20
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 9.5367431640596084e-7;  // atan(2^-20)
// Iteration 22
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 4.76837158203125e-7;  // 2^-21
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 4.7683715820308884e-7;  // atan(2^-21)
// Iteration 23
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 2.384185791015625e-7;  // 2^-22
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
    angle -= sense * 2.3841857910155797e-7;  // atan(2^-22)
// Iteration 24
    sense = (angle < 0.0) ? -1.0 : 1.0;
    factor = sense * 1.1920928955078125e-7;  // 2^-23
    rotation[0][1] = factor;
    rotation[1][0] = -factor;
    vector = rotation * vector;
//    angle -= sense * 1.1920928955078068e-7;  // atan(2^-23)

    return vector;
}

/**
 * Computes the cosine and sine of the provided angle using the CORDIC algorithm.
 *
 * @name czm_cosineAndSine
 * @glslFunction
 *
 * @param {float} angle The angle in radians.
 *
 * @returns {vec2} The resulting cosine of the angle (as the x coordinate) and sine of the angle (as the y coordinate).
 *
 * @example
 * vec2 v = czm_cosineAndSine(czm_piOverSix);
 * float cosine = v.x;
 * float sine = v.y;
 */
vec2 czm_cosineAndSine(float angle)
{
    if (angle < -czm_piOverTwo || angle > czm_piOverTwo)
    {
        if (angle < 0.0)
        {
            return -cordic(angle + czm_pi);
        }
        else
        {
            return -cordic(angle - czm_pi);
        }
    }
    else
    {
        return cordic(angle);
    }
}
`;var Ot=`/**
 * Decompresses texture coordinates that were packed into a single float.
 *
 * @name czm_decompressTextureCoordinates
 * @glslFunction
 *
 * @param {float} encoded The compressed texture coordinates.
 * @returns {vec2} The decompressed texture coordinates.
 */
 vec2 czm_decompressTextureCoordinates(float encoded)
 {
    float temp = encoded / 4096.0;
    float xZeroTo4095 = floor(temp);
    float stx = xZeroTo4095 / 4095.0;
    float sty = (encoded - xZeroTo4095 * 4096.0) / 4095.0;
    return vec2(stx, sty);
 }
`;var It=`// emulated noperspective
#if defined(GL_EXT_frag_depth) && !defined(LOG_DEPTH)
varying float v_WindowZ;
#endif

/**
 * Emulates GL_DEPTH_CLAMP, which is not available in WebGL 1 or 2.
 * GL_DEPTH_CLAMP clamps geometry that is outside the near and far planes, 
 * capping the shadow volume. More information here: 
 * https://www.khronos.org/registry/OpenGL/extensions/ARB/ARB_depth_clamp.txt.
 *
 * When GL_EXT_frag_depth is available we emulate GL_DEPTH_CLAMP by ensuring 
 * no geometry gets clipped by setting the clip space z value to 0.0 and then
 * sending the unaltered screen space z value (using emulated noperspective
 * interpolation) to the frag shader where it is clamped to [0,1] and then
 * written with gl_FragDepth (see czm_writeDepthClamp). This technique is based on:
 * https://stackoverflow.com/questions/5960757/how-to-emulate-gl-depth-clamp-nv.
 *
 * When GL_EXT_frag_depth is not available, which is the case on some mobile 
 * devices, we must attempt to fix this only in the vertex shader. 
 * The approach is to clamp the z value to the far plane, which closes the 
 * shadow volume but also distorts the geometry, so there can still be artifacts
 * on frustum seams.
 *
 * @name czm_depthClamp
 * @glslFunction
 *
 * @param {vec4} coords The vertex in clip coordinates.
 * @returns {vec4} The modified vertex.
 *
 * @example
 * gl_Position = czm_depthClamp(czm_modelViewProjection * vec4(position, 1.0));
 *
 * @see czm_writeDepthClamp
 */
vec4 czm_depthClamp(vec4 coords)
{
#ifndef LOG_DEPTH
#ifdef GL_EXT_frag_depth
    v_WindowZ = (0.5 * (coords.z / coords.w) + 0.5) * coords.w;
    coords.z = 0.0;
#else
    coords.z = min(coords.z, coords.w);
#endif
#endif
    return coords;
}
`;var Rt=`// emulated noperspective
#ifndef LOG_DEPTH
varying float v_WindowZ;
#endif

/**
 * Clamps a vertex to the far plane.
 *
 * @name czm_depthClampFarPlane
 * @glslFunction
 *
 * @param {vec4} coords The vertex in clip coordinates.
 * @returns {vec4} The vertex clipped to the far plane.
 *
 * @example
 * gl_Position = czm_depthClampFarPlane(czm_modelViewProjection * vec4(position, 1.0));
 *
 * @see czm_writeDepthClampedToFarPlane
 */
vec4 czm_depthClampFarPlane(vec4 coords)
{
#ifndef LOG_DEPTH
    v_WindowZ = (0.5 * (coords.z / coords.w) + 0.5) * coords.w;
    coords.z = min(coords.z, coords.w);
#endif
    return coords;
}
`;var Mt=`const vec3 SideLightColor = vec3(0.0);
uniform vec4 uSpecularColor;
uniform float uShininess;
const vec3 specular = vec3(0.066666);
const float shininess2 = 30.0;
float saturate( in float a ) { return clamp( a, 0.0, 1.0 ); }
float calcLightAttenuation( float lightDistance, float cutoffDistance, float decayExponent ) {
    if ( decayExponent > 0.0 ) {
        return pow( saturate( 1.0 - lightDistance / cutoffDistance ), decayExponent );
    }
    return 1.0;
}
#if POINT_LIGHTS > 0
    uniform vec3 uPointLightPositionEC[POINT_LIGHTS];
    uniform vec3 uPointLightColor[POINT_LIGHTS];
    uniform vec2 uPointLightDistanceAndDecay[POINT_LIGHTS];
#endif
#if SPOT_LIGHTS > 0
    uniform vec3 uSpotLightPosition[ SPOT_LIGHTS ];
    uniform vec3 uSpotLightColor[ SPOT_LIGHTS ];
    uniform vec3 uSpotLightPositionEC[ SPOT_LIGHTS ];
    uniform vec3 uSpotLightDirection[ SPOT_LIGHTS ];
    uniform float uSpotLightExponent[ SPOT_LIGHTS ];
    uniform vec4 uSpotLightDistanceDecayCosPenumbra[ SPOT_LIGHTS ];
#endif
#if DIR_LIGHTS > 0
    uniform vec3 uDirectionalLightDirection[ DIR_LIGHTS ];
    uniform vec3 uDirectionalLightColor[ DIR_LIGHTS];
#endif
#if HEMISPHERE_LIGHTS > 0
    uniform vec3 uSkyColor[ HEMISPHERE_LIGHTS ];
    uniform vec3 uGroundColor[ HEMISPHERE_LIGHTS];
#endif
    vec3 calcAmbientIrradiance(vec3 normal) {
        vec3 SH0 = czm_SH[0].xyz;
        vec4 SH_R1 = czm_SH[1];
        vec4 SH_G1 = czm_SH[2];
        vec4 SH_B1 = czm_SH[3];
        vec4 SH_R2 = czm_SH[4];
        vec4 SH_G2 = czm_SH[5];
        vec4 SH_B2 = czm_SH[6];
        vec3 ambientLight = 0.282095 * SH0;
        vec4 sh1 = vec4(
            0.488603 * normal.x,
            0.488603 * normal.z,
            0.488603 * normal.y,
            1.092548 * normal.x * normal.y
        );
        vec4 sh2 = vec4(
            1.092548 * normal.y * normal.z,
            0.315392 * (3.0 * normal.z * normal.z - 1.0),
            1.092548 * normal.x * normal.z,
            0.546274 * (normal.x * normal.x - normal.y * normal.y)
        );
        ambientLight += vec3(
            dot(SH_R1, sh1),
            dot(SH_G1, sh1),
            dot(SH_B1, sh1)
        );
        ambientLight += vec3(
            dot(SH_R2, sh2),
            dot(SH_G2, sh2),
            dot(SH_B2, sh2)
        );
        return ambientLight;
    }

    const float ambientBoostFactor = 0.4;
    const float lightingGlobalFactor = 0.0000342739;
    const float fillLightIntensity = 0.25;
    const vec3 GROUND_REFLECTANCE = vec3(0.2);

    vec3 evaluateAdditionalLighting(vec3 posWorld, vec3 mainLightDirection, vec3 mainLightIntensity) {
        float vndl = dot(normalize(posWorld), mainLightDirection);
        float additionalAmbientScale = smoothstep(0.0, 1.0, clamp(vndl * 2.0, 0.0, 1.0));
        return additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * mainLightIntensity;
    }

    vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG) {
        return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
    }

    vec3 calcFinalIrradiance(float NdotL, vec3 normalWorld, vec3 normalGround, vec3 positionWC, vec3 lightDirWC, vec3 mainLightIntensity, vec3 ambientLightIrradiance, vec3 surfaceAlbedo, float shadow) {
        float NdotNG = clamp(dot(normalWorld, normalGround), -1.0, 1.0);
        vec3 ng = normalGround;
        vec3 ambientDir = vec3(5.0 * ng[1] - ng[0] * ng[2], -5.0 * ng[0] - ng[2] * ng[1], ng[1] * ng[1] + ng[0] * ng[0]);
        ambientDir = ambientDir != vec3(0.0) ? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));
        float NdotAmbDir = abs(dot(normalWorld, ambientDir));
        vec3 additionalLight = evaluateAdditionalLighting(positionWC, lightDirWC, mainLightIntensity);
        vec3 mainLightIrradiance = NdotL * mainLightIntensity * shadow;
        vec3 fillLightIrradiance = NdotAmbDir * mainLightIntensity * fillLightIntensity;
        vec3 ambientLightIrradianceComponent = ambientLightIrradiance + additionalLight;
        vec3 skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradiance + fillLightIrradiance;
        vec3 groundIrradianceToSurface = GROUND_REFLECTANCE * ambientLightIrradianceComponent + mainLightIrradiance + fillLightIrradiance;
        vec3 diffuseContribution = evaluateDiffuseIlluminationHemisphere(groundIrradianceToSurface, skyIrradianceToSurface, NdotNG);
        vec3 finalIrradiance = surfaceAlbedo.rgb * diffuseContribution * 0.31830988618;
        return finalIrradiance;
    }

    vec3 diffuseBRDF_Lambertian(vec3 diffuseColor) {
        return diffuseColor * 0.31830988618;
    }

    vec4 czm_directionLight(czm_s3mMaterialInput material, vec3 normalEC, vec3 positionToEyeEC, vec3 positionMC)
    {
        vec3 totalDiffuseLight = vec3(0.0);
        vec3 totalSpecularLight = vec3(0.0);
        float dotNL = saturate(dot(normalEC, material.sunDirectionEC));
        vec3 normalWorld = material.normalWorld;
        vec3 normalGround = material.normalGround;
        vec3 positionWorld = material.positionWorld;
        vec3 lightDirWC = material.sunDirectionWC;
        vec3 sunLightColor = material.sunLightColor.rgb;
        vec4 surfaceAlbedo = material.surfaceAlbedo;
        float shadow = 1.0;
        vec3 ambientLightIrradiance = calcAmbientIrradiance(normalWorld);
        vec3 finalIrradiance = calcFinalIrradiance(dotNL, normalWorld, normalGround, positionWorld, lightDirWC, sunLightColor, ambientLightIrradiance, surfaceAlbedo.rgb, shadow);
        vec3 positionToEyeECDir = normalize(positionToEyeEC);
	#if HEMISPHERE_LIGHTS > 0
        for ( int i = 0; i < HEMISPHERE_LIGHTS; i ++ )
        {
            vec3 dirVectorEC = normalize(czm_normal * vec3(0.0, 0.0, 1.0));
            float dotProduct = dot( normalEC, dirVectorEC );
			vec3 skyColor = uSkyColor[i];
            vec3 groundColor = uGroundColor[i];
			float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;
			vec3 irradiance = mix( groundColor, skyColor, hemiDiffuseWeight );
			irradiance *= 3.141592653589793;
            totalDiffuseLight += irradiance;
        }
    #endif
    #if DIR_LIGHTS > 0
        for ( int i = 0; i < DIR_LIGHTS; i ++ )
        {
            vec3 dirVectorEC = normalize((czm_view * vec4(uDirectionalLightDirection[ i ], 0.0)).xyz);
            float dotProduct = dot( normalEC, dirVectorEC );
            float dirDiffuseWeight = max( dotProduct, 0.0 );
            totalDiffuseLight += uDirectionalLightColor[ i ] * dirDiffuseWeight * diffuseBRDF_Lambertian(surfaceAlbedo.rgb);
        }
    #endif
    #if POINT_LIGHTS > 0
        for ( int i = 0; i < POINT_LIGHTS; i ++ )
        {
            vec3 lVector = uPointLightPositionEC[i] + positionToEyeEC;
            float lengthToLight = length( lVector );
            float cutoffDis = uPointLightDistanceAndDecay[i].x;
            if(lengthToLight > cutoffDis)
            {
                continue;
            }
            float attenuation = calcLightAttenuation( lengthToLight, cutoffDis, uPointLightDistanceAndDecay[i].y);
            lVector = normalize( lVector );
            float dotProduct = dot( normalEC, lVector );
            float pointLightDiffuse = max( dotProduct, 0.0 );
            totalDiffuseLight += uPointLightColor[i] * pointLightDiffuse * attenuation * diffuseBRDF_Lambertian(surfaceAlbedo.rgb);
        }
    #endif
    #if SPOT_LIGHTS > 0
        vec3 positionWC = (czm_model * vec4(positionMC, 1.0)).xyz;
        for ( int i = 0; i < SPOT_LIGHTS; i ++ )
        {
            vec3 lVector = uSpotLightPositionEC[i] + positionToEyeEC;
            float attenuation = calcLightAttenuation( length( lVector ), uSpotLightDistanceDecayCosPenumbra[i].x, uSpotLightDistanceDecayCosPenumbra[i].y);
            lVector = normalize( lVector );
            float spotEffect = dot( uSpotLightDirection[ i ], normalize( uSpotLightPosition[ i ] - positionWC ) );
            if ( spotEffect > uSpotLightDistanceDecayCosPenumbra[i].z ) {
                spotEffect = max( pow( max( spotEffect, 0.0 ), uSpotLightExponent[ i ] ), 0.0 );
                float dotProduct = dot( normalEC, lVector );
                float spotDiffuseWeight = max( dotProduct, 0.0 );
                totalDiffuseLight += uSpotLightColor[ i ] * spotDiffuseWeight * attenuation * spotEffect * diffuseBRDF_Lambertian(surfaceAlbedo.rgb);
                vec3 spotHalfVector = normalize( lVector + positionToEyeECDir );
                float spotDotNormalHalf = max( dot( normalEC, spotHalfVector ), 0.0 );
                float spotSpecularWeight = max( pow( spotDotNormalHalf, shininess2 ), 0.0 );
                float specularNormalization = ( shininess2 + 2.0 ) / 8.0;
                vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, spotHalfVector ), 0.0 ), 5.0 );
                totalSpecularLight += schlick * uSpotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * attenuation * specularNormalization * spotEffect;
            }
        }
    #endif
		vec4 color = vec4(finalIrradiance + totalDiffuseLight + totalSpecularLight, surfaceAlbedo.a);
        return color;
    }

`;var Pt=`/**
 * Computes a 3x3 rotation matrix that transforms vectors from an ellipsoid's east-north-up coordinate system 
 * to eye coordinates.  In east-north-up coordinates, x points east, y points north, and z points along the 
 * surface normal.  East-north-up can be used as an ellipsoid's tangent space for operations such as bump mapping.
 * <br /><br />
 * The ellipsoid is assumed to be centered at the model coordinate's origin.
 *
 * @name czm_eastNorthUpToEyeCoordinates
 * @glslFunction
 *
 * @param {vec3} positionMC The position on the ellipsoid in model coordinates.
 * @param {vec3} normalEC The normalized ellipsoid surface normal, at <code>positionMC</code>, in eye coordinates.
 *
 * @returns {mat3} A 3x3 rotation matrix that transforms vectors from the east-north-up coordinate system to eye coordinates.
 *
 * @example
 * // Transform a vector defined in the east-north-up coordinate 
 * // system, (0, 0, 1) which is the surface normal, to eye 
 * // coordinates.
 * mat3 m = czm_eastNorthUpToEyeCoordinates(positionMC, normalEC);
 * vec3 normalEC = m * vec3(0.0, 0.0, 1.0);
 */
mat3 czm_eastNorthUpToEyeCoordinates(vec3 positionMC, vec3 normalEC)
{
    vec3 tangentMC = normalize(vec3(-positionMC.y, positionMC.x, 0.0));  // normalized surface tangent in model coordinates
    vec3 tangentEC = normalize(czm_normal3D * tangentMC);                // normalized surface tangent in eye coordiantes
    vec3 bitangentEC = normalize(cross(normalEC, tangentEC));            // normalized surface bitangent in eye coordinates

    return mat3(
        tangentEC.x,   tangentEC.y,   tangentEC.z,
        bitangentEC.x, bitangentEC.y, bitangentEC.z,
        normalEC.x,    normalEC.y,    normalEC.z);
}
`;var Vt=`/**
 * DOC_TBA
 *
 * @name czm_ellipsoidContainsPoint
 * @glslFunction
 *
 */
bool czm_ellipsoidContainsPoint(vec3 ellipsoid_inverseRadii, vec3 point)
{
    vec3 scaled = ellipsoid_inverseRadii * (czm_inverseModelView * vec4(point, 1.0)).xyz;
    return (dot(scaled, scaled) <= 1.0);
}
`;var Ft=`/**
 * DOC_TBA
 *
 * @name czm_ellipsoidNew
 * @glslFunction
 *
 */
czm_ellipsoid czm_ellipsoidNew(vec3 center, vec3 radii)
{
    vec3 inverseRadii = vec3(1.0 / radii.x, 1.0 / radii.y, 1.0 / radii.z);
    vec3 inverseRadiiSquared = inverseRadii * inverseRadii;
    czm_ellipsoid temp = czm_ellipsoid(center, radii, inverseRadii, inverseRadiiSquared);
    return temp;
}
`;var Bt=`/**
 * DOC_TBA
 *
 * @name czm_ellipsoidWgs84TextureCoordinates
 * @glslFunction
 */
vec2 czm_ellipsoidWgs84TextureCoordinates(vec3 normal)
{
    return vec2(atan(normal.y, normal.x) * czm_oneOverTwoPi + 0.5, asin(normal.z) * czm_oneOverPi + 0.5);
}
`;var Nt=`/**
 * Compares <code>left</code> and <code>right</code> componentwise. Returns <code>true</code>
 * if they are within <code>epsilon</code> and <code>false</code> otherwise. The inputs
 * <code>left</code> and <code>right</code> can be <code>float</code>s, <code>vec2</code>s,
 * <code>vec3</code>s, or <code>vec4</code>s.
 *
 * @name czm_equalsEpsilon
 * @glslFunction
 *
 * @param {} left The first vector.
 * @param {} right The second vector.
 * @param {float} epsilon The epsilon to use for equality testing.
 * @returns {bool} <code>true</code> if the components are within <code>epsilon</code> and <code>false</code> otherwise.
 *
 * @example
 * // GLSL declarations
 * bool czm_equalsEpsilon(float left, float right, float epsilon);
 * bool czm_equalsEpsilon(vec2 left, vec2 right, float epsilon);
 * bool czm_equalsEpsilon(vec3 left, vec3 right, float epsilon);
 * bool czm_equalsEpsilon(vec4 left, vec4 right, float epsilon);
 */
bool czm_equalsEpsilon(vec4 left, vec4 right, float epsilon) {
    return all(lessThanEqual(abs(left - right), vec4(epsilon)));
}

bool czm_equalsEpsilon(vec3 left, vec3 right, float epsilon) {
    return all(lessThanEqual(abs(left - right), vec3(epsilon)));
}

bool czm_equalsEpsilon(vec2 left, vec2 right, float epsilon) {
    return all(lessThanEqual(abs(left - right), vec2(epsilon)));
}

bool czm_equalsEpsilon(float left, float right, float epsilon) {
    return (abs(left - right) <= epsilon);
}
`;var Ht=`#ifdef EXCAVATION
uniform sampler2D uExcavationTexture;
uniform float uExcavationMode;
uniform vec4 uExcavationRect;
varying vec4 vExcavationVertexPos;
vec2 CalculateExcavationPolyTexCoord(vec4 vertexPos, vec4 rectPos, out float ptInRect)
{
    vec2 vecRatio = vec2(rectPos.z - rectPos.x, rectPos.w - rectPos.y);
    vec2 texCoord = vec2(vertexPos.x - rectPos.x, vertexPos.y - rectPos.y);
    texCoord.x = texCoord.x / vecRatio.x;
    texCoord.y = texCoord.y / vecRatio.y;
    ptInRect = step(0.0, texCoord.x) * step(0.0, texCoord.y) * step(0.0, 1.0 - texCoord.x) * step(0.0, 1.0 - texCoord.y);
    texCoord = clamp(texCoord, vec2(0.0), vec2(1.0));
    return texCoord;
}
bool czm_executeExcavation()
{
    float hasExcavation = 1.0;
    vec2 vecExcavationTexCoord = CalculateExcavationPolyTexCoord(vExcavationVertexPos, uExcavationRect, hasExcavation);
    bool excavationInside = (uExcavationMode < 0.5);
    if(hasExcavation < 0.1)
    {
        return !excavationInside;
    }
    if(excavationInside)
    {
        return texture2D(uExcavationTexture, vecExcavationTexCoord.xy).r > 0.5;
    }
    else
    {
        return texture2D(uExcavationTexture, vecExcavationTexCoord.xy).r < 0.5;
    }
}
#endif`;var Ut=`/**
 * DOC_TBA
 *
 * @name czm_eyeOffset
 * @glslFunction
 *
 * @param {vec4} positionEC DOC_TBA.
 * @param {vec3} eyeOffset DOC_TBA.
 *
 * @returns {vec4} DOC_TBA.
 */
vec4 czm_eyeOffset(vec4 positionEC, vec3 eyeOffset)
{
    // This equation is approximate in x and y.
    vec4 p = positionEC;
    vec4 zEyeOffset = normalize(p) * eyeOffset.z;
    p.xy += eyeOffset.xy + zEyeOffset.xy;
    p.z += zEyeOffset.z;
    return p;
}
`;var Gt=`/**
 * Transforms a position from eye to window coordinates.  The transformation
 * from eye to clip coordinates is done using {@link czm_projection}.
 * The transform from normalized device coordinates to window coordinates is
 * done using {@link czm_viewportTransformation}, which assumes a depth range
 * of <code>near = 0</code> and <code>far = 1</code>.
 * <br /><br />
 * This transform is useful when there is a need to manipulate window coordinates
 * in a vertex shader as done by {@link BillboardCollection}.
 *
 * @name czm_eyeToWindowCoordinates
 * @glslFunction
 *
 * @param {vec4} position The position in eye coordinates to transform.
 *
 * @returns {vec4} The transformed position in window coordinates.
 *
 * @see czm_modelToWindowCoordinates
 * @see czm_projection
 * @see czm_viewportTransformation
 * @see BillboardCollection
 *
 * @example
 * vec4 positionWC = czm_eyeToWindowCoordinates(positionEC);
 */
vec4 czm_eyeToWindowCoordinates(vec4 positionEC)
{
    vec4 q = czm_projection * positionEC;                        // clip coordinates
    q.xyz /= q.w;                                                // normalized device coordinates
    q.xyz = (czm_viewportTransformation * vec4(q.xyz, 1.0)).xyz; // window coordinates
    return q;
}
`;var kt=`/**
 * Approxiamtes atan over the range [0, 1]. Safe to flip output for negative input.
 *
 * Based on Michal Drobot's approximation from ShaderFastLibs, which in turn is based on
 * "Efficient approximations for the arctangent function," Rajan, S. Sichun Wang Inkol, R. Joyal, A., May 2006.
 * Adapted from ShaderFastLibs under MIT License.
 *
 * Chosen for the following characteristics over range [0, 1]:
 * - basically no error at 0 and 1, important for getting around range limit (naive atan2 via atan requires infinite range atan)
 * - no visible artifacts from first-derivative discontinuities, unlike latitude via range-reduced sqrt asin approximations (at equator)
 *
 * The original code is x * (-0.1784 * abs(x) - 0.0663 * x * x + 1.0301);
 * Removed the abs() in here because it isn't needed, the input range is guaranteed as [0, 1] by how we're approximating atan2.
 *
 * @name czm_fastApproximateAtan
 * @glslFunction
 *
 * @param {float} x Value between 0 and 1 inclusive.
 *
 * @returns {float} Approximation of atan(x)
 */
float czm_fastApproximateAtan(float x) {
    return x * (-0.1784 * x - 0.0663 * x * x + 1.0301);
}

/**
 * Approximation of atan2.
 *
 * Range reduction math based on nvidia's cg reference implementation for atan2:
 * However, we replaced their atan curve with Michael Drobot's (see above).
 *
 * @name czm_fastApproximateAtan
 * @glslFunction
 *
 * @param {float} x Value between -1 and 1 inclusive.
 * @param {float} y Value between -1 and 1 inclusive.
 *
 * @returns {float} Approximation of atan2(x, y)
 */
float czm_fastApproximateAtan(float x, float y) {
    // atan approximations are usually only reliable over [-1, 1], or, in our case, [0, 1] due to modifications.
    // So range-reduce using abs and by flipping whether x or y is on top.
    float t = abs(x); // t used as swap and atan result.
    float opposite = abs(y);
    float adjacent = max(t, opposite);
    opposite = min(t, opposite);

    t = czm_fastApproximateAtan(opposite / adjacent);

    // Undo range reduction
    t = czm_branchFreeTernary(abs(y) > abs(x), czm_piOverTwo - t, t);
    t = czm_branchFreeTernary(x < 0.0, czm_pi - t, t);
    t = czm_branchFreeTernary(y < 0.0, -t, t);
    return t;
}
`;var Wt=`/**
 * Gets the color with fog at a distance from the camera.
 *
 * @name czm_fog
 * @glslFunction
 *
 * @param {float} distanceToCamera The distance to the camera in meters.
 * @param {vec3} color The original color.
 * @param {vec3} fogColor The color of the fog.
 *
 * @returns {vec3} The color adjusted for fog at the distance from the camera.
 */
vec3 czm_fog(float distanceToCamera, vec3 color, vec3 fogColor)
{
    float scalar = distanceToCamera * czm_fogDensity;
    float fog = 1.0 - exp(-(scalar * scalar));
    return mix(color, fogColor, fog);
}

/**
 * Gets the color with fog at a distance from the camera.
 *
 * @name czm_fog
 * @glslFunction
 *
 * @param {float} distanceToCamera The distance to the camera in meters.
 * @param {vec3} color The original color.
 * @param {vec3} fogColor The color of the fog.
 * @param {float} fogModifierConstant A constant to modify the appearance of fog.
 *
 * @returns {vec3} The color adjusted for fog at the distance from the camera.
 */
vec3 czm_fog(float distanceToCamera, vec3 color, vec3 fogColor, float fogModifierConstant)
{
    float scalar = distanceToCamera * czm_fogDensity;
    float fog = 1.0 - exp(-((fogModifierConstant * scalar + fogModifierConstant) * (scalar * (1.0 + fogModifierConstant))));
    return mix(color, fogColor, fog);
}
`;var qt=`/**
 * Converts a color from RGB space to linear space.
 *
 * @name czm_gammaCorrect
 * @glslFunction
 *
 * @param {vec3} color The color in RGB space.
 * @returns {vec3} The color in linear space.
 */
vec3 czm_gammaCorrect(vec3 color) {
#ifdef HDR
    color = pow(color, vec3(czm_gamma));
#endif
    return color;
}

vec4 czm_gammaCorrect(vec4 color) {
#ifdef HDR
    color.rgb = pow(color.rgb, vec3(czm_gamma));
#endif
    return color;
}
`;var Xt=`/**
 * DOC_TBA
 *
 * @name czm_geodeticSurfaceNormal
 * @glslFunction
 *
 * @param {vec3} positionOnEllipsoid DOC_TBA
 * @param {vec3} ellipsoidCenter DOC_TBA
 * @param {vec3} oneOverEllipsoidRadiiSquared DOC_TBA
 * 
 * @returns {vec3} DOC_TBA.
 */
vec3 czm_geodeticSurfaceNormal(vec3 positionOnEllipsoid, vec3 ellipsoidCenter, vec3 oneOverEllipsoidRadiiSquared)
{
    return normalize((positionOnEllipsoid - ellipsoidCenter) * oneOverEllipsoidRadiiSquared);
}
`;var Yt=`/**
 * An czm_material with default values. Every material's czm_getMaterial
 * should use this default material as a base for the material it returns.
 * The default normal value is given by materialInput.normalEC.
 *
 * @name czm_getDefaultMaterial
 * @glslFunction
 *
 * @param {czm_materialInput} input The input used to construct the default material.
 *
 * @returns {czm_material} The default material.
 *
 * @see czm_materialInput
 * @see czm_material
 * @see czm_getMaterial
 */
czm_material czm_getDefaultMaterial(czm_materialInput materialInput)
{
    czm_material material;
    material.diffuse = vec3(0.0);
    material.specular = 0.0;
    material.shininess = 1.0;
    material.normal = materialInput.normalEC;
    material.emission = vec3(0.0);
    material.alpha = 1.0;
    return material;
}
`;var jt=`uniform float uMaxCategoryOrHypCeil;
uniform float uMinCategoryOrHypFloor;
uniform sampler2D uEmissionTexAtlas;
uniform vec4 uEmissionTexAtlasTilingAndOffset[EMISSION_TEXTURE_COUNT];
uniform vec4 uEmissionTexAtlasRects[EMISSION_TEXTURE_COUNT];
uniform float uLayerCornerLength;
varying vec2 vLayerTexCoord;
varying vec2 vModIndexAndTexIndex;
vec3 czm_getEmissiveTextureColor(float w)
{
    vec3 texColor = vec3(0.0);
    vec2 emissionTexCoord;
    int nEmissionTexTexIdx = int(floor(vModIndexAndTexIndex.y + 0.5));
    vec2 atlasTexCoord;
    for(int i = 0; i < EMISSION_TEXTURE_COUNT; i++){
        if(nEmissionTexTexIdx == i){
            emissionTexCoord.x = mod(length(vLayerTexCoord) * uLayerCornerLength / uEmissionTexAtlasTilingAndOffset[i].x, 1.0);
            emissionTexCoord.y = mod((w - uMinCategoryOrHypFloor) / uEmissionTexAtlasTilingAndOffset[i].y, 1.0) ;
            emissionTexCoord.x += uEmissionTexAtlasTilingAndOffset[i].z;
            emissionTexCoord.y += vModIndexAndTexIndex.x + uEmissionTexAtlasTilingAndOffset[i].w;
            emissionTexCoord.xy = fract(emissionTexCoord.xy);
            atlasTexCoord = mix(uEmissionTexAtlasRects[i].xy, uEmissionTexAtlasRects[i].zw, emissionTexCoord);
            break;
        }
    }
    texColor = texture2D(uEmissionTexAtlas, atlasTexCoord).rgb;
    return texColor;
}
vec3 czm_getEmissiveTextureColor(float w, vec2 texCoord)
{
    vec3 texColor = vec3(0.0);
    vec2 emissionTexCoord;
    int nEmissionTexTexIdx = int(floor(vModIndexAndTexIndex.y + 0.5));
    vec2 atlasTexCoord;
    for(int i = 0; i < EMISSION_TEXTURE_COUNT; i++){
        if(nEmissionTexTexIdx == i){
            emissionTexCoord.x = mod(texCoord.x / uEmissionTexAtlasTilingAndOffset[i].x, 1.0);
            emissionTexCoord.y = mod(texCoord.y / uEmissionTexAtlasTilingAndOffset[i].y, 1.0);
            emissionTexCoord.x += uEmissionTexAtlasTilingAndOffset[i].z;
            emissionTexCoord.y += vModIndexAndTexIndex.x + uEmissionTexAtlasTilingAndOffset[i].w;
            emissionTexCoord.xy = fract(emissionTexCoord.xy);
            atlasTexCoord = mix(uEmissionTexAtlasRects[i].xy, uEmissionTexAtlasRects[i].zw, emissionTexCoord);
            break;
        }
    }
    texColor = texture2D(uEmissionTexAtlas, atlasTexCoord).rgb;
    return texColor;
}`;var Zt=`uniform float uHorizontalLine;
uniform vec4 uHorizontalColor;
float computeContourline(float fValue)
{
	float distanceToContour = uHorizontalLine;
	float dxc = abs(dFdx(fValue));
	float dyc = abs(dFdy(fValue));
	float dF = max(dxc, dyc);
	return (abs(distanceToContour-fValue) < dF) ? 1.0 : 0.0;
}

vec4 czm_getHorizontalColor(vec4 oriColor, float fValue)
{
    float finalOpacity = computeContourline(fValue);
    return mix(oriColor,uHorizontalColor, finalOpacity);
}`;var Kt=`uniform sampler2D uHypsometricTexture;
uniform sampler2D uHypsometricRenderTexture;
uniform float uHypsometricVisible;
uniform float uHypOpacity;
uniform float uHypContourInterval;
uniform vec4 uHypLineColor;
uniform float uHypContourFillMode;
uniform float uHypFloor;
uniform float uHypCeil;
uniform float uHypMaxVisibleValue;
uniform float uHypMinVisibleValue;
uniform float uHypHasAnalysisRegion;
varying vec2 vecHypTexCoord;
uniform float uMixColorType;
uniform vec4 uNoValueColor;
#ifdef Volume
varying vec3 vecRotioCoord;
uniform float uDataFloor;
uniform float uDataCeil;
uniform float uVolumeType;
#endif

#ifdef Volume2
uniform float uDataFloor;
uniform float uDataCeil;
uniform float uFilterMode;
#endif

float computeMixCon(float fValue)
{
    float distanceToContour;
    if(abs(uHypMaxVisibleValue - uHypMinVisibleValue) > 0.1)
    {
	    if(fValue < 0.5)
        {
            distanceToContour = mod(fValue - 0.0002, uHypContourInterval);
        }
        else
        {
            float t = floor(fValue / uHypContourInterval);
            distanceToContour = abs(fValue - (t * uHypContourInterval) - 0.1);
        }
	}
	else
	{
	    distanceToContour = abs(fValue - uHypMaxVisibleValue);
	}
	float dxc = abs(dFdx(fValue));
	float dyc = abs(dFdy(fValue));
	float dF = max(dxc, dyc);
	return (distanceToContour < dF) ? 1.0 : 0.0;
}

vec4 computeContourMapColor(float fValue)
{
	//float threshold = clamp(abs(uHypCeil - uHypFloor), 0.000001, 20000.0);
	float threshold = abs(uHypCeil - uHypFloor);
	float contourRate = (fValue - uHypFloor) / threshold;
	float finalCoord = clamp(contourRate, 0.0, 1.0);
	float count = floor(finalCoord * 16.0);
	float y = (count*2.0 + 1.0)/32.0;
	float x = fract(finalCoord*16.0);
	if(y > 1.0)
	{
	    x = 1.0;
	}
	vec2 contourCoord = vec2(x, y);
	vec4 color = texture2D(uHypsometricTexture, contourCoord);
	return color;
}
#ifdef Volume2

vec4 czm_getContourMapColor(vec4 oriColor, vec4 volColor)
{
    if(uFilterMode > 0.5)
    {
        vec4 finalColor = volColor * oriColor;

        if(uMixColorType > 0.5)
        {
            finalColor = volColor;
        }
        return finalColor;
    }

    vec4 contourMapColor = vec4(0.0);
    float finalOpacity = uHypOpacity;

	float noValue = volColor.a;
	float texTest = clamp(czm_unpackVolume(volColor.zyx),0.0,1.0);

	float fValue;
	if(noValue > 0.5)
	{
        fValue = uDataFloor + texTest * (uDataCeil - uDataFloor);
    }
    else
    {
        fValue = uHypMaxVisibleValue + abs(uHypMaxVisibleValue * 0.1);
    }

    float extendHeight = czm_branchFreeTernary(uHypContourFillMode > 2.9, 0.0, czm_branchFreeTernary(uHypContourFillMode > 1.9, 5.0, 0.0));
    if(fValue > uHypMaxVisibleValue + extendHeight || fValue < uHypMinVisibleValue - extendHeight)
    {
        return uNoValueColor * oriColor;
    }
#ifdef GL_OES_standard_derivatives
    if(uHypContourFillMode > 2.9)
    {
        float mix_con = computeMixCon(fValue);
        contourMapColor = mix(computeContourMapColor(fValue), uHypLineColor, mix_con);
    }
    else if(uHypContourFillMode > 1.9)
    {
        finalOpacity = computeMixCon(fValue);
        contourMapColor = uHypLineColor;
    }
    else if(uHypContourFillMode > 0.9)
#else
    if(uHypContourFillMode > 0.9)
#endif
    {
        contourMapColor = computeContourMapColor(fValue);
    }
    else
    {
        finalOpacity = 0.0;
    }
    vec4 mixColor = mix(vec4(1.0,1.0,1.0,1.0), contourMapColor, finalOpacity);
    vec4 finalColor = mixColor * oriColor;
#ifdef PT_CLOUD
	finalColor = mixColor;
#endif
    if(uMixColorType > 0.5)
    {
        finalColor = mixColor;
    }
    return finalColor;
}

#else

vec4 czm_getContourMapColor(vec4 oriColor, float fValue)
{
    vec4 contourMapColor = vec4(0.0);
    float finalOpacity = uHypOpacity;
#ifdef Volume
	vec3 aRatioT = vecRotioCoord;
	if((aRatioT.x < 1.0 && aRatioT.x >0.0) && (aRatioT.y < 1.0 && aRatioT.y >0.0) && (aRatioT.z < 1.0 && aRatioT.z >0.0))
	{
	    if(uVolumeType > 0.5)
	    {
			vec4 volumeColor = czm_getVolumeValue(aRatioT);
			if(uMixColorType > 0.5)
			{
				volumeColor = volumeColor * oriColor;
			}
			return volumeColor;
	    }
	    float noValue;
	    float texTest = czm_getVolumeValue(aRatioT, noValue);
	    if(noValue > 0.5)
	    {
	        fValue = uDataFloor + texTest * (uDataCeil - uDataFloor);
	    }
	    else
	    {
	        fValue = uHypMaxVisibleValue + abs(uHypMaxVisibleValue * 0.1);
	    }
	}
	else
	{
	    fValue = uHypMaxVisibleValue + abs(uHypMaxVisibleValue * 0.1);
	}
#endif
    float extendHeight = czm_branchFreeTernary(uHypContourFillMode > 2.9, 0.0, czm_branchFreeTernary(uHypContourFillMode > 1.9, 5.0, 0.0));
    if(fValue > uHypMaxVisibleValue + extendHeight || fValue < uHypMinVisibleValue - extendHeight)
    {
        return uNoValueColor * oriColor;
    }
#ifdef GL_OES_standard_derivatives
    if(uHypContourFillMode > 2.9)
    {
        float mix_con = computeMixCon(fValue);
        contourMapColor = mix(computeContourMapColor(fValue), uHypLineColor, mix_con);
    }
    else if(uHypContourFillMode > 1.9)
    {
        finalOpacity = computeMixCon(fValue);
        contourMapColor = uHypLineColor;
    }
    else if(uHypContourFillMode > 0.9)
#else
    if(uHypContourFillMode > 0.9)
#endif
    {
        contourMapColor = computeContourMapColor(fValue);
    }
    else
    {
        finalOpacity = 0.0;
    }
    vec4 mixColor = mix(vec4(1.0,1.0,1.0,1.0), contourMapColor, finalOpacity);
    vec4 finalColor = mix(oriColor, contourMapColor, finalOpacity);
#ifdef PT_CLOUD
	finalColor = mixColor;
#endif
#ifdef Volume
    if(uMixColorType > 0.5)
    {
        finalColor = mixColor;
    }
#endif
    return finalColor;
}

#endif

#ifdef Volume2
vec4 czm_getHypsometricColor(vec4 oriColor, vec4 volColor)
{
	if(uHypHasAnalysisRegion > 0.1)
    {
		vec4 hypColor = texture2D(uHypsometricRenderTexture, vecHypTexCoord);
		if(hypColor.r < 0.1)
		{
			return oriColor;
		}
	}
    return czm_getContourMapColor(oriColor, volColor);
}
#else
vec4 czm_getHypsometricColor(vec4 oriColor, float wValue)
{
    float fValue = wValue;
	if(uHypHasAnalysisRegion > 0.1)
    {
		vec4 hypColor = texture2D(uHypsometricRenderTexture, vecHypTexCoord);
		if(hypColor.r < 0.1)
		{
			return oriColor;
		}
	}
    return czm_getContourMapColor(oriColor, fValue);
}

vec4 czm_getHypsometricColorByGeoBounds(vec4 oriColor, float wValue, vec4 hypRect, vec2 vTexCoord, vec4 geoBounds)
{
   if(uHypHasAnalysisRegion > 0.1)
    {
        vec2 polyTexCoord = vTexCoord.xy;
        polyTexCoord.x = polyTexCoord.x * (geoBounds.z - geoBounds.x) + geoBounds.x;
        polyTexCoord.y = polyTexCoord.y * (geoBounds.w - geoBounds.y) + geoBounds.y;
        if(polyTexCoord.x < hypRect.x || polyTexCoord.x>hypRect.z || polyTexCoord.y< hypRect.y || polyTexCoord.y > hypRect.w)
        {
            return oriColor;
        }
        vec4 hypColor = texture2D(uHypsometricRenderTexture, polyTexCoord);
        if(hypColor.r < 0.1)
        {
            return oriColor;
        }
    }
    return czm_getContourMapColor(oriColor, wValue);
}

#endif`;var Qt=`/**
 * Calculates the intensity of diffusely reflected light.
 *
 * @name czm_getLambertDiffuse
 * @glslFunction
 *
 * @param {vec3} lightDirectionEC Unit vector pointing to the light source in eye coordinates.
 * @param {vec3} normalEC The surface normal in eye coordinates.
 *
 * @returns {float} The intensity of the diffuse reflection.
 *
 * @see czm_phong
 *
 * @example
 * float diffuseIntensity = czm_getLambertDiffuse(lightDirectionEC, normalEC);
 * float specularIntensity = czm_getSpecular(lightDirectionEC, toEyeEC, normalEC, 200);
 * vec3 color = (diffuseColor * diffuseIntensity) + (specularColor * specularIntensity);
 */
float czm_getLambertDiffuse(vec3 lightDirectionEC, vec3 normalEC)
{
    return max(dot(lightDirectionEC, normalEC), 0.0);
}
`;var Jt=`/**
 * Calculates the specular intensity of reflected light.
 *
 * @name czm_getSpecular
 * @glslFunction
 *
 * @param {vec3} lightDirectionEC Unit vector pointing to the light source in eye coordinates.
 * @param {vec3} toEyeEC Unit vector pointing to the eye position in eye coordinates.
 * @param {vec3} normalEC The surface normal in eye coordinates.
 * @param {float} shininess The sharpness of the specular reflection.  Higher values create a smaller, more focused specular highlight.
 *
 * @returns {float} The intensity of the specular highlight.
 *
 * @see czm_phong
 *
 * @example
 * float diffuseIntensity = czm_getLambertDiffuse(lightDirectionEC, normalEC);
 * float specularIntensity = czm_getSpecular(lightDirectionEC, toEyeEC, normalEC, 200);
 * vec3 color = (diffuseColor * diffuseIntensity) + (specularColor * specularIntensity);
 */
float czm_getSpecular(vec3 lightDirectionEC, vec3 toEyeEC, vec3 normalEC, float shininess)
{
    vec3 toReflectedLight = reflect(-lightDirectionEC, normalEC);
    float specular = max(dot(toReflectedLight, toEyeEC), 0.0);

    // pow has undefined behavior if both parameters <= 0.
    // Prevent this by making sure shininess is at least czm_epsilon2.
    return pow(specular, max(shininess, czm_epsilon2));
}
`;var $t=`void CalculateMipLevel(in vec2 inTexCoord, in float vecTile, in float fMaxMip, inout float mipLevel)
{
	vec2 dx = dFdx(inTexCoord * vecTile);
	vec2 dy = dFdy(inTexCoord * vecTile);
	float dotX = dot(dx, dx);
	float dotY = dot(dy, dy);
	float dMax = max(dotX, dotY);
	float dMin = min(dotX, dotY);
	float offset = (dMax - dMin) / (dMax + dMin);
	offset = clamp(offset, 0.0, 1.0);
	float d = dMax * (1.0 - offset) + dMin * offset;
	mipLevel = 0.5 * log2(d);
	mipLevel = clamp(mipLevel, 0.0, fMaxMip - 1.62);
}

void CalculateMipLevel(in vec2 inTexCoord, in vec2 vecTile, in float fMaxMip, inout float mipLevel)
{
	vec2 dx = dFdx(inTexCoord * vecTile.x);
	vec2 dy = dFdy(inTexCoord * vecTile.y);
	float dotX = dot(dx, dx);
	float dotY = dot(dy, dy);
	float dMax = max(dotX, dotY);
	float dMin = min(dotX, dotY);
	float offset = (dMax - dMin) / (dMax + dMin);
	offset = clamp(offset, 0.0, 1.0);
	float d = dMax * (1.0 - offset) + dMin * offset;
	mipLevel = 0.5 * log2(d);
	mipLevel = clamp(mipLevel, 0.0, fMaxMip - 1.62);
}

void CalculateTexCoord(in vec3 inTexCoord, in float scale, in float XTran, in float YTran, in float fTile, in float mipLevel, inout vec2 outTexCoord)
{
    if(inTexCoord.z < -9000.0)
    {
        outTexCoord = inTexCoord.xy;
    }
    else
    {
	    vec2 fTexCoord = fract(inTexCoord.xy);
	    float offset = 1.0 * pow(2.0, mipLevel) / fTile;
	    fTexCoord = clamp(fTexCoord, offset, 1.0 - offset);
	    outTexCoord.x = (fTexCoord.x + XTran) * scale;
	    outTexCoord.y = (fTexCoord.y + YTran) * scale;
	}
}

#ifdef USE_UVRegion
    varying vec4 uvAtlasRegion;
    vec4 textureAtlasLookup(sampler2D tex, vec2 textureCoordinates) {
        vec4 uvRegion = uvAtlasRegion;
        uvRegion = mod(uvRegion + 65536.0, 65536.0);
        uvRegion /= 65535.0;
        vec2 atlasScale = uvRegion.zw - uvRegion.xy;
        vec2 uvAtlas = fract(textureCoordinates) * atlasScale + uvRegion.xy;
        float maxdUV = 0.125;
        vec2 dUVdx = clamp(dFdx(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
        vec2 dUVdy = clamp(dFdy(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
        return textureGrad(tex, uvAtlas, dUVdx, dUVdy);
    }
#endif

vec4 czm_getTexColorForS3M(sampler2D curTexture, vec3 oriTexCoord, float texTileWidth, float fMaxMipLev, float fTexCoordScale, vec2 vecTexCoordTranslate,float isRGBA, vec4 texUVoffset, out vec2 outTexCoord)
{
	vec4 color = vec4(1.0);
	if(oriTexCoord.z <= -99900.0){
		return color;
	}
    float mipLevel = 0.0;
#ifdef GL_OES_standard_derivatives
    CalculateMipLevel(oriTexCoord.xy, texTileWidth, fMaxMipLev, mipLevel);
#endif
    vec2 realTexCoord;
    CalculateTexCoord(oriTexCoord, fTexCoordScale, vecTexCoordTranslate.x, vecTexCoordTranslate.y, texTileWidth, mipLevel, realTexCoord);
	if(isRGBA > 0.5)
	{
	    vec2 rgbTexCoord;
		rgbTexCoord.x = (realTexCoord.x + vecTexCoordTranslate.x * fTexCoordScale) * 0.5;
		rgbTexCoord.y = (realTexCoord.y + vecTexCoordTranslate.y * fTexCoordScale) * 0.5;
		rgbTexCoord.xy += texUVoffset.xy;
        color = texture2D(curTexture, rgbTexCoord.xy, -10.0);
		vec2 vecAlphaTexCoord;
		vecAlphaTexCoord.x = rgbTexCoord.x;
		vecAlphaTexCoord.y = rgbTexCoord.y + fTexCoordScale * 0.5;
		vecAlphaTexCoord.xy += texUVoffset.xy;
	    color.a = texture2D(curTexture, vecAlphaTexCoord.xy, -10.0).r;
	}
	else
	{
	    realTexCoord = realTexCoord * texUVoffset.zw + texUVoffset.xy;
	    if(oriTexCoord.z < -9000.0)
        {
            color = texture2D(curTexture, realTexCoord.xy);
        }
        else
        {
			#ifndef USE_UVRegion
				#ifdef GL_EXT_shader_texture_lod
					color = texture2DLodEXT(curTexture, realTexCoord.xy, mipLevel);
				#else
					#ifdef WEBEL2
						color = textureLod(curTexture, realTexCoord.xy, mipLevel);
					#else
						color = texture2D(curTexture, realTexCoord.xy, mipLevel);
					#endif
				#endif
			#else    
				color = textureAtlasLookup(curTexture, realTexCoord);
			#endif
        }
    #ifdef RGBTOBGR
        color = color.bgra;
    #endif
	}
	outTexCoord = realTexCoord;
	return color;
}

vec4 czm_getTexColorForS3M(sampler2D texture, vec2 uv, vec2 texDim, vec2 texTran, vec2 texScale, float maxMipLevel, out vec2 outTexCoord)
{
    if(maxMipLevel < 0.0)
    {
        return vec4(1.0);
    }
	vec4 colorCeil = vec4(1.0);
    float mipLevel = 0.0;
#ifdef GL_OES_standard_derivatives
    CalculateMipLevel(uv, texDim, maxMipLevel, mipLevel);
#endif
	float ceilMipLevel = ceil(mipLevel);
	vec2 translate = vec2(texTran.x, texTran.y);
	float temp;
	if(ceilMipLevel > 0.0)
	{
		translate.x = texTran.x + texScale.x;
		temp = pow(2.0, ceilMipLevel - 1.0);
		translate.y = texTran.y + texScale.y * (temp - 1.0) / temp;
	}
    float scale = 1.0 / pow(2.0, ceilMipLevel);
	vec2 texcoord = fract(uv);
	float offsetX = pow(2.0, ceilMipLevel) / texDim.x;
	float offsetY = pow(2.0, ceilMipLevel) / texDim.y;
	texcoord.x = clamp(texcoord.x, 0.0 + offsetX, 1.0 - offsetX);
	texcoord.y = clamp(texcoord.y, 0.0 + offsetY, 1.0 - offsetY);
	texcoord.x = texcoord.x * texScale.x * scale + translate.x;
	texcoord.y = texcoord.y * texScale.y * scale + translate.y;
	#ifdef GL_EXT_shader_texture_lod
        colorCeil = texture2DLodEXT(texture, texcoord.xy, 0.0);
    #else
        #ifdef WEBEL2
            colorCeil = textureLod(texture, texcoord.xy, 0.0);
        #else
            colorCeil = texture2D(texture, texcoord.xy, -10.0);
        #endif
    #endif
	vec4 colorFloor = vec4(1.0);
	float floorMipLevel = floor(mipLevel);
	translate = vec2(texTran.x, texTran.y);
	if(floorMipLevel > 0.0)
	{
	    translate.x = texTran.x + texScale.x;
	    temp = pow(2.0, floorMipLevel - 1.0);
	    translate.y = texTran.y + texScale.y * (temp - 1.0) / temp;
	}
	scale = 1.0 / pow(2.0, floorMipLevel);
	texcoord = fract(uv);
	offsetX = pow(2.0, floorMipLevel) / texDim.x;
	offsetY = pow(2.0, floorMipLevel) / texDim.y;
	texcoord.x = clamp(texcoord.x, 0.0 + offsetX, 1.0 - offsetX);
	texcoord.y = clamp(texcoord.y, 0.0 + offsetY, 1.0 - offsetY);
	texcoord.x = texcoord.x * texScale.x * scale + translate.x;
	texcoord.y = texcoord.y * texScale.y * scale + translate.y;
	#ifdef GL_EXT_shader_texture_lod
        colorFloor = texture2DLodEXT(texture, texcoord.xy, 0.0);
    #else
        #ifdef WEBEL2
            colorFloor = textureLod(texture, texcoord.xy, 0.0);
        #else
            colorFloor = texture2D(texture, texcoord.xy, -10.0);
        #endif
    #endif
	vec4 color = colorCeil * 0.5 + colorFloor * 0.5;
	return color;
}`;var eo=`const int SHIFT_LEFT8 = 256;

void czm_getTextureMatrixFromZValue(in int nZ, inout float XTran, inout float YTran, inout float scale, inout float isRGBA)
{
    if(nZ < 0){
        return ;
    }
    int nDel8 = nZ / SHIFT_LEFT8;
    int nDel16 = nDel8 / SHIFT_LEFT8;
    YTran = float(nZ - nDel8 * SHIFT_LEFT8);
    XTran = float(nDel8 - nDel16 * SHIFT_LEFT8);
    int nLevel = nDel16;
    scale = 1.0 / pow(2.0, float(nLevel));
}`;var no=`uniform sampler2D uVolumeTexture;
#ifdef TIME_ORDER
uniform sampler2D uNextVolumeTexture;
uniform float uTimeRatio;
#endif

#ifdef Volume
uniform float width;
uniform float height;
uniform float depth;
uniform float sideBlockCount;
uniform float blockLength;
uniform float texLength;
uniform float uFilterMode;
#endif

float czm_unpackVolume(vec3 packedDepth)
{
   return dot(packedDepth, vec3(1.0, 1.0 / 255.0, 1.0 / 65025.0));
}

#ifdef Volume
vec2 computeVolumeTextureCoord(vec3 texCoord, float fLevel)
{
    float yOffset = floor((fLevel+0.25/sideBlockCount) / sideBlockCount);
    float xOffset = fLevel - yOffset * sideBlockCount;
    float texCoordV = (texCoord.y * height + yOffset * blockLength) / texLength;
    float texCoordU = (texCoord.x * width + xOffset * blockLength) / texLength;
    return vec2(texCoordU, texCoordV);
}

float computeVolumeValue(sampler2D volumeTexture, vec2 topTexCoord, vec2 bottomTexCoord, float ratio, out float noValue)
{
    vec4 volumeValue1 = texture2D(volumeTexture, topTexCoord);
    vec4 volumeValue2 = texture2D(volumeTexture, bottomTexCoord);
    float fValue1 = clamp(czm_unpackVolume(volumeValue1.xyz),0.0,1.0);
    float fValue2 = clamp(czm_unpackVolume(volumeValue2.xyz),0.0,1.0);
    if(uFilterMode >0.5)
    {
        if(ratio<0.5)
        {
            ratio = 0.0;
        }
        else
        {
            ratio = 1.0;
        }
    }
    noValue = mix(volumeValue1.a, volumeValue2.a, ratio);
    if(volumeValue1.a < 0.5)
    {
        fValue1 = fValue2;
    }
    if(volumeValue2.a < 0.5)
    {
        fValue2 = fValue1;
    }
    return mix(fValue1, fValue2, ratio);
}

float czm_getVolumeValue(vec3 texCoord, out float noValue)
{
    float fLevel = (depth - 1.0) * texCoord.z;
    float bottomLevel= floor(fLevel);
    float topLevel = bottomLevel + 1.0;
    float ratio = topLevel - fLevel;
    vec2 topTexCoord = computeVolumeTextureCoord(texCoord, topLevel);
    vec2 bottomTexCoord = computeVolumeTextureCoord(texCoord, bottomLevel);
    float fResult = computeVolumeValue(uVolumeTexture, topTexCoord, bottomTexCoord, ratio, noValue);
#ifdef TIME_ORDER
    float fNextResult = computeVolumeValue(uNextVolumeTexture, topTexCoord, bottomTexCoord, ratio, noValue);
    fResult = mix(fResult, fNextResult, uTimeRatio);
#endif
    return fResult;
}

vec4 czm_getVolumeValue(vec3 texCoord)
{
	float fLevel = (depth - 1.0) * texCoord.z;
	float bottomLevel= floor(fLevel);
	float topLevel = bottomLevel + 1.0;
	float ratio = topLevel - fLevel;
	float yOffset1 = floor((topLevel+0.25/sideBlockCount) / sideBlockCount);
	float xOffset1 = topLevel - yOffset1 * sideBlockCount;
	float texCoordV1 = (texCoord.y * height + yOffset1 * blockLength)/texLength;
	float texCoordU1 = (texCoord.x * width + xOffset1 * blockLength)/texLength;
	vec4 volumeColor1 = texture2D(uVolumeTexture, vec2(texCoordU1,texCoordV1));
	float yOffset2 = floor((bottomLevel+0.25/sideBlockCount) / sideBlockCount);
	float xOffset2 = bottomLevel - yOffset2 * sideBlockCount;
	float texCoordV2 = (texCoord.y * height + yOffset2 * blockLength)/texLength;
	float texCoordU2 = (texCoord.x * width + xOffset2 * blockLength)/texLength;
	vec4 volumeColor2 = texture2D(uVolumeTexture, vec2(texCoordU2, texCoordV2));

	if(uFilterMode >0.5)
	{
		if(ratio<0.5)
		{
			ratio = 0.0;
		}
		else
		{
			ratio = 1.0;
		}
	}

	vec4 volumeColor = mix(volumeColor1, volumeColor2, ratio);

	return volumeColor;
}
#endif`;var to=`uniform sampler2D uVolumeTexture1;
uniform sampler2D uVolumeTexture2;
uniform sampler2D uVolumeTexture3;


uniform mat4 uMultiResolutionPara1;
/*
{uMultiResolutionTranslation1
0.0, 0.0, 0.0, 0.0,
width1,height1,sideBlockCount1,blockLength1
texLength1, 0.0, 0.0, 0.0};
*/
uniform mat4 uMultiResolutionPara2;
uniform mat4 uMultiResolutionPara3;

#ifdef TIME_ORDER
uniform sampler2D uNextVolumeTexture1;
uniform sampler2D uNextVolumeTexture2;
uniform sampler2D uNextVolumeTexture3;
#endif

#ifdef Volume

vec2 computeVolumeTextureCoord(vec2 texCoord, float fLevel, float texWidth, float texHeight, float texSideBlockCount, float texBlockLength, float texTotalLength)
{
    float yOffset = floor((fLevel+0.25/texSideBlockCount) / texSideBlockCount);
    float xOffset = fLevel - yOffset * texSideBlockCount;
    float texCoordV = (texCoord.y * texHeight + yOffset * texBlockLength) / texTotalLength;
    float texCoordU = (texCoord.x * texWidth + xOffset * texBlockLength) / texTotalLength;
    return vec2(texCoordU, texCoordV);
}

float czm_getVolumeValueMultiResolution(vec3 texCoord, out float noValue)
{
    float fLevel = (depth - 1.0) * texCoord.z;
    float bottomLevel= floor(fLevel);
    float topLevel = bottomLevel + 1.0;
    float ratio = topLevel - fLevel;


    vec2 topTexCoord = computeVolumeTextureCoord(texCoord, topLevel);
    vec2 bottomTexCoord = computeVolumeTextureCoord(texCoord, bottomLevel);

    float fResult = computeVolumeValue(uVolumeTexture, topTexCoord, bottomTexCoord, ratio, noValue);
#ifdef TIME_ORDER
    float fNextResult = computeVolumeValue(uNextVolumeTexture, topTexCoord, bottomTexCoord, ratio, noValue);
    fResult = mix(fResult, fNextResult, uTimeRatio);
#endif


    float width = uMultiResolutionPara1[2].x;
    float height = uMultiResolutionPara1[2].y;
    float sideBlockCount = uMultiResolutionPara1[2].z;
    float blockLength = uMultiResolutionPara1[2].w;
    float texLength = uMultiResolutionPara1[3].x;
    vec4 uMultiResolutionTranslation = uMultiResolutionPara1[0];

    vec2 texCoord1 = (texCoord.xy - uMultiResolutionTranslation.xy) * uMultiResolutionTranslation.zw;
    vec2 topTexCoord1 = computeVolumeTextureCoord(texCoord1, topLevel, width, height, sideBlockCount, blockLength, texLength);
    vec2 bottomTexCoord1 = computeVolumeTextureCoord(texCoord1, bottomLevel, width, height, sideBlockCount, blockLength, texLength);
    float alpha1 = 5.0 * clamp( max(abs(texCoord1.x - 0.5), abs(texCoord1.y - 0.5)) - 0.3,0.0,0.2);

    float fResult1 = computeVolumeValue(uVolumeTexture1, topTexCoord1, bottomTexCoord1, ratio, noValue);
#ifdef TIME_ORDER
    float fNextResult1 = computeVolumeValue(uNextVolumeTexture1, topTexCoord1, bottomTexCoord1, ratio, noValue);
    fResult1 = mix(fResult1, fNextResult1, uTimeRatio);
#endif


    width = uMultiResolutionPara2[2].x;
    height = uMultiResolutionPara2[2].y;
    sideBlockCount = uMultiResolutionPara2[2].z;
    blockLength = uMultiResolutionPara2[2].w;
    texLength = uMultiResolutionPara2[3].x;
    uMultiResolutionTranslation = uMultiResolutionPara2[0];

    vec2 texCoord2 = (texCoord.xy - uMultiResolutionTranslation.xy) * uMultiResolutionTranslation.zw;
    vec2 topTexCoord2 = computeVolumeTextureCoord(texCoord2, topLevel, width, height, sideBlockCount, blockLength, texLength);
    vec2 bottomTexCoord2 = computeVolumeTextureCoord(texCoord2, bottomLevel, width, height, sideBlockCount, blockLength, texLength);
    float alpha2 = 5.0 * clamp( max(abs(texCoord2.x - 0.5), abs(texCoord2.y - 0.5)) - 0.3,0.0,0.2);

    float fResult2 = computeVolumeValue(uVolumeTexture2, topTexCoord2, bottomTexCoord2, ratio, noValue);
#ifdef TIME_ORDER
    float fNextResult2 = computeVolumeValue(uNextVolumeTexture2, topTexCoord2, bottomTexCoord2, ratio, noValue);
    fResult2 = mix(fResult2, fNextResult2, uTimeRatio);
#endif


    width = uMultiResolutionPara3[2].x;
    height = uMultiResolutionPara3[2].y;
    sideBlockCount = uMultiResolutionPara3[2].z;
    blockLength = uMultiResolutionPara3[2].w;
    texLength = uMultiResolutionPara3[3].x;
    uMultiResolutionTranslation = uMultiResolutionPara3[0];

    vec2 texCoord3 = (texCoord.xy - uMultiResolutionTranslation.xy) * uMultiResolutionTranslation.zw;
    vec2 topTexCoord3 = computeVolumeTextureCoord(texCoord3, topLevel, width, height, sideBlockCount, blockLength, texLength);
    vec2 bottomTexCoord3 = computeVolumeTextureCoord(texCoord3, bottomLevel, width, height, sideBlockCount, blockLength, texLength);
    float alpha3 = 5.0 * clamp( max(abs(texCoord3.x - 0.5), abs(texCoord3.y - 0.5)) - 0.3,0.0,0.2);

    float fResult3 = computeVolumeValue(uVolumeTexture3, topTexCoord3, bottomTexCoord3, ratio, noValue);

#ifdef TIME_ORDER
    float fNextResult3 = computeVolumeValue(uNextVolumeTexture3, topTexCoord3, bottomTexCoord3, ratio, noValue);
    fResult3 = mix(fResult3, fNextResult3, uTimeRatio);
#endif


    //return mix(fResult2, mix(fResult1, fResult, alpha1), alpha2);
    return mix(fResult3, mix(fResult2, mix(fResult1, fResult, alpha1), alpha2), alpha3);
}

#endif`;var oo=`/**
 * @private
 */
vec4 czm_getWaterNoise(sampler2D normalMap, vec2 uv, float time, float angleInRadians)
{
    float cosAngle = cos(angleInRadians);
    float sinAngle = sin(angleInRadians);

    // time dependent sampling directions
    vec2 s0 = vec2(1.0/17.0, 0.0);
    vec2 s1 = vec2(-1.0/29.0, 0.0);
    vec2 s2 = vec2(1.0/101.0, 1.0/59.0);
    vec2 s3 = vec2(-1.0/109.0, -1.0/57.0);

    // rotate sampling direction by specified angle
    s0 = vec2((cosAngle * s0.x) - (sinAngle * s0.y), (sinAngle * s0.x) + (cosAngle * s0.y));
    s1 = vec2((cosAngle * s1.x) - (sinAngle * s1.y), (sinAngle * s1.x) + (cosAngle * s1.y));
    s2 = vec2((cosAngle * s2.x) - (sinAngle * s2.y), (sinAngle * s2.x) + (cosAngle * s2.y));
    s3 = vec2((cosAngle * s3.x) - (sinAngle * s3.y), (sinAngle * s3.x) + (cosAngle * s3.y));

    vec2 uv0 = (uv/103.0) + (time * s0);
    vec2 uv1 = uv/107.0 + (time * s1) + vec2(0.23);
    vec2 uv2 = uv/vec2(897.0, 983.0) + (time * s2) + vec2(0.51);
    vec2 uv3 = uv/vec2(991.0, 877.0) + (time * s3) + vec2(0.71);

    uv0 = fract(uv0);
    uv1 = fract(uv1);
    uv2 = fract(uv2);
    uv3 = fract(uv3);
    vec4 noise = (texture2D(normalMap, uv0)) +
                 (texture2D(normalMap, uv1)) +
                 (texture2D(normalMap, uv2)) +
                 (texture2D(normalMap, uv3));

    // average and scale to between -1 and 1
    return ((noise / 4.0) - 0.5) * 2.0;
}
`;var ro=`/**
 * Returns the WGS84 ellipsoid, with its center at the origin of world coordinates, in eye coordinates.
 *
 * @name czm_getWgs84EllipsoidEC
 * @glslFunction
 *
 * @returns {czm_ellipsoid} The WGS84 ellipsoid, with its center at the origin of world coordinates, in eye coordinates.
 *
 * @see Ellipsoid.WGS84
 *
 * @example
 * czm_ellipsoid ellipsoid = czm_getWgs84EllipsoidEC();
 */
czm_ellipsoid czm_getWgs84EllipsoidEC()
{
    vec3 radii = vec3(6378137.0, 6378137.0, 6378137.0);
    vec3 inverseRadii = vec3(1.0 / radii.x, 1.0 / radii.y, 1.0 / radii.z);
    vec3 inverseRadiiSquared = inverseRadii * inverseRadii;
    czm_ellipsoid temp = czm_ellipsoid(czm_view[3].xyz, radii, inverseRadii, inverseRadiiSquared);
    return temp;
}
`;var io=`/**
 * Converts an HSB color (hue, saturation, brightness) to RGB
 * HSB <-> RGB conversion with minimal branching:
 *
 * @name czm_HSBToRGB
 * @glslFunction
 * 
 * @param {vec3} hsb The color in HSB.
 *
 * @returns {vec3} The color in RGB.
 *
 * @example
 * vec3 hsb = czm_RGBToHSB(rgb);
 * hsb.z *= 0.1;
 * rgb = czm_HSBToRGB(hsb);
 */

const vec4 K_HSB2RGB = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);

vec3 czm_HSBToRGB(vec3 hsb)
{
    vec3 p = abs(fract(hsb.xxx + K_HSB2RGB.xyz) * 6.0 - K_HSB2RGB.www);
    return hsb.z * mix(K_HSB2RGB.xxx, clamp(p - K_HSB2RGB.xxx, 0.0, 1.0), hsb.y);
}
`;var ao=`/**
 * Converts an HSL color (hue, saturation, lightness) to RGB
 * HSL <-> RGB conversion: 
 *
 * @name czm_HSLToRGB
 * @glslFunction
 * 
 * @param {vec3} rgb The color in HSL.
 *
 * @returns {vec3} The color in RGB.
 *
 * @example
 * vec3 hsl = czm_RGBToHSL(rgb);
 * hsl.z *= 0.1;
 * rgb = czm_HSLToRGB(hsl);
 */

vec3 hueToRGB(float hue)
{
    float r = abs(hue * 6.0 - 3.0) - 1.0;
    float g = 2.0 - abs(hue * 6.0 - 2.0);
    float b = 2.0 - abs(hue * 6.0 - 4.0);
    return clamp(vec3(r, g, b), 0.0, 1.0);
}

vec3 czm_HSLToRGB(vec3 hsl)
{
    vec3 rgb = hueToRGB(hsl.x);
    float c = (1.0 - abs(2.0 * hsl.z - 1.0)) * hsl.y;
    return (rgb - 0.5) * c + hsl.z;
}
`;var lo=`/**
 * Adjusts the hue of a color.
 * 
 * @name czm_hue
 * @glslFunction
 * 
 * @param {vec3} rgb The color.
 * @param {float} adjustment The amount to adjust the hue of the color in radians.
 *
 * @returns {float} The color with the hue adjusted.
 *
 * @example
 * vec3 adjustHue = czm_hue(color, czm_pi); // The same as czm_hue(color, -czm_pi)
 */
vec3 czm_hue(vec3 rgb, float adjustment)
{
    const mat3 toYIQ = mat3(0.299,     0.587,     0.114,
                            0.595716, -0.274453, -0.321263,
                            0.211456, -0.522591,  0.311135);
    const mat3 toRGB = mat3(1.0,  0.9563,  0.6210,
                            1.0, -0.2721, -0.6474,
                            1.0, -1.107,   1.7046);
    
    vec3 yiq = toYIQ * rgb;
    float hue = atan(yiq.z, yiq.y) + adjustment;
    float chroma = sqrt(yiq.z * yiq.z + yiq.y * yiq.y);
    
    vec3 color = vec3(yiq.x, chroma * cos(hue), chroma * sin(hue));
    return toRGB * color;
}
`;var co=`/**
 * Converts a color in linear space to RGB space.
 *
 * @name czm_inverseGamma
 * @glslFunction
 *
 * @param {vec3} color The color in linear space.
 * @returns {vec3} The color in RGB space.
 */
vec3 czm_inverseGamma(vec3 color) {
    return pow(color, vec3(1.0 / czm_gamma));
}
`;var so=`mat3 czm_inverseMatrix(mat3 m)
{
    float Determinant =
           m[0][0] * (m[1][1] * m[2][2] - m[2][1] * m[1][2])
         - m[1][0] * (m[0][1] * m[2][2] - m[2][1] * m[0][2])
         + m[2][0] * (m[0][1] * m[1][2] - m[1][1] * m[0][2]);

     mat3 Inverse;
     Inverse[0][0] = + (m[1][1] * m[2][2] - m[2][1] * m[1][2]);
     Inverse[1][0] = - (m[1][0] * m[2][2] - m[2][0] * m[1][2]);
     Inverse[2][0] = + (m[1][0] * m[2][1] - m[2][0] * m[1][1]);
     Inverse[0][1] = - (m[0][1] * m[2][2] - m[2][1] * m[0][2]);
     Inverse[1][1] = + (m[0][0] * m[2][2] - m[2][0] * m[0][2]);
     Inverse[2][1] = - (m[0][0] * m[2][1] - m[2][0] * m[0][1]);
     Inverse[0][2] = + (m[0][1] * m[1][2] - m[1][1] * m[0][2]);
     Inverse[1][2] = - (m[0][0] * m[1][2] - m[1][0] * m[0][2]);
     Inverse[2][2] = + (m[0][0] * m[1][1] - m[1][0] * m[0][1]);
     Inverse /= Determinant;

     return Inverse;
}

mat4 czm_inverseMatrix(mat4 m)
{
    float Coef00 = m[2][2] * m[3][3] - m[3][2] * m[2][3];
     float Coef02 = m[1][2] * m[3][3] - m[3][2] * m[1][3];
     float Coef03 = m[1][2] * m[2][3] - m[2][2] * m[1][3];

     float Coef04 = m[2][1] * m[3][3] - m[3][1] * m[2][3];
     float Coef06 = m[1][1] * m[3][3] - m[3][1] * m[1][3];
     float Coef07 = m[1][1] * m[2][3] - m[2][1] * m[1][3];

     float Coef08 = m[2][1] * m[3][2] - m[3][1] * m[2][2];
     float Coef10 = m[1][1] * m[3][2] - m[3][1] * m[1][2];
     float Coef11 = m[1][1] * m[2][2] - m[2][1] * m[1][2];

     float Coef12 = m[2][0] * m[3][3] - m[3][0] * m[2][3];
     float Coef14 = m[1][0] * m[3][3] - m[3][0] * m[1][3];
     float Coef15 = m[1][0] * m[2][3] - m[2][0] * m[1][3];

     float Coef16 = m[2][0] * m[3][2] - m[3][0] * m[2][2];
     float Coef18 = m[1][0] * m[3][2] - m[3][0] * m[1][2];
     float Coef19 = m[1][0] * m[2][2] - m[2][0] * m[1][2];

     float Coef20 = m[2][0] * m[3][1] - m[3][0] * m[2][1];
     float Coef22 = m[1][0] * m[3][1] - m[3][0] * m[1][1];
     float Coef23 = m[1][0] * m[2][1] - m[2][0] * m[1][1];

     const vec4 SignA = vec4( 1.0, -1.0,  1.0, -1.0);
     const vec4 SignB = vec4(-1.0,  1.0, -1.0,  1.0);

     vec4 Fac0 = vec4(Coef00, Coef00, Coef02, Coef03);
     vec4 Fac1 = vec4(Coef04, Coef04, Coef06, Coef07);
     vec4 Fac2 = vec4(Coef08, Coef08, Coef10, Coef11);
     vec4 Fac3 = vec4(Coef12, Coef12, Coef14, Coef15);
     vec4 Fac4 = vec4(Coef16, Coef16, Coef18, Coef19);
     vec4 Fac5 = vec4(Coef20, Coef20, Coef22, Coef23);

     vec4 Vec0 = vec4(m[1][0], m[0][0], m[0][0], m[0][0]);
     vec4 Vec1 = vec4(m[1][1], m[0][1], m[0][1], m[0][1]);
     vec4 Vec2 = vec4(m[1][2], m[0][2], m[0][2], m[0][2]);
     vec4 Vec3 = vec4(m[1][3], m[0][3], m[0][3], m[0][3]);

     vec4 Inv0 = SignA * (Vec1 * Fac0 - Vec2 * Fac1 + Vec3 * Fac2);
     vec4 Inv1 = SignB * (Vec0 * Fac0 - Vec2 * Fac3 + Vec3 * Fac4);
     vec4 Inv2 = SignA * (Vec0 * Fac1 - Vec1 * Fac3 + Vec3 * Fac5);
     vec4 Inv3 = SignB * (Vec0 * Fac2 - Vec1 * Fac4 + Vec2 * Fac5);

     mat4 Inverse = mat4(Inv0, Inv1, Inv2, Inv3);

     vec4 Row0 = vec4(Inverse[0][0], Inverse[1][0], Inverse[2][0], Inverse[3][0]);

     float Determinant = dot(m[0], Row0);

     Inverse /= Determinant;

     return Inverse;
}
`;var fo=`/**
 * Determines if a time interval is empty.
 *
 * @name czm_isEmpty
 * @glslFunction 
 * 
 * @param {czm_raySegment} interval The interval to test.
 * 
 * @returns {bool} <code>true</code> if the time interval is empty; otherwise, <code>false</code>.
 *
 * @example
 * bool b0 = czm_isEmpty(czm_emptyRaySegment);      // true
 * bool b1 = czm_isEmpty(czm_raySegment(0.0, 1.0)); // false
 * bool b2 = czm_isEmpty(czm_raySegment(1.0, 1.0)); // false, contains 1.0.
 */
bool czm_isEmpty(czm_raySegment interval)
{
    return (interval.stop < 0.0);
}
`;var uo=`/**
 * Determines if a time interval is empty.
 *
 * @name czm_isFull
 * @glslFunction 
 * 
 * @param {czm_raySegment} interval The interval to test.
 * 
 * @returns {bool} <code>true</code> if the time interval is empty; otherwise, <code>false</code>.
 *
 * @example
 * bool b0 = czm_isEmpty(czm_emptyRaySegment);      // true
 * bool b1 = czm_isEmpty(czm_raySegment(0.0, 1.0)); // false
 * bool b2 = czm_isEmpty(czm_raySegment(1.0, 1.0)); // false, contains 1.0.
 */
bool czm_isFull(czm_raySegment interval)
{
    return (interval.start == 0.0 && interval.stop == czm_infinity);
}
`;var mo=`/**
 * Computes the fraction of a Web Wercator rectangle at which a given geodetic latitude is located.
 *
 * @name czm_latitudeToWebMercatorFraction
 * @glslFunction
 *
 * @param {float} latitude The geodetic latitude, in radians.
 * @param {float} southMercatorY The Web Mercator coordinate of the southern boundary of the rectangle.
 * @param {float} oneOverMercatorHeight The total height of the rectangle in Web Mercator coordinates.
 *
 * @returns {float} The fraction of the rectangle at which the latitude occurs.  If the latitude is the southern
 *          boundary of the rectangle, the return value will be zero.  If it is the northern boundary, the return
 *          value will be 1.0.  Latitudes in between are mapped according to the Web Mercator projection.
 */ 
float czm_latitudeToWebMercatorFraction(float latitude, float southMercatorY, float oneOverMercatorHeight)
{
    float sinLatitude = sin(latitude);
    float mercatorY = 0.5 * log((1.0 + sinLatitude) / (1.0 - sinLatitude));
    
    return (mercatorY - southMercatorY) * oneOverMercatorHeight;
}
`;var po=`/**
 * Computes distance from an point in 2D to a line in 2D.
 *
 * @name czm_lineDistance
 * @glslFunction
 *
 * param {vec2} point1 A point along the line.
 * param {vec2} point2 A point along the line.
 * param {vec2} point A point that may or may not be on the line.
 * returns {float} The distance from the point to the line.
 */
float czm_lineDistance(vec2 point1, vec2 point2, vec2 point) {
    return abs((point2.y - point1.y) * point.x - (point2.x - point1.x) * point.y + point2.x * point1.y - point2.y * point1.x) / distance(point2, point1);
}
`;var vo=`/**
 * Computes the luminance of a color. 
 *
 * @name czm_luminance
 * @glslFunction
 *
 * @param {vec3} rgb The color.
 * 
 * @returns {float} The luminance.
 *
 * @example
 * float light = czm_luminance(vec3(0.0)); // 0.0
 * float dark = czm_luminance(vec3(1.0));  // ~1.0 
 */
float czm_luminance(vec3 rgb)
{
    // Algorithm from Chapter 10 of Graphics Shaders.
    const vec3 W = vec3(0.2125, 0.7154, 0.0721);
    return dot(rgb, W);
}
`;var ho=`/**
 * Computes the size of a pixel in meters at a distance from the eye.
 * <p>
 * Use this version when passing in a custom pixel ratio. For example, passing in 1.0 will return meters per native device pixel.
 * </p>
 * @name czm_metersPerPixel
 * @glslFunction
 *
 * @param {vec3} positionEC The position to get the meters per pixel in eye coordinates.
 * @param {float} pixelRatio The scaling factor from pixel space to coordinate space
 *
 * @returns {float} The meters per pixel at positionEC.
 */
float czm_metersPerPixel(vec4 positionEC, float pixelRatio)
{
    float width = czm_viewport.z;
    float height = czm_viewport.w;
    float pixelWidth;
    float pixelHeight;

    float top = czm_frustumPlanes.x;
    float bottom = czm_frustumPlanes.y;
    float left = czm_frustumPlanes.z;
    float right = czm_frustumPlanes.w;

    if (czm_sceneMode == czm_sceneMode2D || czm_orthographicIn3D == 1.0)
    {
        float frustumWidth = right - left;
        float frustumHeight = top - bottom;
        pixelWidth = frustumWidth / width;
        pixelHeight = frustumHeight / height;
    }
    else
    {
        float distanceToPixel = -positionEC.z;
        float inverseNear = 1.0 / czm_currentFrustum.x;
        float tanTheta = top * inverseNear;
        pixelHeight = 2.0 * distanceToPixel * tanTheta / height;
        tanTheta = right * inverseNear;
        pixelWidth = 2.0 * distanceToPixel * tanTheta / width;
    }

    return max(pixelWidth, pixelHeight) * pixelRatio;
}

/**
 * Computes the size of a pixel in meters at a distance from the eye.
 * <p>
 * Use this version when scaling by pixel ratio.
 * </p>
 * @name czm_metersPerPixel
 * @glslFunction
 *
 * @param {vec3} positionEC The position to get the meters per pixel in eye coordinates.
 *
 * @returns {float} The meters per pixel at positionEC.
 */
float czm_metersPerPixel(vec4 positionEC)
{
    return czm_metersPerPixel(positionEC, czm_pixelRatio);
}
`;var go=`/**
 * Transforms a position from model to window coordinates.  The transformation
 * from model to clip coordinates is done using {@link czm_modelViewProjection}.
 * The transform from normalized device coordinates to window coordinates is
 * done using {@link czm_viewportTransformation}, which assumes a depth range
 * of <code>near = 0</code> and <code>far = 1</code>.
 * <br /><br />
 * This transform is useful when there is a need to manipulate window coordinates
 * in a vertex shader as done by {@link BillboardCollection}.
 * <br /><br />
 * This function should not be confused with {@link czm_viewportOrthographic},
 * which is an orthographic projection matrix that transforms from window 
 * coordinates to clip coordinates.
 *
 * @name czm_modelToWindowCoordinates
 * @glslFunction
 *
 * @param {vec4} position The position in model coordinates to transform.
 *
 * @returns {vec4} The transformed position in window coordinates.
 *
 * @see czm_eyeToWindowCoordinates
 * @see czm_modelViewProjection
 * @see czm_viewportTransformation
 * @see czm_viewportOrthographic
 * @see BillboardCollection
 *
 * @example
 * vec4 positionWC = czm_modelToWindowCoordinates(positionMC);
 */
vec4 czm_modelToWindowCoordinates(vec4 position)
{
    vec4 q = czm_modelViewProjection * position;                // clip coordinates
    q.xyz /= q.w;                                                // normalized device coordinates
    q.xyz = (czm_viewportTransformation * vec4(q.xyz, 1.0)).xyz; // window coordinates
    return q;
}
`;var _o=`/**
 * DOC_TBA
 *
 * @name czm_multiplyWithColorBalance
 * @glslFunction
 */
vec3 czm_multiplyWithColorBalance(vec3 left, vec3 right)
{
    // Algorithm from Chapter 10 of Graphics Shaders.
    const vec3 W = vec3(0.2125, 0.7154, 0.0721);
    
    vec3 target = left * right;
    float leftLuminance = dot(left, W);
    float rightLuminance = dot(right, W);
    float targetLuminance = dot(target, W);
    
    return ((leftLuminance + rightLuminance) / (2.0 * targetLuminance)) * target;
}
`;var xo=`/**
 * Computes a value that scales with distance.  The scaling is clamped at the near and
 * far distances, and does not extrapolate.  This function works with the
 * {@link NearFarScalar} JavaScript class.
 *
 * @name czm_nearFarScalar
 * @glslFunction
 *
 * @param {vec4} nearFarScalar A vector with 4 components: Near distance (x), Near value (y), Far distance (z), Far value (w).
 * @param {float} cameraDistSq The square of the current distance from the camera.
 *
 * @returns {float} The value at this distance.
 */
float czm_nearFarScalar(vec4 nearFarScalar, float cameraDistSq)
{
    float valueAtMin = nearFarScalar.y;
    float valueAtMax = nearFarScalar.w;
    float nearDistanceSq = nearFarScalar.x * nearFarScalar.x;
    float farDistanceSq = nearFarScalar.z * nearFarScalar.z;

    float t = (cameraDistSq - nearDistanceSq) / (farDistanceSq - nearDistanceSq);

    t = pow(clamp(t, 0.0, 1.0), 0.2);

    return mix(valueAtMin, valueAtMax, t);
}
`;var Co=` /**
  * Decodes a unit-length vector in 'oct' encoding to a normalized 3-component Cartesian vector.
  * The 'oct' encoding is described in "A Survey of Efficient Representations of Independent Unit Vectors",
  * Cigolle et al 2014:
  *
  * @name czm_octDecode
  * @param {vec2} encoded The oct-encoded, unit-length vector
  * @param {float} range The maximum value of the SNORM range. The encoded vector is stored in log2(rangeMax+1) bits.
  * @returns {vec3} The decoded and normalized vector
  */
  vec3 czm_octDecode(vec2 encoded, float range)
  {
      if (encoded.x == 0.0 && encoded.y == 0.0) {
          return vec3(0.0, 0.0, 0.0);
      }

     encoded = encoded / range * 2.0 - 1.0;
     vec3 v = vec3(encoded.x, encoded.y, 1.0 - abs(encoded.x) - abs(encoded.y));
     if (v.z < 0.0)
     {
         v.xy = (1.0 - abs(v.yx)) * czm_signNotZero(v.xy);
     }

     return normalize(v);
  }

/**
 * Decodes a unit-length vector in 'oct' encoding to a normalized 3-component Cartesian vector.
 * The 'oct' encoding is described in "A Survey of Efficient Representations of Independent Unit Vectors",
 * Cigolle et al 2014:
 *
 * @name czm_octDecode
 * @param {vec2} encoded The oct-encoded, unit-length vector
 * @returns {vec3} The decoded and normalized vector
 */
 vec3 czm_octDecode(vec2 encoded)
 {
    return czm_octDecode(encoded, 255.0);
 }

 /**
 * Decodes a unit-length vector in 'oct' encoding packed into a floating-point number to a normalized 3-component Cartesian vector.
 * The 'oct' encoding is described in "A Survey of Efficient Representations of Independent Unit Vectors",
 * Cigolle et al 2014:
 *
 * @name czm_octDecode
 * @param {float} encoded The oct-encoded, unit-length vector
 * @returns {vec3} The decoded and normalized vector
 */
 vec3 czm_octDecode(float encoded)
 {
    float temp = encoded / 256.0;
    float x = floor(temp);
    float y = (temp - x) * 256.0;
    return czm_octDecode(vec2(x, y));
 }

/**
 * Decodes three unit-length vectors in 'oct' encoding packed into two floating-point numbers to normalized 3-component Cartesian vectors.
 * The 'oct' encoding is described in "A Survey of Efficient Representations of Independent Unit Vectors",
 * Cigolle et al 2014:
 *
 * @name czm_octDecode
 * @param {vec2} encoded The packed oct-encoded, unit-length vectors.
 * @param {vec3} vector1 One decoded and normalized vector.
 * @param {vec3} vector2 One decoded and normalized vector.
 * @param {vec3} vector3 One decoded and normalized vector.
 */
  void czm_octDecode(vec2 encoded, out vec3 vector1, out vec3 vector2, out vec3 vector3)
 {
    float temp = encoded.x / 65536.0;
    float x = floor(temp);
    float encodedFloat1 = (temp - x) * 65536.0;

    temp = encoded.y / 65536.0;
    float y = floor(temp);
    float encodedFloat2 = (temp - y) * 65536.0;

    vector1 = czm_octDecode(encodedFloat1);
    vector2 = czm_octDecode(encodedFloat2);
    vector3 = czm_octDecode(vec2(x, y));
 }

`;var To=`/**
 * Packs a depth value into a vec3 that can be represented by unsigned bytes.
 *
 * @name czm_packDepth
 * @glslFunction
 *
 * @param {float} depth The floating-point depth.
 * @returns {vec3} The packed depth.
 */
vec4 czm_packDepth(float depth)
{
    // See Aras Pranckevi\u010Dius' post Encoding Floats to RGBA
    vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * depth;
    enc = fract(enc);
    enc -= enc.yzww * vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0);
    return enc;
}
`;var yo=`/**
 * Packs a float value into a vec3 that can be represented by unsigned bytes.
 *
 * @name czm_packValue
 * @glslFunction
 *
 * @param {float} value The floating-point value.
 * @returns {vec3} The packed value.
 */
vec4 czm_packValue(float value)
{
    float SHIFT_LEFT8 = 256.0;
	float SHIFT_RIGHT8 = 1.0 / 256.0;
	vec4 result;
	result.a = 255.0;
	float fPos = abs(value + 9000.0) * SHIFT_RIGHT8;
	result.b = (fPos - floor(fPos)) * SHIFT_LEFT8;
	fPos = floor(fPos) * SHIFT_RIGHT8;
	result.g = (fPos - floor(fPos)) * SHIFT_LEFT8;
	result.r = floor(fPos);
	result /= 255.0;
	return result;
}
`;var zo=`float czm_private_getLambertDiffuseOfMaterial(vec3 lightDirectionEC, czm_material material)
{
    return czm_getLambertDiffuse(lightDirectionEC, material.normal);
}

float czm_private_getSpecularOfMaterial(vec3 lightDirectionEC, vec3 toEyeEC, czm_material material)
{
    return czm_getSpecular(lightDirectionEC, toEyeEC, material.normal, material.shininess);
}

/**
 * Computes a color using the Phong lighting model.
 *
 * @name czm_phong
 * @glslFunction
 *
 * @param {vec3} toEye A normalized vector from the fragment to the eye in eye coordinates.
 * @param {czm_material} material The fragment's material.
 *
 * @returns {vec4} The computed color.
 *
 * @example
 * vec3 positionToEyeEC = // ...
 * czm_material material = // ...
 * vec3 lightDirectionEC = // ...
 * gl_FragColor = czm_phong(normalize(positionToEyeEC), material, lightDirectionEC);
 *
 * @see czm_getMaterial
 */
vec4 czm_phong(vec3 toEye, czm_material material, vec3 lightDirectionEC)
{
    // Diffuse from directional light sources at eye (for top-down)
    float diffuse = czm_private_getLambertDiffuseOfMaterial(vec3(0.0, 0.0, 1.0), material);
    if (czm_sceneMode == czm_sceneMode3D) {
        // (and horizon views in 3D)
        diffuse += czm_private_getLambertDiffuseOfMaterial(vec3(0.0, 1.0, 0.0), material);
    }

    float specular = czm_private_getSpecularOfMaterial(lightDirectionEC, toEye, material);

    // Temporary workaround for adding ambient.
    vec3 materialDiffuse = material.diffuse * 0.5;

    vec3 ambient = materialDiffuse;
    vec3 color = ambient + material.emission;
    color += materialDiffuse * diffuse * czm_lightColor;
    color += material.specular * specular * czm_lightColor;

    return vec4(color, material.alpha);
}

vec4 czm_private_phong(vec3 toEye, czm_material material, vec3 lightDirectionEC)
{
    float diffuse = czm_private_getLambertDiffuseOfMaterial(lightDirectionEC, material);
    float specular = czm_private_getSpecularOfMaterial(lightDirectionEC, toEye, material);

    vec3 ambient = vec3(0.0);
    vec3 color = ambient + material.emission;
    color += material.diffuse * diffuse * czm_lightColor;
    color += material.specular * specular * czm_lightColor;

    return vec4(color, material.alpha);
}
`;var bo=`/**
 * Computes distance from a point to a plane.
 *
 * @name czm_planeDistance
 * @glslFunction
 *
 * param {vec4} plane A Plane in Hessian Normal Form. See Plane.js
 * param {vec3} point A point in the same space as the plane.
 * returns {float} The distance from the point to the plane.
 */
float czm_planeDistance(vec4 plane, vec3 point) {
    return (dot(plane.xyz, point) + plane.w);
}

/**
 * Computes distance from a point to a plane.
 *
 * @name czm_planeDistance
 * @glslFunction
 *
 * param {vec3} planeNormal Normal for a plane in Hessian Normal Form. See Plane.js
 * param {float} planeDistance Distance for a plane in Hessian Normal form. See Plane.js
 * param {vec3} point A point in the same space as the plane.
 * returns {float} The distance from the point to the plane.
 */
float czm_planeDistance(vec3 planeNormal, float planeDistance, vec3 point) {
    return (dot(planeNormal, point) + planeDistance);
}
`;var wo=`/**
 * Computes the point along a ray at the given time.  <code>time</code> can be positive, negative, or zero.
 *
 * @name czm_pointAlongRay
 * @glslFunction
 *
 * @param {czm_ray} ray The ray to compute the point along.
 * @param {float} time The time along the ray.
 * 
 * @returns {vec3} The point along the ray at the given time.
 * 
 * @example
 * czm_ray ray = czm_ray(vec3(0.0), vec3(1.0, 0.0, 0.0)); // origin, direction
 * vec3 v = czm_pointAlongRay(ray, 2.0); // (2.0, 0.0, 0.0)
 */
vec3 czm_pointAlongRay(czm_ray ray, float time)
{
    return ray.origin + (time * ray.direction);
}
`;var Lo=`/**
 * DOC_TBA
 *
 * @name czm_rayEllipsoidIntersectionInterval
 * @glslFunction
 */
czm_raySegment czm_rayEllipsoidIntersectionInterval(czm_ray ray, vec3 ellipsoid_center, vec3 ellipsoid_inverseRadii)
{
   // ray and ellipsoid center in eye coordinates.  radii in model coordinates.
    vec3 q = ellipsoid_inverseRadii * (czm_inverseModelView * vec4(ray.origin, 1.0)).xyz;
    vec3 w = ellipsoid_inverseRadii * (czm_inverseModelView * vec4(ray.direction, 0.0)).xyz;

    q = q - ellipsoid_inverseRadii * (czm_inverseModelView * vec4(ellipsoid_center, 1.0)).xyz;

    float q2 = dot(q, q);
    float qw = dot(q, w);

    if (q2 > 1.0) // Outside ellipsoid.
    {
        if (qw >= 0.0) // Looking outward or tangent (0 intersections).
        {
            return czm_emptyRaySegment;
        }
        else // qw < 0.0.
        {
            float qw2 = qw * qw;
            float difference = q2 - 1.0; // Positively valued.
            float w2 = dot(w, w);
            float product = w2 * difference;

            if (qw2 < product) // Imaginary roots (0 intersections).
            {
                return czm_emptyRaySegment;
            }
            else if (qw2 > product) // Distinct roots (2 intersections).
            {
                float discriminant = qw * qw - product;
                float temp = -qw + sqrt(discriminant); // Avoid cancellation.
                float root0 = temp / w2;
                float root1 = difference / temp;
                if (root0 < root1)
                {
                    czm_raySegment i = czm_raySegment(root0, root1);
                    return i;
                }
                else
                {
                    czm_raySegment i = czm_raySegment(root1, root0);
                    return i;
                }
            }
            else // qw2 == product.  Repeated roots (2 intersections).
            {
                float root = sqrt(difference / w2);
                czm_raySegment i = czm_raySegment(root, root);
                return i;
            }
        }
    }
    else if (q2 < 1.0) // Inside ellipsoid (2 intersections).
    {
        float difference = q2 - 1.0; // Negatively valued.
        float w2 = dot(w, w);
        float product = w2 * difference; // Negatively valued.
        float discriminant = qw * qw - product;
        float temp = -qw + sqrt(discriminant); // Positively valued.
        czm_raySegment i = czm_raySegment(0.0, temp / w2);
        return i;
    }
    else // q2 == 1.0. On ellipsoid.
    {
        if (qw < 0.0) // Looking inward.
        {
            float w2 = dot(w, w);
            czm_raySegment i = czm_raySegment(0.0, -qw / w2);
            return i;
        }
        else // qw >= 0.0.  Looking outward or tangent.
        {
            return czm_emptyRaySegment;
        }
    }
}
`;var So=`float czm_readDepth(sampler2D depthTexture, vec2 texCoords)
{
    return czm_reverseLogDepth(texture2D(depthTexture, texCoords).r);
}
`;var Eo=`/**
 * Reads a value previously transformed with {@link czm_writeNonPerspective}
 * by dividing it by \`w\`, the value used in the perspective divide.
 * This function is intended to be called in a fragment shader to access a
 * \`varying\` that should not be subject to perspective interpolation.
 * For example, screen-space texture coordinates. The value should have been
 * previously written in the vertex shader with a call to
 * {@link czm_writeNonPerspective}.
 *
 * @name czm_readNonPerspective
 * @glslFunction
 *
 * @param {float|vec2|vec3|vec4} value The non-perspective value to be read.
 * @param {float} oneOverW One over the perspective divide value, \`w\`. Usually this is simply \`gl_FragCoord.w\`.
 * @returns {float|vec2|vec3|vec4} The usable value.
 */
float czm_readNonPerspective(float value, float oneOverW) {
    return value * oneOverW;
}

vec2 czm_readNonPerspective(vec2 value, float oneOverW) {
    return value * oneOverW;
}

vec3 czm_readNonPerspective(vec3 value, float oneOverW) {
    return value * oneOverW;
}

vec4 czm_readNonPerspective(vec4 value, float oneOverW) {
    return value * oneOverW;
}
`;var Ao=`float czm_reverseLogDepth(float logZ)
{
#ifdef LOG_DEPTH
    float near = czm_currentFrustum.x;
    float far = czm_currentFrustum.y;
    float log2Depth = logZ * czm_log2FarDepthFromNearPlusOne;
    float depthFromNear = pow(2.0, log2Depth) - 1.0;
    return far * (1.0 - near / (depthFromNear + near)) / (far - near);
#endif
    return logZ;
}
`;var Do=`/**
 * Converts an RGB color to HSB (hue, saturation, brightness)
 * HSB <-> RGB conversion with minimal branching:
 *
 * @name czm_RGBToHSB
 * @glslFunction
 * 
 * @param {vec3} rgb The color in RGB.
 *
 * @returns {vec3} The color in HSB.
 *
 * @example
 * vec3 hsb = czm_RGBToHSB(rgb);
 * hsb.z *= 0.1;
 * rgb = czm_HSBToRGB(hsb);
 */

const vec4 K_RGB2HSB = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);

vec3 czm_RGBToHSB(vec3 rgb)
{
    vec4 p = mix(vec4(rgb.bg, K_RGB2HSB.wz), vec4(rgb.gb, K_RGB2HSB.xy), step(rgb.b, rgb.g));
    vec4 q = mix(vec4(p.xyw, rgb.r), vec4(rgb.r, p.yzx), step(p.x, rgb.r));

    float d = q.x - min(q.w, q.y);
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + czm_epsilon7)), d / (q.x + czm_epsilon7), q.x);
}
`;var Oo=`/**
 * Converts an RGB color to HSL (hue, saturation, lightness)
 * HSL <-> RGB conversion: 
 *
 * @name czm_RGBToHSL
 * @glslFunction
 * 
 * @param {vec3} rgb The color in RGB.
 *
 * @returns {vec3} The color in HSL.
 *
 * @example
 * vec3 hsl = czm_RGBToHSL(rgb);
 * hsl.z *= 0.1;
 * rgb = czm_HSLToRGB(hsl);
 */
 
vec3 RGBtoHCV(vec3 rgb)
{
    // Based on work by Sam Hocevar and Emil Persson
    vec4 p = (rgb.g < rgb.b) ? vec4(rgb.bg, -1.0, 2.0 / 3.0) : vec4(rgb.gb, 0.0, -1.0 / 3.0);
    vec4 q = (rgb.r < p.x) ? vec4(p.xyw, rgb.r) : vec4(rgb.r, p.yzx);
    float c = q.x - min(q.w, q.y);
    float h = abs((q.w - q.y) / (6.0 * c + czm_epsilon7) + q.z);
    return vec3(h, c, q.x);
}

vec3 czm_RGBToHSL(vec3 rgb)
{
    vec3 hcv = RGBtoHCV(rgb);
    float l = hcv.z - hcv.y * 0.5;
    float s = hcv.y / (1.0 - abs(l * 2.0 - 1.0) + czm_epsilon7);
    return vec3(hcv.x, s, l);
}
`;var Io=`/**
 * Converts an RGB color to CIE Yxy.
 * <p>The conversion is described in
 * </p>
 * 
 * @name czm_RGBToXYZ
 * @glslFunction
 * 
 * @param {vec3} rgb The color in RGB.
 *
 * @returns {vec3} The color in CIE Yxy.
 *
 * @example
 * vec3 xyz = czm_RGBToXYZ(rgb);
 * xyz.x = max(xyz.x - luminanceThreshold, 0.0);
 * rgb = czm_XYZToRGB(xyz);
 */
vec3 czm_RGBToXYZ(vec3 rgb)
{
    const mat3 RGB2XYZ = mat3(0.4124, 0.2126, 0.0193,
                              0.3576, 0.7152, 0.1192,
                              0.1805, 0.0722, 0.9505);
    vec3 xyz = RGB2XYZ * rgb;
    vec3 Yxy;
    Yxy.r = xyz.g;
    float temp = dot(vec3(1.0), xyz);
    Yxy.gb = xyz.rg / temp;
    return Yxy;
}
`;var Ro=`void czm_RollerShutter(vec2 coord, vec4 region)
{
    vec2 f = step(region.xw, coord);
    vec2 s = step(coord, region.zy);
    if (f.x * f.y * s.x * s.y < 1.0)
    {
        discard;
    };
}
`;var Mo=`void czm_s3mBatchOperation(vec4 operationType, vec4 color, vec4 selectedColor, inout vec4 vertexColor, inout vec4 vertexPos, inout vec4 vIsFiltByID, vec3 translation)
{
    float right_2 = operationType.x * 0.5;
    float right_4 = right_2 * 0.5;
    float right_8 = right_4 * 0.5;
    float right_16 = right_8 * 0.5;
    float isSetColor = fract(right_2);
    if(isSetColor > 0.1)
    {
        vertexColor *= color;
    }
    float isPicked = fract(floor(right_2)* 0.5);
    if(isPicked > 0.1)
    {
        vertexColor *= selectedColor;
    }
    float isHide = fract(floor(right_4)* 0.5);
    if(isHide > 0.1)
    {
        vertexColor.a = 0.0;
    }
    float isOffset = fract(floor(right_8)* 0.5);
    if(isOffset > 0.1)
    {
        vertexPos.xyz += translation;
    }
    float isClip = fract(floor(right_16) * 0.5);
    if(isClip > 0.1)
    {
        vIsFiltByID.x = 1.0;
    }
}

void czm_s3mBatchOperation(vec4 operationType, vec4 color, inout vec4 vertexColor, inout vec4 vertexPos, inout vec4 vIsFiltByID, vec3 translation, inout float fSelected)
{
    operationType.x += 0.001;
    float right_2 = operationType.x * 0.5;
    float right_4 = right_2 * 0.5;
    float right_8 = right_4 * 0.5;
    float right_16 = right_8 * 0.5;
    float isSetColor = fract(right_2);
    if(isSetColor > 0.1)
    {
        vertexColor *= color;
    }
    float isPicked = fract(floor(right_2)* 0.5);
    if(isPicked > 0.1)
    {
        fSelected = 1.0;
    }
    float isHide = fract(floor(right_4)* 0.5);
    if(isHide > 0.1)
    {
        vertexColor.a = 0.0;
    }
    float isOffset = fract(floor(right_8)* 0.5);
    if(isOffset > 0.1)
    {
        vertexPos.xyz += translation;
    }
    float isClip = fract(floor(right_16) * 0.5);
    if(isClip > 0.1)
    {
        vIsFiltByID.x = 1.0;
    }
}

void czm_s3mBatchOperation(vec4 operationType, vec4 color, vec4 selectedColor, inout vec4 vertexColor, inout vec4 vertexPos, inout vec4 vIsFiltByID, vec3 translation, inout float fSelected)
{
    operationType.x += 0.001;
    float right_2 = operationType.x * 0.5;
    float right_4 = right_2 * 0.5;
    float right_8 = right_4 * 0.5;
    float right_16 = right_8 * 0.5;
    float isSetColor = fract(right_2);
    if(isSetColor > 0.1)
    {
        #ifdef REPLACE_COLOR_TYPE
            vertexColor.rgb = color.rgb;
        #else
            vertexColor.rgb *= color.rgb;
        #endif
        vertexColor.a *= color.a;
    }
    float isPicked = fract(floor(right_2)* 0.5);
    if(isPicked > 0.1)
    {
        fSelected = 1.0;
        #ifdef REPLACE_SELECT_TYPE
            vertexColor = selectedColor;
        #else
            vertexColor *= selectedColor;
        #endif
    }
    float isHide = fract(floor(right_4)* 0.5);
    if(isHide > 0.1)
    {
        vertexColor.a = 0.0;
    }
    float isOffset = fract(floor(right_8)* 0.5);
    if(isOffset > 0.1)
    {
        vertexPos.xyz += translation;
    }
    float isClip = fract(floor(right_16) * 0.5);
    if(isClip > 0.1)
    {
        vIsFiltByID.x = 1.0;
    }
}

void czm_s3mBatchOperation(vec4 operationType, vec4 color, vec4 selectedColor, inout vec4 vertexColor)
{
    operationType.x += 0.001;
    float right_2 = operationType.x * 0.5;
    float right_4 = right_2 * 0.5;
    float right_8 = right_4 * 0.5;
    float right_16 = right_8 * 0.5;
    float isSetColor = fract(right_2);
    if(isSetColor > 0.1)
    {
        #ifdef REPLACE_COLOR_TYPE
            vertexColor.rgb = color.rgb;
        #else
            vertexColor.rgb *= color.rgb;
        #endif
        vertexColor.a *= color.a;
    }
    float isPicked = fract(floor(right_2)* 0.5);
    if(isPicked > 0.1)
    {
        vertexColor *= selectedColor;
    }
    float isHide = fract(floor(right_4)* 0.5);
    if(isHide > 0.1)
    {
        vertexColor.a = 0.0;
    }
}

void czm_s3mBatchOperation(vec4 operationType, vec4 color, vec4 selectedColor, inout vec4 vertexColor, inout float fSelected)
{
    operationType.x += 0.001;
    float right_2 = operationType.x * 0.5;
    float right_4 = right_2 * 0.5;
    float right_8 = right_4 * 0.5;
    float right_16 = right_8 * 0.5;
    float isSetColor = fract(right_2);
    if(isSetColor > 0.1)
    {
        fSelected = 1.0;
        vertexColor = color;
    }
    float isPicked = fract(floor(right_2)* 0.5);
    if(isPicked > 0.1)
    {
        fSelected = 1.0;
        vertexColor = selectedColor;
    }
    float isHide = fract(floor(right_4)* 0.5);
    if(isHide > 0.1)
    {
        vertexColor.a = 0.0;
    }
}

void czm_s3mBatchOperation(vec4 operationType, vec4 color, vec4 selectedColor, inout vec4 vertexColor, inout vec4 vertexPos, inout vec4 vIsFiltByID, vec3 translation, inout vec2 fSelected)
{
    operationType.x += 0.001;
    float right_2 = operationType.x * 0.5;
    float right_4 = right_2 * 0.5;
    float right_8 = right_4 * 0.5;
    float right_16 = right_8 * 0.5;
    float isSetColor = fract(right_2);
    if(isSetColor > 0.1)
    {
        fSelected.y = 1.0;
        color.a *= vertexColor.a;
        vertexColor = color;
    }
    float isPicked = fract(floor(right_2)* 0.5);
    if(isPicked > 0.1)
    {
        fSelected.x = 1.0;
        #ifdef REPLACE_SELECT_TYPE
            vertexColor = selectedColor;
        #else
            vertexColor *= selectedColor;
        #endif
    }
    float isHide = fract(floor(right_4)* 0.5);
    if(isHide > 0.1)
    {
        vertexColor.a = 0.0;
    }
    float isOffset = fract(floor(right_8)* 0.5);
    if(isOffset > 0.1)
    {
        vertexPos.xyz += translation;
    }
    float isClip = fract(floor(right_16) * 0.5);
    if(isClip > 0.1)
    {
        vIsFiltByID.x = 1.0;
    }
}`;var Po=`    uniform float u_metallicFactor;
    uniform float u_roughnessFactor;
    uniform vec4 u_emissiveFactor;
    uniform vec4 u_baseColorFactor;
    uniform float u_alphaCutoff;
    uniform sampler2D u_baseColorTexture;
    uniform sampler2D u_metallicRoughnessTexture;
    uniform sampler2D u_normalTexture;
    uniform sampler2D u_occlusionTexture;
    uniform sampler2D u_emissiveTexture;
    uniform vec4 u_baseColorUVOffsetAndTiling;
    uniform vec4 u_emissiveUVOffsetAndTiling;

    uniform float uSunLightON;
    #if DIR_LIGHTS > 0
    uniform vec3 uDirectionalLightDirectionEC[ DIR_LIGHTS ];
    uniform vec3 uDirectionalLightColor[ DIR_LIGHTS ];
    #endif
    #if POINT_LIGHTS > 0
    uniform vec3 uPointLightPositionEC[ POINT_LIGHTS ];
    uniform vec3 uPointLightColor[ POINT_LIGHTS ];
    uniform vec2 uPointLightDistanceAndDecay[ POINT_LIGHTS ];
    #endif
    #if SPOT_LIGHTS > 0
    uniform vec3 uSpotLightColor[ SPOT_LIGHTS ];
    uniform vec3 uSpotLightPositionEC[ SPOT_LIGHTS ];
    uniform vec3 uSpotLightDirectionEC[ SPOT_LIGHTS ];
    uniform vec3 uSpotLightDistanceDecayCos[ SPOT_LIGHTS ];
    uniform vec3 uSpotLightExponent[ SPOT_LIGHTS ];
    #endif

    const float M_PI = 3.141592653589793;

    vec3 lambertianDiffuse(vec3 diffuseColor)
    {
        return diffuseColor / M_PI;
    }

    vec3 fresnelSchlick2(vec3 f0, vec3 f90, float VdotH)
    {
        return f0 + (f90 - f0) * pow(clamp(1.0 - VdotH, 0.0, 1.0), 5.0);
    }

    vec3 fresnelSchlick(float metalness, float VdotH)
    {
        return metalness + (vec3(1.0) - metalness) * pow(1.0 - VdotH, 5.0);
    }

    vec3 F_Schlick(float ndv, vec3 spec)
    {
        return spec + (vec3(1.0) - spec) * pow(1.0 - ndv, 5.0);
    }

    float D_Phong(float g, float ndh)
    {
        float a = pow(8192.0, g);
        return (a + 2.0) / 8.0 * pow(ndh, a);
    }

    float smithVisibilityG1(float NdotV, float roughness)
    {
        float k = (roughness + 1.0) * (roughness + 1.0) / 8.0;
        return NdotV / (NdotV * (1.0 - k) + k);
    }

    float smithVisibilityGGX(float roughness, float NdotL, float NdotV)
    {
        return smithVisibilityG1(NdotL, roughness) * smithVisibilityG1(NdotV, roughness);
    }

    float GGX(float roughness, float NdotH)
    {
        float roughnessSquared = roughness * roughness;
        float f = (NdotH * roughnessSquared - NdotH) * NdotH + 1.0;
        return roughnessSquared / (M_PI * f * f);
    }

    void getLightColor(vec3 lightDir, vec3 viewDir, vec3 normal, vec3 lightColor, vec3 fresnelTerm, float roughness, out vec3 diffuseTerm, out vec3 specularTerm)
    {
        vec3 h = normalize(viewDir + lightDir);
        float NdotL = clamp(dot(normal, lightDir), 0.001, 1.0);
        float NdotH = clamp(dot(normal, h), 0.0, 1.0);
        vec3 li = lightColor * NdotL;
        diffuseTerm = li;
        specularTerm = li * fresnelTerm * D_Phong(1.0 - roughness, NdotH);
    }

    vec3 SRGBtoLINEAR3(vec3 srgbIn)
    {
        return pow(srgbIn, vec3(2.2));
    }

    vec4 SRGBtoLINEAR4(vec4 srgbIn)
    {
        vec3 linearOut = pow(srgbIn.rgb, vec3(2.2));
        return vec4(linearOut, srgbIn.a);
    }

    vec3 LINEARtoSRGB(vec3 linearIn)
    {
#ifndef HDR
        return pow(linearIn, vec3(1.0/2.2));
#else
        return linearIn;
#endif
    }

    float calcLightAttenuation(float lightDistance, float cutoffDistance, float decayExponent)
    {
        return pow(clamp(1.0 - lightDistance / cutoffDistance, 0.0, 1.0), decayExponent);
    }

    vec4 czm_S3MPBR(vec3 normalEC, vec3 positionEC, vec2 texCoord, vec4 vertexColor)
    {
        vec3 ng = normalize(normalEC);
        vec3 positionWC = (czm_inverseView * vec4(positionEC, 1.0)).xyz;
#ifdef HAS_NORMAL_TEXTURE
        vec3 pos_dx = dFdx(positionEC);
        vec3 pos_dy = dFdy(positionEC);
        vec3 tex_dx = dFdx(vec3(texCoord, 0.0));
        vec3 tex_dy = dFdy(vec3(texCoord, 0.0));
        vec3 t = (tex_dy.t * pos_dx - tex_dx.t * pos_dy) / (tex_dx.s * tex_dy.t - tex_dy.s * tex_dx.t);
        t = normalize(t - ng * dot(ng, t));
        vec3 b = normalize(cross(ng, t));
        mat3 tbn = mat3(t, b, ng);
        vec3 n = texture2D(u_normalTexture, texCoord).rgb;
        n = normalize(tbn * (2.0 * n - 1.0));
#else
        vec3 n = ng;
#endif

        vec3 v = -normalize(positionEC);
#ifdef DOUBLE_SIDED
        if (dot(n, v) < 0.0) {
            n = -n;
        }
#endif

        // Add base color to fragment shader
#ifdef HAS_BASECOLOR_TEXTURE
        vec2 baseColorTexCoord = texCoord;
        baseColorTexCoord = baseColorTexCoord * u_baseColorUVOffsetAndTiling.zw + u_baseColorUVOffsetAndTiling.xy;
        vec4 baseColorWithAlpha = SRGBtoLINEAR4(texture2D(u_baseColorTexture, baseColorTexCoord));
        baseColorWithAlpha *= u_baseColorFactor;
#else
        vec4 baseColorWithAlpha = u_baseColorFactor;
#endif
        baseColorWithAlpha *= vertexColor;
        vec3 baseColor = baseColorWithAlpha.rgb;
#ifdef HAS_METALLICROUGHNESS_TEXTURE
        vec3 metallicRoughness = texture2D(u_metallicRoughnessTexture, texCoord).rgb;
        float metalness = clamp(metallicRoughness.b, 0.0, 1.0);
        float roughness = clamp(metallicRoughness.g, 0.04, 1.0);
        metalness *= u_metallicFactor;
        roughness *= u_roughnessFactor;
#else
        float metalness = clamp(u_metallicFactor, 0.0, 1.0);
        float roughness = clamp(u_roughnessFactor, 0.04, 1.0);
#endif
        vec3 f0 = vec3(0.04);
        vec3 diffuseColor = baseColor * (1.0 - metalness) * (1.0 - f0);
        vec3 specularColor = mix(f0, baseColor, metalness);
        float NdotV = abs(dot(n, v)) + 0.001;
        vec3 diffuseTerm = vec3(0.0);
        vec3 specularTerm = vec3(0.0);
        vec3 fresnelTerm = F_Schlick(NdotV, specularColor);
        vec3 color = vec3(0.0);
        // \u9ED8\u8BA4\u52A0\u4E00\u4E2A\u5E73\u884C\u5149\u4F5C\u4E3A\u592A\u9633\u5149
        vec3 lightDiffuseTerm = vec3(0.0);
        vec3 lightSpecularTerm = vec3(0.0);
        getLightColor(czm_sunDirectionEC, v, n, vec3(0.8), fresnelTerm, roughness, lightDiffuseTerm, lightSpecularTerm);
        diffuseTerm +=lightDiffuseTerm * uSunLightON;
        specularTerm += lightSpecularTerm * uSunLightON;
#if DIR_LIGHTS > 0 
        for (int i = 0; i < DIR_LIGHTS; i++) { 
            getLightColor(uDirectionalLightDirectionEC[i], v, n, uDirectionalLightColor[i], fresnelTerm, roughness, lightDiffuseTerm, lightSpecularTerm);
            diffuseTerm +=lightDiffuseTerm;
            specularTerm += lightSpecularTerm;
        } 
#endif 
#if POINT_LIGHTS > 0 
        for (int i = 0; i < POINT_LIGHTS; i++) {
            vec3 lVector = uPointLightPositionEC[i] - v_positionEC;
            float lightDistance = length(lVector);
            float lightAttenuation = calcLightAttenuation(lightDistance, uPointLightDistanceAndDecay[i].x, uPointLightDistanceAndDecay[i].y);
            if(lightAttenuation < 0.001) {
                continue;
            }
            vec3 pointLightColor = uPointLightColor[i] * lightAttenuation;
            vec3 lightDiffuseTerm = vec3(0.0);
            vec3 lightSpecularTerm = vec3(0.0);
            getLightColor(normalize(lVector), v, n, pointLightColor, fresnelTerm, roughness, lightDiffuseTerm, lightSpecularTerm);
            diffuseTerm +=lightDiffuseTerm;
            specularTerm += lightSpecularTerm;
        }
#endif 
#if SPOT_LIGHTS > 0 
        for (int i = 0; i < SPOT_LIGHTS; i++) {
            vec3 lVector = uSpotLightPositionEC[i] - v_positionEC;
            float lightDistance = length(lVector);
            float lightAttenuation = calcLightAttenuation(lightDistance, uSpotLightDistanceDecayCos[i].x, uSpotLightDistanceDecayCos[i].y);
            if(lightAttenuation < 0.001) {
                continue;
            }
            float spotEffect = dot(uSpotLightDirectionEC[i], normalize(lVector));
            if(spotEffect > uSpotLightDistanceDecayCos[i].z) {
                vec3 spotLightColor = uSpotLightColor[i] * lightAttenuation * spotEffect;
                vec3 lightDiffuseTerm = vec3(0.0);
                vec3 lightSpecularTerm = vec3(0.0);
                getLightColor(normalize(lVector), v, n, spotLightColor, fresnelTerm, roughness, lightDiffuseTerm, lightSpecularTerm);
                diffuseTerm +=lightDiffuseTerm;
                specularTerm += lightSpecularTerm;
            }
        }
#endif 
    color = baseColor; 
    color *= max(diffuseTerm, vec3(0.0)); 
    color += max(specularTerm, vec3(0.0)); 
        // \u8BA1\u7B97\u73AF\u5883\u5149
    #ifdef USE_IBL_LIGHTING
        vec3 r = normalize(czm_inverseViewRotation * normalize(reflect(v, n)));
        // Figure out if the reflection vector hits the ellipsoid
        float vertexRadius = length(positionWC);
        float horizonDotNadir = 1.0 - min(1.0, 6378137.0 / vertexRadius);
        float reflectionDotNadir = dot(r, normalize(positionWC));
        // Flipping the X vector is a cheap way to get the inverse of czm_temeToPseudoFixed, since that's a rotation about Z.
        r.x = -r.x;
        r = -normalize(czm_temeToPseudoFixed * r);
        r.x = -r.x;
        float inverseRoughness = 1.04 - roughness;
        inverseRoughness *= inverseRoughness;
        vec3 sceneSkyBox = textureCube(czm_environmentMap, r).rgb * inverseRoughness;
        float atmosphereHeight = 0.05;
        float blendRegionSize = 0.1 * ((1.0 - inverseRoughness) * 8.0 + 1.1 - horizonDotNadir);
        float blendRegionOffset = roughness * -1.0;
        float farAboveHorizon = clamp(horizonDotNadir - blendRegionSize * 0.5 + blendRegionOffset, 1.0e-10 - blendRegionSize, 0.99999);
        float aroundHorizon = clamp(horizonDotNadir + blendRegionSize * 0.5, 1.0e-10 - blendRegionSize, 0.99999);
        float farBelowHorizon = clamp(horizonDotNadir + blendRegionSize * 1.5, 1.0e-10 - blendRegionSize, 0.99999);
        float smoothstepHeight = smoothstep(0.0, atmosphereHeight, horizonDotNadir);
        vec3 belowHorizonColor = mix(vec3(0.1, 0.15, 0.25), vec3(0.4, 0.7, 0.9), smoothstepHeight);
        vec3 nadirColor = belowHorizonColor * 0.5;
        vec3 aboveHorizonColor = mix(vec3(0.9, 1.0, 1.2), belowHorizonColor, roughness * 0.5);
        vec3 blueSkyColor = mix(vec3(0.18, 0.26, 0.48), aboveHorizonColor, reflectionDotNadir * inverseRoughness * 0.5 + 0.75);
        vec3 zenithColor = mix(blueSkyColor, sceneSkyBox, smoothstepHeight);

        vec3 blueSkyDiffuseColor = vec3(0.7, 0.85, 0.9);
        float diffuseIrradianceFromEarth = (1.0 - horizonDotNadir) * (reflectionDotNadir * 0.25 + 0.75) * smoothstepHeight;
        float diffuseIrradianceFromSky = (1.0 - smoothstepHeight) * (1.0 - (reflectionDotNadir * 0.25 + 0.25));
        vec3 diffuseIrradiance = blueSkyDiffuseColor * clamp(diffuseIrradianceFromEarth + diffuseIrradianceFromSky, 0.0, 1.0);

        float notDistantRough = (1.0 - horizonDotNadir * roughness * 0.8);
        vec3 specularIrradiance = mix(zenithColor, aboveHorizonColor, smoothstep(farAboveHorizon, aroundHorizon, reflectionDotNadir) * notDistantRough);
        specularIrradiance = mix(specularIrradiance, belowHorizonColor, smoothstep(aroundHorizon, farBelowHorizon, reflectionDotNadir) * inverseRoughness);
        specularIrradiance = mix(specularIrradiance, nadirColor, smoothstep(farBelowHorizon, 1.0, reflectionDotNadir) * inverseRoughness);

        vec2 iblFactor = vec2(1.0);
        float luminanceAtZenith = 0.5;
    #ifdef USE_SUN_LUMINANCE
        // Angle between sun and zenith
        float LdotZenith = clamp(dot(normalize(czm_inverseViewRotation * czm_sunDirectionEC), normalize(positionWC * -1.0)), 0.001, 1.0);
        float S = acos(LdotZenith);
        // Angle between zenith and current pixel
        float NdotZenith = clamp(dot(normalize(czm_inverseViewRotation * n), normalize(positionWC * -1.0)), 0.001, 1.0);
        // Angle between sun and current pixel
        float sunNdotL = clamp(dot(n, czm_sunDirectionEC), 0.001, 1.0);
        float gamma = acos(sunNdotL);
        float numerator = ((0.91 + 10.0 * exp(-3.0 * gamma) + 0.45 * pow(sunNdotL, 2.0)) * (1.0 - exp(-0.32 / NdotZenith)));
        float denominator = (0.91 + 10.0 * exp(-3.0 * S) + 0.45 * pow(LdotZenith,2.0)) * (1.0 - exp(-0.32));
        float luminance = luminanceAtZenith * (numerator / denominator);
#endif

        vec2 brdfLut = texture2D(czm_brdfLut, vec2(NdotV, 1.0 - roughness)).rg;
        vec3 IBLColor = (diffuseIrradiance * diffuseColor * iblFactor.x) + (specularIrradiance * SRGBtoLINEAR3(specularColor * brdfLut.x + brdfLut.y) * iblFactor.y);
#ifdef USE_SUN_LUMINANCE
        color += IBLColor * luminance;
#else
        color += IBLColor;
#endif // end of USE_SUN_LUMINANCE
#endif // end of USE_IBL_LIGHTING

#ifdef HAS_OCCLUSION_TEXTURE
        color *= texture2D(u_occlusionTexture, texCoord).r;
#endif

#ifdef HAS_EMISSIVE_TEXTURE
        vec2 emissiveTexCoord = texCoord;
        emissiveTexCoord = emissiveTexCoord * u_emissiveUVOffsetAndTiling.zw + u_emissiveUVOffsetAndTiling.xy;
        vec3 emissive = SRGBtoLINEAR3(texture2D(u_emissiveTexture, emissiveTexCoord).rgb);
        emissive *= u_emissiveFactor.rgb;
        color += emissive;
#else
        color += u_emissiveFactor.rgb;
#endif
        color = LINEARtoSRGB(color);
        vec4 resultColor = vec4(color, 1.0);
#ifdef MASK
        if (baseColorWithAlpha.a < u_alphaCutoff)
        {
            discard;
        }
        resultColor = vec4(color, 1.0);
#endif
#ifdef BLEND
        resultColor = vec4(color, baseColorWithAlpha.a);
#endif
        return resultColor;
    }`;var Vo=`uniform float uParentMixDirection;
uniform vec4 u_pickIDColor;
vec4 czm_sampleAndBlend(
    vec4 previousColor,
    sampler2D textureToSample,
    vec2 tileTextureCoordinates,
    vec4 textureCoordinateRectangle,
    vec4 textureCoordinateTranslationAndScale,
    vec4 transparentBackColor,
    bool imageryClipEnable,
    int rasterValue,
    bool flipY,
    float textureAlpha,
    float textureBrightness,
    float textureContrast,
    float textureHue,
    float textureSaturation,
    float textureOneOverGamma,
    vec2 split,
    vec4 swipe,
    float textureMinAlpha)
{
    // This crazy step stuff sets the alpha to 0.0 if this following condition is true:
    //    tileTextureCoordinates.s < textureCoordinateRectangle.s ||
    //    tileTextureCoordinates.s > textureCoordinateRectangle.p ||
    //    tileTextureCoordinates.t < textureCoordinateRectangle.t ||
    //    tileTextureCoordinates.t > textureCoordinateRectangle.q
    // In other words, the alpha is zero if the fragment is outside the rectangle
    // covered by this texture.  Would an actual 'if' yield better performance?
    vec2 alphaMultiplier = step(textureCoordinateRectangle.st, tileTextureCoordinates);
    textureAlpha = textureAlpha * alphaMultiplier.x * alphaMultiplier.y;

    alphaMultiplier = step(vec2(0.0), textureCoordinateRectangle.pq - tileTextureCoordinates);
    textureAlpha = textureAlpha * alphaMultiplier.x * alphaMultiplier.y;

    vec2 translation = textureCoordinateTranslationAndScale.xy;
    vec2 scale = textureCoordinateTranslationAndScale.zw;
    vec2 textureCoordinates = tileTextureCoordinates * scale + translation;
    if(flipY)
    {
        textureCoordinates.y = 1.0 - textureCoordinates.y;
    }
    vec4 value = texture2D(textureToSample, textureCoordinates);
    vec3 color = value.rgb;
    float alpha = value.a;
    if(transparentBackColor.a > 0.01)
    {
        float rDiff = abs(transparentBackColor.r - color.r);
        float gDiff = abs(transparentBackColor.g - color.g);
        float bDiff = abs(transparentBackColor.b - color.b);
        if(rDiff < transparentBackColor.a && gDiff < transparentBackColor.a && bDiff < transparentBackColor.a)
        {
            alpha = 0.0;
        }
    }

    if(imageryClipEnable)
    {
    #ifdef Apply_ImageryClip
        if((rasterValue & RASTER_CLIP_IMAGERY) < 1)
        {
            alpha = 0.0;
        }
    #else
        alpha = 0.0;
    #endif
    }


#if !defined(APPLY_GAMMA)
    vec4 tempColor = czm_gammaCorrect(vec4(color, alpha));
    color = tempColor.rgb;
    alpha = tempColor.a;
#else
    color = pow(color, vec3(textureOneOverGamma));
#endif

#ifdef APPLY_SPLIT
    vec2 splitPosition = czm_imagerySplitPosition;
    // Split to the left
    if (split.x < 0.0 && gl_FragCoord.x > splitPosition.x) {
       alpha = 0.0;
    }
    // Split to the right
    else if (split.x > 0.0 && gl_FragCoord.x < splitPosition.x) {
       alpha = 0.0;
    }
    if(split.y < 0.0 && gl_FragCoord.y > splitPosition.y) {
        alpha = 0.0;
    }
    else if(split.y > 0.0 && gl_FragCoord.y < splitPosition.y) {
        alpha = 0.0;
    }
#if TEXTURE_UNITS < 2
    if(alpha == 0.0)
    {
        discard;
    }
#endif
#endif

#ifdef APPLY_SWIPE
    if (gl_FragCoord.x < swipe.x || gl_FragCoord.y > swipe.y) {
       alpha = 0.0;
    }
    else if (gl_FragCoord.x > swipe.z || gl_FragCoord.y < swipe.w) {
       alpha = 0.0;
    }
#if TEXTURE_UNITS < 2
    if(alpha == 0.0)
    {
        discard;
    }
#endif

#endif

#ifdef APPLY_BRIGHTNESS
    color = mix(vec3(0.0), color, textureBrightness);
#endif

#ifdef APPLY_CONTRAST
    color = mix(vec3(0.5), color, textureContrast);
#endif

#ifdef APPLY_HUE
    color = czm_hue(color, textureHue);
#endif

#ifdef APPLY_SATURATION
    color = czm_saturation(color, textureSaturation);
#endif

#ifdef ALPHAFILTER
    if(alpha <= textureMinAlpha)
    {
        return previousColor.rgba;
    }
#endif

    float sourceAlpha = alpha * textureAlpha;
    float outAlpha = mix(previousColor.a, 1.0, sourceAlpha);
    if(outAlpha < 0.1){
        return vec4(0.0);
    }
    vec3 outColor = mix(previousColor.rgb * previousColor.a, color, sourceAlpha) / outAlpha;
    return vec4(outColor, outAlpha);
}

vec4 sampleAndBlendParent(
    vec4 previousColor,
    sampler2D textureToSample,
    vec2 tileTextureCoordinates,
    vec4 textureCoordinateRectangle,
    vec4 textureCoordinateTranslationAndScale,
    vec4 transparentBackColor,
    bool flipY,
    float textureAlpha,
    float textureBrightness,
    float textureContrast,
    float textureHue,
    float textureSaturation,
    float textureOneOverGamma,
    vec2 split,
    vec4 swipe,
    float textureMinAlpha)
{
    // This crazy step stuff sets the alpha to 0.0 if this following condition is true:
    //    tileTextureCoordinates.s < textureCoordinateRectangle.s ||
    //    tileTextureCoordinates.s > textureCoordinateRectangle.p ||
    //    tileTextureCoordinates.t < textureCoordinateRectangle.t ||
    //    tileTextureCoordinates.t > textureCoordinateRectangle.q
    // In other words, the alpha is zero if the fragment is outside the rectangle
    // covered by this texture.  Would an actual 'if' yield better performance?
    vec2 alphaMultiplier = step(textureCoordinateRectangle.st, tileTextureCoordinates);
    textureAlpha = textureAlpha * alphaMultiplier.x * alphaMultiplier.y;

    alphaMultiplier = step(vec2(0.0), textureCoordinateRectangle.pq - tileTextureCoordinates);
    textureAlpha = textureAlpha * alphaMultiplier.x * alphaMultiplier.y;

    vec2 translation = textureCoordinateTranslationAndScale.xy;
    vec2 scale = textureCoordinateTranslationAndScale.zw;
    vec2 textureCoordinates = tileTextureCoordinates * scale + translation;
    if(flipY)
    {
        textureCoordinates.y = 1.0 - textureCoordinates.y;
    }
    vec4 value = texture2D(textureToSample, textureCoordinates);
	if(uParentMixDirection > 0.0 && value.a > 0.01)
	{
		value.a = 0.0;
		bool blend = false;
		float mixDirection = uParentMixDirection;
		if( mixDirection > 7.0 )
		{
		    //\u5357
			if(tileTextureCoordinates.y <0.3)
			{
				blend = true;
			}
			mixDirection-=8.0;
		}
		else if( mixDirection > 3.0)
		{
		    //\u5317
			if(tileTextureCoordinates.y >0.7)
			{
				blend = true;
			}
			mixDirection-=4.0;
		}
		if(blend)
		{
			//\u7EB9\u7406\u5750\u68070-0.5\uFF0C\u4E2D\u5FC3\u662F0\u8FB9\u7F18\u662F0.5
			float mixY = abs(tileTextureCoordinates.y-0.5);
			//mixValue0-5\uFF0C\u4E2D\u5FC3\u662F0\u8FB9\u7F18\u662F5
			float mixValue = 10.0*mixY;
			//mixValue0-1\uFF0C\u4E2D\u5FC3\u662F0\u8FB9\u7F183/5\u5904\u5F00\u59CB0-1\u6E10\u53D8
			//mixValue = clamp(0.5*(mixValue - 3.0), 0.0, 1.0);
			mixValue = clamp((mixValue - 4.0), 0.0, 1.0);
			value.a = mixValue;
		}
		blend = false;
		if( mixDirection > 1.5)
		{
		    //\u4E1C
			if(tileTextureCoordinates.x >0.7)
			{
				blend = true;
			}
			mixDirection-=2.0;
		}
		else if( mixDirection > 0.5)
		{
		    //\u897F
			if(tileTextureCoordinates.x <0.3)
			{
				blend = true;
			}
		}
		if(blend)
		{
			float mixValue = 10.0*abs(tileTextureCoordinates.x-0.5);
			mixValue = clamp((mixValue - 4.0), 0.0, 1.0);
			value.a = max(mixValue, value.a);
		}
	}
    vec3 color = value.rgb;
    float alpha = value.a;
    if(transparentBackColor.a > 0.01)
    {
        float rDiff = abs(transparentBackColor.r - color.r);
        float gDiff = abs(transparentBackColor.g - color.g);
        float bDiff = abs(transparentBackColor.b - color.b);
        if(rDiff < transparentBackColor.a && gDiff < transparentBackColor.a && bDiff < transparentBackColor.a)
        {
            alpha = 0.0;
        }
    }
#if !defined(APPLY_GAMMA)
    vec4 tempColor = czm_gammaCorrect(vec4(color, alpha));
    color = tempColor.rgb;
    alpha = tempColor.a;
#else
    color = pow(color, vec3(textureOneOverGamma));
#endif
#ifdef APPLY_SPLIT
    vec2 splitPosition = czm_imagerySplitPosition;
    // Split to the left
    if (split.x < 0.0 && gl_FragCoord.x > splitPosition.x) {
       alpha = 0.0;
    }
    // Split to the right
    else if (split.x > 0.0 && gl_FragCoord.x < splitPosition.x) {
       alpha = 0.0;
    }
    if(split.y < 0.0 && gl_FragCoord.y > splitPosition.y) {
        alpha = 0.0;
    }
    else if(split.y > 0.0 && gl_FragCoord.y < splitPosition.y) {
        alpha = 0.0;
    }
#if TEXTURE_UNITS < 2
    if(alpha == 0.0)
    {
        discard;
    }
#endif
#endif
#ifdef APPLY_SWIPE
    if (gl_FragCoord.x < swipe.x || gl_FragCoord.y > swipe.y) {
       alpha = 0.0;
    }
    else if (gl_FragCoord.x > swipe.z || gl_FragCoord.y < swipe.w) {
       alpha = 0.0;
    }
#if TEXTURE_UNITS < 2
    if(alpha == 0.0)
    {
        discard;
    }
#endif
#endif
#ifdef APPLY_BRIGHTNESS
    color = mix(vec3(0.0), color, textureBrightness);
#endif
#ifdef APPLY_CONTRAST
    color = mix(vec3(0.5), color, textureContrast);
#endif
#ifdef APPLY_HUE
    color = czm_hue(color, textureHue);
#endif
#ifdef APPLY_SATURATION
    color = czm_saturation(color, textureSaturation);
#endif
#ifdef ALPHAFILTER
    if(alpha <= textureMinAlpha)
    {
        return previousColor.rgba;
    }
#endif
    float sourceAlpha = alpha * textureAlpha;
    float outAlpha = mix(previousColor.a, 1.0, sourceAlpha);
    vec3 outColor = mix(previousColor.rgb * previousColor.a, color, sourceAlpha) / outAlpha;
    return vec4(outColor, outAlpha);
}

vec4 mvtTextureSampleAndBlend(
    vec4 previousColor,
    sampler2D textureToSample,
    sampler2D idTextureToSample,
    vec2 tileTextureCoordinates,
    vec4 textureCoordinateRectangle,
    vec4 textureCoordinateTranslationAndScale,
    vec4 selectColor,
    float textureAlpha,
    float textureOneOverGamma,
    vec4 swipe)
{
#ifdef APPLY_SWIPE
    vec2 f = step(swipe.xw, vec2(gl_FragCoord.xy));
    vec2 s = step(vec2(gl_FragCoord.xy), swipe.zy);
    if (f.x * f.y * s.x * s.y < 1.0) {
        return previousColor;
    };
#endif
    vec2 alphaMultiplier = step(textureCoordinateRectangle.st, tileTextureCoordinates);
    textureAlpha = textureAlpha * alphaMultiplier.x * alphaMultiplier.y;

    alphaMultiplier = step(vec2(0.0), textureCoordinateRectangle.pq - tileTextureCoordinates);
    textureAlpha = textureAlpha * alphaMultiplier.x * alphaMultiplier.y;

    vec2 translation = textureCoordinateTranslationAndScale.xy;
    vec2 scale = textureCoordinateTranslationAndScale.zw;
    vec2 textureCoordinates = tileTextureCoordinates * scale + translation;
    vec4 value = texture2D(textureToSample, textureCoordinates);
    vec4 idColor = texture2D(idTextureToSample, textureCoordinates);
    if(idColor.r == u_pickIDColor.r && idColor.g == u_pickIDColor.g && idColor.b == u_pickIDColor.b){
        value.rgb = selectColor.rgb;
    }
    vec3 color = value.rgb;
    float alpha = value.a;
#if !defined(APPLY_GAMMA)
    vec4 tempColor = czm_gammaCorrect(vec4(color, alpha));
    color = tempColor.rgb;
    alpha = tempColor.a;
#else
    color = pow(color, vec3(textureOneOverGamma));
#endif
    float sourceAlpha = alpha * textureAlpha;
    float outAlpha = mix(previousColor.a, 1.0, sourceAlpha);
    vec3 outColor = mix(previousColor.rgb * previousColor.a, color, sourceAlpha) / outAlpha;
    return vec4(outColor, outAlpha);
}

vec4 gridTextureSampleAndBlend(
    vec4 previousColor,
    sampler2D textureToSample,
    vec2 tileTextureCoordinates,
    vec4 textureCoordinateRectangle,
    vec4 textureCoordinateTranslationAndScale)
{
    float textureAlpha = 1.0;
    vec2 alphaMultiplier = step(textureCoordinateRectangle.st, tileTextureCoordinates);
    textureAlpha = textureAlpha * alphaMultiplier.x * alphaMultiplier.y;
    alphaMultiplier = step(vec2(0.0), textureCoordinateRectangle.pq - tileTextureCoordinates);
    textureAlpha = textureAlpha * alphaMultiplier.x * alphaMultiplier.y;
    vec2 translation = textureCoordinateTranslationAndScale.xy;
    vec2 scale = textureCoordinateTranslationAndScale.zw;
    vec2 textureCoordinates = tileTextureCoordinates * scale + translation;
    vec4 value = texture2D(textureToSample, textureCoordinates);
    vec3 color = value.rgb;
    float alpha = value.a;
    float sourceAlpha = alpha * textureAlpha;
    float outAlpha = mix(previousColor.a, 1.0, sourceAlpha);
    vec3 outColor = mix(previousColor.rgb * previousColor.a, color, sourceAlpha) / outAlpha;
    return vec4(outColor, outAlpha);
}`;var Fo=`/**
 * Samples the 4 neighboring pixels and return the weighted average.
 *
 * @private
 */
vec3 czm_sampleOctahedralProjectionWithFiltering(sampler2D projectedMap, vec2 textureSize, vec3 direction, float lod)
{
    direction /= dot(vec3(1.0), abs(direction));
    vec2 rev = abs(direction.zx) - vec2(1.0);
    vec2 neg = vec2(direction.x < 0.0 ? rev.x : -rev.x,
                    direction.z < 0.0 ? rev.y : -rev.y);
    vec2 uv = direction.y < 0.0 ? neg : direction.xz;
    vec2 coord = 0.5 * uv + vec2(0.5);
    vec2 pixel = 1.0 / textureSize;

    if (lod > 0.0)
    {
        // Each subseqeuent mip level is half the size
        float scale = 1.0 / pow(2.0, lod);
        float offset = ((textureSize.y + 1.0) / textureSize.x);

        coord.x *= offset;
        coord *= scale;

        coord.x += offset + pixel.x;
        coord.y += (1.0 - (1.0 / pow(2.0, lod - 1.0))) + pixel.y * (lod - 1.0) * 2.0;
    }
    else
    {
        coord.x *= (textureSize.y / textureSize.x);
    }

    // Do bilinear filtering
    #ifndef OES_texture_float_linear
        vec3 color1 = texture2D(projectedMap, coord + vec2(0.0, pixel.y)).rgb;
        vec3 color2 = texture2D(projectedMap, coord + vec2(pixel.x, 0.0)).rgb;
        vec3 color3 = texture2D(projectedMap, coord + pixel).rgb;
        vec3 color4 = texture2D(projectedMap, coord).rgb;

        vec2 texturePosition = coord * textureSize;

        float fu = fract(texturePosition.x);
        float fv = fract(texturePosition.y);

        vec3 average1 = mix(color4, color2, fu);
        vec3 average2 = mix(color1, color3, fu);

        vec3 color = mix(average1, average2, fv);
    #else
        vec3 color = texture2D(projectedMap, coord).rgb;
    #endif

    return color;
}


/**
 * Samples from a cube map that has been projected using an octahedral projection from the given direction.
 *
 * @name czm_sampleOctahedralProjection
 * @glslFunction
 *
 * @param {sampler2D} projectedMap The texture with the octahedral projected cube map.
 * @param {vec2} textureSize The width and height dimensions in pixels of the projected map.
 * @param {vec3} direction The normalized direction used to sample the cube map.
 * @param {float} lod The level of detail to sample.
 * @param {float} maxLod The maximum level of detail.
 * @returns {vec3} The color of the cube map at the direction.
 */
vec3 czm_sampleOctahedralProjection(sampler2D projectedMap, vec2 textureSize, vec3 direction, float lod, float maxLod) {
    float currentLod = floor(lod + 0.5);
    float nextLod = min(currentLod + 1.0, maxLod);

    vec3 colorCurrentLod = czm_sampleOctahedralProjectionWithFiltering(projectedMap, textureSize, direction, currentLod);
    vec3 colorNextLod = czm_sampleOctahedralProjectionWithFiltering(projectedMap, textureSize, direction, nextLod);

    return mix(colorNextLod, colorCurrentLod, nextLod - lod);
}
`;var Bo=`/**
 * Adjusts the saturation of a color.
 * 
 * @name czm_saturation
 * @glslFunction
 * 
 * @param {vec3} rgb The color.
 * @param {float} adjustment The amount to adjust the saturation of the color.
 *
 * @returns {float} The color with the saturation adjusted.
 *
 * @example
 * vec3 greyScale = czm_saturation(color, 0.0);
 * vec3 doubleSaturation = czm_saturation(color, 2.0);
 */
vec3 czm_saturation(vec3 rgb, float adjustment)
{
    // Algorithm from Chapter 16 of OpenGL Shading Language
    const vec3 W = vec3(0.2125, 0.7154, 0.0721);
    vec3 intensity = vec3(dot(rgb, W));
    return mix(intensity, rgb, adjustment);
}
`;var No=`
float czm_sampleShadowMap(samplerCube shadowMap, vec3 d)
{
    return czm_unpackDepth(textureCube(shadowMap, d));
}

float czm_sampleShadowMap(sampler2D shadowMap, vec2 uv)
{
#ifdef USE_SHADOW_DEPTH_TEXTURE
    return texture2D(shadowMap, uv).r;
#else
    return czm_unpackDepth(texture2D(shadowMap, uv));
#endif
}

float czm_shadowDepthCompare(samplerCube shadowMap, vec3 uv, float depth)
{
    return step(depth, czm_sampleShadowMap(shadowMap, uv));
}

float czm_shadowDepthCompare(sampler2D shadowMap, vec2 uv, float depth)
{
    return step(depth, czm_sampleShadowMap(shadowMap, uv));
}
`;var Ho=`
float czm_private_shadowVisibility(float visibility, float nDotL, float normalShadingSmooth, float darkness)
{
#ifdef USE_NORMAL_SHADING
#ifdef USE_NORMAL_SHADING_SMOOTH
    float strength = clamp(nDotL / normalShadingSmooth, 0.0, 1.0);
#else
    float strength = step(0.0, nDotL);
#endif
    visibility *= strength;
#endif

    visibility = max(visibility, darkness);
    return visibility;
}

#ifdef USE_CUBE_MAP_SHADOW
float czm_shadowVisibility(samplerCube shadowMap, czm_shadowParameters shadowParameters)
{
    float depthBias = shadowParameters.depthBias;
    float depth = shadowParameters.depth;
    float nDotL = shadowParameters.nDotL;
    float normalShadingSmooth = shadowParameters.normalShadingSmooth;
    float darkness = shadowParameters.darkness;
    vec3 uvw = shadowParameters.texCoords;

    depth -= depthBias;
    float visibility = czm_shadowDepthCompare(shadowMap, uvw, depth);
    return czm_private_shadowVisibility(visibility, nDotL, normalShadingSmooth, darkness);
}
#else
float czm_shadowVisibility(sampler2D shadowMap, czm_shadowParameters shadowParameters)
{
    float depthBias = shadowParameters.depthBias;
    float depth = shadowParameters.depth;
    float nDotL = shadowParameters.nDotL;
    float normalShadingSmooth = shadowParameters.normalShadingSmooth;
    float darkness = shadowParameters.darkness;
    vec2 uv = shadowParameters.texCoords;

    depth -= depthBias;
#ifdef USE_SOFT_SHADOWS
    vec2 texelStepSize = shadowParameters.texelStepSize;
    float radius = 1.0;
    float dx0 = -texelStepSize.x * radius;
    float dy0 = -texelStepSize.y * radius;
    float dx1 = texelStepSize.x * radius;
    float dy1 = texelStepSize.y * radius;
    float visibility = (
        czm_shadowDepthCompare(shadowMap, uv, depth) +
        czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, dy0), depth) +
        czm_shadowDepthCompare(shadowMap, uv + vec2(0.0, dy0), depth) +
        czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, dy0), depth) +
        czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, 0.0), depth) +
        czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, 0.0), depth) +
        czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, dy1), depth) +
        czm_shadowDepthCompare(shadowMap, uv + vec2(0.0, dy1), depth) +
        czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, dy1), depth)
    ) * (1.0 / 9.0);
#else
    float visibility = czm_shadowDepthCompare(shadowMap, uv, depth);
#endif

    return czm_private_shadowVisibility(visibility, nDotL, normalShadingSmooth, darkness);
}
#endif
`;var Uo=`/**
 * Returns 1.0 if the given value is positive or zero, and -1.0 if it is negative.  This is similar to the GLSL
 * built-in function <code>sign</code> except that returns 1.0 instead of 0.0 when the input value is 0.0.
 * 
 * @name czm_signNotZero
 * @glslFunction
 *
 * @param {} value The value for which to determine the sign.
 * @returns {} 1.0 if the value is positive or zero, -1.0 if the value is negative.
 */
float czm_signNotZero(float value)
{
    return value >= 0.0 ? 1.0 : -1.0;
}

vec2 czm_signNotZero(vec2 value)
{
    return vec2(czm_signNotZero(value.x), czm_signNotZero(value.y));
}

vec3 czm_signNotZero(vec3 value)
{
    return vec3(czm_signNotZero(value.x), czm_signNotZero(value.y), czm_signNotZero(value.z));
}

vec4 czm_signNotZero(vec4 value)
{
    return vec4(czm_signNotZero(value.x), czm_signNotZero(value.y), czm_signNotZero(value.z), czm_signNotZero(value.w));
}
`;var Go=`uniform sampler2D uNormalDepthTexture;
uniform int uFillStyle;
float edgeDetection(float lineWidth)
{
    vec2 center = gl_FragCoord.xy / czm_globeDepthTextureDim.xy;
    vec2 off = lineWidth / czm_globeDepthTextureDim.xy;
    vec4 tex_nw = vec4(center.x+off.x, center.y+off.y, 1.0, 1.0);
    vec4 val_nw = texture2D(uNormalDepthTexture, tex_nw.xy);
    val_nw.xyz = (val_nw.xyz * 2.0) - 1.0;
    vec4 tex_ne = vec4(center.x-off.x, center.y+off.y, 1.0, 1.0);
    vec4 val_ne =  texture2D(uNormalDepthTexture, tex_ne.xy);
    val_ne.xyz = (val_ne.xyz * 2.0) - 1.0;
    vec4 tex_sw = vec4(center.x+off.x, center.y-off.y, 1.0, 1.0);
    vec4 val_sw = texture2D(uNormalDepthTexture, tex_sw.xy);
    val_sw.xyz = (val_sw.xyz * 2.0 ) - 1.0;
    vec4 tex_se = vec4(center.x-off.x, center.y-off.y, 1.0, 1.0);
    vec4 val_se = texture2D(uNormalDepthTexture, tex_se.xy);
    val_se.xyz = (val_se.xyz * 2.0) - 1.0;
    float discontinuity = 0.0;
    float dot0 = dot(val_nw.xyz, val_se.xyz);
    float dot1 = dot(val_ne.xyz, val_sw.xyz);
    discontinuity = 0.5*(dot0+dot1);
    return discontinuity;
}
vec4 czm_sketchMode(vec4 inputColor, vec4 lineColor, float lineWidth)
{
    vec4 outputColor = inputColor;
    float discontinuity = edgeDetection(lineWidth);
    discontinuity = clamp(discontinuity, 0.0, 1.0);
    if(uFillStyle == 1)
    {
        outputColor = lineColor;
        outputColor.a = (1.0 - sign(discontinuity - 0.5)) * 0.5;
        outputColor.a *= lineColor.a;
    }
    else
    {
        vec3 mixLineColor = mix(inputColor.rgb, vec3(lineColor.rgb), lineColor.a);
        outputColor.rgb = mix(mixLineColor, inputColor.rgb, discontinuity);
    }
    return outputColor;
}`;var ko=`/**
 * Computes a color from the third order spherical harmonic coefficients and a normalized direction vector.
 * <p>
 * The order of the coefficients is [L00, L1_1, L10, L11, L2_2, L2_1, L20, L21, L22].
 * </p>
 *
 * @name czm_sphericalHarmonics
 * @glslFunction
 *
 * @param {vec3} normal The normalized direction.
 * @param {vec3[9]} coefficients The third order spherical harmonic coefficients.
 * @returns {vec3} The color at the direction.
 *
 */
vec3 czm_sphericalHarmonics(vec3 normal, vec3 coefficients[9])
{
    const float c1 = 0.429043;
    const float c2 = 0.511664;
    const float c3 = 0.743125;
    const float c4 = 0.886227;
    const float c5 = 0.247708;

    vec3 L00 = coefficients[0];
    vec3 L1_1 = coefficients[1];
    vec3 L10 = coefficients[2];
    vec3 L11 = coefficients[3];
    vec3 L2_2 = coefficients[4];
    vec3 L2_1 = coefficients[5];
    vec3 L20 = coefficients[6];
    vec3 L21 = coefficients[7];
    vec3 L22 = coefficients[8];

    float x = normal.x;
    float y = normal.y;
    float z = normal.z;

    return c1 * L22 * (x * x - y * y) + c3 * L20 * z * z + c4 * L00 - c5 * L20 +
           2.0 * c1 * (L2_2 * x * y + L21 * x * z + L2_1 * y * z) +
           2.0 * c2 * (L11 * x + L1_1 * y + L10 * z);
}
`;var Wo=`/**
 * Creates a matrix that transforms vectors from tangent space to eye space.
 *
 * @name czm_tangentToEyeSpaceMatrix
 * @glslFunction
 *
 * @param {vec3} normalEC The normal vector in eye coordinates.
 * @param {vec3} tangentEC The tangent vector in eye coordinates.
 * @param {vec3} bitangentEC The bitangent vector in eye coordinates.
 *
 * @returns {mat3} The matrix that transforms from tangent space to eye space.
 *
 * @example
 * mat3 tangentToEye = czm_tangentToEyeSpaceMatrix(normalEC, tangentEC, bitangentEC);
 * vec3 normal = tangentToEye * texture2D(normalMap, st).xyz;
 */
mat3 czm_tangentToEyeSpaceMatrix(vec3 normalEC, vec3 tangentEC, vec3 bitangentEC)
{
    vec3 normal = normalize(normalEC);
    vec3 tangent = normalize(tangentEC);
    vec3 bitangent = normalize(bitangentEC);
    return mat3(tangent.x  , tangent.y  , tangent.z,
                bitangent.x, bitangent.y, bitangent.z,
                normal.x   , normal.y   , normal.z);
}
`;var qo=`vec4 czm_transformPlane(vec4 clippingPlane, mat4 transform) {
    vec3 transformedDirection = normalize((transform * vec4(clippingPlane.xyz, 0.0)).xyz);
    vec3 transformedPosition = (transform * vec4(clippingPlane.xyz * -clippingPlane.w, 1.0)).xyz;
    vec4 transformedPlane;
    transformedPlane.xyz = transformedDirection;
    transformedPlane.w = -dot(transformedDirection, transformedPosition);
    return transformedPlane;
}
`;var Xo=`/**
 * Translates a position (or any <code>vec3</code>) that was encoded with {@link EncodedCartesian3},
 * and then provided to the shader as separate <code>high</code> and <code>low</code> bits to
 * be relative to the eye.  As shown in the example, the position can then be transformed in eye
 * or clip coordinates using {@link czm_modelViewRelativeToEye} or {@link czm_modelViewProjectionRelativeToEye},
 * respectively.
 * <p>
 * This technique, called GPU RTE, eliminates jittering artifacts when using large coordinates as
 * described in .
 * </p>
 *
 * @name czm_translateRelativeToEye
 * @glslFunction
 *
 * @param {vec3} high The position's high bits.
 * @param {vec3} low The position's low bits.
 * @returns {vec3} The position translated to be relative to the camera's position.
 *
 * @example
 * attribute vec3 positionHigh;
 * attribute vec3 positionLow;
 *
 * void main()
 * {
 *   vec4 p = czm_translateRelativeToEye(positionHigh, positionLow);
 *   gl_Position = czm_modelViewProjectionRelativeToEye * p;
 * }
 *
 * @see czm_modelViewRelativeToEye
 * @see czm_modelViewProjectionRelativeToEye
 * @see czm_computePosition
 * @see EncodedCartesian3
 */
vec4 czm_translateRelativeToEye(vec3 high, vec3 low)
{
    vec3 highDifference = high - czm_encodedCameraPositionMCHigh;
    // This check handles the case when NaN values have gotten into \`highDifference\`
    // Such a thing could happen on devices running iOS
    if(length(highDifference) == 0.0) {
        highDifference = vec3(0);
    }
    vec3 lowDifference = low - czm_encodedCameraPositionMCLow;

    return vec4(highDifference + lowDifference, 1.0);
}
`;var Yo=`/**
 * @private
 */
vec4 czm_translucentPhong(vec3 toEye, czm_material material, vec3 lightDirectionEC)
{
    // Diffuse from directional light sources at eye (for top-down and horizon views)
    float diffuse = czm_getLambertDiffuse(vec3(0.0, 0.0, 1.0), material.normal);

    if (czm_sceneMode == czm_sceneMode3D) {
        // (and horizon views in 3D)
        diffuse += czm_getLambertDiffuse(vec3(0.0, 1.0, 0.0), material.normal);
    }

    diffuse = clamp(diffuse, 0.0, 1.0);

    float specular = czm_getSpecular(lightDirectionEC, toEye, material.normal, material.shininess);

    // Temporary workaround for adding ambient.
    vec3 materialDiffuse = material.diffuse * 0.5;

    vec3 ambient = materialDiffuse;
    vec3 color = ambient + material.emission;
    color += materialDiffuse * diffuse * czm_lightColor;
    color += material.specular * specular * czm_lightColor;

    return vec4(color, material.alpha);
}
`;var jo=`/**
 * Returns the transpose of the matrix.  The input <code>matrix</code> can be
 * a <code>mat2</code>, <code>mat3</code>, or <code>mat4</code>.
 *
 * @name czm_transpose
 * @glslFunction
 *
 * @param {} matrix The matrix to transpose.
 *
 * @returns {} The transposed matrix.
 *
 * @example
 * // GLSL declarations
 * mat2 czm_transpose(mat2 matrix);
 * mat3 czm_transpose(mat3 matrix);
 * mat4 czm_transpose(mat4 matrix);
 *
 * // Transpose a 3x3 rotation matrix to find its inverse.
 * mat3 eastNorthUpToEye = czm_eastNorthUpToEyeCoordinates(
 *     positionMC, normalEC);
 * mat3 eyeToEastNorthUp = czm_transpose(eastNorthUpToEye);
 */
mat2 czm_transpose(mat2 matrix)
{
    return mat2(
        matrix[0][0], matrix[1][0],
        matrix[0][1], matrix[1][1]);
}

mat3 czm_transpose(mat3 matrix)
{
    return mat3(
        matrix[0][0], matrix[1][0], matrix[2][0],
        matrix[0][1], matrix[1][1], matrix[2][1],
        matrix[0][2], matrix[1][2], matrix[2][2]);
}

mat4 czm_transpose(mat4 matrix)
{
    return mat4(
        matrix[0][0], matrix[1][0], matrix[2][0], matrix[3][0],
        matrix[0][1], matrix[1][1], matrix[2][1], matrix[3][1],
        matrix[0][2], matrix[1][2], matrix[2][2], matrix[3][2],
        matrix[0][3], matrix[1][3], matrix[2][3], matrix[3][3]);
}
`;var Zo=`/**
 * Unpacks a vec4 depth value to a float in [0, 1) range.
 *
 * @name czm_unpackDepth
 * @glslFunction
 *
 * @param {vec4} packedDepth The packed depth.
 *
 * @returns {float} The floating-point depth in [0, 1) range.
 */
 float czm_unpackDepth(vec4 packedDepth)
 {
    // See Aras Pranckevi\u010Dius' post Encoding Floats to RGBA
    return dot(packedDepth, vec4(1.0, 1.0 / 255.0, 1.0 / 65025.0, 1.0 / 16581375.0));
 }
`;var Ko=`#define SHIFT_RIGHT_8 0.00390625 //1.0 / 256.0
#define SHIFT_RIGHT_16 0.00001525878 //1.0 / 65536.0
#define SHIFT_RIGHT_24 5.960464477539063e-8//1.0 / 16777216.0

#define BIAS 38.0

/**
 * Unpacks a vec4 value containing values expressable as uint8 to an arbitrary float.
 *
 * @name czm_unpackFloat
 * @glslFunction
 *
 * @param {vec4} packedFloat The packed float.
 *
 * @returns {float} The floating-point depth in arbitrary range.
 */
 float czm_unpackFloat(vec4 packedFloat)
{
    packedFloat *= 255.0;
    float temp = packedFloat.w / 2.0;
    float exponent = floor(temp);
    float sign = (temp - exponent) * 2.0;
    exponent = exponent - float(BIAS);
    sign = sign * 2.0 - 1.0;
    sign = -sign;
    float unpacked = sign * packedFloat.x * float(SHIFT_RIGHT_8);
    unpacked += sign * packedFloat.y * float(SHIFT_RIGHT_16);
    unpacked += sign * packedFloat.z * float(SHIFT_RIGHT_24);
    return unpacked * pow(10.0, exponent);
}
`;var Qo=`/**
 * Unpacks a vec4 value to a float.
 *
 * @name czm_unpackValue
 * @glslFunction
 *
 * @param {vec3} packedValue The packed value.
 *
 * @returns {float} The floating-point value.
 */
 float czm_unpackValue(vec4 packedValue)
 {
    float SHIFT_LEFT16 = 65536.0;
	float SHIFT_LEFT8 = 256.0;
	vec4 value = packedValue * 255.0;
	return value.r * SHIFT_LEFT16 + value.g * SHIFT_LEFT8 + value.b - 9000.0;
 }
`;var Jo=`#ifdef LOG_DEPTH
// 1.0 at the near plane, increasing linearly from there.
varying float v_depthFromNearPlusOne;
#ifdef SHADOW_MAP
varying vec3 v_logPositionEC;
#endif
#endif

vec4 czm_updatePositionDepth(vec4 coords) {
#if defined(LOG_DEPTH)

#ifdef SHADOW_MAP
    vec3 logPositionEC = (czm_inverseProjection * coords).xyz;
    v_logPositionEC = logPositionEC;
#endif

    // With the very high far/near ratios used with the logarithmic depth
    // buffer, floating point rounding errors can cause linear depth values
    // to end up on the wrong side of the far plane, even for vertices that
    // are really nowhere near it. Since we always write a correct logarithmic
    // depth value in the fragment shader anyway, we just need to make sure
    // such errors don't cause the primitive to be clipped entirely before
    // we even get to the fragment shader.
    coords.z = clamp(coords.z / coords.w, -1.0, 1.0) * coords.w;
#endif

    return coords;
}

/**
 * Writes the logarithmic depth to gl_Position using the already computed gl_Position.
 *
 * @name czm_vertexLogDepth
 * @glslFunction
 */
void czm_vertexLogDepth()
{
#ifdef LOG_DEPTH
    v_depthFromNearPlusOne = 1.0 - czm_currentFrustum.x + gl_Position.w;
    gl_Position = czm_updatePositionDepth(gl_Position);
#endif
}

/**
 * Writes the logarithmic depth to gl_Position using the provided clip coordinates.
 * <p>
 * An example use case for this function would be moving the vertex in window coordinates
 * before converting back to clip coordinates. Use the original vertex clip coordinates.
 * </p>
 * @name czm_vertexLogDepth
 * @glslFunction
 *
 * @param {vec4} clipCoords The vertex in clip coordinates.
 *
 * @example
 * czm_vertexLogDepth(czm_projection * vec4(positionEyeCoordinates, 1.0));
 */
void czm_vertexLogDepth(vec4 clipCoords)
{
#ifdef LOG_DEPTH
    v_depthFromNearPlusOne = 1.0 - czm_currentFrustum.x + clipCoords.w;
    czm_updatePositionDepth(clipCoords);
#endif
}
`;var $o=`/**
 * Transforms a position from window to eye coordinates.
 * The transform from window to normalized device coordinates is done using components
 * of (@link czm_viewport} and {@link czm_viewportTransformation} instead of calculating
 * the inverse of <code>czm_viewportTransformation</code>. The transformation from
 * normalized device coordinates to clip coordinates is done using <code>fragmentCoordinate.w</code>,
 * which is expected to be the scalar used in the perspective divide. The transformation
 * from clip to eye coordinates is done using {@link czm_inverseProjection}.
 *
 * @name czm_windowToEyeCoordinates
 * @glslFunction
 *
 * @param {vec4} fragmentCoordinate The position in window coordinates to transform.
 *
 * @returns {vec4} The transformed position in eye coordinates.
 *
 * @see czm_modelToWindowCoordinates
 * @see czm_eyeToWindowCoordinates
 * @see czm_inverseProjection
 * @see czm_viewport
 * @see czm_viewportTransformation
 *
 * @example
 * vec4 positionEC = czm_windowToEyeCoordinates(gl_FragCoord);
 */
vec4 czm_windowToEyeCoordinates(vec4 fragmentCoordinate)
{
    // Reconstruct NDC coordinates
    float x = 2.0 * (fragmentCoordinate.x - czm_viewport.x) / czm_viewport.z - 1.0;
    float y = 2.0 * (fragmentCoordinate.y - czm_viewport.y) / czm_viewport.w - 1.0;
    float z = (fragmentCoordinate.z - czm_viewportTransformation[3][2]) / czm_viewportTransformation[2][2];
    vec4 q = vec4(x, y, z, 1.0);

    // Reverse the perspective division to obtain clip coordinates.
    q /= fragmentCoordinate.w;

    // Reverse the projection transformation to obtain eye coordinates.
    if (!(czm_inverseProjection == mat4(0.0))) // IE and Edge sometimes do something weird with != between mat4s
    {
        q = czm_inverseProjection * q;
    }
    else
    {
        float top = czm_frustumPlanes.x;
        float bottom = czm_frustumPlanes.y;
        float left = czm_frustumPlanes.z;
        float right = czm_frustumPlanes.w;

        float near = czm_currentFrustum.x;
        float far = czm_currentFrustum.y;

        q.x = (q.x * (right - left) + left + right) * 0.5;
        q.y = (q.y * (top - bottom) + bottom + top) * 0.5;
        q.z = (q.z * (near - far) - near - far) * 0.5;
        q.w = 1.0;
    }

    return q;
}

/**
 * Transforms a position given as window x/y and a depth or a log depth from window to eye coordinates.
 * This function produces more accurate results for window positions with log depth than
 * conventionally unpacking the log depth using czm_reverseLogDepth and using the standard version
 * of czm_windowToEyeCoordinates.
 *
 * @name czm_windowToEyeCoordinates
 * @glslFunction
 *
 * @param {vec2} fragmentCoordinateXY The XY position in window coordinates to transform.
 * @param {float} depthOrLogDepth A depth or log depth for the fragment.
 *
 * @see czm_modelToWindowCoordinates
 * @see czm_eyeToWindowCoordinates
 * @see czm_inverseProjection
 * @see czm_viewport
 * @see czm_viewportTransformation
 *
 * @returns {vec4} The transformed position in eye coordinates.
 */
vec4 czm_windowToEyeCoordinates(vec2 fragmentCoordinateXY, float depthOrLogDepth)
{
    // See reverseLogDepth.glsl. This is separate to re-use the pow.
#ifdef LOG_DEPTH
    float near = czm_currentFrustum.x;
    float far = czm_currentFrustum.y;
    float log2Depth = depthOrLogDepth * czm_log2FarDepthFromNearPlusOne;
    float depthFromNear = pow(2.0, log2Depth) - 1.0;
    float depthFromCamera = depthFromNear + near;
    vec4 windowCoord = vec4(fragmentCoordinateXY, far * (1.0 - near / depthFromCamera) / (far - near), 1.0);
    vec4 eyeCoordinate = czm_windowToEyeCoordinates(windowCoord);
    eyeCoordinate.w = 1.0 / depthFromCamera; // Better precision
    return eyeCoordinate;
#else
    vec4 windowCoord = vec4(fragmentCoordinateXY, depthOrLogDepth, 1.0);
    vec4 eyeCoordinate = czm_windowToEyeCoordinates(windowCoord);
#endif
    return eyeCoordinate;
}
`;var er=`// emulated noperspective
#if !defined(LOG_DEPTH)
in float v_WindowZ;
#endif

/**
 * Emulates GL_DEPTH_CLAMP. Clamps a fragment to the near and far plane
 * by writing the fragment's depth. See czm_depthClamp for more details.
 *
 * @name czm_writeDepthClamp
 * @glslFunction
 *
 * @example
 * gl_FragColor = color;
 * czm_writeDepthClamp();
 *
 * @see czm_depthClamp
 */
void czm_writeDepthClamp()
{
#if (!defined(LOG_DEPTH) && (__VERSION__ == 300 || defined(GL_EXT_frag_depth)))
    gl_FragDepth = clamp(v_WindowZ * gl_FragCoord.w, 0.0, 1.0);
#endif
}
`;var nr=`// emulated noperspective
#ifndef LOG_DEPTH
varying float v_WindowZ;
#endif
/**
 * Clamps a vertex to the far plane by writing the fragments depth.
 * <p>
 * The shader must enable the GL_EXT_frag_depth extension.
 * </p>
 *
 * @name czm_writeDepthClampedToFarPlane
 * @glslFunction
 *
 * @example
 * gl_FragColor = color;
 * czm_writeDepthClampedToFarPlane();
 *
 * @see czm_depthClampFarPlane
 */
void czm_writeDepthClampedToFarPlane()
{
#if defined(GL_EXT_frag_depth) && !defined(LOG_DEPTH)
    gl_FragDepthEXT = min(v_WindowZ * gl_FragCoord.w, 1.0);
#endif
}
`;var tr=`#ifdef LOG_DEPTH
varying float v_depthFromNearPlusOne;

#ifdef POLYGON_OFFSET
uniform vec2 u_polygonOffset;
#endif

#endif

/**
 * Writes the fragment depth to the logarithmic depth buffer.
 * <p>
 * Use this when the vertex shader does not call {@link czm_vertexlogDepth}, for example, when
 * ray-casting geometry using a full screen quad.
 * </p>
 * @name czm_writeLogDepth
 * @glslFunction
 *
 * @param {float} depth The depth coordinate, where 1.0 is on the near plane and
 *                      depth increases in eye-space units from there
 *
 * @example
 * czm_writeLogDepth((czm_projection * v_positionEyeCoordinates).w + 1.0);
 */
void czm_writeLogDepth(float depth)
{
#if (defined(GL_EXT_frag_depth) || defined(WEBGL2)) && defined(LOG_DEPTH)
    // Discard the vertex if it's not between the near and far planes.
    // We allow a bit of epsilon on the near plane comparison because a 1.0
    // from the vertex shader (indicating the vertex should be _on_ the near
    // plane) will not necessarily come here as exactly 1.0.
    if (depth <= 0.9999999 || depth > czm_farDepthFromNearPlusOne) {
        discard;
    }

#ifdef POLYGON_OFFSET
    // Polygon offset: m * factor + r * units
    float factor = u_polygonOffset[0];
    float units = u_polygonOffset[1];

    // If we can't compute derivatives, just leave out the factor I guess?
#ifdef GL_OES_standard_derivatives
    // m = sqrt(dZdX^2 + dZdY^2);
    float x = dFdx(depth);
    float y = dFdy(depth);
    float m = sqrt(x * x + y * y);

    // Apply the factor before computing the log depth.
    depth += m * factor;
#endif

#endif

    gl_FragDepthEXT = log2(depth) * czm_oneOverLog2FarDepthFromNearPlusOne;

#ifdef POLYGON_OFFSET
    // Apply the units after the log depth.
    gl_FragDepthEXT += czm_epsilon7 * units;
#endif

#endif
}

/**
 * Writes the fragment depth to the logarithmic depth buffer.
 * <p>
 * Use this when the vertex shader calls {@link czm_vertexlogDepth}.
 * </p>
 *
 * @name czm_writeLogDepth
 * @glslFunction
 */
void czm_writeLogDepth() {
#ifdef LOG_DEPTH
    czm_writeLogDepth(v_depthFromNearPlusOne);
#endif
}
`;var or=`/**
 * Transforms a value for non-perspective interpolation by multiplying
 * it by w, the value used in the perspective divide. This function is
 * intended to be called in a vertex shader to compute the value of a
 * \`varying\` that should not be subject to perspective interpolation.
 * For example, screen-space texture coordinates. The fragment shader
 * must call {@link czm_readNonPerspective} to retrieve the final
 * non-perspective value.
 *
 * @name czm_writeNonPerspective
 * @glslFunction
 *
 * @param {float|vec2|vec3|vec4} value The value to be interpolated without accounting for perspective.
 * @param {float} w The perspective divide value. Usually this is the computed \`gl_Position.w\`.
 * @returns {float|vec2|vec3|vec4} The transformed value, intended to be stored in a \`varying\` and read in the
 *          fragment shader with {@link czm_readNonPerspective}.
 */
float czm_writeNonPerspective(float value, float w) {
    return value * w;
}

vec2 czm_writeNonPerspective(vec2 value, float w) {
    return value * w;
}

vec3 czm_writeNonPerspective(vec3 value, float w) {
    return value * w;
}

vec4 czm_writeNonPerspective(vec4 value, float w) {
    return value * w;
}
`;var rr=`/**
 * Converts a CIE Yxy color to RGB.
 * <p>The conversion is described in
 * </p>
 * 
 * @name czm_XYZToRGB
 * @glslFunction
 * 
 * @param {vec3} Yxy The color in CIE Yxy.
 *
 * @returns {vec3} The color in RGB.
 *
 * @example
 * vec3 xyz = czm_RGBToXYZ(rgb);
 * xyz.x = max(xyz.x - luminanceThreshold, 0.0);
 * rgb = czm_XYZToRGB(xyz);
 */
vec3 czm_XYZToRGB(vec3 Yxy)
{
    const mat3 XYZ2RGB = mat3( 3.2405, -0.9693,  0.0556,
                              -1.5371,  1.8760, -0.2040,
                              -0.4985,  0.0416,  1.0572);
    vec3 xyz;
    xyz.r = Yxy.r * Yxy.g / Yxy.b;
    xyz.g = Yxy.r;
    xyz.b = Yxy.r * (1.0 - Yxy.g - Yxy.b) / Yxy.b;
    
    return XYZ2RGB * xyz;
}
`;var Re={czm_degreesPerRadian:Cn,czm_depthRange:Tn,czm_ellipsoidInverseRadii:yn,czm_ellipsoidRadii:zn,czm_epsilon1:bn,czm_epsilon2:wn,czm_epsilon3:Ln,czm_epsilon4:Sn,czm_epsilon5:En,czm_epsilon6:An,czm_epsilon7:Dn,czm_infinity:On,czm_oneOverPi:In,czm_oneOverTwoPi:Rn,czm_passCesium3DTile:Mn,czm_passCesium3DTileClassification:Pn,czm_passCesium3DTileClassificationIgnoreShow:Vn,czm_passClassification:Fn,czm_passCompute:Bn,czm_passEnvironment:Nn,czm_passGlobe:Hn,czm_passGround:Un,czm_passOpaque:Gn,czm_passOverlay:kn,czm_passTerrainClassification:Wn,czm_passTranslucent:qn,czm_pi:Xn,czm_piOverFour:Yn,czm_piOverSix:jn,czm_piOverThree:Zn,czm_piOverTwo:Kn,czm_radiansPerDegree:Qn,czm_sceneMode2D:Jn,czm_sceneMode3D:$n,czm_sceneModeColumbusView:et,czm_sceneModeMorphing:nt,czm_solarRadius:tt,czm_threePiOver2:ot,czm_twoPi:rt,czm_webMercatorMaxLatitude:it,czm_depthRangeStruct:at,czm_ellipsoid:lt,czm_material:ct,czm_materialInput:st,czm_ray:ft,czm_raySegment:ut,czm_s3mMaterialInput:mt,czm_shadowParameters:dt,czm_acesTonemapping:pt,czm_adjustColor:vt,czm_alphaWeight:ht,czm_antialias:gt,czm_approximateSphericalCoordinates:_t,czm_branchFreeTernary:xt,czm_cascadeColor:Ct,czm_cascadeDistance:Tt,czm_cascadeMatrix:yt,czm_cascadeWeights:zt,czm_clip:bt,czm_columbusViewMorph:wt,czm_computeLightColorInFP:Lt,czm_computeLightColorInstanceInFP:St,czm_computeNormal:Et,czm_computePosition:At,czm_cosineAndSine:Dt,czm_decompressTextureCoordinates:Ot,czm_depthClamp:It,czm_depthClampFarPlane:Rt,czm_directionLight:Mt,czm_eastNorthUpToEyeCoordinates:Pt,czm_ellipsoidContainsPoint:Vt,czm_ellipsoidNew:Ft,czm_ellipsoidWgs84TextureCoordinates:Bt,czm_equalsEpsilon:Nt,czm_executeExcavation:Ht,czm_eyeOffset:Ut,czm_eyeToWindowCoordinates:Gt,czm_fastApproximateAtan:kt,czm_fog:Wt,czm_gammaCorrect:qt,czm_geodeticSurfaceNormal:Xt,czm_getDefaultMaterial:Yt,czm_getEmissiveTextureColor:jt,czm_getHorizontalColor:Zt,czm_getHypsometricColor:Kt,czm_getLambertDiffuse:Qt,czm_getSpecular:Jt,czm_getTexColorForS3M:$t,czm_getTextureMatrixFromZValue:eo,czm_getVolumeValue:no,czm_getVolumeValueMultiResolution:to,czm_getWaterNoise:oo,czm_getWgs84EllipsoidEC:ro,czm_HSBToRGB:io,czm_HSLToRGB:ao,czm_hue:lo,czm_inverseGamma:co,czm_inverseMatrix:so,czm_isEmpty:fo,czm_isFull:uo,czm_latitudeToWebMercatorFraction:mo,czm_lineDistance:po,czm_luminance:vo,czm_metersPerPixel:ho,czm_modelToWindowCoordinates:go,czm_multiplyWithColorBalance:_o,czm_nearFarScalar:xo,czm_octDecode:Co,czm_packDepth:To,czm_packValue:yo,czm_phong:zo,czm_planeDistance:bo,czm_pointAlongRay:wo,czm_rayEllipsoidIntersectionInterval:Lo,czm_readDepth:So,czm_readNonPerspective:Eo,czm_reverseLogDepth:Ao,czm_RGBToHSB:Do,czm_RGBToHSL:Oo,czm_RGBToXYZ:Io,czm_RollerShutter:Ro,czm_s3mBatchOperation:Mo,czm_S3MPBR:Po,czm_sampleAndBlend:Vo,czm_sampleOctahedralProjection:Fo,czm_saturation:Bo,czm_shadowDepthCompare:No,czm_shadowVisibility:Ho,czm_signNotZero:Uo,czm_sketchMode:Go,czm_sphericalHarmonics:ko,czm_tangentToEyeSpaceMatrix:Wo,czm_transformPlane:qo,czm_translateRelativeToEye:Xo,czm_translucentPhong:Yo,czm_transpose:jo,czm_unpackDepth:Zo,czm_unpackFloat:Ko,czm_unpackValue:Qo,czm_vertexLogDepth:Jo,czm_windowToEyeCoordinates:$o,czm_writeDepthClamp:er,czm_writeDepthClampedToFarPlane:nr,czm_writeLogDepth:tr,czm_writeNonPerspective:or,czm_XYZToRGB:rr};var ir=`
#ifdef HAS_RAIN
uniform float uAnimationSpeed;
uniform sampler2D uRippleTexture;
uniform float uRippleScale;
uniform float uWindIntensity;
uniform float uRain;
uniform float uCameraDepth;
    
void getTimeInfo(float animationSpeed, out vec2 timeVec)
{
	float time = czm_frameNumber * animationSpeed;
	time = floor(30.0 * time);
	float time_diff = floor(time*0.25);
	time = mod(time, 4.0);
	time_diff = mod(time_diff, 4.0);
	timeVec = vec2(time, time_diff);
}

void getPosInfo(vec4 posMC, out vec2 posMC_frac1, out vec2 posMC_frac2)
{
	float ripple_scale = 1.0 / uRippleScale;
	vec2 posXY = posMC.xy * ripple_scale;
	posMC_frac1 = fract(posXY);
	vec2 posStep = vec2(0.5);
	posMC_frac2 = fract(posXY + posStep);
}

float getAlpha(vec2 posMC_frac1)
{
	vec2 dist = (posMC_frac1 - vec2(0.5)) * 2.0;
	dist = vec2(abs(dist.x), abs(dist.y));
	vec2 result = pow(dist, vec2(5.0));
	return result.x + result.y;
}

vec4 getRippleValue(sampler2D uRippleTexture, vec2 timeVec, vec2 posMC_frac1, vec2 posMC_frac2, float alpha)
{
	vec2 rippleUV_1 = (timeVec + posMC_frac1)*0.25;
	vec2 rippleUV_2 = (timeVec + posMC_frac2)*0.25;
	vec4 rippleValue_1 = texture2D(uRippleTexture, rippleUV_1.xy);
	vec4 rippleValue_2 = texture2D(uRippleTexture, rippleUV_2.xy);
	return mix(rippleValue_1, rippleValue_2, alpha);
}

vec3 getRippleNormal(vec4 rippleValue, float wind_intensity, float rain, float depthFade)
{
	vec2 rippleValueXY = rippleValue.xy;
	vec2 rippleValueZW = rippleValue.zw;
	const vec2 _value = vec2(0.5);
	vec2 part_1 = (rippleValueZW - _value) * wind_intensity * 0.13;
	vec2 part_2 = (rippleValueXY - _value) * 0.6;
	vec2 mergedValue = mix(part_1, part_2, rain) * depthFade;
	return vec3(mergedValue, 1.0);
}

float getNormalAlpha(vec3 normalWS,float wetness)
{
	float valueZ = normalWS.z - 0.5;
	float wet_correction = wetness * clamp(valueZ * 2.5, 0.0, 1.0);
	return pow(wet_correction, 15.0);
}

vec3 rippleNormalCorrection(vec3 rippleNormal,float normalAlpha)
{
	const vec3 blueNormal = vec3(0.0, 0.0, 1.0);
	return mix(blueNormal, rippleNormal, normalAlpha);
}

vec3 rippleGenerator(sampler2D uRippleTexture, float animationSpeed,vec3 normalWS,float wetness)
{
	vec2 timeVec = vec2(1.0);
	getTimeInfo(animationSpeed, timeVec);
	vec2 posMC_frac1 = vec2(1.0);
	vec2 posMC_frac2 = vec2(1.0);
	getPosInfo(vPositionMC, posMC_frac1, posMC_frac2);
	float alpha = getAlpha(posMC_frac1);
	vec4 rippleValue = getRippleValue(uRippleTexture, timeVec, posMC_frac1, posMC_frac2, alpha);
	vec3 rippleNormal = getRippleNormal(rippleValue, uWindIntensity, uRain, uCameraDepth);
	float normalAlpha = getNormalAlpha(normalWS, wetness);
	return normalize(rippleNormalCorrection(rippleNormal, normalAlpha));
}
#endif
`;var ar=`
#ifdef HAS_SNOW
uniform float uSnowCoverageFactor;
uniform sampler2D uSnowMaskTexture;
uniform sampler2D uSnowNormalTexture;

vec3 getSnowMaskValue(sampler2D uSnowMaskTexture, vec2 snowUV)
{
	return texture2D(uSnowMaskTexture, snowUV).rgb;
}

float getSnowCoverage(float snow_coverage, float max_snow_coverage, vec3 normalWS, float z_mask)
{
	float normal_z = normalWS.z;
	normal_z += 1.1 + z_mask;
	normal_z = clamp(normal_z * 0.5, 0.0, 1.0);
	float final_snow_coverage = clamp(snow_coverage, 0.0, max_snow_coverage);
	final_snow_coverage = clamp(final_snow_coverage*normal_z, 0.0, 1.0);
	return final_snow_coverage;
}

float getSnowCoverageWithMaskTexture(float finalSnowCoverage, float heightValue, float snow_scatter_value, float snow_scatter_alpha, float tighten_value)
{
	float scatter_value = mix(heightValue, snow_scatter_value, snow_scatter_alpha);
	return clamp((tighten_value + 1.0) * finalSnowCoverage - tighten_value * scatter_value, 0.0, 1.0);
}

float getSnowAlpha(vec3 normalWS, float snow_coverage, float z_mask)
{
	return clamp((normalWS.z + z_mask) * 5.0, 0.0, 1.0) * snow_coverage;
}

vec3 getFinalBaseColor(vec3 baseColor, vec3 snow_baseColor, float snowAlpha)
{
	return mix(baseColor, snow_baseColor, snowAlpha);
}

float getFinalRoughness(float roughness, float snow_roughness, float snowAlpha)
{
	return mix(roughness, snow_roughness, snowAlpha);
}

vec3 getFinalNormal(vec3 normalWS, vec3 snowNormal, float blendNormalValue, float snow_coverage)
{
	vec3 snowNormal_part2 = vec3(snowNormal.xy - vec2(0.5), 1.0);
	float normal_alpha = (1.0 - blendNormalValue)* snow_coverage;
	return mix(normalWS, snowNormal_part2, normal_alpha);
}

void snowGenerator(sampler2D uSnowMaskTexture, sampler2D uSnowNormalTexture, vec2 snowUV, float snow_coverage, inout vec3 normalWS, inout vec3 baseColor, inout float roughness)
{
	vec3 snowMaskValue = texture2D(uSnowMaskTexture, snowUV).rgb;
	const float max_snow_coverage = 1.0;
	const float z_mask = 0.0;
	float snowCoverage = getSnowCoverage(snow_coverage, max_snow_coverage, normalWS, z_mask);
	const float heightValue = 0.5;
	float snow_scatter_value = snowMaskValue.g;
	const float snow_scatter_alpha = 0.5;
	const float tighten_value = 4.0;
    snowCoverage = getSnowCoverageWithMaskTexture(snowCoverage, heightValue, snow_scatter_value, snow_scatter_alpha, tighten_value);
	float snow_alpha = getSnowAlpha(normalWS, snowCoverage, z_mask);
	baseColor = getFinalBaseColor(baseColor, vec3(snowMaskValue.r), snow_alpha);
	roughness = getFinalRoughness(roughness, snowMaskValue.b, snow_alpha);
	vec3 snowNormalValue = texture2D(uSnowNormalTexture, snowUV).rgb;
	const float blendNormalValue = 0.3;
	normalWS = getFinalNormal(normalWS, snowNormalValue, blendNormalValue, snowCoverage);
}

#endif
`;var lr=`
#ifdef HAS_HEMISPHERE_LIGHTS

uniform vec3 uSkyColor[ HEMISPHERE_LIGHTS ];
uniform vec3 uGroundColor[ HEMISPHERE_LIGHTS ];
uniform vec3 uHemisphereLightDirectionEC[ HEMISPHERE_LIGHTS ];
    
struct HemisphereLight {
    vec3 direction;
    vec3 skyColor;
    vec3 groundColor;
};

vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {
    float dotNL = dot( geometry.normal, hemiLight.direction );
    float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
    vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
    return irradiance;
}

#endif
`;var cr=`
#ifdef HAS_POINT_LIGHTS

uniform vec3 uPointLightPositionEC[ POINT_LIGHTS ];
uniform vec3 uPointLightColor[ POINT_LIGHTS ];
uniform vec2 uPointLightDistanceAndDecay[ POINT_LIGHTS ];

struct PointLight {
    vec3 position;
    vec3 color;
    float distance;
    float decay;
};

void getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {
    vec3 lVector = pointLight.position - geometry.position;
    directLight.direction = normalize( lVector );
    float lightDistance = length( lVector );
    directLight.color = pointLight.color;
    directLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );
    directLight.visible = ( directLight.color != vec3( 0.0 ) );
}

#endif
`;var sr=`
#ifdef HAS_SPOT_LIGHTS

uniform vec3 uSpotLightColor[ SPOT_LIGHTS ];
uniform vec3 uSpotLightPositionEC[ SPOT_LIGHTS ];
uniform vec3 uSpotLightDirectionEC[ SPOT_LIGHTS ];
uniform vec4 uSpotLightDistanceDecayCosPenumbra[ SPOT_LIGHTS ];
uniform vec3 uSpotLightExponent[ SPOT_LIGHTS ];
    
struct SpotLight {
    vec3 position;
    vec3 direction;
    vec3 color;
    float distance;
    float decay;
    float coneCos;
    float penumbraCos;
};

void getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {
    vec3 lVector = spotLight.position - geometry.position;
    directLight.direction = normalize( lVector );
    float lightDistance = length( lVector );
    float angleCos = dot( directLight.direction, spotLight.direction );
    if ( angleCos > spotLight.coneCos ) {
        float spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );
        directLight.color = spotLight.color;
        directLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );
        directLight.visible = true;
    } else {
        directLight.color = vec3( 0.0 );
        directLight.visible = false;
    }
}

#endif
`;var fr=`
#ifdef HAS_DIR_LIGHTS

uniform vec3 uDirectionalLightDirectionEC[ DIR_LIGHTS ];
uniform vec3 uDirectionalLightColor[ DIR_LIGHTS ];
    
#endif
`;var ur=`

#ifdef HAS_DIR_LIGHTS
for (int i = 0; i < DIR_LIGHTS; i++) {
    directLight.color = uDirectionalLightColor[i];
    directLight.direction = uDirectionalLightDirectionEC[i];
    directLight.visible = true;
    directPhysical( directLight, geometry, material, reflectedLight );
}
#endif

#ifdef HAS_POINT_LIGHTS
PointLight pointLight;
for (int i = 0; i < POINT_LIGHTS; i++) {
    pointLight.position = uPointLightPositionEC[i];
    pointLight.color = uPointLightColor[i];
    pointLight.distance = uPointLightDistanceAndDecay[i].x;
    pointLight.decay = uPointLightDistanceAndDecay[i].y;
    getPointDirectLightIrradiance( pointLight, geometry, directLight );
    if(!directLight.visible) continue;
    directPhysical( directLight, geometry, material, reflectedLight );
}
#endif

#ifdef HAS_SPOT_LIGHTS
SpotLight spotLight;
for (int i = 0; i < SPOT_LIGHTS; i++) {
    spotLight.position = uSpotLightPositionEC[i];
    spotLight.color = uSpotLightColor[i];
    spotLight.direction = uSpotLightDirectionEC[i];
    spotLight.coneCos = uSpotLightDistanceDecayCosPenumbra[i].z;
    spotLight.penumbraCos = uSpotLightDistanceDecayCosPenumbra[i].w;
    getSpotDirectLightIrradiance( spotLight, geometry, directLight );
    if(!directLight.visible) continue;
    directPhysical( directLight, geometry, material, reflectedLight );
}
#endif
`;var mr=`
#ifdef BRDF
#define RECIPROCAL_PI 0.31830988618
#define M_PI 3.141592653589793
#define EPSILON 1e-6
#define CUBEUV_MAX_MIP 8.0
#define CUBEUV_TEXEL_WIDTH 0.0013020833333333333
#define CUBEUV_TEXEL_HEIGHT 0.0009765625
#define saturate(a) clamp( a, 0.0, 1.0 )
float pow2( const in float x ) { return x * x; }

uniform vec4 uBaseColorFactor;
uniform vec4 uEmissiveFactor;
uniform float uMetallicFactor;
uniform float uRoughnessFactor;
uniform float uAlphaCutoff;
uniform float uEnvMapIntensity;
uniform float uCameraReflect;
struct IncidentLight {
    vec3 direction;
    vec3 color;
    bool visible;
};

struct GeometricContext {
    vec3 position;
    vec3 normal;
    vec3 viewDir;
};

struct PhysicalMaterial {
    vec3	diffuseColor;
    float	roughness;
    vec3	specularColor;
    float specularF90;
};

struct ReflectedLight {
    vec3 directDiffuse;
    vec3 directSpecular;
    vec3 indirectDiffuse;
    vec3 indirectSpecular;
};

#ifdef HAS_BASE_TEXTURE
    uniform sampler2D uBaseTexture;
#endif

#ifdef HAS_NORMAL_TEXTURE
    uniform sampler2D uNormalTexture;
    uniform float uNormalTextureScale;
#ifdef HAS_ANISOTROPY
    uniform vec4 uAnisotropy;
#endif
#endif

#ifdef HAS_EMISSIVE_TEXTURE
    uniform sampler2D uEmissionTexture;
    uniform vec4 uEmissiveUVOffsetAndTiling;
#endif

#ifdef HAS_MetallicRoughness_TEXTURE
    uniform sampler2D uMetallicRoughnessTexture;
#endif

#ifdef HAS_OCCLUSION_TEXTURE
    uniform sampler2D uOcclusionTexture;
#endif

#ifdef REFRACTION
    uniform float uIndexOfRefraction;
#endif

#ifdef HAS_TRANSMISSION
    uniform float uTransmissionFactor;
#endif

#ifdef HAS_WETNESS
    uniform float uWetnessFactor;
#endif

#ifdef HAS_VOLUME
    uniform vec4 uTintColor;
    uniform vec4 uDiffusionDistance;
    uniform float uThickness;
#endif

#ifdef HAS_CLEARCOAT
    uniform float uClearcoatFactor;
    uniform float uClearcoatRoughnessFactor;
#endif

//\u53C2\u8003UE4.24\u5B9E\u73B0\u8BA1\u7B97\u7CBE\u786E\u5149\u6E90\u7684\u8870\u51CF
float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
    // float d = lightDistance;
    // float r = cutoffDistance;
    // float d2 = d * d;
    // float attenuation = 1.0 / (d2 + 1.0); 
    // float m = saturate(1.0 - pow(d / r, 4.0));
    // float m2 = m * m;
    // return attenuation * m2;
    if ( decayExponent > 0.0 ) {
        return pow( saturate( 1.0 - lightDistance / cutoffDistance ), decayExponent );
    }
    return 1.0;
}

#include <hemisphereLightDecl>
#include <directionLightDecl>
#include <pointLightDecl>
#include <spotLightDecl>
#include <snowDecl>
#include <rainDecl>

#ifdef HAS_ANISOTROPY
vec3 getAnisotropicBentNormals(const vec3 T, const vec3 B, const vec3 N, const vec3 V, float anisotropy) {
    vec3 anisotropicFrameDirection = anisotropy >= 0.0 ? B : T;
    vec3 anisotropicFrameTangent = cross(normalize(anisotropicFrameDirection), V);
    vec3 anisotropicFrameNormal = cross(anisotropicFrameTangent, anisotropicFrameDirection);
    vec3 anisotropicNormal = normalize(mix(N, anisotropicFrameNormal, abs(anisotropy)));
    return anisotropicNormal;
}
#endif

#ifdef HAS_VOLUME
vec3 computeColorAtDistanceInMedia(vec3 color, float distance) {
    return -log(color) / distance;
}
vec3 cocaLambert(vec3 alpha, float distance) {
    return exp(-alpha * distance);
}
#endif


vec3 sRGBToLinear(vec3 srgbIn) 
{
    return pow(srgbIn, vec3(2.2));
}

vec4 sRGBToLinear(vec4 srgbIn)
{
    srgbIn = srgbIn ;
    vec3 linearOut = pow(srgbIn.rgb, vec3(2.2));
    return vec4(linearOut, srgbIn.a);
}

vec3 LinearTosRGB(vec3 linearIn) 
{
#ifndef HDR 
    return pow(linearIn, vec3(1.0/2.2));
#else 
    return linearIn;
#endif 
}

vec3 lambertianDiffuse(vec3 diffuseColor) 
{
    return diffuseColor * RECIPROCAL_PI;
}

vec3 applyTonemapping(vec3 linearIn) 
{
    vec3 color = linearIn * czm_toneMappingExposure;
    return czm_acesTonemapping(color);
}

vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
    float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
    return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}

float GeometrySchlickGGX(float roughness, float NoV)
{
    float k = pow(roughness + 1.0, 2.0) / 8.0;
    return NoV / (NoV * (1.0 - k) + k);
}

float D_GGX( const in float alpha, const in float dotNH ) {
    float a2 = pow2( alpha );
    float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
    return RECIPROCAL_PI * a2 / pow2( denom );
}

vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
    float alpha = roughness * roughness;
    vec3 halfDir = normalize( lightDir + viewDir );
    float dotNL = clamp( dot( normal, lightDir ), 0.001, 1.0 );
    float dotNV = abs( dot( normal, viewDir ) ) + 0.001;
    float dotNH = saturate( dot( normal, halfDir ) );
    float dotLH = saturate( dot( lightDir, halfDir ) );
    float dotVH = saturate( dot( viewDir, halfDir ) );
    vec3 F = F_Schlick( f0, f90, dotVH );
    float G = GeometrySchlickGGX(alpha, dotNV) * GeometrySchlickGGX(alpha, dotNL);
    float D = D_GGX( alpha, dotNH );
    return F * ( G * D ) / (4.0 * dotNL * dotNV);
}

void directPhysical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
    float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
    vec3 irradiance = dotNL * directLight.color;
    reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
    reflectedLight.directDiffuse += irradiance * lambertianDiffuse( material.diffuseColor );
}

#ifdef HAS_NORMAL_TEXTURE
vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec2 uv, vec3 mapN) {
    float fNormalLength = length(mapN);
    if(fNormalLength < 0.5) {
        return surf_norm;
    }
    mapN = mapN * 2.0 - 1.0;
    vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
    vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
    vec2 st0 = dFdx( uv.st );
    vec2 st1 = dFdy( uv.st );
    float scale = sign( st1.t * st0.s - st0.t * st1.s );
    vec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );
    vec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );
    vec3 N = normalize( surf_norm );
    mat3 tsn = mat3( S, T, N );
    mapN.xy *= uNormalTextureScale;
    mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );
    return normalize( tsn * mapN );
}
#endif

#include <cubeUV_reflection>

vec3 inverseTransformDirection( in vec3 dir ) {
    mat3 fixedToENU = mat3(czm_modelView[0][0], czm_modelView[1][0], czm_modelView[2][0], czm_modelView[0][1], czm_modelView[1][1], czm_modelView[2][1], czm_modelView[0][2], czm_modelView[1][2], czm_modelView[2][2]);
    const mat3 yUpToZUp = mat3(1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0);
    return normalize( yUpToZUp * fixedToENU * dir );
}

void indirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
    reflectedLight.indirectDiffuse += irradiance * lambertianDiffuse( material.diffuseColor );
}

vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
    float dotNV = saturate( dot( normal, viewDir ) );
    const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
    const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
    vec4 r = roughness * c0 + c1;
    float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
    vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
    return fab;
}

void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
    vec2 fab = DFGApprox( normal, viewDir, roughness );
    vec3 Fr = specularColor;
    vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
    float Ess = fab.x + fab.y;
    float Ems = 1.0 - Ess;
    vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;
    vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
    singleScatter += FssEss;
    multiScatter += Fms * Ems;
}

void indirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
    vec3 singleScattering = vec3( 0.0 );
    vec3 multiScattering = vec3( 0.0 );
    vec3 cosineWeightedIrradiance = irradiance;
    computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
    vec3 totalScattering = singleScattering + multiScattering;
    vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
    reflectedLight.indirectSpecular += radiance * singleScattering;
    reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
    reflectedLight.indirectSpecular = (uCameraReflect * 0.5 + 0.5) * reflectedLight.indirectSpecular;   // \u7C97\u7CD9\u5EA6\u503C\u504F\u5C0F\u4F7F\u8BA1\u7B97\u51FA\u7684\u73AF\u5883\u56FE\u9AD8\u5149\u503C\u504F\u5927\u5BFC\u81F4\u6C34\u9762\u53CD\u5C04\u7684\u6A21\u578B\u6CDB\u767D,\u6545\u6C34\u9762\u53CD\u5C04\u65F6\u4E0D\u8BA1\u7B97\u73AF\u5883\u56FE\u7684\u9AD8\u5149
    reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}

vec3 getIBLIrradiance( const in vec3 normal ) {
    vec3 worldNormal = inverseTransformDirection( normal );
    vec4 envMapColor = textureCubeUV( czm_hdrEnvMap, worldNormal, 1.0 );
    return envMapColor.rgb;
}

vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
    vec3 reflectVec = reflect( - viewDir, normal );
    reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
    reflectVec = inverseTransformDirection( reflectVec );
    vec4 envMapColor = textureCubeUV( czm_hdrEnvMap, reflectVec, roughness );
    return envMapColor.rgb;
}

float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
    return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}

uniform float uPbrParTextureWidth;
void calculateMipLevel(in vec2 inTexCoord, in vec2 vecTile, in float fMaxMip, inout float mipLevel)
{
	vec2 dx = dFdx(inTexCoord * vecTile.x);
	vec2 dy = dFdy(inTexCoord * vecTile.y);
	float dotX = dot(dx, dx);
	float dotY = dot(dy, dy);
	float dMax = max(dotX, dotY);
	float dMin = min(dotX, dotY);
	float offset = (dMax - dMin) / (dMax + dMin);
	offset = clamp(offset, 0.0, 1.0);
	float d = dMax * (1.0 - offset) + dMin * offset;
	mipLevel = 0.5 * log2(d);
	mipLevel = clamp(mipLevel, 0.0, fMaxMip - 1.62);
}

vec3 getTexcoordAndMipmapLevel(vec2 uv, vec4 texMatrix, float texCoordZ) {
    vec2 translate = texMatrix.xy;
    float textureWidth = texMatrix.z * uPbrParTextureWidth;
    float scale = texMatrix.z;
    float maxMipmapLevel = texMatrix.w;
    float mipLevel = 0.0;
        calculateMipLevel(uv, vec2(textureWidth), maxMipmapLevel, mipLevel);
    vec2 texCoord;
    if(texCoordZ < -9000.0)
    {
        texCoord = vec2(uv.x, uv.y);
    }
    else
    {
        texCoord = fract(uv);
        float offset = pow(2.0, mipLevel) / textureWidth;
        texCoord = clamp(texCoord, offset, 1.0 - offset);
        texCoord.x = (texCoord.x + translate.x) * scale;
        texCoord.y = (texCoord.y + translate.y) * scale;
    }
    
    return vec3(texCoord.xy, mipLevel);
}

vec4 brdf(in vec4 baseColorWithAlpha, vec2 texCoord, vec2 oriTexCoord, vec3 posEC, vec3 posMC, vec3 vertexNormalEC, vec4 sunLightColor, float sunLightON) {
    vec2 uv = oriTexCoord;
    float mipmapLevel = 0.0;
#ifdef USE_BatchPBR
    vec3 uvAndMiplevel = getTexcoordAndMipmapLevel(oriTexCoord, vTexMatrix, vTexCoordZ.x);
    uv = uvAndMiplevel.xy;
    mipmapLevel = uvAndMiplevel.z;
#endif
    baseColorWithAlpha = baseColorWithAlpha * uBaseColorFactor;
#ifdef BaseColorReplace
    baseColorWithAlpha = uBaseColorFactor;
#endif
    //float faceDirection = (gl_FrontFacing ? 1.0 : - 1.0) * uCameraReflect;
    vec3 ng = normalize(vertexNormalEC);
    #ifndef HAS_NORMAL
        ng = normalize(czm_normal * czm_computeNormal(posMC.xyz));
    #else
        float faceDirection = (dot(ng, -normalize(posEC)) < 0.0 ? -1.0 : 1.0) * uCameraReflect;
        ng = ng * faceDirection;
    #endif
    
#ifdef HAS_BASE_TEXTURE
    #ifdef USE_BatchPBR
        baseColorWithAlpha *= sRGBToLinear(texture2DLodEXT(uBaseTexture, uv * uTexUVOffset.zw + uTexUVOffset.xy, mipmapLevel));
    #else
        baseColorWithAlpha = sRGBToLinear(texture2D(uBaseTexture, oriTexCoord * uTexUVOffset.zw + uTexUVOffset.xy)) * uBaseColorFactor * vColor;
    #endif
#endif
#ifdef HAS_NORMAL_TEXTURE
    #ifdef USE_BatchPBR
        vec3 mapN = texture2DLodEXT( uNormalTexture, uv, mipmapLevel).xyz;
    #else
        vec3 mapN = texture2D( uNormalTexture, uv).xyz;
    #endif
    vec3 n = perturbNormal2Arb(posEC, ng, oriTexCoord, mapN);
#ifdef HAS_ANISOTROPY
    float anisotropy = uAnisotropy.b;
    vec3 anisotropyDirection = vec3(uAnisotropy.xy, 0.0);
    vec3 anisotropicTangent = normalize(tbn * anisotropyDirection);
    vec3 anisotropicBitangent = normalize(cross(tbn[2], anisotropicTangent));
    n = getAnisotropicBentNormals(anisotropicTangent, anisotropicBitangent, n, v, anisotropy);
#endif
#else
    vec3 n = ng;
#endif
#ifdef HAS_WETNESS
    mat3 fixedToENU_wetness = mat3(czm_modelView[0][0], czm_modelView[1][0], czm_modelView[2][0], czm_modelView[0][1], czm_modelView[1][1], czm_modelView[2][1], czm_modelView[0][2], czm_modelView[1][2], czm_modelView[2][2]);
    vec3 normalWS_wetness = normalize(fixedToENU_wetness * n);
#endif
#ifdef HAS_RAIN
    n = rippleGenerator(uRippleTexture,uAnimationSpeed,normalWS_wetness,uWetnessFactor);
#endif
    vec3 baseColor = baseColorWithAlpha.rgb;
    float roughness = uRoughnessFactor;
    float metalness = uMetallicFactor;
    vec4 emissiveFactor = uEmissiveFactor;
    vec2 emissiveTexCoord = texCoord.xy;
#ifdef PBR_THEME
    int pbrIndex = int(vPBRIndex);
    if(vPBRIndex < 0.0)
    {
        return baseColorWithAlpha;
    }
    mat4 pbrPar = mat4(0.0);
    for(int i = 0;i < NUM_PBR_MATERIALS;i++)
    {
        if(i == pbrIndex)
        {
            pbrPar = uPBRMaterials[i];
            break;
        }
    }
    roughness = clamp(pbrPar[0][0], 0.04, 1.0);
    metalness = clamp(pbrPar[0][1], 0.0, 1.0);
    baseColor = (baseColorWithAlpha / uBaseColorFactor * vec4(pbrPar[0][2], pbrPar[0][3], pbrPar[1][0], pbrPar[1][1])).rgb;
#endif
#ifdef USE_BatchPBR
    metalness = vMetallicRoughness.x;
    roughness = vMetallicRoughness.y;
    emissiveFactor = vEmissiveFactor;
    emissiveTexCoord = texCoord.xy;
#endif
    metalness = clamp(metalness, 0.0, 1.0);
    roughness = clamp(roughness, 0.0, 1.0);
    
#ifdef HAS_MetallicRoughness_TEXTURE
    #ifdef USE_BatchPBR
        vec3 metallicRoughness = texture2DLodEXT(uMetallicRoughnessTexture, uv, mipmapLevel).rgb;
    #else
        vec3 metallicRoughness = texture2D(uMetallicRoughnessTexture, oriTexCoord).rgb;
    #endif
    metalness = clamp(metalness * metallicRoughness.r, 0.0, 1.0);
    roughness = clamp(roughness * metallicRoughness.g, 0.04, 1.0);
#ifdef HAS_WETNESS
    float fWetness = clamp(uWetnessFactor,0.0,1.0);
    float fWetness_correction = pow(4.0*fWetness,2.0);
    fWetness_correction = clamp(fWetness_correction,clamp(fWetness,0.0,0.9),1.0);
    float fWerness_normalized = fWetness_correction * clamp(normalWS_wetness.z + 0.85,0.0,1.0);
    baseColor = mix(baseColor,baseColor*0.7,fWerness_normalized);
    roughness = mix(roughness,0.05,fWerness_normalized);
#endif
#ifdef HAS_SNOW
    mat3 fixedToENU_snow = mat3(czm_modelView[0][0], czm_modelView[1][0], czm_modelView[2][0], czm_modelView[0][1], czm_modelView[1][1], czm_modelView[2][1], czm_modelView[0][2], czm_modelView[1][2], czm_modelView[2][2]);
    vec3 normalWS_snow = normalize(fixedToENU_snow * n);
    snowGenerator(uSnowMaskTexture,uSnowNormalTexture, oriTexCoord,uSnowCoverageFactor,normalWS_snow,baseColor,roughness);
#endif
#endif

    vec3 lightColorHdr = vec3(2.0) * uSunLightON;   // \u592A\u9633\u5149
    vec3 l = normalize(czm_lightDirectionEC);
    vec3 v = -normalize(posEC);
    vec3 h = normalize(v + l);
    vec3 f0 = vec3(0.04);
    vec3 diffuseColor = baseColor * (1.0 - metalness) * (1.0 - f0);
    vec3 specularColor = mix(f0, baseColor, metalness);
    
    float alpha = roughness * roughness;
    float dotNL = clamp( dot( n, l ), 0.001, 1.0 );
    float dotNV = abs( dot( n, v ) ) + 0.001;
    float dotNH = saturate( dot( n, h ) );
    float dotLH = saturate( dot( l, h ) );
    float dotVH = saturate( dot( v, h ) );
    float reflectance = max(max(specularColor.r, specularColor.g), specularColor.b);
    float f90 = clamp(reflectance * 25.0, 0.0, 1.0);
    vec3 F = F_Schlick( specularColor, f90, dotVH );
    float G = GeometrySchlickGGX(alpha, dotNV) * GeometrySchlickGGX(alpha, dotNL);
    float D = D_GGX( alpha, dotNH );
    vec3 diffuseContribution = (1.0 - F) * lambertianDiffuse(diffuseColor);
    vec3 specularContribution = F * G * D / (4.0 * dotNL * dotNV);
    
    vec3 geometryNormal = ng;
    PhysicalMaterial material;
    material.diffuseColor = diffuseColor;
    vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
    float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
    material.roughness = max( roughness, 0.0525 );
    material.roughness += geometryRoughness;
    material.roughness = min( material.roughness, 1.0 );
    material.specularColor = specularColor;
    material.specularF90 = 1.0;
    
    GeometricContext geometry;
    geometry.position = posEC;
    geometry.normal = n;
    geometry.viewDir = v;
    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
    reflectedLight.directDiffuse += dotNL * lightColorHdr * diffuseContribution;
    reflectedLight.directSpecular += dotNL * lightColorHdr * specularContribution;
    
    IncidentLight directLight; 
    #include <lightSourceImpl>
    
    vec3 irradiance = vec3(0.0);
    vec3 radiance = vec3(0.0);
  
#ifdef HAS_HEMISPHERE_LIGHTS
    HemisphereLight hemiLight;
    hemiLight.skyColor = uSkyColor[0];
    hemiLight.groundColor = uGroundColor[0];
    hemiLight.direction = normalize(czm_normal * vec3(0.0, 0.0, 1.0));
    irradiance += getHemisphereLightIrradiance( hemiLight, geometry );
#endif

#ifdef IBL

#ifdef KtxEnvMap
    mat3 fixedToENU = mat3(czm_modelView[0][0], czm_modelView[1][0], czm_modelView[2][0], czm_modelView[0][1], czm_modelView[1][1], czm_modelView[2][1], czm_modelView[0][2], czm_modelView[1][2], czm_modelView[2][2]);
    const mat3 yUpToZUp = mat3(-1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0);
    vec3 cubeDir = normalize( yUpToZUp * fixedToENU * reflect(-v, n) );
    vec3 worldNormal = normalize( yUpToZUp * fixedToENU * n );
    irradiance += czm_sphericalHarmonics(worldNormal, czm_sphericalHarmonicCoefficients);
    radiance += czm_sampleOctahedralProjection(czm_specularEnvironmentMaps, czm_specularEnvironmentMapSize, cubeDir,  roughness * czm_specularEnvironmentMapsMaximumLOD, czm_specularEnvironmentMapsMaximumLOD);
#else
    irradiance += getIBLIrradiance( geometry.normal );
    radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
#endif
    
#else
    vec3 positionWC = vec3(czm_inverseView * vec4(posEC, 1.0));
    vec3 r = normalize(czm_inverseViewRotation * normalize(reflect(v, n)));
    float vertexRadius = length(positionWC);
    float horizonDotNadir = 1.0 - min(1.0, czm_ellipsoidRadii.x / vertexRadius);
    float reflectionDotNadir = dot(r, normalize(positionWC));
    r.x = -r.x;
    r = -normalize(czm_temeToPseudoFixed * r);
    r.x = -r.x;
    float inverseRoughness = 1.04 - roughness;
    inverseRoughness *= inverseRoughness;
    vec3 sceneSkyBox = textureCube(czm_environmentMap, r).rgb * inverseRoughness;
    float atmosphereHeight = 0.05;
    float blendRegionSize = 0.1 * ((1.0 - inverseRoughness) * 8.0 + 1.1 - horizonDotNadir);
    float blendRegionOffset = roughness * -1.0;
    float farAboveHorizon = clamp(horizonDotNadir - blendRegionSize * 0.5 + blendRegionOffset, 1.0e-10 - blendRegionSize, 0.99999);
    float aroundHorizon = clamp(horizonDotNadir + blendRegionSize * 0.5, 1.0e-10 - blendRegionSize, 0.99999);
    float farBelowHorizon = clamp(horizonDotNadir + blendRegionSize * 1.5, 1.0e-10 - blendRegionSize, 0.99999);
    float smoothstepHeight = smoothstep(0.0, atmosphereHeight, horizonDotNadir);
    vec3 belowHorizonColor = mix(vec3(0.1, 0.15, 0.25), vec3(0.4, 0.7, 0.9), smoothstepHeight);
    vec3 nadirColor = belowHorizonColor * 0.5;
    vec3 aboveHorizonColor = mix(vec3(0.9, 1.0, 1.2), belowHorizonColor, roughness * 0.5);
    vec3 blueSkyColor = mix(vec3(0.18, 0.26, 0.48), aboveHorizonColor, reflectionDotNadir * inverseRoughness * 0.5 + 0.75);
    vec3 zenithColor = mix(blueSkyColor, sceneSkyBox, smoothstepHeight);
    vec3 blueSkyDiffuseColor = vec3(0.7, 0.85, 0.9);
    float diffuseIrradianceFromEarth = (1.0 - horizonDotNadir) * (reflectionDotNadir * 0.25 + 0.75) * smoothstepHeight;
    float diffuseIrradianceFromSky = (1.0 - smoothstepHeight) * (1.0 - (reflectionDotNadir * 0.25 + 0.25));
    vec3 diffuseIrradiance = blueSkyDiffuseColor * clamp(diffuseIrradianceFromEarth + diffuseIrradianceFromSky, 0.0, 1.0);
    float notDistantRough = (1.0 - horizonDotNadir * roughness * 0.8);
    vec3 specularIrradiance = mix(zenithColor, aboveHorizonColor, smoothstep(farAboveHorizon, aroundHorizon, reflectionDotNadir) * notDistantRough);
    specularIrradiance = mix(specularIrradiance, belowHorizonColor, smoothstep(aroundHorizon, farBelowHorizon, reflectionDotNadir) * inverseRoughness);
    specularIrradiance = mix(specularIrradiance, nadirColor, smoothstep(farBelowHorizon, 1.0, reflectionDotNadir) * inverseRoughness);
    
    float LdotZenith = clamp(dot(normalize(czm_inverseViewRotation * czm_sunDirectionEC), normalize(positionWC * -1.0)), 0.001, 1.0);
    float S = acos(LdotZenith);
    float NdotZenith = clamp(dot(normalize(czm_inverseViewRotation * n), normalize(positionWC * -1.0)), 0.001, 1.0);
    float sunNdotL = clamp(dot(n, czm_sunDirectionEC), 0.001, 1.0);
    float gamma = acos(sunNdotL);
    float numerator = ((0.91 + 10.0 * exp(-3.0 * gamma) + 0.45 * pow(sunNdotL, 2.0)) * (1.0 - exp(-0.32 / NdotZenith)));
    float denominator = (0.91 + 10.0 * exp(-3.0 * S) + 0.45 * pow(LdotZenith,2.0)) * (1.0 - exp(-0.32));
    float luminance = 0.2 * (numerator / denominator);
    irradiance += diffuseIrradiance * luminance;
    radiance += specularIrradiance * luminance;
#endif
    irradiance *= uEnvMapIntensity;
    radiance *= uEnvMapIntensity;

    indirectSpecular_Physical(radiance, irradiance, geometry, material, reflectedLight);

#ifdef HAS_OCCLUSION_TEXTURE
    #ifdef USE_BatchPBR
        float ambientOcclusion = texture2DLodEXT(uOcclusionTexture, uv, mipmapLevel).r;
    #else
        float ambientOcclusion = texture2D(uOcclusionTexture, oriTexCoord.xy).r;
    #endif
    reflectedLight.indirectDiffuse *= ambientOcclusion;
#ifdef IBL
    reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
#endif
#endif

vec3 color = reflectedLight.directDiffuse + reflectedLight.directSpecular + reflectedLight.indirectDiffuse + reflectedLight.indirectSpecular;

#ifdef HAS_EMISSIVE_TEXTURE
    emissiveTexCoord = emissiveTexCoord * uEmissiveUVOffsetAndTiling.zw + uEmissiveUVOffsetAndTiling.xy;
    vec3 emissive = texture2D(uEmissionTexture, emissiveTexCoord).rgb;
    emissive *= emissiveFactor.rgb;
    color += emissive;
#else
    color += emissiveFactor.rgb;
#endif

    color = applyTonemapping(color);
    color = LinearTosRGB(color);
    
#ifdef MASK
    if (baseColorWithAlpha.a < uAlphaCutoff)
    {
        discard;
    }
    return vec4(color.rgb, 1.0);
#endif
    return vec4(color.rgb, baseColorWithAlpha.a);
}
#endif
`;var dr=`
    #define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	#ifdef WEBGL2
		#define texture2DGradEXT textureGrad 
	#endif

	// These shader functions convert between the UV coordinates of a single face of
	// a cubemap, the 0-5 integer index of a cube face, and the direction vector for
	// sampling a textureCube (not generally normalized ).

	float getFace( vec3 direction ) {

		vec3 absDirection = abs( direction );

		float face = - 1.0;

		if ( absDirection.x > absDirection.z ) {

			if ( absDirection.x > absDirection.y )

				face = direction.x > 0.0 ? 0.0 : 3.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		} else {

			if ( absDirection.z > absDirection.y )

				face = direction.z > 0.0 ? 2.0 : 5.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		}

		return face;

	}

	// RH coordinate system; PMREM face-indexing convention
	vec2 getUV( vec3 direction, float face ) {

		vec2 uv;

		if ( face == 0.0 ) {

			uv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x

		} else if ( face == 1.0 ) {

			uv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y

		} else if ( face == 2.0 ) {

			uv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z

		} else if ( face == 3.0 ) {

			uv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x

		} else if ( face == 4.0 ) {

			uv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y

		} else {

			uv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z

		}

		return 0.5 * ( uv + 1.0 );

	}

	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {

		float face = getFace( direction );

		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );

		mipInt = max( mipInt, cubeUV_minMipLevel );

		float faceSize = exp2( mipInt );

		vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;

		if ( face > 2.0 ) {

			uv.y += faceSize;

			face -= 3.0;

		}

		uv.x += face * faceSize;

		uv.x += filterInt * 3.0 * cubeUV_minTileSize;

		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );

		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;

		return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb; // disable anisotropic filtering

	}

	// These defines must match with PMREMGenerator

	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0

	float roughnessToMip( float roughness ) {

		float mip = 0.0;

		if ( roughness >= cubeUV_r1 ) {

			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;

		} else if ( roughness >= cubeUV_r4 ) {

			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;

		} else if ( roughness >= cubeUV_r5 ) {

			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;

		} else if ( roughness >= cubeUV_r6 ) {

			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;

		} else {

			mip = - 2.0 * log2( 1.16 * roughness ); // 1.16 = 1.79^0.25
		}

		return mip;

	}

	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {

		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );

		float mipF = fract( mip );

		float mipInt = floor( mip );

		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );

		if ( mipF == 0.0 ) {

			return vec4( color0, 1.0 );

		} else {

			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );

			return vec4( mix( color0, color1, mipF ), 1.0 );

		}

	}
`;var pr=`
#ifdef HAS_MAPBOX_MAP

precision mediump sampler2DArray;

uniform sampler2D u_mapboxIndexTexture;
uniform sampler2D u_innerMapboxIndexTexture;//\u7CBE\u7EC6\u7D22\u5F15\u7EB9\u7406
uniform sampler2D u_relativeBoundsTexture;
uniform sampler2DArray u_mapboxTileTextureArray;

vec2 calUVFromGeoBounds(vec2 geoCoord, vec4 geoBounds) {
    if(geoBounds.z > czm_pi && geoCoord.x < 0.0 ){
        geoCoord.x += czm_twoPi;
    }
    vec2 uv = geoCoord.xy - vec2(geoBounds.x, geoBounds.w);
    uv.x = uv.x / (geoBounds.z - geoBounds.x);
    uv.y = 1.0 - uv.y / (geoBounds.y - geoBounds.w);
    return uv;
}

bool isValidTexCoord(vec2 inUV){
    if(inUV.x < 0.0 || inUV.x > 1.0 || inUV.y < 0.0 || inUV.y > 1.0){
        return false;
    }
    return true;
}

//geoBounds's lng should be [-PI, 2PI]
bool isGeoPosInGeoBounds(vec2 geoTexCoord, vec4 mapboxGeoBounds){
    if(mapboxGeoBounds.z > czm_pi && geoTexCoord.x < 0.0){
        geoTexCoord.x += czm_twoPi;
    } 
   
    return geoTexCoord.x > mapboxGeoBounds.x &&
            geoTexCoord.x < mapboxGeoBounds.z &&
            geoTexCoord.y > mapboxGeoBounds.y &&
            geoTexCoord.y < mapboxGeoBounds.w;
    
}

bool isInInnerIndexTextureGeoBounds(vec2 geoTexCoord, vec4 innerIndexTextureGeoBounds){
    if(innerIndexTextureGeoBounds.x > innerIndexTextureGeoBounds.z || innerIndexTextureGeoBounds.y > innerIndexTextureGeoBounds.w){
        return false;
    }

    return isGeoPosInGeoBounds(geoTexCoord, innerIndexTextureGeoBounds);
}

vec4 calIndexByPointInsideGeoBounds(vec2 geoTexCoord, vec4 mapboxGeoBounds, vec4 innerIndexTextureGeoBounds){
    vec2 indexTextureCoord;
    vec4 indexTextureColor;
    //\u5224\u65AD\u8BE5\u70B9\u662F\u5426\u5728\u7CBE\u7EC6\u7D22\u5F15\u7EB9\u7406\u7684\u8303\u56F4\u5185
    if(isInInnerIndexTextureGeoBounds(geoTexCoord, innerIndexTextureGeoBounds)){
        //\u8BE5\u70B9\u5728\u7CBE\u7EC6\u7D22\u5F15\u7EB9\u7406\u7684\u8303\u56F4\u5185\uFF0C\u4ECE\u7CBE\u7EC6\u7D22\u5F15\u7EB9\u7406\u53D6\u7D22\u5F15
        indexTextureCoord = calUVFromGeoBounds(geoTexCoord, innerIndexTextureGeoBounds);
        indexTextureColor = textureLod(u_innerMapboxIndexTexture, indexTextureCoord, 0.0);
       
        if(indexTextureColor.r == 0.0){
            //\u4ECE\u7CBE\u7EC6\u7D22\u5F15\u7EB9\u7406\u91CC\u53D6\u4E0D\u5230\u7D22\u5F15\uFF0C\u5C31\u4ECE\u4E3B\u7EB9\u7406\u53D6
            indexTextureCoord = calUVFromGeoBounds(geoTexCoord, mapboxGeoBounds);
            indexTextureColor = textureLod(u_mapboxIndexTexture, indexTextureCoord, 0.0);
        }
    }else{
        //\u8BE5\u70B9\u4E0D\u5728\u7CBE\u7EC6\u7D22\u5F15\u7EB9\u7406\u7684\u8303\u56F4\u5185\uFF0C\u4ECE\u4E3B\u7D22\u5F15\u7EB9\u7406\u53D6\u7D22\u5F15
        indexTextureCoord = calUVFromGeoBounds(geoTexCoord, mapboxGeoBounds);
        indexTextureColor = textureLod(u_mapboxIndexTexture, indexTextureCoord, 0.0);
    }
    return indexTextureColor;
}



struct MapboxMapParam {
    vec2 relativeTileBoundsCoord;
    vec4 tileBounds;
    vec4 mapboxGeoBounds;
    vec4 innerMapboxGeoBounds; //\u7CBE\u7EC6\u7D22\u5F15\u7EB9\u7406\u7684\u5730\u7406\u8303\u56F4
    float mapboxAlpha;
};

vec4 getMapboxMapColor(vec4 inColor, MapboxMapParam param){
    // \u8BA1\u7B97\u5F53\u524D\u70B9\u7684\u5730\u7406\u5750\u6807
    vec2 geoTexCoord = param.relativeTileBoundsCoord.xy;
    geoTexCoord.x = geoTexCoord.x * (param.tileBounds.z - param.tileBounds.x) + param.tileBounds.x;
    geoTexCoord.y = geoTexCoord.y * (param.tileBounds.w - param.tileBounds.y) + param.tileBounds.y;
    // \u5224\u65AD\u662F\u5426\u5728mapbox\u5730\u56FE\u8986\u76D6\u7684\u5730\u7406\u8303\u56F4\u5185
    if(isGeoPosInGeoBounds(geoTexCoord, param.mapboxGeoBounds))
        {
            // \u8BA1\u7B97\u5728mapbox\u7D22\u5F15\u7EB9\u7406\u4E0A\u7684\u5750\u6807\u5E76\u83B7\u5F97\u5F53\u524D\u70B9\u5728mapbox\u7684tile\u7684\u7EB9\u7406\u6570\u7EC4\u4E2D\u7684\u7D22\u5F15\u53F7
            vec4 indexTextureColor = calIndexByPointInsideGeoBounds(geoTexCoord, param.mapboxGeoBounds, param.innerMapboxGeoBounds);
            if(indexTextureColor.r > 0.0)
            {
                float textureIndex = floor(indexTextureColor.r);
                // \u8BA1\u7B97\u5F53\u524D\u70B9\u5728mapbox\u7684tile\u7EB9\u7406\u4E2D\u7684\u5750\u6807\u5E76\u83B7\u53D6\u6700\u7EC8\u989C\u8272
                vec4 mapboxTileRelativeBounds = texelFetch(u_relativeBoundsTexture, ivec2(textureIndex , 0), 0);
                vec2 mapboxTileTextureCoord = (param.relativeTileBoundsCoord.xy - mapboxTileRelativeBounds.rg) / mapboxTileRelativeBounds.ba;

                if(!isValidTexCoord(mapboxTileTextureCoord)){
                    for(int i = 0; i < MAXBOX_TILE_TEXTURE_SIZE; i++){
                        mapboxTileRelativeBounds = texelFetch(u_relativeBoundsTexture, ivec2(i , 0), 0);
                        mapboxTileTextureCoord = (param.relativeTileBoundsCoord.xy - mapboxTileRelativeBounds.rg) / mapboxTileRelativeBounds.ba;
                        if(isValidTexCoord(mapboxTileTextureCoord)){
                            textureIndex = float(i);
                            break;
                        }
                    }
                }
                // return vec4(1.0, .0, 0., 0.5);
#ifdef WEBGPU
                vec4 mapboxColor = textureLod(u_mapboxTileTextureArray, vec3(mapboxTileTextureCoord, textureIndex), 0.0);
#else

                vec4 mapboxColor = texture(u_mapboxTileTextureArray, vec3(mapboxTileTextureCoord, textureIndex));
#endif
                if(mapboxColor.a < 0.001){
                    return inColor;
                }
                vec4 blendColor = inColor;
                float finalApha = param.mapboxAlpha * mapboxColor.a;
                blendColor.rgb = mapboxColor.rgb * param.mapboxAlpha + inColor.rgb * (1.0 -finalApha);
                return blendColor;
            }
    }
    return inColor;
}
#endif


`;var vr=`
    varying vec2 v_clippingPosition;
    flat varying int v_regionIndex;
    uniform highp sampler2D u_clippingExtentsTexture;
    uniform highp int uClippingPolygonRegionsLength;
    vec2 getLookupUv(vec2 dimensions, int i) {
        int pixY = i / int(dimensions.x);
        int pixX = i - (pixY * int(dimensions.x));
        float pixelWidth = 1.0 / dimensions.x;
        float pixelHeight = 1.0 / dimensions.y;
        float u = (float(pixX) + 0.5) * pixelWidth; // sample from center of pixel
        float v = (float(pixY) + 0.5) * pixelHeight;
        return vec2(u, v);
    }

    vec4 unpackClippingExtents(highp sampler2D extentsTexture, int index) {
        vec2 textureDimensions = vec2(textureSize(extentsTexture, 0));
        return texture(extentsTexture, getLookupUv(textureDimensions, index));
    }

    void calcClipRegionIndexAndUV(vec3 positionWC) {
        #ifdef SCENE3D
            vec2 sphericalLatLong = czm_approximateSphericalCoordinates(positionWC);
        #else
            vec2 sphericalLatLong = vec2(positionWC.z / 6378137.0, positionWC.y / 6378137.0);
        #endif
        sphericalLatLong.y = czm_branchFreeTernary(sphericalLatLong.y < czm_pi, sphericalLatLong.y, sphericalLatLong.y - czm_twoPi);
    
        vec2 minDistance = vec2(czm_infinity);
        v_regionIndex = -1;
        v_clippingPosition = vec2(czm_infinity);
    
        for (int regionIndex = 0; regionIndex < uClippingPolygonRegionsLength; regionIndex++) {
            vec4 extents = unpackClippingExtents(u_clippingExtentsTexture, regionIndex);
            vec2 rectUv = (sphericalLatLong.yx - extents.yx) * extents.wz;
    
            vec2 clamped = clamp(rectUv, vec2(0.0), vec2(1.0));
            vec2 distance = abs(rectUv - clamped) * extents.wz;
            
            if (minDistance.x > distance.x || minDistance.y > distance.y) {
                minDistance = distance;
                v_clippingPosition = rectUv;
            }
    
            float threshold = 0.01;
            if (rectUv.x > threshold && rectUv.y > threshold && rectUv.x < 1.0 - threshold && rectUv.y < 1.0 - threshold) {
                v_regionIndex = regionIndex;
            }
        }
    }
`;var hr=`
uniform highp sampler2D u_SignedDistanceTexture;
uniform highp sampler2D u_clippingExtentsTexture;
uniform vec2 u_SignedDistanceTextureSize;
uniform highp int uClippingPolygonRegionsLength;
uniform float uExtentsDimension;
varying vec3 v_positionMC;

float getSignedDistance(vec2 uv) {
    float signedDistance = czm_unpackDepth(textureLod(u_SignedDistanceTexture, uv, 0.0));
    return (signedDistance - 0.5) * 2.0;
}

vec2 getLookupUv(vec2 dimensions, int i) {
    int pixY = i / int(dimensions.x);
    int pixX = i - (pixY * int(dimensions.x));
    float pixelWidth = 1.0 / dimensions.x;
    float pixelHeight = 1.0 / dimensions.y;
    float u = (float(pixX) + 0.5) * pixelWidth; // sample from center of pixel
    float v = (float(pixY) + 0.5) * pixelHeight;
    return vec2(u, v);
}

vec4 unpackClippingExtents(int index) {
    vec2 textureDim = vec2(textureSize(u_clippingExtentsTexture, 0));
    return texture(u_clippingExtentsTexture, getLookupUv(textureDim, index));
}

void calcClipRegionIndexAndUV(vec3 positionMC, out vec2 clippingPosition, out int outRegionIndex) {
    vec2 minDistance = vec2(czm_infinity);
    outRegionIndex = -1;
    clippingPosition = vec2(czm_infinity);

    for (int regionIndex = 0; regionIndex < uClippingPolygonRegionsLength; regionIndex++) {
        vec4 extents = unpackClippingExtents(regionIndex);
        vec2 rectUv = (positionMC.xy - extents.xy) * extents.zw;

        vec2 clamped = clamp(rectUv, vec2(0.0), vec2(1.0));
        vec2 distance = abs(rectUv - clamped) * extents.zw;
        
        float threshold = 0.01;
        if (minDistance.x > distance.x || minDistance.y > distance.y) {
            minDistance = distance;
            if (rectUv.x > threshold && rectUv.y > threshold && rectUv.x < 1.0 - threshold && rectUv.y < 1.0 - threshold) {
                outRegionIndex = regionIndex;
                clippingPosition = rectUv;
            }
        }
        
    }
}
    
void clipPolygons() {
    // Position is completely outside of polygons bounds
    vec2 rectUv;
    int regionIndex;
    calcClipRegionIndexAndUV(v_positionMC, rectUv, regionIndex);
    if (regionIndex < 0 || rectUv.x <= 0.0 || rectUv.y <= 0.0 || rectUv.x >= 1.0 || rectUv.y >= 1.0) {
        #ifdef CLIPPING_INVERSE 
            discard;
        #endif
        return;
    }

    vec2 sampleOffset = max(1.0 / u_SignedDistanceTextureSize, vec2(0.005));
    float dimension = uExtentsDimension;

    vec2 textureOffset = vec2(mod(float(regionIndex), dimension), floor(float(regionIndex) / dimension)) / dimension;
    vec2 uv = textureOffset + rectUv / dimension;

    float signedDistance = getSignedDistance(uv);

    #ifdef CLIPPING_INVERSE
    if (signedDistance > 0.0)  {
        discard;
    }
    #else
    if (signedDistance < 0.0)  {
        discard;
    }
    #endif
}
`;var gr=`
#ifdef LOG_DEPTH
varying float v_depthFromNearPlusOne;
#endif
#ifdef POLYGON_OFFSET
uniform vec4 uPolygonOffset;
#endif

void writeLogDepth(float depth)
{
#ifdef LOG_DEPTH
#if defined(GL_EXT_frag_depth) || defined(WEBGL2)
    if (depth <= 0.9999999 || depth > czm_farDepthFromNearPlusOne) {
        discard;
    }
#ifdef POLYGON_OFFSET
    float factor = uPolygonOffset.z;
    float units = uPolygonOffset.w;

#if defined(GL_OES_standard_derivatives) || defined(WEBGL2)
    float x = dFdx(depth);
    float y = dFdy(depth);
    float m = sqrt(x * x + y * y);
    depth += m * factor;
#endif

#endif

    gl_FragDepthEXT = log2(depth) * czm_oneOverLog2FarDepthFromNearPlusOne;
#ifdef POLYGON_OFFSET
    gl_FragDepthEXT += czm_epsilon7 * units;
#endif

#endif
#endif
}

`;var Zi={rainDecl:ir,snowDecl:ar,hemisphereLightDecl:lr,pointLightDecl:cr,spotLightDecl:sr,directionLightDecl:fr,lightSourceImpl:ur,brdf:mr,cubeUV_reflection:dr,getMapboxColor:pr,clipPolygonsVS:vr,clipPolygonsFS:hr,writeLogDepthDecl:gr},_r=Zi;function xr(e){return e=e.replace(/\/\/.*/g,""),e.replace(/\/\*\*[\s\S]*?\*\//gm,function(n){for(var t=n.match(/\n/gm).length,o="",r=0;r<t;++r)o+=`
`;return o})}function Cr(e,n,t){for(var o,r=0;r<t.length;++r)t[r].name===e&&(o=t[r]);return u(o)||(n=xr(n),o={name:e,glslSource:n,dependsOn:[],requiredBy:[],evaluated:!1},t.push(o)),o}function Tr(e,n){if(!e.evaluated){e.evaluated=!0;var t=e.glslSource.match(/\bczm_[a-zA-Z0-9_]*/g);u(t)&&t!==null&&(t=t.filter(function(o,r){return t.indexOf(o)===r}),t.forEach(function(o){if(o!==e.name&&I._czmBuiltinsAndUniforms.hasOwnProperty(o)){var r=Cr(o,I._czmBuiltinsAndUniforms[o],n);e.dependsOn.push(r),r.requiredBy.push(e),Tr(r,n)}}))}}function Ki(e){for(var n=[],t=[];e.length>0;){var o=e.pop();t.push(o),o.requiredBy.length===0&&n.push(o)}for(;n.length>0;){var r=n.shift();e.push(r);for(var i=0;i<r.dependsOn.length;++i){var l=r.dependsOn[i],m=l.requiredBy.indexOf(r);l.requiredBy.splice(m,1),l.requiredBy.length===0&&n.push(l)}}for(var f=[],v=0;v<t.length;++v)t[v].requiredBy.length!==0&&f.push(t[v]);if(f.length!==0){for(var p=`A circular dependency was found in the following built-in functions/structs/constants: 
`,s=0;s<f.length;++s)p=p+f[s].name+`
`;throw new x(p)}}function Qi(e,n,t){var o=[],r=Cr("main",n,o);Tr(r,o),Ki(o);for(var i="",l=o.length-1;l>=0;--l)yr(t,e)&&(o[l].glslSource=Xe.removeUnuseMacroCode(t,e,o[l].glslSource)),i=i+o[l].glslSource+`
`;return i.replace(r.glslSource,"")}function yr(e,n){return!(!u(e)||!u(n)||!e.shaderPreprocess)}function zr(e){var n=/^[ \t]*#include +<([\w\d./]+)>/gm;function t(o,r){var i=_r[r];if(i===void 0)throw new Error("Can not resolve #include <"+r+">");return zr(i)}return e.replace(n,t)}function br(e,n,t){var o,r,i="",l=e.sources;if(u(l))for(o=0,r=l.length;o<r;++o)i+=`
#line 0
`+l[o];i=xr(i);var m;i=i.replace(/#version\s+(.*?)\n/gm,function(y,S){if(u(m)&&m!==S)throw new x("inconsistent versions found: "+m+" and "+S);return m=S,`
`});var f=[];i=i.replace(/#extension.*\n/gm,function(y){return f.push(y),`
`}),i=i.replace(/precision\s(lowp|mediump|highp)\s(float|int);/,"");var v=e.pickColorQualifier;u(v)&&(i=I.createPickFragmentShaderSource(i,v));var p="";u(m)&&(p="#version "+m+`
`);var s=f.length;for(o=0;o<s;o++)p+=f[o];n&&(p+=`#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

`);var d=e.defines;if(u(d))for(o=0,r=d.length;o<r;++o){var g=d[o];g.length!==0&&(p+="#define "+g+`
`)}if(t.webgl2&&(p+=`#define OUTPUT_DECLARATION

`,p+=`#define WEBGL2

`,p+=`#define texture2DLodEXT textureLod

`,p+=`#define texture2DGradEXT textureGrad

`),i=zr(i),t.textureFloatLinear&&(p+=`#define OES_texture_float_linear

`),yr(t,e)&&(i=Xe.removeUnuseMacroCode(t,e,i)),e.includeBuiltIns){var C=Qi(e,i,t);for(f.length=0,C=C.replace(/#extension.*\n/gm,function(y){return f.push(y),`
`}),s=f.length,o=0;o<s;o++)p=f[o]+p;p+=C}return p+=`
#line 0
`,p+=i,t.webgl2&&(p=gn(p,n,!0)),p}function I(e){e=h(e,h.EMPTY_OBJECT);var n=e.pickColorQualifier;if(u(n)&&n!=="uniform"&&n!=="varying")throw new x("options.pickColorQualifier must be 'uniform' or 'varying'.");this.defines=u(e.defines)?e.defines.slice(0):[],this.sources=u(e.sources)?e.sources.slice(0):[],this.pickColorQualifier=n,this.includeBuiltIns=h(e.includeBuiltIns,!0),this.name=u(e.name)?e.name:void 0}I.prototype.clone=function(){return new I({sources:this.sources,defines:this.defines,name:this.name,pickColorQualifier:this.pickColorQualifier,includeBuiltIns:this.includeBuiltIns})};I.replaceMain=function(e,n){return n="void "+n+"()",e.replace(/void\s+main\s*\(\s*(?:void)?\s*\)/g,n)};I.prototype.getCacheKey=function(e){let t=this.defines.slice().sort().join(","),o=this.pickColorQualifier||"",r=this.includeBuiltIns,i=this.sources.join(`
`);return`${t}:${o}:${i}`};I.prototype.createCombinedVertexShader=function(e){return br(this,!1,e)};I.prototype.createCombinedFragmentShader=function(e){return br(this,!0,e)};I._czmBuiltinsAndUniforms={};for(Me in Re)Re.hasOwnProperty(Me)&&(I._czmBuiltinsAndUniforms[Me]=Re[Me]);var Me;for(Ee in Ce)Ce.hasOwnProperty(Ee)&&(Ye=Ce[Ee],typeof Ye.getDeclaration=="function"&&(I._czmBuiltinsAndUniforms[Ee]=Ye.getDeclaration(Ee)));var Ye,Ee;I.createPickVertexShaderSource=function(e){var n=I.replaceMain(e,"czm_old_main"),t=`attribute vec4 pickColor; 
varying vec4 czm_pickColor; 
void main() 
{ 
    czm_old_main(); 
    czm_pickColor = pickColor; 
}`;return n+`
`+t};I.createPickFragmentShaderSource=function(e,n){var t=I.replaceMain(e,"czm_old_main"),o=n+` vec4 czm_pickColor; 
void main() 
{ 
    czm_old_main(); 
    if (gl_FragColor.a == 0.0) { 
       discard; 
    } 
    gl_FragColor = czm_pickColor; 
}`;return t+`
`+o};I.findVarying=function(e,n){for(var t=e.sources,o=n.length,r=0;r<o;++r)for(var i=n[r],l=t.length,m=0;m<l;++m)if(t[m].indexOf(i)!==-1)return i};var Ji=["v_normalEC","v_normal","aNormal"];I.findNormalVarying=function(e){return I.findVarying(e,Ji)};var $i=["v_positionEC"];I.findPositionVarying=function(e){return I.findVarying(e,$i)};var je=I;function ea(e,n,t,o){switch(n.type){case e.FLOAT:return new wr(e,n,t,o);case e.FLOAT_VEC2:return new Lr(e,n,t,o);case e.FLOAT_VEC3:return new Sr(e,n,t,o);case e.FLOAT_VEC4:return new Er(e,n,t,o);case e.SAMPLER_2D:case e.SAMPLER_CUBE:return new Ze(e,n,t,o);case e.SAMPLER_2D_ARRAY:case e.SAMPLER_3D:return new Ke(e,n,t,o);case e.INT:case e.BOOL:return new Ar(e,n,t,o);case e.INT_VEC2:case e.BOOL_VEC2:return new Dr(e,n,t,o);case e.INT_VEC3:case e.BOOL_VEC3:return new Or(e,n,t,o);case e.INT_VEC4:case e.BOOL_VEC4:return new Ir(e,n,t,o);case e.FLOAT_MAT2:return new Rr(e,n,t,o);case e.FLOAT_MAT3:return new Mr(e,n,t,o);case e.FLOAT_MAT4:return new Pr(e,n,t,o);default:throw new ne("Unrecognized uniform type: "+n.type+' for uniform "'+t+'".')}}function wr(e,n,t,o){this.name=t,this.value=void 0,this._value=0,this._gl=e,this._location=o}wr.prototype.set=function(){this.value!==this._value&&(this._value=this.value,this._gl.uniform1f(this._location,this.value))};function Lr(e,n,t,o){this.name=t,this.value=void 0,this._value=new A,this._gl=e,this._location=o}Lr.prototype.set=function(){var e=this.value;A.equals(e,this._value)||(A.clone(e,this._value),this._gl.uniform2f(this._location,e.x,e.y))};function Sr(e,n,t,o){this.name=t,this.value=void 0,this._value=void 0,this._gl=e,this._location=o}Sr.prototype.set=function(){var e=this.value;if(u(e.red))J.equals(e,this._value)||(this._value=J.clone(e,this._value),this._gl.uniform3f(this._location,e.red,e.green,e.blue));else if(u(e.x))a.equals(e,this._value)||(this._value=a.clone(e,this._value),this._gl.uniform3f(this._location,e.x,e.y,e.z));else throw new x('Invalid vec3 value for uniform "'+this.name+'".')};function Er(e,n,t,o){this.name=t,this.value=void 0,this._value=void 0,this._gl=e,this._location=o}Er.prototype.set=function(){var e=this.value;if(u(e.red))J.equals(e,this._value)||(this._value=J.clone(e,this._value),this._gl.uniform4f(this._location,e.red,e.green,e.blue,e.alpha));else if(u(e.x))H.equals(e,this._value)||(this._value=H.clone(e,this._value),this._gl.uniform4f(this._location,e.x,e.y,e.z,e.w));else throw new x('Invalid vec4 value for uniform "'+this.name+'".')};function Ze(e,n,t,o){this.name=t,this.value=void 0,this._gl=e,this._location=o,this.textureUnitIndex=void 0}Ze.prototype.set=function(){var e=this._gl;e.activeTexture(e.TEXTURE0+this.textureUnitIndex);var n=this.value;e.bindTexture(n._target,n._texture)};Ze.prototype._setSampler=function(e){return this.textureUnitIndex=e,this._gl.uniform1i(this._location,e),e+1};function Ke(e,n,t,o){this.name=t,this.value=void 0,this._gl=e,this._location=o,this.textureUnitIndex=void 0}Ke.prototype.set=function(){var e=this.value,n=this._gl;n.activeTexture(n.TEXTURE0+this.textureUnitIndex),n.bindTexture(e._target,e._texture)};Ke.prototype._setSampler=function(e){return this.textureUnitIndex=e,this._gl.uniform1i(this._location,e),e+1};function Ar(e,n,t,o){this.name=t,this.value=void 0,this._value=0,this._gl=e,this._location=o}Ar.prototype.set=function(){this.value!==this._value&&(this._value=this.value,this._gl.uniform1i(this._location,this.value))};function Dr(e,n,t,o){this.name=t,this.value=void 0,this._value=new A,this._gl=e,this._location=o}Dr.prototype.set=function(){var e=this.value;A.equals(e,this._value)||(A.clone(e,this._value),this._gl.uniform2i(this._location,e.x,e.y))};function Or(e,n,t,o){this.name=t,this.value=void 0,this._value=new a,this._gl=e,this._location=o}Or.prototype.set=function(){var e=this.value;a.equals(e,this._value)||(a.clone(e,this._value),this._gl.uniform3i(this._location,e.x,e.y,e.z))};function Ir(e,n,t,o){this.name=t,this.value=void 0,this._value=new H,this._gl=e,this._location=o}Ir.prototype.set=function(){var e=this.value;H.equals(e,this._value)||(H.clone(e,this._value),this._gl.uniform4i(this._location,e.x,e.y,e.z,e.w))};var na=new Float32Array(4);function Rr(e,n,t,o){this.name=t,this.value=void 0,this._value=new se,this._gl=e,this._location=o}Rr.prototype.set=function(){if(!se.equalsArray(this.value,this._value,0)){se.clone(this.value,this._value);var e=se.toArray(this.value,na);this._gl.uniformMatrix2fv(this._location,!1,e)}};var ta=new Float32Array(9);function Mr(e,n,t,o){this.name=t,this.value=void 0,this._value=new T,this._gl=e,this._location=o}Mr.prototype.set=function(){if(!T.equalsArray(this.value,this._value,0)){T.clone(this.value,this._value);var e=T.toArray(this.value,ta);this._gl.uniformMatrix3fv(this._location,!1,e)}};var oa=new Float32Array(16);function Pr(e,n,t,o){this.name=t,this.value=void 0,this._value=new G,this._gl=e,this._location=o}Pr.prototype.set=function(){if(!G.equalsArray(this.value,this._value,0)){G.clone(this.value,this._value);var e=G.toArray(this.value,oa);this._gl.uniformMatrix4fv(this._location,!1,e)}};var Vr=ea;function ra(e,n,t,o){switch(n.type){case e.FLOAT:return new Fr(e,n,t,o);case e.FLOAT_VEC2:return new Br(e,n,t,o);case e.FLOAT_VEC3:return new Nr(e,n,t,o);case e.FLOAT_VEC4:return new Hr(e,n,t,o);case e.SAMPLER_2D:case e.SAMPLER_CUBE:return new Qe(e,n,t,o);case e.INT:case e.BOOL:return new Ur(e,n,t,o);case e.INT_VEC2:case e.BOOL_VEC2:return new Gr(e,n,t,o);case e.INT_VEC3:case e.BOOL_VEC3:return new kr(e,n,t,o);case e.INT_VEC4:case e.BOOL_VEC4:return new Wr(e,n,t,o);case e.FLOAT_MAT2:return new qr(e,n,t,o);case e.FLOAT_MAT3:return new Xr(e,n,t,o);case e.FLOAT_MAT4:return new Yr(e,n,t,o);default:throw new ne("Unrecognized uniform type: "+n.type+' for uniform "'+t+'".')}}function Fr(e,n,t,o){var r=o.length;this.name=t,this.value=new Array(r),this._value=new Float32Array(r),this._gl=e,this._location=o[0]}Fr.prototype.set=function(){for(var e=this.value,n=e.length,t=this._value,o=!1,r=0;r<n;++r){var i=e[r];i!==t[r]&&(t[r]=i,o=!0)}o&&this._gl.uniform1fv(this._location,t)};function Br(e,n,t,o){var r=o.length;this.name=t,this.value=new Array(r),this._value=new Float32Array(r*2),this._gl=e,this._location=o[0]}Br.prototype.set=function(){for(var e=this.value,n=e.length,t=this._value,o=!1,r=0,i=0;i<n;++i){var l=e[i];A.equalsArray(l,t,r)||(A.pack(l,t,r),o=!0),r+=2}o&&this._gl.uniform2fv(this._location,t)};function Nr(e,n,t,o){var r=o.length;this.name=t,this.value=new Array(r),this._value=new Float32Array(r*3),this._gl=e,this._location=o[0]}Nr.prototype.set=function(){for(var e=this.value,n=e.length,t=this._value,o=!1,r=0,i=0;i<n;++i){var l=e[i];if(u(l.red))(l.red!==t[r]||l.green!==t[r+1]||l.blue!==t[r+2])&&(t[r]=l.red,t[r+1]=l.green,t[r+2]=l.blue,o=!0);else if(u(l.x))a.equalsArray(l,t,r)||(a.pack(l,t,r),o=!0);else throw new x("Invalid vec3 value.");r+=3}o&&this._gl.uniform3fv(this._location,t)};function Hr(e,n,t,o){var r=o.length;this.name=t,this.value=new Array(r),this._value=new Float32Array(r*4),this._gl=e,this._location=o[0]}Hr.prototype.set=function(){for(var e=this.value,n=e.length,t=this._value,o=!1,r=0,i=0;i<n;++i){var l=e[i];if(u(l.red))J.equalsArray(l,t,r)||(J.pack(l,t,r),o=!0);else if(u(l.x))H.equalsArray(l,t,r)||(H.pack(l,t,r),o=!0);else throw new x("Invalid vec4 value.");r+=4}o&&this._gl.uniform4fv(this._location,t)};function Qe(e,n,t,o){var r=o.length;this.name=t,this.value=new Array(r),this._value=new Float32Array(r),this._gl=e,this._locations=o,this.textureUnitIndex=void 0}Qe.prototype.set=function(){for(var e=this._gl,n=e.TEXTURE0+this.textureUnitIndex,t=this.value,o=t.length,r=0;r<o;++r){var i=t[r];e.activeTexture(n+r),e.bindTexture(i._target,i._texture)}};Qe.prototype._setSampler=function(e){this.textureUnitIndex=e;for(var n=this._locations,t=n.length,o=0;o<t;++o){var r=e+o;this._gl.uniform1i(n[o],r)}return e+t};function Ur(e,n,t,o){var r=o.length;this.name=t,this.value=new Array(r),this._value=new Int32Array(r),this._gl=e,this._location=o[0]}Ur.prototype.set=function(){for(var e=this.value,n=e.length,t=this._value,o=!1,r=0;r<n;++r){var i=e[r];i!==t[r]&&(t[r]=i,o=!0)}o&&this._gl.uniform1iv(this._location,t)};function Gr(e,n,t,o){var r=o.length;this.name=t,this.value=new Array(r),this._value=new Int32Array(r*2),this._gl=e,this._location=o[0]}Gr.prototype.set=function(){for(var e=this.value,n=e.length,t=this._value,o=!1,r=0,i=0;i<n;++i){var l=e[i];A.equalsArray(l,t,r)||(A.pack(l,t,r),o=!0),r+=2}o&&this._gl.uniform2iv(this._location,t)};function kr(e,n,t,o){var r=o.length;this.name=t,this.value=new Array(r),this._value=new Int32Array(r*3),this._gl=e,this._location=o[0]}kr.prototype.set=function(){for(var e=this.value,n=e.length,t=this._value,o=!1,r=0,i=0;i<n;++i){var l=e[i];a.equalsArray(l,t,r)||(a.pack(l,t,r),o=!0),r+=3}o&&this._gl.uniform3iv(this._location,t)};function Wr(e,n,t,o){var r=o.length;this.name=t,this.value=new Array(r),this._value=new Int32Array(r*4),this._gl=e,this._location=o[0]}Wr.prototype.set=function(){for(var e=this.value,n=e.length,t=this._value,o=!1,r=0,i=0;i<n;++i){var l=e[i];H.equalsArray(l,t,r)||(H.pack(l,t,r),o=!0),r+=4}o&&this._gl.uniform4iv(this._location,t)};function qr(e,n,t,o){var r=o.length;this.name=t,this.value=new Array(r),this._value=new Float32Array(r*4),this._gl=e,this._location=o[0]}qr.prototype.set=function(){for(var e=this.value,n=e.length,t=this._value,o=!1,r=0,i=0;i<n;++i){var l=e[i];se.equalsArray(l,t,r)||(se.pack(l,t,r),o=!0),r+=4}o&&this._gl.uniformMatrix2fv(this._location,!1,t)};function Xr(e,n,t,o){var r=o.length;this.name=t,this.value=new Array(r),this._value=new Float32Array(r*9),this._gl=e,this._location=o[0]}Xr.prototype.set=function(){for(var e=this.value,n=e.length,t=this._value,o=!1,r=0,i=0;i<n;++i){var l=e[i];T.equalsArray(l,t,r)||(T.pack(l,t,r),o=!0),r+=9}o&&this._gl.uniformMatrix3fv(this._location,!1,t)};function Yr(e,n,t,o){var r=o.length;this.name=t,this.value=new Array(r),this._value=new Float32Array(r*16),this._gl=e,this._location=o[0]}Yr.prototype.set=function(){for(var e=this.value,n=e.length,t=this._value,o=!1,r=0,i=0;i<n;++i){var l=e[i];G.equalsArray(l,t,r)||(G.pack(l,t,r),o=!0),r+=16}o&&this._gl.uniformMatrix4fv(this._location,!1,t)};var jr=ra;var ia=0;function le(e){var n=aa(e.vertexShaderText,e.fragmentShaderText);this._gl=e.gl,this._logShaderCompilation=e.logShaderCompilation,this._debugShaders=e.debugShaders,this._attributeLocations=e.attributeLocations,this._varyings=e.varyings,this._bufferMode=e.bufferMode,this._program=void 0,this._numberOfVertexAttributes=void 0,this._vertexAttributes=void 0,this._uniformsByName=void 0,this._uniforms=void 0,this._automaticUniforms=void 0,this._manualUniforms=void 0,this._duplicateUniformNames=n.duplicateUniformNames,this._cachedShader=void 0,this._uniformBlockLocation={},this.maximumTextureUnitIndex=void 0,this._vertexShaderSource=e.vertexShaderSource,this._vertexShaderText=e.vertexShaderText,this._fragmentShaderSource=e.fragmentShaderSource,this._fragmentShaderText=n.fragmentShaderText,this.id=ia++}le.fromCache=function(e){return e=h(e,h.EMPTY_OBJECT),q.defined("options.context",e.context),e.context.shaderCache.getShaderProgram(e)};le.replaceCache=function(e){return e=h(e,h.EMPTY_OBJECT),q.defined("options.context",e.context),e.context.shaderCache.replaceShaderProgram(e)};Object.defineProperties(le.prototype,{vertexShaderSource:{get:function(){return this._vertexShaderSource}},fragmentShaderSource:{get:function(){return this._fragmentShaderSource}},vertexAttributes:{get:function(){return Pe(this),this._vertexAttributes}},numberOfVertexAttributes:{get:function(){return Pe(this),this._numberOfVertexAttributes}},allUniforms:{get:function(){return Pe(this),this._uniformsByName}}});function Zr(e){var n=[],t=e.match(/uniform.*?(?![^{]*})(?=[=\[;])/g);if(u(t))for(var o=t.length,r=0;r<o;r++){var i=t[r].trim(),l=i.slice(i.lastIndexOf(" ")+1);n.push(l)}return n}function aa(e,n){var t={};if(!Z.highpFloatSupported||!Z.highpIntSupported){var o,r,i,l,m=Zr(e),f=Zr(n),v=m.length,p=f.length;for(o=0;o<v;o++)for(r=0;r<p;r++)if(m[o]===f[r]){i=m[o],l="czm_mediump_"+i;var s=new RegExp(i+"\\b","g");n=n.replace(s,l),t[l]=i}}return{fragmentShaderText:n,duplicateUniformNames:t}}var K="[Cesium WebGL] ";function la(e,n){var t=n._vertexShaderText,o=n._fragmentShaderText,r=e.createShader(e.VERTEX_SHADER);e.shaderSource(r,t),e.compileShader(r);var i=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(i,o),e.compileShader(i);var l=e.createProgram();e.attachShader(l,r),e.attachShader(l,i),e.deleteShader(r),e.deleteShader(i);var m=n._attributeLocations;if(u(m))for(var f in m)m.hasOwnProperty(f)&&e.bindAttribLocation(l,m[f],f);var v=n._varyings,p=n._bufferMode;u(v)&&u(p)&&e.transformFeedbackVaryings(l,v,p),e.linkProgram(l);var s;if(!e.getProgramParameter(l,e.LINK_STATUS)){var d=n._debugShaders;if(!e.getShaderParameter(i,e.COMPILE_STATUS)){if(s=e.getShaderInfoLog(i),console.error(K+"Fragment shader compile log: "+s),u(d)){var g=d.getTranslatedShaderSource(i);console.error(g!==""?K+`Translated fragment shader source:
`+g:K+"Fragment shader translation failed.")}throw e.deleteProgram(l),new ne("Fragment shader failed to compile.  Compile log: "+s)}if(!e.getShaderParameter(r,e.COMPILE_STATUS)){if(s=e.getShaderInfoLog(r),console.error(K+"Vertex shader compile log: "+s),u(d)){var C=d.getTranslatedShaderSource(r);console.error(C!==""?K+`Translated vertex shader source:
`+C:K+"Vertex shader translation failed.")}throw e.deleteProgram(l),new ne("Vertex shader failed to compile.  Compile log: "+s)}throw s=e.getProgramInfoLog(l),console.error(K+"Shader program link log: "+s),u(d)&&(console.error(K+`Translated vertex shader source:
`+d.getTranslatedShaderSource(r)),console.error(K+`Translated fragment shader source:
`+d.getTranslatedShaderSource(i))),e.deleteProgram(l),new ne("Program failed to link.  Link log: "+s)}var y=n._logShaderCompilation;return y&&(s=e.getShaderInfoLog(r),u(s)&&s.length>0&&console.log(K+"Vertex shader compile log: "+s)),y&&(s=e.getShaderInfoLog(i),u(s)&&s.length>0&&console.log(K+"Fragment shader compile log: "+s)),y&&(s=e.getProgramInfoLog(l),u(s)&&s.length>0&&console.log(K+"Shader program link log: "+s)),l}function ca(e,n,t){for(var o={},r=0;r<t;++r){var i=e.getActiveAttrib(n,r),l=e.getAttribLocation(n,i.name);o[i.name]={name:i.name,type:i.type,index:l}}return o}function sa(e,n){for(var t={},o=[],r=[],i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS),l=0;l<i;++l){var m=e.getActiveUniform(n,l),f="[0]",v=m.name.indexOf(f,m.name.length-f.length)!==-1?m.name.slice(0,m.name.length-3):m.name;if(v.indexOf("gl_")!==0)if(m.name.indexOf("[")<0){var p=e.getUniformLocation(n,v);if(p!==null){var s=Vr(e,m,v,p);t[v]=s,o.push(s),s._setSampler&&r.push(s)}}else{var d,g,C,y,S=v.indexOf("[");if(S>=0){if(d=t[v.slice(0,S)],!u(d))continue;g=d._locations,g.length<=1&&(C=d.value,y=e.getUniformLocation(n,v),y!==null&&(g.push(y),C.push(e.getUniform(n,y))))}else{g=[];for(var O=0;O<m.size;++O)y=e.getUniformLocation(n,v+"["+O+"]"),y!==null&&g.push(y);d=jr(e,m,v,g),t[v]=d,o.push(d),d._setSampler&&r.push(d)}}}return{uniformsByName:t,uniforms:o,samplerUniforms:r}}function fa(e,n){var t=[],o=[];for(var r in n)if(n.hasOwnProperty(r)){var i=n[r],l=r,m=e._duplicateUniformNames[l];u(m)&&(i.name=m,l=m);var f=Ce[l];u(f)?t.push({uniform:i,automaticUniform:f}):o.push(i)}return{automaticUniforms:t,manualUniforms:o}}function ua(e,n,t){e.useProgram(n);for(var o=0,r=t.length,i=0;i<r;++i)o=t[i]._setSampler(o);return e.useProgram(null),o}function Pe(e){if(!u(e._program)){var n=e._gl,t=la(n,e,e._debugShaders),o=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES),r=sa(n,t),i=fa(e,r.uniformsByName);e._program=t,e._numberOfVertexAttributes=o,e._vertexAttributes=ca(n,t,o),e._uniformsByName=r.uniformsByName,e._uniforms=r.uniforms,e._automaticUniforms=i.automaticUniforms,e._manualUniforms=i.manualUniforms,e.maximumTextureUnitIndex=ua(n,t,r.samplerUniforms)}}le.prototype._bind=function(){Pe(this),this._gl.useProgram(this._program)};le.prototype._setUniforms=function(e,n,t){var o,r;if(u(e)){var i=this._manualUniforms;for(o=i.length,r=0;r<o;++r){var l=i[r];l.value=e[l.name]()}}var m=this._automaticUniforms;for(o=m.length,r=0;r<o;++r){var f=m[r];f.uniform.value=f.automaticUniform.getValue(n)}var v=this._uniforms;for(o=v.length,r=0;r<o;++r)v[r].set();if(t){var p=this._gl,s=this._program;if(p.validateProgram(s),!p.getProgramParameter(s,p.VALIDATE_STATUS))throw new x("Program validation failed.  Program info log: "+p.getProgramInfoLog(s))}};le.prototype.isDestroyed=function(){return!1};le.prototype.destroy=function(){this._cachedShader.cache.releaseShaderProgram(this)};le.prototype.finalDestroy=function(){return this._gl.deleteProgram(this._program),Ie(this)};var Kr=le;var ma={ADD:c.FUNC_ADD,SUBTRACT:c.FUNC_SUBTRACT,REVERSE_SUBTRACT:c.FUNC_REVERSE_SUBTRACT,MIN:c.MIN,MAX:c.MAX},ve=Object.freeze(ma);var da={ZERO:c.ZERO,ONE:c.ONE,SOURCE_COLOR:c.SRC_COLOR,ONE_MINUS_SOURCE_COLOR:c.ONE_MINUS_SRC_COLOR,DESTINATION_COLOR:c.DST_COLOR,ONE_MINUS_DESTINATION_COLOR:c.ONE_MINUS_DST_COLOR,SOURCE_ALPHA:c.SRC_ALPHA,ONE_MINUS_SOURCE_ALPHA:c.ONE_MINUS_SRC_ALPHA,DESTINATION_ALPHA:c.DST_ALPHA,ONE_MINUS_DESTINATION_ALPHA:c.ONE_MINUS_DST_ALPHA,CONSTANT_COLOR:c.CONSTANT_COLOR,ONE_MINUS_CONSTANT_COLOR:c.ONE_MINUS_CONSTANT_COLOR,CONSTANT_ALPHA:c.CONSTANT_ALPHA,ONE_MINUS_CONSTANT_ALPHA:c.ONE_MINUS_CONSTANT_ALPHA,SOURCE_ALPHA_SATURATE:c.SRC_ALPHA_SATURATE},Y=Object.freeze(da);var pa={DISABLED:Object.freeze({enabled:!1}),ALPHA_BLEND:Object.freeze({enabled:!0,equationRgb:ve.ADD,equationAlpha:ve.ADD,functionSourceRgb:Y.SOURCE_ALPHA,functionSourceAlpha:Y.ONE,functionDestinationRgb:Y.ONE_MINUS_SOURCE_ALPHA,functionDestinationAlpha:Y.ONE_MINUS_SOURCE_ALPHA}),PRE_MULTIPLIED_ALPHA_BLEND:Object.freeze({enabled:!0,equationRgb:ve.ADD,equationAlpha:ve.ADD,functionSourceRgb:Y.ONE,functionSourceAlpha:Y.ONE,functionDestinationRgb:Y.ONE_MINUS_SOURCE_ALPHA,functionDestinationAlpha:Y.ONE_MINUS_SOURCE_ALPHA}),ADDITIVE_BLEND:Object.freeze({enabled:!0,equationRgb:ve.ADD,equationAlpha:ve.ADD,functionSourceRgb:Y.SOURCE_ALPHA,functionSourceAlpha:Y.ONE,functionDestinationRgb:Y.ONE,functionDestinationAlpha:Y.ONE})},Ip=Object.freeze(pa);function Qr(e){if(typeof e!="object"||e===null)return e;for(var n,t=Object.keys(e),o=0;o<t.length;o++)n=t[o],e.hasOwnProperty(n)&&n!=="_applyFunctions"&&(e[n]=Qr(e[n]));return Object.freeze(e)}var Jr=Qr;function $r(e){return e===c.FUNC_ADD||e===c.FUNC_SUBTRACT||e===c.FUNC_REVERSE_SUBTRACT||e===c.MIN||e===c.MAX}function Ve(e){return e===c.ZERO||e===c.ONE||e===c.SRC_COLOR||e===c.ONE_MINUS_SRC_COLOR||e===c.DST_COLOR||e===c.ONE_MINUS_DST_COLOR||e===c.SRC_ALPHA||e===c.ONE_MINUS_SRC_ALPHA||e===c.DST_ALPHA||e===c.ONE_MINUS_DST_ALPHA||e===c.CONSTANT_COLOR||e===c.ONE_MINUS_CONSTANT_COLOR||e===c.CONSTANT_ALPHA||e===c.ONE_MINUS_CONSTANT_ALPHA||e===c.SRC_ALPHA_SATURATE}function va(e){return e===c.FRONT||e===c.BACK||e===c.FRONT_AND_BACK}function ha(e){return e===c.NEVER||e===c.LESS||e===c.EQUAL||e===c.LEQUAL||e===c.GREATER||e===c.NOTEQUAL||e===c.GEQUAL||e===c.ALWAYS}function ei(e){return e===c.NEVER||e===c.LESS||e===c.EQUAL||e===c.LEQUAL||e===c.GREATER||e===c.NOTEQUAL||e===c.GEQUAL||e===c.ALWAYS}function Te(e){return e===c.ZERO||e===c.KEEP||e===c.REPLACE||e===c.INCR||e===c.DECR||e===c.INVERT||e===c.INCR_WRAP||e===c.DECR_WRAP}function oe(e){var n=h(e,{}),t=h(n.cull,{}),o=h(n.polygonOffset,{}),r=h(n.scissorTest,{}),i=h(r.rectangle,{}),l=h(n.depthRange,{}),m=h(n.depthTest,{}),f=h(n.colorMask,{}),v=h(n.blending,{}),p=h(v.color,{}),s=h(n.stencilTest,{}),d=h(s.frontOperation,{}),g=h(s.backOperation,{}),C=h(n.sampleCoverage,{}),y=n.viewport;if(this.frontFace=h(n.frontFace,We.COUNTER_CLOCKWISE),this.cull={enabled:h(t.enabled,!1),face:h(t.face,c.BACK)},this.lineWidth=h(n.lineWidth,1),this.polygonOffset={enabled:h(o.enabled,!1),factor:h(o.factor,0),units:h(o.units,0)},this.scissorTest={enabled:h(r.enabled,!1),rectangle:xe.clone(i)},this.depthRange={near:h(l.near,0),far:h(l.far,1)},this.depthTest={enabled:h(m.enabled,!1),func:h(m.func,c.LESS)},this.colorMask={red:h(f.red,!0),green:h(f.green,!0),blue:h(f.blue,!0),alpha:h(f.alpha,!0)},this.depthMask=h(n.depthMask,!0),this.stencilMask=h(n.stencilMask,-1),this.blending={enabled:h(v.enabled,!1),color:new J(h(p.red,0),h(p.green,0),h(p.blue,0),h(p.alpha,0)),equationRgb:h(v.equationRgb,c.FUNC_ADD),equationAlpha:h(v.equationAlpha,c.FUNC_ADD),functionSourceRgb:h(v.functionSourceRgb,c.ONE),functionSourceAlpha:h(v.functionSourceAlpha,c.ONE),functionDestinationRgb:h(v.functionDestinationRgb,c.ZERO),functionDestinationAlpha:h(v.functionDestinationAlpha,c.ZERO)},this.stencilTest={enabled:h(s.enabled,!1),frontFunction:h(s.frontFunction,c.ALWAYS),backFunction:h(s.backFunction,c.ALWAYS),reference:h(s.reference,0),mask:h(s.mask,-1),frontOperation:{fail:h(d.fail,c.KEEP),zFail:h(d.zFail,c.KEEP),zPass:h(d.zPass,c.KEEP)},backOperation:{fail:h(g.fail,c.KEEP),zFail:h(g.zFail,c.KEEP),zPass:h(g.zPass,c.KEEP)}},this.sampleCoverage={enabled:h(C.enabled,!1),value:h(C.value,1),invert:h(C.invert,!1)},this.viewport=u(y)?new xe(y.x,y.y,y.width,y.height):void 0,this.lineWidth<Z.minimumAliasedLineWidth||this.lineWidth>Z.maximumAliasedLineWidth)throw new x("renderState.lineWidth is out of range.  Check minimumAliasedLineWidth and maximumAliasedLineWidth.");if(!We.validate(this.frontFace))throw new x("Invalid renderState.frontFace.");if(!va(this.cull.face))throw new x("Invalid renderState.cull.face.");if(this.scissorTest.rectangle.width<0||this.scissorTest.rectangle.height<0)throw new x("renderState.scissorTest.rectangle.width and renderState.scissorTest.rectangle.height must be greater than or equal to zero.");if(this.depthRange.near>this.depthRange.far)throw new x("renderState.depthRange.near can not be greater than renderState.depthRange.far.");if(this.depthRange.near<0)throw new x("renderState.depthRange.near must be greater than or equal to zero.");if(this.depthRange.far>1)throw new x("renderState.depthRange.far must be less than or equal to one.");if(!ha(this.depthTest.func))throw new x("Invalid renderState.depthTest.func.");if(this.blending.color.red<0||this.blending.color.red>1||this.blending.color.green<0||this.blending.color.green>1||this.blending.color.blue<0||this.blending.color.blue>1||this.blending.color.alpha<0||this.blending.color.alpha>1)throw new x("renderState.blending.color components must be greater than or equal to zero and less than or equal to one.");if(!$r(this.blending.equationRgb))throw new x("Invalid renderState.blending.equationRgb.");if(!$r(this.blending.equationAlpha))throw new x("Invalid renderState.blending.equationAlpha.");if(!Ve(this.blending.functionSourceRgb))throw new x("Invalid renderState.blending.functionSourceRgb.");if(!Ve(this.blending.functionSourceAlpha))throw new x("Invalid renderState.blending.functionSourceAlpha.");if(!Ve(this.blending.functionDestinationRgb))throw new x("Invalid renderState.blending.functionDestinationRgb.");if(!Ve(this.blending.functionDestinationAlpha))throw new x("Invalid renderState.blending.functionDestinationAlpha.");if(!ei(this.stencilTest.frontFunction))throw new x("Invalid renderState.stencilTest.frontFunction.");if(!ei(this.stencilTest.backFunction))throw new x("Invalid renderState.stencilTest.backFunction.");if(!Te(this.stencilTest.frontOperation.fail))throw new x("Invalid renderState.stencilTest.frontOperation.fail.");if(!Te(this.stencilTest.frontOperation.zFail))throw new x("Invalid renderState.stencilTest.frontOperation.zFail.");if(!Te(this.stencilTest.frontOperation.zPass))throw new x("Invalid renderState.stencilTest.frontOperation.zPass.");if(!Te(this.stencilTest.backOperation.fail))throw new x("Invalid renderState.stencilTest.backOperation.fail.");if(!Te(this.stencilTest.backOperation.zFail))throw new x("Invalid renderState.stencilTest.backOperation.zFail.");if(!Te(this.stencilTest.backOperation.zPass))throw new x("Invalid renderState.stencilTest.backOperation.zPass.");if(u(this.viewport)){if(this.viewport.width<0)throw new x("renderState.viewport.width must be greater than or equal to zero.");if(this.viewport.height<0)throw new x("renderState.viewport.height must be greater than or equal to zero.");if(this.viewport.width>Z.maximumViewportWidth)throw new x("renderState.viewport.width must be less than or equal to the maximum viewport width ("+Z.maximumViewportWidth.toString()+").  Check maximumViewportWidth.");if(this.viewport.height>Z.maximumViewportHeight)throw new x("renderState.viewport.height must be less than or equal to the maximum viewport height ("+Z.maximumViewportHeight.toString()+").  Check maximumViewportHeight.")}this.id=0,this._applyFunctions=[]}var ga=0,te={};oe.fromCache=function(e){var n=JSON.stringify(e),t=te[n];if(u(t))return++t.referenceCount,t.state;var o=new oe(e),r=JSON.stringify(o);return t=te[r],u(t)||(o.id=ga++,o=Jr(o),t={referenceCount:0,state:o},te[r]=t),++t.referenceCount,te[n]={referenceCount:1,state:t.state},t.state};oe.removeFromCache=function(e){var n=new oe(e),t=JSON.stringify(n),o=te[t],r=JSON.stringify(e),i=te[r];u(i)&&(--i.referenceCount,i.referenceCount===0&&(delete te[r],u(o)&&--o.referenceCount)),u(o)&&o.referenceCount===0&&delete te[t]};oe.getCache=function(){return te};oe.clearCache=function(){te={}};function he(e,n,t){t?e.enable(n):e.disable(n)}function ni(e,n){e.frontFace(n.frontFace)}function ti(e,n){var t=n.cull,o=t.enabled;he(e,e.CULL_FACE,o),o&&e.cullFace(t.face)}function oi(e,n){e.lineWidth(n.lineWidth)}function ri(e,n){var t=n.polygonOffset,o=t.enabled;he(e,e.POLYGON_OFFSET_FILL,o),o&&e.polygonOffset(t.factor,t.units)}function ii(e,n,t){var o=n.scissorTest,r=u(t.scissorTest)?t.scissorTest.enabled:o.enabled;if(he(e,e.SCISSOR_TEST,r),r){var i=u(t.scissorTest)?t.scissorTest.rectangle:o.rectangle;e.scissor(i.x,i.y,i.width,i.height)}}function ai(e,n){var t=n.depthRange;e.depthRange(t.near,t.far)}function li(e,n){var t=n.depthTest,o=t.enabled;he(e,e.DEPTH_TEST,o),o&&e.depthFunc(t.func)}function ci(e,n){var t=n.colorMask;e.colorMask(t.red,t.green,t.blue,t.alpha)}function si(e,n){e.depthMask(n.depthMask)}function fi(e,n){e.stencilMask(n.stencilMask)}function _a(e,n){e.blendColor(n.red,n.green,n.blue,n.alpha)}function ui(e,n,t){var o=n.blending,r=u(t.blendingEnabled)?t.blendingEnabled:o.enabled;he(e,e.BLEND,r),r&&(_a(e,o.color),e.blendEquationSeparate(o.equationRgb,o.equationAlpha),e.blendFuncSeparate(o.functionSourceRgb,o.functionDestinationRgb,o.functionSourceAlpha,o.functionDestinationAlpha))}function mi(e,n){var t=n.stencilTest,o=t.enabled;if(he(e,e.STENCIL_TEST,o),o){var r=t.frontFunction,i=t.backFunction,l=t.reference,m=t.mask;e.stencilFunc(r,l,m),e.stencilFuncSeparate(e.BACK,i,l,m),e.stencilFuncSeparate(e.FRONT,r,l,m);var f=t.frontOperation,v=f.fail,p=f.zFail,s=f.zPass;e.stencilOpSeparate(e.FRONT,v,p,s);var d=t.backOperation,g=d.fail,C=d.zFail,y=d.zPass;e.stencilOpSeparate(e.BACK,g,C,y)}}function di(e,n){var t=n.sampleCoverage,o=t.enabled;he(e,e.SAMPLE_COVERAGE,o),o&&e.sampleCoverage(t.value,t.invert)}var xa=new xe;function pi(e,n,t){var o=h(n.viewport,t.viewport);u(o)||(o=xa,o.width=t.context.drawingBufferWidth,o.height=t.context.drawingBufferHeight),t.context.uniformState.viewport=o,e.viewport(o.x,o.y,o.width,o.height)}oe.apply=function(e,n,t){ni(e,n),ti(e,n),oi(e,n),ri(e,n),ai(e,n),li(e,n),ci(e,n),si(e,n),fi(e,n),mi(e,n),di(e,n),ii(e,n,t),ui(e,n,t),pi(e,n,t)};function Ca(e,n){var t=[];return e.frontFace!==n.frontFace&&t.push(ni),(e.cull.enabled!==n.cull.enabled||e.cull.face!==n.cull.face)&&t.push(ti),e.lineWidth!==n.lineWidth&&t.push(oi),(e.polygonOffset.enabled!==n.polygonOffset.enabled||e.polygonOffset.factor!==n.polygonOffset.factor||e.polygonOffset.units!==n.polygonOffset.units)&&t.push(ri),(e.depthRange.near!==n.depthRange.near||e.depthRange.far!==n.depthRange.far)&&t.push(ai),(e.depthTest.enabled!==n.depthTest.enabled||e.depthTest.func!==n.depthTest.func)&&t.push(li),(e.colorMask.red!==n.colorMask.red||e.colorMask.green!==n.colorMask.green||e.colorMask.blue!==n.colorMask.blue||e.colorMask.alpha!==n.colorMask.alpha)&&t.push(ci),e.depthMask!==n.depthMask&&t.push(si),e.stencilMask!==n.stencilMask&&t.push(fi),(e.stencilTest.enabled!==n.stencilTest.enabled||e.stencilTest.frontFunction!==n.stencilTest.frontFunction||e.stencilTest.backFunction!==n.stencilTest.backFunction||e.stencilTest.reference!==n.stencilTest.reference||e.stencilTest.mask!==n.stencilTest.mask||e.stencilTest.frontOperation.fail!==n.stencilTest.frontOperation.fail||e.stencilTest.frontOperation.zFail!==n.stencilTest.frontOperation.zFail||e.stencilTest.backOperation.fail!==n.stencilTest.backOperation.fail||e.stencilTest.backOperation.zFail!==n.stencilTest.backOperation.zFail||e.stencilTest.backOperation.zPass!==n.stencilTest.backOperation.zPass)&&t.push(mi),(e.sampleCoverage.enabled!==n.sampleCoverage.enabled||e.sampleCoverage.value!==n.sampleCoverage.value||e.sampleCoverage.invert!==n.sampleCoverage.invert)&&t.push(di),t}oe.partialApply=function(e,n,t,o,r,i,l,m){if(n!==t){var f=t._applyFunctions[n.id];u(f)||(f=Ca(n,t),t._applyFunctions[n.id]=f);for(var v=f.length,p=0;p<v;++p)f[p](e,t)}var s=u(o.scissorTest)?o.scissorTest:n.scissorTest,d=u(r.scissorTest)?r.scissorTest:t.scissorTest;(s!==d||m)&&ii(e,t,r);var g=u(o.blendingEnabled)?o.blendingEnabled:n.blending.enabled,C=u(r.blendingEnabled)?r.blendingEnabled:t.blending.enabled;(g!==C||C&&n.blending!==t.blending)&&ui(e,t,r),(n!==t||o!==r||o.context!==r.context||i!==l)&&pi(e,t,r)};oe.getState=function(e){if(!u(e))throw new x("renderState is required.");return{frontFace:e.frontFace,cull:{enabled:e.cull.enabled,face:e.cull.face},lineWidth:e.lineWidth,polygonOffset:{enabled:e.polygonOffset.enabled,factor:e.polygonOffset.factor,units:e.polygonOffset.units},scissorTest:{enabled:e.scissorTest.enabled,rectangle:xe.clone(e.scissorTest.rectangle)},depthRange:{near:e.depthRange.near,far:e.depthRange.far},depthTest:{enabled:e.depthTest.enabled,func:e.depthTest.func},colorMask:{red:e.colorMask.red,green:e.colorMask.green,blue:e.colorMask.blue,alpha:e.colorMask.alpha},depthMask:e.depthMask,stencilMask:e.stencilMask,blending:{enabled:e.blending.enabled,color:J.clone(e.blending.color),equationRgb:e.blending.equationRgb,equationAlpha:e.blending.equationAlpha,functionSourceRgb:e.blending.functionSourceRgb,functionSourceAlpha:e.blending.functionSourceAlpha,functionDestinationRgb:e.blending.functionDestinationRgb,functionDestinationAlpha:e.blending.functionDestinationAlpha},stencilTest:{enabled:e.stencilTest.enabled,frontFunction:e.stencilTest.frontFunction,backFunction:e.stencilTest.backFunction,reference:e.stencilTest.reference,mask:e.stencilTest.mask,frontOperation:{fail:e.stencilTest.frontOperation.fail,zFail:e.stencilTest.frontOperation.zFail,zPass:e.stencilTest.frontOperation.zPass},backOperation:{fail:e.stencilTest.backOperation.fail,zFail:e.stencilTest.backOperation.zFail,zPass:e.stencilTest.backOperation.zPass}},sampleCoverage:{enabled:e.sampleCoverage.enabled,value:e.sampleCoverage.value,invert:e.sampleCoverage.invert},viewport:u(e.viewport)?xe.clone(e.viewport):void 0}};var vi=oe;var Ta={ENVIRONMENT:0,COMPUTE:1,GLOBE:2,TERRAIN_CLASSIFICATION:3,CESIUM_3D_TILE:4,CESIUM_3D_TILE_CLASSIFICATION:5,CESIUM_3D_TILE_CLASSIFICATION_IGNORE_SHOW:6,S3MTiles:8,S3MTilesClampObjectStencil:9,S3MTilesClampObjectColor:10,ProjectionImage:11,OPAQUE:12,ClampObject:13,NonClampObject:14,Label_Billboard:15,Voxel_Billboard:16,Particle:17,TRANSLUCENT:18,ANALYSIS:19,LOG_DEPTH_OVERLAY:20,OVERLAY:21,OVERLAY_AGAINST_DEPTH:22,NUMBER_OF_PASSES:23},hi=Object.freeze(Ta);var ya={FRONT:c.FRONT,BACK:c.BACK,FRONT_AND_BACK:c.FRONT_AND_BACK},gi=Object.freeze(ya);var za={NEVER:c.NEVER,LESS:c.LESS,EQUAL:c.EQUAL,LESS_OR_EQUAL:c.LEQUAL,GREATER:c.GREATER,NOT_EQUAL:c.NOTEQUAL,GREATER_OR_EQUAL:c.GEQUAL,ALWAYS:c.ALWAYS},ye=Object.freeze(za);var ba={ZERO:c.ZERO,KEEP:c.KEEP,REPLACE:c.REPLACE,INCREMENT:c.INCR,DECREMENT:c.DECR,INVERT:c.INVERT,INCREMENT_WRAP:c.INCR_WRAP,DECREMENT_WRAP:c.DECR_WRAP},k=Object.freeze(ba);var Fe={CESIUM_3D_TILE_MASK:128,S3M_TILE:2,MODEL:6,SKIP_LOD_MASK:112,SKIP_LOD_BIT_SHIFT:4,CLASSIFICATION_MASK:15};Fe.setCesium3DTileBit=function(){return{enabled:!0,frontFunction:ye.ALWAYS,frontOperation:{fail:k.KEEP,zFail:k.KEEP,zPass:k.REPLACE},backFunction:ye.ALWAYS,backOperation:{fail:k.KEEP,zFail:k.KEEP,zPass:k.REPLACE},reference:Fe.CESIUM_3D_TILE_MASK,mask:Fe.CESIUM_3D_TILE_MASK}};var Be=Object.freeze(Fe);var z=[];z[0]={num:0,des:"inside"};z[1]={num:4,data:[0,4,7,3],des:"left"};z[2]={num:4,data:[1,2,6,5],des:"right"};z[3]={num:0};z[4]={num:4,data:[0,1,5,4],des:"bottom"};z[5]={num:6,data:[0,1,5,4,7,3],des:"bottom, left"};z[6]={num:6,data:[0,1,2,6,5,4],des:"bottom, right"};z[7]={num:0};z[8]={num:4,data:[2,3,7,6],des:"top"};z[9]={num:6,data:[4,7,6,2,3,0],des:"top, left"};z[10]={num:6,data:[2,3,7,6,5,1],des:"top, right"};z[11]={num:0};z[12]={num:0};z[13]={num:0};z[14]={num:0};z[15]={num:0};z[16]={num:4,data:[0,3,2,1],des:"front"};z[17]={num:6,data:[0,4,7,3,2,1],des:"front, left"};z[18]={num:6,data:[0,3,2,6,5,1],des:"front, right"};z[19]={num:0};z[20]={num:6,data:[0,3,2,1,5,4],des:"front, bottom"};z[21]={num:6,data:[2,1,5,4,7,3],des:"front, bottom, left"};z[22]={num:6,data:[0,3,2,6,5,4],des:"front, bottom, right"};z[23]={num:0};z[24]={num:6,data:[0,3,7,6,2,1],des:"front, top"};z[25]={num:6,data:[0,4,7,6,2,1],des:"front, top, left"};z[26]={num:6,data:[0,3,7,6,5,1],des:"front, top, right"};z[27]={num:0};z[28]={num:0};z[29]={num:0};z[30]={num:0};z[31]={num:0};z[32]={num:4,data:[4,5,6,7],des:"back"};z[33]={num:6,data:[4,5,6,7,3,0],des:"back, left"};z[34]={num:6,data:[1,2,6,7,4,5],des:"back, right"};z[35]={num:0};z[36]={num:6,data:[0,1,5,6,7,4],des:"back, bottom"};z[37]={num:6,data:[0,1,5,6,7,3],des:"back, bottom, left"};z[38]={num:6,data:[0,1,2,6,7,4],des:"back, bottom, right"};z[39]={num:0};z[40]={num:6,data:[2,3,7,4,5,6],des:"back, top"};z[41]={num:6,data:[0,4,5,6,2,3],des:"back, top, left"};z[42]={num:6,data:[1,2,3,7,4,5],des:"back, top, right"};function w(e,n){this.center=a.clone(h(e,a.ZERO)),this.halfAxes=T.clone(h(n,T.ZERO)),this.areaDirty=1}w.packedLength=a.packedLength+T.packedLength;w.pack=function(e,n,t){return q.typeOf.object("value",e),q.defined("array",n),t=h(t,0),a.pack(e.center,n,t),T.pack(e.halfAxes,n,t+a.packedLength),n};w.unpack=function(e,n,t){return q.defined("array",e),n=h(n,0),u(t)||(t=new w),a.unpack(e,n,t.center),T.unpack(e,n+a.packedLength,t.halfAxes),t};var wa=new a,La=new a,Sa=new a,Ea=new a,Aa=new a,Da=new a,Oa=new T,Ia={unitary:new T,diagonal:new T},ce=new a,Q=new a,L=new a;w.fromPoints=function(e,n){if(u(n)||(n=new w),!u(e)||e.length===0)return n.halfAxes=T.ZERO,n.center=a.ZERO,n;var t,o=e.length,r=a.clone(e[0],wa);for(t=1;t<o;t++)a.add(r,e[t],r);var i=1/o;a.multiplyByScalar(r,i,r);var l=0,m=0,f=0,v=0,p=0,s=0,d;for(t=0;t<o;t++)d=a.subtract(e[t],r,La),l+=d.x*d.x,m+=d.x*d.y,f+=d.x*d.z,v+=d.y*d.y,p+=d.y*d.z,s+=d.z*d.z;l*=i,m*=i,f*=i,v*=i,p*=i,s*=i;var g=Oa;g[0]=l,g[1]=m,g[2]=f,g[3]=m,g[4]=v,g[5]=p,g[6]=f,g[7]=p,g[8]=s;var C=T.computeEigenDecomposition(g,Ia),y=T.clone(C.unitary,n.halfAxes),S=T.getColumn(y,0,Ea),O=T.getColumn(y,1,Aa),R=T.getColumn(y,2,Da),U=-Number.MAX_VALUE,V=-Number.MAX_VALUE,D=-Number.MAX_VALUE,F=Number.MAX_VALUE,B=Number.MAX_VALUE,j=Number.MAX_VALUE;for(t=0;t<o;t++)d=e[t],U=Math.max(a.dot(S,d),U),V=Math.max(a.dot(O,d),V),D=Math.max(a.dot(R,d),D),F=Math.min(a.dot(S,d),F),B=Math.min(a.dot(O,d),B),j=Math.min(a.dot(R,d),j);S=a.multiplyByScalar(S,.5*(F+U),S),O=a.multiplyByScalar(O,.5*(B+V),O),R=a.multiplyByScalar(R,.5*(j+D),R);var re=a.add(S,O,n.center);a.add(re,R,re);var W=Sa;return W.x=U-F,W.y=V-B,W.z=D-j,a.multiplyByScalar(W,.5,W),T.multiplyByScale(n.halfAxes,W,n.halfAxes),n};var zi=new a,Ra=new a;function _i(e,n,t,o,r,i,l,m,f,v,p){if(!u(r)||!u(i)||!u(l)||!u(m)||!u(f)||!u(v))throw new x("all extents (minimum/maximum X/Y/Z) are required.");u(p)||(p=new w);var s=p.halfAxes;T.setColumn(s,0,n,s),T.setColumn(s,1,t,s),T.setColumn(s,2,o,s);var d=zi;d.x=(r+i)/2,d.y=(l+m)/2,d.z=(f+v)/2;var g=Ra;g.x=(i-r)/2,g.y=(m-l)/2,g.z=(v-f)/2;var C=p.center;return d=T.multiplyByVector(s,d,d),a.add(e,d,C),T.multiplyByScale(s,g,s),p}var xi=new X,Ma=new a,Pa=new X,Va=new X,Fa=new X,Ba=new X,Na=new X,Ha=new a,Ci=new a,Ua=new a,Ti=new a,Ga=new a,ka=new A,Wa=new A,qa=new A,Xa=new A,Ya=new A,ja=new a,Za=new a,Ka=new a,Qa=new a,Ja=new A,$a=new a,el=new a,nl=new a,tl=new de(a.UNIT_X,0);w.fromRectangle=function(e,n,t,o,r){if(!u(e))throw new x("rectangle is required");if(e.width<0||e.width>N.TWO_PI)throw new x("Rectangle width must be between 0 and 2*pi");if(e.height<0||e.height>N.PI)throw new x("Rectangle height must be between 0 and pi");if(u(o)&&!N.equalsEpsilon(o.radii.x,o.radii.y,N.EPSILON15))throw new x("Ellipsoid must be an ellipsoid of revolution (radii.x == radii.y)");n=h(n,0),t=h(t,0),o=h(o,an.WGS84);var i,l,m,f,v,p,s;if(e.width<=N.PI){var d=Ge.center(e,xi),g=o.cartographicToCartesian(d,Ma),C=new sn(g,o);s=C.plane;var y=d.longitude,S=e.south<0&&e.north>0?0:d.latitude,O=X.fromRadians(y,e.north,t,Pa),R=X.fromRadians(e.west,e.north,t,Va),U=X.fromRadians(e.west,S,t,Fa),V=X.fromRadians(e.west,e.south,t,Ba),D=X.fromRadians(y,e.south,t,Na),F=o.cartographicToCartesian(O,Ha),B=o.cartographicToCartesian(R,Ci),j=o.cartographicToCartesian(U,Ua),re=o.cartographicToCartesian(V,Ti),W=o.cartographicToCartesian(D,Ga),ze=C.projectPointToNearestOnPlane(F,ka),me=C.projectPointToNearestOnPlane(B,Wa),ee=C.projectPointToNearestOnPlane(j,qa),be=C.projectPointToNearestOnPlane(re,Xa),Ae=C.projectPointToNearestOnPlane(W,Ya);return i=Math.min(me.x,ee.x,be.x),l=-i,f=Math.max(me.y,ze.y),m=Math.min(be.y,Ae.y),R.height=V.height=n,B=o.cartographicToCartesian(R,Ci),re=o.cartographicToCartesian(V,Ti),v=Math.min(de.getPointDistance(s,B),de.getPointDistance(s,re)),p=t,_i(C.origin,C.xAxis,C.yAxis,C.zAxis,i,l,m,f,v,p,r)}var we=e.south>0,nn=e.north<0,He=we?e.south:nn?e.north:0,tn=Ge.center(e,xi).longitude,_e=a.fromRadians(tn,He,t,o,ja);_e.z=0;var wi=Math.abs(_e.x)<N.EPSILON10&&Math.abs(_e.y)<N.EPSILON10,Ue=wi?a.UNIT_X:a.normalize(_e,Za),on=a.UNIT_Z,rn=a.cross(Ue,on,Ka);s=de.fromPointNormal(_e,Ue,tl);var Li=a.fromRadians(tn+N.PI_OVER_TWO,He,t,o,Qa);l=a.dot(de.projectPointOntoPlane(s,Li,Ja),rn),i=-l,f=a.fromRadians(0,e.north,nn?n:t,o,$a).z,m=a.fromRadians(0,e.south,we?n:t,o,el).z;var Si=a.fromRadians(e.east,He,t,o,nl);return v=de.getPointDistance(s,Si),p=0,_i(_e,rn,on,Ue,i,l,m,f,v,p,r)};w.clone=function(e,n){if(!!u(e))return u(n)?(a.clone(e.center,n.center),T.clone(e.halfAxes,n.halfAxes),n.areaDirty=1,n):new w(e.center,e.halfAxes)};w.intersectPlane=function(e,n){if(!u(e))throw new x("box is required.");if(!u(n))throw new x("plane is required.");var t=e.center,o=n.normal,r=e.halfAxes,i=o.x,l=o.y,m=o.z,f=Math.abs(i*r[T.COLUMN0ROW0]+l*r[T.COLUMN0ROW1]+m*r[T.COLUMN0ROW2])+Math.abs(i*r[T.COLUMN1ROW0]+l*r[T.COLUMN1ROW1]+m*r[T.COLUMN1ROW2])+Math.abs(i*r[T.COLUMN2ROW0]+l*r[T.COLUMN2ROW1]+m*r[T.COLUMN2ROW2]),v=a.dot(o,t)+n.distance;return v<=-f?De.OUTSIDE:v>=f?De.INSIDE:De.INTERSECTING};var Je=new a,$e=new a,en=new a,ol=new a,rl=new a;w.distanceSquaredTo=function(e,n){if(!u(e))throw new x("box is required.");if(!u(n))throw new x("cartesian is required.");var t=a.subtract(n,e.center,zi),o=e.halfAxes,r=T.getColumn(o,0,Je),i=T.getColumn(o,1,$e),l=T.getColumn(o,2,en),m=a.magnitude(r),f=a.magnitude(i),v=a.magnitude(l);a.normalize(r,r),a.normalize(i,i),a.normalize(l,l);var p=ol;p.x=a.dot(t,r),p.y=a.dot(t,i),p.z=a.dot(t,l);var s=0,d;return p.x<-m?(d=p.x+m,s+=d*d):p.x>m&&(d=p.x-m,s+=d*d),p.y<-f?(d=p.y+f,s+=d*d):p.y>f&&(d=p.y-f,s+=d*d),p.z<-v?(d=p.z+v,s+=d*d):p.z>v&&(d=p.z-v,s+=d*d),s};var bi=new a,il=new a;w.computePlaneDistances=function(e,n,t,o){if(!u(e))throw new x("box is required.");if(!u(n))throw new x("position is required.");if(!u(t))throw new x("direction is required.");u(o)||(o=new ln);var r=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY,l=e.center,m=e.halfAxes,f=T.getColumn(m,0,Je),v=T.getColumn(m,1,$e),p=T.getColumn(m,2,en),s=a.add(f,v,bi);a.add(s,p,s),a.add(s,l,s);var d=a.subtract(s,n,il),g=a.dot(t,d);return r=Math.min(g,r),i=Math.max(g,i),a.add(l,f,s),a.add(s,v,s),a.subtract(s,p,s),a.subtract(s,n,d),g=a.dot(t,d),r=Math.min(g,r),i=Math.max(g,i),a.add(l,f,s),a.subtract(s,v,s),a.add(s,p,s),a.subtract(s,n,d),g=a.dot(t,d),r=Math.min(g,r),i=Math.max(g,i),a.add(l,f,s),a.subtract(s,v,s),a.subtract(s,p,s),a.subtract(s,n,d),g=a.dot(t,d),r=Math.min(g,r),i=Math.max(g,i),a.subtract(l,f,s),a.add(s,v,s),a.add(s,p,s),a.subtract(s,n,d),g=a.dot(t,d),r=Math.min(g,r),i=Math.max(g,i),a.subtract(l,f,s),a.add(s,v,s),a.subtract(s,p,s),a.subtract(s,n,d),g=a.dot(t,d),r=Math.min(g,r),i=Math.max(g,i),a.subtract(l,f,s),a.subtract(s,v,s),a.add(s,p,s),a.subtract(s,n,d),g=a.dot(t,d),r=Math.min(g,r),i=Math.max(g,i),a.subtract(l,f,s),a.subtract(s,v,s),a.subtract(s,p,s),a.subtract(s,n,d),g=a.dot(t,d),r=Math.min(g,r),i=Math.max(g,i),o.start=r,o.stop=i,o};var al=new ke;w.isOccluded=function(e,n){if(!u(e))throw new x("box is required.");if(!u(n))throw new x("occluder is required.");var t=ke.fromOrientedBoundingBox(e,al);return!n.isBoundingSphereVisible(t)};w.prototype.intersectPlane=function(e){return w.intersectPlane(this,e)};w.prototype.distanceSquaredTo=function(e){return w.distanceSquaredTo(this,e)};w.prototype.computePlaneDistances=function(e,n,t){return w.computePlaneDistances(this,e,n,t)};w.prototype.isOccluded=function(e){return w.isOccluded(this,e)};w.equals=function(e,n){return e===n||u(e)&&u(n)&&a.equals(e.center,n.center)&&T.equals(e.halfAxes,n.halfAxes)};w.prototype.clone=function(e){return w.clone(this,e)};w.prototype.equals=function(e){return w.equals(this,e)};var yi=new H;w.prototype._updateBBox=function(){if(this.areaDirty==1){var e=T.getColumn(this.halfAxes,0,Je),n=a.clone(a.negate(e,ce)),t=T.getColumn(this.halfAxes,1,$e),o=a.clone(a.negate(t,ce)),r=T.getColumn(this.halfAxes,2,en),i=a.clone(a.negate(r,ce));this.bbox=[],a.add(this.center,t,ce),a.add(ce,i,Q),a.add(Q,n,L),this.bbox[0]=new a(L.x,L.y,L.z),a.add(Q,e,L),this.bbox[1]=new a(L.x,L.y,L.z),a.add(ce,r,Q),a.add(Q,e,L),this.bbox[2]=new a(L.x,L.y,L.z),a.add(Q,n,L),this.bbox[3]=new a(L.x,L.y,L.z),a.add(this.center,o,ce),a.add(ce,i,Q),a.add(Q,n,L),this.bbox[4]=new a(L.x,L.y,L.z),a.add(Q,e,L),this.bbox[5]=new a(L.x,L.y,L.z),a.add(ce,r,Q),a.add(Q,e,L),this.bbox[6]=new a(L.x,L.y,L.z),a.add(Q,n,L),this.bbox[7]=new a(L.x,L.y,L.z);var l=a.magnitude(e),m=a.magnitude(t),f=a.magnitude(r),v=new a(-l,-m,-f),p=new a(l,m,f);if(l*m*f==0){this.areaDirty=-1;return}a.normalize(e,e),a.normalize(t,t),a.normalize(r,r),this.u=a.clone(e),this.v=a.clone(t),this.w=a.clone(r),this.posMin=v,this.posMaX=p,this.areaDirty=0}};var b=void 0;w.prototype._createDeriveZBackfaceCommand=function(e){if(u(this.command))return this.command;this._updateBBox();for(var n=new Float32Array(3*8),t=0;t<8;t++)n[t*3]=this.bbox[t].x-this.center.x,n[t*3+1]=this.bbox[t].y-this.center.y,n[t*3+2]=this.bbox[t].z-this.center.z;u(b)||(b=new Uint8Array(36),b[0]=3,b[1]=2,b[2]=6,b[3]=3,b[4]=6,b[5]=7,b[6]=0,b[7]=4,b[8]=1,b[9]=1,b[10]=4,b[11]=5,b[12]=4,b[13]=6,b[14]=5,b[15]=4,b[16]=7,b[17]=6,b[18]=0,b[19]=3,b[20]=4,b[21]=3,b[22]=7,b[23]=4,b[24]=0,b[25]=1,b[26]=2,b[27]=0,b[28]=2,b[29]=3,b[30]=1,b[31]=5,b[32]=6,b[33]=1,b[34]=6,b[35]=2);var o=fe.createIndexBuffer({context:e,typedArray:b,usage:Se.STATIC_DRAW,indexDatatype:Le.UNSIGNED_BYTE});o.vertexArrayDestroyable=!1,o.referenceCount=1;var r=new dn({context:e,attributes:[{index:0,vertexBuffer:fe.createVertexBuffer({context:e,typedArray:n,usage:Se.STATIC_DRAW}),componentDatatype:M.FLOAT,componentsPerAttribute:3,offsetInBytes:0,strideInBytes:3*M.getSizeInBytes(M.FLOAT)}],indexBuffer:o}),i=["attribute vec4 position;","void main()","{","   gl_Position = czm_modelViewProjection * vec4(position.xyz, 1.0);","}"].join(`
`),l=["void main()","{","   gl_FragColor = vec4(1.0,0.0,0.0,0.3);","}"].join(`
`),m=new je({sources:[i]}),f=new je({sources:[l]});this.command=new pn,this.command.cull=!1,this.command.boundingVolume=this,this.command.orientedBoundingBox=this,this.command.shaderProgram=Kr.fromCache({context:e,vertexShaderSource:m,fragmentShaderSource:f,attributeLocations:{position:0}});var v=G.fromTranslation(this.center);return this.command.uniformMap={},this.command.modelMatrix=v,this.command.primitiveType=Oe.TRIANGLES,this.command.vertexArray=r,this.command.count=b.length,this.command.pass=hi.S3MTilesClampObjectStencil,this.command.renderState=vi.fromCache({cull:{enabled:!0,face:gi.BACK},colorMask:{red:!1,green:!1,blue:!1,alpha:!1},stencilMask:Be.SKIP_LOD_MASK,stencilTest:{enabled:!0,backFunction:ye.NOT_EQUAL,backOperation:{fail:k.KEEP,zFail:k.REPLACE,zPass:k.REPLACE},frontFunction:ye.NOT_EQUAL,frontOperation:{fail:k.KEEP,zFail:k.REPLACE,zPass:k.REPLACE},reference:Be.SKIP_LOD_MASK,mask:Be.SKIP_LOD_MASK}}),this.command};var ge=[];ge.push(new A);ge.push(new A);ge.push(new A);ge.push(new A);ge.push(new A);ge.push(new A);var ll=new X,Ne=new a;w.prototype.calculateBoxArea=function(e,n,t,o,r,i,l,m){this._updateBBox();var f=e,v=a.subtract(f,this.center,rl);if(this.areaDirty==-1){var p=i!=-1?i:a.distance(this.posMaX,this.posMin)*.5,s=r,d=s/o,g=d*p/t;return N.PI*g*g}var C=a.fromElements(a.dot(v,this.u),a.dot(v,this.v),a.dot(v,this.w),bi),y=C.x<this.posMin.x?1:0,S=C.x>this.posMaX.x?1:0,O=C.z<this.posMin.z?1:0,R=C.z>this.posMaX.z?1:0,U=C.y>this.posMaX.y?1:0,V=C.y<this.posMin.y?1:0,D=y+(S<<1)+(O<<2)+(R<<3)+(U<<4)+(V<<5);if(D>42)return console.log("area calculation is wrong"),-100;var F=z[D];if(F.num==0){var p=i!=-1?i:a.distance(this.posMaX,this.posMin)*.5,s=r,d=s/o,g=d*p/t;return N.PI*g*g}if(F.num==0)return console.log("area calculation is wrong"),-100;for(var B=[],j,re=l,W=0;W<F.num;W++){var ze=ge[W],me=this.bbox[F.data[W]];j=!1;var ee,be=N.PI;if(n===3)ee=G.multiplyByVector(re,H.fromElements(me.x,me.y,me.z,1),yi),ee.z<0&&(j=!0,p==-1&&(be=N.PI_OVER_FOUR,t=a.magnitude(v)));else{var Ae=m,we=Ae.ellipsoid.cartesianToCartographic(me,ll);u(we)?(Ae.project(we,Ne),ee=G.multiplyByVector(re,H.fromElements(Ne.z,Ne.x,Ne.y,1),yi),ee.z<0&&(j=!0)):j=!0}if(j==!0){var p=i!=-1?i:a.distance(this.posMaX,this.posMin)*.5,s=r,d=s/o,g=d*p/t;return be*g*g}else ze.x=ee.x/ee.w,ze.y=r-ee.y/ee.w,B.push(ze)}return Math.abs(fn.computeArea2D(B))};w.prototype.computeCorners=function(e){return w.computeCorners(this,e)};var cl=new a,sl=new a,fl=new a;w.computeCorners=function(e,n){q.typeOf.object("box",e),u(n)||(n=[new a,new a,new a,new a,new a,new a,new a,new a]);let t=e.center,o=e.halfAxes,r=T.getColumn(o,0,cl),i=T.getColumn(o,1,sl),l=T.getColumn(o,2,fl);return a.clone(t,n[0]),a.subtract(n[0],r,n[0]),a.subtract(n[0],i,n[0]),a.subtract(n[0],l,n[0]),a.clone(t,n[1]),a.subtract(n[1],r,n[1]),a.subtract(n[1],i,n[1]),a.add(n[1],l,n[1]),a.clone(t,n[2]),a.subtract(n[2],r,n[2]),a.add(n[2],i,n[2]),a.subtract(n[2],l,n[2]),a.clone(t,n[3]),a.subtract(n[3],r,n[3]),a.add(n[3],i,n[3]),a.add(n[3],l,n[3]),a.clone(t,n[4]),a.add(n[4],r,n[4]),a.subtract(n[4],i,n[4]),a.subtract(n[4],l,n[4]),a.clone(t,n[5]),a.add(n[5],r,n[5]),a.subtract(n[5],i,n[5]),a.add(n[5],l,n[5]),a.clone(t,n[6]),a.add(n[6],r,n[6]),a.add(n[6],i,n[6]),a.subtract(n[6],l,n[6]),a.clone(t,n[7]),a.add(n[7],r,n[7]),a.add(n[7],i,n[7]),a.add(n[7],l,n[7]),n};var Fv=w;export{Fv as a};
