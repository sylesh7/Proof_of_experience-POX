import React from 'react';
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
  };
  onRegister: (title: string) => void;
}

const StyledEventCard: React.FC<EventCardProps> = ({ event, onRegister }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__image">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
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
  }

  .card__date {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 1rem;
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
    margin-bottom: 1.5rem;
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