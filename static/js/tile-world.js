var xhttp = new XMLHttpRequest();
var generate_button = document.getElementById('generate-map');
var tilesetImage = new Image();
tilesetImage.src = '/static/images/walls.png';
var canvas = document.getElementById('main');
var ctx = canvas.getContext('2d');
var tileSize = 8;
var imageNumTiles = 4;
var rowTileCount = document.getElementById('size').value;
var colTileCount = document.getElementById('size').value;

function drawImage (ground) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var r = 0; r < rowTileCount; r++) {
        for (var c = 0; c < colTileCount; c++) {
            var tile = ground[ r ][ c ];
            var tileRow = (tile / imageNumTiles) | 0;
            var tileCol = (tile % imageNumTiles) | 0;
            ctx.drawImage(tilesetImage, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (c * tileSize), (r * tileSize), tileSize, tileSize);
        }
    }
}

generate_button.addEventListener('click', function(event) {
    event.preventDefault();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            drawImage(response.map);
        }
    };
    xhttp.open('GET', '/maps', true);
    xhttp.send();
}, false);
