'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import './AccordionGallery.css';

const AccordionGallery = ({
  items = [],
  defaultIndex = 2,
  accentColor = '#f3a06f',
  overlayColor = '#171814',
  textColor = '#f4f2e9',
  height = 460,
  gap = 10,
  radius = 16,
  expandRatio = 0.52,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = '',
}) => {
  const rootRef = useRef(null);
  const panelRefs = useRef([]);
  const mediaRefs = useRef([]);
  const barRefs = useRef([]);
  const textRefs = useRef([]);
  const timelineRef = useRef(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);
  const vertical = orientation === 'vertical';
  const count = items.length;
  const [active, setActive] = useState(count ? Math.min(Math.max(defaultIndex, 0), count - 1) : 0);
  const prefersReduced = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const applyLayout = useCallback((animate) => {
    const panels = panelRefs.current;
    if (!panels.length) return;

    const ratio = Math.min(Math.max(expandRatio, 0.2), 0.9);
    const grow = count > 1 ? (ratio * (count - 1)) / (1 - ratio) : 1;
    const mediaSize = mediaSizeRef.current;
    timelineRef.current?.kill();
    const animationDuration = animate && !prefersReduced ? duration : 0;
    const timeline = gsap.timeline();

    panels.forEach((panel, index) => {
      if (!panel) return;
      const isActive = index === active;
      const media = mediaRefs.current[index];
      const bar = barRefs.current[index];
      const text = textRefs.current[index];
      const rotation = isActive ? 0 : index < active ? tilt : -tilt;
      const rotationStyle = vertical ? { rotateX: -rotation } : { rotateY: rotation };

      timeline.to(panel, { flexGrow: isActive ? grow : 1, ...rotationStyle, duration: animationDuration, ease }, 0);

      if (media) {
        const drift = Math.max(-1.5, Math.min(1.5, active - index));
        const shift = drift * parallax * mediaSize * 0.06;
        timeline.to(media, {
          xPercent: -50,
          yPercent: -50,
          x: vertical ? 0 : isActive ? 0 : shift,
          y: vertical ? (isActive ? 0 : shift) : 0,
          '--ag-gray': grayscale && !isActive ? 1 : 0,
          '--ag-dim': isActive ? 0 : 0.35,
          duration: animationDuration,
          ease,
        }, 0);
      }

      if (showLabels && bar && text) {
        timeline.to([bar, text], {
          opacity: isActive ? 1 : 0,
          x: isActive ? 0 : -14,
          duration: isActive ? animationDuration : animationDuration * 0.6,
          ease,
          stagger: isActive && !prefersReduced ? stagger : 0,
        }, 0);
      }
    });

    timelineRef.current = timeline;
  }, [active, count, duration, ease, expandRatio, grayscale, parallax, prefersReduced, showLabels, stagger, tilt, vertical]);

  useEffect(() => {
    const element = rootRef.current;
    if (!element || !count) return undefined;

    const measure = () => {
      const rect = element.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      mediaSizeRef.current = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      element.style.setProperty('--ag-media-size', `${mediaSizeRef.current}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [applyLayout, count, expandRatio, gap, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(() => () => timelineRef.current?.kill(), []);

  const handleEnter = (index) => {
    if (trigger === 'hover') setActive(index);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index + 1) % count);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index - 1 + count) % count);
    }
  };

  if (!count) return null;

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--ag-accent': accentColor,
        '--ag-overlay': overlayColor,
        '--ag-text': textColor,
        '--ag-gap': `${gap}px`,
        '--ag-radius': `${radius}px`,
        height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`,
      }}
      role="list"
      aria-label="Selected portfolio projects"
    >
      {items.map((item, index) => {
        const isActive = index === active;
        return (
          <a
            key={item.label}
            ref={(element) => { panelRefs.current[index] = element; }}
            className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
            style={{ borderRadius: `${radius}px` }}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => handleEnter(index)}
            onFocus={() => setActive(index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={`${item.label}. ${item.description} Technologies: ${item.technologies}. Opens project website in a new tab.`}
          >
            <span className="ag-panel__frame">
              <span className="ag-panel__media" ref={(element) => { mediaRefs.current[index] = element; }}>
                <img src={item.image} alt={item.alt} draggable="false" loading="lazy" />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>
            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                <span className="ag-panel__bar" ref={(element) => { barRefs.current[index] = element; }} />
                <span className="ag-panel__text" ref={(element) => { textRefs.current[index] = element; }}>
                  <span>{item.label}</span>
                  <span className="ag-panel__details">
                    <span className="ag-panel__category">{item.category}</span>
                    <span className="ag-panel__description">{item.description}</span>
                    <span className="ag-panel__technologies">{item.technologies}</span>
                    <span className="ag-panel__action">View project <ArrowUpRight size={14} aria-hidden="true" /></span>
                  </span>
                </span>
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
};

export default AccordionGallery;
