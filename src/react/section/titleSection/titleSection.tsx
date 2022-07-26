import React from "react";
import "./titleSection.scss";

let animStyles: HTMLStyleElement;

export function TitleSection({
  title,
  img,
  animation,
}: {
  title: string;
  img: string;
  animation: string;
}) {
  return (
    <div className="section__title title">
      <img className="title__image title-img" src={img} onLoad={(elem) => loadAnimation(elem.currentTarget,animation)} alt="Image" />
      <p className="title__text title-text">{title}</p>
    </div>
  );
}

function loadAnimation(elem:HTMLElement ,anim: string) {
  const id = Math.ceil(Math.random() * 1000);
  const animation = `anim-${id} 1s ${anim.split(' ')[0]} forwards`;

  anim = anim.replace(`${anim.split(' ')[0]} `,'');
  addKeyframes(id.toString() ,anim);
  elem.setAttribute("anim",animation);
}

export function startAnimation(elem: HTMLElement) {
  const img = elem.getElementsByTagName("img")[0];

  img.style.animation = img.getAttribute("anim") as string;
}

export function endAnimation(elem: HTMLElement) {
  const img = elem.getElementsByTagName("img")[0];

  img.style.animation="";
}

function addKeyframes(id: string,animation: string) {

  if(!animStyles) {
  animStyles = document.createElement("style");
  document.head.appendChild(animStyles);
  }

  const keyframe: string = `
  @keyframes anim-${id} {
    100% {
      transform: ${animation};
    }
  }`;
  
  animStyles.sheet?.insertRule(keyframe,animStyles.sheet.cssRules.length);
}
