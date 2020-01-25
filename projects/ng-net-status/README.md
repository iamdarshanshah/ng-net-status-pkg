# NgNetStatus
An angular directive which checks availability of network connection.

### Installing

```bash
$ npm install ng-net-status --save
```

### Basic usage
Import `NgNetStatusModule` into your ngModule and start using directives `ngOnline` and `ngOffline` within your html component.

##### **`app.module.ts`**
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgNetStatusModule } from 'ng-offline';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgOfflineModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

##### **`app.component.html`**
```html
<div ngOnline>Hey! You are online</div>
<div ngOffline>You're offline. Check your connection!</div>
```
