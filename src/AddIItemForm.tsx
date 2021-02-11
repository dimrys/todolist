import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

function AddItemForm(props:AddItemFormPropsType) {
    let [titleTask, setTitleTask] = useState<string>('')
    let [error, setError]  = useState<string| null>( null)

    const onChangTitleTask = (e: ChangeEvent<HTMLInputElement> ) => {
        setTitleTask(e.currentTarget.value)
        setError(null)
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
            <input
                value={titleTask}
                onChange={onChangTitleTask}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )

}

export default AddItemForm