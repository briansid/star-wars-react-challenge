const initialState = {
  people: [],
  films: [],
  species: [],
  starships: [],
};

function starWarsReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_PEOPLE":
      return { ...state, people: action.payload };
    case "ADD_FILMS":
      return { ...state, films: action.payload };
    case "ADD_SPECIES":
      return { ...state, species: action.payload };
    case "ADD_STARSHIPS":
      return { ...state, starships: action.payload };
    default:
      return state;
  }
}

export default starWarsReducer;
