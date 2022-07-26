import React from "react";
import { LinkSection, SectionElem } from "../section/linkSection";
import "./carousel.scss";

let delta = 0;
let startElement: HTMLElement | null = null;
let endElement: HTMLElement | null = null;
let allSizeSection: number | null = null;

export function Carousel({ objects }: { objects: SectionElem[] }) {
  return (
    <div className="carousel">
      <button className="main__page-button page-button-l" onClick={() => switchBlock('left',"carouselBody")}>←</button>
      <section className="main__body-carousel body-carousel">
      <div id="carouselBody" className="body-carousel__wrapeer body-wrapper">
      {Array.from(objects, (object: SectionElem) => {
        return <LinkSection params={object} />;
      })}
    </div>
      </section>
      <button className="main__page-button page-button-r" onClick={() => switchBlock('right',"carouselBody")}>→</button>
    </div>
  );
}

function switchBlock(side: "left" | "right", id: string) {
    const wrapper = document.getElementById(id) as HTMLElement;

    if(!allSizeSection) {
        allSizeSection = wrapper.scrollWidth;
    }

    const sizeSection = 112;
    const countElement = (allSizeSection + 10) / sizeSection;
    const deathLine = sizeSection * countElement;
    let mark = side === 'right' ? -1 : 1;

    if((side === 'right' && delta === -deathLine) || (side === 'left' && delta === deathLine)) {
        delta = delta > 0 ? sizeSection : -sizeSection;

        Array.from(wrapper.children as HTMLCollectionOf<HTMLElement>)
        .forEach((element: HTMLElement) => element.style.transform = '')
    } else {
        delta = delta + mark * sizeSection;
    }

    if (!startElement) {
      startElement = wrapper.children[0] as HTMLElement;
      endElement = wrapper.children[countElement - 1] as HTMLElement;
    }

    if(side === 'left') {
        (endElement as HTMLElement).style.transform = delta > 0 ? `translateX(${-sizeSection*countElement}px)` : ``;
    }
    else {
        (startElement as HTMLElement).style.transform = delta < 0 ? `translateX(${sizeSection*countElement}px)`: ``;
    }
    swapStartAndEndElement(side,wrapper.children as HTMLCollectionOf<HTMLElement>);
    
    wrapper.style.transform = `translateX(${delta}px)`
}

function swapStartAndEndElement(side: "left" | "right", elements: HTMLCollectionOf<HTMLElement>) {
    let nextStart: HTMLElement | null | undefined;
    let nextEnd: HTMLElement | null | undefined;
    let defaultValue: HTMLElement;

    if(side === 'left') {
        nextStart = startElement?.previousElementSibling as HTMLElement | null | undefined;
        nextEnd = endElement?.previousElementSibling as HTMLElement | null | undefined;
        defaultValue = elements[elements.length-1];
    }
    else {
        nextStart = startElement?.nextElementSibling as HTMLElement | null | undefined;
        nextEnd = endElement?.nextElementSibling as HTMLElement | null | undefined;
        defaultValue = elements[0];
    }

    if(!nextStart) {
        nextStart = defaultValue;
    }
    if(!nextEnd) {
        nextEnd = defaultValue;
    }
    startElement = nextStart as HTMLElement;
    endElement = nextEnd as HTMLElement;
}
