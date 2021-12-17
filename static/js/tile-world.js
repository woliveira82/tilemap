var xhttp = new XMLHttpRequest();
var generate_button = document.getElementById('generate-map');
var tilesetImage = new Image();
tilesetImage.src = '/static/images/walls.png';
var canvas = document.getElementById('main');
var ctx = canvas.getContext('2d');
var tileSize = 8;
var imageNumTiles = 4;

function drawImage (ground, width, height) {
    for (var r = 0; r < width; r++) {
        for (var c = 0; c < height; c++) {
            var tile = ground[ r ][ c ];
            var tileRow = (tile / imageNumTiles) | 0;
            var tileCol = (tile % imageNumTiles) | 0;
            ctx.drawImage(tilesetImage, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (c * tileSize), (r * tileSize), tileSize, tileSize);
        }
    }
}

generate_button.addEventListener('click', function(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    event.preventDefault();
    let height = document.getElementById('height').value;
    let width = document.getElementById('width').value;
    let rooms = document.getElementById('rooms').value;
    let halls = document.getElementById('halls').value;
    let type = document.getElementById('type').value;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            drawImage(response.map, width, height);
        }
    };
    xhttp.open('GET', `/maps?height=${height}&width=${width}&rooms=${rooms}&halls=${halls}&type=${type}`, true);
    xhttp.send();
}, false);
