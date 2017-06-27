import {SecureStorageApi, GetOptions, SetOptions, RemoveOptions} from "./secure-storage.common";

declare const SAMKeychainQuery, SAMKeychain, kSecAttrAccessibleAlwaysThisDeviceOnly: any;

export class SecureStorage implements SecureStorageApi {

  private defaultService: string = "my_app";

  constructor() {
  }

  public get(arg: GetOptions): any {
    let query = SAMKeychainQuery.new();
    query.service = arg.service || this.defaultService;
    query.account = arg.key;

    try {
      query.fetch();
      return(query.password);
    } catch (e) {
      return(null);
    }
  };

  public set(arg: SetOptions): boolean {
    // TODO optionally pass in accessibility
    let accessibility = kSecAttrAccessibleAlwaysThisDeviceOnly;
    SAMKeychain.setAccessibilityType(accessibility);

    let query = SAMKeychainQuery.new();
    query.service = arg.service || this.defaultService;
    query.account = arg.key;
    query.password = arg.value;

    return(query.save());
  };

  public remove(arg: RemoveOptions): boolean {
    let query = SAMKeychainQuery.new();
    query.service = arg.service || this.defaultService;
    query.account = arg.key;

    try {
      return(query.deleteItem());
    } catch (e) {
      return(false);
    }
  };
}