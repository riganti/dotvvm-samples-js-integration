declare type ModuleContext = {
    readonly moduleName: string,
    readonly module: any,
    readonly moduleCommands: ModuleCommandDictionary,
    readonly viewId: string,
    readonly element: HTMLElement,
    readonly viewModel: any,
    readonly properties: { [name: string]: any }
    readonly state: { [name: string]: any }
}

type ModuleCommand = (context: ModuleContext, ...args: any[]) => Promise<any>;
type ModuleCommandDictionary = { [name: string]: ModuleCommand };
