/**
 * An MissingPermissionsException, when the command require special discord permissions
 *
 * @class MissingPermissionsException
 * @extends {Error}
 */
class MissingPermissionsException extends Error {
    /**
     * Creates an instance of MissingPermissionsException.
     * @param {(Array<string>|string)} missing the missing perms
     * @memberof MissingPermissionsException
     */
  constructor (missing) {
    super('Missing discord permissions to execute that command :' + missing)
        /**
         * The missing permissions
         * @type {(Array|string)}
         * @name MissingPermissionsException#missingPermissions
         * @readonly
         */
    this.missingPermissions = missing
        /**
         * The fisherCode
         * @type {number}
         * @readonly
         * @name MissingPermissionsException#code
         * @constant
         * @default 403
         */
    this.code = 403
  }
}
module.exports = MissingPermissionsException
