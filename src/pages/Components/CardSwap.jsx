// CardSwap.jsx - Animated card swapping component.
// This component displays a stack of cards that swap positions with animation.
// It uses GSAP for animations and React for state management.
// Cards are positioned in 3D space and swap to the front on a timer or pause on hover.

import React, { useMemo, useRef, useEffect, Children, cloneElement, forwardRef, isValidElement } from 'react';
import { gsap } from 'gsap';

// Card component for individual cards in the stack.
// It renders a div with 3D transform styles for positioning.
export const Card = forwardRef(({ className = '', style = {}, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={[
      'absolute top-1/2 left-1/2 rounded-xl border border-white bg-black',
      '[transform-style:preserve-3d]',
      '[will-change:transform]',
      '[backface-visibility:hidden]',
      className // user-defined Tailwind classes
    ].join(' ')}
    style={style}
  />
));
Card.displayName = 'Card';

// Function to calculate the position of a card in the stack.
// Takes the index, horizontal and vertical distances, and total cards.
const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

// Function to place a card element at a specific slot with skew.
// Uses GSAP to set the transform properties.
const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

// Main CardSwap component.
// Manages the card stack animation and rendering.
const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  className = '', // <-- new prop
  children
}) => {
  // Configuration for animation based on easing type.
  const config =
    easing === 'elastic'
      ? { ease: 'elastic.out(0.6,0.9)', durDrop: 2, durMove: 2, durReturn: 2, promoteOverlap: 0.9, returnDelay: 0.05 }
      : { ease: 'power1.inOut', durDrop: 0.8, durMove: 0.8, durReturn: 0.8, promoteOverlap: 0.45, returnDelay: 0.2 };

  // Memoize the children array and refs for performance.
  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(() => childArr.map(() => React.createRef()), [childArr.length]);
  // Ref for the order of cards.
  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  // Ref for the GSAP timeline.
  const tlRef = useRef(null);
  // Ref for the interval timer.
  const intervalRef = useRef();
  // Ref for the container element.
  const container = useRef(null);

  // useEffect to set up the initial positions and animation loop.
  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, { y: '+=500', duration: config.durDrop, ease: config.ease });
      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease }, `promote+=${i * 0.15}`);
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(() => gsap.set(elFront, { zIndex: backSlot.zIndex }), undefined, 'return');
      tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: config.durReturn, ease: config.ease }, 'return');
      tl.call(() => { order.current = [...rest, front]; });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => { tlRef.current?.pause(); clearInterval(intervalRef.current); };
      const resume = () => { tlRef.current?.play(); intervalRef.current = window.setInterval(swap, delay); };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => { node.removeEventListener('mouseenter', pause); node.removeEventListener('mouseleave', resume); clearInterval(intervalRef.current); };
    }

    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, refs]);

  // Render the children with refs and event handlers.
  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          className: child.props.className, // Tailwind-friendly
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => { child.props.onClick?.(e); onCardClick?.(i); }
        })
      : child
  );

  // Return the container div with the rendered cards.
  return (
    <div
      ref={container}
      className={`
        absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right
        perspective-[900px] overflow-visible
        max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75]
        max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]
        ${className}  // <-- apply any additional Tailwind classes
      `}
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;