import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}
export const AddItemForm = React.memo((props:AddItemFormPropsType) => {
    console.log("AddItemForm called")
    let [titleTask, setTitleTask] = useState<string>('')
    let [error, setError]  = useState<string| null>( null)

    const onChangTitleTask = (e: ChangeEvent<HTMLInputElement> ) => {
        if(error != null) {
            setError(null)
        }
        setTitleTask(e.currentTarget.value)

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {if(e.key === 'Enter') addItem()}

    const addItem = () => {
        const trimmedTitle = titleTask.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        } else  {
            setError("Title is required")
        }
        setTitleTask("")
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={titleTask}
                onChange={onChangTitleTask}
                onKeyPress={onKeyPressHandler}
                helperText={!!error ? "Title is required!" : ""}
                label={"Title"}
                error={!!error}
            />
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )

})


