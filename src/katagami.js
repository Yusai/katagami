console.log('start app');

var iconContainer = document.getElementById('iconContainer');

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
