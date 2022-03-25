import React from 'react';
// @ts-ignore
import { PieceType } from '../types.tsx';

export const HatHip: React.FC<PieceType> = ({ strokeColor, backgroundColor }) => (
  <g>
    <path
      d="M372.581 193.192C372.183 170.79 371.743 147.94 368.413 125.756C365.157 104.068 356.2 84.4644 340.808 68.7154C308.115 35.2624 260.725 27.0914 216.613 19.6034L141.194 6.80038C118.185 2.89538 93.6377 -3.34662 70.3907 2.19138C58.9357 4.92038 49.2077 11.2604 40.3167 18.7614C31.7467 25.9914 22.5327 33.7554 16.7257 43.4824C10.9087 53.2234 8.9077 64.6104 7.0167 75.6274C4.8837 88.0484 3.2267 100.566 2.0497 113.114C-0.309298 138.254 -0.631297 163.583 1.0797 188.775C1.9087 200.994 3.2277 213.178 4.9117 225.308C5.7467 231.323 6.6907 237.323 7.7567 243.302C8.0707 245.065 8.3097 247.017 8.6317 248.989C6.2527 255.755 4.9007 262.762 5.0097 269.739C5.3307 290.291 22.6777 303.23 40.1657 310.177C50.3057 314.205 60.9067 316.942 70.8697 321.442C81.3507 326.175 88.4847 333.848 95.6507 342.601C109.318 359.295 124.741 374.299 142.352 386.817C179.69 413.358 226.982 425.911 272.286 416.383C283.156 414.097 294.122 410.547 303.893 405.198C314.209 399.551 321.966 391.368 328.48 381.693C340.575 363.732 349.249 343.507 355.811 322.926C362.504 301.932 367.255 280.9 369.846 259.009C372.428 237.189 372.972 215.147 372.581 193.192L372.581 193.192Z"
      transform="translate(45.99902 88.99984)"
      fill={'#FFFFFF' || backgroundColor}
      stroke="none"
    />
    <path
      d="M329.741 38.5583C314.198 10.4243 271.121 -3.52869 239.911 0.764309C169.075 10.5123 127.36 61.8043 124.697 76.7473C122.543 81.6213 121.144 88.1003 120.312 94.1663C118.648 102.92 118.498 112.895 118.521 122.477L118.545 128.165C134.471 118.65 151.178 110.429 168.316 103.522C171.902 102.077 173.447 107.883 169.911 109.308C144.01 119.745 119.093 133.308 96.5093 149.934C-23.4667 247.345 -43.0067 401.635 103.363 409.245C104.918 409.39 106.479 409.538 108.045 409.687C134.425 412.187 162.279 414.828 187.551 404.848C196.096 420.347 244.427 476.392 252.623 458.55C255.734 452.922 249.568 448.927 244.164 445.425C242.04 444.049 240.033 442.748 238.754 441.455C231.04 435.916 224.799 430.139 217.941 423.234C198.504 404.826 190.79 385.714 179.091 374.998C177.491 371.27 173.948 370.486 169.824 373.055C120.742 388.24 111.943 301.61 156.601 295.858C159.297 295.668 162.046 295.817 164.79 296.203C167.19 297.411 169.722 299.092 172.275 300.785C179.611 305.652 187.113 310.628 192.085 304.819C194.115 302.447 194.068 299.533 193.648 296.603C192.992 292.03 192.132 287.477 191.375 282.92L186.932 256.172C252.637 184.563 354.491 155.73 449.621 166.178C483.029 252.209 490.268 400.919 420.06 461.569C382.599 494.751 333.986 494.214 298.232 462.772C294.217 458.1 290.848 457.898 294.759 464.18L295.044 464.628C331.557 519.017 410.464 498.002 444.348 452.466C487.043 398.723 493.077 278.238 489.207 259.431C542.36 238.895 622.52 147.81 558.701 78.7283C497.54 20.4913 403.947 21.0643 329.741 38.5583ZM168.958 286.014L169.528 285.681L169.522 286.284C169.522 286.686 169.53 287.089 169.54 287.492C168.883 287.162 168.219 286.853 167.547 286.567C168.023 286.462 168.497 286.283 168.958 286.014ZM154.648 315.747C156.175 314.296 158.597 314.995 160.628 315.58C161.602 315.862 162.487 316.117 163.139 316.096C168.284 316.8 173.172 318.973 176.984 321.655C179.501 323.065 181.265 324.389 182.739 325.607L182.765 325.6C182.758 325.603 182.749 325.608 182.742 325.61L182.881 325.704C185.027 327.229 192.884 335.818 187.92 333.508C187.55 333.027 187.171 332.565 186.789 332.112C186.748 332.174 186.691 332.235 186.623 332.294L186.902 332.708C191.121 339.054 183.837 332.368 182.716 330.592C182.663 330.635 182.603 330.664 182.544 330.695L184.003 332.471C184.207 332.723 184.368 332.925 184.501 333.095L184.809 333.392C189.687 338.187 189.839 342.502 184.172 335.413C184.395 335.747 184.574 336.101 184.599 336.415L184.935 336.843C189.384 342.577 185.765 340.541 183.554 338.092L183.369 337.881L183.407 337.938C185.464 341.107 181.383 338.884 180.661 337.189L180.631 337.112C179.845 336.471 179.361 335.751 179.196 335.569L179.165 335.539C175.339 331.619 169.793 328.302 165.082 326.795C164.399 326.665 163.708 326.561 163.01 326.487C160.177 325.855 157.313 325.422 154.419 325.188C154.065 325.146 153.706 324.886 153.438 324.55C149.062 324.402 150.413 322.609 152.228 322.275L152.26 322.27L151.9 322.24C149.091 321.966 147.173 320.958 150.013 320.339L150.373 320.268C150.329 320.199 150.29 320.13 150.252 320.061C147.82 319.794 149.407 317.43 150.757 318.002C150.353 316.681 151.549 316.769 152.39 316.83C152.732 316.855 153.015 316.876 153.109 316.796C153.356 316.522 153.663 316.28 153.84 316.267C154.345 315.91 154.366 315.805 154.426 315.77C154.46 315.751 154.505 315.753 154.648 315.747ZM182.765 325.6C182.77 325.598 182.775 325.596 182.779 325.596L182.765 325.6Z"
      transform="translate(-62.00126 16.99961)"
      fill={'#AAAAAA' || strokeColor}
      fillRule="evenodd"
      stroke="none"
    />
  </g>
);
