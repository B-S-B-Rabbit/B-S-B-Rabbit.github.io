import { FAQ } from './FAQ';
import { setInnerNavShiftingStyling } from './inner-nav';
import { movingSmallSidebar } from './moving-small-sidebar';
import {
  setPreloaderVideoBackround,
  playPause,
} from './video-and-background-setting';

FAQ();
setInnerNavShiftingStyling();
setPreloaderVideoBackround();
movingSmallSidebar('header', 'small-hor-sidebar');
playPause();
