export enum Order {
  ASC = 'ascending',
  DESC = 'descending'
}

/**
 * Interface to create the Lines configurations
 */
export interface IFEGLinesSchema {
  lines: IFEGLineTemplate[];
}
/**
 * Interface to configure the line for FEG
 */
export interface IFEGLineTemplate {
  name: string;
  order: Order;
  layout: {
    amountOfStations: number;
    amountPerSide: number[];
    defaultRoles: string[];
    specials: {
      [x: number]: {
        name: string;
        defaultRoles: string[];
      };
    };
  };
}

export class FEG {
  private readonly _schema: IFEGLinesSchema;
  private _generatedLine: [];
  private _isInitialized: boolean;
  constructor(schema: IFEGLinesSchema) {
    this._schema = schema;
    this._generatedLine = [];
  }
  public get schema() {
    return this._schema;
  }
  init() {
    if (this._isInitialized) return 'Already Initialized';
    else this._isInitialized = true;
    this._schema.lines.forEach(line => {
      let newLine = {}
      newLine['name'] = line.name
    })
  }
}