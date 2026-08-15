<script setup lang="ts">
  import { type FormItem, useForm } from 'element-hooks';
  import { ElInput } from 'element-plus';
  import { ref, watch } from 'vue';

  interface DomainItem {
    key: number;
    value: string;
  }

  const domains = ref<DomainItem[]>([
    {
      key: 1,
      value: '',
    },
  ]);

  const buildItems = (domainsList: DomainItem[]): FormItem[] => {
    const items: FormItem[] = [
      {
        prop: 'email',
        label: 'Email',
        rules: [
          {
            required: true,
            message: 'Please input email address',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change'],
          },
        ],
        render: { component: ElInput },
      },
    ];

    domainsList.forEach((domain, index) => {
      items.push({
        label: 'Domain' + index,
        prop: `domains.${index}.value`,
        rules: {
          required: true,
          message: 'domain can not be null',
          trigger: 'blur',
        },
        slot: `domain_${domain.key}`,
      });
    });

    items.push({
      slot: 'buttons',
    });

    return items;
  };

  const [Form, { instance, setItems, getModel, setModel }] = useForm({
    labelWidth: 'auto',
    model: {
      domains: domains.value,
      email: '',
    },
    items: buildItems(domains.value),
  });

  watch(
    domains,
    newDomains => {
      const model = getModel();
      if (model) {
        model.domains = newDomains;
        setModel(model);
        setItems(buildItems(newDomains));
      }
    },
    { deep: true },
  );

  const removeDomain = (item: DomainItem) => {
    const index = domains.value.indexOf(item);
    if (index !== -1) {
      domains.value.splice(index, 1);
    }
  };

  const addDomain = () => {
    domains.value.push({
      key: Date.now(),
      value: '',
    });
  };

  const submitForm = () => {
    if (!instance.value) {
      return;
    }
    instance.value.validate(valid => {
      if (valid) {
        console.log('submit!');
      } else {
        console.log('error submit!');
      }
    });
  };

  const resetForm = () => {
    if (!instance.value) {
      return;
    }
    instance.value.resetFields();
  };
</script>

<template>
  <Form style="max-width: 600px" class="demo-dynamic">
    <template
      v-for="domain in domains"
      :key="domain.key"
      #[`domain_${domain.key}`]
    >
      <el-input v-model="domain.value" />
      <el-button class="mt-2" @click.prevent="removeDomain(domain)">
        Delete
      </el-button>
    </template>
    <template #buttons>
      <el-button type="primary" @click="submitForm">Submit</el-button>
      <el-button @click="addDomain">New domain</el-button>
      <el-button @click="resetForm">Reset</el-button>
    </template>
  </Form>
</template>
