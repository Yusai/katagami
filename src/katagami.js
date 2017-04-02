console.log('start app');

var iconContainer = document.getElementById('iconContainer');

document.getElementById('katagamiContainer').addEventListener('click', function() {
    this.style.display = 'none';
});

//https://developer.github.com/v3/
function foo(response) {
    console.log(response);
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
    var container = document.getElementById('katagamiContainer');
    container.style.background = 'white url("' + target.src + '") 0% 0% / 80px';
    container.style.display = '';
}