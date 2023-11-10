'use strict';
/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order',({strapi}) => ({

    async create(ctx){
        const result = await super.create(ctx);

        console.log('result', result);

        const {default : axios} = require('axios');
        const {xenditHeaders} = require('../helper/header.js');

        const payload = {
            external_id: result.data.id.toString(),
            player_email: 'devit@gamial.com',
            description: 'payment For Testing',
            amount: result.data.attributes.totalPrice
        }

        // mempost data yang berisi payload yang telah di crafting untuk mendapatkan url pembayaran
        const response = await axios({
            method:'POST',
            url: 'https://api.xendit.co/v2/invoices',
            headers: xenditHeaders,
            data: JSON.stringify(payload)
        });
        console

        console.log('response data - ', response.data);

        return JSON.stringify(response.data);
    }
}) 
);
