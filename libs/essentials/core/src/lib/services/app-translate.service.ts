import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Logger } from './logger.service';

/**
 * AppTranslateService helps in Managing the Language Registering
 * & Change Options
 */
@Injectable({
  providedIn: 'root',
})
export class AppTranslateService {
  /** default language to be used in the app */
  defaultLanguage!: string;
  /** logger initialization */
  log = new Logger('AppTranslateService');
  /** language key for storage */
  languageKey = 'language';
  /** language key for storage */
  private langChangeSubscription!: Subscription;

  /**
   * @ignore
   * @param translateService
   */
  constructor(private translateService: TranslateService) { }

  /**
   * Initializes i18n for the application.
   * Loads language from local storage if present, or sets default language.
   * @param defaultLanguage The default language to use.
   */
  init(defaultLanguage: string) {
    this.defaultLanguage = defaultLanguage;
    this.language = '';

    // Warning: this subscription will always be alive for the app's lifetime
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        localStorage.setItem(this.languageKey, event.lang);
      }
    );
  }

  /**
   * Cleans up language change subscription.
   */
  destroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  /**
   * Sets the current language.
   * Note: The current language is saved to the local storage.
   * If no parameter is specified, the language is loaded from local storage (if present).
   * @param language The IETF language code to set.
   */
  set language(language: any) {
    language =
      language ||
      localStorage.getItem(this.languageKey) ||
      this.translateService.getBrowserCultureLang();

    // If no exact match is found, search without the region
    if (language) {
      language = language.split('-')[0];
    }

    this.log.debug(`Language set to ${language}`);
    this.translateService.use(language);
  }

  /**
   * Gets the current language.
   * @return The current language code.
   */
  get language(): string {
    return this.translateService.currentLang;
  }
}
