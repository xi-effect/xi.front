import { EditorState } from "draft-js";
import * as React from "react";

export type EditorApi = {
  state: EditorState;
  onChange: (state: EditorState) => void;
};

export const useEditor = (): EditorApi => {
  const [state, setState] = React.useState(() => EditorState.createEmpty());

  return React.useMemo(
    () => ({
      state,
      onChange: setState,
    }),
    [state],
  );
};
