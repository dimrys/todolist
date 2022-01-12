import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeItem: (title:string) => void
}
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan called')
    const [editMode, setEditMode] = useState<boolean>(false )
    let [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeItem(title)
    }
    const onChangTitle = (e: ChangeEvent<HTMLInputElement> ) => {
        setTitle(e.currentTarget.value)

    }
    return (
        editMode
            ? <TextField
                variant={"standard"}
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangTitle}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )

})


