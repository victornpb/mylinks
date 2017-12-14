function Popup(url, strWindowName, options) {
    var self = this;

    var params = [];
    for (p in options) {
        var val = options[p];
        if (typeof val === 'boolean') {
            val = val ? 1 : 0;
        }
        params.push(p + '=' + val);
    }
    var strWindowFeatures = params.join(',');
    console.log(strWindowFeatures);
    var popup = window.open(url, strWindowName, strWindowFeatures);
    this.window = popup;

    //implement onclose
    var timer = setInterval(function () {
        if (popup && popup.closed) {
            clearInterval(timer);
            if (self.onclose) self.onclose();
        }
    }, 500);
}
Popup.prototype.close = function () { 
    if(this.window) this.window.close();
}