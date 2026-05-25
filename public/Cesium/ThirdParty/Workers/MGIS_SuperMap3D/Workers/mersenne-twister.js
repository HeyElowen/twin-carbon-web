/**
@license

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
function _0xa122(){var _0x3bc7d6=['random','15459BDoFjW','776447Utniez','262590MxKZwZ','76UdVZGN','UPPER_MASK','init_genrand','794545omFXmx','genrand_int32','6LDoLKy','758832lUuQSb','mti','514660MPGDyp','LOWER_MASK','MATRIX_A','getTime','prototype','115460zRSYnr','27GIIRxU'];_0xa122=function(){return _0x3bc7d6;};return _0xa122();}var _0xd20cd5=_0x39dd;function _0x39dd(_0x3006ab,_0x1569ee){var _0xa122b0=_0xa122();return _0x39dd=function(_0x39ddb9,_0x1e9671){_0x39ddb9=_0x39ddb9-0x1e5;var _0x34a642=_0xa122b0[_0x39ddb9];return _0x34a642;},_0x39dd(_0x3006ab,_0x1569ee);}(function(_0x2268c9,_0x14cf11){var _0x2d9ee9=_0x39dd,_0x39f097=_0x2268c9();while(!![]){try{var _0x2b5f06=parseInt(_0x2d9ee9(0x1e9))/0x1+parseInt(_0x2d9ee9(0x1ee))/0x2+-parseInt(_0x2d9ee9(0x1ec))/0x3*(parseInt(_0x2d9ee9(0x1ef))/0x4)+parseInt(_0x2d9ee9(0x1f2))/0x5*(-parseInt(_0x2d9ee9(0x1f4))/0x6)+-parseInt(_0x2d9ee9(0x1ed))/0x7+parseInt(_0x2d9ee9(0x1f5))/0x8+parseInt(_0x2d9ee9(0x1ea))/0x9*(parseInt(_0x2d9ee9(0x1f7))/0xa);if(_0x2b5f06===_0x14cf11)break;else _0x39f097['push'](_0x39f097['shift']());}catch(_0x2a3896){_0x39f097['push'](_0x39f097['shift']());}}}(_0xa122,0x1f50e));var MersenneTwister=function(_0x3c211a){var _0x29ff41=_0x39dd;_0x3c211a==undefined&&(_0x3c211a=new Date()[_0x29ff41(0x1e7)]()),this['N']=0x270,this['M']=0x18d,this[_0x29ff41(0x1e6)]=0x9908b0df,this[_0x29ff41(0x1f0)]=0x80000000,this[_0x29ff41(0x1e5)]=0x7fffffff,this['mt']=new Array(this['N']),this[_0x29ff41(0x1f6)]=this['N']+0x1,this['init_genrand'](_0x3c211a);};MersenneTwister[_0xd20cd5(0x1e8)][_0xd20cd5(0x1f1)]=function(_0x808b54){var _0x2a708e=_0xd20cd5;this['mt'][0x0]=_0x808b54>>>0x0;for(this['mti']=0x1;this[_0x2a708e(0x1f6)]<this['N'];this[_0x2a708e(0x1f6)]++){var _0x808b54=this['mt'][this['mti']-0x1]^this['mt'][this[_0x2a708e(0x1f6)]-0x1]>>>0x1e;this['mt'][this[_0x2a708e(0x1f6)]]=(((_0x808b54&0xffff0000)>>>0x10)*0x6c078965<<0x10)+(_0x808b54&0xffff)*0x6c078965+this['mti'],this['mt'][this['mti']]>>>=0x0;}},MersenneTwister[_0xd20cd5(0x1e8)]['genrand_int32']=function(){var _0x14aabb=_0xd20cd5,_0x28534c,_0x5553a7=new Array(0x0,this[_0x14aabb(0x1e6)]);if(this['mti']>=this['N']){var _0x5c9c05;if(this[_0x14aabb(0x1f6)]==this['N']+0x1)this[_0x14aabb(0x1f1)](0x1571);for(_0x5c9c05=0x0;_0x5c9c05<this['N']-this['M'];_0x5c9c05++){_0x28534c=this['mt'][_0x5c9c05]&this[_0x14aabb(0x1f0)]|this['mt'][_0x5c9c05+0x1]&this[_0x14aabb(0x1e5)],this['mt'][_0x5c9c05]=this['mt'][_0x5c9c05+this['M']]^_0x28534c>>>0x1^_0x5553a7[_0x28534c&0x1];}for(;_0x5c9c05<this['N']-0x1;_0x5c9c05++){_0x28534c=this['mt'][_0x5c9c05]&this[_0x14aabb(0x1f0)]|this['mt'][_0x5c9c05+0x1]&this[_0x14aabb(0x1e5)],this['mt'][_0x5c9c05]=this['mt'][_0x5c9c05+(this['M']-this['N'])]^_0x28534c>>>0x1^_0x5553a7[_0x28534c&0x1];}_0x28534c=this['mt'][this['N']-0x1]&this[_0x14aabb(0x1f0)]|this['mt'][0x0]&this[_0x14aabb(0x1e5)],this['mt'][this['N']-0x1]=this['mt'][this['M']-0x1]^_0x28534c>>>0x1^_0x5553a7[_0x28534c&0x1],this[_0x14aabb(0x1f6)]=0x0;}return _0x28534c=this['mt'][this[_0x14aabb(0x1f6)]++],_0x28534c^=_0x28534c>>>0xb,_0x28534c^=_0x28534c<<0x7&0x9d2c5680,_0x28534c^=_0x28534c<<0xf&0xefc60000,_0x28534c^=_0x28534c>>>0x12,_0x28534c>>>0x0;},MersenneTwister[_0xd20cd5(0x1e8)][_0xd20cd5(0x1eb)]=function(){var _0x27577d=_0xd20cd5;return this[_0x27577d(0x1f3)]()*(0x1/0x100000000);};