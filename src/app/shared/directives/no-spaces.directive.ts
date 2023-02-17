import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appNoSpaces]',
})
export class NoSpacesDirective {
  private el = inject(ElementRef);

  @HostListener('input') onInput() {
    const element = this.el.nativeElement as HTMLInputElement;
    const value = [...this.el.nativeElement.value].filter(
      (char) => char !== ' '
    );
    element.value = value.join('');
  }
}
