import type { FC } from "react"
import { Helmet } from "react-helmet-async"
import { HomeHero, HomeOverview } from "../components/home"
import { CRM } from "lib/constants"
const Home: FC = () => {
    return (
        <>
            <Helmet>
                <title>{CRM.name}</title>
                <link rel="manifest" href="/manifest.json" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="msapplication-starturl" content="/" />
                <link
                    rel="apple-touch-icon"
                    href="/icon-192x192.png"
                    sizes="192x192"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-780-1688.png"
                    media="(device-width: 375px) and (device-height: 812px) and 
                    (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-780-1688.png"
                    media="(device-width: 390px) and (device-height: 844px) and 
                    (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                ></meta>
            </Helmet>
            <div>
                <HomeHero />
                <HomeOverview />
            </div>
        </>
    )
}

export default Home
