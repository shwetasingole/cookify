import React from 'react';

const DetailsDemo = () => {
  return (
    <div style={{ fontFamily: 'sans-serif', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '4rem', minHeight: '100vh' }}>
    

      <main style={{ display: 'grid',gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
        <DetailsCard 
          imageSrc="Poke bowl-pana.svg" 
          altText="Bamboo" 
          description="Bamboo trees in Kyoto, Japan."
        />
        <DetailsCard 
          imageSrc="fruit salad-amico.svg" 
          altText="Plant" 
          description="A blooming plant in Thailand."
        />
        <DetailsCard 
          imageSrc="fruit salad-cuate.svg" 
          altText="Beach" 
          description="A beach with palm trees in Brazil."
        />
          <DetailsCard 
          imageSrc="healthy food-cuate.svg" 
          altText="Beach" 
          description="A beach with palm trees in Brazil."
        />
      </main>
    </div>
  );
};

const DetailsCard = ({ imageSrc, altText, description }) => {
  return (
    <details style={{ display: 'flex', flexDirection: 'row', overflow: 'hidden',borderRadius: '2rem', position: 'relative', height: '18rem', zIndex: 1 }}>
      <summary style={{ width: '2rem' }}>
        <img 
          src={imageSrc} 
          alt={altText} 
          loading='lazy'
          style={{
            outline: '3px #000000 solid',
            filter: 'saturate(1)',
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            transition: 'all 0.2s ease-in',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1
          }}
        />
      </summary>
      <div style={{ display: 'flex', paddingRight: '5rem', height: '100%', alignItems: 'end', color: 'white' }}>
       
      </div>
      <style>
        {`
         
          details:hover {
            outline: 3px #000000 solid;
            outline-offset: 3px;
            cursor: pointer;
          }

          details:not([open]):hover img {
            transform: scale(1.05);
            filter: brightness(0.85);
          }

          details[open] img {
            filter: brightness(0.65);
          }

          details::marker {
            content: "";
          }

          details::details-content {
            transition: width 0.5s ease, opacity 0.5s 0.5s ease;
            content-visibility: 0.5s ease allow-discrete;
            width: 0;
            opacity: 0;
          }

          details[open]::details-content {
            width: 300px;
            opacity: 1;
          }
        `}
      </style>
    </details>
  );
};

export default DetailsDemo;
