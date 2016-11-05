# Austin Art

App for exploring and viewing local art and artists in Austin, Texas.
This project was originally inherited from FullStackWizards, with new features and improvements added by the GraniteParchmentShears team.

[Austin Art](http://austinpublicart.herokuapp.com)

## Starting on localhost
    git clone https://github.com/FullStackWizards/austinPublicArt.git
    git cd austinPublicArt
    npm install 

 If art work will not load change `line 23` in `server/main.js` to `db.art.find()`
 There is an issue with Pmongo that causes an error on some machines to not work with `db.collection('collection_name')`

 When deploying you will need to switch it over to `db.collection('art').find()`

## Technology

* React
* Express
* Mongo
* Bootstrap
* Passport
* Promised Mongo
* React Modal
* React Slick
* React Gmaps
* Google Maps React
* React Search Input

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Improvements include:

* Vastly improved load times of images on page transitions by elimination of
redundant database queries
* A locations page which displays the locations of all Austin Public Art
pieces in Austin
* A map in each artwork's modal detailing its specific location in Austin
* Revamped design aesthetic and more streamlined, intuitive UX
* User authentication with Passport
* Functionality to view, search and filter artists


## Improvements made by GraniteParchmentShears:

* [Amanda Fillip](https://github.com/afillip)
* [Mike Fleming](https://github.com/mikemfleming)
* [Tom LeConey](https://github.com/theTSLC)
* [Shane McQuerter](https://github.com/Shanetou)
* [Kenny Torng](https://github.com/ktorng)


## Project inherited by FullStackWizards:

* Caleb Anderson @calebanderson2014
* Carlo DiLorenzo @dilorc2
* Travers Pinkerton @traverspinkerton
* David Lewallen @davidlewallen
* Jordan Campbell @jc14

## License
Austin Public Art uses the (MIT License as defined by OpenSource.org)[http://opensource.org/licenses/MIT].
This repository's copy of the license is [here](./LICENSE.md).

