<template>
  <el-table :data="tableData" style="width: 100%; display: flex">
    <el-table-column prop="date" label="应用/服务名称" style="flex: 0.2" />
    <el-table-column prop="name" label="申请类型" style="flex: 0.1" />
    <el-table-column prop="state" label="申请人" style="flex: 0.2" />
    <el-table-column prop="city" label="状态" style="flex: 0.1" />
    <el-table-column
      prop="address"
      label="申请时间"
      width="300px"
      style="flex: 0.2"
    />

    <el-table-column fixed="right" label="操作" style="flex: 0.2">
      <template #default>
        <el-button
          v-if="pageTabFrom === 'waitApproval'"
          link
          type="primary"
          size="small"
          @click="handleClick"
          >去审批</el-button
        >
        <div v-else>-</div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
const handleClick = () => {
  console.log("click");
};

const props = defineProps({
  pageTabFrom: String, // finishApproval审批完成 / waitApproval待我审批
});

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
];
</script>
