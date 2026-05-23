import { animate, stagger, createTimeline } from 'animejs';

export const animeConfig = {
  easeOutExpo: 'easeOutExpo',
  easeInOutQuart: 'easeInOutQuart',
  spring: 'spring(1, 80, 10, 0)',
};

// High-fidelity compatibility layer wrapping Anime.js v4's modular named exports
// to support classic callable syntax smoothly without default import errors in TypeScript.
const animeHelper = (options: any) => {
  const { targets, ...rest } = options;
  return animate(targets, rest);
};

const wrappedTimeline = (parameters?: any): any => {
  const tl = createTimeline(parameters);
  const originalAdd = tl.add;
  
  // Custom wrapper to transparently map v3-style single object adds to v4 dual-arg adds
  (tl as any).add = function (a1: any, a2?: any, a3?: any) {
    if (a1 && typeof a1 === 'object' && a1.targets) {
      const { targets, ...rest } = a1;
      if (a2 === undefined) {
        return (originalAdd as any).call(this, targets, rest);
      } else if (typeof a2 === 'string' || typeof a2 === 'number') {
        return (originalAdd as any).call(this, targets, rest, a2);
      }
    }
    return (originalAdd as any).call(this, a1, a2, a3);
  };
  
  return tl;
};

const anime = Object.assign(animeHelper, {
  stagger,
  timeline: wrappedTimeline,
  setDashoffset: (el: any) => {
    if (el && typeof el.getTotalLength === 'function') {
      return el.getTotalLength();
    }
    return 0;
  }
});

export default anime;

export function staggerReveal(targets: string, delay = 0) {
  return anime({
    targets,
    opacity: [0, 1],
    translateY: [40, 0],
    duration: 800,
    delay: anime.stagger(120, { start: delay }),
    easing: animeConfig.easeOutExpo,
  });
}

export function morphIn(targets: string) {
  return anime({
    targets,
    opacity: [0, 1],
    scale: [0.92, 1],
    duration: 600,
    easing: animeConfig.spring,
  });
}

export function lineDrawSVG(targets: string) {
  return anime({
    targets,
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 1200,
    delay: anime.stagger(150),
    easing: animeConfig.easeOutExpo,
  });
}
