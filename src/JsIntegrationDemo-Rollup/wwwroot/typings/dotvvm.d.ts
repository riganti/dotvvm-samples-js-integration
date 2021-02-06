declare type ModuleContext = {
    readonly moduleName: string,
    readonly module: any,
    readonly viewId: string,
    readonly element: HTMLElement,
    readonly properties: { [name: string]: any },
    readonly namedCommands: { [name: string]: (...args: any) => Promise<unknown> }
}

type ModuleCommand = (...args: any[]) => Promise<any>;

declare var dotvvm: any;