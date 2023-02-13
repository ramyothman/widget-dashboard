import { MobileDetectionService } from './mobile-detection.service';

describe('MobileDetectionService', () => {
  let service: MobileDetectionService;
  beforeEach(() => {
    service = new MobileDetectionService();
  });

  function getWindowMock(userAgent: string, touch = false) {
    const windowMock = {
      navigator: {
        userAgent,
        maxTouchPoints: touch ? 5 : 0,
      },
      ontouchstart: false,
    };
    if (touch) {
      windowMock.ontouchstart = true;
    }
    return windowMock;
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test checkDeviceIsMobile', () => {
    describe('with mobile agents', () => {
      it('should return true for mobile user agent', () => {
        const windowMock = getWindowMock(
          'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Chrome/92.0.4515.107 Safari/537.36'
        );
        expect(service.checkDeviceIsMobile(windowMock)).toBeTruthy();
      });

      it('should return true for android user agent', () => {
        const windowMock = getWindowMock(
          'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36'
        );
        expect(service.checkDeviceIsMobile(windowMock)).toBeTruthy();
      });

      it('should return true for ipad user agent', () => {
        const windowMock = getWindowMock(
          'Mozilla/5.0 (iPad; CPU OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1'
        );
        expect(service.checkDeviceIsMobile(windowMock)).toBeTruthy();
      });

      it('should return true for ipados user agent newer than ipados13 (with touch)', () => {
        const windowMock = getWindowMock(
          'Safari: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15',
          true
        );
        expect(service.checkDeviceIsMobile(windowMock)).toBeTruthy();
      });
    });

    describe('with desktop agents', () => {
      it('should return false for windows desktop user agent', () => {
        const windowMock = getWindowMock(
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0'
        );
        expect(service.checkDeviceIsMobile(windowMock)).toBeFalsy();
      });

      it('should return false for macosx desktop user agent', () => {
        const windowMock = getWindowMock(
          'Safari: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
        );
        expect(service.checkDeviceIsMobile(windowMock)).toBeFalsy();
      });
    });
  });

  describe('Test checkDeviceHasTouch', () => {
    it('should return true on mobile device with touch', () => {
      const windowMock = getWindowMock(
        'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Mobile',
        true
      );
      expect(service.checkDeviceHasTouch(windowMock)).toBeTruthy();
    });

    it('should return true for windows desktop with touch', () => {
      const windowMock = getWindowMock(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0',
        true
      );
      expect(service.checkDeviceHasTouch(windowMock)).toBeTruthy();
    });

    // TODO: To Be Checked by Philipp
    // it('should return false on mobile device without touch', () => {
    //   const windowMock = getWindowMock(
    //     'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Mobile'
    //   );
    //   expect(service.checkDeviceHasTouch(windowMock)).toBeFalsy();
    // });

    // it('should return false for windows desktop without touch', () => {
    //   const windowMock = getWindowMock(
    //     'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0'
    //   );
    //   expect(service.checkDeviceHasTouch(windowMock)).toBeFalsy();
    // });
  });
});
