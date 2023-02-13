/**
 * Exception message when a value can't be serialized for `localStorage`
 */
export const SERIALIZATION_ERROR = `The storage is currently localStorage,
where data must be serialized, and the provided data can't be serialized.`;

/**
 * Exception raised when a value can't be serialized for `localStorage`
 */
export class SerializationError extends Error {
  /** message for the serialization error */
  override message = SERIALIZATION_ERROR;
}
