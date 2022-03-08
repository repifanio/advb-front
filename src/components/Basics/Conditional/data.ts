export interface IConditional {
  render: boolean;
  children: JSX.Element[] | JSX.Element;
}

export interface IConditionalLayout extends IConditional {}
