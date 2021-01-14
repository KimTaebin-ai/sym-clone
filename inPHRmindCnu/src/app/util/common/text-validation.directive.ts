import {Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appTextValidation]'
})
export class TextValidationDirective implements OnChanges {
  private navigationKeys = [
/*    'Backspace',
    'Delete',*/
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste',
  ];

  @Input() min = -Infinity;
  @Input() max = Infinity;
  @Input() inputType: string;
  textType = '';
  inputElement: HTMLInputElement;

  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.inputType.currentValue) {
      this.textType = changes.inputType.currentValue;
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): any {
    if (
        this.navigationKeys.indexOf(e.key) > -1 || // 허용: navigation keys: backspace, delete, arrows etc.
        ((e.key === 'a' || e.code === 'KeyA') && e.ctrlKey === true) || // 허용: Ctrl+A
        ((e.key === 'c' || e.code === 'KeyC') && e.ctrlKey === true) || // 허용: Ctrl+C
        ((e.key === 'v' || e.code === 'KeyV') && e.ctrlKey === true) || // 허용: Ctrl+V
        ((e.key === 'x' || e.code === 'KeyX') && e.ctrlKey === true) || // 허용: Ctrl+X
        ((e.key === 'a' || e.code === 'KeyA') && e.metaKey === true) || // 허용: Cmd+A (Mac)
        ((e.key === 'c' || e.code === 'KeyC') && e.metaKey === true) || // 허용: Cmd+C (Mac)
        ((e.key === 'v' || e.code === 'KeyV') && e.metaKey === true) || // 허용: Cmd+V (Mac)
        ((e.key === 'x' || e.code === 'KeyX') && e.metaKey === true) // 허용: Cmd+X (Mac)
    ) {
      // 작동 제어
      return false;
    }

    // 공백 제어
    if (e.code === 'Space') {
      return false;
    }

    // 오직 숫자만 입력 가능한 정규식
    const numberReg = RegExp(/^[0-9]*$/);
    // 특수문자 정규식
    const specialCharacters = RegExp(/[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi);

    if (this.textType === 'NAME') {

      // 특수문자 제어
      if (specialCharacters.test(e.key)) {
        e.preventDefault();
        return;
      }

      // 숫자 제어
      if (numberReg.test(e.key)) {
        e.preventDefault();
        return;
      }
    } else if (this.textType === 'MOBILE') {
      console.log(e)
      console.log(numberReg.test(e.key))
      if ((numberReg.test(e.key) || e.code === 'Minus' || e.code === 'Backspace' || e.key === 'Backspace') ) {
        return;
      } else {
        e.preventDefault();
        return;
      }
    }
  }

}
