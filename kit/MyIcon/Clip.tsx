import { SvgIcon } from '@mui/material';

type Props = {
  color?: string;
  size?: number;
  fontSize?: number;
  [key: string]: any;
};

const Clip = ({ color = '#000', size = 24, fontSize, ...props }: Props) => (
  <SvgIcon
    style={{ fontSize: fontSize ?? '' }}
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M7.234 7.35c-1.598 1.6-2.939 2.973-2.979 3.05-.054.102-.074.227-.074.46-.001.278.013.345.11.509.233.397.716.584 1.17.453l.239-.068 2.921-2.917 2.921-2.918 2.668.011 2.668.01-.649 1.23c-.357.676-.658 1.23-.669 1.23a.88.88 0 0 1-.136-.183c-.159-.253-.57-.65-.84-.812-.412-.248-.712-.334-1.235-.356-.289-.011-.568 0-.72.03-.324.063-.748.262-1.049.492-.348.266-6.61 6.557-6.858 6.889-.854 1.146-1.063 2.777-.526 4.097a4.197 4.197 0 0 0 2.063 2.223c.521.257.879.361 1.452.423.987.106 1.991-.149 2.855-.724.316-.211 7.924-7.789 8.29-8.259a5.864 5.864 0 0 0 1.123-2.394c.066-.329.144-1.144.114-1.196-.01-.016-.05-.03-.09-.03-.075 0-.05-.059-1.324 3.022l-.415 1.002-2.535 1.398a223.932 223.932 0 0 1-2.582 1.413c-.026.008.926-.964 2.116-2.16 1.268-1.275 2.222-2.266 2.305-2.395.774-1.202.9-2.599.349-3.893-.382-.898-1.268-1.747-2.197-2.104-.478-.184-.876-.254-1.46-.254-.607 0-.989.071-1.507.278-.675.27-.876.439-2.888 2.421L8.01 9.157l-.028-.208a.982.982 0 0 0-.29-.614c-.18-.18-.332-.253-.599-.287l-.225-.028 1.746-1.693c.96-.932 1.746-1.707 1.746-1.724 0-.041-.137-.163-.184-.163-.02 0-1.345 1.31-2.942 2.91m4.095 1.88.011 1.11-2.56 2.58c-2.658 2.679-2.736 2.766-2.915 3.275-.099.28-.135 1.01-.066 1.341.08.385.333.833.649 1.15.155.154.266.294.247.31-.048.042-1.366.764-1.393.764-.012 0-.022-1.273-.022-2.83V14.1l2.99-2.99c1.644-1.644 3.003-2.99 3.019-2.99.016 0 .035.5.04 1.11m4.314.028a2.631 2.631 0 0 1-.349 1.735c-.079.125-.521.605-.983 1.067-.682.683-.834.818-.812.72.021-.098 1.033-2.049 1.853-3.573.202-.377.219-.374.291.051m-2.092-.111a.645.645 0 0 1 .277.444c.04.299-.067.437-1.199 1.554-1.225 1.21-1.097 1.204-1.104.055l-.005-.741.67-.668c.368-.367.715-.686.77-.709.147-.061.469-.025.591.065m-1.096 5.143c-.406.793-1.117 2.104-1.169 2.154a1.873 1.873 0 0 1-.293.191l-.226.127-.023-.111a13.922 13.922 0 0 1-.066-.391l-.044-.28.933-.908c.513-.5.938-.91.944-.91a.514.514 0 0 1-.056.128m-.875 2.43c-.196.197-.363.351-.371.342-.009-.008.043-.122.116-.252.108-.196.17-.258.353-.355.122-.065.23-.113.24-.105.01.007-.142.173-.338.37m-.926.51c.062.371.07.357-.538.948-.896.872-1.157 1.003-1.996 1.001-.426-.001-.534-.015-.73-.093-.126-.05-.229-.104-.228-.119.002-.033 3.361-1.884 3.423-1.886.024 0 .056.067.069.149"
      fill={color}
      fillRule="evenodd"
    />
  </SvgIcon>
);

export default Clip;
