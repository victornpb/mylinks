var listView;

var linksPopup;
var mainPopup;


var param = new ParamManager();


var data = {
    index: 0,
    name: '',
    note: '',
    urls: [],
};




function goTo(url) {
    if (mainPopup === undefined || mainPopup.window.closed) {
        openSitePopup();
    }
    mainPopup.window.location = url;
}

function openSitePopup() {

    mainPopup = new Popup('wait.html', 'site', {
        minimizable: false,
        status: false,
        personalbar: false,
        location: false,
        toolbar: false,
        menubar: false,
        alwaysRaised: true,
        scrollbars: true,
        resizable: true,
        left: ((linksPopup.window.screenLeft) + linksPopup.window.outerWidth),
        top: 0,
        height: (window.screen.availHeight || window.screen.height),
        width: ((linksPopup.window.screen.availWidth || linksPopup.window.screen.width) - ((linksPopup.window.screenLeft - linksPopup.window.screen.availLeft) + linksPopup.window.outerWidth)),
    });


    if (mainPopup.window) {
        console.log(mainPopup);
    } else {
        alert('disable popup blocker');
    }
}

window.onload = function () {

    //close popups if closing main window
    window.addEventListener('beforeunload', function (e) {
        console.log('closing main window', e);
        if (linksPopup) linksPopup.close();
        if (mainPopup) mainPopup.close();
    });




    loadBtn.onclick = function () {
        var urls = [];
        inputUrls.value.split(/\n/).forEach(function (line) {
            line = line.trim();
            if (line.match(/^https?:\/\/.+/)) {
                urls.push(line);
            }
        });

        data.urls = urls.map(function (url, i) {
            return {
                url: url,
                meta: 0
            };
        });

        // myUrlsArray = urls;
        // listView.items = myUrlsArray;
        // selectView.items = myUrlsArray;

        //TODO show loaded urls in a list
    };




    start.onclick = function () {

        linksPopup = new Popup('', 'audit', {
            minimizable: false,
            status: false,
            personalbar: false,
            location: false,
            toolbar: false,
            menubar: false,
            alwaysRaised: true,
            scrollbars: true,
            resizable: true,
            left: 0,
            top: 0,
            height: (window.screen.availHeight || window.screen.height),
            width: (window.screen.availWidth || window.screen.width) / 3,
        });

        if (linksPopup.window) {
            console.log(linksPopup);

            allowPopups.style.display = "none";

            start.disabled = true;

            linksPopup.onclose = function () {
                start.disabled = false;
            };

            renderPopup(linksPopup.window);
        } else {
            console.error('Popup blocked by browser!');
            allowPopups.style.display = "";
        }

    };

    function renderPopup(p) {
        p.document.body.appendChild(popupcontent.firstElementChild);
    }


    listView = new Vue({
        el: '#viewer',
        data: function () {
            return data;
        },
        methods: {
            remove(i) {
                this.urls.splice(i, 1);
            }
        }
    });

    selectView = new Vue({
        el: '#popupcontent',
        data: function () {
            return data;
        },
        methods: {
            next(e) {
                console.log(e);
                if (this.index < this.urls.length - 1) this.index = this.index + 1;
            },
            prev(e) {
                console.log(e);
                if (this.index > 0) this.index = this.index - 1;
            },
            selectClick(e) {
                var i = parseInt(e.target.value);
                console.log(this.urls[i]);

                goTo(this.urls[i].url);
            },
            selectChange(e) {
                //this.urls.splice(i, 1);
                var i = parseInt(e.target.value);
                console.log(this.urls[i]);
                this.index = i;
            },
            flag(x) {
                this.urls[this.index].meta = x;
            }
        }
    });




    function updateParams() {
        param.setAll({
            i: data.index,
            name: data.name,
            note: data.note,
            meta: data.urls.map((obj,i) => data.urls[i].meta || 0),
            urls: data.urls.map((obj) => obj.url),
        });
    }

    function readParams() {
        
        var p = param.getAll();
        data.index = p.i || 0;
        data.name = p.name;
        data.note = p.note;
    
        if (p.urls) {
            data.urls = p.urls.map((url, i) => {
                return {
                    url: url,
                    meta: p.meta[i]
                };
            });
        }


    }

    readParams();

    listView.$watch('index', updateParams);
    listView.$watch('name', updateParams);
    listView.$watch('note', updateParams);
    listView.$watch('urls', updateParams);
    listView.$watch('urls.meta', updateParams);



};