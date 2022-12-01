import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  LineChart,
  Line,
  Legend,
  Brush,
} from 'recharts';

const data1 = [
  {
    name: 'June',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'July',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'August',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'September',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'October',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'November',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'December',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];


const Graph = () => {
  return (
  <>
    <div>
      <h5 className="text-3xl tracking-tight font-extrabold text-black text-left sm:text-2xl md:text-3xl pl-40 pb-10">
      Demand for Metformin
                </h5>
    <div style={{ width: '100%', height: 300 }}>
    <ResponsiveContainer>
      <AreaChart
        data={data1}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
  </div>



  <div className="pt-20">
      <h5 className="text-3xl tracking-tight font-extrabold text-black text-left sm:text-2xl md:text-3xl pl-40 pb-10">
      Demand for Metformin
                </h5>
    <div style={{ width: '100%', height: 300 }}>
    <ResponsiveContainer>
      <AreaChart
        data={data1}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
  </div>


  </>
  )
}

export default Graph