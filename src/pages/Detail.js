import React, { Component } from "react";
import { connect } from "react-redux";

// function Detail({ match }) {
//   console.log(match.params.id);
//   fetch(`https://swapi.dev/api/people/${match.params.id}`)
//     .then((res) => res.json())
//     .then((json) => {
//       console.log(json);
//       return <h1>{json.name}</h1>;
//     });
// }

// export default Detail;

class Detail extends Component {
  constructor() {
    super();
    this.state = { char: [], isLoaded: false };
  }

  componentDidMount() {
    let char = this.props.people[this.props.location.pathname.slice(1)];
    char.films = char.films.map(
      (film) => this.props.films[film.split("/").at(-2) - 1].title
    );

    char.starships = char.starships.map(
      (ship) => this.props.starships[ship.split("/").at(-2) - 1].name
    );

    char.species = char.species.map(
      (ship) => this.props.species[ship.split("/").at(-2) - 1].name
    );
    this.setState({ char, isLoaded: true });
    // fetch(`https://swapi.dev/api/people/${this.props.match.params.id}`)
    //   .then((res) => res.json())
    //   .then((json) => this.setState({ data: json, isLoaded: true }));
  }

  render() {
    const { isLoaded, char } = this.state;
    console.log(char);
    if (isLoaded) {
      return (
        <div>
          <h1>{char.name}</h1>
          <ul>
            <li>
              Movies:
              <ul>
                {char.films.map((film) => (
                  <li>{film}</li>
                ))}
              </ul>
            </li>
            <li>
              Spaceships:
              <ul>
                {char.starships.map((ship) => (
                  <li>{ship}</li>
                ))}
              </ul>
            </li>
            <li>
              Species:
              <ul>
                {char.species.map((spec) => (
                  <li>{spec}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = (state) => ({
  people: state.people,
  films: state.films,
  species: state.species,
  starships: state.starships,
});

export default connect(mapStateToProps)(Detail);
