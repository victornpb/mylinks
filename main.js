var linksPopup;
var mainPopup;
var myUrlsArray = [
    "http://vitim.us",
    "http://oldblog.vitim.us",
    "http://vitim.com.br",
    "http://www.instructables.com/member/Vitim/",
].map((url) => { return {url, meta: 0};});

var listView;

var mainPopup;
function goTo(url) {
    if (mainPopup === undefined || mainPopup.window.closed) {
        openPopup();
    }
    mainPopup.window.location = url;
}

function openPopup() {
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
        left: ((window.screen.availWidth || window.screen.width) - (linksPopup.window.screenLeft + linksPopup.window.outerWidth)),
        top: 0,
        height: (window.screen.availHeight || window.screen.height),
        width: ((window.screen.availWidth || window.screen.width) - (linksPopup.window.screenLeft + linksPopup.window.outerWidth)),
    });
    

    if (mainPopup.window) {
        console.log(mainPopup);
    } else {
        alert('disable popup blocker');
    }
}

window.onload = function () {


    listView = new Vue({
        el: '#viewer',
        data: function () {
            return {
                name: 'asd',
                notes: 'asdjaoij',
                items: myUrlsArray
            }
        },
        methods: {
            remove(i) {
                this.items.splice(i, 1);
            }
        }
    });

    selectView = new Vue({
        el: '#popupcontent',
        data: function () {
            return {
                current: 0,
                items: myUrlsArray
            }
        },
        methods: {
            next(e) {
                console.log(e);
                if (this.current < this.items.length-1) this.current = this.current + 1;
            },
            prev(e) {
                console.log(e);
                if (this.current > 0) this.current = this.current - 1;
            },
            selectClick(e) {
                var i = parseInt(e.currentTarget.value);
                console.log(this.items[i]);

                goTo(this.items[i].url);
            },
            selectChange(e) {
                //this.items.splice(i, 1);
                var i = parseInt(e.currentTarget.value);
                console.log(this.items[i]);
                this.current = i;
            },
            flag(x) { 
                this.items[this.current].meta = x;
            }
        }
    });
    
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

        urls = urls.map(function (url, i) {
            return {
                url: url,
                meta: 0
            };
        });

        myUrlsArray = urls;
        listView.items = myUrlsArray;
        selectView.items = myUrlsArray;

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
            left: false,
            top: false,
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
            left: ((window.screen.availWidth || window.screen.width) / 3) ,
            top: false,
            height: (window.screen.availHeight || window.screen.height),
            width: ((window.screen.availWidth || window.screen.width) / 3)*2,
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
    
        
    // urlsSelect.onclick = function () {
        
    //         mainPopup = new Popup('', 'main', {
    //             minimizable: false,
    //             status: false,
    //             personalbar: false,
    //             location: false,
    //             toolbar: false,
    //             menubar: false,
    //             alwaysRaised: true,
    //             scrollbars: true,
    //             resizable: true,
    //             left: (window.screen.availWidth || window.screen.width) / 3,
    //             top: false,
    //             height: (window.screen.availHeight || window.screen.height),
    //             width: ((window.screen.availWidth || window.screen.width) / 3)*2,
    //         });

    //         if (mainPopup.window) {
    //             console.log(mainPopup);

    //             allowPopups.style.display = "none";

    //             start.disabled = true;

    //             mainPopup.onclose = function () {
    //                 start.disabled = false;
    //             };

    //             renderPopup(mainPopup.window);
    //         } else {
    //             console.error('Popup blocked by browser!');
    //             allowPopups.style.display = "";
    //         }  
    //     };
    
    //     urlsSelect.onchange = urlsSelect.onclick;
    



};