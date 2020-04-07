import { animate, style, transition, trigger } from '@angular/animations';

export const inOutOpacityAnimation = trigger(
  'inOutOpacityAnimation',
  [
    transition(
      ':enter',
      [
        style({ height: 0 }),
        animate(100,
          style({ height: 300 }))
      ]
    ),
    transition(
      ':leave',
      [
        style({ height: 300 }),
        animate(100,
          style({ height: 0 }))
      ]
    )
  ]
);
