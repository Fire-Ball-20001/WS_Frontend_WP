import React from 'react';
import {TitleSection, startAnimation, endAnimation} from './titleSection/titleSection';
import {ButtonSection} from './buttonSection/buttonSection';
import './linkSection.scss';

export interface SectionElem {
    title: string;
    img: string;
    fon: string;
    link: string;
    buttonColor: string;
    animation: string;
}

export function LinkSection({ params }: { params: SectionElem }) {
  return (
    <section
      className="carousel__section section"
      onMouseEnter={(event) => {
        startAnimation(event.currentTarget);
      }}
      onMouseLeave={(event) => {
        endAnimation(event.currentTarget);
      }}
      style={{ backgroundImage: `url(${params.fon})`}}
    >
      <TitleSection
        title={params.title}
        img={params.img}
        animation={params.animation}
      />
      <ButtonSection link={params.link} color={params.buttonColor} />
    </section>
  );
}




