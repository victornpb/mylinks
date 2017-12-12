 function Popup(url, strWindowName, options) {
     var params = [];
     for (p in options) {
         var val = options[p];
         if (typeof val === 'boolean') {
             val = val ? 1 : 0;
         }
         params.push(p + '=' + val);
     }
     var strWindowFeatures = params.join(',');
     var popup = window.open(url, strWindowName, strWindowFeatures);
     this.window = popup;
 }

 Array.prototype.random = function () {
     return this[Math.floor((Math.random() * this.length))];
 };

