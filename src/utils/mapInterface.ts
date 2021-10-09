interface IConstructor {
    new(): any;
};

interface MethodDescription {
    name: string;
    decorator?: ((fn: (...args: any[]) => any) => (...args: any[]) => any);
}

interface MapperInterface {
    Constructor: IConstructor,
    BaseClass: IConstructor,
    interfaceMap: Record<string, MethodDescription>;
}

// Copy constructor
// Wrap methods
export const mapInterface = ({
    Constructor,
    BaseClass,
    interfaceMap,
}: MapperInterface): any => {
    const proto = Object.entries(interfaceMap).reduce((proto, [method, { name, decorator }]) => {
        if (decorator) {
            proto[name] = decorator(Constructor.prototype[method]);
        } else {
            proto[name] = Constructor.prototype[method];
        };

        return proto;
    }, {} as Record<string, (...ags: any[]) => any>);
    BaseClass.prototype = { ...BaseClass.prototype, ...proto };
    return BaseClass;
}