import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  SpeedDial,
  SpeedDialIcon,
  Fade,
  Radio,
  SpeedDialAction,
  Input,
  Divider,
  IconButton,
  Grid,
  useTheme,
  Tooltip,
  Checkbox,
  Typography,
} from "@mui/material";

import clsx from "clsx";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import QueueIcon from "@mui/icons-material/Queue";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TuneIcon from "@mui/icons-material/Tune";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AddIcon from "@mui/icons-material/Add";
import { inject, observer } from "mobx-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListIcon from "@mui/icons-material/List";
import LensIcon from "@mui/icons-material/Lens";

const ListItem = inject("managmentStore")(
  observer(({ managmentStore, show, index, indexA }) => {
    const values = managmentStore.pageCreation.components[index];
    const item = managmentStore.pageCreation.components[index].content[indexA];

    // console.log("props", props)
    const theme = useTheme();

    // Стили к тексту

    return (
      <Input
        placeholder="Добавить элемент в список"
        sx={{
          "& .MuiInput-input": {
            width: "100%",
            color: "text.main",
            fontSize: values.fontSize,
            fontStyle: values.fontStyle,
            textAlign: values.textAlign,
            fontWeight: values.fontWeight,
            textDecoration: values.textDecoration,
            lineHeight: "normal",
          },
        }}
        type="text"
        disableUnderline
        multiline
        fullWidth
        value={item.label}
        onChange={(event) =>
          managmentStore.setPageCreationContentComponents(
            index,
            indexA,
            "label",
            event.target.value
          )
        }
        startAdornment={
          <>
            {values.listType === "dotted" && (
              <LensIcon // список с точками
                sx={{
                  mr: "5px",
                  fontSize: "12px",
                }}
                color="main.dark"
              />
            )}
            {values.listType === "numberded" && (
              <Typography
                sx={{
                  mr: "5px",
                }}
              >
                {`${indexA + 1}.`}
              </Typography>
            )}
          </>
        }
        endAdornment={
          <>
            <Tooltip title="Удалить блок">
              <IconButton
                onClick={() =>
                  managmentStore.deleteComponentContent(index, indexA)
                }
                size="large"
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Перетащить блок">
              <IconButton size="large">
                <DragIndicatorIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      />
    );
  })
);

const ListList = inject("managmentStore")(
  observer(({ managmentStore, index }) => {
    // console.log("props", props)
    const theme = useTheme();
    const values = managmentStore.pageCreation.components[index];

    return (
      <>
        {values.content.map((item, indexA) => (
          <Draggable
            key={indexA.toString()}
            draggableId={`list-${indexA}`}
            index={indexA}
          >
            {(provided) => (
              <Grid
                // onMouseEnter={() =>
                //   managmentStore.setPageCreationContentComponents(
                //     index,
                //     indexA,
                //     "showIcons",
                //     true
                //   )
                // }
                // onMouseLeave={() =>
                //   managmentStore.setPageCreationContentComponents(
                //     index,
                //     indexA,
                //     "showIcons",
                //     false
                //   )
                // }
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                  width: "calc(100% - 4px)",
                }}
              >
                <ListItem index={index} indexA={indexA} />
              </Grid>
            )}
          </Draggable>
        ))}
      </>
    );
  })
);

const List = inject("managmentStore")(
  observer(({ managmentStore, index }) => {
    // Simulated props for the purpose of the example
    const values = managmentStore.pageCreation.components[index];
    // Simulated props for the purpose of the example
    // console.log("props", props)
    const theme = useTheme();

    const handleFontSizeUp = (event, newFormats) => {
      //console.log(index, "fontSize", newFormats)
      if (values.fontSize != 48)
        managmentStore.setPageCreationComponents(
          index,
          "fontSize",
          values.fontSize + 2
        );
    };

    const handleFontSizeDown = (event, newFormats) => {
      //console.log(index, "fontSize", newFormats)
      if (values.fontSize != 12)
        managmentStore.setPageCreationComponents(
          index,
          "fontSize",
          values.fontSize - 2
        );
    };

    const handleListType = (type) => {
      let newType = null;
      if (type === "dotted") newType = "numberded";
      else if (type === "numberded") {
        newType = "dotted";
      }
      managmentStore.setPageCreationComponents(index, "listType", newType);
    };

    const handleFontStyle = () => {
      if (values.fontStyle === "normal")
        return managmentStore.setPageCreationComponents(
          index,
          "fontStyle",
          "italic"
        );
      return managmentStore.setPageCreationComponents(
        index,
        "fontStyle",
        "normal"
      );
    };

    const handleFontWeight = () => {
      if (values.fontWeight === "normal")
        return managmentStore.setPageCreationComponents(
          index,
          "fontWeight",
          "bold"
        );
      return managmentStore.setPageCreationComponents(
        index,
        "fontWeight",
        "normal"
      );
    };

    const handleTextDecoration = () => {
      if (values.textDecoration === "none")
        return managmentStore.setPageCreationComponents(
          index,
          "textDecoration",
          "underline"
        );
      return managmentStore.setPageCreationComponents(
        index,
        "textDecoration",
        "none"
      );
    };

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };

    const listTypeIconSelect = (type) => {
      if (type === "numberded") return <FormatListNumberedIcon />;
      if (type === "dotted") return <FormatListBulletedIcon />;
    };

    const listTypeLabelSelect = (type) => {
      if (type === "numberded") return "Нумерованный список";
      if (type === "dotted") return "Не нумерованный список";
    };

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    function onDragEnd(result) {
      if (!result.destination) {
        return;
      }

      if (result.destination.index === result.source.index) {
        return;
      }

      const newState = reorder(
        values.content,
        result.source.index,
        result.destination.index
      );
      managmentStore.setContentToComponent(index, newState);
    }

    const textAlignIconSelect = (align) => {
      if (align === "left") return <FormatAlignLeftIcon />;
      if (align === "center") return <FormatAlignCenterIcon />;
      if (align === "right") return <FormatAlignRightIcon />;
      if (align === "justify") return <FormatAlignJustifyIcon />;
    };

    const textAlignLabelSelect = (align) => {
      if (align === "left") return "по левому краю";
      if (align === "center") return "по правому краю";
      if (align === "right") return "по центру";
      if (align === "justify") return "по ширине";
    };

    const handleTextAlign = (align) => {
      let newAlignment = null;
      if (align === "left") newAlignment = "center";
      else if (align === "center") newAlignment = "right";
      else if (align === "right") newAlignment = "justify";
      else if (align === "justify") newAlignment = "left";
      managmentStore.setPageCreationComponents(
        index,
        "textAlign",
        newAlignment
      );
    };

    const [hover, setHover] = React.useState(false);

    return (
      <>
        <Grid
          onFocus={() => setHover(true)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          onClick={() => managmentStore.setPageCreationList("selectId", index)}
        >
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
              width: "calc(100% - 4px)",
            }}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId={`list-${index}`}>
                {(provided) => (
                  <Grid
                    sx={{ width: "calc(100% - 4px)" }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <ListList index={index} />
                    {provided.placeholder}
                  </Grid>
                )}
              </Droppable>
            </DragDropContext>
          </Grid>
          <Fade
            in={hover}
            style={{ transformOrigin: "0 0 0" }}
            {...(hover ? { timeout: 1000 } : {})}
          >
            <Grid
              container
              direction="row"
              sx={{
                marginLeft: "auto",
              }}
            >
              <Tooltip title="Добавить">
                <IconButton
                  onClick={() =>
                    managmentStore.pushContentToComponent(index, "list")
                  }
                  size="large"
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <IconButton
                onClick={() => handleListType(values.listType)}
                sx={{
                  ml: 1,
                }}
                edge="end"
                size="large"
              >
                <Tooltip
                  title={`Изменить тип списка. Сейчас - ${listTypeLabelSelect(
                    values.listType
                  )}`}
                >
                  {listTypeIconSelect(values.listType)}
                </Tooltip>
              </IconButton>
              <IconButton
                onClick={() => handleFontSizeUp()}
                sx={{
                  ml: 1,
                  color: values.fontSize === 48 ? "error.main" : "text.main",
                }}
                edge="end"
                size="large"
              >
                <Tooltip title={`Увеличить шрифт. Сейчас - ${values.fontSize}`}>
                  <ZoomInIcon />
                </Tooltip>
              </IconButton>
              <IconButton
                onClick={() => handleFontSizeDown()}
                sx={{
                  ml: 1,
                  color: values.fontSize === 12 ? "error.main" : "text.main",
                }}
                edge="end"
                size="large"
              >
                <Tooltip title={`Уменьшить шрифт. Сейчас - ${values.fontSize}`}>
                  <ZoomOutIcon />
                </Tooltip>
              </IconButton>
              <IconButton
                onClick={() => handleTextAlign(values.textAlign)}
                sx={{ ml: 1, color: "text.main" }}
                edge="end"
                size="large"
              >
                <Tooltip
                  title={`Изменить выравнивание текста. Сейчас - ${textAlignLabelSelect(
                    values.textAlign
                  )}`}
                >
                  {textAlignIconSelect(values.textAlign)}
                </Tooltip>
              </IconButton>
              <IconButton
                onClick={() => handleFontWeight()}
                sx={{
                  ml: 1,
                  color:
                    values.fontWeight === "bold" ? "text.main" : "text.dark",
                }}
                edge="end"
                size="large"
              >
                <Tooltip title={`Полужирный`}>
                  <FormatBoldIcon />
                </Tooltip>
              </IconButton>
              <IconButton
                onClick={() => handleFontStyle()}
                sx={{
                  ml: 1,
                  color:
                    values.fontStyle === "italic" ? "text.main" : "text.dark",
                }}
                edge="end"
                size="large"
              >
                <Tooltip title={`Курсив`}>
                  <FormatItalicIcon />
                </Tooltip>
              </IconButton>
              <IconButton
                onClick={() => handleTextDecoration()}
                sx={{
                  ml: 1,
                  color:
                    values.textDecoration === "underline"
                      ? "text.main"
                      : "text.dark",
                }}
                edge="end"
                size="large"
              >
                <Tooltip title={`Подчёркнутый`}>
                  <FormatUnderlinedIcon />
                </Tooltip>
              </IconButton>
              <Tooltip title="Удалить блок">
                <IconButton
                  sx={{ marginLeft: "auto" }}
                  onClick={() => managmentStore.deleteComponent(index)}
                  size="large"
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Перетащить блок">
                <IconButton size="large">
                  <DragIndicatorIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Fade>
        </Grid>
      </>
    );
  })
);

export default List;
