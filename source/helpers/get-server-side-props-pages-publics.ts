import { parseCookies } from "nookies"
import optionsCookies from "~/constants/cookies"

import type { GetServerSideProps, GetServerSidePropsContext, PreviewData } from "next"
import type { ParsedUrlQuery } from "querystring"

const getServerSidePropsPagesPublics =
    (callback?: GetServerSideProps) =>
        async (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
            const cookies = parseCookies(ctx)
            const token = cookies[optionsCookies.token.name]

            if (token) {
                return {
                    redirect: {
                        destination: '/dashboard',
                        permanent: false,
                    }
                }
            }

            if (callback) {
                return callback(ctx)
            }

            return {
                props: {}
            }
        }

export default getServerSidePropsPagesPublics