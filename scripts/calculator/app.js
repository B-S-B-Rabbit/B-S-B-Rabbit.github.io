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
  inputCalcValidity,
} from './calculator-functionality';
import {
  preventDoubleTouchZoom,
  getLastUpdates,
  moveToCalc,
  showListItem,
} from './page-functionality';
import { movingSmallSidebar } from '../using/moving-small-sidebar';

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
getLastUpdates();
showListItem();
movingSmallSidebar('header', 'project-updates');
inputCalcValidity();
