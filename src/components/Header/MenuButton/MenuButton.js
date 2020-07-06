import { React } from 'react';

const MenuButton = ({  type, id, className, name, disabled, children }) => (
    <button 
        type={ type }
        id={ id }
        className={ className }
        name={ name }
        disabled={ disabled }
    >
        { children }
    </button>
)

export default MenuButton;