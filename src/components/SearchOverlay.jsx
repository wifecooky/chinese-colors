import React, { useState, useEffect, useRef } from 'react';
import { colors } from '../data/colors';
import './SearchOverlay.css';

const SearchOverlay = ({ onSelectColor, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const removeTones = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    useEffect(() => {
        if (!searchTerm.trim()) {
            setResults([]);
            return;
        }

        const lowerTerm = searchTerm.toLowerCase();
        const normalizedTerm = removeTones(lowerTerm);

        const filtered = colors.filter(color => {
            const normalizedPinyin = removeTones(color.pinyin.toLowerCase());
            return (
                color.name.includes(searchTerm) ||
                color.pinyin.toLowerCase().includes(lowerTerm) ||
                normalizedPinyin.includes(normalizedTerm) ||
                color.hex.toLowerCase().includes(lowerTerm)
            );
        });
        setResults(filtered);
    }, [searchTerm]);

    return (
        <div className="search-overlay fade-in">
            <button className="close-btn" onClick={onClose}>×</button>
            <div className="search-container">
                <input
                    ref={inputRef}
                    type="text"
                    className="search-input"
                    placeholder="搜索颜色 / Search Pinyin..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="search-results">
                    {results.map(color => (
                        <div
                            key={color.id}
                            className="search-result-item"
                            onClick={() => {
                                onSelectColor(color);
                                onClose();
                            }}
                        >
                            <div className="result-color-preview" style={{ backgroundColor: color.hex }}></div>
                            <div className="result-info">
                                <span className="result-name">{color.name}</span>
                                <span className="result-pinyin">{color.pinyin}</span>
                            </div>
                        </div>
                    ))}
                    {searchTerm && results.length === 0 && (
                        <div className="no-results">未找到相关颜色 / No colors found</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchOverlay;
