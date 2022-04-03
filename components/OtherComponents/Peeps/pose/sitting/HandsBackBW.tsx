import React from 'react';
// @ts-ignore
import { PieceType } from '../../types.tsx';

export const HandsBackBW: React.FC<PieceType> = ({ strokeColor, backgroundColor }) => (
  <g transform="translate(-162 464)">
    <path
      d="M340.529 1331.77C386.209 1404.1 440.234 1481.41 534.718 1476.11C585.495 1475.5 643.657 1460.93 695.132 1440.66C724.48 1428.08 724.453 1395.2 724.43 1367.63C724.43 1366.8 724.429 1365.98 724.429 1365.16C724.804 1350.65 724.264 1336.71 723.733 1322.99C723.416 1314.8 723.102 1306.68 722.987 1298.55C734.799 1304.11 750.073 1308.06 762.77 1303C777.024 1298.05 777.754 1293.55 775.186 1280.44C809.626 1295.65 846.789 1311.27 878.682 1334.02C929.101 1367.72 983.117 1418.76 1045.98 1419.31C1084.52 1419.07 1121.82 1402.7 1159.01 1396.43C1159.28 1395.37 1163.86 1394.32 1164.6 1394.21C1164.66 1394.13 1166.42 1391.64 1166.42 1391.64C1180.4 1385.57 1191.33 1372.94 1197.42 1363.79C1212.15 1350.87 1224.35 1335.53 1232.06 1316.85C1256.3 1254.5 1250.21 1151.93 1200.44 1092.76C1197.63 1093.93 1192.75 1097.32 1190.46 1099.34C1187.72 1095.21 1184.31 1090.01 1181.49 1086.09L1189.23 1079.81C1130.86 1023.03 1082.13 977.184 1007.68 932C1001.62 928.543 995.452 925.255 989.773 922.416L985.907 924.049L984.591 922.282L984.049 923.196C981.612 922.305 979.038 920.855 976.57 919.965C974.171 916.687 971.861 913.284 969.754 909.786L969.994 909.602C956.672 888.509 950.675 863.68 941.719 840.518C918.449 770.433 888.819 703.059 873.76 630.513C869.141 599.98 869.17 569.433 869.2 538.906C869.233 504.877 869.266 470.874 862.859 436.945C872.1 435.431 905.235 435.461 907.82 426.902C907.038 424.012 903.533 424.195 900.55 424.351C899.334 424.414 898.205 424.473 897.382 424.317C898.14 396.733 894.257 369.747 890.327 342.444C888.613 330.53 886.889 318.556 885.539 306.444C882.013 274.743 873.248 243.599 846.047 223.427C784.255 174.183 667.538 184.791 642.161 94.7274C635.706 73.5224 634.976 49.7164 626.49 29.3194C607.058 -5.54763 531.815 -11.0066 505.652 22.1074C495.116 33.3704 490.31 49.1864 482.402 62.5444C440.589 128.367 385.831 155.346 305.129 181.817C231.694 199.17 181.416 231.76 174.707 311.434C167.484 359.687 169.679 405.211 175.371 458.4C178.529 459.44 182.837 458.659 185.161 461.228C187.916 460.805 191.367 461.765 193.612 463.038L198.745 463.175C206.828 530.532 188.872 597 171.411 661.636C169.35 669.264 167.296 676.866 165.293 684.441C135.528 786.7 131.222 927.428 129.313 1042.41C108.168 1073.17 96.7421 1104.7 86.9632 1138.17C75.2011 1171.52 81.1972 1207.56 56.5752 1235.58C39.6432 1250.86 6.76815 1261.35 0.795151 1283.48C-7.34068 1317.34 48.5765 1302.85 94.4544 1290.96C117.541 1284.97 138.086 1279.65 146.646 1281.47C166.178 1280.25 184.312 1284.38 202.647 1288.56C205.226 1289.15 207.809 1289.74 210.401 1290.31C213.065 1291.55 216.358 1287.86 218.826 1285.08C219.806 1283.98 220.656 1283.03 221.285 1282.59C222.023 1284.89 222.755 1287.21 223.491 1289.54C234.326 1323.9 245.901 1360.61 289.725 1358.37C302.855 1357.04 318.064 1353.4 325.536 1341.4C330.392 1338.52 335.72 1334.95 340.529 1331.77ZM206.985 1059.94C228.841 1011.64 252.598 955.368 272.445 905.792L276.111 896.487C276.611 896.919 277.363 897.881 278.247 899.011C280.357 901.708 283.217 905.363 285.181 905.064C303.934 905.445 308.859 928.56 306.841 943.439C298.568 984.677 291.794 1027.88 295.42 1070.08L295.429 1070.07C295.709 1074 296.327 1080.94 296.784 1084.84C293.853 1084.88 288.639 1084.93 285.745 1085.02L284.283 1075.23C258.286 1082.22 232.817 1091.47 210.164 1106.21C213.815 1095.32 211.558 1084.27 209.317 1073.3C208.403 1068.83 207.492 1064.37 206.985 1059.94Z"
      transform="translate(82.00014 -77.99747)"
      fill={backgroundColor || '#FFFFFF'}
      fillRule="evenodd"
      stroke="none"
    />
    <path
      d="M496.473 3.72878C500.513 -4.00122 512.723 1.43878 510.353 9.57877C504.313 30.2998 489.813 49.8888 475.823 66.0188C461.753 82.2398 445.243 96.3198 427.473 108.359C425.523 114.959 425.943 121.309 428.583 127.749C429.593 130.209 428.543 132.079 426.803 133.03C428.583 139.629 429.683 146.51 431.543 153.059C436.393 170.139 444.173 186.49 454.343 201.05C472.643 227.26 498.553 247.26 529.883 254.97C560.603 262.53 594.453 258.189 621.143 240.749C645.183 225.039 662.353 200.379 665.173 171.439C666.483 157.939 665.263 144.399 662.133 131.229C660.473 124.249 658.333 117.389 655.813 110.68C653.153 103.609 649.593 96.8688 647.633 89.5788C647.453 88.9098 647.403 88.2398 647.453 87.5788C643.563 81.2688 642.313 73.3588 644.603 66.0588C644.713 65.6998 644.853 65.3688 645.023 65.0698C644.873 63.8288 644.723 62.5788 644.603 61.3288C644.103 56.3588 644.263 51.4898 644.023 46.5498C643.938 44.8659 643.774 43.2529 643.613 41.6595C643.319 38.7661 643.033 35.938 643.233 32.8688C643.273 32.2488 644.023 32.0698 644.373 32.5698C647.491 37.0208 648.046 41.1735 649.62 46.162L649.793 46.6998C651.533 52.0498 652.893 57.3688 654.343 62.8088C656.583 71.2398 659.733 79.1798 664.433 86.5498C672.663 99.4298 684.053 109.859 696.783 118.2C746.003 150.419 809.333 151.339 856.153 188.349C867.413 197.249 877.183 208.399 883.763 221.209C891.959 237.156 894.861 254.698 897.429 272.232L897.863 275.209C900.823 295.609 903.483 316.059 905.793 336.539C906.943 346.7 908.003 356.879 908.983 367.059C909.165 368.948 909.427 370.888 909.693 372.854C910.375 377.901 911.079 383.111 910.503 388.019C911.403 388.03 912.293 388.129 913.173 388.379C916.953 389.419 920.073 392.26 920.203 396.339C920.495 405.916 908.144 407.769 900.053 408.983C899.185 409.113 898.366 409.236 897.617 409.36L897.153 409.439C890.273 410.629 883.333 411.559 876.363 412.07C878.833 425.419 879.733 438.999 880.433 452.619C881.107 465.68 881.347 478.784 881.517 491.88L881.715 507.943C881.779 513.552 881.796 519.179 881.813 524.816C881.887 549.658 881.962 574.688 886.063 599.149C890.407 625.099 898.64 650.131 907.18 674.97L910.763 685.359C921.143 715.45 931.433 745.569 942.143 775.539C947.503 790.529 952.833 805.539 958.173 820.539C960.843 828.039 963.483 835.549 966.183 843.039C967.173 845.769 968.293 848.49 969.293 851.229C969.763 851.74 970.163 852.339 970.413 853.079C972.963 860.649 976.303 867.839 980.293 874.669C985.113 878.349 989.773 882.049 994.203 886.2C994.243 886.229 994.263 886.279 994.293 886.319C995.523 885.799 996.973 885.749 998.483 886.499C1004.68 889.589 1010.78 892.869 1016.79 896.269C1016.86 896.299 1016.92 896.319 1016.98 896.349C1017 896.369 1017.01 896.389 1017.02 896.41C1053.99 917.369 1087.57 943.869 1119.76 971.549C1136.11 985.609 1152.31 999.879 1168.29 1014.36C1183.44 1028.09 1198.24 1042.31 1211.15 1058.2C1223.98 1073.99 1234.75 1091.22 1241.95 1110.31C1249.62 1130.65 1253.24 1152.29 1255.64 1173.82L1255.78 1175.17C1259.89 1213.05 1259.05 1253.26 1243.96 1288.82C1236.41 1306.61 1225.17 1322.44 1210.63 1335.2C1210.02 1335.74 1209.39 1336.25 1208.77 1336.78C1200.55 1348.95 1189.72 1359.92 1176.79 1366.02L1175.34 1368.08L1174.6 1369.11L1169.53 1370.41L1169.05 1370.89C1167.39 1372.52 1165.4 1372.63 1163.76 1371.9L1146.12 1376.44L1128.48 1380.98C1104.94 1387.05 1081.11 1393.96 1056.66 1394.86C1033.75 1395.71 1011.77 1389.67 991.093 1380.18C970.943 1370.94 952.423 1358.49 934.253 1345.88C916.583 1333.62 899.203 1320.94 881.613 1308.55C875.393 1304.17 869.143 1299.87 862.833 1295.66C861.449 1294.94 860.078 1294.23 858.714 1293.56L857.693 1293.07C851.353 1290.08 845.223 1286.57 838.983 1283.38C826.503 1276.99 813.823 1270.97 801.103 1265.07C797.043 1263.18 792.923 1261.38 788.783 1259.63C788.933 1260.86 788.923 1262.11 788.733 1263.29C787.493 1271.38 778.093 1275.65 771.293 1278.24C765.593 1280.42 759.273 1281.19 753.193 1280.88C747.143 1280.57 741.013 1279.36 735.373 1277.08C735.373 1277.13 735.373 1277.17 735.383 1277.22C736.475 1293.35 736.911 1309.55 736.858 1325.73L736.828 1331.26C736.823 1332.44 736.819 1333.62 736.815 1334.81C736.767 1349.61 736.716 1364.87 733.603 1379.26C730.003 1395.9 719.393 1408.54 704.063 1415.72C690.629 1422.02 676.006 1426.12 661.78 1430.38L658.843 1431.26C627.853 1440.64 596.093 1447.99 563.773 1450.75C533.143 1453.36 501.203 1451.15 472.333 1439.95C441.363 1427.93 416.513 1406.86 395.933 1381.1C379.541 1360.58 364.773 1338.72 350.093 1316.88L345.263 1309.69C342.383 1311.6 339.463 1313.46 336.503 1315.26C335.523 1317.2 334.113 1318.95 332.093 1320.57C328.803 1323.22 325.373 1325.61 321.573 1327.46C313.633 1331.32 305.273 1333.47 296.463 1333.99C280.133 1334.94 263.213 1329.17 251.313 1317.87C235.843 1303.16 231.973 1282.37 225.223 1263.29C222.873 1265.69 219.343 1266.44 215.813 1265.86C205.203 1264.16 194.983 1260.6 184.323 1258.93C174.063 1257.31 163.573 1256.82 153.193 1257.1C133.336 1257.64 114.462 1262.38 95.4707 1267.73L90.5311 1269.13C73.2863 1274 55.7769 1278.69 37.8028 1279.53L35.5723 1279.63C27.0379 1279.96 16.7308 1279.92 9.28281 1276.06C-0.137185 1271.18 -1.67719 1260.49 1.50281 1251.17C6.07281 1237.73 16.4628 1228.54 28.0628 1221.02C38.2328 1214.43 50.2328 1208.96 58.8428 1200.84C70.0866 1190.23 73.3342 1174.16 76.0499 1159.55L76.1628 1158.94C79.4428 1141.22 82.8528 1123.64 87.5528 1106.23C92.2428 1088.85 98.3128 1071.87 105.453 1055.35C112.433 1039.18 120.403 1022.74 130.863 1008.49C130.873 1008.46 130.883 1008.44 130.893 1008.42C130.783 1007.84 130.693 1007.25 130.653 1006.61C130.534 1004.81 130.587 1002.97 130.639 1001.14C130.661 1000.37 130.684 999.59 130.693 998.819L130.843 982.249C130.953 971.519 131.083 960.799 131.263 950.069C131.623 927.979 132.103 905.869 133.113 883.799C136.683 805.7 145.913 728.249 165.873 652.539C175.543 615.829 186.133 579.209 193.423 541.93C197.353 521.839 199.843 501.78 200.953 481.629C201.323 467.32 200.883 452.97 199.623 438.66C198.893 438.639 198.123 438.459 197.343 438.05C196.303 437.499 195.203 437.109 194.073 436.789L191.113 436.869C189.383 436.919 188.123 436.229 187.323 435.2C186.823 435.059 186.323 434.91 185.833 434.74C182.963 434.55 180.123 433.939 177.283 432.919C176.543 432.649 176.163 432.119 176.083 431.339C175.743 428.26 175.413 425.169 175.093 422.079C174.433 419.3 174.213 416.37 174.223 413.399C171.533 385.359 169.913 357.079 170.803 328.919C170.163 327.6 170.313 326.189 170.943 324.99C171.543 309.979 172.873 295.019 175.163 280.149L175.493 278.038C180.977 243.53 191.059 207.903 219.273 185.079C245.383 163.959 278.283 155.459 309.733 145.709L312.533 144.835C352.181 132.374 391.189 116.443 425.043 91.9588C440.583 80.7198 454.813 67.5388 467.053 52.7798C473.203 45.3688 478.753 37.4698 483.603 29.1488C488.433 20.8888 492.053 12.1798 496.473 3.72878ZM413.303 117.359C414.293 116.78 415.253 116.16 416.233 115.57C416.213 116.289 416.213 117.019 416.233 117.74C415.323 117.49 414.363 117.349 413.303 117.359ZM813.643 442.059C814.143 429.639 814.633 417.22 815.033 404.789C816.003 405.37 816.783 405.97 818.233 406.399C820.593 407.089 823.003 407.66 825.393 408.22C830.163 409.339 835.003 410.12 839.853 410.789C848.973 412.05 858.063 412.62 867.263 412.49C868.393 412.47 869.523 412.439 870.643 412.399C865.531 438.33 865.645 465.731 865.227 492.034L865.173 495.249C865.081 500.265 864.964 505.288 864.848 510.317C864.231 536.919 863.611 563.658 866.563 590.099C869.87 619.731 878.431 648.071 887.924 676.213L888.983 679.339C899.183 709.359 909.683 739.289 919.593 769.399C925.183 786.389 930.793 803.379 936.413 820.359L944.68 845.37C947.538 854.214 949.097 864.481 956.463 870.629C957.293 871.319 958.223 871.849 959.223 872.22C959.393 872.569 959.553 872.91 959.733 873.26L957.043 872.089C940.163 863.099 923.153 854.349 906.103 845.769C904.633 845.029 903.203 845.049 901.993 845.539C894.663 841.769 887.293 838.049 879.843 834.519C877.125 833.235 874.392 831.994 871.659 830.766L866.193 828.319C865.843 827.799 865.523 827.26 865.253 826.68C862.913 821.682 864.481 815.649 866.086 810.418L866.873 807.879C867.323 806.439 867.133 805.189 866.563 804.209C867.523 795.839 867.163 787.419 865.513 779.829C861.956 763.423 853.648 748.334 845.251 733.868L842.008 728.299C832.819 712.452 824.785 696.5 819.543 678.859C809.023 643.496 807.971 606.516 808.647 569.904L808.703 567.089C809.563 525.399 811.973 483.72 813.643 442.059ZM209.413 436.51C241.643 436.229 273.863 437.849 305.913 441.359C309.783 477.369 314.203 513.279 318.773 549.189L319.064 551.48C323.418 585.859 327.084 620.52 326.683 655.209C326.483 672.66 325.293 690.149 322.423 707.369C319.653 724.01 315.443 740.359 310.963 756.609C306.463 772.899 301.623 789.109 297.653 805.539C291.633 820.639 285.083 835.519 278.343 850.309C261.343 887.619 243.763 924.649 227.113 962.119C225.513 965.725 223.918 969.334 222.327 972.944L212.783 994.609C210.393 1000.03 208.003 1005.45 205.613 1010.86L205.38 1011.38C204.967 1012.3 204.537 1013.22 204.108 1014.15C201.783 1019.13 199.448 1024.14 199.473 1029.73C199.493 1033.8 201.913 1036.75 205.063 1038.06C203.723 1045.93 203.283 1053.91 203.193 1061.89C203.143 1066.65 206.273 1070.57 210.413 1072.1C210.403 1073.13 210.373 1074.15 210.323 1075.18C210.263 1075.24 210.203 1075.3 210.143 1075.35C188.413 1097.33 182.503 1129.2 182.683 1159.01C182.773 1174.6 184.363 1190.32 187.023 1205.67C188.653 1215.09 192.763 1222.86 200.303 1228.82C205.633 1233.03 211.693 1237.1 215.163 1242.22C215.873 1243.28 216.543 1244.35 217.183 1245.44C202.879 1239.44 185.911 1237.48 170.713 1236.52L168.823 1236.41C150.473 1235.34 131.993 1237.1 114.073 1241.14C96.7528 1245.04 79.9228 1250.87 62.5828 1254.75C54.1328 1256.64 45.5828 1257.94 36.9028 1258.14C32.7328 1258.23 28.5228 1258.12 24.3728 1257.65C24.0757 1257.61 23.7328 1257.54 23.3685 1257.45L22.5228 1257.24C23.7128 1253.59 25.8428 1250.52 28.8928 1247.45C32.6617 1243.65 35.9012 1241.37 40.2759 1238.53L41.9728 1237.44C52.5828 1230.64 63.6328 1224.48 72.4228 1215.28C83.6728 1203.49 89.0028 1188.37 91.7828 1172.58C94.7628 1155.66 96.6828 1138.56 99.5428 1121.62C101.893 1107.63 104.593 1093.64 107.903 1079.82C111.783 1067.65 116.843 1055.87 122.593 1044.41C127.003 1035.63 131.883 1027.13 136.643 1018.55C140.623 1022.24 146.563 1021.56 149.933 1016.79L150.462 1016.05C151.89 1014.1 153.424 1012.14 154.073 1009.78C154.626 1007.78 154.598 1005.54 154.572 1003.41C154.565 1002.84 154.559 1002.28 154.563 1001.74L154.683 987.119C154.773 977.049 154.883 966.97 155.023 956.899C155.293 937.399 155.693 917.899 156.353 898.399C157.683 859.189 159.813 819.999 164.233 780.999C172.903 704.43 194.923 630.269 204.413 553.829C205.583 544.43 206.603 534.919 207.353 525.339C211.483 495.95 212.193 466.119 209.413 436.51ZM251.683 594.489C259.803 594.377 267.94 594.727 276.03 595.547L280.24 595.998C288.477 596.898 296.466 597.987 302.803 603.959C306.543 607.499 304.713 614.229 299.763 615.479C292.809 617.242 286.221 615.635 279.521 614C277.858 613.595 276.187 613.187 274.503 612.829C266.663 611.149 258.743 609.939 250.743 609.239C234.323 607.799 217.903 607.859 201.433 607.659C199.263 607.639 199.223 604.899 200.963 604.159C216.913 597.449 234.443 594.719 251.683 594.489ZM847.953 843.809C851.323 840.809 854.243 837.299 856.703 833.43C857.283 833.789 857.883 834.129 858.463 834.479C859.643 836.16 861.113 837.74 862.923 839.209C867.833 843.18 873.743 845.609 879.413 848.249L884.92 850.808C890.429 853.361 895.945 855.896 901.473 858.41C908.393 861.559 915.343 864.68 922.293 867.769C929.483 871.079 936.723 874.289 944.003 877.439C947.613 879.279 951.273 881.01 955.053 882.43C982.633 897.24 1009.86 912.72 1036.45 929.169C1073.63 952.18 1109.59 977.629 1141.15 1008.01C1171.69 1037.4 1198.21 1071.81 1214.23 1111.33C1230.47 1151.4 1235.07 1195.31 1227.46 1237.89C1220.8 1275.14 1205.5 1310.63 1182.55 1340.54C1180.11 1342.71 1177.56 1344.76 1174.92 1346.68C1167.03 1348.63 1159.15 1350.58 1151.27 1352.54C1128.43 1358.23 1105.64 1364.63 1082.55 1369.25C1061.35 1373.48 1040.46 1373.85 1019.69 1367.35C1000.53 1361.36 982.992 1351.14 966.276 1340.17L964.233 1338.83C950.682 1329.87 937.453 1320.42 924.282 1310.9L912.133 1302.1C901.173 1294.17 890.163 1286.26 879.003 1278.57C876.223 1277.67 873.443 1276.78 870.653 1275.91L868.673 1276.44L867.84 1275.94C867.282 1275.61 866.72 1275.29 866.153 1274.97C861.045 1272.12 855.749 1269.56 850.439 1267.07L847.253 1265.59C834.053 1259.44 820.683 1253.75 807.003 1248.74C782.633 1239.81 756.713 1230.48 730.553 1228.55C730.113 1225.2 729.663 1221.85 729.173 1218.51L731.463 1220.25L731.287 1218.97C730.592 1213.84 729.964 1208.7 728.783 1203.64C728.453 1202.26 729.113 1201.08 730.093 1200.42C729.823 1199.61 729.563 1198.79 729.313 1197.97C728.063 1197.35 726.803 1196.7 725.553 1196.01C725.426 1195.3 725.296 1194.6 725.165 1193.89L724.373 1189.67C725.64 1190.8 726.92 1191.9 728.177 1192.97L730.043 1194.54C736.763 1200.21 743.903 1205.25 751.343 1209.96C758.593 1214.55 766.103 1218.69 773.823 1222.43L778.273 1224.6C784.77 1227.75 791.344 1230.61 798.653 1230.72C802.933 1230.78 806.053 1224.66 802.403 1221.68C795.683 1216.2 787.743 1213.91 779.903 1210.35C772.603 1207.04 765.443 1203.4 758.433 1199.53C752.833 1196.43 747.367 1193.09 741.929 1189.72L737.853 1187.19C732.583 1183.91 727.313 1179.86 721.803 1176.65C721.683 1176.06 721.573 1175.46 721.443 1174.87C712.583 1132.93 699.933 1091.34 682.903 1051.73C684.373 1048.47 685.663 1045.12 687.073 1041.82C690.953 1032.75 695.303 1023.75 700.493 1015.35C705.483 1007.25 711.093 999.659 717.593 992.709C724.743 985.069 732.463 978.7 736.993 968.999C739.763 963.059 735.233 957.41 728.893 958.459C717.351 960.376 709.288 968.144 702.106 976.759L701.403 977.609C694.373 986.149 688.033 995.269 683.013 1005.13C678.933 1013.14 675.443 1021.43 673.033 1030.06C672.123 1028.17 671.203 1026.28 670.273 1024.4C660.943 1002.37 650.073 981.029 637.693 960.519C634.373 955.019 625.723 960.039 629.063 965.569C637.373 979.329 645.003 993.47 651.933 1007.94C656.858 1020.87 661.45 1033.93 666.003 1046.99L668.733 1054.82C679.553 1085.86 688.283 1117.69 695.543 1149.75C710.073 1213.94 716.673 1279.86 714.423 1345.65L714.406 1346.18C714.353 1347.91 714.325 1349.71 714.297 1351.56C714.115 1363.46 713.903 1377.29 706.713 1386.6C698.743 1396.92 683.253 1399.76 671.493 1403.29L669.406 1403.91C640.882 1412.44 611.944 1420.32 582.483 1424.82C554.313 1429.13 524.783 1429.9 497.123 1422.95C468.483 1415.75 444.493 1399.99 424.633 1378.32C402.783 1354.48 385.553 1326.47 367.333 1299.87L336.177 1254.36L305.013 1208.85L289.293 1185.89C286.303 1181.52 281.123 1179.15 276.133 1180.39C276.183 1175.16 276.483 1169.93 276.953 1164.71C277.883 1154.32 280.683 1143.62 284.963 1134.11C289.323 1124.44 295.223 1115.6 302.463 1107.86C303.743 1106.49 305.083 1105.18 306.443 1103.89C311.843 1123.37 319.293 1142.25 329.003 1160.04C344.083 1187.67 364.76 1211.74 385.687 1235.09L389.988 1239.87C401.379 1252.52 412.845 1265.13 423.603 1278.33C429.113 1285.09 434.383 1292.02 439.323 1299.2C444.703 1307.03 449.033 1315.54 455.553 1322.48C462.513 1329.88 474.573 1322.16 472.163 1312.81C470.213 1305.26 466.122 1298.82 461.8 1292.43L460.063 1289.87C455.153 1282.64 449.883 1275.66 444.473 1268.8C434.283 1255.88 423.313 1243.61 412.273 1231.42L406.64 1225.2C386.722 1203.22 366.802 1181.04 351.633 1155.42C339.013 1134.08 330.263 1111.15 324.623 1087.43C325.133 1086.5 325.553 1085.5 325.833 1084.41C325.853 1084.35 325.863 1084.28 325.873 1084.22C325.363 1082.26 324.973 1080.27 324.673 1078.24C324.023 1077.35 323.173 1076.58 322.163 1076.03C315.703 1042.76 315.073 1008.18 318.333 974.369C320.223 972.879 321.603 970.529 321.893 967.2C323.323 950.879 326.523 934.76 327.663 918.41C328.383 908.129 328.223 898.01 327.103 887.939L327.272 886.387C327.444 884.932 327.655 883.437 327.783 881.95C372.353 908.43 427.813 914.729 479.343 915.069C516.743 915.319 554.283 913.019 591.513 909.539C630.653 905.869 669.723 900.22 707.923 890.839C729.333 885.579 750.453 879.119 771.033 871.2C778.833 868.2 786.663 865.049 794.403 861.669L794.563 861.649C804.043 859.889 813.253 857.059 822.043 853.229C822.833 853.47 823.663 853.609 824.493 853.7C827.973 852.349 831.453 851.019 834.963 849.799C836.763 849.099 838.573 848.43 840.403 847.789C842.893 846.419 845.403 845.069 847.953 843.809ZM981.273 876.309C982.756 878.76 984.327 881.168 985.986 883.525L986.823 884.7L989.943 886.01C990.393 886.189 990.783 886.419 991.133 886.68C991.593 886.859 992.063 887.029 992.523 887.2C988.563 883.76 984.893 880.089 981.273 876.309ZM267.893 918.339C273.463 904.799 279.043 891.249 284.413 877.619C285.903 879.369 288.213 880.569 291.353 880.689L291.803 880.711C306.543 881.629 308.5 901.38 307.263 912.399C306.313 920.869 304.043 929.2 302.453 937.569C300.833 946.119 299.493 954.709 298.333 963.329C295.063 987.839 294.123 1012.62 295.643 1037.26C282.193 1040.94 268.763 1044.73 255.733 1049.72C248.113 1052.64 239.123 1055.78 231.503 1060.39C229.253 1061.46 227.063 1062.62 224.923 1063.89C225.223 1062.31 225.213 1060.64 224.833 1058.96C223.073 1051.09 221.763 1043.13 220.293 1035.2L220.264 1035.04C220.11 1034.15 219.924 1032.51 219.623 1030.65C221.063 1028.04 222.143 1025.2 223.363 1022.37C225.583 1017.24 227.803 1012.1 230.033 1006.97L245.428 971.365C253.035 953.745 260.586 936.081 267.893 918.339ZM898.193 976.879C898.493 976.389 897.753 975.789 897.383 976.249C889.163 986.569 879.983 996.389 873.343 1007.86C866.463 1019.74 860.833 1032.18 856.263 1045.12C847.083 1071.11 841.493 1099 847.183 1126.41C848.203 1131.28 856.343 1131.46 857.223 1126.41C861.663 1100.89 863.453 1074.91 869.943 1049.78C873.133 1037.42 877.153 1025.15 881.903 1013.3L882.827 1010.97C887.415 999.328 891.565 987.576 898.193 976.879ZM443.053 1019.37L444.439 1018.62C465.784 1007.16 491.094 997.576 515.533 999.749C522.293 1000.35 524.183 1009.88 517.183 1011.9C494.363 1018.49 471.183 1022.09 449.163 1031.42C427.153 1040.74 407.923 1054.13 388.743 1068.15C387.983 1068.71 386.943 1067.62 387.453 1066.87C401.193 1046.71 421.823 1030.94 443.053 1019.37ZM291.973 1048.65L296.413 1047.42C296.443 1047.8 296.473 1048.17 296.513 1048.55C295.003 1048.57 293.493 1048.61 291.973 1048.65ZM292.209 1051.32L296.663 1050.16C297.113 1054.88 297.653 1059.59 298.303 1064.29C299.093 1070.05 300.053 1075.79 301.163 1081.5C296.228 1085.44 291.841 1090.4 288.623 1094.27L287.873 1095.18C279.923 1104.87 273.993 1115.92 269.903 1127.76C265.963 1139.17 264.023 1151.27 264.373 1163.34C264.553 1169.34 265.473 1175.19 267.163 1180.95C267.633 1182.54 268.193 1184.26 268.863 1185.99C266.773 1189.62 266.383 1194.31 268.813 1197.86L333.943 1292.98C334.943 1294.44 335.943 1295.91 336.943 1297.38C335.963 1298 335.003 1298.66 334.043 1299.34C331.933 1298.25 329.393 1297.86 327.153 1298.31C319.773 1299.78 316.843 1304.05 310.513 1307.26C306.793 1309.15 300.363 1310.72 296.463 1310.96C289.973 1311.35 286.223 1310.9 280.273 1309.01C275.943 1307.63 271.223 1305.07 268.003 1302.1C259.762 1294.51 255.535 1284.12 251.888 1273.48L251.453 1272.2C247.323 1259.97 243.773 1247.32 237.413 1236.01C234.213 1230.33 230.153 1224.84 225.313 1220.45C220.713 1216.28 213.303 1213.25 210.173 1207.72C206.943 1202.02 206.673 1193.76 205.713 1187.35L205.433 1185.42C204.615 1179.62 204.007 1173.8 203.593 1167.97C201.803 1142.75 203.483 1115.09 217.523 1093.23C234.271 1067.17 263.917 1058.68 292.209 1051.32ZM1192.76 1052.24C1194.64 1054.88 1196.47 1057.55 1198.26 1060.25C1198.58 1060 1198.93 1059.77 1199.3 1059.58C1197.17 1057.1 1194.98 1054.65 1192.76 1052.24ZM1072.79 1119.16C1072.08 1118.63 1072.74 1117.43 1073.5 1117.94C1092.46 1130.6 1110.34 1146.03 1124.31 1164.11C1139.19 1183.35 1150.64 1204.88 1158.75 1227.79C1161.77 1236.35 1147.42 1240.43 1145.1 1231.55C1133.78 1188.35 1108.98 1146.05 1072.79 1119.16ZM731.383 1235.13C732.633 1245.35 733.673 1255.6 734.523 1265.85C740.213 1266.43 745.933 1265.92 751.583 1263.93C755.743 1262.48 759.753 1260.25 763.403 1257.79C766.043 1256 768.323 1253.93 770.973 1252.34L764.953 1249.91C753.586 1245.32 742.271 1240.62 731.383 1235.13ZM522.133 1264.12C522.583 1263.32 523.723 1264.02 523.343 1264.83C519.053 1274.12 516.453 1284.66 514.063 1294.59C511.906 1303.55 510.282 1312.55 509.508 1321.73L509.274 1324.7C509.242 1325.1 509.209 1325.5 509.175 1325.9C508.515 1333.93 507.782 1342.84 511.613 1350.06C514.347 1355.21 519.713 1361.38 525.479 1363.04L525.833 1363.14C532.703 1364.89 531.773 1374.01 525.833 1376.16C514.483 1380.25 502.473 1374.93 496.263 1365C489.733 1354.58 489.793 1341.5 492.313 1329.87C494.863 1318.1 500.003 1306.53 504.913 1295.57C509.863 1284.54 516.263 1274.62 522.133 1264.12Z"
      transform="translate(74.00008 -46.99828)"
      fill={strokeColor || '#000000'}
      fillRule="evenodd"
      stroke="none"
    />
  </g>
);