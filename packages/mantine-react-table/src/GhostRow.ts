import { type MantineTheme } from '@mantine/core';
import { type CSSProperties } from 'react';

type Position = {
  x: number;
  y: number;
};

type StylesToClone = (keyof CSSProperties)[];

export type GhostRowProps = {
  enabled?: boolean;
  className?: string;
  rowStylesToClone?: StylesToClone;
  cellStylesToClone?: StylesToClone;
  rowStyle?:
    | CSSProperties
    | ((props: { theme: MantineTheme }) => CSSProperties);
  cellStyle?:
    | CSSProperties
    | ((props: { theme: MantineTheme }) => CSSProperties);
};

type GhostRowCreate = (props: {
  row: HTMLTableRowElement;
  startX: number;
  startY: number;
  className?: string;
  rowStylesToClone?: StylesToClone;
  cellStylesToClone?: StylesToClone;
  rowStyle?: CSSProperties;
  cellStyle?: CSSProperties;
}) => void;

function isCSSProperty(key: any): key is keyof CSSStyleDeclaration {
  return key in document.body.style;
}

export class GhostRow {
  #ghostNode: HTMLTableRowElement | null = null;
  #grabHandleOffset: Position = { x: 0, y: 0 };
  #mousePos: Position = { x: 0, y: 0 };
  #isFirefox: boolean;
  #defaultRowCssPropsToClone: StylesToClone;
  #defaultCellCssPropsToClone: StylesToClone;

  static instance: GhostRow | null = null;

  static getInstance() {
    if (!GhostRow.instance) {
      GhostRow.instance = new GhostRow();
    }
    return GhostRow.instance;
  }

  private constructor() {
    // Check if browser is firefox, it doesn't fire mousemove events on drag
    this.#isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
    this.#defaultRowCssPropsToClone = [
      'display',
      'alignItems',
      'verticalAlign',
      'borderCollapse',
    ];
    this.#defaultCellCssPropsToClone = [
      'minWidth',
      'paddingTop',
      'paddingBottom',
      'paddingLeft',
      'paddingRight',
      'fontSize',
      'fontFamily',
      'fontWeight',
      'lineHeight',
      'letterSpacing',
      'verticalAlign',
    ];
  }

  #cloneStyles(
    stylesToClone: StylesToClone,
    sourceStyle: CSSStyleDeclaration,
    targetStyle: CSSStyleDeclaration,
  ) {
    stylesToClone.forEach((prop) => {
      if (isCSSProperty(prop)) {
        targetStyle[prop as any] = sourceStyle[prop as any];
      }
    });
  }

  #cloneRowStyles(
    row: HTMLTableRowElement,
    clonedRow: HTMLTableRowElement,
    rowStylesToClone: StylesToClone,
  ): void {
    const rowStylesToCloneWithDefaults = Array.from(
      new Set([...this.#defaultRowCssPropsToClone, ...rowStylesToClone]),
    );
    const rowStyles = getComputedStyle(row);
    this.#cloneStyles(rowStylesToCloneWithDefaults, rowStyles, clonedRow.style);
  }

  #cloneCellStyles(
    row: HTMLTableRowElement,
    clonedRow: HTMLTableRowElement,
    cellStylesToClone: StylesToClone,
  ): void {
    const cellStylesToCloneWithDefaults = Array.from(
      new Set([...this.#defaultCellCssPropsToClone, ...cellStylesToClone]),
    );
    row.childNodes.forEach((cell, index) => {
      const clonedCell = clonedRow.childNodes[index] as HTMLElement;
      const cellStyles = getComputedStyle(cell as HTMLElement);
      const width = (cell as HTMLElement).offsetWidth;
      clonedCell.style.width = `${width}px`;
      this.#cloneStyles(
        cellStylesToCloneWithDefaults,
        cellStyles,
        clonedCell.style,
      );
    });
  }

  #applyCustomStyles(element: HTMLElement, style: CSSProperties): void {
    Object.entries(style).forEach(([key, value]) => {
      if (isCSSProperty(key)) (element.style as any)[key] = value;
    });
  }

  #addGhostClasses(clonedRow: HTMLTableRowElement, className: string): void {
    clonedRow.classList.add('ghost-row');
    if (className) {
      clonedRow.classList.add(className);
    }
  }

  #addGhostStyles(
    clonedRow: HTMLTableRowElement,
    startY: number,
    width: number,
  ): void {
    const x = -9999;
    const y = startY - this.#grabHandleOffset.y;
    clonedRow.style.width = `${width}px`;
    clonedRow.style.alignItems = 'center';
    clonedRow.style.transform = `translate(${x}px, ${y}px)`;
    clonedRow.style.transition = 'none';
    clonedRow.style.pointerEvents = 'none';
    clonedRow.style.position = 'fixed';
    clonedRow.style.zIndex = '9999';
    clonedRow.style.top = '0';
  }

  #addGhostRowToDom = (ghostRow: HTMLElement) => {
    // Firefox doesn't fire mousemove events on drag
    if (this.#isFirefox) {
      window.addEventListener('dragover', this.#onMouseMove);
    }
    document.body.appendChild(ghostRow);
  };

  #onMouseMove = (e: MouseEvent) => {
    this.#mousePos.x = e.clientX;
    this.#mousePos.y = e.clientY;
  };

  create: GhostRowCreate = ({
    row,
    startX,
    startY,
    className = '',
    rowStyle = {},
    cellStyle = {},
    rowStylesToClone = [],
    cellStylesToClone = [],
  }) => {
    if (!(row instanceof HTMLTableRowElement)) {
      throw new Error('Invalid row element provided.');
    }

    const clonedRow = row.cloneNode(true) as HTMLTableRowElement;
    this.#grabHandleOffset.x = row.offsetLeft + startX;
    this.#grabHandleOffset.y = row.offsetHeight / 2;

    this.#cloneRowStyles(row, clonedRow, rowStylesToClone);
    this.#cloneCellStyles(row, clonedRow, cellStylesToClone);

    this.#applyCustomStyles(clonedRow, rowStyle);
    clonedRow.childNodes.forEach((cell) => {
      this.#applyCustomStyles(cell as HTMLElement, cellStyle);
    });

    this.#addGhostClasses(clonedRow, className);
    this.#addGhostStyles(clonedRow, startY, row.offsetWidth);

    this.#addGhostRowToDom(clonedRow);
    this.#ghostNode = clonedRow;
  };

  move = (posX: number, posY: number) => {
    if (!this.#ghostNode) return;
    const x = this.#isFirefox ? this.#mousePos.x : posX;
    const y = this.#isFirefox ? this.#mousePos.y : posY;
    const offsetX = x - this.#grabHandleOffset.x;
    const offsetY = y - this.#grabHandleOffset.y;
    this.#ghostNode.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  };

  remove() {
    if (!this.#ghostNode) return;
    this.#ghostNode.remove();
    this.#ghostNode = null;
    if (this.#isFirefox) {
      window.removeEventListener('dragover', this.#onMouseMove);
    }
  }
}
