import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeItem: (title:string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
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
            // ? <input
            //     value={title}
            //     autoFocus
            //     onBlur={offEditMode}
            //     onChange={onChangTitle}
            // />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )

}

export default EditableSpan