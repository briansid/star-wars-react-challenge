import React, { Component } from "react";

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
    this.state = { data: [], isLoaded: false };
  }

  componentDidMount() {
    fetch(`https://swapi.dev/api/people/${this.props.match.params.id}`)
      .then((res) => res.json())
      .then((json) => this.setState({ data: json, isLoaded: true }));
  }

  render() {
    const { isLoaded, data } = this.state;
    console.log(data);

    if (isLoaded) {
      return (
        <div>
          <h1>{data.name}</h1>
          <ul>
            <li>height: {data.height}</li>
            <li>mass: {data.mass}</li>
            <li>hair_color: {data.hair_color}</li>
            <li>skin_color: {data.skin_color}</li>
            <li>eye_color: {data.eye_color}</li>
            <li>birth_year: {data.birth_year}</li>
            <li>gender: {data.gender}</li>
          </ul>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default Detail;
