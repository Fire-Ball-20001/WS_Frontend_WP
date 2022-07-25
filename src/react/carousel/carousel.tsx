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

    if(allSizeSection === null) {
        allSizeSection = wrapper.scrollWidth;
    }

    const sizeSection = 112;
    const countElement = (allSizeSection + 10) / sizeSection;
    let mark = side === 'right' ? -1 : 1;

    if(Math.abs(delta) == sizeSection * countElement) {
        if(delta > 0) {
            delta = sizeSection;
        }
        else
        {
            delta = -sizeSection;
        }

        Array.from(wrapper.children as HTMLCollectionOf<HTMLElement>)
        .forEach((element: HTMLElement) => {
            element.style.transform = '';
        })


    } else {
        delta = delta + mark * sizeSection;
    }

    if (startElement === null) {
      startElement = wrapper.children[0] as HTMLElement;
      endElement = wrapper.children[countElement - 1] as HTMLElement;
    }

    if(side === 'left') {
        if(delta > 0) {
            (endElement as HTMLElement).style.transform = `translateX(${-sizeSection*countElement}px)`;
        }
        else {
            (endElement as HTMLElement).style.transform = ``;
        }
    }
    else {
        if(delta < 0) {
            (startElement as HTMLElement).style.transform = `translateX(${sizeSection*countElement}px)`;
        }
        else {
            (startElement as HTMLElement).style.transform = ``;
        }
    }
    swapStartAndEndElement(side,wrapper.children as HTMLCollectionOf<HTMLElement>);
    
    wrapper.style.transform = `translateX(${delta}px)`
}

function swapStartAndEndElement(side: "left" | "right", elements: HTMLCollectionOf<HTMLElement>) {
    let nextStart: HTMLElement | null | undefined;
    let nextEnd: HTMLElement | null | undefined;

    if(side === 'left') {
        nextStart = startElement?.previousElementSibling as HTMLElement | null | undefined;
        nextEnd = endElement?.previousElementSibling as HTMLElement | null | undefined;

        if(nextStart === null || nextStart === undefined) {
            nextStart = elements[elements.length-1];
        }
        if(nextEnd === null || nextEnd === undefined) {
            nextEnd = elements[elements.length-1];
        }
    }
    else {
        nextStart = startElement?.nextElementSibling as HTMLElement | null | undefined;
        nextEnd = endElement?.nextElementSibling as HTMLElement | null | undefined;

        if(nextStart === null || nextStart === undefined) {
            nextStart = elements[0];
        }
        if(nextEnd === null || nextEnd === undefined) {
            nextEnd = elements[0];
        }
    }

    startElement = nextStart as HTMLElement;
    endElement = nextEnd as HTMLElement;
}
