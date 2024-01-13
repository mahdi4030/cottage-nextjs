"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const Container = (props) => {
    const [tabs, setTabs] = useState<any>([]);
    const [activeHash, setActiveHash] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [tabHashes, setTabHashes] = useState<any>([]);

    useEffect(() => {
        setTabHashes(tabs.map((tab: any) => tab.hash));

        window.addEventListener("hashchange", () => selectTabByHash(window.location.hash));
        window.location.hash !== "" ? selectTabByHash(window.location.hash) : selectTabByIndex(0);
    }, []);

    const registerChild = (child: any) => {
        // tabs.push(child);
        const _tabs = Object.assign(tabs);
        _tabs.push(child);
        setTabs(_tabs);
    }
    const unregisterChild = (child: any) => {
        setTabs(tabs.filter((registeredChild: any) => registeredChild !== child));
    };

    // provide("TabContainer", { registerChild, unregisterChild });

    const selectTabByHash = (hash: string) => {
        if (!hash) return;
        if (!tabHashes.includes(hash)) return;

        setActiveIndex(tabHashes.indexOf(hash));
        const currentTab = tabs[activeIndex];

        const _tabs = Object.assign(tabs);
        _tabs.forEach((tab: any) => {
            tab.setIsActive(tab.hash === hash);
            if (tab.hash === hash) {
                setActiveHash(tab.hash)
            }
            // tab.isActive = tab.hash === hash;
        });
        setTabs(_tabs);

        currentTab?.callback();
    }

    const selectTabByIndex = (index: number) => {
        if (!Number.isInteger(index)) return;
        if (tabs.length < index) return;

        setActiveIndex(index);
        const currentTab = tabs[index];
        const _tabs = Object.assign(tabs);
        _tabs.forEach((tab: any, tabIndex: number) => {
            tab.setIsActive(tabIndex === index);
            // tab.isActive = tabIndex === index;
            if (tabIndex === index) {
                setActiveHash(tab.hash)
            }
        });
        setTabs(_tabs);

        currentTab?.callback();
    }

    useEffect(() => {
        if (tabs.length && activeHash == "") {
            selectTabByIndex(0);
        }
    }, [tabs])

    return (
        <div className="tabs-component">
            <div className="sm:hidden mb-4">
                <label htmlFor="tabs" className="sr-only">Select a tab</label>
                <select
                    id="tabs"
                    name="tabs"
                    className="bg-white block w-full rounded-lg border border-border shadow-sm py-3 px-4 text-lg focus:border-green-700 focus:outline-none focus:ring-green-700"
                    onChange={(e) => selectTabByIndex(e.target.selectedIndex)}
                    value={activeHash}
                >
                    {
                        tabs.map((tab: any, i) => (
                            <option key={i} value={tab.hash}>{tab.name}</option>
                        ))
                    }
                </select>
            </div>
            <ul id="tabs-tab" className="hidden sm:flex nav nav-tabs flex-row flex-wrap list-none border-b border-border pl-0 mb-4" role="tablist">
                {
                    tabs.map((tab: any, i) => (
                        <li
                            key={i}
                            className={clsx(tab.isActive ? 'is-active' : '', tab.isDisabled ? 'is-disabled' : '', "nav-item")}
                            role="presentation"
                        >
                            <a
                                aria-controls={tab.hash}
                                aria-selected={tab.isActive}
                                href={tab.hash}
                                className={clsx(
                                    'block font-bold border-x-0 border-t-0 text-xl border-b-0 px-4 mr-4 py-3 mt-2',
                                    activeIndex === i ? 'border-b-4 border-green-700' : 'border-border',
                                )}
                                role="tab"
                                onClick={
                                    () => {
                                        selectTabByIndex(i);
                                    }
                                }
                                dangerouslySetInnerHTML={{ __html: tab.name }}
                            ></a>
                        </li>
                    ))
                }
            </ul>
            <div className="tab-content">
                {/* <slot /> */}
                {
                    props.children(registerChild, unregisterChild)
                }
            </div>
        </div>
    )
}