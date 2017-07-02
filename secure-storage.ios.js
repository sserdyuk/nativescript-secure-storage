"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("utils/utils");
var SecureStorage = (function () {
    function SecureStorage() {
        this.defaultService = "my_app";
        var processInfo = utils_1.ios.getter(NSProcessInfo, NSProcessInfo.processInfo);
        var isMinIOS9 = processInfo.isOperatingSystemAtLeastVersion({ majorVersion: 9, minorVersion: 0, patchVersion: 0 });
        if (isMinIOS9) {
            var simDeviceName = processInfo.environment.objectForKey("SIMULATOR_DEVICE_NAME");
            this.isSimulator = simDeviceName !== null;
        }
        else {
            var currentDevice = utils_1.ios.getter(UIDevice, UIDevice.currentDevice);
            this.isSimulator = currentDevice.name.toLowerCase().indexOf("simulator") > -1;
        }
        if (this.isSimulator) {
            console.log("Falling back to storing data in NSUserDefaults because of a Simulator bug");
        }
    }
    SecureStorage.prototype.get = function (arg) {
        if (this.isSimulator) {
            return (NSUserDefaults.standardUserDefaults.objectForKey(arg.key));
        }
        var query = SAMKeychainQuery.new();
        query.service = arg.service || this.defaultService;
        query.account = arg.key;
        try {
            query.fetch();
            return query.password;
        }
        catch (e) {
            return null;
        }
    };
    SecureStorage.prototype.set = function (arg) {
        if (this.isSimulator) {
            NSUserDefaults.standardUserDefaults.setObjectForKey(arg.value, arg.key);
            return (true);
        }
        var accessibility = kSecAttrAccessibleAlwaysThisDeviceOnly;
        SAMKeychain.setAccessibilityType(accessibility);
        var query = SAMKeychainQuery.new();
        query.service = arg.service || this.defaultService;
        query.account = arg.key;
        query.password = arg.value;
        return (query.save());
    };
    SecureStorage.prototype.remove = function (arg) {
        if (this.isSimulator) {
            NSUserDefaults.standardUserDefaults.removeObjectForKey(arg.key);
            return (true);
        }
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
    return SecureStorage;
}());
exports.SecureStorage = SecureStorage;
