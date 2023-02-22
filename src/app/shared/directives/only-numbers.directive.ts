import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'input[appOnlyNumbers]',
})
export class OnlyNumbersDirective {
  private el = inject(ElementRef);

  @HostListener('input') onInput() {
    const element = this.el.nativeElement as HTMLInputElement;
    const value = [...this.el.nativeElement.value].filter((char) =>
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(+char)
    );
    element.value = value.join('');
  }
}
