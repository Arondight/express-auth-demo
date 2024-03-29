<template>
  <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-position="left" label-width="auto">
    <el-form-item label="username" prop="username">
      <el-input v-model="loginForm.username" placeholder="at least 3 characters" autofocus />
    </el-form-item>
    <el-form-item :clearable="true" label="password" prop="password">
      <el-input
        @keyup.enter.native="submit"
        v-model="loginForm.password"
        placeholder="at least 6 characters"
        show-password
      />
    </el-form-item>
    <el-form-item v-if="isRegisterRef" :rules="confirmItemRules" :clearable="true" label="confirm" prop="confirm">
      <el-input @keyup.enter.native="submit" v-model="loginForm.confirm" placeholder="confirm password" show-password />
    </el-form-item>
    <el-form-item>
      <el-row :gutter="3">
        <el-col :span="12">
          <el-button @click="submit" type="primary">{{ true === isRegisterRef ? "register" : "login" }}</el-button>
        </el-col>
        <el-col :span="12">
          <el-button @click="isRegisterRef = !isRegisterRef">{{
            true === isRegisterRef ? "login with an account" : "register an account"
          }}</el-button>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { defineProps, inject, reactive, ref, toRef } from "vue";
import api from "@lib/api";

const router = inject("router");
const props = defineProps({ type: { type: String, default: "login" } });
const typeRef = ref(toRef(props, "type").value);
let isRegisterRef = ref("register" === typeRef.value);
const loginFormRef = ref();
const loginForm = reactive({ username: "", password: "", confirm: "" });
const check = {
  username(rule, value, cb) {
    if (/^\w+$/.test(value)) {
      cb();
    } else {
      cb(new Error("username format error"));
    }
  },
  password(rule, value, cb) {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/.test(value)) {
      cb();
    } else {
      cb(new Error("contain digit, uppercase and lowercase"));
    }
  },
  confirm(rule, value, cb) {
    const { password, confirm } = loginForm;

    if (password === confirm) {
      cb();
    } else {
      cb(new Error("passwords not match"));
    }
  },
};
const loginFormRules = reactive({
  username: [
    { required: true, message: "can not be empty", trigger: "blur" },
    { min: 3, message: "at least 3 characters", trigger: "blur" },
    { validator: check.username, trigger: "blur" },
  ],
  password: [
    { required: true, message: "can not be empty", trigger: "blur" },
    { min: 6, message: "at least 6 characters", trigger: "blur" },
    { validator: check.password, trigger: "blur" },
  ],
});
const confirmItemRules = reactive([
  { required: true, message: "can not be empty", trigger: "blur" },
  { min: 6, message: "at least 6 characters", trigger: "blur" },
  { validator: check.confirm, trigger: "blur" },
]);

function submit() {
  const apiName = true === isRegisterRef.value ? "register" : "login";
  const apiHandler = api.user[apiName] || (() => null);

  loginFormRef.value
    .validate((valid) => {
      if (true === valid) {
        apiHandler(loginForm.username, loginForm.password)
          .then((res) => {
            if (200 === res.status && true === res.data.success) {
              ElMessage({ type: "success", message: `${apiName} success`, showClose: true });

              if ("string" === typeof res.data.username) {
                localStorage.setItem("username", res.data.username);
              }

              if (true === isRegisterRef.value) {
                isRegisterRef.value = !isRegisterRef.value;
                loginFormRef.value.resetFields();
              } else {
                router.push({ name: "Home" });
              }
            } else {
              ElMessage({ type: "error", message: res.data.message || `${apiName} failed`, showClose: true });
            }
          })
          .catch((e) => ElMessage({ type: "error", message: e.message || "api server error", showClose: true }));
      } else {
        ElMessage({ type: "error", message: "please check your options", showClose: true });
      }
    })
    .catch((e) => console.error(e));
}
</script>
