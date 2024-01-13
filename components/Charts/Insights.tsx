"use client";
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, BarChart } from 'echarts/charts';
import { GridComponent, ToolboxComponent, TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import ReactECharts from 'echarts-for-react';
import { useMemo, useState } from 'react';

type InsightsProps = {
    chartData: object;
}

export const Insights: React.FC<Partial<InsightsProps>> = ({
    chartData = []
}) => {
    const [isLoading, setIsLoadding] = useState(false);

    use([CanvasRenderer, LineChart, BarChart, GridComponent, ToolboxComponent, TitleComponent, TooltipComponent, LegendComponent]);

    // provide(THEME_KEY, "dark");

    const xAxis = useMemo(() => {
        let axisLabels = chartData.map((item) => {
            let endDate = new Date(item.endDate.replace(/-/g, "\/"));
            let startDate = new Date(item.startDate.replace(/-/g, "\/"));
            return (
                startDate.toLocaleDateString("en", { day: "numeric", month: "short" }) +
                " - " +
                endDate.toLocaleDateString("en", { day: "numeric", month: "short" })
            );
        });
        const lastLabelDate = axisLabels[axisLabels.length - 1].split(" - ")[1] + " " + new Date().getFullYear();
        const lastEndDate = new Date(lastLabelDate);
        const lastMonth = lastEndDate.getMonth();
        const lastYear = lastEndDate.getFullYear();
        const axisLabelsLength = axisLabels.length;
        if (axisLabelsLength < 12) {
            for (let i = 1; i < 13 - axisLabelsLength; i++) {
                if (lastMonth + i >= 12) {
                    axisLabels.push(new Date(lastYear, lastMonth + i, 1).toLocaleDateString("en", { month: "short" }));
                } else {
                    axisLabels.push(new Date(lastYear + 1, lastMonth + i + 12, 1).toLocaleDateString("en", { month: "short" }));
                }
            }
        }
        return axisLabels;
    }, [chartData]);

    const lineSeries = useMemo(() => {
        let series = chartData.map((item) => {
            return item.totalAmountDue;
        });
        const seriesLength = series.length;
        if (seriesLength < 12) {
            for (let i = 0; i < 12 - seriesLength; i++) {
                series.push(0);
            }
        }
        return series;
    }, [chartData]);

    const barSeries = useMemo(() => {
        let series = chartData.map((item) => {
            return item.totalUsage;
        });
        const seriesLength = series.length;
        if (seriesLength < 12) {
            for (let i = 0; i < 12 - seriesLength; i++) {
                series.push(0);
            }
        }
        return series;
    }, [chartData]);

    const option = useMemo(() => {
        return {
            tooltip: {
                trigger: "axis",
                formatter: (params) => {
                    return `
                    ${params[0].axisValue} <br />
                    ${params[0].marker} ${params[0].seriesName}: ${params[0].value} kWh<br />
                    ${params[1].marker} ${params[1].seriesName}: $${params[1].value}
                    `;
                },
                textStyle: {
                    color: "#123233",
                    fontFamily: "Harmonia",
                    fontWeight: "normal",
                },
            },
            legend: {
                data: ["Cost", "Usage"],
                textStyle: {
                    color: "#123233",
                    fontWeight: "bold",
                    fontFamily: "Harmonia",
                    // fontSize: "16",
                },
                selectorLabel: {
                    show: false,
                },
                top: "bottom",
                floating: true,
                itemGap: 60,
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "8%",
                containLabel: true,
            },
            xAxis: {
                type: "category",
                axisLabel: {
                    formatter: function (value) {
                        return value.split(" - ").length > 1 ? value.split(" - ")[1] : value;
                    },
                },
                data: xAxis,
            },
            yAxis: [
                {
                    name: "Cost",
                    type: "value",
                    position: "right",
                    alignTicks: true,
                },
                {
                    name: "Usage",
                    type: "value",
                    position: "left",
                    alignTicks: true,
                },
            ],
            series: [
                {
                    name: "Usage",
                    data: barSeries,
                    type: "line",
                    yAxisIndex: 1,
                    smooth: true,
                    axisLabel: {
                        formatter: "{value} kWh",
                    },
                },
                {
                    name: "Cost",
                    data: lineSeries,
                    type: "bar",
                    smooth: true,
                    axisLabel: {
                        formatter: "${value}",
                    },
                    emphasis: {
                        itemStyle: {
                            borderRadius: [6, 6],
                        },
                    },
                    itemStyle: {
                        borderRadius: [6, 6, 0, 0],
                    },
                },
            ],
            color: ["#18A57B", "#194D3E", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
        }
    }, [xAxis, barSeries, lineSeries]);

    return (
        <div className="flex flex-col w-full">
            <div className="w-full h-96">
                {/* <client-only> */}
                    <ReactECharts className="w-full h-full" option={option} showLoading={isLoading} />
                {/* </client-only> */}
            </div>
        </div>
    )
}