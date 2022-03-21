/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Slider, Stack, Button, Typography, } from "@mui/material";
import { inject, observer } from "mobx-react"
import AvatarEditor from "react-avatar-editor"


const StepThree = inject("rootStore", "managmentSt", "contentSt")(observer(({ rootStore, managmentSt, contentSt }) => {
    const [value, setValue] = React.useState(10);

    React.useEffect(() => {
        if (managmentSt.moduleCreation.authorId != null && managmentSt.moduleCreation.imageId != null) {
            contentSt.loadImgFromServer(managmentSt.moduleCreation.authorId, managmentSt.moduleCreation.imageId)
            contentSt.setTemporaryImages("moduleCreation", contentSt.images[`${authorId}-${imageId}`])
        }
    }, [])

    const setEditorRef = React.useRef(null);

    const saveNewAvatar = () => {
        const canvas = setEditorRef.current.getImage()
        const img = canvas.toDataURL()
        if (managmentSt.moduleCreation.authorId === null && managmentSt.moduleCreation.imageId === null) {
            rootStore.fetchDataScr(`${rootStore.url}/wip/images/`, "POST", img).then(
                (data) => {
                    console.log("success", data, data["author-id"], data["image-id"])
                    managmentSt.setModuleCreation("authorId", data["author-id"])
                    managmentSt.setModuleCreation("imageId", data["image-id"])
                })
        }
        if (managmentSt.moduleCreation.authorId != null && managmentSt.moduleCreation.imageId != null) {
            rootStore.fetchDataScr(`${rootStore.url}/wip/images/${managmentSt.moduleCreation.imageId}/`, "PUT", img).then(
                () => {
                    console.log("success")
                })
        }
    }


    return (
        <Stack
            spacing={2}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
                width: "100%",
                p: 4,
                maxWidth: 800,
            }}
        >
            <Typography variant="Roboto500XiLabel" sx={{ cursor: "default", fontSize: 20 }}> Шаг 3. </Typography>
            <Typography> Добавьте изображение для вашего модуля </Typography>

            <AvatarEditor
                // onMouseUp={saveNewAvatar}
                ref={setEditorRef}
                image={contentSt.temporaryImages.moduleCreation == null ? "/illustrations/defaultModuleImg.png" : contentSt.temporaryImages.moduleCreation}
                width={320}
                height={180}
                border={25}
                borderRadius={0}
                color={[114, 137, 218, 0.6]} // RGBA
                scale={value / 10}
                rotate={0}
            />

            <label htmlFor="upload-photo">
                <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={(event) => {
                        console.log(event.target.files[0]);
                        contentSt.setTemporaryImages("moduleCreation", event.target.files[0]);
                    }}
                />
                <Button color="primary" variant="contained" component="span">
                    Загрузить изображение
                </Button>
            </label>

            <Typography> Изменить масштаб изображения </Typography>
            <Slider
                value={value}
                min={10}
                max={30}
                onChange={(event) => setValue(event.target.value)}
                // onChangeCommitted={saveNewAvatar}
                aria-labelledby="continuous-slider"
            />

            <Button
                onClick={saveNewAvatar}
                variant="contained"
                color="primary"
            >
                Сохранить изображение
            </Button>
            <Typography variant="Roboto500XiLabel" sx={{ cursor: "default", fontSize: 20, pt: 8 }}> Шаг 4. </Typography>
            <Typography> Теперь осталось только опубликовать модуль.  Прежде чем модуль станет доступен, он пройдёт модерацию. Это займёт некоторое время </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={null}
            >
                Опубликовать модуль
            </Button>
        </Stack>

    );
}))

export default StepThree