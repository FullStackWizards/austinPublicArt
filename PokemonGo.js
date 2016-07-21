'use strict';

var Pokeio = require('./node_modules/pokemon-go-node-api/poke.io');

//Set environment variables or replace placeholder text
var location = {
    type: 'name',
    name: process.env.PGO_LOCATION || 'Times Square'
};

var username = process.env.PGO_USERNAME || 'granitepapyrus';
var password = process.env.PGO_PASSWORD || 'wordpass';
var provider = process.env.PGO_PROVIDER || 'ptc';

Pokeio.init(username, password, location, provider, function(err) {
    if (err) throw err;

    console.log('[i] Current location: ' + Pokeio.playerInfo.locationName);
    console.log('[i] lat/long/alt: : ' + Pokeio.playerInfo.latitude + ' ' + Pokeio.playerInfo.longitude + ' ' + Pokeio.playerInfo.altitude);

    Pokeio.GetProfile(function(err, profile) {
        if (err) throw err;

        console.log('[i] Username: ' + profile.username);
        console.log('[i] Poke Storage: ' + profile.poke_storage);
        console.log('[i] Item Storage: ' + profile.item_storage);

        var poke = 0;
        if (profile.currency[0].amount) {
            poke = profile.currency[0].amount;
        }

        console.log('[i] Pokecoin: ' + poke);
        console.log('[i] Stardust: ' + profile.currency[1].amount);


        Pokeio.Heartbeat(function(err,hb) {
            console.log(hb)
            if(err) {
                console.log(err);
            }

            for (var i = hb.cells.length - 1; i >= 0; i--) {
                if(hb.cells[i].NearbyPokemon[0]) {
                    //console.log(Pokeio.pokemonlist[0])
                    var pokemon = Pokeio.pokemonlist[parseInt(hb.cells[i].NearbyPokemon[0].PokedexNumber)-1]
                    console.log('[+] There is a ' + pokemon.name + ' at ' + hb.cells[i].NearbyPokemon[0].DistanceMeters.toString() + ' meters')
                }
            }

        });

    });
});