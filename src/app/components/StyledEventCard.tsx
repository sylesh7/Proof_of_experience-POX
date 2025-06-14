import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import StyledButton from './StyledButton';

interface EventCardProps {
  event: {
    id: number;
    month: string;
    day: string;
    weekday: string;
    title: string;
    location: string;
    type: string;
    temperature: string;
    daysAhead: string;
    image: string;
    description: string;
  };
  onRegister: (title: string) => void;
}

const StyledEventCard: React.FC<EventCardProps> = ({ event, onRegister }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <StyledWrapper>
      <div className="card">
        <div className={`card__image ${imageLoaded ? 'loaded' : 'loading'}`}>
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={event.id <= 3}
            loading={event.id <= 3 ? "eager" : "lazy"}
            onLoad={() => setImageLoaded(true)}
            quality={100}
          />
          <div className="card__date">
            <p className="text-sm">{event.month}</p>
            <p className="text-4xl font-bold">{event.day}</p>
            <p className="text-sm">{event.weekday}</p>
          </div>
        </div>
        <div className="card__content">
          <span className="card__title">{event.title}</span>
          <div className="card__details">
            <div className="card__detail">
              <span>📍 {event.location}</span>
              <span>• {event.type}</span>
            </div>
            <div className="card__info">
              <p>{event.daysAhead}</p>
              <p>{event.temperature}</p>
            </div>
          </div>
          <p className="card__description">{event.description}</p>
          <StyledButton onClick={() => onRegister(event.title)}>
            Register
          </StyledButton>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 100%;
    background: #fff;
    border: 6px solid #000;
    box-shadow: 12px 12px 0 #000;
    transition: transform 0.3s, box-shadow 0.3s;
    overflow: hidden;
  }

  .card:hover {
    transform: translate(-5px, -5px);
    box-shadow: 17px 17px 0 #000;
  }

  .card__image {
    position: relative;
    width: 100%;
    height: 200px;
    background-color: #f3f4f6;
    transition: opacity 0.3s ease-in-out;
  }

  .card__image.loading {
    opacity: 0;
  }

  .card__image.loaded {
    opacity: 1;
  }

  .card__date {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 1rem;
    z-index: 1;
  }

  .card__content {
    padding: 1.5rem;
  }

  .card__title {
    font-size: 1.5rem;
    font-weight: 900;
    color: #000;
    text-transform: uppercase;
    margin-bottom: 1rem;
    display: block;
    position: relative;
    overflow: hidden;
  }

  .card__title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 90%;
    height: 3px;
    background-color: #000;
    transform: translateX(-100%);
    transition: transform 0.3s;
  }

  .card:hover .card__title::after {
    transform: translateX(0);
  }

  .card__details {
    margin-bottom: 1rem;
  }

  .card__detail {
    display: flex;
    gap: 0.5rem;
    color: #666;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .card__info {
    color: #666;
    font-size: 0.875rem;
  }

  .card__description {
    color: #4a5568;
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @keyframes glitch {
    0% { transform: translate(2px, 2px); }
    25% { transform: translate(-2px, -2px); }
    50% { transform: translate(-2px, 2px); }
    75% { transform: translate(2px, -2px); }
    100% { transform: translate(2px, 2px); }
  }

  .glitch {
    animation: glitch 0.3s infinite;
  }
`;

export default StyledEventCard; 