define(function(require, exports, module)
{
	/**   
	* Simple HashMap   
	* @描述：高仿 Java HashMap 对应HashMap Api  
	* @author zhangzhenxing
	* @Date 2014-10-20
	* var m = new Map();   
	* m.put('key','value');   
	* ...   
	* var s = "";   
	* m.each(function(key,value,index){   
	*      s += index+":"+ key+"="+value+"/n";   
	* });   
	* alert(s);   

	*/ 

	module.exports.HashMap=function() 
	{     
		/** 存放键的数组(遍历用到) */    
		this.keys = new Array();     
		/** 存放数据 */    
		this.data = new Object();     

		/**   
		 * 放入一个键值对   
		 * @param {String} key   
		 * @param {Object} value   
		 */    
		this.put = function(key, value) {     
			 
            if(this.data[key] == null){     
				this.keys.push(key);
			}
			
//			if(this.keys.indexOf(key)<=-1)
//				this.keys.push(key);
           
//            if(!(key in this.keys)){
//                this.keys.push(key);
//            }
			this.data[key] = value;
		};     

		/**   
		 * 获取某键对应的值   
		 * @param {String} key   
		 * @return {Object} value   
		 */    
		this.get = function(key) {     
			return this.data[key];     
		}; 
		
		/*
		 * 通过索引获得值
		 * @param {type} index 
		 * @returns {_L16.module.exports.HashMap.data}
		 */
		this.getIndex=function(index)
		{
			var k = this.keys[index];     
			return this.data[k]; 
		};
		
		this.getKey=function(index)
		{
			var k = this.keys[index];     
			return k; 
		};

		/**   
		 * 删除一个键值对   
		 * @param {String} key   
		 */    
		this.remove = function(key) {     
			this.keys.remove(key);     
			this.data[key] = null;     
		};     

		/**   
		 * 遍历Map,执行处理函数   
		 *    
		 * @param {Function} 回调函数 function(key,value,index){..}   
		 */    
		this.each = function(fn){     
			if(typeof fn != 'function'){     
				return;     
			}     
			var len = this.keys.length;     
			for(var i=0;i<len;i++){     
				var k = this.keys[i];     
				fn(k,this.data[k],i);     
			}     
		};

		/**   
		 * 获取键值数组(类似Java的entrySet())   
		 * @return 键值对象{key,value}的数组   
		 */    
		this.entrys = function() {     
			var len = this.keys.length;     
			var entrys = new Array(len);     
			for (var i = 0; i < len; i++) {     
				entrys[i] = {     
					key : this.keys[i],     
					value : this.data[i]     
				};     
			}     
			return entrys;     
		};     

		/**   
		 * 判断Map是否为空   
		 */    
		this.isEmpty = function() {     
			return this.keys.length == 0;     
		};     

		/**   
		 * 获取键值对数量   
		 */    
		this.size = function(){     
			return this.keys.length;     
		};     

		/**   
		 * 重写toString    
		 */    
		this.toString = function(){     
			var s = "{";     
			for(var i=0;i<this.keys.length;i++,s+=','){     
				var k = this.keys[i];     
				s += k+"="+this.data[k];     
			}     
			s+="}";     
			return s;     
		};
		
		//得到用“，”拼接的value字符串
		this.toValueStr=function ()
		{
			var s = "";     
			for(var i=0;i<this.keys.length;i++)
			{     
				var k = this.keys[i];     
				s += this.data[k] + ",";
			}     
  
			return s;   
		};
	};

});