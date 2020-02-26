import React, { Component } from "react";
import "./App.css";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import Overlay from "pigeon-overlay";
import axios from "axios";

class App extends Component {
  state = {
    hasLocation: false,
    latlng: {
      lat: 51.505,
      lng: -0.09
    },
    dep: null,
    prixMin: 0,
    prixMax: 1000000,
    surfaceMin: 0,
    SurfaceMax: 300,
    nbrPieceMin: 0,
    nbrPieceMax: 4,
    tabAppartement: []
  };

  handleChange = event => {
    console.log(event.target.name);
    if (event.target.name === "dep") {
      this.setState({ dep: event.target.value });
    } else if (event.target.name === "prixMin") {
      this.setState({ prixMin: event.target.value });
    } else if (event.target.name === "prixMax") {
      this.setState({ prixMax: event.target.value });
    } else if (event.target.name === "surfaceMin") {
      this.setState({ surfaceMin: event.target.value });
    } else if (event.target.name === "nbrPieceMin") {
      this.setState({ nbrPieceMin: event.target.value });
    } else if (event.target.name === "nbrPieceMax") {
      this.setState({ nbrPieceMax: event.target.value });
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    this.getInfo();
  };
  handleMarkerClick = ({ event, payload, anchor }) => {
    console.log(`Marker #${payload} clicked at: `, anchor);
  };
  getInfo = async () => {
    try {
      const response = await axios.post("http://localhost:3001/foundHouse", {
        dep: this.state.dep,
        SurfaceMax: this.state.SurfaceMax,
        surfaceMin: this.state.surfaceMin,
        prixMin: this.state.prixMin,
        prixMax: this.state.prixMax,
        nbrPieceMin: this.state.nbrPieceMin,
        nbrPieceMax: this.state.nbrPieceMax
      });

      console.log(response.data);
      this.setState({ tabAppartement: response.data });
    } catch (error) {
      console.log(error.message);
      this.setState({ notFound: true });
    }
  };

  render() {
    return (
      <>
        <div className="contenaire">
          <div className="map-contenaire">
            <Map center={[48.85790400439863, 2.358842071208555]} zoom={10}>
              {this.state.tabAppartement.map((list, index) => {
                if (this.state.tabAppartement.length > 0) {
                  return (
                    <Marker
                      key={index}
                      anchor={[list.location.lat, list.location.lng]}
                      payload={1}
                      onClick={this.handleMarkerClick}
                    />
                  );
                }
              })}

              <Overlay
                anchor={[548.85790400439863, 2.358842071208555]}
                offset={[120, 79]}
              >
                <img src="pigeon.jpg" width={240} height={158} alt="" />
              </Overlay>
            </Map>
          </div>
          <div>
            <from>
              <input
                className="form-control"
                type="text"
                placeholder="départements 93 seine-saint-denis(non modifiable)"
                name="dep"
                onChange={this.handleChange}
              />

              <input
                className="form-control"
                type="text"
                placeholder="Prix Min (defaut 0)"
                name="prixMin"
                onChange={this.handleChange}
              />

              <input
                className="form-control"
                type="text"
                placeholder="Prix Max(defaut 1.000.000)"
                name="prixMax"
                onChange={this.handleChange}
              />
              <input
                className="form-control"
                type="text"
                placeholder="Surface Min (defaut 0)"
                name="surfaceMin"
                onChange={this.handleChange}
              />

              <input
                className="form-control"
                type="text"
                placeholder="Surface Max (defaut 300)"
                name="surfaceMax"
                onChange={this.handleChange}
              />
              <input
                className="form-control"
                type="text"
                placeholder="Nombre de piece Min (defaut 0)"
                name="nbrPieceMin"
                onChange={this.handleChange}
              />

              <input
                className="form-control"
                type="text"
                placeholder="Nombre de piece Max(defaut 4)"
                name="nbrPieceMax"
                onChange={this.handleChange}
              />
              <button
                type="submit"
                class="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Valider
              </button>
            </from>
          </div>
        </div>
        {this.state.tabAppartement.length === 0 ? (
          <div className="No_product">
            <p>Aucun Produit disponible</p>
          </div>
        ) : (
          <div className="container-data">
            <div className="row" style={{ justifyContent: "space-between" }}>
              {this.state.tabAppartement.map((list, index) => {
                if (this.state.tabAppartement.length > 0) {
                  return (
                    <div
                      className="card"
                      key={index}
                      style={{ width: "14rem" }}
                    >
                      <img
                        className="card-img-top"
                        src={list.images.thumb_url}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <p className="card-text">{list.location.city}</p>
                        <p className="card-text">{list.price[0] + " €"}</p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default App;
