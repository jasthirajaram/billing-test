import React from 'react'
import { Cell, Legend, Pie, Tooltip, PieChart, ResponsiveContainer } from 'recharts';

// import CardSkeleton from '../../../../ReactComponents/SkeletonLoaders/CardSkeleton';



const CustomPieChart = ({ data, height, outerRadius, innerRadius, color, findData, total }) => {
    const COLORS = ['#048DAD', '#10B981', '#FEA37C', '#FE6476', 'rgb(72 192 194)', '#8dc2f7', 'rgb(128, 128, 128)'];
    const RADIAN = Math.PI / 180;
    // const { currentColor } = useColor();
   const totalNum = data && data?.reduce((acc, entry) => acc + entry.value, 0);
    // const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, }) => {
    //     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
    //     const y = cy + radius * Math.sin(-midAngle * RADIAN);
    //     const formattedValue = data[index]?.value > 0 && data[index]?.value?.toLocaleString('en-IN');
       
    //     return (
    //         <>
    //             <text x={x} y={y} fill="white" textAnchor={x > cx ? 'middle' : 'middle'} dominantBaseline="central">
    //                 {formattedValue}
    //             </text>
    //             <text x={cx} y={cy}  textAnchor="middle" fontSize={16} fontWeight={900}>
    //                 {total ? total.toLocaleString('en-IN') : totalNum.toLocaleString('en-IN')}
    //             </text>
    //         </>
    //     );
    // };

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        
        // Calculate the position outside the pie chart
        const x = cx + (radius + 40) * Math.cos(-midAngle * RADIAN);
        const y = cy + (radius + 40) * Math.sin(-midAngle * RADIAN);
    
        const formattedValue = data[index]?.value > 0 && data[index]?.value?.toLocaleString('en-IN');
    
        // Arrow line positions
        const lineX = cx + (outerRadius ) * Math.cos(-midAngle * RADIAN);
        const lineY = cy + (outerRadius  ) * Math.sin(-midAngle * RADIAN);
    
        return (
            <>
                {/* Label text */}
                <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {formattedValue}
                </text>
                {/* Arrow lines */}
                <line x1={x} y1={y} x2={lineX} y2={lineY} stroke="black" strokeWidth={1} />
                {/* Total text */}
                <text x={cx} y={cy} textAnchor="middle" fontSize={16} fontWeight={900}>
                    {total ? total.toLocaleString('en-IN') : totalNum.toLocaleString('en-IN')}
                </text>
            </>
        );
    };
    

   
    

 
    const customTooltip = (
        <Tooltip
            contentStyle={{
                padding: 4,
                fontSize: 12,
            }}
            formatter={(value, name) => [value?.toLocaleString('en-IN'), name]}
        />
    );

  
    const updatedData =data?.filter((item) => item.value > 1);


    return (
        <>
            {data ?
                <ResponsiveContainer width="100%" height={height}>
                    {data?.length == 0 ?
                        <div className='d-flex justify-content-center align-items-center' >No Data Avalible</div>
                        :
                        <PieChart>
                            <Pie
                            
                                data={data && updatedData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                innerRadius={innerRadius ? innerRadius : 40}
                                outerRadius={outerRadius ? outerRadius : 90}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data?.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={color ? color[index % color.length] : COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            {data && <Legend iconType="circle" />}
                            {customTooltip}
                        </PieChart>
                    }
                </ResponsiveContainer >
                : <ResponsiveContainer height={height}>
                    <div className=''>Loading....</div>
                </ResponsiveContainer>
                // <Skeleton variant="circular" height={height} width={height} sx={{ mx: "auto" }} />
                }
        </>
    )
}

export default CustomPieChart

// import React, { useState } from 'react';
// import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';



// const renderActiveShape = (props) => {
//   const RADIAN = Math.PI / 180;
//   const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
//   const sin = Math.sin(-RADIAN * midAngle);
//   const cos = Math.cos(-RADIAN * midAngle);
//   const sx = cx + (outerRadius + 10) * cos;
//   const sy = cy + (outerRadius + 10) * sin;
//   const mx = cx + (outerRadius + 30) * cos;
//   const my = cy + (outerRadius + 30) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//   const ey = my;
//   const textAnchor = cos >= 0 ? 'start' : 'end';

//   return (
//     <g>
//       <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
//         {payload.name}
//       </text>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />
//       <Sector
//         cx={cx}
//         cy={cy}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         innerRadius={outerRadius + 6}
//         outerRadius={outerRadius + 10}
//         fill={fill}
//       />
//       <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
//       <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
//       <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`COST ${value}`}</text>
//       <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
//         {`(Rate ${(percent * 100).toFixed(2)}%)`}
//       </text>
//     </g>
//   );
// };

// const CustomPieChart = ({data, height,color, outerRadius, innerRadius, findData, total}) => {
//     const COLORS = ['#048DAD', '#10B981', '#FEA37C', '#FE6476', 'rgb(72 192 194)', '#8dc2f7', 'rgb(128, 128, 128)'];
//   const [activeIndex, setActiveIndex] = useState(0);

//   const onPieEnter = (_, index) => {
//     setActiveIndex(index);
//   };

//   return (
//     <ResponsiveContainer   height={height}>
//       <PieChart  height={height}>
//         <Pie
//           activeIndex={activeIndex}
//           activeShape={renderActiveShape}
//         // activeShape={(props) => renderActiveShape({ ...props, fill: COLORS[props.index] })}
//           data={data}
//           cx="50%"
//           cy="50%"
//           innerRadius={60}
//           outerRadius={80}
//         //   fill="#D3D3D3"
//         fill={ COLORS[activeIndex % COLORS.length]}
//         // fill={(_, index) => (color ? color[index % color.length] : null )}
//           dataKey="value"
//           onMouseEnter={onPieEnter}
//         />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// };

// export default CustomPieChart;
