import React from 'react';
import './ColorDisplay.css';

const ColorDisplay = ({ color }) => {
    const [copyFeedback, setCopyFeedback] = React.useState(null);

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyFeedback(type);
            setTimeout(() => setCopyFeedback(null), 2000);
        });
    };

    // Calculate if text should be dark or light based on background luminance
    const getTextColor = (hex) => {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return yiq >= 128 ? '#333333' : 'rgba(255, 255, 255, 0.9)';
    };

    const textColor = getTextColor(color.hex);

    return (
        <div className="color-display" style={{ backgroundColor: color.hex }}>
            <div className="color-info fade-in" style={{ color: textColor }}>
                <h1 className="color-name">{color.name}</h1>
                <p className="color-pinyin">{color.pinyin}</p>
                <div className="color-codes">
                    <span
                        className="code-item"
                        onClick={() => copyToClipboard(color.hex, 'hex')}
                        title="Click to copy HEX"
                    >
                        {color.hex}
                        {copyFeedback === 'hex' && <span className="copy-tooltip">Copied!</span>}
                    </span>
                    <span
                        className="code-item"
                        onClick={() => copyToClipboard(color.rgb, 'rgb')}
                        title="Click to copy RGB"
                    >
                        RGB: {color.rgb}
                        {copyFeedback === 'rgb' && <span className="copy-tooltip">Copied!</span>}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ColorDisplay;
