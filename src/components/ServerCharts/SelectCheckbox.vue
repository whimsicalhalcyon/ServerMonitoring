<script>
 import MainButton from "@/components/MainButton.vue";

 export default {
   components: {MainButton},
    props: {
      blocks : {
        type: Array,
      },
      showDeleteBtn: {
        type: Boolean,
        default: false,
      },
      showDeleteServer: {
        type: Boolean,
        default: false,
      },
      showAddBtn: {
        type: Boolean,
        default: false,
      },
      showCheckBox: {
        type: Boolean,
        default: false,
      }
    },
   data() {
     return {
       selectedServers: [],
     }
   },
   methods: {
      toggleExpand (index) {
        this.blocks[index].isExpanded = !this.blocks[index].isExpanded;
      },
     deleteBlock(blockIndex) {
       if (window.confirm(`Вы точно хотите удалить блок ${this.blocks[blockIndex].name}?`)) {
         this.blocks.splice(blockIndex, 1);
         alert(`Блок ${this.blocks[blockIndex].name} удалён!`);
       }
     },
     pushArrayParametres(server, isChecked) {
       if (isChecked) {
         if (!this.selectedServers.includes(server)) {
           this.selectedServers.push(server);
         }
       } else {
         this.selectedServers = this.selectedServers.filter(s => s !== server);
       }
     }
   }
 }
</script>

<template>
  <div class="blocks-container">
    <div v-for="(block, blockIndex) in blocks" :key="blockIndex" class="block">
      <div class="block-header" @click="toggleExpand(blockIndex)">
        <div class="btn-server">
          <i :class="block.isExpanded ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"></i>
          <span>{{selectedServers.join(', ')}}</span>
        </div>
        <div class="btn-name">
          <button v-if="showDeleteServer" @click.stop="deleteBlock(blockIndex)" class="delete-btn">x</button>
        </div>
      </div>
      <div class="servers" v-show="block.isExpanded">
        <div v-for="(server, serverIndex) in block.servers" :key="serverIndex" class="server-item">
          <label class="server-content">
            <input v-if="showCheckBox" type="checkbox" class="server-checkbox" :value="server"  @change="pushArrayParametres(server, $event.target.checked)">
            <span class="server-name">{{server}}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.servers {
  padding-left: 20px;
  transition: all 0.3s ease;
}

.block-header {
  display: flex;
  justify-content: space-between;
}

.server-checkbox {
  margin-right: 2%;
}


.block-header div {
  display: flex;
  align-items: center;
  gap: 10px;
}
.delete-btn {
  background: #F44336;
  color: white;
  border: none;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.lbl-check {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.add-btn {
  margin-left: 10%;
  background: #38bdf8;
  color: white;
  border: none;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
}
.blocks-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
}

.server-item {
  margin-bottom: 2%;
}

.btn-server {
  margin-bottom: 2%;
}

.block {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
}


</style>