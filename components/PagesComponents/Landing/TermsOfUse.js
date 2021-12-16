import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Вот есть эта функция с самим диалогом мне ее нужно как-то передать в Footer, пробывал как пропс не получилось.

const Terms = (props) =>  {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >.
            <DialogTitle id="scroll-dialog-title">Пользовательское соглашение</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    {[new Array(1)]
                        .map(
                            () => `1. Общие положения Пользовательского соглашения
1.1. В настоящем документе и вытекающих или связанным с ним отношениях Сторон
применяются следующие термины и определения:
а) Платформа — программно-аппаратные средства, интегрированные с Сайтом
Администрации;
б) Пользователь — дееспособное физическое лицо, присоединившееся к настоящему
Соглашению в собственном интересе либо выступающее от имени и в интересах
представляемого им юридического лица.
`,
                        )
                        .join('\n')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Отклонить</Button>
                <Button onClick={handleClose}>Принять</Button>
            </DialogActions>
        </Dialog>

    );
}
export default Terms
