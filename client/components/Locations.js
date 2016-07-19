// export class Map extends React.component({
// 	componentDidUpdate(prevProps, prevState) {
// 	    if (prevProps.google !== this.props.google) {
// 	      this.loadMap();
// 	    }
// 	  }

// 	  loadMap() {
// 	  	if (this.props && this.props.google) {
// 	  	      // google is available
// 	  	      const {google} = this.props;
// 	  	      const maps = google.maps;

// 	  	      const mapRef = this.refs.map;
// 	  	      const node = ReactDOM.findDOMNode(mapRef);

// 	  	    let zoom = 14;
//             let lat = 37.774929;
//             let lng = -122.419416;
//             const center = new maps.LatLng(lat, lng);
//             const mapConfig = Object.assign({}, {
//               center: center,
//               zoom: zoom
//             })
//             this.map = new maps.Map(node, mapConfig);
// 	  	          }
// 	  	    }
// 	  }

// 	render() {
// 	    return (
// 	      <div ref='map'>
// 	        Loading map...
// 	      </div>
// 	    )
// 	  }
// })