<<script>
import UiInput from "@/components/UiInput.vue";
import UiSelect from "@/components/UiSelect.vue";
import MainButton from "@/components/MainButton.vue";
import ModalWindow from "@/components/ServerCharts/Components/ModalWindow.vue";
import Graphic from "@/components/ServerCharts/Components/Graphic.vue";
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
  Filler, LogarithmicScale,
} from "chart.js";
import {log10} from "chart.js/helpers";

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
const verticalLinePlugin = {
  id: 'verticalLine',
  afterDraw: function(chart) {
    if (chart.tooltip?._active?.length) {
      const ctx = chart.ctx;
      const x = chart.tooltip._active[0].element.x;
      const topY = chart.scales.y.top;
      const bottomY = chart.scales.y.bottom;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = chart.options.plugins.verticalLine.color;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.restore();
    }
  }
};
ChartJS.register(verticalLinePlugin);



export default {

  components: {
    UiSelect, UiInput, Graphic, MainButton, ModalWindow, Line,
  },
  props: {
    serversGroups: {
      type: Array,
      required: true
    },
    servers: {
      type: Array,
      required: true
    },
    parameters: {
      type: Array,
      required: true
    },
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
    },
  },
  data() {
    return {
      openPanel: true,
      modalWindow: false,
      dateStart: '',
      dateEnd: '',
      selectGroup: '',
      sortGroup: '',
      selectInterval: '',
      inputSearch: '',
      nameServer: '',
    }
  },
  methods: {
    math(a, b) {
      return a + b;
    },
    nameAdd(name) {
      this.nameServer = name;
    },
    downloadPNG(id, name) {
      let date = new Date();
      const link = document.createElement('a');
      link.href = document.getElementById(id).toDataURL('image/png');
      link.download = `${name}(${(String(date.getHours()).length > 1 ? date.getHours(): '0' + date.getHours())
      + ':' + (String(date.getMinutes()).length > 1 ? date.getMinutes(): '0' + date.getMinutes())}).png`;
      link.click();
    },
    togglePanel() {
      this.openPanel = !this.openPanel
    },
    toggleWindow() {
      this.modalWindow = !this.modalWindow
    },
    searchElement() {
      this.selectGroup = document.querySelector('#selectGroup').value
      this.sortGroup = document.querySelector('#sortGroup').value
      this.selectInterval = document.querySelector('#selectInterval').value
      this.inputSearch = document.querySelector('#inputSearch').value
      this.dateStart = document.querySelector('#dateStart').value
      this.dateEnd = document.querySelector('#dateEnd').value
      this.myTest(1, 5)
    },
    deleteFilter() {
      this.selectGroup = 'Выбрать группу серверов'
      this.sortGroup = 'Без фильтрации'
      this.selectInterval = 'Без фильтрации'
      this.inputSearch = ''
      this.dateStart = ''
      this.dateEnd = ''
    },
    chartData(server) {
      let cpuHelp = []
      let ramHelp = []
      let memoryHelp = []
      let dateHelp = []
      let cpu = []
      let ram = []
      let memory = []
      let date = []
      for (let item of server.metrics) {
        cpuHelp.push(item.cpu)
        ramHelp.push(item.ram)
        memoryHelp.push(item.strorage)
        dateHelp.push(item.createdAt)
      }
      for (let i = 0; i < dateHelp.length; i++) {
        let start = new Date()
        start = start.getDate()
        let end = new Date(dateHelp[i])
        end = end.getDate()
        let time = new Date(dateHelp[i])
        // dateTime.push(new Date(dateHelp[i]))
        if (start === end) {
          date.push((String(time.getDate()).length > 1 ? time.getDate(): '0' + time.getDate())
              + '.'+ (String(time.getMonth()).length > 1 ? (time.getMonth()+1) : '0' + (time.getMonth()+1))
              + '.'+ (String(time.getFullYear()).length > 1 ? time.getFullYear(): '0' + time.getFullYear())
                + ' '+ (String(time.getHours()).length > 1 ? time.getHours(): '0' + time.getHours())
                + ':' + (String(time.getMinutes()).length > 1 ? time.getMinutes(): '0' + time.getMinutes()))
                // + ':' + (String(time.getSeconds()).length > 1 ? time.getSeconds(): '0' + time.getSeconds()))
          cpu.push(cpuHelp[i])
          ram.push(ramHelp[i])
          memory.push(memoryHelp[i])

        }
      }
      return {
        labels: this.searchDate(this.filterDate(date), dateHelp),
        datasets: [
          {
            label: "загруженность CPU %",
            data: this.updateCpu(this.filterCpu(cpu), date),
            borderColor: "#F44336",
            backgroundColor: "rgba(244, 67, 54, 0.1)",
            pointBackgroundColor: "#F44336",
            pointBorderColor: "#F44336",
            pointHoverBorderColor: '#F44336',
            pointHoverBackgroundColor: '#F44336',
            fill: true,
          },
          {
            label: "используемая память %",
            data: this.updateRam(this.filterRam(ram), date),
            borderColor: "#FFCC00",
            backgroundColor: "rgba(255, 204, 0, 0.1)",
            pointBackgroundColor: "#FFCC00",
            pointBorderColor: "#FFCC00",
            pointHoverBorderColor: '#FFCC00',
            pointHoverBackgroundColor: '#FFCC00',
            fill: true,
          },
          {
            label: "занятое место на диске %",
            data: this.updateMemory(this.filterMemory(memory), date),
            borderColor: "#4CAF50",
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            pointBackgroundColor: "#4CAF50",
            pointBorderColor: "#4CAF50",
            pointHoverBorderColor: '#4CAF50',
            pointHoverBackgroundColor: '#4CAF50',
            fill: true,
          },
        ],
      };
    },
    filterDate(date) {
      if (this.selectInterval === 'Последние 5 минут') {
        if (date.length >= 5) {
          return date.slice(date.length - 5, date.length);
        }
        else {
          return date.slice(date.length - date.length, date.length);
        }
      }
      else if (this.selectInterval === 'Последние 15 минут') {
        if (date.length >= 15) {
          return date.slice(date.length - 15, date.length);
        }
        else {
          return date.slice(date.length - date.length, date.length);
        }
      }
      else if (this.selectInterval === 'Последние 30 минут') {
        if (date.length >= 30) {
          return date.slice(date.length - 30, date.length);
        }
        else {
          return date.slice(date.length - date.length, date.length);
        }
      }
      else if (this.selectInterval === 'Последний час') {
        if (date.length >= 60) {
          return date.slice(date.length - 60, date.length);
        }
        else {
          return date.slice(date.length - date.length, date.length);
        }
      }
      else {
        return date
      }
    },
    filterCpu(cpu) {
      if (this.selectInterval === 'Последние 5 минут') {
        if (cpu.length >= 5) {
          return cpu.slice(cpu.length - 5, cpu.length);
        }
        else {
          return cpu.slice(cpu.length - cpu.length, cpu.length);
        }
      }
      else if (this.selectInterval === 'Последние 15 минут') {
        if (cpu.length >= 15) {
          return cpu.slice(cpu.length - 15, cpu.length);
        }
        else {
          return cpu.slice(cpu.length - cpu.length, cpu.length);
        }
      }
      else if (this.selectInterval === 'Последние 30 минут') {
        if (cpu.length >= 30) {
          return cpu.slice(cpu.length - 30, cpu.length);
        }
        else {
          return cpu.slice(cpu.length - cpu.length, cpu.length);
        }
      }
      else if (this.selectInterval === 'Последний час') {
        if (cpu.length >= 60) {
          return cpu.slice(cpu.length - 60, cpu.length);
        }
        else {
          return cpu.slice(cpu.length - cpu.length, cpu.length);
        }
      }
      else {
        return cpu
      }
    },
    filterRam(ram) {
      if (this.selectInterval === 'Последние 5 минут') {
        if (ram.length >= 5) {
          return ram.slice(ram.length - 5, ram.length);
        }
        else {
          return ram.slice(ram.length - ram.length, ram.length);
        }
      }
      else if (this.selectInterval === 'Последние 15 минут') {
        if (ram.length >= 15) {
          return ram.slice(ram.length - 15, ram.length);
        }
        else {
          return ram.slice(ram.length - ram.length, ram.length);
        }
      }
      else if (this.selectInterval === 'Последние 30 минут') {
        if (ram.length >= 30) {
          return ram.slice(ram.length - 30, ram.length);
        }
        else {
          return ram.slice(ram.length - ram.length, ram.length);
        }
      }
      else if (this.selectInterval === 'Последний час') {
        if (ram.length >= 60) {
          return ram.slice(ram.length - 60, ram.length);
        }
        else {
          return ram.slice(ram.length - ram.length, ram.length);
        }
      }
      else {
        return ram
      }
    },
    filterMemory(memory) {
      if (this.selectInterval === 'Последние 5 минут') {
        if (memory.length >= 5) {
          return memory.slice(memory.length - 5, memory.length);
        }
        else {
          return memory.slice(memory.length - memory.length, memory.length);
        }
      }
      else if (this.selectInterval === 'Последние 15 минут') {
        if (memory.length >= 15) {
          return memory.slice(memory.length - 15, memory.length);
        }
        else {
          return memory.slice(memory.length - memory.length, memory.length);
        }
      }
      else if (this.selectInterval === 'Последние 30 минут') {
        if (memory.length >= 30) {
          return memory.slice(memory.length - 30, memory.length);
        }
        else {
          return memory.slice(memory.length - memory.length, memory.length);
        }
      }
      else if (this.selectInterval === 'Последний час') {
        if (memory.length >= 60) {
          return memory.slice(memory.length - 60, memory.length);
        }
        else {
          return memory.slice(memory.length - memory.length, memory.length);
        }
      }
      else {
        return memory
      }
    },
    searchDate(date) {
      if (this.dateStart !== '' && this.dateEnd === '') {
        let time = new Date(this.dateStart);
        time = (String(time.getDate()).length > 1 ? time.getDate(): '0' + time.getDate())
        + '.'+ (String(time.getMonth()).length > 1 ? (time.getMonth()+1) : '0' + (time.getMonth()+1))
        + '.'+ (String(time.getFullYear()).length > 1 ? time.getFullYear(): '0' + time.getFullYear())
        + ' '+ (String(time.getHours()).length > 1 ? time.getHours(): '0' + time.getHours())
        + ':' + (String(time.getMinutes()).length > 1 ? time.getMinutes(): '0' + time.getMinutes())
        let indexEnd = date.length;
        let indexStart = date.indexOf(time);
        return date.slice(indexStart, indexEnd)
      }
      else if (this.dateStart === '' && this.dateEnd !== '') {
        let time = new Date(this.dateEnd);
        time = (String(time.getDate()).length > 1 ? time.getDate(): '0' + time.getDate())
            + '.'+ (String(time.getMonth()).length > 1 ? (time.getMonth()+1) : '0' + (time.getMonth()+1))
            + '.'+ (String(time.getFullYear()).length > 1 ? time.getFullYear(): '0' + time.getFullYear())
            + ' '+ (String(time.getHours()).length > 1 ? time.getHours(): '0' + time.getHours())
            + ':' + (String(time.getMinutes()).length > 1 ? time.getMinutes(): '0' + time.getMinutes())
        let indexEnd = date.indexOf(time);
        let indexStart = date[0];
        return date.slice(indexStart, indexEnd)
      }
      else if (this.dateEnd !== '' && this.dateStart !== '') {
        let timeStart = new Date(this.dateStart);
        let timeEnd = new Date(this.dateEnd);
        timeStart = (String(timeStart.getDate()).length > 1 ? timeStart.getDate(): '0' + timeStart.getDate())
            + '.'+ (String(timeStart.getMonth()).length > 1 ? (timeStart.getMonth()+1) : '0' + (timeStart.getMonth()+1))
            + '.'+ (String(timeStart.getFullYear()).length > 1 ? timeStart.getFullYear(): '0' + timeStart.getFullYear())
            + ' '+ (String(timeStart.getHours()).length > 1 ? timeStart.getHours(): '0' + timeStart.getHours())
            + ':' + (String(timeStart.getMinutes()).length > 1 ? timeStart.getMinutes(): '0' + timeStart.getMinutes())
        timeEnd = (String(timeEnd.getDate()).length > 1 ? timeEnd.getDate(): '0' + timeEnd.getDate())
            + '.'+ (String(timeEnd.getMonth()).length > 1 ? (timeEnd.getMonth()+1) : '0' + (timeEnd.getMonth()+1))
            + '.'+ (String(timeEnd.getFullYear()).length > 1 ? timeEnd.getFullYear(): '0' + timeEnd.getFullYear())
            + ' '+ (String(timeEnd.getHours()).length > 1 ? timeEnd.getHours(): '0' + timeEnd.getHours())
            + ':' + (String(timeEnd.getMinutes()).length > 1 ? timeEnd.getMinutes(): '0' + timeEnd.getMinutes())
        let indexStart = date.indexOf(timeStart);
        let indexEnd = date.indexOf(timeEnd);
        return date.slice(indexStart, indexEnd+1)
      }
      else {
        return date;
      }
    },
    updateCpu(cpu, date) {
      if (this.dateStart !== '' && this.dateEnd === '') {
        let time = new Date(this.dateStart);
        time = (String(time.getDate()).length > 1 ? time.getDate(): '0' + time.getDate())
            + '.'+ (String(time.getMonth()).length > 1 ? (time.getMonth()+1) : '0' + (time.getMonth()+1))
            + '.'+ (String(time.getFullYear()).length > 1 ? time.getFullYear(): '0' + time.getFullYear())
            + ' '+ (String(time.getHours()).length > 1 ? time.getHours(): '0' + time.getHours())
            + ':' + (String(time.getMinutes()).length > 1 ? time.getMinutes(): '0' + time.getMinutes())
        let indexEnd = date.length;
        let indexStart = date.indexOf(time);
        return cpu.slice(indexStart, indexEnd)
      }
      else if (this.dateStart === '' && this.dateEnd !== '') {
        let time = new Date(this.dateEnd);
        time = (String(time.getDate()).length > 1 ? time.getDate(): '0' + time.getDate())
            + '.'+ (String(time.getMonth()).length > 1 ? (time.getMonth()+1) : '0' + (time.getMonth()+1))
            + '.'+ (String(time.getFullYear()).length > 1 ? time.getFullYear(): '0' + time.getFullYear())
            + ' '+ (String(time.getHours()).length > 1 ? time.getHours(): '0' + time.getHours())
            + ':' + (String(time.getMinutes()).length > 1 ? time.getMinutes(): '0' + time.getMinutes())
        let indexEnd = date.indexOf(time);
        let indexStart = date[0];
        return cpu.slice(indexStart, indexEnd)
      }
      else if (this.dateEnd !== '' && this.dateStart !== '') {
        let timeStart = new Date(this.dateStart);
        let timeEnd = new Date(this.dateEnd);
        timeStart = (String(timeStart.getDate()).length > 1 ? timeStart.getDate(): '0' + timeStart.getDate())
            + '.'+ (String(timeStart.getMonth()).length > 1 ? (timeStart.getMonth()+1) : '0' + (timeStart.getMonth()+1))
            + '.'+ (String(timeStart.getFullYear()).length > 1 ? timeStart.getFullYear(): '0' + timeStart.getFullYear())
            + ' '+ (String(timeStart.getHours()).length > 1 ? timeStart.getHours(): '0' + timeStart.getHours())
            + ':' + (String(timeStart.getMinutes()).length > 1 ? timeStart.getMinutes(): '0' + timeStart.getMinutes())
        timeEnd = (String(timeEnd.getDate()).length > 1 ? timeEnd.getDate(): '0' + timeEnd.getDate())
            + '.'+ (String(timeEnd.getMonth()).length > 1 ? (timeEnd.getMonth()+1) : '0' + (timeEnd.getMonth()+1))
            + '.'+ (String(timeEnd.getFullYear()).length > 1 ? timeEnd.getFullYear(): '0' + timeEnd.getFullYear())
            + ' '+ (String(timeEnd.getHours()).length > 1 ? timeEnd.getHours(): '0' + timeEnd.getHours())
            + ':' + (String(timeEnd.getMinutes()).length > 1 ? timeEnd.getMinutes(): '0' + timeEnd.getMinutes())
        let indexStart = date.indexOf(timeStart);
        let indexEnd = date.indexOf(timeEnd);
        return cpu.slice(indexStart, indexEnd+1)
      }
      else {
        return cpu;
      }
    },
    updateRam(ram, date) {
      if (this.dateStart !== '' && this.dateEnd === '') {
        let time = new Date(this.dateStart);
        time = (String(time.getDate()).length > 1 ? time.getDate(): '0' + time.getDate())
            + '.'+ (String(time.getMonth()).length > 1 ? (time.getMonth()+1) : '0' + (time.getMonth()+1))
            + '.'+ (String(time.getFullYear()).length > 1 ? time.getFullYear(): '0' + time.getFullYear())
            + ' '+ (String(time.getHours()).length > 1 ? time.getHours(): '0' + time.getHours())
            + ':' + (String(time.getMinutes()).length > 1 ? time.getMinutes(): '0' + time.getMinutes())
        let indexEnd = date.length;
        let indexStart = date.indexOf(time);
        return ram.slice(indexStart, indexEnd)
      }
      else if (this.dateStart === '' && this.dateEnd !== '') {
        let time = new Date(this.dateEnd);
        time = (String(time.getDate()).length > 1 ? time.getDate(): '0' + time.getDate())
            + '.'+ (String(time.getMonth()).length > 1 ? (time.getMonth()+1) : '0' + (time.getMonth()+1))
            + '.'+ (String(time.getFullYear()).length > 1 ? time.getFullYear(): '0' + time.getFullYear())
            + ' '+ (String(time.getHours()).length > 1 ? time.getHours(): '0' + time.getHours())
            + ':' + (String(time.getMinutes()).length > 1 ? time.getMinutes(): '0' + time.getMinutes())
        let indexEnd = date.indexOf(time);
        let indexStart = date[0];
        return ram.slice(indexStart, indexEnd)
      }
      else if (this.dateEnd !== '' && this.dateStart !== '') {
        let timeStart = new Date(this.dateStart);
        let timeEnd = new Date(this.dateEnd);
        timeStart = (String(timeStart.getDate()).length > 1 ? timeStart.getDate(): '0' + timeStart.getDate())
            + '.'+ (String(timeStart.getMonth()).length > 1 ? (timeStart.getMonth()+1) : '0' + (timeStart.getMonth()+1))
            + '.'+ (String(timeStart.getFullYear()).length > 1 ? timeStart.getFullYear(): '0' + timeStart.getFullYear())
            + ' '+ (String(timeStart.getHours()).length > 1 ? timeStart.getHours(): '0' + timeStart.getHours())
            + ':' + (String(timeStart.getMinutes()).length > 1 ? timeStart.getMinutes(): '0' + timeStart.getMinutes())
        timeEnd = (String(timeEnd.getDate()).length > 1 ? timeEnd.getDate(): '0' + timeEnd.getDate())
            + '.'+ (String(timeEnd.getMonth()).length > 1 ? (timeEnd.getMonth()+1) : '0' + (timeEnd.getMonth()+1))
            + '.'+ (String(timeEnd.getFullYear()).length > 1 ? timeEnd.getFullYear(): '0' + timeEnd.getFullYear())
            + ' '+ (String(timeEnd.getHours()).length > 1 ? timeEnd.getHours(): '0' + timeEnd.getHours())
            + ':' + (String(timeEnd.getMinutes()).length > 1 ? timeEnd.getMinutes(): '0' + timeEnd.getMinutes())
        let indexStart = date.indexOf(timeStart);
        let indexEnd = date.indexOf(timeEnd);
        return ram.slice(indexStart, indexEnd+1)
      }
      else {
        return ram;
      }
    },
    updateMemory(memory, date) {
      if (this.dateStart !== '' && this.dateEnd === '') {
        let time = new Date(this.dateStart);
        time = (String(time.getDate()).length > 1 ? time.getDate(): '0' + time.getDate())
            + '.'+ (String(time.getMonth()).length > 1 ? (time.getMonth()+1) : '0' + (time.getMonth()+1))
            + '.'+ (String(time.getFullYear()).length > 1 ? time.getFullYear(): '0' + time.getFullYear())
            + ' '+ (String(time.getHours()).length > 1 ? time.getHours(): '0' + time.getHours())
            + ':' + (String(time.getMinutes()).length > 1 ? time.getMinutes(): '0' + time.getMinutes())
        let indexEnd = date.length;
        let indexStart = date.indexOf(time);
        return memory.slice(indexStart, indexEnd)
      }
      else if (this.dateStart === '' && this.dateEnd !== '') {
        let time = new Date(this.dateEnd);
        time = (String(time.getDate()).length > 1 ? time.getDate(): '0' + time.getDate())
            + '.'+ (String(time.getMonth()).length > 1 ? (time.getMonth()+1) : '0' + (time.getMonth()+1))
            + '.'+ (String(time.getFullYear()).length > 1 ? time.getFullYear(): '0' + time.getFullYear())
            + ' '+ (String(time.getHours()).length > 1 ? time.getHours(): '0' + time.getHours())
            + ':' + (String(time.getMinutes()).length > 1 ? time.getMinutes(): '0' + time.getMinutes())
        let indexEnd = date.indexOf(time);
        let indexStart = date[0];
        return memory.slice(indexStart, indexEnd)
      }
      else if (this.dateEnd !== '' && this.dateStart !== '') {
        let timeStart = new Date(this.dateStart);
        let timeEnd = new Date(this.dateEnd);
        timeStart = (String(timeStart.getDate()).length > 1 ? timeStart.getDate(): '0' + timeStart.getDate())
            + '.'+ (String(timeStart.getMonth()).length > 1 ? (timeStart.getMonth()+1) : '0' + (timeStart.getMonth()+1))
            + '.'+ (String(timeStart.getFullYear()).length > 1 ? timeStart.getFullYear(): '0' + timeStart.getFullYear())
            + ' '+ (String(timeStart.getHours()).length > 1 ? timeStart.getHours(): '0' + timeStart.getHours())
            + ':' + (String(timeStart.getMinutes()).length > 1 ? timeStart.getMinutes(): '0' + timeStart.getMinutes())
        timeEnd = (String(timeEnd.getDate()).length > 1 ? timeEnd.getDate(): '0' + timeEnd.getDate())
            + '.'+ (String(timeEnd.getMonth()).length > 1 ? (timeEnd.getMonth()+1) : '0' + (timeEnd.getMonth()+1))
            + '.'+ (String(timeEnd.getFullYear()).length > 1 ? timeEnd.getFullYear(): '0' + timeEnd.getFullYear())
            + ' '+ (String(timeEnd.getHours()).length > 1 ? timeEnd.getHours(): '0' + timeEnd.getHours())
            + ':' + (String(timeEnd.getMinutes()).length > 1 ? timeEnd.getMinutes(): '0' + timeEnd.getMinutes())
        let indexStart = date.indexOf(timeStart);
        let indexEnd = date.indexOf(timeEnd);
        return memory.slice(indexStart, indexEnd+1)
      }
      else {
        return memory;
      }
    },
    searchGroup(array) {
      if (this.inputSearch !== '') {
        return array.filter(elem => elem.hostName.toLowerCase().includes(this.inputSearch.toLowerCase()))
      }
      else {
        return array
      }
    },
    filterGroup(array) {
      const validGroups = this.serversGroups.map(group => group.name);
      for (let group of this.serversGroups) {
        if (validGroups.includes(this.selectGroup)) {
          if (group.name === this.selectGroup) {
            return array.filter(item => item.blockId === group.id);
          }
        } else {
          return array;
        }
      }
    },
    sortName(array) {
      if (this.sortGroup === 'По возрастанию') {
        return array.toSorted((a, b) => a.hostName.localeCompare(b.hostName))
      }
      else if (this.sortGroup === 'По убыванию') {
        return array.toSorted((a, b) => a.hostName.localeCompare(b.hostName)).reverse()
      }
      else {
        return array
      }
    },
    enterSearch() {
      this.selectGroup = document.querySelector('#selectGroup').value
      this.sortGroup = document.querySelector('#sortGroup').value
      this.selectInterval = document.querySelector('#selectInterval').value
      this.inputSearch = document.querySelector('#inputSearch').value
    },
  },
  computed: {
    dataGraphic() {
      let array = []
      for (let object of this.serversGroups) {
        for (let server of object.servers) {
          array.push(server)
        }
      }
      return array;
    },
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
    chartOption() {
      return {
        responsive: true,
        maintainAspectRatio: true,
        interaction: {
          mode: 'index',
          intersect: false,
          axis: 'x'
        },
        scales: {
          x: {
            ticks: {
              color: this.colorGraphic,
              callback: function(value, index, ticks) {
                let last = ticks.length;
                if (last % 2 === 0) {
                  if (index === 0 || index === last - 1) {
                    return this.chart.data.labels[index];
                  }
                } else {
                  if (index === 0 || index === last - 1) {
                    return this.chart.data.labels[index];
                  }
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
                return value + '%';
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
          verticalLine: {
            enabled: true,
            color: this.themeStatus ? this.themeLight.grid : this.themeDark.grid
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: (items) => items[0].label,
              label: (context) => {
                return `${context.dataset.label}: ${context.raw}%`;
              }
            },
            displayColors: true,
            usePointStyle: true,
            boxPadding: 6,
            bodySpacing: 4,
            backgroundColor: this.themeStatus ? this.themeLight.tooltipBg : this.themeDark.tooltipBg,
            titleColor: this.themeStatus ? this.themeLight.textColor : this.themeDark.textColor,
            bodyColor: this.themeStatus ? this.themeLight.textColor : this.themeDark.textColor,
            borderColor: this.themeStatus ? this.themeLight.borderColor : this.themeDark.borderColor,
            borderWidth: 1,
            caretSize: 0,
            cornerRadius: 4,
            padding: 8,
            position: 'nearest',
            xAlign: 'center',
            yAlign: 'top'
          },
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
                  fontColor: this.colorGraphic,
                }));
              },
              boxWidth: 18,
              boxHeight: 8,
            },
          },
        },
        elements: {
          line: {
            tension: 0,
            borderWidth: 2,
          },
          point: {
            radius: 0,
            hoverRadius: 3,
            hoverBorderWidth: 2,
            pointStyle: 'rect',
            hoverBackgroundColor: (context) => {
              const dataset = context.dataset;
              return dataset.borderColor;
            },
            hoverBorderColor: (context) => {
              const dataset = context.dataset;
              return dataset.borderColor;
            }
          },
        },
        hover: {
          mode: 'index',
          intersect: false,
        },
      };
    }
  },
}

</script>

<template @keydown="enterSearch">
  <div class="main" style="width: 100%" >
    <div class="main-top" :style="themeStatus ? {background: themeLight.background}: {background: themeDark.background}">
      <div class="text">
        <p :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}">Мониторинг</p>
        <div class="">
          <i class="fa-solid fa-chevron-up " style="cursor: pointer;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
             :class="openPanel ? 'fa-chevron-down' : 'fa-chevron-up'" @click="togglePanel"></i>
        </div>
        <div class="themes" v-on:click="$emit('changeTheme', !themeStatus)">
          <i class="fa-solid fa-sun" :class="themeStatus ? 'fa-moon': 'fa-sun'"
             :style="themeStatus ? {color: themeDark.backgroundComponent}: {color: themeLight.backgroundComponent}"></i>
        </div>
      </div>
      <div class="panel" v-if="openPanel" :style="themeStatus ? {background: themeLight.backgroundComponent}: {background: themeDark.backgroundComponent}">
        <div class="top">
          <ui-input id="inputSearch" v-model="inputSearch" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark"></ui-input>
          <ui-select id="selectGroup" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
            <option disabled selected>Выбрать группу серверов</option>
            <option>Все</option>
            <option v-for="group in serversGroups">{{group.name}}</option>
          </ui-select>
          <ui-select id="sortGroup" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
            <option disabled selected>Сортировка по имени хоста</option>
            <option>Без сортировки</option>
            <option>По возрастанию</option>
            <option>По убыванию</option>
          </ui-select>
          <ui-select id="selectInterval" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
            <option disabled selected>Выбрать интервал</option>
            <option>Без фильтрации</option>
            <option>Последние 5 минут</option>
            <option>Последние 15 минут</option>
            <option>Последние 30 минут</option>
            <option>Последний час</option>
            <option>Последний день</option>
          </ui-select>
        </div>
        <div class="bottom">
          <ui-input class="date" id="dateStart" type="datetime-local"  :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
          </ui-input>
          <ui-input class="date" id="dateEnd" type="datetime-local" placeholder="дд.мм.гггг 00:00" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark"></ui-input>
          <main-button class="btn" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" @click="searchElement">Найти</main-button>
          <main-button class="btn btn-close" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" @click="deleteFilter">Сбросить</main-button>
          <ui-select class="select" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" :style="themeStatus ? {borderColor: themeLight.borderColor, background: themeLight.backgroundComponent}: {borderColor: themeDark.borderColor, background: themeDark.backgroundComponent}">
            <option disabled selected>Выбрать формат</option>
            <option>PDF</option>
            <option>PNG</option>
            <option>DOCX</option>
          </ui-select>
          <main-button class="btn" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" @click="downloadPNG('myChart', this.nameServer)">Выгрузить</main-button>
        </div>
      </div>
    </div>
    <div class="graphics" >
      <div class="graphic"  :style="themeStatus ? {background: themeLight.backgroundComponent}: {background: themeDark.backgroundComponent}" v-for="server in searchGroup(filterGroup(sortName(dataGraphic)))">
        <div class="top">
          <p :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}">{{server.hostName}}</p>
<!--          <button style="background: none; cursor: pointer" class="setting"  @click="toggleWindow">-->
<!--            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--              <path d="M11.4324 0C11.5799 4.64632e-06 11.7235 0.0468053 11.8426 0.133662C11.9618 0.220519 12.0503 0.342949 12.0954 0.483321L12.8615 2.86371C13.1832 3.02111 13.4911 3.198 13.7849 3.39718L16.2308 2.87068C16.375 2.83989 16.5253 2.85567 16.6599 2.91574C16.7946 2.97582 16.9067 3.07709 16.9802 3.20496L18.9107 6.54643C18.9844 6.67423 19.0156 6.82214 18.9998 6.96884C18.9841 7.11553 18.9221 7.25343 18.8229 7.36264L17.1445 9.21514C17.169 9.57036 17.169 9.92685 17.1445 10.2821L18.8229 12.1374C18.9221 12.2466 18.9841 12.3845 18.9998 12.5312C19.0156 12.6779 18.9844 12.8258 18.9107 12.9536L16.9802 16.2964C16.9065 16.424 16.7943 16.525 16.6597 16.5848C16.525 16.6447 16.3749 16.6602 16.2308 16.6293L13.7849 16.1028C13.4924 16.3006 13.1832 16.4789 12.8629 16.6363L12.0954 19.0167C12.0503 19.157 11.9618 19.2795 11.8426 19.3663C11.7235 19.4532 11.5799 19.5 11.4324 19.5H7.57141C7.42397 19.5 7.28033 19.4532 7.16118 19.3663C7.04203 19.2795 6.95353 19.157 6.90841 19.0167L6.14373 16.6377C5.82285 16.4808 5.51334 16.3016 5.21748 16.1014L2.77302 16.6293C2.62881 16.6601 2.47855 16.6443 2.34388 16.5843C2.20921 16.5242 2.09709 16.4229 2.02366 16.295L0.0931621 12.9536C0.0194445 12.8258 -0.01178 12.6779 0.00399087 12.5312C0.0197618 12.3845 0.0817131 12.2466 0.180912 12.1374L1.8593 10.2821C1.83499 9.92777 1.83499 9.57223 1.8593 9.21793L0.180912 7.36264C0.0817131 7.25343 0.0197618 7.11553 0.00399087 6.96884C-0.01178 6.82214 0.0194445 6.67423 0.0931621 6.54643L2.02366 3.20357C2.09729 3.07595 2.2095 2.97497 2.34415 2.91515C2.47881 2.85533 2.62896 2.83976 2.77302 2.87068L5.21748 3.39857C5.51277 3.19939 5.82198 3.01971 6.14373 2.86232L6.9098 0.483321C6.95477 0.343401 7.04286 0.221295 7.16145 0.13448C7.28004 0.0476655 7.42305 0.000592894 7.57002 0L11.4324 0ZM8.0812 1.39286L7.29005 3.85404L6.75659 4.1145C6.49434 4.24283 6.24118 4.38896 5.99888 4.55186L5.5058 4.88614L2.97638 4.34014L1.55566 6.80271L3.28977 8.72207L3.24798 9.31264C3.22797 9.60387 3.22797 9.89613 3.24798 10.1874L3.28977 10.7779L1.55288 12.6973L2.97498 15.1599L5.50441 14.6152L5.99748 14.9481C6.23978 15.111 6.49295 15.2572 6.7552 15.3855L7.28866 15.646L8.0812 18.1071H10.9254L11.7193 15.6446L12.2514 15.3855C12.5134 15.2575 12.7661 15.1113 13.0077 14.9481L13.4994 14.6152L16.0302 15.1599L17.4509 12.6973L15.7154 10.7779L15.7572 10.1874C15.7773 9.89567 15.7773 9.60294 15.7572 9.31125L15.7154 8.72068L17.4523 6.80271L16.0302 4.34014L13.4994 4.88336L13.0077 4.55186C12.7661 4.38863 12.5134 4.24249 12.2514 4.1145L11.7193 3.85543L10.924 1.39286H8.0812ZM9.50191 5.57143C10.6101 5.57143 11.673 6.01167 12.4566 6.7953C13.2402 7.57894 13.6805 8.64177 13.6805 9.75C13.6805 10.8582 13.2402 11.9211 12.4566 12.7047C11.673 13.4883 10.6101 13.9286 9.50191 13.9286C8.39368 13.9286 7.33085 13.4883 6.54721 12.7047C5.76358 11.9211 5.32334 10.8582 5.32334 9.75C5.32334 8.64177 5.76358 7.57894 6.54721 6.7953C7.33085 6.01167 8.39368 5.57143 9.50191 5.57143ZM9.50191 6.96428C8.76309 6.96428 8.05454 7.25778 7.53211 7.7802C7.00969 8.30262 6.7162 9.01118 6.7162 9.75C6.7162 10.4888 7.00969 11.1974 7.53211 11.7198C8.05454 12.2422 8.76309 12.5357 9.50191 12.5357C10.2407 12.5357 10.9493 12.2422 11.4717 11.7198C11.9941 11.1974 12.2876 10.4888 12.2876 9.75C12.2876 9.01118 11.9941 8.30262 11.4717 7.7802C10.9493 7.25778 10.2407 6.96428 9.50191 6.96428Z" fill="#757575"/>-->
<!--            </svg>-->
<!--          </button>-->
        </div>
        <Line id="myChart" v-on="nameAdd(server.hostName)"  :data="chartData(server)" :options="chartOption" :serversGroups="serversGroups" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark"></Line>
      </div>
    </div>
    <modal-window :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" v-model:openDialog="modalWindow"></modal-window>
  </div>
<!--  <test :math="math"></test>-->
</template>

<style scoped>

.themes {
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-left: auto;
}
.main .main-top {
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding-bottom: 1.1%;
}
.main .main-top .panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 20px;
  border-radius: 12px;
  gap: 14px;
  margin-top: 20px;
}
.btn-close{
  background: #757575 !important;
}
.main .main-top .panel .top {
  display: flex;
  gap: 1.1%
}
.main .main-top .panel .bottom {
  display: flex;
  gap: 1.1%
}
.main .main-top .panel .bottom .date {
  width: 14.95%;
}
.main .main-top .panel .bottom .btn {
  width: 10%;
}
.main .main-top .panel .bottom .select {
  width: 10.8%;
  border: 1px solid;
  margin-left: auto;
}
.main .graphics {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1.1%;
}
.main .graphics .graphic {
  width: 32.6%;
  height: 28%;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 1.1%;
}
.main .graphics .graphic .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.main .graphics .graphic .top p {
  font-size: 18px;
}
.main .main-top .text {
  display: flex;
  gap: 8px;
  padding-top: 20px;
  align-items: center;
}
.main .main-top .text p {
  font-size: 28px;
}
.main .main-top .text i {
  margin-top: 4px;
  font-size: 18px;
}

</style>