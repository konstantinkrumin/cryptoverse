import React from 'react';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import { Row, Col, Collapse, Avatar, Typography } from 'antd';

import { useGetCryptoExchangesQuery } from '../services/cryptoApi';

const Exchanges = () => {
  const { data, isFetching } = useGetCryptoExchangesQuery();

  if (isFetching) return 'Loading...';

  const { Panel } = Collapse;
  const { Text } = Typography;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Market Share</Col>
      </Row>
      {data?.data?.exchanges.map((exchange) => (
        <Col span={24}>
          <Collapse>
            <Panel
              key={exchange.id}
              showArrow={false}
              header={
                <Row key={exchange.id}>
                  <Col span={6}>
                    <Text>
                      <strong>{exchange.rank}.</strong>
                    </Text>
                    <Avatar className="exchange-image" src={exchange.iconUrl} />
                    <Text>
                      <strong>{exchange.name}</strong>
                    </Text>
                  </Col>
                  <Col span={6}>{millify(exchange.volume)}</Col>
                  <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                  <Col span={6}>{millify(exchange.marketShare)}%</Col>
                </Row>
              }
            >
              {HTMLReactParser(exchange.description || '')}
            </Panel>
          </Collapse>
        </Col>
      ))}
    </>
  );
};

export default Exchanges;

// const Exchanges = () => {
//   const { data, isFetching } = useGetCryptosQuery(100);
//   const coins = data?.data?.coins;

//   if (isFetching) return 'Loading...';

//   const extractedData = coins.map((coin, idx) => {
//     const tempData = {
//       id: coin.id,
//       name: coin.name,
//       iconUrl: coin.iconUrl,
//       numberOfMarkets: millify(coin.numberOfMarkets),
//       change: coin.change + '%',
//       volume: millify(coin.volume),
//       description: coin.description,
//     };

//     return {
//       key: tempData.id,
//       exchangesCol: idx + 1 + '. ' + tempData.name,
//       tradeVolume24hCol: tempData.volume,
//       marketsCol: tempData.numberOfMarkets,
//       changeCol: tempData.change,
//       description: tempData.description,
//     };
//   });

//   const columns = [
//     {
//       title: 'Exchanges',
//       dataIndex: 'exchangesCol',
//     },
//     {
//       title: '24h Trade Volume',
//       dataIndex: 'tradeVolume24hCol',
//     },
//     {
//       title: 'Markets',
//       dataIndex: 'marketsCol',
//     },
//     {
//       title: 'Change',
//       dataIndex: 'changeCol',
//     },
//   ];

//   return (
//     <>
//       <Table
//         bordered
//         columns={columns}
//         dataSource={extractedData}
//         expandable={{
//           expandedRowRender: (coin) => HTMLReactParser(coin.description),
//           expandRowByClick: true,
//         }}
//       />
//     </>
//   );
// };

// export default Exchanges;
