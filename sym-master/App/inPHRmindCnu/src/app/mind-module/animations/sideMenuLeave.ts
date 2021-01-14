import { Animation } from '@ionic/core';

export function sideMenuLeaveAnimation(AnimationC: Animation, baseEl: HTMLElement): Promise<Animation> {

    const baseAnimation = new AnimationC();

    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    const wrapperAnimation = new AnimationC();
    const wrapperEl = baseEl.querySelector('.modal-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    const wrapperElRect = wrapperEl!.getBoundingClientRect();

    wrapperAnimation.beforeStyles({ opacity: 1 })
        .fromTo('translateX', '0%', `-100%`);

    backdropAnimation.fromTo('opacity', 0.4, 0.0);

    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-out')
        .duration(250)
        .add(backdropAnimation)
        .add(wrapperAnimation));

}

// 참고 사이트
// https://www.joshmorony.com/create-a-custom-modal-page-transition-animation-in-ionic/
