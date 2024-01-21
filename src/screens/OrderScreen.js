import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import TabWaitingForConfirmation from '../components/Orders/TabWaitingForConfirmation';
import TabInDelivery from '../components/Orders/TabInDelivery';
import TabDelivered from '../components/Orders/TabDelivered';
import TabCancelled from '../components/Orders/TabCancelled';
import TabReceived from '../components/Orders/TabReceived';

const renderTabWaitingForConfirmation = () => <TabWaitingForConfirmation />;
const renderTabInDelivery = () => <TabInDelivery />;
const renderTabDelivered = () => <TabDelivered />;
const renderTabReceived = () => <TabReceived />;
const renderTabCancelled = () => <TabCancelled />;

export default function OrderScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'choxacnhan', title: 'Chờ xác nhận' },
    { key: 'danggiao', title: 'Đang giao' },
    { key: 'dagiao', title: 'Đã giao' },
    { key: 'danhan', title: 'Đã Nhận' },
    { key: 'dahuy', title: 'Đã hủy' },
  ]);

  const renderScene = SceneMap({
    choxacnhan: () => <TabWaitingForConfirmation key="choxacnhan" />,
    danggiao: () => <TabInDelivery key="danggiao" />,
    dagiao: () => <TabDelivered key="dagiao" />,
    danhan: () => <TabReceived key="danhan" />,
    dahuy: () => <TabCancelled key="dahuy" />,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      lazy={true}
      lazyPreloadDistance={0}
    />
  );
}

