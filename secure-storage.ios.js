"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SecureStorage = (function () {
    function SecureStorage() {
        this.defaultService = "my_app";
    }
    SecureStorage.prototype.get = function (arg) {
        var query = SAMKeychainQuery.new();
        query.service = arg.service || this.defaultService;
        query.account = arg.key;
        try {
            query.fetch();
            return (query.password);
        }
        catch (e) {
            return (null);
        }
    };
    ;
    SecureStorage.prototype.set = function (arg) {
        var accessibility = kSecAttrAccessibleAlwaysThisDeviceOnly;
        SAMKeychain.setAccessibilityType(accessibility);
        var query = SAMKeychainQuery.new();
        query.service = arg.service || this.defaultService;
        query.account = arg.key;
        query.password = arg.value;
        return (query.save());
    };
    ;
    SecureStorage.prototype.remove = function (arg) {
        var query = SAMKeychainQuery.new();
        query.service = arg.service || this.defaultService;
        query.account = arg.key;
        try {
            return (query.deleteItem());
        }
        catch (e) {
            return (false);
        }
    };
    ;
    return SecureStorage;
}());
exports.SecureStorage = SecureStorage;
//# sourceMappingURL=secure-storage.ios.js.map