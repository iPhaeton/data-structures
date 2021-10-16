interface IConstructor {
    new(): any;
};

interface ComposeClassesInterface {
    BaseClass: IConstructor,
    ComposeWith: IConstructor,
    methodNames?: (string | symbol)[] | null;
}

export const composeClasses = <T>({
    BaseClass,
    ComposeWith,
    methodNames = null,
}: ComposeClassesInterface): T => {
    (methodNames || Object.keys(ComposeWith.prototype)).reduce((proto, name) => {
        proto[name] = ComposeWith.prototype[name];
        return proto;
    }, BaseClass.prototype);
    return BaseClass as unknown as T;
}