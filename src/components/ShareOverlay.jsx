import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon,
} from 'react-share';

function ShareOverlay({ isOpen, onClose, url, title }) {
  if (!isOpen) return null;

  const shareButtons = [
    {
      Button: FacebookShareButton,
      Icon: FacebookIcon,
      name: 'Facebook'
    },
    {
      Button: TwitterShareButton,
      Icon: TwitterIcon,
      name: 'Twitter'
    },
    {
      Button: LinkedinShareButton,
      Icon: LinkedinIcon,
      name: 'LinkedIn'
    },
    {
      Button: WhatsappShareButton,
      Icon: WhatsappIcon,
      name: 'WhatsApp'
    },
    {
      Button: TelegramShareButton,
      Icon: TelegramIcon,
      name: 'Telegram'
    },
    {
      Button: EmailShareButton,
      Icon: EmailIcon,
      name: 'Email'
    }
  ];

  return (
    <div
      className="share-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
    >
      <div
        className="share-container"
        onClick={e => e.stopPropagation()}
        style={{
          background: 'transparent',
          padding: '30px',
          borderRadius: '10px',
          textAlign: 'center'
        }}
      >
        <h2 style={{ 
          color: 'white', 
          marginBottom: '30px',
          fontSize: '24px',
          fontWeight: '500'
        }}>
          Partager sur les réseaux sociaux
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          maxWidth: '400px'
        }}>
          {shareButtons.map(({ Button, Icon, name }) => (
            <div
              key={name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <Button url={url} title={title}>
                <div
                  style={{
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    ':hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <Icon size={48} round />
                </div>
              </Button>
              <span style={{ 
                color: 'white',
                fontSize: '14px'
              }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShareOverlay; 