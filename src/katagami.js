console.log('start app');

//check Edge
//http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;
//
if (isEdge) {
    document.getElementById('edge').style.display = '';
}

var iconContainer = document.getElementById('iconContainer');

document.getElementById('katagamiContainer').addEventListener('click', function() {
    document.getElementById('katagami').style.display = 'none';
});

document.getElementById('rotate').addEventListener('click', function() {
    var container = document.getElementById('katagamiContainer');
    switch (container.className) {
        case '' :
            var tmp = 'deg90';
            break;
        case 'deg90' :
            var tmp = 'deg180';
            break;
        case 'deg180' :
            var tmp = 'deg270';
            break;
        case 'deg270' :
            var tmp = '';
            break;
    }
    if (container.className) {
        container.classList.remove(container.className);
    }
    if (tmp) {
        container.classList.add(tmp);
    }
});

var bgSize = {
    init: function() {
        this.sizeMax = 10;//Math.round(window.innerWidth / 80)
        this.size = Math.round(this.sizeMax / 2);
    },
    add: function(num) {
        this.size += num;
        if (this.size <= 0) {
            this.size = 1;
        }
        if (this.size > this.sizeMax) {
            this.size = this.sizeMax;
        }
        document.getElementById('katagamiContainer').style.backgroundSize = Math.round(100 / this.size) + 'vw';
    }
};

document.getElementById('size-up').addEventListener('click', function() {
    bgSize.add(-1);
});
document.getElementById('size-down').addEventListener('click', function() {
    bgSize.add(1);
});

//https://developer.github.com/v3/
function foo(response) {
    console.log(response);
    //
    bgSize.init();
    //
    function* generator() {
        yield* response.data;
    }
    var files = generator();
    function loadSVG() {
        var tmp = files.next();
        if (tmp.done) return;
        //
        var fileName = "https://yusai.github.io/katagami/" + tmp.value.path;
        var img = document.createElement('img');
        img.addEventListener('click', function() {
            showKatagami(this);
        });
        img.onload = function() {
            var li = document.createElement('li');
            li.appendChild(img);
            iconContainer.appendChild(li);
            loadSVG();
        };
        img.src = fileName;
    }
    loadSVG();
}

function showKatagami(target) {
    //
    document.getElementById('katagamiContainer').style.background = 'white url("' + target.src + '") 0% 0% / ' + Math.round(100 / bgSize.size) + 'vw';
    //
    var tmp = target.src.split('/');
    var dlContainer = document.getElementById('download');
    dlContainer.setAttribute('href', target.src);
    dlContainer.setAttribute('download', tmp[tmp.length - 1])
    //
    document.getElementById('katagami').style.display = '';
}