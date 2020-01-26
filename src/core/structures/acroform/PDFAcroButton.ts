import { PDFDict, PDFName, PDFNumber } from 'src/core';
import {
  PDFCheckBox,
  PDFPushButton,
  PDFRadioButton,
  PDFTerminalField,
} from './index';

class PDFAcroButton extends PDFTerminalField {
  static fromDict(dict: PDFDict): PDFAcroButton {
    const fieldFlags = dict.lookupMaybe(PDFName.Ff, PDFNumber)?.value() || 0;
    const pushButtonFlag = 1 << 16;
    const radioButtonFlag = 1 << 15;
    const isPushButton = !!(fieldFlags & pushButtonFlag);
    const isRadioButton = !!(fieldFlags & radioButtonFlag);

    if (isPushButton && isRadioButton) {
      throw new Error('Invalid button field flags');
    } else if (isPushButton) {
      return PDFPushButton.fromDict(dict);
    } else if (isRadioButton) {
      return PDFRadioButton.fromDict(dict);
    } else {
      return PDFCheckBox.fromDict(dict);
    }
  }

  readonly dict!: PDFDict;

  protected constructor(dict: PDFDict) {
    super(dict);
  }
}

export default PDFAcroButton;