# Austin Public Art

A cool way to discover public art in Austin.
[Austin Public Art](http://austinpublicart.herokuapp.com)

## Starting on localhost
```git clone https://github.com/FullStackWizards/austinPublicArt.git
git cd austinPublicArt
npm install 
```

 If art work will not load change line 23 in server/main.js to db.art.find()
 There is an issue with Pmongo that causes an error on some machines to not work with db.collection('collection_name')

 When deploying you will need to switch it over to db.collection('art').find()

## Technology

* React
* Express
* Mongo
* Bootstrap
* React Modal
* React Slick
* Promised Mongo

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Credits

* Caleb Anderson @calebanderson2014
* Carlo DiLorenzo @dilorc2
* Travers Pinkerton @traverspinkerton
* David Lewallen @davidlewallen
* Jordan Campbell @jc14

## License
Austin Public Art uses the (MIT License as defined by OpenSource.org)[http://opensource.org/licenses/MIT].
This repository's copy of the license is [here](./LICENSE.md).

