import { Directive, ElementRef } from '@angular/core';
import { BaseDirective } from './ng-base.directive';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[ngOnline]'
})
export class NgOnlineDirective extends BaseDirective {
  constructor(el: ElementRef) {
    super(el);
    if (this.online) { this._el.nativeElement.style.display = 'inherit'; } else { this._el.nativeElement.style.display = 'none'; }
  }

  public goOnline() {
    this._el.nativeElement.style.display = 'inherit';
    this.online = true;
  }

  public goOffline() {
    this._el.nativeElement.style.display = 'none';
    this.online = false;
  }
}
