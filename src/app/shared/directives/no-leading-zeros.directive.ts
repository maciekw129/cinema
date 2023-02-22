import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appNoLeadingZeros]',
})
export class NoLeadingZerosDirective {
  private el = inject(ElementRef);

  @HostListener('input') onInput() {
    const element = this.el.nativeElement as HTMLInputElement;

    if (element.value) {
      element.value = parseInt(element.value).toString();
    }
  }
}
