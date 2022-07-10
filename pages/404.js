/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import ErrorPage from 'components/Error/ErrorPage';
import { errorMessages } from 'texts/errorMessages/errorMessages';

// eslint-disable-next-line no-underscore-dangle
export default function _404() {

  return (
    <ErrorPage
      imageSrc="/assets/404/404Error.svg"
      textMessage={errorMessages[404]}
    />
  );
}