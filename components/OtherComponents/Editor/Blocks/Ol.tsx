/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import {
  Button,
  ListItemText,
  TextField,
  List,
  IconButton,
} from "@mui/material";
import * as React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type OlProps = {
  // item: string;
  // children: React.ReactElement;
};

const Ol: React.FC<OlProps> = () => {
  const [lineNumber, setLineNumber] = React.useState<String[]>([]);
  const [newLine, setNewLine] = React.useState<String>("");
  const [isEdit, setIsEdit] = React.useState<Boolean>(true);
  const [onHover, setOnHover] = React.useState<number>(0);

  const addPressHandler = () => {
    setLineNumber([...lineNumber, newLine]);
    setNewLine("");
  };
  const onChangeHandler = (event: {
    target: { value: React.SetStateAction<String> };
  }) => {
    setNewLine(event.target.value);
  };
  const delLineHandler = (ind: number) => {
    setLineNumber(lineNumber.filter((item, index) => index !== ind));
  };

  const closeEditHandler = () => {
    setIsEdit(false);
  };

  const openEditHanlder = () => {
    if (!isEdit) {
      setIsEdit(true);
    }
  };

  return (
    <div onClick={openEditHanlder} role="button" aria-hidden>
      <List>
        {lineNumber.map((text, index) => (
          <div
            key={index}
            style={{ display: "flex", flexDirection: "row" }}
            onMouseEnter={() => setOnHover(index + 1)}
            onMouseLeave={() => setOnHover(0)}
          >
            <ListItemText>{`${index + 1}. ${text}`}</ListItemText>
            <IconButton
              style={{ opacity: onHover === index + 1 ? 1 : 0 }}
              onClick={() => delLineHandler(index)}
              sx={{ "&:hover": { color: "red" } }}
              size="small"
            >
              <DeleteForeverIcon />
            </IconButton>
          </div>
        ))}
      </List>
      {isEdit && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <TextField
            label="Текст"
            color="secondary"
            variant="outlined"
            focused
            value={newLine}
            onChange={onChangeHandler}
            sx={{ "-webkit-flex-direction": "row" }}
          />
          <div
            style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}
          >
            <Button
              variant="contained"
              onClick={addPressHandler}
              size="small"
              sx={{ marginBottom: 0.4, color: "#121212" }}
            >
              Добавить
            </Button>
            <Button
              variant="contained"
              onClick={closeEditHandler}
              size="small"
              sx={{ color: "#121212" }}
            >
              Подтвердить
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Ol;
