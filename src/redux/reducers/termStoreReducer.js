import types from "../actions/actionTypes";
import initialState from "./initialState";

export default function termStoreReducer(
  state = initialState.termstore,
  action
) {
  switch (action.type) {
    case types.LOAD_TERM_CHILDREN_SUCCESS: {
      if (state.termTree.length == 0)
        return {
          termTree: [
            {
              name: action.term.id,
              target: "_blank",
              isExpanded: true,
              links: action.term.children.map(v => {
                return { name: v, target: "_blank", isExpanded: true };
              })
            }
          ],
          currentTerm: action.term
        };

      const newstate = JSON.parse(JSON.stringify(state.termTree));
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

      return { termTree: newstate, currentTerm: action.term };
    }
    default:
      return state;
  }
}
