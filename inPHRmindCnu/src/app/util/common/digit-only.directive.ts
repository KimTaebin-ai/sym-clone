import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';

@Directive({
    selector: '[appDigitOnly]',
})
export class DigitOnlyDirective implements OnChanges {
    private hasDecimalPoint = false;
    private navigationKeys = [
        'Backspace',
        'Delete',
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

    @Input() decimal = false;
    @Input() decimalSeparator = '.';
    @Input() min = -Infinity;
    @Input() max = Infinity;
    @Input() pattern?: string | RegExp;
    private regex: RegExp;
    inputElement: HTMLInputElement;

    constructor(public el: ElementRef) {
        this.inputElement = el.nativeElement;
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes)
        if (changes.pattern) {
            this.regex = this.pattern ? RegExp(this.pattern) : null;
        }

        if (changes.min) {
            const maybeMin = Number(this.min);
            this.min = isNaN(maybeMin) ? -Infinity : maybeMin;
        }

        if (changes.max) {
            const maybeMax = Number(this.max);
            this.max = isNaN(maybeMax) ? Infinity : maybeMax;
        }
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent): any {
        console.log(e)
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
            return;
        }

        let newValue = '';
        if (this.decimal && e.key === this.decimalSeparator) {
            newValue = this.forecastValue(e.key);
            if (newValue.split(this.decimalSeparator).length > 2) {
                // has two or more decimal points
                e.preventDefault();
                return;
            } else {
                console.log(1111)
                this.hasDecimalPoint = newValue.indexOf(this.decimalSeparator) > -1;
                return; // Allow: only one decimal point
            }
        }

        // Ensure that it is a number and stop the keypress
        if (e.key === ' ' || isNaN(Number(e.key))) {
            e.preventDefault();
            return;
        }

        newValue = newValue || this.forecastValue(e.key);
        // check the input pattern RegExp
        if (this.regex) {
            if (!this.regex.test(newValue)) {
                e.preventDefault();
                return;
            }
        }

        const newNumber = Number(newValue);
        if (newNumber > this.max || newNumber < this.min) {
            e.preventDefault();
        }
    }

    private forecastValue(key: string): string {
        const selectionStart = this.inputElement.selectionStart;
        const selectionEnd = this.inputElement.selectionEnd;
        const oldValue = this.inputElement.value;
        const selection = oldValue.substring(selectionStart, selectionEnd);
        return selection
            ? oldValue.replace(selection, key)
            : oldValue.substring(0, selectionStart) +
            key +
            oldValue.substring(selectionStart);
    }
}
