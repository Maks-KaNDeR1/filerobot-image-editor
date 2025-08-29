/** External Dependencies */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { DrawerItem } from '@scaleflex/ui/core/drawer';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { SELECT_TAB } from 'actions';
import TabItem from './TabItem';
import { AVAILABLE_TABS } from './Tabs.constants';

const Tabs = ({ toggleMainMenu, isDrawer }) => {
  const {
    t,
    tabId = null,
    dispatch,
    config: { defaultTabId, tabsIds, useCloudimage, customTabs = [] },
  } = useStore();

  const currentTabId = tabId || defaultTabId;

  const selectTab = useCallback((newTabId) => {
    dispatch({
      type: SELECT_TAB,
      payload: { tabId: newTabId },
    });
    toggleMainMenu(false);
  }, [dispatch, toggleMainMenu]);

  const chosenTabs = useMemo(() => {
    let tabs = [];

    if (tabsIds && tabsIds.length > 0) {
      // Фильтруем AVAILABLE_TABS по tabsIds
      const tabMap = new Map();
      tabsIds.forEach((id, index) => tabMap.set(id, index));

      const filtered = AVAILABLE_TABS.filter(
        (tab) => !tab.hideFn || !tab.hideFn({ useCloudimage })
      );

      tabs = new Array(tabsIds.length);
      filtered.forEach((tab) => {
        const idx = tabMap.get(tab.id);
        if (idx !== undefined) tabs[idx] = tab;
      });
      tabs = tabs.filter(Boolean);
    } else {
      tabs = AVAILABLE_TABS.filter(
        (tab) => !tab.hideFn || !tab.hideFn({ useCloudimage })
      );
    }

    return [...tabs, ...customTabs];
  }, [tabsIds, useCloudimage, customTabs]);

  if (chosenTabs.length <= 1) return null;

  const tabItems = (tab) => {
    const { id, labelKey, icon: Icon, onClick } = tab;

    const handleClick = onClick
      ? () => onClick(toggleMainMenu)
      : () => selectTab(id);

    return (
      <TabItem
        key={id}
        id={id}
        label={t(labelKey)}
        Icon={Icon}
        isSelected={currentTabId === id}
        onClick={handleClick}
      />
    );
  };

  return (
    <>
      {chosenTabs.map((tab) =>
        isDrawer ? (
          <DrawerItem key={tab.id}>{tabItems(tab)}</DrawerItem>
        ) : (
          tabItems(tab)
        )
      )}
    </>
  );
};

Tabs.defaultProps = {
  toggleMainMenu: () => {},
  isDrawer: false,
};

Tabs.propTypes = {
  toggleMainMenu: PropTypes.func,
  isDrawer: PropTypes.bool,
};

export default Tabs;