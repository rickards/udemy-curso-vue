export const commomChartOptions = {
    theme: {
        mode: 'dark',
    },
    dataLabels: {
        enabled: true,
        color: undefined,
    },
    xaxis: {
        tickAmount: 6,
        labels: {
            style: {
                colors: "#fff",
            },
        },
    },
    yaxis: {
        labels: {
            style: {
                colors: "#fff",
            },
        },
    },
    grid: {
        borderColor: "#817f7f79",
        strokeDashArray: 7,
        xaxis: {
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: true,
            },
        },
    },
    fill: {
        opacity: 0.5,
        type: "gradient",
        gradient: {
            shade: 'light',
            shadeIntensity: 0.2,
            opacityFrom: 0.5,
            opacityTo: 0.7,
            stops: [0, 100],
        },
    },
    itemMargin: {
        horizontal: 5,
        vertical: 10
    },
    markers: {
        size: 0,
        style: "hollow",
    },
    legend: {
        show: true,
        labels: {
            colors: "fff",
        },
        markers: {
            onClick: function (chart, seriesIndex, opts) {
                console.log(
                    "series- " + seriesIndex + "'s marker was clicked",
                    chart,
                    opts
                );
            },
            width: 20,
            height: 20,
            offsetX: 0,
            offsetY: 0,
        },
    },
    axisTicks: {
        show: true,
        borderType: "solid",
        color: "#78909C",
        height: 6,
        offsetX: 0,
        offsetY: 0,
    },
}
