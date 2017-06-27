import {SecureStorageApi, GetOptions, SetOptions, RemoveOptions} from "./secure-storage.common";
const utils = require("utils/utils");

declare var com: any;

export class SecureStorage implements SecureStorageApi {

  private hawk: any; // com.orhanobut.hawk.Hawk

  constructor() {
    this.hawk = com.orhanobut.hawk.Hawk.init(utils.ad.getApplicationContext()).build();
  }

  public get(arg: GetOptions): any {
    return(com.orhanobut.hawk.Hawk.get(arg.key));
  };

  public set(arg: SetOptions): boolean {
    return(com.orhanobut.hawk.Hawk.put(arg.key, arg.value));
  };

  public remove(arg: RemoveOptions): boolean {
    return(com.orhanobut.hawk.Hawk.delete(arg.key));
  };
}