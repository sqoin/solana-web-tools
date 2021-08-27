// let width: any, height: any, gradient: any;
// function getGradient(ctx: any, chartArea: any) {
//   const chartWidth = chartArea.right - chartArea.left;
//   const chartHeight = chartArea.bottom - chartArea.top;
//   if (gradient === null || width !== chartWidth || height !== chartHeight) {
//     // Create the gradient because this is either the first render
//     // or the size of the chart has changed
//     width = chartWidth;
//     height = chartHeight;
//     gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
//     gradient.addColorStop(0, "rgb(255 255 0)");
//     gradient.addColorStop(0.5, "rgb(222 77 77)");
//     gradient.addColorStop(1, "rgb(120 206 144)");
//   }
//   return gradient;
// }
let colors = ["#ffff00", "#78ce90", "#b977ce", "#fac76e", "#de4d4d"];
let cache = new Map();
let width: any = null;
let height: any = null;
export function createRadialGradient3(context: any, c1: any, c2: any, c3: any) {
  const chartArea = context.chart.chartArea;
  if (!chartArea) {
    // This case happens on initial chart load
    return null;
  }

  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (width !== chartWidth || height !== chartHeight) {
    cache.clear();
  }
  var gradient = cache.get(c1 + c2 + c3);
  if (!gradient) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;
    const r = Math.min(
      (chartArea.right - chartArea.left) / 2,
      (chartArea.bottom - chartArea.top) / 2
    );
    var ctx = context.chart.ctx;
    // gradient = ctx.createRadialGradient(
    //   centerX,
    //   centerY,
    //   0,
    //   centerX,
    //   centerY,
    //   r
    // );
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, c1);
    gradient.addColorStop(0.5, c2);
    gradient.addColorStop(1, c3);
    cache.set(c1 + c2 + c3, gradient);



    
  }

  return gradient;
}

export const pieChartConfig = {
    
  animations: 0,
  type: "pie",
  responsive: true,
  plugins: {
    legend: {
      display: false,
  },
    title: {
      display: false,
    },
  },
  
};
export const PIE_CHART_DATA = {
  labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
  datasets: [
    {
      data: [80, 81, 56, 55, 40],
      // backgroundColor: ["#ffff00", "#78ce90", "#b977ce", "#fac76e", "#de4d4d"],
      backgroundColor: function (context: any) {
        // const chart = context.chart;
        // const { ctx, chartArea } = chart;

        // if (!chartArea) {
        //   return null;
        // }
        // return getGradient(ctx, chartArea);
        let c = colors[context.dataIndex];
        if (!c) {
          return;
        }
        // if (context.active) {
        //   c = helpers.getHoverColor(c);
        // }

        const mid = getRandomColor();
        const start = getRandomColor();
        const end = getRandomColor();
        return createRadialGradient3(context, start, mid, end);
      },
    },
  ],
};
export const getRandomColor=()=>{
  return radientColors[Math.floor(Math.random()*5)]
}
let radientColors=["rgb(255 255 0)","rgb(222 77 77)","rgb(120 206 144)","rgb(126 251 193)","rgb(102 51 153)"]
export const LINE_CHART_DATA = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774",
    },
  ],
};
