import { ElementRef, OnDestroy, OnInit } from '@angular/core';

export class BaseDirective implements OnInit, OnDestroy {

  private readonly inBrowser = typeof navigator !== 'undefined';
  private readonly unsupportedUserAgentsPattern = /Windows.*Chrome|Windows.*Firefox|Linux.*Chrome/;
  private readonly poolingConfiguration = {
    url: 'https://ipv4.icanhazip.com/',
    timeout: 3000,
    interval: 3000
  };

  public enabled: boolean;
  public online: boolean;
  public pollingId?: number;
  public readonly _el: ElementRef;

  constructor(el: ElementRef) {
    this._el = el;
    this.online = this.inBrowser && typeof navigator.onLine === 'boolean'
      ? navigator.onLine : true;

    this.enabled = this.inBrowser && this.unsupportedUserAgentsPattern.test(navigator.userAgent);
  }

  ngOnInit() {
    window.addEventListener('online', () => { this.goOnline(); });
    window.addEventListener('offline', () => { this.goOffline(); });

    if (this.enabled) {
      this.startPooling();
    }
  }

  ngOnDestroy() {
    window.removeEventListener('online', () => { this.goOnline(); });
    window.removeEventListener('offline', () => { this.goOffline(); });

    if (this.pollingId) {
      this.stopPolling();
    }
  }

  public goOnline() { }

  public goOffline() { }

  private ping() {
    return new Promise(resolve => {
      const isOnline = () => resolve(true);
      const isOffline = () => resolve(false);

      const xhr = new XMLHttpRequest();

      xhr.onerror = isOffline;
      xhr.ontimeout = isOffline;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.HEADERS_RECEIVED) {
          if (xhr.status) {
            isOnline();
          } else {
            isOffline();
          }
        }
      };

      xhr.open('HEAD', this.poolingConfiguration.url);
      xhr.timeout = this.poolingConfiguration.timeout;
      xhr.send();
    });
  }

  private startPooling() {
    const { interval } = this.poolingConfiguration;
    this.pollingId = setInterval(() => {
      this.ping().then(online => {
        online ? this.goOnline() : this.goOffline();
      });
    }, interval) as any;
  }

  private stopPolling() {
    clearInterval(this.pollingId);
  }

}
