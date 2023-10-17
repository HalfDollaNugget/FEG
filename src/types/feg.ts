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
    stationNumber: number;
    sides: string[];
    defaultRoles: string[];
    specials: {
      [x: number]: {
        name: string;
        defaultRoles: string[];
      };
    };
  };
}
