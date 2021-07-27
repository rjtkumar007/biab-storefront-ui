import { CustomQuery } from '@vue-storefront/core';
import { Config } from './../../types/Setup';
import * as sa from 'superagent';
import { SearchItemsWhere } from '../../types/Search';
import { AckResponse } from '../../types/BecknClientApi';
import { Context } from '@vue-storefront/core';

/* eslint  camelcase: 0 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getProduct(context: Context, params: SearchItemsWhere, customQuery?: CustomQuery): Promise<AckResponse> {

  const qParams = {
    context: {
      // transaction_id: "string",
      // bpp_id: "string"
    },
    message: {
      criteria: {
        search_string: params.itemContains,
        delivery_location: params.locationIs
        // provider_id: params.,
        // category_id: params.
      }
    }
  };
  const config = (context.config as Config);
  const client = (context.client as sa.SuperAgent<sa.SuperAgentRequest>);
  return client.post(config.api.url + config.api.endpoints.search)
    .send(qParams)
    .then(res => {
      return (res.body as AckResponse);
    });

  /* return Promise.resolve({
    data: [],
    total: 0
  });*/
}

