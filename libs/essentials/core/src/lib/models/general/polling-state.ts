export enum PollingState {
  // The next data request should be made as soon as possible.
  LoadPending,

  // A data request has been made, but the response is not yet received.
  Loading,

  /**
   * The last data request executed faster than the polling interval.
   * The next one is being delayed by as many millisecons
   * as are re remaining from the polling interval.
   */
  Delaying,
}
