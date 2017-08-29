import React from 'react';
import moment from 'moment';
import config from '../config';


const OrderReleased = (props) => {
	let coin = props.order.pair.base.code;
	let wait = (coin == 'ETH' || coin == 'BTC' ? 60 : 30);
	let requiredConfirmations = (coin == 'ETH' ? 12 : (coin == 'BTC' ? 1 : 6));
	let tx = props.order.transactions[1];
	let	estimate = wait - (wait * (tx.confirmations/requiredConfirmations));
	let txId = tx.tx_id;

	let blockchainUrl;
	if (coin == 'ETH') {
		blockchainUrl = `https://etherscan.io/tx/${txId}`;
	} else if (coin == 'LTC') {
		blockchainUrl = `https://live.blockcypher.com/ltc/tx/${txId}/`;
	} else if (coin == 'BTC') {
		blockchainUrl = `https://live.blockcypher.com/btc/tx/${txId}/`;
	}

	return (
		<div id="order-payment-confirmations" className="col-xs-12 text-center">
			<h2 style={{margin: "0"}}>Funds released, awaiting confirmations ({tx.confirmations}/{requiredConfirmations})</h2>
			<h5>Transaction ID: <a href={blockchainUrl} target="_blank" style={{color: "#2cb4a0"}}>{txId}</a></h5>
			<h5>By our estimations it will take another {estimate} minutes to get all confirmations.</h5>

			<a href={`${config.API_BASE_URL}/orders/${props.orderRef}?format=json`} target="_blank"><h4 style={{margin: "25px 0 0px", "fontWeight": "500"}}>See your order details on our API</h4></a>
			<a href={blockchainUrl} target="_blank"><h4 style={{margin: "5px 0 18px", "fontWeight": "500"}}>See your order details on blockchain</h4></a>
		</div>
	)
};

export default OrderReleased;