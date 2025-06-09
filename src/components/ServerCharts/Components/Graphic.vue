<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler
);

export default {
  components: {
    Line,
  },

  props: {
    themeLight: {
      type: Object,
      required: true
    },
    themeDark: {
      type: Object,
      required: true
    },
    themeStatus: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    colorGrid() {
      if (this.themeStatus) {
        return this.themeLight.grid
      } else {
        return this.themeDark.grid
      }
    },
    colorGraphic() {
      if (this.themeStatus) {
        return this.themeLight.textColor
      } else {
        return this.themeDark.textColor
      }
    },
    chartData() {
      // Генерируем подробные метки для всех точек
      const labels = [];
      for (let i = 0; i < 12; i++) {
        const hour = Math.floor(i * 0.5);
        const minute = (i % 2) * 30;
        labels.push(`05.06: ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
      }

      return {
        labels: labels,
        datasets: [
          {
            label: "загруженность CPU %",
            data: [40, 42, 44, 47, 50, 52, 48, 45, 42, 40, 38, 35],
            borderColor: "#F44336",
            backgroundColor: "rgba(244, 67, 54, 0.1)",
            pointBackgroundColor: "#F44336",
            fill: true,
          },
          {
            label: "используемая память %",
            data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65],
            borderColor: "#FFCC00",
            backgroundColor: "rgba(255, 204, 0, 0.1)",
            pointBackgroundColor: "#FFCC00",
            fill: true,
          },
          {
            label: "свободное место на диске %",
            data: [85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74],
            borderColor: "#4CAF50",
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            pointBackgroundColor: "#4CAF50",
            fill: true,
          },
        ],
      };
    },
    chartOption() {
      return {
        responsive: true,
        scales: {
          x: {
            ticks: {
              color: this.colorGraphic,
              callback: function(value, index) {
                if (index % 3 === 0) {
                  return this.chart.data.labels[index];
                }
                return null;
              },
              autoSkip: false,
            },
            grid: {
              display: true,
              color: this.colorGrid,
            },

          },
          y: {
            ticks: {
              color: this.colorGraphic,
              callback: function(value) {
                return value + ' %';
              }
            },
            beginAtZero: true,
            min: 0,
            max: 100,
            grid: {
              display: true,
              color: this.colorGrid,
            },
          },
        },
        plugins: {
          legend: {
            position: "bottom",
            align: "start",
            labels: {
              color: this.colorGraphic,
              usePointStyle: false,
              generateLabels: (chart) => {
                const datasets = chart.data.datasets;
                return datasets.map((ds, i) => ({
                  text: ds.label,
                  fillStyle: ds.borderColor,
                  strokeStyle: ds.borderColor,
                  lineCap: 'butt',
                  lineJoin: 'miter',
                  lineWidth: 0,
                  hidden: !chart.isDatasetVisible(i),
                  index: i,
                  datasetIndex: i,
                  // Размер маркера через padding и boxWidth
                  fontColor: this.colorGraphic,
                }));
              },
              boxWidth: 18,
              boxHeight: 8,
            },
          },
          tooltip: {
            callbacks: {
              title: (items) => {
                return items[0].label;
              }
            }
          }
        },
      };
    }
  },
};
</script>

<template>
  <Line :data="chartData" :options="chartOption" />
</template>