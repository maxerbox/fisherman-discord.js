/**
 * An missingPermissionsException, when the command require special discord permissions
 * 
 * @class missingPermissionsException
 * @extends {Error}
 */
class missingPermissionsException extends Error {
    /**
     * Creates an instance of missingPermissionsException.
     * @param {(Array<string>|string)} [missing=null] the missing perms
     * @memberof missingPermissionsException
     */
    constructor(missing = null) {
        super("Missing discord permissions to execute that command :" + command)
        /**
         * The missing permissions
         * @type {(Array|string)}
         * @name missingPermissionsException#missingPermissions
         * @readonly
         */
        this.missingPermissions = missing;
        /**
         * The fisherCode
         * @type {number}
         * @readonly
         * @name missingPermissionsException#code
         * @constant
         * @default 403
         */
        this.code = 403;
    }
}
module.exports = missingPermissionsException