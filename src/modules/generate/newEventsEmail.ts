import _ from 'radash'
import type { Props } from '@exobase/core'
import { useLogger } from '../../core/hooks/useLogger'
import { useApiKeyAuthentication } from '@exobase/auth'
import { useQueryArgs } from '@exobase/hooks'
import { useLambda } from '@exobase/lambda'
import engine from '../../core/email-engine'
import NewEventsEmail from '../../emails/NewEventsEmail'
import config from '../../core/config'

interface Args {
  events: any[]
  name: string
}

interface Response {
  email: string
}

async function generateNewEventsEmail({ args }: Props<Args>): Promise<Response> {
  const emailHtml = await engine.render({
    component: NewEventsEmail,
    props: args
  })
  return {
    email: emailHtml
  }
}

export default _.compose(
  useLogger(),
  useLambda(),
  useApiKeyAuthentication(config.apiKey),
  useQueryArgs<Args>(yup => ({
    events: yup.array(yup.mixed()),
    name: yup.string()
  })),
  generateNewEventsEmail
)
