export function throwIfAlreadyLoaded(module: any, moduleName: string) {
    if (module) {
        throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
    }
}
