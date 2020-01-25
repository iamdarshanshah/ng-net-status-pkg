/*
 * Author : Darshan Shah
 * github : gettodarshanshah
 */

import { NgModule } from '@angular/core';
import { NgOfflineDirective } from './ng-offline.directive';
import { NgOnlineDirective } from './ng-online.directive';

@NgModule({
  declarations: [NgOfflineDirective, NgOnlineDirective],
  exports: [NgOfflineDirective, NgOnlineDirective]
})
export class NgNetStatusModule { }
