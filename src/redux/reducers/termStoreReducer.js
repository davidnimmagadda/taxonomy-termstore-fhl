import types from "../actions/actionTypes";
import initialState from "./initialState";

export default function termStoreReducer(
  state = initialState.termstoreChildren,
  action
) {
  switch (action.type) {
    case types.LOAD_TERM_CHILDREN_SUCCESS: {
      if (state.length == 0)
        return [
          {
            name: action.term.id,
            target: "_blank",
            isExpanded: true,
            links: action.term.children.map(v => {
              return { name: v, target: "_blank", isExpanded: true };
            })
          }
        ];

      const newstate = JSON.parse(JSON.stringify(state));
      let currState = newstate;
      action.term.id.split(":").forEach(p => {
        let obj = currState.find(v => v.name.endsWith(p));
        if (obj) {
          if (!obj.links) obj.links = [];
          currState = obj.links;
        }
      });
      action.term.children.forEach(v =>
        currState.push({ name: v, target: "_blank", isExpanded: true })
      );

      return newstate;
    }
    default:
      return state;
  }
}
