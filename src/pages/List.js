import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class List extends Component {
  constructor() {
    super();
    this.state = {
      filters: { films: "", species: "", andor: "and" },
    };
  }

  async getData(url) {
    let data = [];

    while (true) {
      const response = await fetch(url);
      const json = await response.json();
      data = [...data, ...json.results];
      if (json.next) {
        url = json.next;
      } else {
        break;
      }
    }
    return data;
  }

  async componentDidMount() {
    if (this.props.people.length === 0) {
      const people = await this.getData("https://swapi.dev/api/people");
      const films = await this.getData("https://swapi.dev/api/films");
      const species = await this.getData("https://swapi.dev/api/species");
      const starships = await this.getData("https://swapi.dev/api/starships");

      this.props.dispatch({ type: "ADD_PEOPLE", payload: people });
      this.props.dispatch({ type: "ADD_FILMS", payload: films });
      this.props.dispatch({ type: "ADD_SPECIES", payload: species });
      this.props.dispatch({ type: "ADD_STARSHIPS", payload: starships });
    }
  }

  handleChange = (e) => {
    const filters = { ...this.state.filters, [e.target.name]: e.target.value };
    if (filters.films) {
    }
    if (filters.species) {
    }

    this.setState({
      ...this.state,
      filters: { ...this.state.filters, [e.target.name]: e.target.value },
    });
  };

  renderPeople = () => {
    const { filters } = this.state;
    const people = this.props.people.filter((p) =>
      filters.andor === "and"
        ? (filters.films ? p.films.includes(filters.films) : true) &&
          (filters.species ? p.species.includes(filters.species) : true)
        : (filters.films ? p.films.includes(filters.films) : true) ||
          (filters.species ? p.species.includes(filters.species) : true)
    );

    return (
      <ul>
        {people.map((char, index) => (
          <li key={index}>
            <Link to={`/${index}`}>{char.name}</Link>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { films, species } = this.props;

    return (
      <div>
        <label htmlFor="films">films</label>
        <select name="films" id="films" onChange={this.handleChange}>
          <option></option>
          {films.map((film) => (
            <option key={film.episode_id} value={film.url}>
              {film.title}
            </option>
          ))}
        </select>
        <div>
          <input
            id="and"
            type="radio"
            name="andor"
            value="and"
            defaultChecked
            onChange={this.handleChange}
          />
          <label htmlFor="and">and</label>
          <input
            id="or"
            type="radio"
            name="andor"
            value="or"
            onChange={this.handleChange}
          />
          <label htmlFor="or">or</label>
        </div>
        <label htmlFor="species">species</label>
        <select name="species" id="species" onChange={this.handleChange}>
          <option></option>
          {species.map((spec) => (
            <option key={spec.url} value={spec.url}>
              {spec.name}
            </option>
          ))}
        </select>
        {this.renderPeople()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  people: state.people,
  films: state.films,
  species: state.species,
});

export default connect(mapStateToProps)(List);
