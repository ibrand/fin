var WebTorrent = require('webTorrent');

var client = new WebTorrent();

client.seed('./ib.png', [], function(torrent){
    console.log('seeding .. ', torrent.magnetURI);
});