import React from 'react';
import { useTheme } from './ThemeContext';

const SomeComponent = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div>
            <p>Current theme: {theme}</p>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};

export default SomeComponent;