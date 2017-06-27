import { SecureStorageApi, GetOptions, SetOptions, RemoveOptions } from "./secure-storage.common";
export declare class SecureStorage implements SecureStorageApi {
    private hawk;
    constructor();
    get(arg: GetOptions): any;
    set(arg: SetOptions): boolean;
    remove(arg: RemoveOptions): boolean;
}
