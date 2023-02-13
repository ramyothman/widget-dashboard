import { Injectable } from '@angular/core';

/**
 * This service is used to detect if the device running the web app is most likely mobile or not
 */
@Injectable({
  providedIn: 'root',
})
export class MobileDetectionService {
  /** Used to display if the device is mobile */
  public isMobile: boolean;
  /** Used to display if the device has touch input as an option */
  public hasTouch: boolean;

  /**
   * @ignore
   * Initially set the variables for the given device
   */
  constructor() {
    this.hasTouch = this.checkDeviceHasTouch(window);
    this.isMobile = this.checkDeviceIsMobile(window);
  }

  /**
   * Detects if a device is mobile or not using the user agent and touch points (for ipad)
   * @param w window element
   * @returns boolean if the device is mobile
   */
  checkDeviceIsMobile(w: any) {
    // not yet fully supported on different browsers, atm only works on chrome
    // does therefore not work with tslint
    // const agentDataMobile = window.navigator.userAgentData?.mobile;

    // check in the user agent -> Does not detect ipad after ipadOS 13
    let agentMobile = RegExp(
      /Android|webOS|iPhone|iPod|iPad|BlackBerry|Windows Phone|Mobile/i
    ).test(w.navigator.userAgent);

    // detect ipad with OS version newer than 13, it has same user agent as Mac, but has touch input
    if (!agentMobile) {
      const isMac = RegExp(/Macintosh/i).test(w.navigator.userAgent);

      if (
        isMac &&
        w.navigator.maxTouchPoints &&
        w.navigator.maxTouchPoints > 2
      ) {
        agentMobile = true;
      }
    }

    return agentMobile; // || agentDataMobile;
  }

  /**
   * Detects if a device has touch
   * @param w window element
   * @returns boolean if the device has touch
   */
  checkDeviceHasTouch(w: any) {
    // try to create a touch event, if this is possible, the device has touch input
    if (
      'ontouchstart' in w ||
      w.navigator.maxTouchPoints > 0 ||
      w.navigator.msMaxTouchPoints > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
