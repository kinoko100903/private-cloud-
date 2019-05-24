<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">卓朗私有云管理系统</span>
      </div>
      <el-form
        :model="userLogin"
        :rules="rules"
        ref="userLogin"
        class="user-login"
        label-width="60px"
      >
        <el-form-item label="账号" prop="username">
          <el-popover placement="right-start" content="这是用户名输入的输入要求提示" width="240" trigger="hover">
            <el-input slot="reference" v-model="userLogin.username" placeholder="请输入用户名"></el-input>
          </el-popover>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-popover placement="right-start" content="这是密码输入的要求提示" width="200" trigger="hover">
            <el-input
              slot="reference"
              v-model="userLogin.password"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-popover>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userLogin')" class="submit_btn">登 录</el-button>
        </el-form-item>
        <div class="tiparea">
          <p></p>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      userLogin: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            // type: "email",
            required: true,
            message: '用户名不能为空',
            trigger: 'change'
          }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    console.log(this.$utils.sessionStorage.setItem('ccc', '789'))
    // this.$utils.Message('ssss')
  },
  methods: {
    change: function (e) {
      // console.log(123)
    },
    submitForm (formName, event) {
      let page = this
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          this.$store.dispatch('login', this.userLogin).then(res => {
            console.log('ssdfsdfsdfsdf:', res)
            page.$router.push('/')
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('提交的信息有错误!')
          console.log(obj)
          return false
        }
      })
    },
    isEmpty (value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>

<style scoped>
.login {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 310px;
  padding: 0;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.user-login {
  margin-top: 20px;
  background-color: #fff;
  padding: 40px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>
