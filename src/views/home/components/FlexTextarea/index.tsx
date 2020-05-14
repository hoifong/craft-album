import React, { useState, useEffect } from 'react';
import styles from './index.module.sass';

export interface FlexTextareaProps {
    value?: string
    onChange?: (v: string) => void
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
}

const FlexTextarea: React.FC<FlexTextareaProps> = props => {

    const [value, setValue] = useState(props.value || '');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }

    const handlePropsValueChange = () => {
        if (props.value !== value) setValue(props.value || '');
    }

    const handleValueChange = () => {
        if (props.value !== value) props.onChange&&props.onChange(value);
    }

    useEffect(handleValueChange, [value]);

    useEffect(handlePropsValueChange, [props.value]);

    return (
        <div className={styles.container}>
            <pre>
                <span>{ value }</span>
            </pre>
            <textarea value={value} onClick={e => e.stopPropagation()} onFocus={props.onFocus} onChange={handleChange}/>
        </div>
    )
}
export default FlexTextarea;