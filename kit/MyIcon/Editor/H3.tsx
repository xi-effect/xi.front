import React from 'react';
import { IconWrap } from './index';

type Props = {
  color?: string;
};

const H3: React.FC<Props> = ({ color = '#333' }) => (
  <IconWrap>
    <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.511364 12V0.363636H2.97159V5.16477H7.96591V0.363636H10.4205V12H7.96591V7.19318H2.97159V12H0.511364ZM16.6818 12.1591C15.8333 12.1591 15.0777 12.0133 14.4148 11.7216C13.7557 11.4261 13.2348 11.0208 12.8523 10.5057C12.4735 9.98674 12.2784 9.38826 12.267 8.71023H14.7443C14.7595 8.99432 14.8523 9.24432 15.0227 9.46023C15.197 9.67235 15.428 9.83712 15.7159 9.95455C16.0038 10.072 16.3277 10.1307 16.6875 10.1307C17.0625 10.1307 17.3939 10.0644 17.6818 9.93182C17.9697 9.79924 18.1951 9.61553 18.358 9.38068C18.5208 9.14583 18.6023 8.875 18.6023 8.56818C18.6023 8.25758 18.5152 7.98295 18.3409 7.74432C18.1705 7.50189 17.9242 7.3125 17.6023 7.17614C17.2841 7.03977 16.9053 6.97159 16.4659 6.97159H15.3807V5.16477H16.4659C16.8371 5.16477 17.1648 5.10038 17.4489 4.97159C17.7367 4.8428 17.9602 4.66477 18.1193 4.4375C18.2784 4.20644 18.358 3.9375 18.358 3.63068C18.358 3.33902 18.2879 3.08333 18.1477 2.86364C18.0114 2.64015 17.8182 2.46591 17.5682 2.34091C17.322 2.21591 17.0341 2.15341 16.7045 2.15341C16.3712 2.15341 16.0663 2.21402 15.7898 2.33523C15.5133 2.45265 15.2917 2.62121 15.125 2.84091C14.9583 3.06061 14.8693 3.31818 14.858 3.61364H12.5C12.5114 2.94318 12.7027 2.35227 13.0739 1.84091C13.4451 1.32955 13.9451 0.929924 14.5739 0.642045C15.2064 0.350378 15.9205 0.204545 16.7159 0.204545C17.5189 0.204545 18.2216 0.350378 18.8239 0.642045C19.4261 0.933712 19.8939 1.32765 20.2273 1.82386C20.5644 2.31629 20.7311 2.86932 20.7273 3.48295C20.7311 4.13447 20.5284 4.67803 20.1193 5.11364C19.714 5.54924 19.1856 5.82576 18.5341 5.94318V6.03409C19.3902 6.14394 20.0417 6.44129 20.4886 6.92614C20.9394 7.4072 21.1629 8.00947 21.1591 8.73295C21.1629 9.39583 20.9716 9.98485 20.5852 10.5C20.2027 11.0152 19.6742 11.4205 19 11.7159C18.3258 12.0114 17.553 12.1591 16.6818 12.1591Z"
        fill={color}
      />
    </svg>
  </IconWrap>
);

export default H3;
