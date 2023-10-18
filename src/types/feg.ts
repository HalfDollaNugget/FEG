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
  private _generatedLines: Line;
  private _isInitialized: boolean;
  constructor(schema: IFEGLinesSchema) {
    this._schema = schema;
    this._generatedLines = {};
    this._isInitialized = false;
  }
  public get schema() {
    return this._schema;
  }
  private _stationFormat(data: any[]) {
    /* let [line, id] = data
    line = line <= 9 ? `0${line}`:`${line}` */
    for (let el of data) {
      data[el] = el <= 9 ? `0${el}`: `${el}`
    }
    return `WS-CR-${data[0]}-${data[1]}`
  }
  init() {
    if (this._isInitialized) return 'Already Initialized';
    else this._isInitialized = true;
    this._schema.lines.forEach((line, lineIndex) => {
      this._generatedLines[line.name] = {
        stations: {
          sides: {}
        }
      };
      line.layout.amountPerSide.forEach((stationAmount, iAmount) => {
        let sideName = iAmount == 0 ? 'left': 'right'
        this._generatedLines[line.name].stations.sides[iAmount == 0 ? 'left': 'right'] = {}
        if (stationAmount != 0) {
          for (let index = 1; index <= stationAmount; index++) {
            console.log(lineIndex, index)
            this._generatedLines[line.name].stations.sides[sideName][index] = {
              name: this._stationFormat([lineIndex, index]),
              associate: {},
              allowedRoles: [...line.layout.defaultRoles]
            }
          }
        }
      })
    })
    return this._generatedLines
  }
}

interface Line {
  [x: string]: {
    stations: {
    sides: {
      [x: string]: Station;
    }
  };
  }
}

interface Station {
  [x: number]: {
    name: string;
    associate?: {}; 
    allowedRoles: string[];
  }
}