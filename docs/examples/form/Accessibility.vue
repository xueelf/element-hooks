<script setup lang="ts">
  import { useForm } from 'element-hooks';
  import { ElInput } from 'element-plus';

  const [Form] = useForm({
    labelPosition: 'left',
    labelWidth: 'auto',
    model: {
      fullName: '',
      firstName: '',
      lastName: '',
    },
    items: [
      {
        slot: 'fullNameAlert',
      },
      {
        label: 'Full Name',
        prop: 'fullName',
        render: { component: ElInput },
      },
      {
        slot: 'informationAlert',
      },
      {
        label: 'Your Information',
        slot: 'yourInformation',
      },
    ],
  });
</script>

<template>
  <Form style="max-width: 600px">
    <template #fullNameAlert>
      <el-space fill style="width: 100%; margin-bottom: 18px">
        <el-alert type="info" show-icon :closable="false">
          <p>"Full Name" label is automatically attached to the input:</p>
        </el-alert>
      </el-space>
    </template>
    <template #informationAlert>
      <el-space fill style="width: 100%; margin-bottom: 18px">
        <el-alert type="info" show-icon :closable="false">
          <p>
            "Your Information" serves as a label for the group of inputs. <br />
            You must specify labels on the individal inputs. Placeholders are
            not replacements for using the "label" attribute.
          </p>
        </el-alert>
      </el-space>
    </template>
    <template #yourInformation="{ model }">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input
            v-model="model.firstName"
            aria-label="First Name"
            placeholder="First Name"
          />
        </el-col>
        <el-col :span="12">
          <el-input
            v-model="model.lastName"
            aria-label="Last Name"
            placeholder="Last Name"
          />
        </el-col>
      </el-row>
    </template>
  </Form>
</template>
