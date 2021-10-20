import React, { Component } from "react";

class List extends Component {
  constructor() {
    super();
    this.state = {
      allpeople: [],
      people: [],
      films: [],
      species: [],
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
    const people = await this.getData("https://swapi.dev/api/people");
    const films = await this.getData("https://swapi.dev/api/films");
    const species = await this.getData("https://swapi.dev/api/species");

    this.setState({
      allpeople: people,
      people,
      films,
      species,
    });
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
      people: this.state.allpeople.filter((p) =>
        filters.andor == "and"
          ? (filters.films ? p.films.includes(filters.films) : true) &&
            (filters.species ? p.species.includes(filters.species) : true)
          : (filters.films ? p.films.includes(filters.films) : true) ||
            (filters.species ? p.species.includes(filters.species) : true)
      ),
    });
  };

  render() {
    const { people, films, species } = this.state;

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
        <ul>
          {people.map((char, index) => (
            <li key={index + 1}>
              <a href={index + 1}>{char.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
