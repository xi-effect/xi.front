/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Head from "next/head";
import { inject, observer } from "mobx-react";

import NavigationAll from "components/OtherComponents/Navigation/NavigationAll";
import Discussion from "components/PagesComponents/Community/Discussion/Discussion";

const DiscussionPage = inject(
)(observer(() => (
    <>
        <Head>
            <title>Ξffect</title>
            <meta name="robots" content="noindex" />
        </Head>
        <Navigation>
            <Discussion />
        </Navigation>
    </>
))
);

export default DiscussionPage;

