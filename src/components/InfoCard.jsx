import React from 'react';
import './InfoCard.css';

const InfoCard = ({ color, onNext, onPrev }) => {
    return (
        <div className="info-card-container">
            <div className="info-content fade-in">
                <div className="poem-section">
                    <div className="poem-content vertical-text">
                        {color.poem.content}
                    </div>
                    <div className="poem-meta vertical-text">
                        <span className="poem-author">{color.poem.author}</span>
                        <span className="poem-title">《{color.poem.title}》</span>
                    </div>
                </div>

                <div className="description-section">
                    <p>{color.description}</p>
                </div>

                <div className="image-section">
                    <img src={color.imageUrl} alt={color.name} />
                </div>

                <div className="navigation">
                    <button onClick={onPrev} className="nav-btn">← Prev</button>
                    <button onClick={onNext} className="nav-btn">Next →</button>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
