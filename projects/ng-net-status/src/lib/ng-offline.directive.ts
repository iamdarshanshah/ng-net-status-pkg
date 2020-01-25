import { Directive, ElementRef } from '@angular/core';
import { BaseDirective } from './ng-base.directive';

@Directive({
  selector: '[ngOffline]'
})
export class NgOfflineDirective extends BaseDirective {
  constructor(el: ElementRef) {
    super(el);
    if (this.online) { this._el.nativeElement.style.display = 'none'; } else { this._el.nativeElement.style.display = 'inherit'; }
  }

  public goOnline() {
    this._el.nativeElement.style.display = 'none';
    this.online = true;
  }

  public goOffline() {
    this._el.nativeElement.style.display = 'inherit';
    this.online = false;
  }
}
