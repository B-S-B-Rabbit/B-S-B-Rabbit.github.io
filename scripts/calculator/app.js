import {
  updateFontSize,
  clickBackspace,
  clickClear,
  clickDigits,
  clickEqual,
  clickFunctions,
  clickOperators,
  clickParenthesis,
  keyButtons,
  keyEqual,
  checkFontSize,
  followLastInput,
} from './calculator-functionality';
import { preventDoubleTouchZoom, moveToCalc } from './page-functionality';

updateFontSize();
clickBackspace();
clickClear();
clickDigits();
clickEqual();
clickFunctions();
clickOperators();
clickParenthesis();
keyButtons();
keyEqual();
checkFontSize();
followLastInput();
moveToCalc();
preventDoubleTouchZoom();
