import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
            ? <input
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangTitle}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )

}

export default EditableSpan