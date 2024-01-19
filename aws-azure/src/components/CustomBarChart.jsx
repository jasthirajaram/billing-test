import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, LabelList, Tooltip } from 'recharts';

import { height, width } from '@mui/system';

const CustomBarChart = ({ width, height, data, barLineSize, colors, xfontSize, domain, findData }) => {
   



    // const dataKeys = data.length > 0 && Object?.keys(data[0])?.filter(key => key !== 'name');
    const dataKeys = Array.isArray(data) && data.length > 0 ? Object?.keys(data[0])?.filter(key => key !== 'name') : [];


    const formatLegend = (value) => {
        return value
            .split(/(?=[A-Z])/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // const formatPercent = (value) => (dataKeys?.length > 1 ? `${value * 100}%` : ` ${value}`);
    const customTooltip = (
        <Tooltip
            contentStyle={{
                padding: 4,
                fontSize: "12px",
            }}
            formatter={(value, name) => [value.toLocaleString('en-IN'), name,]}
        />
    );

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload || !payload.length) {
            return null;
        }
        if (active) {
            const totalValue = payload?.reduce((sum, entry) => sum + entry?.value, 0);
            return (
                <div className="custom-tooltip" style={{ backgroundColor: "white", fontSize: "12px", padding: "4px" }}>
                    <div>{`${label ? label : ""}`}</div>
                    {payload.map(entry => (
                        <div key={entry?.name} style={{ color: entry?.color, }}>
                            {`${formatLegend(entry.name)}: ${entry.value.toLocaleString('en-IN')}`}
                        </div>
                    ))}
                    {dataKeys?.length > 1 && <div>Total: {totalValue?.toLocaleString('en-IN')}</div>}
                </div>
            );
        }
        return null;
    };
    const formatPercent = (value) => value?.toLocaleString('en-IN')

    return (
        <>
            {
                data ?
                    <>
                        <ResponsiveContainer width="100%" height={height}>
                            {
                                findData == true ? <div className='d-flex justify-content-center align-items-center'>No Data available </div> :
                                    <BarChart
                                        width={width}
                                        height={height}
                                        data={data}
                                        margin={{
                                            top: 5,
                                            right: 10,
                                            left: -10,
                                            bottom: 5,
                                        }}
                                    // stackOffset={dataKeys?.length > 1 ? "expand" : "none"}
                                    >
                                        <CartesianGrid horizontal={true} vertical={false} />
                                        <XAxis dataKey="name" axisLine={false} tick={{ fontSize: 11, }} />
                                        <YAxis axisLine={false} tick={{ fontSize: 11,  }} tickFormatter={formatPercent} />
                                        <Tooltip content={<CustomTooltip />} />
                                        {dataKeys && dataKeys?.length > 1 && <Legend iconType="circle" formatter={(value) => formatLegend(value)} />}

                                        {dataKeys?.map((dataKey, index) => (
                                            <Bar key={dataKey} dataKey={dataKey} stackId="a" fill={colors[index] || '#10B981'} barSize={barLineSize}>
                                                {/* <LabelList dataKey={dataKey} fill="#ffffff" fontSize={13} /> */}
                                            </Bar>
                                        ))}
                                    </BarChart>
                            }
                        </ResponsiveContainer >
                    </>
                    : <ResponsiveContainer width="100%"  height={height}> <div className=''>loading...</div></ResponsiveContainer>
                    //  <CardSkeleton height={height} width={width} />
                     }
        </>
    );
};

export default CustomBarChart;